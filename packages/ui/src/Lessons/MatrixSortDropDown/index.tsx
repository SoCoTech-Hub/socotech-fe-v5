"use client";

import React, { useCallback, useState } from "react";

import { Button } from "../../button";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";

interface Item {
  id: string;
  content: string;
}

interface Category {
  id: string;
  name: string;
}

interface MatrixSortDropdownProps {
  items: Item[];
  categories: Category[];
  onComplete: (result: Record<string, string[]>) => void;
}

export const MatrixSortDropdown: React.FC<MatrixSortDropdownProps> = ({
  items,
  categories,
  onComplete,
}) => {
  const [sortedItems, setSortedItems] = useState<Record<string, string>>({});

  // Callback to handle sorting items into categories
  const handleSort = useCallback((itemId: string, categoryId: string) => {
    setSortedItems((prev) => ({
      ...prev,
      [itemId]: categoryId,
    }));
  }, []);

  // Callback to complete the sorting process and return results
  const handleComplete = useCallback(() => {
    const result = categories.reduce(
      (acc, category) => {
        acc[category.id] = Object.entries(sortedItems)
          .filter(([_, catId]) => catId === category.id)
          .map(([itemId]) => itemId);
        return acc;
      },
      {} as Record<string, string[]>,
    );

    onComplete(result);
  }, [categories, sortedItems, onComplete]);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Sort Items into Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start gap-2 sm:flex-row sm:items-center"
            >
              <div className="w-full text-sm font-medium sm:w-1/2">
                {item.content}
              </div>
              <Select
                value={sortedItems[item.id] ?? ""}
                onValueChange={(value) => handleSort(item.id, value)}
              >
                <SelectTrigger className="w-full sm:w-1/2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button onClick={handleComplete} className="mt-6 w-full">
          Complete Sorting
        </Button>
      </CardContent>
    </Card>
  );
};

export default MatrixSortDropdown;
