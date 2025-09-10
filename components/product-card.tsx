'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { Star, ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
}

export function ProductCard({ product, priority = false, sizes }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // 할인된 가격 계산
  const finalPrice = product.priceKRW * (1 - product.discountPercent / 100);
  const isOnSale = product.discountPercent > 0;
  const isOutOfStock = product.stock <= 0;

  // 별점 표시용 배열
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  // 첫 번째 이미지 (640x640 카드용)
  const cardImage = product.images.find(img => img.w === 640) || product.images[0];
  
  // 폴백 이미지 URL (플레이스홀더)
  const fallbackImage = `https://via.placeholder.com/640x640/f3f4f6/9ca3af?text=${encodeURIComponent(product.title.slice(0, 20))}`;

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2" role="article">
      <Link 
        href={`/products/${product.slug}`}
        className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
        aria-label={`${product.title} - ${finalPrice.toLocaleString()}원, 별점 ${product.rating}점 상세 보기`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          {/* 상품 이미지 */}
          {!imageError ? (
            <Image
              src={cardImage.url}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              priority={priority}
              sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mx-auto mb-2 opacity-50" />
                <p className="text-xs opacity-75">이미지 로딩 실패</p>
              </div>
            </div>
          )}
          
          {/* 할인 배지 */}
          {isOnSale && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 left-2 z-10"
              aria-label={`${product.discountPercent}% 할인`}
            >
              -{product.discountPercent}%
            </Badge>
          )}
          
          {/* 품절 오버레이 */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <Badge variant="secondary" className="bg-white text-black">
                품절
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* 카테고리 */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {product.brand}
            </span>
          </div>

          {/* 상품명 */}
          <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>

          {/* 별점 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5" role="img" aria-label={`별점 ${product.rating}점 (5점 만점)`}>
              {stars.map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.ratingCount.toLocaleString()})
            </span>
          </div>

          {/* 가격 */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                ₩{finalPrice.toLocaleString()}
              </span>
              {isOnSale && (
                <span className="text-sm text-muted-foreground line-through">
                  ₩{product.priceKRW.toLocaleString()}
                </span>
              )}
            </div>
            
            {/* 재고 정보 */}
            <div className="text-xs text-muted-foreground">
              {isOutOfStock ? (
                <span className="text-destructive">품절</span>
              ) : product.stock <= 10 ? (
                <span className="text-orange-600">재고 {product.stock}개</span>
              ) : (
                <span>재고 있음</span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
