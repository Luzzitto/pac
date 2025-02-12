import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAC - Pomodoro Alarm Clock",
  description:
    "PAC (Pomodoro Alarm Clock) is a simple application that keeps alarming at a set interval to help you manage your time using the Pomodoro Technique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
