import Image from "next/image";

import { Button } from "../button";
import { Card, CardContent } from "../card";

export interface BannerProps {
  title: string;
  paragraphs: string[];
  gifSrc: string;
  gifAlt: string;
  ctaText: string;
  onCtaClick: () => void;
}

export function Banner({
  title,
  paragraphs,
  gifSrc,
  gifAlt,
  ctaText,
  onCtaClick,
}: BannerProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 md:p-8">
            <h2 className="mb-4 text-3xl font-bold">{title}</h2>
            <div className="mb-6 space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-600 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
            <Button onClick={onCtaClick}>{ctaText}</Button>
          </div>
          <div className="relative min-h-[200px] flex-1 md:min-h-[300px]">
            <Image src={gifSrc} alt={gifAlt} layout="fill" objectFit="cover" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
