import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
    inlineCss: true,
    staleTimes: { dynamic: 30, static: 180 },
  },
  compiler: {
    removeConsole: { exclude: ['error'] },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 88],
  },
}

export default nextConfig
