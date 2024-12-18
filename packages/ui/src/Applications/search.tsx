// TODO:data fetch

"use client";

import { useState } from "react";
import { Search } from "lucide-react";

// import getGQLRequest from "@/snippets/getGQLRequest";

import { organizationId } from "@acme/snippets/constant";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Input } from "../input";

interface SearchFilterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQualifications: React.Dispatch<React.SetStateAction<any[]>>;
}

interface FilterItem {
  id: string;
  name: string;
  field: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SearchFilter: React.FC<SearchFilterProps> = ({ setQualifications }) => {
  const [filter, setFilter] = useState("Filter");
  const [search, setSearch] = useState("");
  const [filterList] = useState<FilterItem[]>([
    { id: "1", name: "Degree", field: "degree" },
    { id: "2", name: "Faculty", field: "institution" },
    { id: "3", name: "Requirements", field: "requirements" },
    { id: "4", name: "Subjects", field: "subjects" },
    { id: "5", name: "Title", field: "name" },
  ]);

  const searchQuery = (searchValue: string) => {
    if (filter === "Filter") {
      setSearch(
        `name_contains:"${searchValue}",organization:{id:${organizationId}}`,
      );
    } else if (filter === "Subjects") {
      setSearch(searchValue);
    } else {
      const selectedFilter = filterList.find((x) => x.name === filter);
      if (selectedFilter) {
        setSearch(
          `${selectedFilter.field}_contains:"${searchValue}",organization:{id:${organizationId}}`,
        );
      }
    }
  };

  const searchResult = async () => {
    //TODO: Fix this search function
    // if (filter === "Subjects") {
    //   const { subjects } = await getGQLRequest({
    //     endpoint: `subjects`,
    //     fields: `id`,
    //     where: `name_contains: "${search}",organization:{id:${organizationId}}`,
    //   });
    //   await getGQLRequest({
    //     endpoint: `qualifications`,
    //     stateSetter: setQualifications,
    //     where: `subjects:{id:[${subjects.map((x: { id: string }) => x.id)}]},organization:{id:${organizationId}}`,
    //     fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`,
    //   });
    // } else {
    //   await getGQLRequest({
    //     endpoint: `qualifications`,
    //     stateSetter: setQualifications,
    //     where: search,
    //     fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`,
    //   });
    // }
  };

  return (
    <div className="flex items-center space-x-2 rounded-lg bg-background p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{filter}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filterList.map((filterItem) => (
            <DropdownMenuItem
              key={filterItem.id}
              onSelect={() => setFilter(filterItem.name)}
            >
              {filterItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        className="flex-grow"
        type="text"
        placeholder="Start typing to search..."
        onChange={(e) => searchQuery(e.target.value)}
      />
      <Button onClick={searchResult} size="icon">
        <Search className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default SearchFilter;
