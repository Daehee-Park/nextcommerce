import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextCommerce - 대한민국 대표 이커머스 플랫폼",
  description: "10,000+ 상품을 초고속으로 만나보세요. 최신 기술과 접근성을 겸비한 차세대 쇼핑 경험을 제공합니다.",
  keywords: "이커머스, 온라인쇼핑, Next.js, 상품, 쇼핑몰",
  authors: [{ name: "NextCommerce Team" }],
  openGraph: {
    title: "NextCommerce - 대한민국 대표 이커머스 플랫폼",
    description: "10,000+ 상품을 초고속으로 만나보세요",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextCommerce",
    description: "10,000+ 상품을 초고속으로 만나보세요",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ko">
      <head>
        <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUITE@2/fonts/variable/woff2/SUITE-Variable.css" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main id="content" className="min-h-screen" role="main">
          {children}
        </main>
        <footer className="border-t bg-muted/30" role="contentinfo">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
              <p className="text-center sm:text-left">© {new Date().getFullYear()} NextCommerce</p>
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <Link href="/products" className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1" aria-label="상품 둘러보기">둘러보기</Link>
                <span aria-hidden="true">·</span>
                <a href="https://nextjs.org" target="_blank" rel="noreferrer noopener" className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1" aria-label="Next.js 웹사이트 새 창에서 열기">
                  Next.js로 제작
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
