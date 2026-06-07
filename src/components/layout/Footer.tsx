import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4" style={{
      borderTop: "1px solid rgba(0, 191, 255, 0.1)",
      background: "rgba(10, 10, 26, 0.95)"
    }}>
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-md-4 text-center text-md-start">
            <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
              <span style={{ color: "#00BFFF" }}>Mr</span>
              <span style={{ color: "#E91E78" }}>Beast</span>
            </span>
            <p className="mt-2 mb-0" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              Interactive Rewards Challenge Platform
            </p>
          </div>

          <div className="col-md-4 d-flex justify-content-center gap-4">
            <Link href="/terms" style={{ color: "#87DEFA", textDecoration: "none", fontSize: "0.9rem" }}>
              Terms
            </Link>
            <Link href="/privacy" style={{ color: "#87DEFA", textDecoration: "none", fontSize: "0.9rem" }}>
              Privacy
            </Link>
            <Link href="/contact" style={{ color: "#87DEFA", textDecoration: "none", fontSize: "0.9rem" }}>
              Contact
            </Link>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <p className="mb-0" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              &copy; {new Date().getFullYear()} MrBeast. All rights reserved.
            </p>
          </div>
        </div>
        <div className="text-center mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <img src="/partner.png" alt="Partners" style={{ height: "clamp(50px, 10vw, 80px)", width: "auto", opacity: 0.8, maxWidth: "100%" }} />
        </div>
      </div>
    </footer>
  );
}