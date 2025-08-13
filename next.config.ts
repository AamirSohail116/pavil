import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hotel.remogen.com',
        port: '',
        pathname: '/assets/img/**',
      },
    ],
  },
};

export default nextConfig;