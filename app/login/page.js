"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { useState } from "react";
import { useAuth } from "../context/AuthContext.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rerender, setRerender] = useState(true);
  const router = useRouter();
  const {setToken} = useAuth()

  const handleNavigation = (path) => {
    router.push(path);
  };

  const Login = async (e) => {
    e.preventDefault();
    console.log("Sending login payload:", { username, password });
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.removeItem("token")
      localStorage.setItem("token", data.token);
      console.log("Login submitted");
      setToken(data.token)
    }
    handleNavigation("/");
  };

  return (
    <>
      <form onSubmit={Login}>
        <div className="form-group">
          <label htmlFor="exampleInputUsername1">Username</label>
          <input
            type="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-check">
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
