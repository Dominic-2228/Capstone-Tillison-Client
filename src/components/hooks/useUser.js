"use client";
import { fetchWithResponse } from "@/data/fetcher.js";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(undefined); // undefined = still loading
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("useUser token:", token);

  if (!token) {
    console.log("No token found - setting user to null");
    setUser(null); // null = not logged in
    setLoading(false);
    return;
  }

  fetchWithResponse(`users/profile`, {
    method: "GET",
    headers: { Authorization: `Token ${token}` },
  })
    .then((data) => {
      console.log("Fetched user data:", data);
      if (data) {
        setUser(data);
      }
      else setUser(null); 
    })
    .catch((err) => {
      console.error("Error fetching user:", err);
      setUser(null);
    })
    .finally(() => {
      setLoading(false);
      console.log("Loading set to false");
    });
}, []);
    
  return { user, loading };
}
