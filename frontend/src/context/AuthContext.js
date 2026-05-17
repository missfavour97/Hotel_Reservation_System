import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("hotelUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(userData) {
    localStorage.setItem("hotelUser", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("hotelUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}