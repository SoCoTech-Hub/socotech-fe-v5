import type { NextConfig } from "next";

import Config from "@acme/snippets/nextConfig";

const nextConfig: NextConfig = {
  basePath: '/survey',
reactStrictMode: true,
  transpilePackages: ["@acme/ui"],
  async headers() {
    return Config;
},
};

export default nextConfig;
