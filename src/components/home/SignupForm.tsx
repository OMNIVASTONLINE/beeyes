"use client";

import { useState } from "react";

interface SignupFormProps {
  onSignup: (email: string) => void;
}

export default function SignupForm({ onSignup }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email format";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6) errs.password = "Min 6 characters";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      onSignup(formData.email);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-5 text-center animate-fade-in-up" style={{ borderRadius: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
        <h3 className="fw-bold mb-2" style={{ color: "#00BFFF" }}>Account Created!</h3>
        <p style={{ color: "#87DEFA" }}>
          Welcome! Check your email for confirmation.
        </p>
      </div>
    );
  }

  return (
    <div
      className="glass-card p-4 p-md-5 animate-fade-in-up"
      style={{ borderRadius: "20px", maxWidth: "500px", margin: "0 auto" }}
    >
      <div className="text-center mb-4">
        <h3 className="fw-bold mb-1" style={{ color: "#fff" }}>Create Account</h3>
        <p style={{ color: "#87DEFA", fontSize: "0.9rem" }}>
          Join the challenge and unlock rewards
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
            placeholder="you@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
            placeholder="Min 6 characters"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
            placeholder="Repeat password"
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="btn btn-neon w-100 py-3">
          Create Account
        </button>
      </form>
    </div>
  );
}