import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TawkWidget from "@/components/ui/TawkWidget";
import LiveActivityPopup from "@/components/ui/LiveActivityPopup";
import { AuthProvider } from "@/contexts/AuthContext";
import BalanceBar from "@/components/ui/BalanceBar";
import MainContent from "@/components/ui/MainContent";

export const metadata: Metadata = {
  title: "MrBeast",
  description:
    "Answer 3 fun quiz questions for a chance to unlock exclusive rewards. Join the MrBeast interactive rewards challenge today!",
  keywords: ["rewards", "challenge", "quiz", "crypto", "prizes", "giveaway"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <BalanceBar />
          <MainContent>{children}</MainContent>
          <Footer />
          <TawkWidget />
          <LiveActivityPopup />
        </AuthProvider>
      </body>
    </html>
  );
}