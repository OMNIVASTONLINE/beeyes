"use client";

import { useState, useEffect } from "react";

export default function LocationGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  const allowedCountries = [
    "US", "GB", "CA", "AU", "NZ",
    "DE", "FR", "NL", "BE", "AT", "CH",
    "SE", "NO", "DK", "FI",
    "IE", "IT", "ES", "PT",
    "SG", "JP", "KR", "AE", "IL",
  ];

  useEffect(() => {
    fetch("http://ip-api.com/json/?fields=countryCode")
      .then((res) => res.json())
      .then((data) => setAllowed(allowedCountries.includes(data.countryCode)))
      .catch(() => setAllowed(true));
  }, []);

  if (allowed === null) return null;

  if (!allowed) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "#0a0a1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <h1 style={{ color: "#E91E78", marginBottom: "16px", fontSize: "clamp(1.5rem, 6vw, 2.5rem)" }}>Access Restricted</h1>
        <p style={{ color: "#87DEFA", fontSize: "clamp(0.9rem, 3vw, 1.1rem)", maxWidth: "500px" }}>
          This website is only available in select countries.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
