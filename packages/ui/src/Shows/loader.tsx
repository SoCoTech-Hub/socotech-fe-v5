import React from "react";

import { Card } from "../card";
import { Skeleton } from "../skeleton";

const ShowCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-video w-full" />
  </Card>
);
export default ShowCardSkeleton;
