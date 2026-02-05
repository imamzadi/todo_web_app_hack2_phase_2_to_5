"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

interface AuthContextType {
  token: string | null;
  user: User | null; // Added user state
  isAuthenticated: boolean;
  login: (token: string, user: User) => void; // Modified login to accept user
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // Initialize user state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user"); // Assuming user data is also stored in cookies
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); // Parse user data
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken: string, newUser: User) => { // Modified to accept newUser
    Cookies.set("token", newToken, { expires: 7 });
    Cookies.set("user", JSON.stringify(newUser), { expires: 7 }); // Store user data
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user"); // Remove user data
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const authFetch = async (
  url: string,
  options?: RequestInit,
  tokenFromArg?: string | null
) => {
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  const currentToken = tokenFromArg || Cookies.get("token");

  if (currentToken) {
    headers["Authorization"] = `Bearer ${currentToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
