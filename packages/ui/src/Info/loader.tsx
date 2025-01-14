import { Card } from "../card";
import { Skeleton } from "../skeleton";

export const InfoCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-video w-full" />
  </Card>
);
