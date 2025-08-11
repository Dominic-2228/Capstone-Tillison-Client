"use client";
import { getPackages } from "@/data/getPackages.js";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [photoPackage, setPhotoPackage] = useState([])

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

    useEffect(() => {
    getPackages().then(setPhotoPackage);
  }, []);



  return (
    <AuthContext.Provider value={{ token, setToken, photoPackage, setPhotoPackage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}