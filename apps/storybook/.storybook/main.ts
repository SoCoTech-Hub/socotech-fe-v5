// import { dirname, join } from "path";

// function getAbsolutePath(value: string): any {
//   return dirname(require.resolve(join(value, "package.json")));
// }

const config = {
  framework: "@storybook/react-vite",
  core: { disableTelemetry: true },
  stories: ["../../../packages/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  overrides: {
    "@storybook/builder-manager": {
      esbuild: "0.19.11",
    },
  },
};

export default config;
