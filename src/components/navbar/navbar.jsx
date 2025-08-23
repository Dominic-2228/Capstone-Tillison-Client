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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, setToken } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavigation = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setToken(null);
    setIsMobileMenuOpen(false);
    handleNavigation("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const socialMediaLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/dominic.tillison?igsh=YXYwa2d5NHQ2azRp&utm_source=qr",
      icon: "/pngtree-instagram-social-media-icon-png-image_6618438.png",
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: "/Facebook_Logo_(2019).png.webp",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "/x-twitter-black-isolated-logo-5694253.png",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/dominic-tillison",
      icon: "/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.webp",
    },
  ];

  return (
    <>
      <nav
        className={`custom-navbar ${
          isVisible ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

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
              <img
                src={social.icon}
                alt={`${social.name} icon`}
                className="social-icon-image"
              />
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
        </div>

        {/* Dead Center - Logo */}
        <div className="navbar-logo">
          <div className="logo-circle">
            <img
              src="https://i.imgur.com/fduJ8ba.png"
              alt="tillison logo"
              onClick={() => handleNavigation("/")}
            />
          </div>
        </div>

        {/* Center Right - Auth Buttons */}
        <div className="navbar-center-right">
          {token ? (
            <button
              onClick={handleLogout}
              className="auth-button logout-button"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="auth-button login-button"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation("/register")}
                className="auth-button register-button"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Far Right - Signature */}
        <div className="navbar-signature">tillison</div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${
          isMobileMenuOpen ? "mobile-menu-open" : ""
        }`}
      >
        <div className="mobile-menu-content">
          <button
            onClick={() => handleNavigation("/portfolio")}
            className="mobile-nav-link"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavigation("/packages")}
            className="mobile-nav-link"
          >
            Packages
          </button>

          <div className="mobile-social-section">
            {socialMediaLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-social-icon"
                title={social.name}
              >
                <img
                  src={social.icon}
                  alt={`${social.name} icon`}
                  className="mobile-social-icon-image"
                />
                <span>{social.name}</span>
              </a>
            ))}
          </div>

          <div className="mobile-auth-section">
            {token ? (
              <button
                onClick={handleLogout}
                className="mobile-auth-button logout-button"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="mobile-auth-button login-button"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavigation("/register")}
                  className="mobile-auth-button register-button"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
