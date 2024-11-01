import React from "react";

import { cn } from "..";
import { Badge } from "../badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

interface DigilibCategoriesProps {
  img?: string;
  title?: string;
  imgAlt?: string;
  description?: string;
  link: string;
  badge?: string;
}

const DigilibCategories: React.FC<DigilibCategoriesProps> = ({
  img = "coming_soon.jpg",
  title,
  description,
  link,
  badge,
}) => {
  return (
    <Card
      className={cn(
        "bg-compBg shadow-menu cursor-pointer rounded-lg transition-transform hover:scale-105 sm:w-full md:w-64 lg:w-72",
      )}
    >
      <a href={link}>
        <CardHeader className="flex justify-center p-4">
          <div
            className="relative h-72 w-auto rounded-t-lg bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${img})` }}
          >
            {title && (
              <div className="absolute bottom-0 w-full bg-black/60 p-2 text-center">
                <CardTitle className="text-lg font-semibold text-white">
                  {title}
                </CardTitle>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="">
          <CardDescription className="truncate">{description}</CardDescription>
        </CardContent>
        <CardFooter className="">
          {badge && <Badge variant="outline">{badge}</Badge>}
        </CardFooter>
      </a>
    </Card>
  );
};

export default DigilibCategories;
