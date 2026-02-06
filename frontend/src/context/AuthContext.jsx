import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, logout, setUser }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
