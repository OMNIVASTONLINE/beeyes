"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function MainContent({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  return (
    <main
      style={{
        paddingTop: isLoggedIn ? "clamp(110px, 15vw, 124px)" : "clamp(62px, 10vw, 72px)",
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </main>
  );
}
