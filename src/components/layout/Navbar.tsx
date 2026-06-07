"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, logout, profile } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    await logout();
    setExpanded(false);
  };

  const navLinks = isLoggedIn
    ? [
        { href: "/membership", label: "Membership" },
        { href: "/payment", label: "Payment" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/signup", label: "Sign Up" },
      ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{
      background: "rgba(10, 10, 26, 0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0, 191, 255, 0.1)",
      zIndex: 1000
    }}>
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2" style={{ maxHeight: "60px" }}>
          <img src="/logo.png" alt="MrBeast" style={{ height: "48px", width: "auto", maxHeight: "60px", objectFit: "contain", borderRadius: "12px" }} />
          <span className="fw-bold" style={{ fontSize: "1.25rem", color: "#fff", display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ color: "#00BFFF" }}>Mr</span>
            <span style={{ color: "#E91E78" }}>Beast</span>
          </span>
        </Link>

        <button className="navbar-toggler border-0" type="button" onClick={() => setExpanded(!expanded)} style={{ boxShadow: "none" }}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto gap-1">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link href={link.href} className={`nav-link px-3 py-2 rounded-3 ${pathname === link.href ? "active" : ""}`}
                  style={{
                    color: pathname === link.href ? "#00BFFF" : "#87DEFA",
                    background: pathname === link.href ? "rgba(0,191,255,0.1)" : "transparent",
                    fontWeight: pathname === link.href ? 600 : 400,
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => setExpanded(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-2 ms-lg-3 mt-2 mt-lg-0 flex-wrap flex-sm-nowrap">
            {isLoggedIn ? (
              <>
                <span
                  style={{
                    color: "#87DEFA",
                    fontSize: "0.85rem",
                    padding: "6px 12px",
                    background: "rgba(0,191,255,0.08)",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "140px",
                  }}
                >
                  {(profile?.display_name || (user?.user_metadata?.display_name as string) || user?.email)}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm"
                  style={{
                    color: "#E91E78",
                    border: "1px solid rgba(233,30,120,0.3)",
                    borderRadius: "8px",
                    padding: "6px 14px",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="btn btn-sm"
                style={{
                  color: "#00BFFF",
                  border: "1px solid rgba(0,191,255,0.3)",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                }}
                onClick={() => setExpanded(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
