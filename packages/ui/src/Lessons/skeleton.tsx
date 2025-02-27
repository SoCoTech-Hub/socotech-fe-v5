import { Skeleton } from "../skeleton";

export const CardSkeleton: React.FC = () => (
  <div className="space-y-2">
    <Skeleton className="h-[200px] w-full" />
    <Skeleton className="h-4 w-[250px]" />
  </div>
);
