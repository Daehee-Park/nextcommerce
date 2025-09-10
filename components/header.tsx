'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, Search, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/95 border-b" role="banner">
      {/* Desktop & Mobile Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10" aria-label="NextCommerce 홈으로 이동">
            <ShoppingBag className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            <span className="font-bold text-base sm:text-lg tracking-tight">NextCommerce</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="주요 메뉴">
            <ul className="flex gap-2" role="list">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/products">상품</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/cart">장바구니</Link>
                </Button>
              </li>
              <li>
                <Button variant="outline" asChild>
                  <Link href="/checkout">결제</Link>
                </Button>
              </li>
            </ul>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2">
            <form role="search" aria-label="상품 검색">
              <label htmlFor="site-search" className="sr-only">상품 검색</label>
              <input
                id="site-search"
                name="q"
                type="search"
                placeholder="상품 검색..."
                className="w-48 lg:w-64 px-3 py-2 text-sm border rounded-md bg-background/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                autoComplete="off"
                inputMode="search"
                aria-label="상품 검색 입력"
              />
            </form>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="검색 토글"
              className="h-9 w-9 p-0"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 토글"
              className="h-9 w-9 p-0"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-3 pb-1">
            <form role="search" aria-label="상품 검색">
              <label htmlFor="mobile-search" className="sr-only">상품 검색</label>
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="상품 검색..."
                className="w-full px-3 py-2 text-sm border rounded-md bg-background/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                autoComplete="off"
                inputMode="search"
                aria-label="상품 검색 입력"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4" aria-label="모바일 메뉴">
            <ul className="space-y-2" role="list">
              <li>
                <Button variant="ghost" asChild className="w-full justify-start h-12 text-base">
                  <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>
                    📦 상품 보기
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild className="w-full justify-start h-12 text-base">
                  <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                    🛒 장바구니
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="outline" asChild className="w-full justify-start h-12 text-base">
                  <Link href="/checkout" onClick={() => setIsMobileMenuOpen(false)}>
                    💳 결제하기
                  </Link>
                </Button>
              </li>
              <li className="pt-2 border-t">
                <Button variant="ghost" asChild className="w-full justify-start h-12 text-base text-muted-foreground">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    🏠 홈으로
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
