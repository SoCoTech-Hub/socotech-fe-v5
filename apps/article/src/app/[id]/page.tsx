import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { profileId } from "@acme/snippets/context/constants";
import { FetchArticle } from "@acme/snippets/functions/article/article";
import { FetchArticleReaders } from "@acme/snippets/functions/article/articleReader";
import {
  Button,
  HeartIcon,
  Loader,
  PopupAlert,
  SocialLinks,
  SocialMediaShareProps,
} from "@acme/ui";

interface Article {
  id: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  image?: {
    url: string;
  };
  author?: {
    firstName: string;
    lastName: string;
  };
  published_at?: string;
  articleLike?: {
    id: string;
  };
}

interface ArticleProps {
  article: Article;
}

export default function Article({ article }: ArticleProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    FetchArticleReaders({ articleId: article.id, profileId: profileId || "" });
  }, [article.id]);

  const handleSaveArticle = () => {
    setSuccess(true);
  };

  const socialLinks: SocialMediaShareProps["links"] = [
    {
      platform: "facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href,
      )}`,
    },
    {
      platform: "twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href,
      )}&text=${encodeURIComponent(article.title || "")}`,
    },
    {
      platform: "linkedin",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        window.location.href,
      )}&title=${encodeURIComponent(article.title || "")}`,
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/", // Placeholder for Instagram
    },
  ];

  return (
    <>
      <div className="bg-compBg w-full rounded-lg p-3 shadow-md">
        <div className="">
          <div className="text-textColor mobile:p-1 pb-1 pl-6 pr-6 pt-2 text-lg">
            {article.title}
          </div>
          <div className="text-textColor mobile:p-1 px-6">
            {`${article?.author?.firstName} ${article?.author?.lastName}` !==
            "undefined undefined"
              ? `${article?.author?.firstName} ${article?.author?.lastName}`
              : "No Name"}{" "}
            - {new Date(article?.published_at || "").toLocaleDateString()}
          </div>
          <div className="shadow-outline bg-compBg mobile:p-1 rounded-lg p-6">
            <img
              src={article?.image?.url}
              alt={article.title}
              onLoad={() => setLoading(false)}
              className="w-full rounded-lg object-contain"
            />
          </div>
          <div className="w-full">
            <div className="justify-content-center flex">
              <PopupAlert
                message={"success"}
                variant={"success"}
                visible={success}
              />
            </div>
            <div className="mobile:p-1 flex flex-row justify-between px-6 pb-1">
              <div className="flex h-10 flex-row items-center align-middle">
                <div className="flex">
                  <div className="flex h-5 flex-row items-center align-middle">
                    <div
                      className="cursor-pointer rounded-lg pl-3 shadow-none"
                      onClick={() =>
                        console.log("Loved article:", article.title)
                      }
                      data-tracking-action={`Loved article: ${article.title}`}
                    >
                      <HeartIcon
                        className="w-5"
                        name={"loves"}
                        data-tracking-action={`Loved article: ${article.title}`}
                      />
                    </div>
                    <div className="text-textColor mobile:mt-1 ml-1 text-xs">
                      0
                    </div>
                  </div>
                </div>
                <div className="ml-2">
                  <SocialLinks
                    links={socialLinks}
                    title="Share this article"
                    description="Spread the word on your favorite social media platforms"
                  />
                </div>
              </div>
              <div className="mobile:ml-8 flex flex-wrap gap-2">
                <div className="">
                  <Button
                    className="bg-primary"
                    onClick={() => router.push("/")}
                  >
                    Back
                  </Button>
                </div>
                <div className="">
                  <Button
                    className="bg-primary"
                    onClick={handleSaveArticle}
                    id={article.id}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <div className="pt-3">
              <div className="text-textColor mobile:p-1 flex-shrink px-6">
                {article.description?.includes("<br/>") ||
                article.description?.includes("<br>") ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: article.description }}
                  ></div>
                ) : (
                  <ReactMarkdown>{article.description || ""}</ReactMarkdown>
                )}
              </div>
            </div>
            <div className="mr-4 flex justify-end">
              <div className="mt-4">
                <Button className="bg-primary" onClick={() => router.back()}>
                  Back to list
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center align-middle">
            <Loader />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const article = await FetchArticle(params?.id as string);
  return {
    props: {
      article: article,
    },
  };
};
