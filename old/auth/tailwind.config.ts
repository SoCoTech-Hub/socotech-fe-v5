import type { Config } from "tailwindcss";

import webConfig from "@acme/tailwind-config/web";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./src/app/**/*.tsx"],
  presets: [webConfig],
};

export default config;
