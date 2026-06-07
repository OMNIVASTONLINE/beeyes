export default function ContactPage() {
  return (
    <div className="section-padding" style={{ minHeight: "100dvh", background: "#0D1B2A" }}>
      <div className="container py-4 py-md-5">
        <div className="mb-5 animate-fade-in-up">
          <h1 className="fw-bold mb-2" style={{ fontSize: "clamp(1.5rem, 6vw, 2.5rem)" }}>
            <span className="neon-text">Contact</span>{" "}
            <span style={{ color: "#fff" }}>Us</span>
          </h1>
        </div>

        <div style={{ color: "#ccc", lineHeight: 1.8, maxWidth: "600px" }}>
          <h3 className="mt-3 mt-md-4 mb-3" style={{ color: "#00BFFF", fontSize: "clamp(1rem, 3.5vw, 1.25rem)" }}>Corporate Headquarters</h3>
          <p style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}>
            MrBeast LLC<br />
            2404 Royal Drive<br />
            Winterville, NC 28590-9132
          </p>

          <h3 className="mt-4 mt-md-5 mb-3" style={{ color: "#00BFFF", fontSize: "clamp(1rem, 3.5vw, 1.25rem)" }}>Business &amp; Partnership Email</h3>
          <p style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}>
            <a href="mailto:contact@imrbeastbusiness.com" style={{ color: "#E91E78", textDecoration: "none" }}>
              contact@imrbeastbusiness.com
            </a>
          </p>

          <h3 className="mt-4 mt-md-5 mb-3" style={{ color: "#00BFFF", fontSize: "clamp(1rem, 3.5vw, 1.25rem)" }}>Fan Mail / PO Box</h3>
          <p style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)" }}>
            MrBeast<br />
            1822-6 S. Glenburnie Rd (Number 275)<br />
            New Bern, NC 28562
          </p>
        </div>
      </div>
    </div>
  );
}
