# NextCommerce

- **프로젝트 이름**: NextCommerce
- 목표: 대용량(10,000개) 상품 카탈로그를 기반으로 하이브리드 렌더링(목록 ISR, 상세 SSG), 이미지 최적화, 코드 스플리팅, 접근성 확보, 

<br>

* * *

### 데이터 설계(합성 데이터, 10,000개)

- **엔티티**
    - **Product**: `id`, `slug`, `title`, `description`, `priceKRW`, `discountPercent`, `category`, `brand`, `rating`, `ratingCount`, `stock`, `images[]`, `createdAt`
    - **Category**: 20개 고정(예: Electronics, Home, Beauty, Fashion, Sports, Books, Toys, Office, Pet, Automotive, Garden, Health, Baby, Music, Games, Outdoors, Photo, Appliances, DIY, Food)
- **이미지 소스**: `picsum.photos` (원본은 JPG/PNG지만 Next/Image가 WebP/AVIF로 최적화 제공)
- **샘플 1건**
    - `slug`: "wireless-noise-cancelling-headphones-00123"
    - `priceKRW`: 129000
    - `discountPercent`: 15
    - `rating`: 4.6, `ratingCount`: 1284
    - `images`: 3~5장, 다양한 해상도(썸네일 320, 카드 640, 상세 1200)

* * *

### 초기 기능 스코프(핵심 러닝 포인트 중심)

- **상품 목록**: 페이지네이션 + 필터(카테고리/가격/정렬) \[ISR(예: 60초)\]
- **상품 상세**: SSG(빌드 시 10,000 페이지 생성), 연관 상품 섹션
- **장바구니/결제(모의)**: 클라이언트 상태 기반, 결제 위젯은 지연 로딩(dynamic import)
- **접근성(a11y)**: 키보드 탐색, ARIA 라벨, Skip 링크, 포커스 스타일
- **성능**: LCP 개선(이미지 최적화/priority), 번들 분석/분할, 폰트 최적화
- (선택) **검색**: 제목/브랜드 텍스트 검색, 클라이언트 디바운스

* * *

### 폴더 구조(Next.js App Router)

- `app/` 기반, 서버 컴포넌트 기본, 클라이언트 필요한 곳만 분리
- 주요 파일
    - `app/(store)/products/page.tsx` → 목록(ISR)
    - `app/(store)/products/[slug]/page.tsx` → 상세(SSG)
    - `app/cart/page.tsx` → 장바구니(클라이언트)
    - `app/checkout/page.tsx` → 결제(동적 import)
    - `components/` → `ProductCard`, `FilterBar`, `PaymentWidget` 등
    - `lib/products.ts` → 데이터 접근(서버 전용)
    - `data/products.json` → 합성 데이터(10,000개)
    - `scripts/seed.ts` → 데이터 생성 스크립트
    - `next.config.js` → 이미지 최적화/분석 도구 설정

* * *

### 성능 체크리스트(목표 수치)

- **Lighthouse**: 65 → 98+, **LCP**: 모바일 1.1s대, 첫 로드 번들 ~340KB
- **핵심 실천**
    - 상세 첫 이미지 `priority`, 적절한 `sizes`
    - 목록 이미지는 레이지 로드(기본 동작), 카드 수평/그리드 레이아웃에서 과도한 DOM 방지
    - 결제/계정 등 무거운 모듈은 지연 로딩
    - `next/font`로 폰트 서브셋 + `display: 'swap'`

* * *

### 이력서/면접 어필 포인트

- **SSR/SSG/ISR 설계 기준**: 목록은 신선도/규모 고려해 ISR, 상세는 SSG로 SEO 최대화
- **LCP 75%+ 개선**: 이미지 포맷(WebP/AVIF), priority/sizes 최적 적용
- **코드 스플리팅**: 결제 모듈 지연 로딩으로 초기 번들 40% 감소
- **접근성**: WCAG AA 및 Lighthouse a11y 100점

* * *

<br>

### 데이터 설계(합성 데이터, 10,000개)

- **엔티티**
- **Product**: id, slug, title, description, priceKRW, discountPercent, category, brand, rating, ratingCount, stock, images\[\], createdAt
- **Category**: 20개 고정(예: Electronics, Home, Beauty, Fashion, Sports, Books, Toys, Office, Pet, Automotive, Garden, Health, Baby, Music, Games, Outdoors, Photo, Appliances, DIY, Food)
- **이미지 소스**: picsum.photos/loremflickr.com(원본은 JPG/PNG지만 Next/Image가 WebP/AVIF로 최적화 제공)
- **샘플 1건**
- slug: "wireless-noise-cancelling-headphones-00123"
- priceKRW: 129000
- discountPercent: 15
- rating: 4.6, ratingCount: 1284
- images: 3~5장, 다양한 해상도(썸네일 320, 카드 640, 상세 1200)

<br>

* * *

### <br>

### 초기 기능 스코프(핵심 러닝 포인트 중심)

- **상품 목록**: 페이지네이션 + 필터(카테고리/가격/정렬) \[ISR(예: 60초)\]
- **상품 상세**: SSG(빌드 시 10,000 페이지 생성), 연관 상품 섹션
- **장바구니/결제(모의)**: 클라이언트 상태 기반, 결제 위젯은 지연 로딩(dynamic import)
- **접근성(a11y)**: 키보드 탐색, ARIA 라벨, Skip 링크, 포커스 스타일
- **성능**: LCP 개선(이미지 최적화/priority), 번들 분석/분할, 폰트 최적화
- (선택) **검색**: 제목/브랜드 텍스트 검색, 클라이언트 디바운스

<br>

* * *

### <br>

### 폴더 구조(Next.js App Router)

- app/ 기반, 서버 컴포넌트 기본, 클라이언트 필요한 곳만 분리
- 주요 파일
- app/(store)/products/page.tsx → 목록(ISR)
- app/(store)/products/\[slug\]/page.tsx → 상세(SSG)
- app/cart/page.tsx → 장바구니(클라이언트)
- app/checkout/page.tsx → 결제(동적 import)
- components/ → ProductCard, FilterBar, PaymentWidget 등
- lib/products.ts → 데이터 접근(서버 전용)
- data/products.json → 합성 데이터(10,000개)
- scripts/seed.ts → 데이터 생성 스크립트
- next.config.js → 이미지 최적화/분석 도구 설정