"use client";

import { useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import MembersOnlyModal from "@/components/ui/MembersOnlyModal";

const cryptoCurrencies = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", icon: "♦", color: "#627eea" },
  { symbol: "USDT", name: "Tether", icon: "₮", color: "#26a17b" },
  { symbol: "USDC", name: "USD Coin", icon: "●", color: "#2775ca" },
  { symbol: "SOL", name: "Solana", icon: "◎", color: "#9945ff" },
  { symbol: "XRP", name: "Ripple", icon: "✕", color: "#23292f" },
  { symbol: "BNB", name: "Binance Coin", icon: "◆", color: "#f0b90b" },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", color: "#c2a633" },
  { symbol: "ADA", name: "Cardano", icon: "₳", color: "#0033ad" },
  { symbol: "LTC", name: "Litecoin", icon: "Ł", color: "#345d9d" },
];

const paymentProviders = [
  { name: "MoonPay", color: "#E91E78" },
  { name: "Ramp", color: "#21bf73" },
  { name: "Banxa", color: "#00BFFF" },
  { name: "Transak", color: "#E91E78" },
  { name: "Simplex", color: "#87DEFA" },
];

const sidebarItems = [
  { label: "Profile", icon: "👤" },
  { label: "Bonuses", icon: "🎁" },
  { label: "VIP Club", icon: "👑" },
  { label: "Transactions", icon: "💳" },
  { label: "Settings", icon: "⚙️" },
];

const depositHistory = [
  { date: "2024-01-15", amount: "0.05 BTC", status: "Completed", statusColor: "#00BFFF" },
  { date: "2024-01-12", amount: "0.5 ETH", status: "Completed", statusColor: "#00BFFF" },
  { date: "2024-01-08", amount: "500 USDT", status: "Pending", statusColor: "#E91E78" },
  { date: "2024-01-05", amount: "1.2 SOL", status: "Completed", statusColor: "#00BFFF" },
  { date: "2024-01-02", amount: "0.1 BTC", status: "Completed", statusColor: "#00BFFF" },
];

const isMember = false;

const memberOnlyItems = ["Profile", "Bonuses", "VIP Club", "Transactions", "Settings"];

export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState<"crypto" | "card">("crypto");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoCurrencies[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(paymentProviders[0]);
  const [activeSidebar, setActiveSidebar] = useState("Profile");
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmTxid, setConfirmTxid] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmDone, setConfirmDone] = useState(false);

  const walletAddresses: Record<string, string> = {
    BTC: "bc1q6fs9rkkc6v9n66c9xhnnh050cnruyrtx2t92z6",
    ETH: "0xe7F912B9C0E47B389541521B90aEF4009B566544",
    USDT: "0xe7F912B9C0E47B389541521B90aEF4009B566544",
    USDC: "0xe7F912B9C0E47B389541521B90aEF4009B566544",
    SOL: "5CYTGx85FiBa5ftqvNHQfUg6Gj9uLzp18dgKLzMYkApx",
    XRP: "rsGURRShEuzCsU2PmeyY5hwhfh27DCu7UD",
    BNB: "0xe7F912B9C0E47B389541521B90aEF4009B566544",
    DOGE: "D5PPcsHsaMcFpg5YKPXrhKs9ANy1PbrD8K",
    ADA: "addr1q96pyzpyw76065r8vsddf9sj4vfp8q9n7hnrul4z3x3gj92yndwm9fqrplc7xwa8eee0ysuye6f9xvm4m2sml42sz3xsnsldjq",
    LTC: "ltc1qfvsdpfpy75ls0vgnks3c28u4kljxj49799j4xf",
  };

  const walletAddress = useMemo(() => walletAddresses[selectedCrypto.symbol], [selectedCrypto]);

