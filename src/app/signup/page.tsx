"use client";

import SignupForm from "@/components/home/SignupForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleSignup = () => {
    login();
    setTimeout(() => {
      router.push("/membership");
    }, 1500);
  };

  return (
    <div className="section-padding" style={{ minHeight: "100vh", background: "#0D1B2A" }}>
      <div className="container">
        <div className="text-center mb-5 pt-4 animate-fade-in-up">
          <h1 className="fw-bold mb-2">
            <span className="neon-text">Create</span>{" "}
            <span style={{ color: "#fff" }}>Your Account</span>
          </h1>
          <p style={{ color: "#87DEFA", maxWidth: "450px", margin: "0 auto" }}>
            Join MrBeast and unlock exclusive rewards and challenges
          </p>
        </div>

        <SignupForm onSignup={handleSignup} />
      </div>
    </div>
  );
}