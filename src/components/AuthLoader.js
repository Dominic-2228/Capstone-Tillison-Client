"use client"
import { useAppContext } from "../context/state";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { getUserProfile } from "@/data/auth.js";

export default function AuthLoader() {
  const { token, setProfile } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady || !token) return;

    const authRoutes = ['/login', '/register'];
    if (!authRoutes.includes(router.pathname)) {
      getUserProfile().then((profileData) => {
        if (profileData) {
          setProfile(profileData);
        }
      });
    }
  }, [router.isReady, token, router.pathname]);

  return null;
}