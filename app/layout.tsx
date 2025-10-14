// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// ✅ Use these exact imports
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "YourGoalPlanner",
  description: "Goal planning calendar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ Apply the font variables on <html>
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      {/* If you use Tailwind, `font-sans` uses your configured sans stack */}
      <body className="font-sans">{children}</body>
    </html>
  );
}
