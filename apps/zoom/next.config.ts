import type { NextConfig } from "next";

import ports from "@acme/config/ports";
import { NextConfigHeaders, NextConfigImages } from "@acme/snippets/nextConfig";

const nextConfig: NextConfig = {
  serverRuntimeConfig: { port: ports.zoom },
  basePath: "/zoom",
  reactStrictMode: true,
  transpilePackages: ["@acme/ui"],
  async headers() {
    return NextConfigHeaders;
  },
  ...NextConfigImages,
};
export default nextConfig;