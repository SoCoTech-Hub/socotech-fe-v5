import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Skeleton } from "../skeleton";

export const FeedCardSkeleton = () => (
  <Card className="w-full">
    <Skeleton className="w-full h-48 rounded-t-lg" />
    <CardHeader>
      <Skeleton className="w-3/4 h-6" />
    </CardHeader>
    <CardContent>
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-5/6 h-4 mb-2" />
      <Skeleton className="w-2/3 h-4" />
    </CardContent>
    <CardFooter className="flex justify-between">
      <div className="flex space-x-2">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>
      <Skeleton className="w-20 h-8" />
    </CardFooter>
  </Card>
);
