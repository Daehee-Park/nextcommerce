import { Suspense } from 'react';
import { getProducts, getCategories, getBrands } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { FilterBar } from '@/components/filter-bar';
import { Pagination } from '@/components/pagination';
import { PageContainer } from '@/components/page-container';
import { ProductsFilters, SortOption } from '@/lib/products';

// ISR 60초 설정
export const revalidate = 60;

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    brand?: string;
    sort?: SortOption;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // URL 파라미터 파싱 (Next.js 15+ async searchParams)
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const filters: ProductsFilters = {
    category: params.category,
    minPrice: params.minPrice ? parseInt(params.minPrice, 10) : undefined,
    maxPrice: params.maxPrice ? parseInt(params.maxPrice, 10) : undefined,
    brand: params.brand,
    search: params.search,
  };
  const sort = (params.sort || 'newest') as SortOption;

  // 서버에서 데이터 가져오기
  const [productsResult, categories, brands] = await Promise.all([
    getProducts(page, 20, filters, sort),
    getCategories(),
    getBrands(),
  ]);

  return (
    <PageContainer size="wide">
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">상품 목록</h1>
          <p className="text-muted-foreground">
            총 {productsResult.totalCount.toLocaleString()}개의 상품을 만나보세요
          </p>
        </div>

        {/* 필터 바 */}
        <Suspense fallback={<div className="h-16 bg-muted/30 rounded-lg animate-pulse" />}>
          <FilterBar
            categories={categories}
            brands={brands}
            currentFilters={filters}
            currentSort={sort}
          />
        </Suspense>

        {/* 결과 헤더 */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            총 {productsResult.totalCount.toLocaleString()}개 중 {productsResult.products.length}개 표시
            {filters.category && (
              <span className="ml-1">- <strong>{filters.category}</strong> 카테고리</span>
            )}
          </p>
          <div className="text-sm text-muted-foreground">
            {productsResult.currentPage} / {productsResult.totalPages} 페이지
          </div>
        </div>

        {/* 상품 그리드 */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="grid"
          aria-label="상품 목록"
        >
          {productsResult.products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4} // 첫 4개는 LCP 최적화
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
          ))}
        </div>

        {/* 상품이 없을 때 */}
        {productsResult.products.length === 0 && (
          <div className="text-center py-12">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">상품을 찾을 수 없습니다</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                필터 조건이나 검색어를 조정해서 다시 시도해보세요.
              </p>
            </div>
          </div>
        )}

        {/* 페이지네이션 */}
        {productsResult.totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={productsResult.currentPage}
              totalPages={productsResult.totalPages}
              hasNext={productsResult.hasNext}
              hasPrev={productsResult.hasPrev}
            />
          </div>
        )}
      </div>
    </PageContainer>
  );
}

// 메타데이터
export async function generateMetadata({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category;
  const page = params.page || '1';
  
  let title = '상품 목록';
  if (category) {
    title = `${category} 상품`;
  }
  if (page !== '1') {
    title += ` - ${page}페이지`;
  }
  title += ' | NextCommerce';

  return {
    title,
    description: category 
      ? `${category.toLowerCase()} 카테고리의 다양한 상품을 빠른 배송과 합리적인 가격으로 만나보세요.`
      : '다양한 카테고리의 상품을 빠른 배송과 합리적인 가격으로 만나보세요.',
  };
}
