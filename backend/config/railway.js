// EDIT THIS FILE WHEN YOU CREATE A NEW RAILWAY ACCOUNT / PROJECT
// Mirror the values from backend/api_railway.py when updating Railway settings.

const config = {
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb://mongo:sAaUrUyEWfuYgnHTJhWnYQlQhoDZvgQj@mainline.proxy.rlwy.net:35014",
  backendBaseUrl: process.env.BACKEND_BASE_URL || "http://localhost:5000",
  frontendApiBase: process.env.FRONTEND_API_BASE || "http://localhost:5000/api",
};

module.exports = config;
