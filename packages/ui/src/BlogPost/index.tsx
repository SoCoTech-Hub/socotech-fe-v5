import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/api/api";
import Avatar from "@/components/Avatar";
import BtnSm from "@/components/BtnSm";
import ShareLinks from "@/components/ShareLinks";
import { HeartIcon, LikesIcon } from "@/components/SvgIcons";
import { baseUrl, profileId } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";
import { getTimeDifferenceFromPostDate } from "@/snippets/user/getTimeDifferenceFromPostDate";

interface BlogPostProps {
  imgSrc?: string;
  title: string;
  description?: string; // optional if you need to use it
  authorName: string;
  authorProfilePic: string;
  datePosted: string; // or Date, depending on your use case
  handleArticleSave: (id: string) => void; // update the type as needed
  blogPostId: string;
  blogPostSocials?: string; // optional if you need to use it
}

const BlogPost: React.FC<BlogPostProps> = ({
  imgSrc,
  title,
  description,
  authorName,
  authorProfilePic,
  datePosted,
  handleArticleSave,
  blogPostId,
  blogPostSocials,
}) => {
  const router = useRouter();
  const [articleLikeLoves, setArticleLikeLoves] = useState<any[]>([]); // Specify the actual type if possible
  const [socialId, setSocialId] = useState<string | null>(null);
  const [socialLoves, setSocialLoves] = useState<any[]>([]); // Specify the actual type if possible
  const [allLoves, setAllLoves] = useState<any[]>([]); // Specify the actual type if possible
  const [lovesTotal, setLovesTotal] = useState<number>(0);
  const [isLoved, setIsLoved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [feed, setFeed] = useState<any[]>([]); // Specify the actual type if possible

  let mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`;

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    const socialLovesArray = socialLoves ?? [];
    const articleLikeLovesArray = articleLikeLoves ?? [];
    if (socialLovesArray.length ?? articleLikeLovesArray.length) {
      const mergedArray = socialLovesArray.concat(articleLikeLovesArray);
      const uniqueArray = Array.from(
        new Set(mergedArray.map(JSON.stringify)),
        JSON.parse,
      );
      setAllLoves(uniqueArray);
      setLovesTotal(uniqueArray.length);
    }
  }, [socialLoves, articleLikeLoves]);

  useEffect(() => {
    const fetchData = async () => {
      if (blogPostId) {
        const { article } = await getGQLRequest({
          endpoint: "article",
          id: blogPostId,
          findOne: true,
          fields: `articleLike{id,loves{id}}`,
        });

        if (article?.articleLike?.loves) {
          setArticleLikeLoves(article.articleLike.loves);
          setLovesTotal(article.articleLike.loves.length);

          if (article.articleLike.loves.find((x: any) => x.id === profileId)) {
            setIsLoved(true);
          }
        }

        let { feeds } = await getGQLRequest({
          endpoint: `feeds`,
          fields: `id, social{id,loves{id}}`,
          where: `url:"/blog/${blogPostId}"`,
          stateSetter: setFeed,
        });

        if (feeds.length) {
          setSocialId(feeds[0]?.social?.id);
          setSocialLoves(feeds[0]?.social?.loves);
        }
      }
    };

    fetchData();
  }, [blogPostId]);

  const upvoteEventHandler = async (upvoted: string) => {
    let updatedSocialsList = !isLoved
      ? [...allLoves, { id: profileId }]
      : [...allLoves.filter((x) => x.id !== profileId)];

    setSocialLoves(updatedSocialsList);
    setArticleLikeLoves(updatedSocialsList);

    if (upvoted === "loves") {
      setIsLoved(!isLoved);
      if (socialId) {
        await api.put(`/socials/${socialId}`, {
          loves: updatedSocialsList,
        });
      } else {
        const res = await api.post(`/socials`, {
          loves: updatedSocialsList,
        });
        await api.put(`/feeds/${feed.id}`, { social: { id: res.data.id } });
        setSocialId(res.data.id);
      }

      if (blogPostSocials) {
        const res = await api.put(`/article-likes/${blogPostSocials}`, {
          loves: updatedSocialsList,
        });
        setLovesTotal(res.data.loves.length);
      } else {
        const res = await api.post(`/article-likes`, {
          loves: updatedSocialsList,
        });
        await api.put(`articles/${blogPostId}`, {
          articleLike: { id: res.data.id },
        });
        setLovesTotal(res.data.loves.length);
      }
    }
  };

  return (
    <div className="bg-compBg mb-2 rounded-lg p-3 shadow-md">
      <div className="mb-2 flex flex-row justify-between">
        <div className="flex h-auto flex-row items-center align-middle">
          <div className="avatar ml-1">
            <Avatar
              src={authorProfilePic}
              size="45px"
              border={true}
              borderColor="white"
            />
          </div>
          <div className="text-textColor mobile:pl-2 pl-2">
            {authorName !== "undefined undefined" ? authorName : "No Name"}
          </div>
        </div>
      </div>
      <div className="text-textColor pl-2 text-xs font-thin">
        {getTimeDifferenceFromPostDate(datePosted)}
      </div>

      <div className="mt-1">
        <div className={`text-textColor mobile:pb-1 pb-2 pl-2 text-sm`}>
          <div className="line-clamp-1">
            <div
              className="overflow-x-hidden"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>
      </div>
      <div className="m-2 cursor-pointer">
        <a href={`${baseUrl}/${blogPostId}`}>
          <img
            src={mediaUrl}
            alt="Blog Image"
            className="w-full rounded-lg shadow-md"
          />
        </a>
      </div>
      <div className="mx-2">
        <div className="flex h-5 w-52 flex-row justify-between gap-x-2 py-1 align-middle">
          <div className="flex justify-between align-middle">
            <div
              className="w-6 cursor-pointer rounded-lg"
              onClick={() => upvoteEventHandler("loves")}
              data-tracking-action={`Loved article: ${title}`}
            >
              {isLoved ? (
                <LikesIcon
                  name={"likes"}
                  data-tracking-action={`Loved article: ${title}`}
                />
              ) : (
                <HeartIcon
                  name={"loves"}
                  data-tracking-action={`Loved article: ${title}`}
                />
              )}
            </div>
            <div className={`text-textColor my-1 text-xs font-bold`}>
              {lovesTotal}
            </div>
          </div>
          <div className="h-2">
            <ShareLinks news={{ url: `/${blogPostId}` }} name={"share"} />
          </div>
          <div className="laptop:mx-6 desktop:mx-4 mobile:mx-4">
            <BtnSm
              label={loading ? "Loading" : "Save"}
              id={blogPostId}
              onClickFunction={handleArticleSave}
              trackingAction={`Saved article: ${title}`}
              color="bg-themeColorMain"
              width="px-4 py-1 mb-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
