"use client";

import { useRouter } from "next/navigation";
import MembershipCard from "@/components/home/MembershipCard";
import { useAuth } from "@/contexts/AuthContext";

export default function MembershipPage() {
  const router = useRouter();
  const { setMembershipSelected } = useAuth();

  const handleSelect = async () => {
    try {
      await setMembershipSelected();
    } catch {
      // proceed anyway
    }
    router.push("/payment");
  };

  return (
    <div style={{ minHeight: "100dvh", background: "#0D1B2A", display: "flex", alignItems: "flex-start", paddingTop: "3vh", paddingBottom: "20px" }}>
      <MembershipCard onSelect={handleSelect} />
    </div>
  );
}
