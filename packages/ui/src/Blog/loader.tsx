import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Skeleton } from "../skeleton";

const BlogCardSkeleton = () => (
  <Card className="w-full">
    <Skeleton className="h-48 w-full rounded-t-lg" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
    <CardFooter className="flex justify-between">
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <Skeleton className="h-8 w-20" />
    </CardFooter>
  </Card>
);
export default BlogCardSkeleton;
