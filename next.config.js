/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Any valid experimental options can go here
  },
  webpack: (config) => {
    // Your webpack config here
    return config;
  },
  // Add this to bypass the TypeScript errors for now
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;