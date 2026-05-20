import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Story IP — Your Memoir, Written For You",
  description:
    "Professional memoir ghostwriting for celebrities, athletes, musicians, and public figures. From 5 hours of conversation to a published book in 30 days. Starting at $3,497.",
  keywords: [
    "memoir ghostwriting",
    "celebrity memoir",
    "autobiography writer",
    "book ghostwriter",
    "publish memoir",
    "Story IP",
  ],
  openGraph: {
    title: "Story IP — Your Memoir, Written For You",
    description:
      "Professional memoir ghostwriting. 30 days. 5 hours of your time. A lifetime of legacy.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lora.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
