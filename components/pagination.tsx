'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useTransition } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function Pagination({ currentPage, totalPages, hasNext, hasPrev }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  // 페이지 번호 배열 생성 (스마트 페이지네이션)
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7; // 최대 보여줄 페이지 수

    if (totalPages <= maxVisible) {
      // 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 스마트 페이지네이션
      pages.push(1);

      if (currentPage <= 4) {
        // 시작 부분
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('ellipsis');
        }
      } else if (currentPage >= totalPages - 3) {
        // 끝 부분
        if (totalPages > 5) {
          pages.push('ellipsis');
        }
        for (let i = Math.max(totalPages - 4, 2); i <= totalPages - 1; i++) {
          pages.push(i);
        }
      } else {
        // 중간 부분
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center space-x-1"
      aria-label="페이지네이션"
      role="navigation"
    >
      {/* 이전 페이지 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPrev || isPending}
        aria-label="이전 페이지로 이동"
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">이전</span>
      </Button>

      {/* 페이지 번호들 */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-9 h-9"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            );
          }

          const isCurrentPage = page === currentPage;
          
          return (
            <Button
              key={page}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToPage(page)}
              disabled={isCurrentPage || isPending}
              aria-label={`${page}페이지로 이동`}
              aria-current={isCurrentPage ? 'page' : undefined}
              className="w-9 h-9 p-0"
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* 다음 페이지 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNext || isPending}
        aria-label="다음 페이지로 이동"
        className="flex items-center gap-1"
      >
        <span className="hidden sm:inline">다음</span>
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* 페이지 정보 */}
      <div className="hidden md:flex items-center ml-4 text-sm text-muted-foreground">
        {currentPage.toLocaleString()} / {totalPages.toLocaleString()} 페이지
      </div>
    </nav>
  );
}
