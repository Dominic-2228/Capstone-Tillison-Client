"use client";
import { useEffect, useState } from "react";
import { getUser } from "../../data/user.jsx";
import { useRouter } from "next/navigation";
import "./navbar.css";
import { useUser } from "../hooks/useUser.js";
import { useAuth } from "../../../app/context/AuthContext.js";

export default function Navbar() {
  const router = useRouter();
  const [render, setRerender] = useState(false);
  const {token, setToken} = useAuth()

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    // how can i set token to the generated token on the navbar page? useContext?

    handleNavigation("/");
  };

  const socialMediaLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/dominic.tillison?igsh=YXYwa2d5NHQ2azRp&utm_source=qr",
      icon: "📷",
    },
    { name: "Facebook", url: "https://facebook.com", icon: "📘" },
    { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/dominic-tillison",
      icon: "💼",
    },
  ];

  return (
    <nav className="custom-navbar">
      {/* Left Side - Social Media Icons */}
      <div className="navbar-left-section">
        {socialMediaLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>

      {/* Center Left - Navigation Links */}
      <div className="navbar-center-left">
        <button
          onClick={() => handleNavigation("/portfolio")}
          className="nav-link-button"
        >
          Portfolio
        </button>
        <button
          onClick={() => handleNavigation("/packages")}
          className="nav-link-button"
        >
          Packages
        </button>
        {token ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                handleNavigation("/login");
              }}
              className="logout-button"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="logout-button"
            >
              Register
            </button>
          </>
        )}
      </div>

      {/* Dead Center - Logo */}
      <div className="navbar-logo">
        <div className="logo-circle">LOGO</div>
      </div>

      {/* Far Right - Signature */}
      <div className="navbar-signature">tillison</div>
    </nav>
  );
}
