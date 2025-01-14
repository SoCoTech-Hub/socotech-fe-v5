import type { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";

import { InmailComposer, InmailComposerProps } from "./composer";

export default {
  title: "Components/InmailComposer",
  component: InmailComposer,
} as Meta;

const Template: StoryFn<InmailComposerProps> = (args) => {
  const [composing, setComposing] = useState(true);

  const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Attachment added:", event.target.files);
  };

  if (!composing) return <></>;

  return (
    <InmailComposer
      {...args}
      setComposing={setComposing}
      handleAttachment={handleAttachment}
    />
  );
};

export const DefaultComposer = Template.bind({});
DefaultComposer.args = {
  attachments: [
    {
      id: "1",
      url: "adjksfghbaijkldsga/fadsghaiouhgs/g/adsfgadga",
    },
  ],
};
