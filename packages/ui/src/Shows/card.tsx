import { Card } from "../card";

export interface Show {
  id: string;
  title: string;
  imageUrl: string;
}

export const ShowCard = ({ show }: { show: Show }) => (
  <Card className="overflow-hidden">
    <a href={`/shows/${show.id}`}>
      <div className="relative aspect-video">
        <img
          src={show.imageUrl}
          alt={`Cover for ${show.title}`}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {show.title}
          </h3>
        </div>
      </div>
    </a>
  </Card>
);

