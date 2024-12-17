
import { Card } from "../card";
import { Skeleton } from "../skeleton";

const InfoCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-video w-full" />
  </Card>
);
export default InfoCardSkeleton;