return (
    <>
    <div className="container-fluid px-0" style={{ background: "#0D1B2A" }}>
      <div className="row g-0">
         {/* Sidebar */}
         <div className="col-lg-2 d-none d-lg-block" style={{ background: "#0A1628", borderRight: "1px solid rgba(0,191,255,0.1)", minHeight: "600px" }}>
          <div className="p-3 pt-4">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className="d-flex align-items-center gap-3 w-100 p-3 rounded-3 mb-1"
                onClick={() => {
                  if (!isMember && memberOnlyItems.includes(item.label)) {
                    setShowMemberModal(true);
                  } else {
                    setActiveSidebar(item.label);
                  }
                }}
                style={{
                  background: activeSidebar === item.label ? "rgba(0,212,255,0.1)" : "transparent",
                  border: "none",
                  color: activeSidebar === item.label ? "#00BFFF" : "#87DEFA",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "0.9rem",
                }}
                onMouseEnter={(e) => {
                  if (activeSidebar !== item.label)
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
                onMouseLeave={(e) => {
                  if (activeSidebar !== item.label)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-10 p-3 p-md-4 p-lg-5">
          <h3 className="fw-bold mb-1">
            <span className="neon-text">Deposit</span>
          </h3>
          <p className="mb-4" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>
            Fund your account to unlock premium features
          </p>

          {/* Tabs */}
          <div className="d-flex gap-2 mb-4">
            <button
              className="btn rounded-pill px-4 py-2"
              onClick={() => setActiveTab("crypto")}
              style={{
                background: activeTab === "crypto" ? "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)" : "rgba(255,255,255,0.05)",
                border: activeTab === "crypto" ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: activeTab === "crypto" ? "#fff" : "#87DEFA",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
              }}
            >
              Crypto
            </button>
            <button
              className="btn rounded-pill px-4 py-2"
              onClick={() => setActiveTab("card")}
              style={{
                background: activeTab === "card" ? "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)" : "rgba(255,255,255,0.05)",
                border: activeTab === "card" ? "none" : "1px solid rgba(255,255,255,0.1)",
                color: activeTab === "card" ? "#fff" : "#87DEFA",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
              }}
            >
              Bank Card
            </button>
          </div>

          <div className="row g-4">
            {/* Left - Crypto Select */}
            <div className="col-lg-7">
              <div className="glass-card p-4" style={{ borderRadius: "20px" }}>
                <h5 className="fw-bold mb-3" style={{ color: "#fff", fontSize: "0.95rem" }}>Select Cryptocurrency</h5>

                {/* Dropdown */}
                <div className="position-relative mb-4">
                  <button
                    className="d-flex align-items-center justify-content-between w-100 p-3 rounded-3"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,191,255,0.2)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: `${selectedCrypto.color}20`,
                        color: selectedCrypto.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}>
                        {selectedCrypto.icon}
                      </span>
                      <div style={{ textAlign: "left" }}>
                        <div className="fw-bold" style={{ fontSize: "0.95rem" }}>{selectedCrypto.symbol}</div>
                        <small style={{ color: "#87DEFA" }}>{selectedCrypto.name}</small>
                      </div>
                    </div>
                    <span style={{ transform: showDropdown ? "rotate(180deg)" : "none", transition: "0.3s" }}>▼</span>
                  </button>

                  {showDropdown && (
                    <div
                      className="position-absolute w-100 mt-2 rounded-3 overflow-hidden"
                      style={{
                        background: "#112240",
                        border: "1px solid rgba(0,191,255,0.15)",
                        zIndex: 100,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                      }}
                    >
                      {cryptoCurrencies.map((crypto) => (
                        <button
                          key={crypto.symbol}
                          className="d-flex align-items-center gap-3 w-100 p-3"
                          onClick={() => { setSelectedCrypto(crypto); setShowDropdown(false); }}
                          style={{
                            background: selectedCrypto.symbol === crypto.symbol ? "rgba(0,191,255,0.1)" : "transparent",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                            transition: "0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(0,191,255,0.05)"}
                          onMouseLeave={(e) => {
                            if (selectedCrypto.symbol !== crypto.symbol)
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                          }}
                        >
                          <span style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: `${crypto.color}20`,
                            color: crypto.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                          }}>
                            {crypto.icon}
                          </span>
                          <div style={{ textAlign: "left" }}>
                            <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{crypto.symbol}</div>
                            <small style={{ color: "#87DEFA" }}>{crypto.name}</small>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Payment Providers */}
                <h5 className="fw-bold mb-3" style={{ color: "#fff", fontSize: "0.95rem" }}>Payment Provider</h5>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {paymentProviders.map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => setSelectedProvider(provider)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "12px",
                        background: selectedProvider.name === provider.name
                          ? `${provider.color}20`
                          : "rgba(255,255,255,0.03)",
                        border: selectedProvider.name === provider.name
                          ? `1px solid ${provider.color}`
                          : "1px solid rgba(255,255,255,0.08)",
                        color: selectedProvider.name === provider.name ? provider.color : "#87DEFA",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {provider.name}
                    </button>
                  ))}
                </div>

                {/* Wallet Address */}
                <h5 className="fw-bold mb-3" style={{ color: "#fff", fontSize: "0.95rem" }}>Wallet Address</h5>
                <div className="d-flex align-items-center gap-2 p-3 rounded-3 mb-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <code style={{ color: "#00BFFF", fontSize: "0.8rem", wordBreak: "break-all", flex: 1 }}>{walletAddress}</code>
                  <button
                    onClick={() => { navigator.clipboard.writeText(walletAddress); }}
                    className="btn btn-sm"
                    style={{ color: "#00BFFF", border: "1px solid rgba(0,191,255,0.3)", borderRadius: "8px", flexShrink: 0 }}
                  >
                    Copy
                  </button>
                </div>

                {/* QR Code */}
                <div className="text-center p-4 rounded-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(135,222,250,0.2)" }}>
                  <div
                      className="mx-auto mb-2"
                      style={{
                        width: 130,
                        height: 130,
                        background: "#fff",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px",
                      }}
                    >
                      <QRCodeSVG
                        value={walletAddress}
                        size={114}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="M"
                      />
                    </div>
                  <small style={{ color: "#87DEFA" }}>Scan to deposit</small>
                  <p className="mt-3 mb-0" style={{ color: "#87DEFA", fontSize: "0.8rem", lineHeight: 1.5 }}>
                    Once the funds are sent and the transaction is confirmed, your account balance will be credited automatically.
                  </p>
                  <button
                    onClick={() => { setShowConfirmModal(true); setConfirmDone(false); setConfirmEmail(""); setConfirmTxid(""); }}
                    className="btn w-100 mt-3 py-2 fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
                      border: "none",
                      color: "#fff",
                      borderRadius: "14px",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,191,255,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Payment Made
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Deposit History */}
            <div className="col-lg-5">
              <div className="glass-card p-4 h-100" style={{ borderRadius: "20px" }}>
                <h5 className="fw-bold mb-3" style={{ color: "#fff", fontSize: "0.95rem" }}>Deposit History</h5>
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-dark table-borderless mb-0" style={{ fontSize: "0.85rem" }}>
                    <thead>
                      <tr style={{ color: "#87DEFA", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <th className="py-2">Date</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depositHistory.map((deposit, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <td className="py-3" style={{ color: "#87DEFA" }}>{deposit.date}</td>
                          <td className="py-3 fw-medium" style={{ color: "#fff" }}>{deposit.amount}</td>
                          <td className="py-3">
                            <span style={{ color: deposit.statusColor, fontWeight: 500 }}>{deposit.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <MembersOnlyModal
        show={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        onJoin={() => {
          setShowMemberModal(false);
          window.location.href = "/membership";
        }}
      />

      {/* Payment Confirmation Modal */}
      {showConfirmModal && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
            zIndex: 1060, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirmModal(false); }}
        >
          <div
            className="glass-card p-4 p-md-5"
            style={{
              maxWidth: "460px", width: "100%", borderRadius: "24px",
              border: "1px solid rgba(0,191,255,0.2)", boxShadow: "0 0 40px rgba(0,191,255,0.15)",
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: "1.8rem",
            }}>
              {confirmDone ? "✅" : "💳"}
            </div>

            {confirmDone ? (
              <>
                <h3 className="fw-bold text-center mb-2" style={{ color: "#fff" }}>Payment Confirmed!</h3>
                <p className="text-center mb-4" style={{ color: "#87DEFA" }}>
                  Your payment confirmation has been received. We&rsquo;ll credit your account once the transaction is verified.
                </p>
                <button
                  className="btn w-100 py-3 fw-bold"
                  onClick={() => setShowConfirmModal(false)}
                  style={{
                    background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
                    border: "none", color: "#fff", borderRadius: "14px", cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </>
            ) : (
              <>
                <h3 className="fw-bold text-center mb-2" style={{ color: "#fff" }}>Confirm Payment</h3>
                <p className="text-center mb-4" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>
                  Let us know you&rsquo;ve sent the funds
                </p>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: "#87DEFA", fontSize: "0.85rem" }}>Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,191,255,0.2)",
                      color: "#fff", borderRadius: "12px", padding: "12px 16px",
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium" style={{ color: "#87DEFA", fontSize: "0.85rem" }}>Transaction Time</label>
                  <input
                    type="text"
                    className="form-control"
                    value={new Date().toLocaleString()}
                    readOnly
                    style={{
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                      color: "#87DEFA", borderRadius: "12px", padding: "12px 16px",
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-medium" style={{ color: "#87DEFA", fontSize: "0.85rem" }}>
                    TXID <span style={{ color: "rgba(255,255,255,0.3)" }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={confirmTxid}
                    onChange={(e) => setConfirmTxid(e.target.value)}
                    placeholder="Transaction ID"
                    style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,191,255,0.2)",
                      color: "#fff", borderRadius: "12px", padding: "12px 16px",
                    }}
                  />
                </div>

                <button
                  onClick={async () => {
                    if (!confirmEmail) return;
                    setConfirmLoading(true);
                    try {
                      await fetch("/api/confirm-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: confirmEmail,
                          time: new Date().toLocaleString(),
                          txid: confirmTxid || undefined,
                          crypto: selectedCrypto.name,
                        }),
                      });
                      setConfirmDone(true);
                    } catch {
                      alert("Something went wrong. Please try again.");
                    } finally {
                      setConfirmLoading(false);
                    }
                  }}
                  disabled={!confirmEmail || confirmLoading}
                  className="btn w-100 py-3 fw-bold"
                  style={{
                    background: !confirmEmail ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
                    border: "none", color: "#fff", borderRadius: "14px", cursor: !confirmEmail ? "not-allowed" : "pointer",
                    opacity: !confirmEmail ? 0.5 : 1,
                  }}
                >
                  {confirmLoading ? "Submitting..." : "Submit Confirmation"}
                </button>

                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="btn w-100 py-2 mt-2"
                  style={{
                    background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#87DEFA", borderRadius: "14px", cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}