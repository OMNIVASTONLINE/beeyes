"use client";

import PaymentDashboard from "@/components/payment/PaymentDashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function PaymentPage() {
  const { setPaymentCompleted } = useAuth();

  const handlePaymentComplete = async () => {
    await setPaymentCompleted();
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#0D1B2A" }}>
      <PaymentDashboard onPaymentComplete={handlePaymentComplete} />
    </div>
  );
}
