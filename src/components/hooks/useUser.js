import { useEffect, useState } from "react";

export function useUser () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/auth/user/`, {
      credentials: "include",
    })
    .then(res => res.ok ? res.json() : null)
    .then(data => setUser(data))
  }, [])

  return user
}