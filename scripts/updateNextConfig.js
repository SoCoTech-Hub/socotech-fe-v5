const fs = require("fs");
const path = require("path");

const appsFolderPath = path.join(__dirname, "../apps");

function updateNextConfig(filePath, folderName) {
  const newContent = `
import type { NextConfig } from "next";

import ports from "@acme/config/ports";
import { NextConfigHeaders, NextConfigImages } from "@acme/snippets/nextConfig";

const nextConfig: NextConfig = {
  serverRuntimeConfig: { port: ports.${folderName} },
  basePath: "/${folderName}",
  reactStrictMode: true,
  transpilePackages: ["@acme/ui"],
  async headers() {
    return NextConfigHeaders;
  },
  ...NextConfigImages,
};
export default nextConfig;
`;

  fs.writeFileSync(filePath, newContent.trim());
}

function processAppsFolder() {
  if (!fs.existsSync(appsFolderPath)) {
    console.error("Apps folder does not exist!");
    return;
  }

  const folders = fs
    .readdirSync(appsFolderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  folders.forEach((folder) => {
    const folderPath = path.join(appsFolderPath, folder.name);
    const configFilePath = path.join(folderPath, "next.config.ts");

    if (fs.existsSync(configFilePath)) {
      console.log(`Updating: ${configFilePath}`);
      updateNextConfig(configFilePath, folder.name);
    } else {
      console.warn(`No next.config.ts found in ${folderPath}`);
    }
  });
}

processAppsFolder();
