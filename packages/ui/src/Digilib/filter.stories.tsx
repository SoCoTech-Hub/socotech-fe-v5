import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import ArticleFilter from "./filter";

const meta: Meta<typeof ArticleFilter> = {
  title: "Digilib/Filter",
  component: ArticleFilter,
  tags: ["autodocs"],
  argTypes: {
    articleList: {
      control: { type: "object" },
      description: "Initial list of articles to be filtered.",
    },
    setArticleList: {
      action: "setArticleList",
      description: "Function to update the list of articles.",
    },
    filters: {
      control: { type: "object" },
      description: "Initial list of filters available for filtering.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleFilter>;

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [articleList, setArticleList] = useState(args.articleList);
    return (
      <ArticleFilter
        {...args}
        articleList={articleList}
        setArticleList={setArticleList}
      />
    );
  },
  args: {
    articleList: [
      { id: "1", name: "Article 1", link: "https://example.com/article1" },
      { id: "2", name: "Article 2", link: "https://example.com/article2" },
    ],
    setArticleList: () => console.log("article Set"),
    filters: {
      grades: [{ id: "1", name: "10" }],
      subjects: [{ id: "1", name: "Mathematics" }],
      languages: [{ id: "1", name: "English" }],
      releaseYears: [{ id: "1", name: "2025" }],
    },
  },
};
