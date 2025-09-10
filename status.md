1. Next.js+tailwindcss+shadcn/ui+faker.js+lucide-react+typescript 기반 프로젝트 생성 (완료)
2. Faker.js로 합성데이터 생성 (data/products.json 완료)
3. next.config.ts 이미지 최적화 (완료)
4. layout.tsx 작성 (완료)
5. types/product.ts 상품 타입 정의 (완료)
6. lib/products.ts 데이터 접근 유틸 구현 (서버 전용: 페이지네이션/필터/정렬, getProductBySlug, 카테고리 목록) (완료)
7. 상품 목록(ISR 60s) 구현: app/(store)/products/page.tsx, ProductCard/FilterBar, 이미지 sizes 최적화
8. 상품 상세(SSG 10,000) 구현: app/(store)/products/[slug]/page.tsx, generateStaticParams, 연관 상품