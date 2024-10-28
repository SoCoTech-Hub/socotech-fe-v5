// import React from "react";
// import LogoOverlay from "@/components/LogoOverlay";
// import { baseUrl } from "@/context/constants";

// interface TwoColPageProps {
//   col1Image?: string; // Optional string for the first column image
//   header: string; // Required string for the header
//   col2: React.ReactNode; // Required node for the second column content
// }

// const TwoColPage: React.FC<TwoColPageProps> = ({ col1Image, header, col2 }) => {
//   return (
//     <>
//       <div className="g-0 flex flex-wrap overflow-x-hidden">
//         <div className="desktop:w-1/2 laptop:w-1/2 mobile:h-1/3 w-full">
//           <div className="desktop:h-screen laptop:h-screen flex w-full place-content-center items-center">
//             <img
//               src={col1Image ? col1Image : `${baseUrl}/brand-image.png`}
//               alt="Image"
//               className="mobile:hidden"
//             />
//           </div>
//         </div>
//         <div className="bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 w-full">
//           <div className="desktop:h-screen laptop:h-screen mobile:mx-1 mobile:-mt-4 flex w-full place-content-center items-center">
//             <div className="desktop:w-3/5 mobile:w-10/12 desktop:my-0 my-10">
//               <div className="mobile:pt-2 text-textHeading w-4/5 pt-16 text-3xl font-bold">
//                 <LogoOverlay />
//                 <div className="pt-4">{header}</div>
//               </div>
//               {col2}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TwoColPage;
import React from "react";
import Image from "next/image";

import { cn } from "@acme/ui";

interface TwoColPageProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  imageLeft?: boolean;
  className?: string;
}

export default function TwoColPage({
  imageSrc,
  imageAlt,
  children,
  imageLeft = true,
  className,
}: TwoColPageProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col md:flex-row",
        imageLeft ? "md:flex-row" : "md:flex-row-reverse",
        className,
      )}
    >
      <div className="relative w-full md:w-1/2">
        <Image
          src={imageSrc}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
        <div className="mx-auto max-w-xl">{children}</div>
      </div>
    </div>
  );
}
// USE:
// import TwoColPage from '@acme/TwoColPage'
// import { Button } from "@/components/ui/button"

// export default function TwoColPageExample() {
//   return (
//     <TwoColPage
//       imageSrc="/path-to-your-image.jpg"
//       imageAlt="A beautiful landscape"
//     >
//       <h1 className="text-4xl font-bold mb-4">Welcome to Our Site</h1>
//       <p className="text-lg mb-6">
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
//         euismod, nisi vel consectetur interdum, nisl nunc egestas nunc,
//         vitae tincidunt nisl nunc euismod nunc.
//       </p>
//       <Button size="lg">Learn More</Button>
//     </TwoColPage>
//   )
// }
