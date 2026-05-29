"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  balance: number;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  balance: 2500,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const balance = 2500;

  useEffect(() => {
    const stored = localStorage.getItem("beeyes_auth");
    if (stored === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("beeyes_auth", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("beeyes_auth");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, balance, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
