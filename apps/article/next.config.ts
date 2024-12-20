import ports from "@acme/config/ports";
import type { NextConfig } from "next";

import Config from "@acme/snippets/nextConfig";

const nextConfig: NextConfig = {
  serverRuntimeConfig: { port: ports.article },
  basePath: "/article",
  reactStrictMode: true,
  transpilePackages: ["@acme/ui"],
  async headers() {
    return Config;
  },
};

export default nextConfig;
