'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProductsFilters, SortOption, CATEGORIES } from '@/lib/products';
import { Search, X, Filter } from 'lucide-react';
import { useState, useCallback, useTransition } from 'react';

interface FilterBarProps {
  categories: readonly string[];
  brands: string[];
  currentFilters: ProductsFilters;
  currentSort: SortOption;
}

export function FilterBar({ categories, brands, currentFilters, currentSort }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // 로컬 상태
  const [searchValue, setSearchValue] = useState(currentFilters.search || '');
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice?.toString() || '');

  // URL 업데이트 함수
  const updateFilters = useCallback((newFilters: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    
    // 새로운 필터 적용
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // 페이지는 1로 리셋
    params.delete('page');
    
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }, [searchParams, router]);

  // 개별 필터 핸들러
  const handleCategoryChange = (category: string) => {
    updateFilters({ category: category === 'all' ? undefined : category });
  };

  const handleBrandChange = (brand: string) => {
    updateFilters({ brand: brand === 'all' ? undefined : brand });
  };

  const handleSortChange = (sort: SortOption) => {
    updateFilters({ sort });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchValue });
  };

  const handlePriceFilter = () => {
    updateFilters({
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };

  const clearFilters = () => {
    setSearchValue('');
    setMinPrice('');
    setMaxPrice('');
    startTransition(() => {
      router.push('/products');
    });
  };

  // 활성 필터 개수
  const activeFiltersCount = Object.values(currentFilters).filter(Boolean).length;

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      {/* 상단: 검색 및 정렬 */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 검색 */}
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="상품 검색..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
              aria-label="상품 검색"
            />
          </div>
          <Button type="submit" disabled={isPending}>
            검색
          </Button>
        </form>

        {/* 정렬 */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm font-medium whitespace-nowrap">
            정렬:
          </label>
          <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger id="sort-select" className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
              <SelectItem value="price-asc">가격: 낮은순</SelectItem>
              <SelectItem value="price-desc">가격: 높은순</SelectItem>
              <SelectItem value="rating">별점순</SelectItem>
              <SelectItem value="popularity">인기순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 하단: 필터들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 카테고리 */}
        <div className="space-y-2">
          <label htmlFor="category-select" className="text-sm font-medium">
            카테고리
          </label>
          <Select 
            value={currentFilters.category || 'all'} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id="category-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 브랜드 */}
        <div className="space-y-2">
          <label htmlFor="brand-select" className="text-sm font-medium">
            브랜드
          </label>
          <Select 
            value={currentFilters.brand || 'all'} 
            onValueChange={handleBrandChange}
          >
            <SelectTrigger id="brand-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 브랜드</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 최소 가격 */}
        <div className="space-y-2">
          <label htmlFor="min-price" className="text-sm font-medium">
            최소 가격 (₩)
          </label>
          <Input
            id="min-price"
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceFilter}
            min="0"
            step="1000"
          />
        </div>

        {/* 최대 가격 */}
        <div className="space-y-2">
          <label htmlFor="max-price" className="text-sm font-medium">
            최대 가격 (₩)
          </label>
          <Input
            id="max-price"
            type="number"
            placeholder="1,000,000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceFilter}
            min="0"
            step="1000"
          />
        </div>
      </div>

      {/* 활성 필터 표시 및 초기화 */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">
              {activeFiltersCount}개 필터 적용됨
            </span>
            
            {/* 활성 필터 배지들 */}
            <div className="flex gap-1 flex-wrap">
              {currentFilters.category && (
                <Badge variant="secondary" className="text-xs">
                  {currentFilters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => handleCategoryChange('all')}
                    aria-label="카테고리 필터 제거"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {currentFilters.brand && (
                <Badge variant="secondary" className="text-xs">
                  {currentFilters.brand}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => handleBrandChange('all')}
                    aria-label="브랜드 필터 제거"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {currentFilters.search && (
                <Badge variant="secondary" className="text-xs">
                  "{currentFilters.search}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-xs"
                    onClick={() => {
                      setSearchValue('');
                      updateFilters({ search: undefined });
                    }}
                    aria-label="검색 필터 제거"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={clearFilters}>
            전체 초기화
          </Button>
        </div>
      )}
    </div>
  );
}
