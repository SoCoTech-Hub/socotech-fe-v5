// import Head from "next/head";
// import { baseUrl, mainUrl } from "@/context/constants";

// interface SEOProps {
//   title?: string; // Optional title prop
//   description?: string; // Optional description prop
//   image?: string; // Optional image prop
//   url?: string; // Optional URL prop
// }

// export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
//   const seo = {
//     title: title ?? "Topic",
//     description: description ?? "Get ready to start!",
//     image: image ?? `${mainUrl}${baseUrl}/logo.png`,
//     url: url ?? mainUrl,
//   };

//   return (
//     <Head>
//       <title>{seo.title}</title>
//       <meta name="title" content={seo.title} />
//       <meta name="description" content={seo.description} />
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content={seo.url} />
//       <meta property="og:title" content={seo.title} />
//       <meta property="og:description" content={seo.description} />
//       <meta property="og:image" content={seo.image} />
//       <meta property="twitter:card" content="summary_large_image" />
//       <meta property="twitter:url" content={seo.url} />
//       <meta property="twitter:title" content={seo.title} />
//       <meta property="twitter:description" content={seo.description} />
//       <meta property="twitter:image" content={seo.image} />
//     </Head>
//   );
// };
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  twitterHandle?: string;
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterHandle,
  noIndex = false,
}: SEOProps) {
  const siteTitle = "Your Site Name";
  const fullTitle = `${title} | ${siteTitle}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* No index if specified */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Favicon - replace with your own favicon path */}
      <link rel="icon" href="/favicon.ico" />

      {/* Apple touch icon - replace with your own icon path */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      {/* Manifest - create and link your own manifest file */}
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
// USE:
// import SEO from './path-to/seo'

// export default function ExamplePage() {
//   return (
//     <>
//       <SEO
//         title="Example Page"
//         description="This is an example page demonstrating the use of our SEO component."
//         canonical="https://www.yoursite.com/example-page"
//         ogImage="https://www.yoursite.com/images/og-image.jpg"
//         twitterHandle="@yourtwitterhandle"
//       />
//       <main>
//         <h1>Example Page</h1>
//         {/* Your page content goes here */}
//       </main>
//     </>
//   )
// }
