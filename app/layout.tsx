import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReferralTracker from "@/components/ReferralTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Urban Move Logistics | Powering Local Deliveries at Scale",
  description:
    "Urban Move connects businesses to customers through a smart, reliable logistics network. No marketplace. No middlemen. Just movement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans bg-white" suppressHydrationWarning>
        <ReferralTracker />
        {children}
      </body>
    </html>
  );
}
