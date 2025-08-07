"use client";
import { useEffect, useState } from "react";
import { getUser } from "../../data/user.jsx";
import { useRouter } from "next/navigation";
import "./navbar.css";

export default function Navbar() {
  const [user, setUser] = useState({});
  const router = useRouter()

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const socialMediaLinks = [
    { name: "Instagram", url: "https://www.instagram.com/dominic.tillison?igsh=YXYwa2d5NHQ2azRp&utm_source=qr", icon: "📷" },
    { name: "Facebook", url: "https://facebook.com", icon: "📘" },
    { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { name: "LinkedIn", url: "https://linkedin.com/dominic-tillison", icon: "💼" },
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
        {user ? (
          <button
            onClick={() => handleNavigation("/login")}
            className="logout-button"
          >
            Login
          </button>
        ) : (
          <button
            // onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
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
