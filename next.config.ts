import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wholesaler-core-develop.web.parafacc.ir",
      },
    ],
  },
};

export default nextConfig;
