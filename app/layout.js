"use client";
import AuthLoader from "@/components/AuthLoader.js";
import Navbar from "@/components/navbar/navbar.jsx";
import { AppWrapper } from "./context/state.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext.js";

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Tillison Business</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Official Tillison Business site" />
        <meta name="author" content="Dominic Tillison" />
        <link rel="icon" href="/favicon.ico" />

        {/* Google Fonts - Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppWrapper>
          <AuthProvider>
            <AuthLoader />
            <Navbar token={token} setToken={setToken} />
            <main className="container">{children}</main>
          </AuthProvider>
        </AppWrapper>
      </body>
    </html>
  );
}
