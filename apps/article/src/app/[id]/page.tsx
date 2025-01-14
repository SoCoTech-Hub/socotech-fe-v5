import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { profileId } from "@acme/snippets/context/constants";
import { FetchArticle } from "@acme/snippets/functions/article/article";
import { FetchArticleReaders } from "@acme/snippets/functions/article/articleReader";
import { Button } from "@acme/ui";
import {Loader} from "@acme/ui";
import { PopupAlert } from "@acme/ui";
import {SocialLinks} from "@acme/ui";

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
    // TODO: Implement save article logic here
    setSuccess(true);
  };

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
                      {/* Replace LikesIcon and HeartIcon with appropriate icons */}
                      <HeartIcon
                        className="w-5"
                        name={"loves"}
                        data-tracking-action={`Loved article: ${article.title}`}
                      />
                    </div>
                    <div className="text-textColor mobile:mt-1 ml-1 text-xs">
                      {/* Replace lovesTotal with appropriate count */}0
                    </div>
                  </div>
                </div>
                {/* //TODO:fix socialLinks */}
                <div className="ml-2">
                  <SocialLinks links={}/>
                  {/* <ShareLinks
                    news={{ url: `/${article.id}` }}
                    name={"share"}
                    onClick={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  /> */}
                </div>
              </div>
              <div className="mobile:ml-8 flex flex-wrap gap-2">
                <div className="">
                  <Button
                    className="bg-primary"
                    onClick={() => router.push("/")}
                    // trackingAction={`return to blogs from article: ${article.title}`}//TODO:is tracking needed?
                  >
                    Back
                  </Button>
                </div>
                <div className="">
                  <Button
                    className="bg-primary"
                    onClick={handleSaveArticle}
                    // trackingAction={`Saved article: ${article.title}`}//TODO:is tracking needed?
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
                <Button
                  className="bg-primary"
                  onClick={() => router.back()}
                  //trackingAction={`return to blogs from article: ${article.title}`}//TODO:is tracking needed?
                >
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
