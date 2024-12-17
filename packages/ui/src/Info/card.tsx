import { Info } from "lucide-react";

import { Card } from "../card";

export interface Info {
  id: string;
  title: string;
  imageUrl?: string;
}

const InfoCard = ({ info }: { info: Info }) => (
  <Card className="overflow-hidden">
    <a href={`/infos/${info.id}`}>
      <div className="relative aspect-video">
        {info.imageUrl ? (
          <img
            src={info.imageUrl}
            alt={`Cover for ${info.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <Info className="h-full w-full object-cover" />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">
            {info.title}
          </h3>
        </div>
      </div>
    </a>
  </Card>
);
export default InfoCard;
