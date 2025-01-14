import { Facebook, Instagram, Linkedin, Share2, Twitter } from "lucide-react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface SocialMediaLink {
  platform?: "facebook" | "twitter" | "linkedin" | "instagram";
  url: string;
}

export interface SocialMediaShareProps {
  links: SocialMediaLink[];
  title?: string;
  description?: string;
}

const iconMap: Record<
  "facebook" | "twitter" | "linkedin" | "instagram",
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
};
//TODO: Update links According to company requirements
// const links = [
// {
//   name: "instagram",
//   url: "https://www.instagram.com/topic.education?fbclid=IwAR1WYgYgvoPU4MTH0DOqWcf-dbTtWdkG8ziCNGwUnFxKUZsy6OgYUJzoCdg",
//   icon: <Instagram />,
// },
// {
//   name: "facebook",
//   url: "https://www.facebook.com/profile.php?id=100095540883970",
//   icon: <Facebook />,
// },
// {
//   name: "tiktok",
//   url: "https://www.tiktok.com/@topiceducation?is_from_webapp=1",
//   icon: <TikTok />,
// },
// {
//   name: "whatsappGroup",
//   url: "https://whatsapp.com/channel/0029VaFE7lUJENyAWIOPCB0J",
//   icon: <WhatsAppGroup />,
// },
// ];
export function SocialLinks({
  links,
  title = "Share this content",
  description = "Share this content on your favorite social media platforms",
}: SocialMediaShareProps) {
  const handleShare = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {links.map((link, index) => {
            const Icon = link.platform ? iconMap[link.platform] : Share2;
            return (
              <Button
                key={index}
                variant="outline"
                size="icon"
                onClick={() => handleShare(link.url)}
                aria-label={`Share on ${link.platform ?? link.url}`}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
