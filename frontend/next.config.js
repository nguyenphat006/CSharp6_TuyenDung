/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '7137',
        pathname: '/uploads/**',
      },
    ],
    domains: ['localhost'],
  },
}

module.exports = nextConfig 