/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '4000',
        //pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
