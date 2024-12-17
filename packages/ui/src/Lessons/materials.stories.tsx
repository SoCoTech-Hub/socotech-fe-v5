import type { Meta, StoryFn } from "@storybook/react";
import { FileText, Link } from "lucide-react";

import type { HelpfulMaterialsProps, Material } from "./materials";
import HelpfulMaterials from "./materials";

export default {
  title: "Lesson/HelpfulMaterials",
  component: HelpfulMaterials,
} as Meta;

const Template: StoryFn<HelpfulMaterialsProps> = (args) => (
  <HelpfulMaterials {...args} />
);

const sampleMaterials: Material[] = [
  {
    id: "1",
    title: "React Documentation",
    description: "Official React documentation",
    icon: <Link className="h-5 w-5" />,
    url: "https://reactjs.org",
  },
  {
    id: "2",
    title: "TypeScript Handbook",
    description: "Comprehensive guide to TypeScript",
    icon: <FileText className="h-5 w-5" />,
    url: "https://www.typescriptlang.org/docs/",
  },
];

export const DefaultMaterials = Template.bind({});
DefaultMaterials.args = {
  materials: sampleMaterials,
};
