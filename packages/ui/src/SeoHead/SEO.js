import Head from "next/head";
import { baseUrl, mainUrl } from "@/context/constants";

export const SEO = ({ title, description, image, url }) => {
  const seo = {
    title: title ? title : "Topic",
    description: description ? description : "Get ready to start!",
    image: image ? image : `${mainUrl}${baseUrl}/logo.png`,
    url: url ? url : mainUrl,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.url} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />
    </Head>
  );
};