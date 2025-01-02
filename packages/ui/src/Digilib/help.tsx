import { useState } from "react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Input } from "../input";
import { Skeleton } from "../skeleton";

export interface DigilibHelpCategory {
  id: string;
  name: string;
}

export interface DigilibHelpProps {
  categories: DigilibHelpCategory[];
  onSearch: (query: string) => void;
  loading?: boolean;
}

const DigilibHelp: React.FC<DigilibHelpProps> = ({
  categories,
  onSearch,
  loading = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Category");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    const category = categories.find((cat) => cat.name === selectedCategory);
    const query = category
      ? `category=${category.id}&name_contains=${searchQuery}`
      : `name_contains=${searchQuery}`;
    onSearch(query);
  };

  if (loading) {
    return <Skeleton className="h-12 w-full rounded-lg bg-gray-700" />;
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-md">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-36">
            {selectedCategory}
          </Button>
        </DropdownMenuTrigger>
        <div className="absolute z-10 mt-2 rounded-lg shadow-lg">
          {categories.length > 0 ? (
            categories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>Coming Soon</DropdownMenuItem>
          )}
        </div>
      </DropdownMenu>

      <Input
        type="text"
        placeholder="Start typing to search..."
        onChange={handleSearchChange}
        className="mx-4 w-full"
      />

      <Button
        onClick={handleSearchSubmit}
        className="bg-primary p-2 text-primaryForeground"
      >
        <img src="/search_icon.svg" alt="Search Icon" className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default DigilibHelp;
