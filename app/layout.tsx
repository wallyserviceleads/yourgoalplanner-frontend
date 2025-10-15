// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// ✅ Geist fonts re-exported from ./fonts to use the new sans/mono entrypoints
import { GeistSans, GeistMono } from "./fonts";

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
