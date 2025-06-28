/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    // Disable image optimization during build for faster builds
    unoptimized: true,
  },
  // Reduce bundle size
  experimental: {
    optimizeCss: true,
  },
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
}

export default nextConfig 