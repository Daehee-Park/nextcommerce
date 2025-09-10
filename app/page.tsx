'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Star, Heart, Truck, Shield } from 'lucide-react';
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean & Minimal */}
      <section className="pt-16 sm:pt-20 pb-24 sm:pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            <motion.div 
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 leading-tight">
                좋은 물건,
                <br />
                <span className="font-semibold">좋은 가격</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                일상에 필요한 모든 것을 한 곳에서.
                <br className="hidden sm:block" />
                <span className="block sm:inline"> 신중하게 선별된 10,000여 개의 상품을 만나보세요.</span>
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium w-full sm:w-auto">
                <Link href="/products" className="flex items-center justify-center gap-2">
                  쇼핑 시작하기
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              
              <Button variant="ghost" size="lg" asChild className="text-gray-600 hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium w-full sm:w-auto">
                <Link href="/products?category=Electronics">
                  인기 상품 보기
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features - Simple Cards */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              왜 많은 분들이 선택하실까요?
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Truck,
                title: "빠른 배송",
                description: "주문 후 24시간 내 출고\n전국 무료배송",
                delay: 0.1
              },
              {
                icon: Star,
                title: "엄선된 상품",
                description: "품질과 가격을 모두 만족하는\n신중하게 선별된 상품들",
                delay: 0.2
              },
              {
                icon: Shield,
                title: "안전한 결제",
                description: "SSL 암호화로 보호되는\n안전한 결제 시스템",
                delay: 0.3
              },
              {
                icon: Heart,
                title: "고객 만족",
                description: "친절한 고객서비스와\n간편한 교환/반품",
                delay: 0.4
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center space-y-4 p-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-gray-700" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">
              인기 카테고리
            </h2>
            <p className="text-gray-600 text-sm sm:text-base px-4">
              가장 많이 찾는 상품들을 카테고리별로 확인해보세요
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { emoji: "📱", name: "전자제품", category: "Electronics", delay: 0.1 },
              { emoji: "👕", name: "패션", category: "Fashion", delay: 0.2 },
              { emoji: "🏠", name: "홈&리빙", category: "Home", delay: 0.3 },
              { emoji: "💄", name: "뷰티", category: "Beauty", delay: 0.4 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/products?category=${item.category}`} className="group block">
                  <motion.div 
                    className="aspect-square bg-gray-100 rounded-2xl p-6 sm:p-8 flex items-center justify-center group-hover:bg-gray-200 transition-colors"
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                  >
                    <div className="text-center">
                      <motion.div 
                        className="text-3xl sm:text-4xl mb-2 sm:mb-3"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.emoji}
                      </motion.div>
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-20 sm:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 leading-tight">
              지금 바로 시작해보세요
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed px-4">
              더 나은 쇼핑 경험을 위해 준비된 모든 것들이 기다리고 있습니다.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100 px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium">
                <Link href="/products" className="flex items-center gap-2">
                  둘러보기
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
