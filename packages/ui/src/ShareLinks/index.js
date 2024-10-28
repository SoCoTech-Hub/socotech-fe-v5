// import { useRouter } from "next/router";
// import Dropdowns from "@/components/Dropdowns";
// import { gql, useQuery } from "@apollo/client";

// const GetSocials = gql`
//   query GetSocials {
//     socialLinks {
//       name
//       icon {
//         url
//       }
//       url
//       color
//     }
//   }
// `;

// const ShareLinks = ({ news, name, onClick }) => {
//   const { data } = useQuery(GetSocials);
//   const router = useRouter();

//   const navigationIconLinks = data?.socialLinks.map((link, index) => ({
//     id: index + 1,
//     label: link.name,
//     icon: <img src={link.icon.url} />,
//     href: `${link.url}${
//       news && news.url
//         ? news.url.startsWith("http")
//           ? news.url
//           : `${process.env.NEXT_PUBLIC_MAIN_URL}${process.env.NEXT_PUBLIC_BASE_URL}${news.url}`
//         : news && news.videoLink
//           ? news.videoLink
//           : `${process.env.NEXT_PUBLIC_MAIN_URL}${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`
//     }`,
//     color: link.color,
//   }));

//   return (
//     <>
//       <Dropdowns
//         name={name}
//         onClick={onClick}
//         iconBgColor="transparent"
//         buttonTextIconColor="#D6F379"
//         label="Socials"
//         isMinimalMenuIcon={true}
//         list={navigationIconLinks}
//         dropDirection="right"
//       />
//     </>
//   );
// };

// export default ShareLinks;
import React from 'react'
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ShareLinksProps {
  url: string
  title: string
  description: string
}

export default function ShareLinks({ url, title, description }: ShareLinksProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    },
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    },
  ]

  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        {shareLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
                aria-label={`Share on ${link.name}`}
              >
                {link.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on {link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
// USE:
// import ShareLinks from './path-to/share-links'

// export default function ShareLinksExample() {
//   const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Share This Page</h1>
//       <ShareLinks
//         url={currentUrl}
//         title="Check out this awesome page!"
//         description="I found this great content and thought you might like it too."
//       />
//     </div>
//   )
// }