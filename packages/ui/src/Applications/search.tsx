// import { baseUrl, organizationId } from '@/context/constants'
// import { StyledMenu, StyledMenuItem } from './styles'
// import { useState } from 'react'
// import getGQLRequest from '@/snippets/getGQLRequest'

// const index = ({ setQualifications }) => {
// 	const [anchorEl, setAnchorEl] = useState(null)
// 	const [filter, setFilter] = useState('Filter')
// 	const [search, setSearch] = useState('')
// 	const [filterList] = useState([
// 		{
// 			id: '1',
// 			name: 'Degree',
// 			field: 'degree'
// 		},
// 		{
// 			id: '2',
// 			name: 'Faculty',
// 			field: 'institution'
// 		},
// 		{
// 			id: '3',
// 			name: 'Requirements',
// 			field: 'requirements'
// 		},
// 		{
// 			id: '4',
// 			name: 'Subjects',
// 			field: 'subjects'
// 		},
// 		{
// 			id: '5',
// 			name: 'Title',
// 			field: 'name'
// 		}
// 	])
// 	const searchQuery = async ({ searchValue }) => {
// 		filter == 'Filter'
// 			? setSearch(
// 					`name_contains:"${searchValue}",organization:{id:${organizationId}}`
// 			  )
// 			: filter === 'Subjects'
// 			? setSearch(searchValue)
// 			: setSearch(
// 					filterList.filter((x) => x.name === filter)[0].field +
// 						`_contains:"${searchValue}",organization:{id:${organizationId}}`
// 			  )
// 	}
// 	const searchResult = async () => {
// 		if (filter === 'Subjects') {
// 			const { subjects } = await getGQLRequest({
// 				endpoint: `subjects`,
// 				fields: `id`,
// 				where: `name_contains: "${search}",organization:{id:${organizationId}}`
// 			})
// 			await getGQLRequest({
// 				endpoint: `qualifications`,
// 				stateSetter: setQualifications,
// 				where: `subjects:{id:[${subjects.map(
// 					(x) => x.id
// 				)}]},organization:{id:${organizationId}}`,
// 				fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`
// 			})
// 		} else {
// 			await getGQLRequest({
// 				endpoint: `qualifications`,
// 				stateSetter: setQualifications,
// 				where: search,
// 				fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`
// 			})
// 		}
// 	}
// 	return (
// 		<div className='flex flex-row justify-between px-2 mt-4 bg-compBg rounded-lg align-items-center'>
// 			<div className=''>
// 				<button
// 					className='h-8 rounded-full text-textColor bg-digilibWelcomeButton w-36'
// 					onClick={(e) => setAnchorEl(e.currentTarget)}
// 				>
// 					{filter}
// 				</button>
// 				<StyledMenu
// 					id='customized-menu'
// 					anchorEl={anchorEl}
// 					keepMounted
// 					open={Boolean(anchorEl)}
// 					onClose={() => setAnchorEl(null)}
// 				>
// 					{filterList.length ? (
// 						filterList?.map((filter) => {
// 							return (
// 								<div key={filter.id}>
// 									<StyledMenuItem>
// 										<div className='flex justify-between'>
// 											<button
// 												className='mt-2 item'
// 												onClick={() => {
// 													setFilter(filter.name), setAnchorEl(null)
// 												}}
// 											>
// 												{filter.name}
// 											</button>
// 										</div>
// 									</StyledMenuItem>
// 								</div>
// 							)
// 						})
// 					) : (
// 						<StyledMenuItem>
// 							<div className='flex justify-between'>Coming Soon</div>
// 						</StyledMenuItem>
// 					)}
// 				</StyledMenu>
// 			</div>
// 			<div className='w-full ml-2 col-xs-4'>
// 				<input
// 					className='h-10 border-0 shadow-none form-control'
// 					type='text'
// 					placeholder='Start typing to search...'
// 					onChange={(e) => searchQuery({ searchValue: e.target.value })}
// 				/>
// 			</div>
// 			<div className='-mb-1.5'>
// 				<button onClick={searchResult}>
// 					<div className='w-8 h-8 p-1 rounded-full bg-digilibWelcomeButton'>
// 						<img
// 							src={`${baseUrl}/search_icon.svg`}
// 							alt='Search Icon'
// 						/>
// 					</div>
// 				</button>
// 			</div>
// 		</div>
// 	)
// }
// export default index
// TODO:data fetch

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { baseUrl, organizationId } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Input } from "../input";

interface SearchFilterProps {
  setQualifications: React.Dispatch<React.SetStateAction<any[]>>;
}

interface FilterItem {
  id: string;
  name: string;
  field: string;
}

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

  const searchQuery = async (searchValue: string) => {
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
    if (filter === "Subjects") {
      const { subjects } = await getGQLRequest({
        endpoint: `subjects`,
        fields: `id`,
        where: `name_contains: "${search}",organization:{id:${organizationId}}`,
      });
      await getGQLRequest({
        endpoint: `qualifications`,
        stateSetter: setQualifications,
        where: `subjects:{id:[${subjects.map((x: { id: string }) => x.id)}]},organization:{id:${organizationId}}`,
        fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`,
      });
    } else {
      await getGQLRequest({
        endpoint: `qualifications`,
        stateSetter: setQualifications,
        where: search,
        fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`,
      });
    }
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
        <Image
          src={`${baseUrl}/search_icon.svg`}
          alt="Search Icon"
          width={24}
          height={24}
        />
      </Button>
    </div>
  );
};

export default SearchFilter;
