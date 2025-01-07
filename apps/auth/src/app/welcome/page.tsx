import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { SEO } from "@/components/SeoHead";

import { baseUrl } from "@acme/snippets/context/constants";

const Index: FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  return (
    <>
      <SEO title="Welcome" description="We need to know who you are" />

      <div className="desktop:flex-row laptop:flex-row mobile:flex-col flex h-screen overflow-hidden">
        {/* Left Section */}
        <div className="mobile:w-full desktop:w-1/2 laptop:w-1/2 relative h-full">
          {/* Logo Overlay for Mobile */}
          <div className="absolute left-2 top-2">
            <img
              src={`${baseUrl}/logo.png`}
              alt="Logo"
              className="desktop:h-20 laptop:h-20 mobile:h-16"
            />
          </div>

          <div className="flex h-full items-center justify-center">
            <img
              src={`${baseUrl}/brand-image.png`}
              alt="Welcome Image"
              className="mobile:w-3/4 mobile:py-10 laptop:w-auto"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="desktop:w-1/2 laptop:w-1/2 bg-compBg h-full w-full">
          <div className="mobile:py-10 flex h-full items-center justify-center">
            <div className="laptop:w-3/5 w-10/12">
              {deferredPrompt && (
                <div className="flex justify-center py-2">
                  <button
                    id="install-button"
                    className="bg-themeColorMain w-64 rounded-full py-2 text-center font-bold text-white"
                    onClick={() => {
                      if (deferredPrompt) {
                        (deferredPrompt as any).prompt();
                        (deferredPrompt as any).userChoice.then(
                          (choiceResult: any) => {
                            if (choiceResult.outcome === "accepted") {
                              console.log("User accepted the A2HS prompt");
                            } else {
                              console.log("User dismissed the A2HS prompt");
                            }
                            setDeferredPrompt(null);
                          },
                        );
                      }
                    }}
                  >
                    Install App
                  </button>
                </div>
              )}

              <h6 className="text-textColor mt-3 text-center text-xs">
                Ready to{" "}
                <span className="text-themeColorSecondary">login?</span>
              </h6>

              <div className="mb-3 mt-3 flex justify-center py-2">
                <Link href="/">
                  <span className="bg-themeColorMain w-64 cursor-pointer rounded-full py-2 text-center font-bold text-white">
                    Login
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
