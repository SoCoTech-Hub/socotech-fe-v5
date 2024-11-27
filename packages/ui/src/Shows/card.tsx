import React from "react";

import { Card } from "../card";

export interface Show {
  id: string;
  title: string;
  imageUrl: string;
}

const ShowCard = ({ show }: { show: Show }) => (
  <Card className="overflow-hidden">
    <a href={`/shows/${show.id}`}>
      <div className="relative aspect-video">
        <img
          src={show.imageUrl}
          alt={`Cover for ${show.title}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">
            {show.title}
          </h3>
        </div>
      </div>
    </a>
  </Card>
);
export default ShowCard;
