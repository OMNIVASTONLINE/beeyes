"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/signup", label: "Sign Up" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/membership", label: "Membership" },
    { href: "/payment", label: "Payment" },
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
          <img
            src="/logo.png"
            alt="MrBeast"
            style={{ height: "48px", width: "auto", maxHeight: "60px", objectFit: "contain", borderRadius: "12px" }}
          />
          <span
            className="fw-bold"
            style={{
              fontSize: "1.25rem",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "2px"
            }}
          >
            <span style={{ color: "#00BFFF" }}>Mr</span>
            <span style={{ color: "#E91E78" }}>Beast</span>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setExpanded(!expanded)}
          style={{ boxShadow: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto gap-1">
            {navLinks.map((link) => (
              <li className="nav-item" key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link px-3 py-2 rounded-3 ${pathname === link.href ? "active" : ""}`}
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
        </div>
      </div>
    </nav>
  );
}