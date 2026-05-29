"use client";

import PaymentDashboard from "@/components/payment/PaymentDashboard";

export default function PaymentPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0D1B2A" }}>
      <div className="pt-4">
        <div className="container mb-3">
          <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: "rgba(0,191,255,0.05)", border: "1px solid rgba(0,191,255,0.15)" }}>
            <span style={{ color: "#87DEFA", fontSize: "0.95rem" }}>Your Balance</span>
            <span className="fw-bold" style={{ fontSize: "1.5rem", background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              $2,500.00
            </span>
            <span className="ms-auto" style={{ background: "rgba(0,191,255,0.1)", border: "1px solid rgba(0,191,255,0.2)", borderRadius: "20px", padding: "4px 12px", color: "#00BFFF", fontSize: "0.75rem", fontWeight: 600 }}>
              Verified ✓
            </span>
          </div>
        </div>
        <PaymentDashboard />
      </div>
    </div>
  );
}