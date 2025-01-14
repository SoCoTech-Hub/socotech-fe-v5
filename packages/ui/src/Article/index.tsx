import { MoveLeft } from "lucide-react";

import { Avatar } from "../avatar";
import { About, AboutProps } from "./about";

export interface ArticleProps {
  article: {
    created_at: string;
    title: string;
    content: string;
    imageUrl: string;
  };
  publisher: AboutProps;
}
export const Article = ({ article, publisher }: ArticleProps) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <a
        href="/blog"
        className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <MoveLeft className="mr-2" />
        Back to Blogs
      </a>
      <article className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
        <img
          src={article.imageUrl}
          alt={`${article.title} cover image`}
          className="h-64 w-full object-cover"
        />
        <div className="p-6">
          <Avatar {...publisher} />
          <h1 className="mb-4 text-3xl font-bold">{article.title}</h1>
          <p className="mb-4 text-gray-600">
            Published on {article.created_at}
          </p>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
      <About {...publisher} />
    </main>
  );
};
