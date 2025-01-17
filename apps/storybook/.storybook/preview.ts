import type { Preview } from "@storybook/react";

import "../../../packages/ui/src/output.css";
import "../../../packages/ui/unused.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs", "autodocs"],
};

export default preview;
