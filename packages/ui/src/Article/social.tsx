export interface SocialLinksProps {
  links?: {
    href: string;
    social: React.ReactNode;
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
        <div className="h-6 w-6">{link.social}</div>
      </a>
    ))}
  </div>
);

export default SocialLinks;
