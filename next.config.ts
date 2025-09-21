import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // off eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
