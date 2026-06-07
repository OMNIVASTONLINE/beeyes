"use client";

import Link from "next/link";

interface MembershipCardProps {
  onSelect?: () => void;
}

export default function MembershipCard({ onSelect }: MembershipCardProps) {
  return (
    <div className="container" style={{ padding: "12px 0" }}>
      <div className="row justify-content-center animate-fade-in-up">
        <div className="col-lg-6 col-xl-5">
          <div
            className="glass-card p-3 text-center animate-pulse-glow"
            style={{ borderRadius: "20px", position: "relative", overflow: "hidden" }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
              }}
            />

            <h4 className="fw-bold mb-0" style={{ color: "#fff", fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>Membership Access</h4>

            <div className="my-2">
              <span style={{ color: "#87DEFA", fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)" }}>$</span>
              <span style={{ color: "#fff", fontSize: "clamp(2.2rem, 8vw, 2.8rem)", fontWeight: 800 }}>55</span>
            </div>

            <ul className="list-unstyled mb-3" style={{ textAlign: "left" }}>
              {[
                "$2500 welcome bonus instant widrawal",
                "Access to future challenges",
                "VIP reward opportunities",
                "Exclusive member dashboard",
                "Priority support",
                "Early access to new features",
                "Money-back guarantee",
              ].map((item, i) => (
                <li key={i} className="d-flex align-items-center gap-2 mb-1" style={{ color: "#87DEFA", fontSize: "clamp(0.75rem, 2.5vw, 0.8rem)" }}>
                  <span style={{ color: "#00BFFF" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {onSelect ? (
              <button onClick={onSelect} className="btn btn-neon w-100 py-2" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                Get Started Now
              </button>
            ) : (
              <Link href="/payment" className="btn btn-neon w-100 py-2" style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)" }}>
                Get Started Now
              </Link>
            )}

            <p className="mt-2 mb-0" style={{ color: "var(--text-muted)", fontSize: "clamp(0.6rem, 2vw, 0.7rem)", fontStyle: "italic" }}>
              Money-back guarantee if you don&rsquo;t get a reward
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}