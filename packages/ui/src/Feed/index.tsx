import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../card";

interface FeedItem {
  id: string;
  image: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
}

interface FeedProps {
  items: FeedItem[];
}

export default function Feed({ items }: FeedProps) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative h-48 w-full sm:h-64">
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <CardHeader>
            <h2 className="text-2xl font-bold">{item.title}</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={item.author.avatar} alt={item.author.name} />
                <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{item.author.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(item.date, { addSuffix: true })}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
