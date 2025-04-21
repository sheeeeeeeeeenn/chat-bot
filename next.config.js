// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the experimental.appDir setting as it's now the default in Next.js 15
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    return config;
  },
}

module.exports = nextConfig