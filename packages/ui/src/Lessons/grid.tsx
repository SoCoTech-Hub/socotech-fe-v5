import React from "react";

import CardSkeleton from "./skeleton";

interface GridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isLoading?: boolean;
}

const Grid = <T,>({ items, renderItem, isLoading = false }: GridProps<T>) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {isLoading
      ? Array(8)
          .fill(0)
          .map((_, index) => <CardSkeleton key={index} />)
      : items.map(renderItem)}
  </div>
);

export default Grid;
