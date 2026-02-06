const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "8h"
  });

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/register", async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, role, passwordHash });
    return res.json({ token: signToken(user), user });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  return res.json({ token: signToken(user), user });
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-passwordHash");
  return res.json({ user });
});

module.exports = router;
