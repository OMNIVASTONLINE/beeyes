"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (loginError) {
      setError(loginError.message);
    } else if (data?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("quiz_completed, membership_selected, payment_completed")
        .eq("id", data.user.id)
        .single();

      if (profile?.payment_completed) router.push("/");
      else if (profile?.membership_selected) router.push("/payment");
      else if (profile?.quiz_completed) router.push("/membership");
      else router.push("/");
      router.refresh();
    }
  };

  return (
    <div style={{ paddingTop: "40px", paddingBottom: "40px", minHeight: "100dvh", background: "#0D1B2A" }}>
      <div className="container">
        <div className="text-center mb-5 pt-4 animate-fade-in-up">
          <h1 className="fw-bold mb-2" style={{ fontSize: "clamp(1.5rem, 6vw, 2.5rem)" }}>
            <span className="neon-text">Welcome</span>{" "}
            <span style={{ color: "#fff" }}>Back</span>
          </h1>
          <p style={{ color: "#87DEFA", maxWidth: "450px", margin: "0 auto", fontSize: "clamp(0.8rem, 2.5vw, 1rem)" }}>
            Sign in to your account to continue
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

        <div
          className="glass-card p-4 p-md-5 animate-fade-in-up"
          style={{ borderRadius: "20px", maxWidth: "500px", margin: "0 auto" }}
        >
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-1" style={{ color: "#fff" }}>Sign In</h3>
            <p style={{ color: "#87DEFA", fontSize: "0.9rem" }}>
              Enter your credentials
            </p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "12px 16px",
                }}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "12px 16px",
                }}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-neon w-100 py-3"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-4 mb-0" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ color: "#00BFFF", textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
