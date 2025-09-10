import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Commerce",
  description: "This is a Next Commerce project",
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
        <a href="#content" className="skip-link">본문으로 건너뛰기</a>
        <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b" role="banner">
          <div className="container mx-auto px-4 py-3 grid grid-cols-[1fr_auto_auto] items-center gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="NextCommerce 홈으로 이동">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg tracking-tight">NextCommerce</span>
            </Link>
            <nav aria-label="주요 메뉴">
              <ul className="flex gap-2" role="list">
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/products">Products</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" asChild>
                    <Link href="/cart">Cart</Link>
                  </Button>
                </li>
                <li>
                  <Button variant="outline" asChild>
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </li>
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <form role="search" aria-label="상품 검색">
                <label htmlFor="site-search" className="sr-only">검색</label>
                <input
                  id="site-search"
                  name="q"
                  type="search"
                  placeholder="Search products…"
                  className="w-48 px-3 py-2 text-sm border rounded-md bg-background/80"
                  autoComplete="off"
                  inputMode="search"
                  aria-label="상품 검색"
                />
              </form>
            </div>
          </div>
        </header>
        <main id="content" className="container mx-auto px-4 py-6 min-h-screen" role="main">
          {children}
        </main>
        <footer className="border-t bg-muted/30" role="contentinfo">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} NextCommerce</p>
            <p className="flex items-center gap-2">
              <Link href="/products" className="hover:text-foreground">Browse</Link>
              <span aria-hidden>·</span>
              <a href="https://nextjs.org" target="_blank" rel="noreferrer noopener" className="hover:text-foreground" aria-label="Next.js 새 창에서 열기">
                Built with Next.js
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
