/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ai-fines-herbes.vercel.app', 'render.com'],
    unoptimized: true,
  },
  // Configuration pour éviter les timeouts de build
  staticPageGenerationTimeout: 120, // Augmenter le timeout à 120 secondes
  // Optimisations pour le build
  swcMinify: true,
  compress: true,
  // Configuration pour le sitemap
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Configuration pour les pages statiques
  trailingSlash: false,
  // Configuration pour éviter les erreurs de build
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Configuration ESLint pour le build
  eslint: {
    ignoreDuringBuilds: true, // Ignorer les erreurs ESLint pendant le build
  },
  // Configuration TypeScript pour le build
  typescript: {
    ignoreBuildErrors: false, // Ne pas ignorer les erreurs TypeScript
  },
}

export default nextConfig 