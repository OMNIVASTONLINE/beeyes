"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function BalanceBar() {
  const { isLoggedIn, balance } = useAuth();

  if (!isLoggedIn) return null;

  return (
    <div
      style={{
        background: "linear-gradient(90deg, #0A1628 0%, #112240 50%, #0A1628 100%)",
        borderBottom: "1px solid rgba(0,191,255,0.15)",
        padding: "8px 0",
        position: "fixed",
        top: "clamp(58px, 9vw, 72px)",
        left: 0,
        right: 0,
        zIndex: 999,
      }}
    >
      <div className="container d-flex align-items-center justify-content-between flex-wrap gap-1">
        <div className="d-flex align-items-center gap-1 gap-sm-2">
          <span style={{ color: "#87DEFA", fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)" }}>Your Balance</span>
          <span
            className="fw-bold"
            style={{
              fontSize: "clamp(1rem, 4vw, 1.3rem)",
              background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <span
            style={{
              background: "rgba(0,191,255,0.1)",
              border: "1px solid rgba(0,191,255,0.2)",
              borderRadius: "20px",
              padding: "3px 10px",
              color: "#00BFFF",
              fontSize: "clamp(0.65rem, 2vw, 0.75rem)",
              fontWeight: 600,
            }}
          >
            Verified ✓
          </span>
        </div>
      </div>
    </div>
  );
}
