export default function PrivacyPage() {
  return (
    <div className="section-padding" style={{ minHeight: "100vh", background: "#0D1B2A" }}>
      <div className="container py-5">
        <div className="mb-5 animate-fade-in-up">
          <h1 className="fw-bold mb-2">
            <span className="neon-text">Privacy</span>{" "}
            <span style={{ color: "#fff" }}>Policy</span>
          </h1>
          <p style={{ color: "var(--text-muted)" }}>Effective Date: 2026</p>
        </div>

        <div style={{ color: "#ccc", lineHeight: 1.8, maxWidth: "800px" }}>
          <p>This Privacy Policy explains how we collect, use, and protect your information.</p>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>1. Information We Collect</h3>
          <p>We may collect:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Payment information</li>
            <li>Device and browser data</li>
            <li>IP address</li>
            <li>Quiz participation and reward activity</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>2. How We Use Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Provide access to the Platform</li>
            <li>Process rewards and payments</li>
            <li>Improve user experience</li>
            <li>Prevent fraud and abuse</li>
            <li>Send updates and promotional messages</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>3. Cookies &amp; Tracking</h3>
          <ul>
            <li>We use cookies and analytics tools to improve performance and personalize content.</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>4. Data Sharing</h3>
          <p>We do not sell personal data. We may share information with:</p>
          <ul>
            <li>Payment processors</li>
            <li>Analytics providers</li>
            <li>Security and fraud prevention services</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>5. Data Security</h3>
          <ul>
            <li>We implement industry-standard security measures to protect your data.</li>
            <li>No system is completely secure, and we cannot guarantee absolute security.</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>6. User Rights</h3>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access your data</li>
            <li>Request corrections</li>
            <li>Request deletion</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>7. Third-Party Links</h3>
          <ul>
            <li>The Platform may contain links to external websites. We are not responsible for their privacy practices.</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>8. Children&rsquo;s Privacy</h3>
          <ul>
            <li>The Platform is not intended for children under 13.</li>
          </ul>

          <h3 className="mt-5 mb-3" style={{ color: "#00BFFF" }}>9. Updates</h3>
          <ul>
            <li>We may revise this Privacy Policy from time to time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
