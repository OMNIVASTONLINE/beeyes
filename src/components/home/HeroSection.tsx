"use client";

interface HeroSectionProps {
  onStartChallenge: () => void;
}

export default function HeroSection({ onStartChallenge }: HeroSectionProps) {
  return (
    <section className="section-padding d-flex align-items-center" style={{ minHeight: "100dvh", paddingTop: "100px", paddingBottom: "40px", background: "#0D1B2A" }}>
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-7 animate-fade-in-up">
            <div className="mb-3">
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "rgba(0, 191, 255, 0.15)",
                  color: "#00BFFF",
                  border: "1px solid rgba(0, 191, 255, 0.3)",
                  fontSize: "0.85rem",
                }}
              >
                🎯 New Challenge Available
              </span>
            </div>

            <h1
              className="display-3 fw-bold mb-4 hero-heading"
              style={{ lineHeight: 1.15, letterSpacing: "-0.02em" }}
            >
              <span className="neon-text">Interactive</span>
              <br />
              <span style={{ color: "#fff" }}>Rewards</span>{" "}
              <span style={{ color: "#00BFFF" }}>Challenge</span>
            </h1>

            <p
              className="lead mb-4"
              style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 3vw, 1.15rem)", maxWidth: "530px" }}
            >
              Answer 3 fun quiz questions to unlock $2500 Welcome Bonus
            </p>

            <div className="d-flex flex-wrap gap-2 gap-sm-3">
              <button className="btn btn-neon btn-lg" onClick={onStartChallenge}>
                <span className="d-flex align-items-center gap-2">
                  Start Challenge
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </button>
              <button
                className="btn btn-neon-outline btn-lg"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="stats-row mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <h3 className="fw-bold mb-0" style={{ color: "#00BFFF", fontSize: "clamp(1.2rem, 4vw, 1.75rem)" }}>12K+</h3>
                <small style={{ color: "var(--text-muted)", fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)" }}>Participants</small>
              </div>
              <div>
                <h3 className="fw-bold mb-0" style={{ color: "#E91E78", fontSize: "clamp(1.2rem, 4vw, 1.75rem)" }}>$50K+</h3>
                <small style={{ color: "var(--text-muted)", fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)" }}>Rewards Given</small>
              </div>
              <div>
                <h3 className="fw-bold mb-0" style={{ color: "#E91E78", fontSize: "clamp(1.2rem, 4vw, 1.75rem)" }}>98%</h3>
                <small style={{ color: "var(--text-muted)", fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)" }}>Satisfaction</small>
              </div>
            </div>
          </div>

          <div className="col-lg-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="mb-2 text-center fw-semibold" style={{ color: "#00BFFF", fontSize: "0.95rem" }}>
              Watch Past Winners & Challenge Testimonials
            </p>
            <div
              className="glass-card p-2 animate-pulse-glow"
              style={{ borderRadius: "24px", position: "relative", overflow: "hidden" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <video
                  src="/giveaway2.mp4"
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "16px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}