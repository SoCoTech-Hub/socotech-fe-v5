// import { baseUrl } from '@/context/constants';

// const LogoOverlay: React.FC = () => {
//   return (
//     <img
//       src={`${baseUrl}/logo.png`}
//       alt="Logo"
//       className="desktop:h-20 laptop:h-20 mobile:h-16"
//     />
//   );
// };

// export default LogoOverlay;
import Image from "next/image";
import Link from "next/link";

interface LogoOverlayProps {
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

export default function LogoOverlay({
  text = "Your Company",
  imageSrc,
  imageAlt = "Company Logo",
  href = "/",
}: LogoOverlayProps = {}) {
  return (
    <Link href={href} className="flex items-center space-x-2">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={32}
          height={32}
          className="w-auto h-8"
        />
      )}
      {text && <span className="text-xl font-bold text-primary">{text}</span>}
      {!imageSrc && !text && <span className="sr-only">Home</span>}
    </Link>
  );
}

// USE:
