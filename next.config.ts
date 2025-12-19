import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.simpleicons.org', 'cdn.baiwumm.com'],
  },
};

export default nextConfig;
