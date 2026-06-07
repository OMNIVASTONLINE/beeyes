"use client";

import SignupForm from "@/components/home/SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [error, setError] = useState("");

  const handleSignup = async (email: string, password: string, username: string) => {
    setError("");
    const { error: signupError } = await signup(email, password, { quiz_completed: true, display_name: username });
    if (signupError) {
      setError(signupError.message);
    } else {
      router.refresh();
      router.push("/membership");
    }
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "40px", minHeight: "100dvh", background: "#0D1B2A" }}>
      <div className="container">
        <div className="text-center mb-3 pt-2 animate-fade-in-up">
          <h1 className="fw-bold mb-1" style={{ fontSize: "clamp(1.3rem, 5vw, 1.6rem)" }}>
            <span className="neon-text">Create</span>{" "}
            <span style={{ color: "#fff" }}>Your Account</span>
          </h1>
          <p style={{ color: "#87DEFA", fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)", maxWidth: "380px", margin: "0 auto" }}>
            Join MrBeast and unlock exclusive rewards and challenges
          </p>
        </div>

        {error && (
          <div
            className="text-center mb-3 p-3 rounded-3"
            style={{
              background: "rgba(233,30,120,0.1)",
              border: "1px solid rgba(233,30,120,0.3)",
              color: "#E91E78",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            {error}
          </div>
        )}

        <SignupForm onSignup={handleSignup} />
      </div>
    </div>
  );
}
