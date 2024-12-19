import type { NextConfig } from "next";

import Config from "@acme/snippets/nextConfig";

const nextConfig: NextConfig = {
  basePath: '/knowledge-base',
reactStrictMode: true,
  transpilePackages: ["@acme/ui"],
  async headers() {
    return Config;
},
};

export default nextConfig;
