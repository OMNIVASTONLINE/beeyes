"use client";

import { useState, useEffect } from "react";
import { activityNotifications, ActivityNotification } from "@/data/notificationsData";

export default function LiveActivityPopup() {
  const [current, setCurrent] = useState<ActivityNotification | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const random = activityNotifications[Math.floor(Math.random() * activityNotifications.length)];
      setCurrent(random);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000);
    };

    showNotification();
    const interval = setInterval(showNotification, 6000);

    return () => clearInterval(interval);
  }, []);

  if (!current) return null;

  const colors = ["#00BFFF", "#E91E78", "#87DEFA", "#25D366", "#f7931a"];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        left: "24px",
        transform: visible ? "translateX(0)" : "translateX(-50px)",
        zIndex: 9998,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="glass-card d-flex align-items-center gap-2 px-3 py-1"
        style={{
          minWidth: "300px",
          maxWidth: "360px",
          animation: visible ? "fadeInUp 0.5s ease" : "none",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors[current.id % colors.length]}, ${colors[(current.id + 1) % colors.length]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.75rem",
            flexShrink: 0,
          }}
        >
          {current.name.charAt(0)}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <p className="mb-0" style={{ fontSize: "0.85rem", lineHeight: 1.3 }}>
            <strong style={{ color: "#00BFFF" }}>{current.name}</strong>
            <span style={{ color: "#87DEFA" }}>
              {" "}from {current.city}, {current.state}{" "}
            </span>
            <span style={{ color: "#E91E78" }}>{current.action}</span>
          </p>
        </div>

        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "4px",
            fontSize: "1.1rem",
            lineHeight: 1,
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}