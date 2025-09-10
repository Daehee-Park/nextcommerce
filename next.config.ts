import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // 이미지 포맷 최적화
    remotePatterns: [ // SSRF(Server-Side Request Forgery 방지, 캐시 남용 방지)
      { protocol: 'https', hostname: 'picsum.photos' }
    ],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920], // 반응형 이미지 크기 최적화 (화면 크기에 따라 이미지 크기 조절)
  },
};

export default nextConfig;
