import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'hotel.remogen.com',
      //   port: '',
      //   pathname: '/assets/img/**',
      // },
      {
        protocol: 'https',
        hostname: 'nebula-prd-images.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'dormeodestinations.my',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'nebula-prd-images.s3.amazonaws.com',
      //   port: '',
      //   pathname: '/assets/img/**',
      // },
    ],
  },
};

export default nextConfig;