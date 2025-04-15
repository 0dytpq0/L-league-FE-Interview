import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TQProvider from "./_component/TQProvider";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | L-League Blog",
    default: "L-League Blog - 당신의 이야기를 공유하세요",
  },
  description:
    "L-League에서 다양한 카테고리의 블로그 포스트를 읽고 작성해보세요.",
  keywords: ["블로그", "포스팅", "L-League", "커뮤니티"],
  authors: [{ name: "L-League Team" }],
  creator: "L-League",
  publisher: "L-League",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(process.env.API_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "L-League Blog",
    title: "L-League Blog - 당신의 이야기를 공유하세요",
    description:
      "L-League에서 다양한 카테고리의 블로그 포스트를 읽고 작성해보세요.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "L-League Blog",
    description:
      "L-League에서 다양한 카테고리의 블로그 포스트를 읽고 작성해보세요.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-[390px]`}
      >
        <TQProvider>{children}</TQProvider>
      </body>
    </html>
  );
}
