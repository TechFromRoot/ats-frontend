import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";

const random = localFont({
  src: "../fonts/rg-font.otf",
  variable: "--font-random",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata: Metadata = {
  title: " Automated Token Scanner",
  description: " $ATS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${random.variable} ${inter.variable} antialiased bg-[#11161E] relative mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
