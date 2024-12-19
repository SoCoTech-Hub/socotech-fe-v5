import { FC, SVGProps } from "react";

export interface SocialLinksProps {
  links?: {
    href: string;
    social: FC<SVGProps<SVGSVGElement>>;
    label: string;
  }[];
  publisher: {
    firstName: string;
    lastName: string;
  };
}

const SocialLinks = ({ links, publisher }: SocialLinksProps) => (
  <div className="flex space-x-4">
    {links?.map((link, i) => (
      <a
        key={`${i}-${link.href}`}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600"
        aria-label={`${publisher.firstName} ${publisher.lastName}'s ${link.label} profile`}
      >
        <link.social width={24} height={24} />
      </a>
    ))}
  </div>
);

export default SocialLinks;
