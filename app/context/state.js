"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../../src/data/auth';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
