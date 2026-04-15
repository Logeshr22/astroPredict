import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./page.css";
import "./login/page.css";
import "./register/page.css";
import "./dashboard/page.css";
import "./compatibility/page.css";
import "./results/page.css";
import "@/components/Navbar.css";
import "@/components/PricingCards.css";
import "@/components/BirthDataForm.css";
import Navbar from "@/components/Navbar";
import ClientProviders from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cosmic Match - AI-Powered Astrology Compatibility",
  description:
    "Discover your cosmic compatibility with advanced Western & Vedic astrology analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Navbar />
          <main style={{ minHeight: "100vh" }}>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
