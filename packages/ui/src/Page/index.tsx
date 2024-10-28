// import React from "react";
// import Alert from "@/components/Alert";
// import LogoOverlay from "@/components/LogoOverlay";
// import { baseUrl } from "@/context/constants";

// interface PageProps {
//   header: string;
//   message: string;
//   buttons?: React.ReactNode[]; // Optional array of React nodes
//   background?: string; // Optional background image URL
//   error?: boolean; // Optional boolean for error state
//   success?: boolean; // Optional boolean for success state
// }

// export const Page: React.FC<PageProps> = ({
//   header,
//   message,
//   buttons,
//   background,
//   error,
//   success,
// }) => (
//   <div className="flex h-screen w-full items-center justify-center">
//     <div
//       className="flex h-full w-full items-center justify-center"
//       style={{
//         backgroundImage: `url(${background ?? `${baseUrl}/background1.png`})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="bg-compBg mobile:w-11/12 laptop:w-1/2 desktop:w-1/2 mobile:p-4 laptop:px-20 laptop:py-8 mobile:my-5 laptop:my-10 flex flex-col gap-y-4 rounded-3xl drop-shadow-2xl filter">
//         <div className="mt-4 flex justify-center">
//           <LogoOverlay />
//         </div>
//         <div className="text-textColor text-center text-2xl font-bold">
//           {header}
//         </div>
//         <div className="text-themeColorSecondary w-full px-4 text-center">
//           {message}
//         </div>
//         <div className="desktop:px-20 laptop:px-20 mobile:px-2">
//           <Alert error={error} success={success} />
//         </div>
//         <div className="mb-4 flex flex-wrap justify-center gap-4">
//           {buttons?.map((button, index) => <div key={index}>{button}</div>)}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Page;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

interface PageProps {
  children: React.ReactNode;
  title: string;
  backgroundImage: string;
}

export default function Page({ children, title, backgroundImage }: PageProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="relative z-10 flex min-h-screen flex-col bg-black bg-opacity-50">
        <header className="text-white">
          <div className="container mx-auto px-4 py-6">
            <Link href="/" className="text-2xl font-bold">
              Your Logo
            </Link>
          </div>
        </header>

        <main className="container mx-auto flex-grow px-4 py-8 text-white">
          <h1 className="mb-6 text-4xl font-bold">{title}</h1>
          <div className="rounded-lg bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter">
            {children}
          </div>
        </main>

        <footer className="text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 md:mb-0">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/yourusername"
                  className="hover:text-gray-300"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
                {/* Add more social media icons here */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// USE:
// import PageTemplate from '@acme/page'

// export default function HomePage() {
//   return (
//     <PageTemplate
//       title="Welcome to Our Website"
//       backgroundImage="/path-to-your-background-image.jpg"
//     >
//       <p className="text-white mb-4">This is the home page content. You can add any components or content here.</p>
//       <ul className="list-disc list-inside text-white">
//         <li>Feature 1</li>
//         <li>Feature 2</li>
//         <li>Feature 3</li>
//       </ul>
//     </PageTemplate>
//   )
// }
