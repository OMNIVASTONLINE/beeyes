export default function ContactPage() {
  return (
    <div className="section-padding" style={{ minHeight: "100vh", background: "#0D1B2A" }}>
      <div className="container py-5">
        <div className="mb-5 animate-fade-in-up">
          <h1 className="fw-bold mb-2">
            <span className="neon-text">Contact</span>{" "}
            <span style={{ color: "#fff" }}>Us</span>
          </h1>
        </div>

        <div style={{ color: "#ccc", lineHeight: 1.8, maxWidth: "600px" }}>
          <h3 className="mt-4 mb-3" style={{ color: "#00BFFF" }}>Corporate Headquarters</h3>
          <p>
            MrBeast LLC<br />
            2404 Royal Drive<br />
            Winterville, NC 28590-9132
          </p>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>Business &amp; Partnership Email</h3>
          <p>
            <a href="mailto:contact@imrbeastbusiness.com" style={{ color: "#E91E78", textDecoration: "none" }}>
              contact@imrbeastbusiness.com
            </a>
          </p>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>Fan Mail / PO Box</h3>
          <p>
            MrBeast<br />
            1822-6 S. Glenburnie Rd (Number 275)<br />
            New Bern, NC 28562
          </p>
        </div>
      </div>
    </div>
  );
}
