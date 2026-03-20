/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
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
