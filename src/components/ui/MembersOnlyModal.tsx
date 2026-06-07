"use client";

import { useEffect, useRef, useCallback } from "react";

interface MembersOnlyModalProps {
  show: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export default function MembersOnlyModal({ show, onClose, onJoin }: MembersOnlyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (show) {
      previousActiveElement.current = document.activeElement;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        const firstButton = modalRef.current?.querySelector<HTMLElement>("button");
        firstButton?.focus();
      });
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [show, handleKeyDown]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="members-modal-title"
      aria-describedby="members-modal-desc"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.25s ease forwards",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="glass-card text-center p-4 p-md-5"
        style={{
          maxWidth: "440px",
          width: "100%",
          borderRadius: "24px",
          animation: "modalEnter 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(168, 85, 247, 0.2)",
          boxShadow: "0 0 40px rgba(168, 85, 247, 0.15), 0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #a855f7 0%, #f59e0b 50%, #a855f7 100%)",
          }}
        />

        <div
          style={{
            width: "clamp(60px, 15vw, 72px)",
            height: "clamp(60px, 15vw, 72px)",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a855f7 0%, #f59e0b 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
          }}
        >
          👑
        </div>

        <h2
          id="members-modal-title"
          className="fw-bold mb-2"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
          }}
        >
          You&rsquo;re not a member yet.
        </h2>

        <p
          id="members-modal-desc"
          className="mb-3 mb-md-4"
          style={{
            color: "#a78bfa",
            fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
            lineHeight: 1.6,
          }}
        >
          Join Membership to unlock this feature.
        </p>

        <div className="d-flex flex-column gap-2">
          <button
            className="btn w-100 py-2 py-md-3 fw-bold"
            onClick={onJoin}
            style={{
              background: "linear-gradient(135deg, #a855f7 0%, #f59e0b 100%)",
              border: "none",
              color: "#fff",
              borderRadius: "14px",
              fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(245, 158, 11, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Join Membership
          </button>

          <button
            className="btn w-100 py-2"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(168, 85, 247, 0.25)",
              color: "#a78bfa",
              borderRadius: "14px",
              fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)",
              fontWeight: 500,
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(168, 85, 247, 0.08)";
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.25)";
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
