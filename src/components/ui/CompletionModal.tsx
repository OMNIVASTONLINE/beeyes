"use client";

import { useEffect, useState } from "react";

interface CompletionModalProps {
  show: boolean;
  score: number;
  total: number;
  onContinue: () => void;
}

function ConfettiEffect() {
  const colors = ["#00BFFF", "#E91E78", "#87DEFA", "#25D366", "#f7931a", "#ffcc00"];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1060 }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 2,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s infinite`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

export default function CompletionModal({ show, onContinue }: CompletionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!mounted) return null;

  return (
    <>
      {show && <ConfettiEffect />}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 1050,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          opacity: show ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          className="glass-card text-center p-4 p-md-5"
          style={{
            maxWidth: "480px",
            width: "100%",
            borderRadius: "24px",
            transform: show ? "scale(1)" : "scale(0.9)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
            }}
          />

          <div
            style={{
              width: "clamp(60px, 15vw, 80px)",
              height: "clamp(60px, 15vw, 80px)",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            🎉
          </div>

          <h2 className="fw-bold mb-2" style={{ color: "#fff", fontSize: "clamp(1.2rem, 5vw, 1.75rem)" }}>
            Congratulations!
          </h2>
          <p className="mb-3" style={{ color: "#87DEFA", fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}>
            You completed the challenge successfully.
          </p>

          <button className="btn btn-neon w-100 py-2 py-md-3" style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }} onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
}