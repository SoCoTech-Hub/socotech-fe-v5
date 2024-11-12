// import { useEffect, useState } from "react";
// import Head from "next/head";
// import { useRouter } from "next/router";
// import api from "@/api/api";
// import Alert from "@/components/Alert";
// import Btn from "@/components/Btn";
// import BlogLoad from "@/components/DigilibLoad";
// import ShareLinks from "@/components/ShareLinks";
// import { HeartIcon, LikesIcon } from "@/components/SvgIcons";
// import { useAppContext } from "@/context/AppContext";
// import { baseUrl, PrimaryColor, profileId } from "@/context/constants";
// import handleArticleSave from "@/snippets/blog/handleArticleSave";
// import getGQLRequest from "@/snippets/getGQLRequest";
// import { getTimeDifferenceFromPostDate } from "@/snippets/user/getTimeDifferenceFromPostDate";
// import ReactMarkdown from "react-markdown";

// interface BlogPostProps {
//   blogPostId: string;
//   title: string;
//   author: string;
//   datePosted: string;
//   textContent: string;
//   loading: boolean;
//   setLoading: (loading: boolean) => void;
//   imgSrc?: string;
//   blogPost: any; // Adjust this type based on your actual blogPost structure
// }

// const Index: React.FC<BlogPostProps> = ({
//   blogPostId,
//   title,
//   author,
//   datePosted,
//   textContent,
//   loading,
//   setLoading,
//   imgSrc = "",
//   blogPost,
// }) => {
//   const { state } = useAppContext();
//   const [isLoved, setIsLoved] = useState<boolean>(false);
//   const [socialId, setSocialId] = useState<string | null>(null);
//   const [socialLoves, setSocialLoves] = useState<any[]>([]);
//   const [allLoves, setAllLoves] = useState<any[]>([]);
//   const [blogPostSocials, setBlogPostSocials] = useState<number>(0);
//   const [articleLikeLoves, setArticleLikeLoves] = useState<any[]>([]);
//   const [lovesTotal, setLovesTotal] = useState<number>(0);
//   const [success, setSuccess] = useState<string>("");
//   const router = useRouter();
//   let mediaUrl = imgSrc ? imgSrc : `${baseUrl}/dummypost.png`;

//   useEffect(() => {
//     const socialLovesArray = socialLoves ?? [];
//     const articleLikeLovesArray = articleLikeLoves ?? [];

//     if (socialLovesArray.length ?? articleLikeLovesArray.length) {
//       const mergedArray = [...socialLovesArray, ...articleLikeLovesArray];

//       const uniqueArray = mergedArray.length
//         ? Array.from(new Set(mergedArray.map(JSON.stringify)), JSON.parse)
//         : [];
//       if (uniqueArray.length > 0) {
//         setAllLoves(uniqueArray);
//         setLovesTotal(uniqueArray.length);

//         setIsLoved(
//           uniqueArray.find((x: { id: string }) => x.id === profileId)
//             ? true
//             : false,
//         );
//       }
//     }
//   }, [socialLoves, articleLikeLoves]);

//   useEffect(() => {
//     const fetchBlogPostData = async () => {
//       if (blogPostId) {
//         const { article } = await getGQLRequest({
//           endpoint: "article",
//           id: blogPostId,
//           findOne: true,
//           fields: `articleLike{id,loves{id}}`,
//         });
//         setBlogPostSocials(article.articleLike.id);
//         setArticleLikeLoves(article.articleLike.loves);
//         setIsLoved(
//           article.articleLike.loves.find(
//             (x: { id: string }) => x.id === profileId,
//           ),
//         );

//         let { feeds } = await getGQLRequest({
//           endpoint: `feeds`,
//           fields: `social{id,loves{id}}`,
//           where: `url:"/blog/${blogPostId}"`,
//         });
//         if (feeds.length) {
//           setSocialId(feeds[0]?.social.id);
//           setSocialLoves(feeds[0]?.social?.loves);
//         }
//       }
//     };

//     fetchBlogPostData();
//   }, [blogPostId]);

//   const upvoteEventHandler = async (upvoted: "loves") => {
//     let updatedSocialsList = !isLoved
//       ? [...allLoves, { id: profileId }]
//       : [...allLoves.filter((x: { id: string }) => x.id !== profileId)];

//     setSocialLoves(updatedSocialsList);
//     setArticleLikeLoves(updatedSocialsList);

//     if (upvoted === "loves") {
//       setIsLoved(!isLoved);
//       if (socialId) {
//         await api.put(`/socials/${socialId}`, {
//           loves: updatedSocialsList,
//         });
//       } else {
//         const res = await api.post(`/socials`, {
//           loves: updatedSocialsList,
//         });
//         setSocialId(res.data.id);
//       }
//       if (blogPostSocials) {
//         const res = await api.put(`/article-likes/${blogPostSocials}`, {
//           loves: updatedSocialsList,
//         });

//         setLovesTotal(res.data.loves.length);
//       } else {
//         const res = await api.post(`/article-likes`, {
//           loves: updatedSocialsList,
//         });

//         setLovesTotal(res.data.loves.length);
//       }
//     }
//   };

//   const handleSaveArticle = () => {
//     handleArticleSave({
//       id: profileId,
//       article: blogPost,
//     });
//     setSuccess("Article Saved");
//   };

