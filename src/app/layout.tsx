import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Class Pilot",
  description: "CRM for your classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
