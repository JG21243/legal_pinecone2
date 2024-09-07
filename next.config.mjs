/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode
  swcMinify: true, // Enables SWC-based minification for faster builds
  images: {
    domains: ['example.com'], // Add domains for external images
  },
  i18n: {
    locales: ['en', 'fr', 'es'], // Add supported locales
    defaultLocale: 'en', // Set default locale
  },
  webpack: (config, { isServer }) => {
    // Custom webpack configuration
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://external-api.com/:path*',
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  trailingSlash: true, // Add trailing slashes to URLs
  poweredByHeader: false, // Disable the X-Powered-By header for security reasons
};

export default nextConfig;