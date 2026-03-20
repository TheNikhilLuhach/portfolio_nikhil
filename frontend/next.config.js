/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // API routes are served by Next.js app/api/ - no rewrites needed for Vercel
  // Production optimizations for Vercel
  compress: true,
  poweredByHeader: false,
  // Static export for project files
  trailingSlash: false,
  // Environment-specific configuration
  ...(process.env.NODE_ENV === 'production' && {
    // Production-only settings
    assetPrefix: undefined,
  }),
};

module.exports = nextConfig
