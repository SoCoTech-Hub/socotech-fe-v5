"use client";

import { useRouter } from "next/router";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  console.log({ error });

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center space-y-10">
          <div className="grid justify-items-center">
            <div className="flex flex-col items-center justify-center">
              <img
                src={`/page404.gif`}
                alt="Error 404"
                className="w-full max-w-xl"
              />
            </div>
            <div className="text-textColor font-bold">
              Oops! This page does not exist
            </div>
            <div className="my-4">
              <a
                onClick={() => router.push("/")}
                className="d-inline-block bg-themeColorMain w-64 cursor-pointer rounded-full py-2 text-center font-bold text-black"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