//   return (
//     <>
//       <Head>
//         <meta property="og:type" content="article" />
//         <meta property="twitter:card" content="summary_large_image" />
//         <meta property="og:image" content={mediaUrl} />
//         <meta property="twitter:image" content={mediaUrl} />
//         <meta property="twitter:title" content={title} />
//         <meta
//           property="twitter:url"
//           content={process.env.NEXT_PUBLIC_MAIN_URL}
//         />
//         <meta property="og:url" content={process.env.NEXT_PUBLIC_MAIN_URL} />
//       </Head>
//       <div className="bg-compBg w-full rounded-lg p-3 shadow-md">
//         <div className="">
//           <div className="text-textColor mobile:p-1 pb-1 pl-6 pr-6 pt-2 text-lg">
//             {title}
//           </div>
//           <div className="text-textColor mobile:p-1 px-6">
//             {author !== "undefined undefined" ? author : "No Name"} -{" "}
//             {getTimeDifferenceFromPostDate(datePosted)}
//           </div>
//           <div className="shadow-outline bg-compBg mobile:p-1 rounded-lg p-6">
//             <img
//               src={mediaUrl}
//               alt={title}
//               onLoad={() => setLoading(false)}
//               className="w-full rounded-lg object-contain"
//             />
//           </div>
//           <div className="w-full">
//             <div className="justify-content-center flex">
//               <Alert success={success} />
//             </div>
//             <div className="mobile:p-1 flex flex-row justify-between px-6 pb-1">
//               <div className="flex h-10 flex-row items-center align-middle">
//                 <div className="flex">
//                   <div className="flex h-5 flex-row items-center align-middle">
//                     <div
//                       className="cursor-pointer rounded-lg pl-3 shadow-none"
//                       onClick={() => upvoteEventHandler("loves")}
//                       data-tracking-action={`Loved article: ${title}`}
//                     >
//                       {isLoved ? (
//                         <LikesIcon
//                           className="w-6"
//                           name={"loves"}
//                           data-tracking-action={`Loved article: ${title}`}
//                         />
//                       ) : (
//                         <HeartIcon
//                           className="w-5"
//                           name={"loves"}
//                           data-tracking-action={`Loved article: ${title}`}
//                         />
//                       )}
//                     </div>
//                     <div className="text-textColor mobile:mt-1 ml-1 text-xs">
//                       {lovesTotal}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="ml-2">
//                   <ShareLinks news={{ url: `/${blogPostId}` }} name={"share"} />
//                 </div>
//               </div>

//               <div className="mobile:ml-8 flex flex-wrap gap-2">
//                 <div className="">
//                   <Btn
//                     color="bg-themeColorMain"
//                     label="Back"
//                     onClickFunction={() => router.push("/")}
//                     trackingAction={`return to blogs from article: ${title}`}
//                   />
//                 </div>
//                 <div className="">
//                   <Btn
//                     color="bg-themeColorMain"
//                     label="Save"
//                     onClickFunction={handleSaveArticle}
//                     trackingAction={`Saved article: ${title}`}
//                     id={blogPostId}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="pt-3">
//               <div className="text-textColor mobile:p-1 flex-shrink px-6">
//                 {(textContent.indexOf("<br/>") ??
//                 textContent.indexOf("<br>")) ? (
//                   <div dangerouslySetInnerHTML={{ __html: textContent }}></div>
//                 ) : (
//                   <ReactMarkdown children={textContent} />
//                 )}
//               </div>
//             </div>
//             <div className="mr-4 flex justify-end">
//               <div className="mt-4">
//                 <Btn
//                   color="bg-themeColorMain"
//                   label="Back to list"
//                   onClickFunction={() => router.back()}
//                   trackingAction={`return to blogs from article: ${title}`}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center align-middle">
//             <BlogLoad loading={loading} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Index;
import React from "react";
import Image from "next/image";
import { Facebook, Heart, Instagram, Linkedin, Twitter } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

interface SocialLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin";
  url: string;
}

interface BlogHeaderProps {
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  publishDate: string;
  readTime: string;
  likes: number;
  socialLinks: SocialLink[];
}

export default function BlogHeader({
  title,
  description,
  author,
  coverImage,
  publishDate,
  readTime,
  likes,
  socialLinks,
}: BlogHeaderProps) {
  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
  };

  return (
    <header className="mb-8">
      <div className="relative mb-6 h-64 w-full md:h-96">
        <Image
          src={coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h1 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {publishDate} · {readTime} read
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Like</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{likes} likes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {socialLinks.map((link) => {
            const Icon = socialIcons[link.platform];
            return (
              <TooltipProvider key={link.platform}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">
                          Share on {link.platform}
                        </span>
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on {link.platform}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
    </header>
  );
}
// USE:
// import BlogHeader from '@acme/BlogHeader'

// export default function BlogHeaderExample() {
//   const blogData = {
//     title: "The Future of Web Development: Trends to Watch in 2024",
//     description: "Explore the cutting-edge technologies and methodologies shaping the future of web development. From AI-driven interfaces to advanced frameworks, discover what's next in the world of web tech.",
//     author: {
//       name: "Jane Doe",
//       avatar: "/path-to-avatar.jpg"
//     },
//     coverImage: "/path-to-cover-image.jpg",
//     publishDate: "May 15, 2024",
//     readTime: "5 min",
//     likes: 142,
//     socialLinks: [
//       { platform: "twitter", url: "https://twitter.com/share?url=..." },
//       { platform: "facebook", url: "https://www.facebook.com/sharer/sharer.php?u=..." },
//       { platform: "linkedin", url: "https://www.linkedin.com/shareArticle?url=..." }
//     ]
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <BlogHeader {...blogData} />
//       {/* Rest of your blog content goes here */}
//     </div>
//   )
// }
