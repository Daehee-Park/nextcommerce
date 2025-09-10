import 'server-only'; // 서버 컴포넌트 명시 (보안)
import path from 'path';
import { readFile } from 'fs/promises';
import { Product, ProductImage } from '@/types/product';

export interface ProductsResult {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  inStock?: boolean;
  search?: string;
}

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'rating' | 'popularity';

export const CATEGORIES = [
  'Electronics', 'Home', 'Beauty', 'Fashion', 'Sports', 'Books', 'Toys', 'Office', 'Pet', 'Automotive',
  'Garden', 'Health', 'Baby', 'Music', 'Games', 'Outdoors', 'Photo', 'Appliances', 'DIY', 'Food'
] as const;

// products data 메모리 캐시
let cachedProducts: Product[] | null = null;

async function loadProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }

  try {
    // 데이터 fetching 대신 합성데이터 사용
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContent = await readFile(filePath, 'utf-8');
    cachedProducts = JSON.parse(fileContent) as Product[];
    return cachedProducts;
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
}

function applyFilters(products: Product[], filters: ProductsFilters): Product[] {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    const finalPrice = product.priceKRW * (1 - product.discountPercent / 100);
    if (filters.minPrice && finalPrice < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && finalPrice > filters.maxPrice) {
      return false;
    }

    // Brand filter
    if (filters.brand && product.brand !== filters.brand) {
      return false;
    }

    // Stock filter
    if (filters.inStock && product.stock <= 0) {
      return false;
    }

    // Search filter (title and brand)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const titleMatch = product.title.toLowerCase().includes(searchTerm);
      const brandMatch = product.brand.toLowerCase().includes(searchTerm);
      if (!titleMatch && !brandMatch) {
        return false;
      }
    }

    return true;
  });
}

function applySorting(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    case 'price-asc':
      return sorted.sort((a, b) => {
        const priceA = a.priceKRW * (1 - a.discountPercent / 100);
        const priceB = b.priceKRW * (1 - b.discountPercent / 100);
        return priceA - priceB;
      });
    
    case 'price-desc':
      return sorted.sort((a, b) => {
        const priceA = a.priceKRW * (1 - a.discountPercent / 100);
        const priceB = b.priceKRW * (1 - b.discountPercent / 100);
        return priceB - priceA;
      });
    
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'popularity':
      return sorted.sort((a, b) => b.ratingCount - a.ratingCount);
    
    default:
      return sorted;
  }
}

export async function getProducts(
  page: number = 1,
  limit: number = 20,
  filters: ProductsFilters = {},
  sort: SortOption = 'newest'
): Promise<ProductsResult> {
  try {
    const allProducts = await loadProducts();
    
    // Apply filters
    const filteredProducts = applyFilters(allProducts, filters);
    
    // Apply sorting
    const sortedProducts = applySorting(filteredProducts, sort);
    
    // Calculate pagination
    const totalCount = sortedProducts.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const products = sortedProducts.slice(startIndex, endIndex);
    
    return {
      products,
      totalCount,
      totalPages,
      currentPage: page,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  } catch (error) {
    console.error('Error in getProducts:', error);
    return {
      products: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: page,
      hasNext: false,
      hasPrev: false
    };
  }
}

export async function getProductBySlug(combinedSlug: string): Promise<Product | null> {
  try {
    const productId = extractIdFromSlug(combinedSlug);
    
    if (!productId) {
      console.warn('Invalid slug format:', combinedSlug);
      return null;
    }
    
    return await getProductById(productId);
  } catch (error) {
    console.error('Error in getProductBySlug:', error);
    return null;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const products = await loadProducts();
    return products.find(product => product.id === id) || null;
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null;
  }
}

export async function getRelatedProducts(
  productId: number,
  limit: number = 4
): Promise<Product[]> {
  try {
    const products = await loadProducts();
    const currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
      return [];
    }
    
    // Get products from the same category, excluding the current product
    const relatedProducts = products
      .filter(p => p.id !== productId && p.category === currentProduct.category)
      .sort((a, b) => b.rating - a.rating) // Sort by rating
      .slice(0, limit);
    
    return relatedProducts;
  } catch (error) {
    console.error('Error in getRelatedProducts:', error);
    return [];
  }
}

export function getCategories(): typeof CATEGORIES {
  return CATEGORIES;
}

export async function getBrands(): Promise<string[]> {
  try {
    const products = await loadProducts();
    const brands = [...new Set(products.map(p => p.brand))].sort();
    return brands;
  } catch (error) {
    console.error('Error in getBrands:', error);
    return [];
  }
}

export async function getPriceRange(): Promise<{ min: number; max: number }> {
  try {
    const products = await loadProducts();
    
    if (products.length === 0) {
      return { min: 0, max: 0 };
    }
    
    const prices = products.map(p => p.priceKRW * (1 - p.discountPercent / 100));
    
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  } catch (error) {
    console.error('Error in getPriceRange:', error);
    return { min: 0, max: 0 };
  }
}

// SSG - get all product slugs with pagination for better performance
export async function getAllProductSlugs(
  offset: number = 0,
  limit: number = 1000
): Promise<{ slugs: string[]; hasMore: boolean; total: number }> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContent = await readFile(filePath, 'utf-8');
    const products = JSON.parse(fileContent) as Product[];
    
    const total = products.length;
    const slugs = products
      .slice(offset, offset + limit)
      .map(product => `${product.id}-${product.slug}`);
    
    return {
      slugs,
      hasMore: offset + limit < total,
      total
    };
  } catch (error) {
    console.error('Error in getAllProductSlugs:', error);
    return { slugs: [], hasMore: false, total: 0 };
  }
}

// ID 추출 Helper function
export function extractIdFromSlug(combinedSlug: string): number | null {
  const match = combinedSlug.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : null;
}

// Slug 추출 Helper function
export function extractSlugFromCombined(combinedSlug: string): string {
  const match = combinedSlug.match(/^\d+-(.+)$/);
  return match ? match[1] : combinedSlug;
}
