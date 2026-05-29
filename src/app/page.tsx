"use client";

import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import QuizSection from "@/components/quiz/QuizSection";
import CompletionModal from "@/components/ui/CompletionModal";
import SignupForm from "@/components/home/SignupForm";
import MembershipCard from "@/components/home/MembershipCard";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { login } = useAuth();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMembership, setShowMembership] = useState(false);

  const handleStartChallenge = () => {
    setQuizStarted(true);
    setTimeout(() => {
      document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setQuizComplete(true);
    setShowModal(true);
  };

  const handleContinue = () => {
    setShowModal(false);
    setShowSignup(true);
    setTimeout(() => {
      const signupEl = document.getElementById("signup");
      if (signupEl) {
        signupEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSignup = (_email: string) => {
    login();
    setShowSignup(false);
    setShowMembership(true);
    setTimeout(() => {
      const membershipEl = document.getElementById("membership");
      if (membershipEl) {
        membershipEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <HeroSection onStartChallenge={handleStartChallenge} />

      {quizStarted && (
        <QuizSection onComplete={handleQuizComplete} />
      )}

      <CompletionModal
        show={showModal}
        score={finalScore}
        total={3}
        onContinue={handleContinue}
      />

      {showSignup && (
        <div id="signup" className="section-padding" style={{ background: "#0D1B2A" }}>
          <div className="container">
            <div className="text-center mb-4 animate-fade-in-up">
              <h2 className="fw-bold mb-2">
                <span className="neon-text">Create</span>{" "}
                <span style={{ color: "#fff" }}>Your Account</span>
              </h2>
              <p style={{ color: "#87DEFA" }}>
                Join now to claim your rewards
              </p>
            </div>
            <SignupForm onSignup={handleSignup} />
          </div>
        </div>
      )}

      {showMembership && <MembershipCard />}

      {/* Features section always visible */}
      {!quizStarted && !showMembership && !showSignup && !quizComplete && (
        <div id="features" className="section-padding" style={{ background: "#0D1B2A" }}>
          <div className="container">
            <div className="text-center mb-5 animate-fade-in-up">
              <h2 className="fw-bold mb-2">
                <span style={{ color: "#fff" }}>Why Join</span>{" "}
                <span className="neon-text">MrBeast?</span>
              </h2>
            </div>
            <div className="row g-4">
              {[
                { emoji: "🎯", title: "Fun Challenges", desc: "Engaging trivia across crypto, tech, and more" },
                { emoji: "💰", title: "Real Rewards", desc: "Win exclusive prizes and crypto rewards" },
                { emoji: "⚡", title: "Instant Results", desc: "See your score and claim rewards immediately" },
                { emoji: "🔒", title: "Secure Platform", desc: "Enterprise-grade security for your data" },
                { emoji: "🌍", title: "Global Community", desc: "Join thousands of participants worldwide" },
                { emoji: "📱", title: "Mobile First", desc: "Seamless experience on any device" },
              ].map((item, i) => (
                <div key={i} className="col-md-6 col-lg-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="glass-card p-4 h-100" style={{ borderRadius: "16px" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{item.emoji}</div>
                    <h5 className="fw-bold mb-1" style={{ color: "#00BFFF" }}>{item.title}</h5>
                    <p className="mb-0" style={{ color: "#87DEFA", fontSize: "0.9rem" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}