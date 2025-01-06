import type { NextConfig } from "next";

import ports from "@acme/config/ports";
import Config from "@acme/snippets/nextConfig";

const nextConfig: NextConfig = {
  serverRuntimeConfig: { port: ports.account },
  basePath: "/account",
  reactStrictMode: true,
  transpilePackages: ["@acme/ui"],
  async headers() {
    return Config;
  },
};

export default nextConfig;
