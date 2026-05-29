"use client";

import { useState, useEffect, useCallback } from "react";
import { quizQuestions } from "@/data/quizData";

interface QuizSectionProps {
  onComplete: (score: number) => void;
}

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = quizQuestions[currentQ];
  const progress = ((currentQ + (answered ? 1 : 0)) / quizQuestions.length) * 100;

  const handleTimeout = useCallback(() => {
    if (!answered) {
      setAnswered(true);
      setShowResult(true);
      setTimeout(() => nextQuestion(), 1500);
    }
  }, [answered]);

  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answered, handleTimeout]);

  useEffect(() => {
    setTimeLeft(15);
    setSelected(null);
    setAnswered(false);
    setShowResult(false);
    setIsAnimating(false);
  }, [currentQ]);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === question.correctAnswer) {
      setScore((s) => s + 1);
    }
    setShowResult(true);
    setTimeout(() => nextQuestion(), 1500);
  };

  const nextQuestion = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQ + 1 >= quizQuestions.length) {
        onComplete(score + (selected === question.correctAnswer ? 1 : 0));
      } else {
        setCurrentQ((q) => q + 1);
        setIsAnimating(false);
      }
    }, 200);
  };

  return (
    <div id="quiz" className="section-padding" style={{ background: "#0D1B2A" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            {/* Progress */}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <small style={{ color: "#87DEFA" }}>
                Question {currentQ + 1} of {quizQuestions.length}
              </small>
              <small style={{ color: timeLeft <= 5 ? "#E91E78" : "#87DEFA", fontWeight: timeLeft <= 5 ? 700 : 400 }}>
                ⏱ {timeLeft}s
              </small>
            </div>
            <div className="progress mb-4" style={{ height: 6, borderRadius: 3, background: "rgba(135,222,250,0.1)" }}>
              <div
                className="progress-bar"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(135deg, #00BFFF 0%, #E91E78 100%)",
                  borderRadius: 3,
                  transition: "width 0.5s ease",
                }}
              />
            </div>

            {/* Question Card */}
            <div
              className="glass-card p-4 p-md-5"
              style={{
                borderRadius: "20px",
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "translateX(30px)" : "translateX(0)",
                transition: "all 0.3s ease",
              }}
            >
              <h4 className="fw-bold mb-4" style={{ color: "#fff", lineHeight: 1.4 }}>
                {question.question}
              </h4>

              <div className="d-flex flex-column gap-3">
                {question.options.map((opt, idx) => {
                  let bg = "rgba(255,255,255,0.03)";
                  let border = "rgba(255,255,255,0.08)";
                  let color = "#87DEFA";

                  if (showResult) {
                    if (idx === question.correctAnswer) {
                      bg = "rgba(0, 191, 255, 0.15)";
                      border = "rgba(0, 191, 255, 0.4)";
                      color = "#00BFFF";
                    } else if (idx === selected && idx !== question.correctAnswer) {
                      bg = "rgba(233, 30, 120, 0.15)";
                      border = "rgba(233, 30, 120, 0.4)";
                      color = "#E91E78";
                    }
                  } else if (idx === selected) {
                    bg = "rgba(0, 191, 255, 0.15)";
                    border = "rgba(0, 191, 255, 0.4)";
                    color = "#00BFFF";
                  }

                  return (
                    <button
                      key={idx}
                      className="d-flex align-items-center p-3 rounded-3"
                      onClick={() => handleAnswer(idx)}
                      disabled={answered}
                      style={{
                        background: bg,
                        border: `1px solid ${border}`,
                        color: color,
                        cursor: answered ? "default" : "pointer",
                        transition: "all 0.3s ease",
                        fontSize: "1rem",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        if (!answered) {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(0, 191, 255, 0.5)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(0, 191, 255, 0.08)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!answered && idx !== selected) {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                        }
                      }}
                    >
                      <span
                        className="d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: idx === selected && showResult ? bg : "rgba(255,255,255,0.05)",
                          border: `1px solid ${border}`,
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          flexShrink: 0,
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}