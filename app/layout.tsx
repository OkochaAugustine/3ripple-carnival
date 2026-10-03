import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delta State Fitness Carnival | Trainer Tim",
  description:
    "Delta State Fitness Carnival with Trainer Tim. Join us on December 19, 2026 at Asaba Mall, Delta State, Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}