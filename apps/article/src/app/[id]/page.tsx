import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { Alert } from "@acme/ui/Alert";
import { Button } from "@acme/ui/button";
import Loader from "@acme/ui/loader";
import ShareLinks from "@acme/ui/ShareLinks/index";

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
    const fetchArticleReaders = async () => {
      const { articleReaders } = await getGQLRequest({
        endpoint: `articleReaders`,
        where: `article:{id:${article.id}},profile:{id:${profileId}},organization:{id:${organizationId}}`,
        fields: `id`,
      });
      if (!articleReaders.length) {
        const { profiles } = await getGQLRequest({
          endpoint: `profiles`,
          where: `id:${profileId}`,
          fields: `schools{id}`,
        });
        await api.post("/article-readers", {
          profile: { id: profileId },
          article: { id: article.id },
          organization: { id: organizationId },
          school: {
            id:
              profiles[0]?.schools && profiles[0].schools.length > 0
                ? profiles[0].schools[0].id
                : null,
          },
        });
      }
    };

    fetchArticleReaders();
  }, [article.id]);

  const seo = {
    title: article.title ? `Topic - ${article.title}` : "Topic - Blog",
    description: article?.shortDescription || article?.description || "",
    image: article?.image?.url || "https://lms.topic.co.za/auth/logo.png",
    url: "https://topic.co.za",
  };

  const handleSaveArticle = () => {
    // Implement save article logic here
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
              <Alert />
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
                <div className="ml-2">
                  <ShareLinks
                    news={{ url: `/${article.id}` }}
                    name={"share"}
                    onClick={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>
              </div>
              <div className="mobile:ml-8 flex flex-wrap gap-2">
                <div className="">
                  <Button
                    color="bg-themeColorMain"
                    title="Back"
                    onClickFunction={() => router.push("/")}
                    trackingAction={`return to blogs from article: ${article.title}`}
                  />
                </div>
                <div className="">
                  <Button
                    color="bg-themeColorMain"
                    title="Save"
                    onClickFunction={handleSaveArticle}
                    trackingAction={`Saved article: ${article.title}`}
                    id={article.id}
                  />
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
                  color="bg-themeColorMain"
                  title="Back to list"
                  onClickFunction={() => router.back()}
                  trackingAction={`return to blogs from article: ${article.title}`}
                />
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
  const { article } = await getGQLRequest({
    endpoint: `article`,
    findOne: true,
    id: params?.id as string,
    fields: `id,title,description,author{id,firstName,lastName},published_at,image{url},shortDescription`,
  });
  return {
    props: {
      article: article,
    },
  };
};
