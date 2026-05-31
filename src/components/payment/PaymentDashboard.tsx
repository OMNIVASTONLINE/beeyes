"use client";

import { useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import MembersOnlyModal from "@/components/ui/MembersOnlyModal";
import { useAuth } from "@/contexts/AuthContext";

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
  { label: "Deposit", icon: "💳" },
  { label: "Withdraw", icon: "💰" },
  { label: "Bonuses", icon: "🎁" },
  { label: "VIP Club", icon: "👑" },
  { label: "Transactions", icon: "📋" },
];

const isMember = false;

const memberOnlyItems = ["Profile", "Withdraw", "Bonuses", "VIP Club", "Transactions"];

interface PaymentDashboardProps {
  onPaymentComplete?: () => void;
}

export default function PaymentDashboard({ onPaymentComplete }: PaymentDashboardProps) {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"crypto" | "card">("crypto");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoCurrencies[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(paymentProviders[0]);
  const [activeSidebar, setActiveSidebar] = useState("Deposit");
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
        <div className="col-lg-2 d-none d-lg-flex flex-column" style={{ background: "#0A1628", borderRight: "1px solid rgba(0,191,255,0.1)", minHeight: "calc(100dvh - 72px)" }}>
          <div className="p-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ color: "#87DEFA", fontSize: "0.75rem", marginBottom: "2px" }}>Account</div>
            <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {profile?.display_name || user?.email}
            </div>
          </div>
          <div className="p-2 pt-3 flex-grow-1">
            {sidebarItems.map((item) => {
              const isDeposit = item.label === "Deposit";
              const isDisabled = !isDeposit && !isMember && memberOnlyItems.includes(item.label);
              return (
                <button
                  key={item.label}
                  className="d-flex align-items-center gap-2 w-100 p-2 rounded-3 mb-0"
                  onClick={() => {
                    if (isDisabled) {
                      setShowMemberModal(true);
                    } else {
                      setActiveSidebar(item.label);
                    }
                  }}
                  style={{
                    background: activeSidebar === item.label ? "rgba(0,212,255,0.1)" : "transparent",
                    border: "none",
                    color: activeSidebar === item.label ? "#00BFFF" : "#87DEFA",
                    cursor: isDisabled ? "pointer" : "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "0.9rem",
                    opacity: isDisabled ? 0.6 : 1,
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
                  <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.85rem" }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-10 p-3 p-md-3 p-lg-4" style={{ minHeight: "calc(100dvh - 72px)" }}>
          <h3 className="fw-bold mb-0" style={{ fontSize: "1.3rem" }}>
            <span className="neon-text">Deposit</span>
          </h3>
          <p className="mb-3" style={{ color: "#87DEFA", fontSize: "0.85rem" }}>
            Fund your account to unlock premium features
          </p>

          {/* Tabs */}
          <div className="d-flex gap-2 mb-3">
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

          {/* Deposit Card */}
          <div className="glass-card p-3 p-md-4" style={{ borderRadius: "16px" }}>
            <div className="row g-3 align-items-start">
              {/* Left: Crypto Selection + Providers */}
              <div className="col-md-7">
                <h5 className="fw-bold mb-2" style={{ color: "#fff", fontSize: "0.85rem" }}>Select Cryptocurrency</h5>

                <div className="position-relative mb-3">
                  <button
                    className="d-flex align-items-center justify-content-between w-100 p-2 rounded-3"
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
                        width: 36, height: 36, borderRadius: "50%",
                        background: `${selectedCrypto.color}20`, color: selectedCrypto.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 700, fontSize: "1.1rem",
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
                            border: "none", color: "#fff", cursor: "pointer", transition: "0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(0,191,255,0.05)"}
                          onMouseLeave={(e) => {
                            if (selectedCrypto.symbol !== crypto.symbol)
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                          }}
                        >
                          <span style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: `${crypto.color}20`, color: crypto.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
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

                <h5 className="fw-bold mb-2" style={{ color: "#fff", fontSize: "0.85rem" }}>Payment Provider</h5>
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {paymentProviders.map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => setSelectedProvider(provider)}
                      style={{
                        padding: "6px 14px", borderRadius: "10px",
                        background: selectedProvider.name === provider.name ? `${provider.color}20` : "rgba(255,255,255,0.03)",
                        border: selectedProvider.name === provider.name ? `1px solid ${provider.color}` : "1px solid rgba(255,255,255,0.08)",
                        color: selectedProvider.name === provider.name ? provider.color : "#87DEFA",
                        fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {provider.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => { setShowConfirmModal(true); setConfirmDone(false); setConfirmEmail(""); setConfirmTxid(""); }}
                  className="btn w-100 py-2 fw-bold mt-2"
                  style={{
                    background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
                    border: "none", color: "#fff", borderRadius: "12px",
                    fontSize: "0.85rem", cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,191,255,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Payment Made
                </button>
              </div>

              {/* Right: Address + QR side by side */}
              <div className="col-md-5">
                <div className="d-flex gap-3 align-items-start">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h5 className="fw-bold mb-2" style={{ color: "#fff", fontSize: "0.85rem" }}>Wallet Address</h5>
                    <div className="p-2 rounded-3 mb-2" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <code style={{ color: "#00BFFF", fontSize: "0.75rem", wordBreak: "break-all", display: "block", marginBottom: "6px" }}>{walletAddress}</code>
                      <button
                        onClick={() => { navigator.clipboard.writeText(walletAddress); }}
                        className="btn btn-sm"
                        style={{ color: "#00BFFF", border: "1px solid rgba(0,191,255,0.3)", borderRadius: "8px", fontSize: "0.75rem", padding: "4px 12px" }}
                      >
                        Copy Address
                      </button>
                    </div>
                    <p style={{ color: "#87DEFA", fontSize: "0.7rem", lineHeight: 1.4, margin: 0 }}>
                      Send only {selectedCrypto.name} ({selectedCrypto.symbol}) to this address. Sending other coins may result in permanent loss.
                    </p>
                  </div>
                  <div className="text-center" style={{ flexShrink: 0 }}>
                    <div style={{
                      width: 100, height: 100,
                      background: "#fff", borderRadius: "10px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "5px",
                    }}>
                      <QRCodeSVG value={walletAddress} size={90} bgColor="#ffffff" fgColor="#000000" level="M" />
                    </div>
                    <small style={{ color: "#87DEFA", fontSize: "0.65rem", display: "block", marginTop: "4px" }}>Scan to deposit</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deposit History Table */}
          <div className="glass-card p-3 p-md-4 mt-3" style={{ borderRadius: "16px" }}>
            <h5 className="fw-bold mb-3" style={{ color: "#fff", fontSize: "1rem" }}>Deposits History</h5>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-dark table-borderless mb-0" style={{ fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ color: "#87DEFA", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <th className="py-2 ps-0">Amount</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Date</th>
                    <th className="py-2 text-end pe-0">More</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmDone ? (
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      <td className="py-3 ps-0 fw-medium" style={{ color: "#fff" }}>{selectedCrypto.symbol}</td>
                      <td className="py-3"><span style={{ color: "#00BFFF", fontWeight: 500 }}>Completed</span></td>
                      <td className="py-3" style={{ color: "#87DEFA" }}>{new Date().toLocaleDateString()}</td>
                      <td className="py-3 text-end pe-0">
                        <button
                          className="btn btn-sm"
                          style={{ color: "#00BFFF", border: "1px solid rgba(0,191,255,0.2)", borderRadius: "8px", padding: "2px 10px", fontSize: "0.75rem", cursor: "pointer" }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4" style={{ color: "#87DEFA", fontSize: "0.85rem" }}>
                        You do not have deposits.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                      onPaymentComplete?.();
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
