"use client";

import MembershipCard from "@/components/home/MembershipCard";

export default function MembershipPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0D1B2A" }}>
      <div className="pt-5">
        <div className="container text-center mb-4 animate-fade-in-up" style={{ paddingTop: "1rem" }}>
          <p
            style={{
              color: "#87DEFA",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "3px",
              marginBottom: "0.1rem",
            }}
          >
            Available Balance
          </p>
          <h1
            style={{
              fontSize: "clamp(3rem, 10vw, 4.5rem)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            $2,500
          </h1>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #a855f7 0%, #f59e0b 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1rem auto 8px",
              fontSize: "1.3rem",
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)",
            }}
          >
            👑
          </div>
          <p
            style={{
              color: "#a78bfa",
              fontSize: "0.95rem",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            You&rsquo;re not a member yet.&nbsp;
            <span style={{ opacity: 0.8 }}>Join Membership to make withdrawals.</span>
          </p>
        </div>
        <MembershipCard />
      </div>
    </div>
  );
}
