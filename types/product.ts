export type ProductImage = { url: string; w: number; h: number };
export type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  priceKRW: number;
  discountPercent: number;
  category: string;
  brand: string;
  rating: number;
  ratingCount: number;
  stock: number;
  images: ProductImage[];
  createdAt: string;
};