"use client";

import Link from "next/link";

export default function MembershipCard() {
  return (
    <div id="membership" className="section-padding" style={{ background: "#0D1B2A" }}>
      <div className="container">
        <div className="row justify-content-center animate-fade-in-up">
          <div className="col-lg-6 col-xl-5">
            <div
              className="glass-card p-4 p-md-5 text-center animate-pulse-glow"
              style={{ borderRadius: "24px", position: "relative", overflow: "hidden" }}
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

              <h4 className="fw-bold mb-1" style={{ color: "#fff" }}>Membership Access</h4>

              <div className="my-4">
                <span style={{ color: "#87DEFA", fontSize: "1.1rem" }}>$</span>
                <span style={{ color: "#fff", fontSize: "4rem", fontWeight: 800 }}>55</span>
              </div>

              <ul className="list-unstyled mb-4" style={{ textAlign: "left" }}>
                {[
                
                  "$2500 welcome bonus instant widrawal",
                  "Access to future challenges",
                  "VIP reward opportunities",
                  "Exclusive member dashboard",
                  "Priority support",
                  "Early access to new features",
                  "Money-back guarantee",
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-center gap-2 mb-2" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>
                    <span style={{ color: "#00BFFF" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/payment" className="btn btn-neon w-100 py-3">
                Get Started Now
              </Link>

              <p className="mt-3 mb-0" style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontStyle: "italic" }}>
                Money-back guarantee if you don&rsquo;t get a reward
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}