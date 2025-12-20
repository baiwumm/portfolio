import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [new URL('https://cdn.simpleicons.org/**'), new URL('https://cdn.baiwumm.com/**')],
  },
};

export default nextConfig;
