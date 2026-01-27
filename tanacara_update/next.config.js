/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enable MDX/MD file imports if needed
  },
  images: {
    domains: [
      // add remote domains used for preview images
    ],
  },
};

module.exports = nextConfig;