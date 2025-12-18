import type { Metadata } from "next";
import { Inter } from "next/font/google"; // or whatever font you have
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeevesh | Interactive Portfolio",
  description: "A Full Stack developer portfolio built with Next.js, Supabase, and Framer Motion.",
  // Open Graph = What shows up when you share the link on LinkedIn/Discord
  openGraph: {
    title: "Jeevesh | Interactive Portfolio",
    description: "Check out my interactive Bento Grid portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}