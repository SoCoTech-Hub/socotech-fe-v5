import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "@/api/api";
import Avatar from "@/components/Avatar";
// import { useAppContext } from '@/context/AppContext'
import BtnSm from "@/components/BtnSm";
import ShareLinks from "@/components/ShareLinks";
import { HeartIcon, LikesIcon } from "@/components/SvgIcons";
// import handleArticleUpvote from '@/snippets/blog/handleArticleUpvote'
import { baseUrl, profileId } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";
import { getTimeDifferenceFromPostDate } from "@/snippets/user/getTimeDifferenceFromPostDate";

const BlogPost = ({
  imgSrc,
  title,
  description,
  authorName,
  authorProfilePic,
  datePosted,
  handleArticleSave,
  blogPostId, //
  blogPostSocials, //
}) => {
  const router = useRouter();
  // const [articleLikes, setArticleLikes] = useState([])
  const [articleLikeLoves, setArticleLikeLoves] = useState([]);
  const [socialId, setSocialId] = useState(null);
  const [socialLoves, setSocialLoves] = useState([]);
  const [allLoves, setAllLoves] = useState([]);
  const [lovesTotal, setLovesTotal] = useState(0);
  const [isLoved, setIsLoved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);

  let mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`;

  useEffect(() => {
    router.events.on("routeChangeStart", setLoading(true));
    router.events.on("routeChangeComplete", setLoading(false));
  }, []);

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

  useEffect(async () => {
    if (blogPostId) {
      const { article } = await getGQLRequest({
        endpoint: "article",
        id: blogPostId,
        findOne: true,
        fields: `articleLike{id,loves{id}}`,
      });
      if (article?.articleLike?.loves) {
        setArticleLikeLoves(article?.articleLike?.loves);
      }

      if (article?.articleLike?.loves) {
        setLovesTotal(article.articleLike.loves.length);
        if (article.articleLike.loves.find((x) => x.id == profileId)) {
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
  }, [blogPostId]);

  const upvoteEventHandler = async (upvoted) => {
    let updatedSocialsList = !isLoved
      ? [...allLoves, { id: profileId }]
      : [...allLoves.filter((x) => x.id !== profileId)];
    setSocialLoves(updatedSocialsList);
    setArticleLikeLoves(updatedSocialsList);
    if (upvoted === "loves") {
      setIsLoved(!isLoved);
      if (socialId) {
        const res = await api.put(`/socials/${socialId}`, {
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
