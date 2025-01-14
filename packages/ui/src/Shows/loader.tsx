import { Card } from "../card";
import { Skeleton } from "../skeleton";

export const ShowCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="w-full aspect-video" />
  </Card>
);

