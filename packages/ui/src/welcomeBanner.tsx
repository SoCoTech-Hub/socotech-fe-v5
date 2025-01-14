import { Button } from "./button";

interface WelcomeBannerProps {
  title: string;
  subheading: string;
  buttonText?: string;
  onClick?: () => void;
  backgroundClass: string;
  gifSrc?: string;
  gifAlt?: string;
  className?: string;
}

export function WelcomeBanner({
  title,
  subheading,
  buttonText,
  onClick,
  backgroundClass,
  gifSrc,
  gifAlt = "Welcome animation",
  className,
}: WelcomeBannerProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg p-6 md:p-8 ${backgroundClass} ${className}`}
      aria-labelledby="welcome-banner-title"
      aria-describedby="welcome-banner-subheading"
    >
      <div className="max-w-2xl">
        <h2
          id="welcome-banner-title"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {title}
        </h2>
        <p
          id="welcome-banner-subheading"
          className="mt-2 text-lg text-white/90"
        >
          {subheading}
        </p>
        {buttonText && (
          <Button
            onClick={onClick}
            className="mt-4 bg-white text-black hover:bg-gray-100"
          >
            {buttonText}
          </Button>
        )}
      </div>
      {gifSrc && (
        <div className="absolute right-0 top-0 hidden h-full w-1/3 md:block md:w-1/4">
          <div className="relative h-full w-full">
            <img
              src={gifSrc}
              alt={gifAlt}
              className="animate-pulse object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
