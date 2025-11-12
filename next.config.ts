import type { NextConfig } from "next";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://yumx.metronio.com";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: `${API_URL}/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
