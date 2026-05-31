"use client";

import { useState } from "react";

interface SignupFormProps {
  onSignup: (email: string, password: string, username: string) => Promise<void>;
}

export default function SignupForm({ onSignup }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.username.trim()) errs.username = "Username is required";
    else if (formData.username.trim().length < 3) errs.username = "Min 3 characters";
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email format";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6) errs.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      try {
        await onSignup(formData.email, formData.password, formData.username.trim());
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="glass-card p-2 p-md-3 animate-fade-in-up"
      style={{ borderRadius: "16px", maxWidth: "460px", margin: "0 auto" }}
    >
      <div className="text-center mb-2">
        <h3 className="fw-bold mb-0" style={{ color: "#fff", fontSize: "1.1rem" }}>Create Account</h3>
        <p style={{ color: "#87DEFA", fontSize: "0.75rem", marginTop: "1px" }}>
          Join the challenge and unlock rewards
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Username */}
        <div className="mb-2">
          <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.8rem" }}>Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "0.9rem",
            }}
            placeholder="Your display name"
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        {/* Email */}
        <div className="mb-2">
          <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.8rem" }}>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "0.9rem",
            }}
            placeholder="you@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.8rem" }}>Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "0.9rem",
            }}
            placeholder="Min 6 characters"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="mb-2">
          <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.8rem" }}>Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "0.9rem",
            }}
            placeholder="Repeat password"
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="btn btn-neon w-100 py-1" disabled={loading} style={{ fontSize: "0.9rem" }}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}