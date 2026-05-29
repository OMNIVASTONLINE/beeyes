"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MembersOnlyModal from "@/components/ui/MembersOnlyModal";

export default function DashboardPage() {
  const router = useRouter();
  const [modalAction, setModalAction] = useState<string | null>(null);
  const stats = [
    { label: "Challenges Completed", value: "3", color: "#00BFFF" },
    { label: "Rewards Earned", value: "$245", color: "#E91E78" },
    { label: "Success Rate", value: "85%", color: "#00BFFF" },
    { label: "Member Since", value: "2024", color: "#E91E78" },
  ];

  const recentActivities = [
    { action: "Completed Crypto Quiz Challenge", date: "2 days ago", points: "+50" },
    { action: "Unlocked Bronze Member Badge", date: "1 week ago", points: "+100" },
    { action: "Claimed Daily Login Bonus Reward", date: "3 weeks ago", points: "+10" },
    { action: "Finished DeFi Challenge Round", date: "1 month ago", points: "+75" },
  ];

  return (
    <div className="section-padding" style={{ minHeight: "100vh", background: "#0D1B2A" }}>
      <div className="container">
        <div className="mb-5 animate-fade-in-up">
          <h1 className="fw-bold mb-2">
            <span className="neon-text">Member</span>{" "}
            <span style={{ color: "#fff" }}>Dashboard</span>
          </h1>
          <p style={{ color: "#87DEFA" }}>
            Track your progress and manage your account
          </p>
          <div className="d-flex align-items-center gap-3 mt-4 p-3 rounded-3" style={{ background: "rgba(0,191,255,0.05)", border: "1px solid rgba(0,191,255,0.15)" }}>
            <span style={{ color: "#87DEFA", fontSize: "0.95rem" }}>Your Balance</span>
            <span className="fw-bold" style={{ fontSize: "1.5rem", background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              $2,500.00
            </span>
            <span className="ms-auto" style={{ background: "rgba(0,191,255,0.1)", border: "1px solid rgba(0,191,255,0.2)", borderRadius: "20px", padding: "4px 12px", color: "#00BFFF", fontSize: "0.75rem", fontWeight: 600 }}>
              Verified ✓
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-5">
          {stats.map((stat, i) => (
            <div key={i} className="col-6 col-md-3 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="glass-card p-4 text-center" style={{ borderRadius: "16px" }}>
                <h3 className="fw-bold mb-1" style={{ color: stat.color, fontSize: "2rem" }}>{stat.value}</h3>
                <p className="mb-0" style={{ color: "#87DEFA", fontSize: "0.85rem" }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Recent Activity */}
          <div className="col-lg-7 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card p-4" style={{ borderRadius: "20px" }}>
              <h4 className="fw-bold mb-4" style={{ color: "#fff" }}>Recent Activity</h4>
              {recentActivities.map((activity, i) => (
                <div
                  key={i}
                  className="d-flex align-items-center justify-content-between py-3"
                  style={{ borderBottom: i < recentActivities.length - 1 ? "1px solid rgba(135,222,250,0.1)" : "none" }}
                >
                  <div>
                    <p className="mb-0 fw-medium" style={{ color: "#fff", fontSize: "0.9rem" }}>{activity.action}</p>
                    <small style={{ color: "#87DEFA" }}>{activity.date}</small>
                  </div>
                  <span style={{ color: "#00BFFF", fontWeight: 600, fontSize: "0.9rem" }}>{activity.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-5 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card p-4" style={{ borderRadius: "20px" }}>
              <h4 className="fw-bold mb-4" style={{ color: "#fff" }}>Quick Actions</h4>
              <div className="d-flex flex-column gap-3">
                {[
                  { label: "Take New Challenge", icon: "🎯", memberOnly: true },
                  { label: "View Rewards", icon: "🏆", memberOnly: true },
                  { label: "Make a Deposit", icon: "💳", memberOnly: false },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (action.memberOnly) {
                        setModalAction(action.label);
                      } else {
                        router.push("/payment");
                      }
                    }}
                    className="d-flex align-items-center gap-3 p-3 rounded-3 w-100 border-0"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      textDecoration: "none",
                      color: "#87DEFA",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,191,255,0.3)";
                      e.currentTarget.style.background = "rgba(0,191,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{action.icon}</span>
                    <span className="fw-medium" style={{ color: "#fff" }}>{action.label}</span>
                    <span className="ms-auto" style={{ color: "#00BFFF" }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MembersOnlyModal
        show={modalAction !== null}
        onClose={() => setModalAction(null)}
        onJoin={() => {
          setModalAction(null);
          router.push("/membership");
        }}
      />
    </div>
  );
}