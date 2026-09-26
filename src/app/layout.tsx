import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";

import "./globals.css";

import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";
import Footer from "./components/Footer";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion for planning and logging workouts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} ${inter.variable}`}>
        <ToastProvider>
          <PlanProvider>
            {children}
            <Footer />
          </PlanProvider>
        </ToastProvider>
      </body>
    </html>
  );
}