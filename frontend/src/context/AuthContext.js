import React, { createContext, useContext, useState } from "react";
import { loginUser, signupUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("hotelUser");
    if (!savedUser) {
      return null;
    }

    const parsedUser = JSON.parse(savedUser);
    return parsedUser?.id ? parsedUser : null;
  });

  async function login(credentials) {
    const userData = await loginUser(credentials);
    saveUser(userData);
    return userData;
  }

  async function signup(userData) {
    const createdUser = await signupUser(userData);
    saveUser(createdUser);
    return createdUser;
  }

  function saveUser(userData) {
    localStorage.setItem("hotelUser", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("hotelUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAdmin: user?.role === "Admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
