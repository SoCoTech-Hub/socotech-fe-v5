import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import MDX, { MDXProps } from "./";

export default {
  title: "MDX/MDX",
  component: MDX,
} as Meta;

const Template: StoryFn<MDXProps> = (args) => {
  const [content, setContent] = useState(args.value);

  return (
    <div>
      <MDX value={content} setValue={setContent} />
      <div style={{ marginTop: "20px" }}>
        <h4>Preview:</h4>
        <div
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: "<p>Write something here...</p>",
};
