// import { useState, useEffect } from 'react'
// import DefaultSelectNew from '@/components/DefaultSelectNew'
// import Btn from '@/components/Btn'
// import getGQLRequest from '@/snippets/getGQLRequest'
// import getFilterLists from '@/snippets/user/getFilterLists'

// const index = ({
// 	qualifications,
// 	setQualifications,
// 	organizationId,
// 	faculty
// }) => {
// 	const [degrees, setDegrees] = useState([])
// 	const [degreeFilter, setDegreeFilter] = useState(null)
// 	const [degreeName, setDegreeName] = useState('')
// 	const [subjects, setSubjects] = useState([])
// 	const [subjectFilter, setSubjectFilter] = useState(null)
// 	const [initialQualifications] = useState(qualifications)

// 	useEffect(async () => {
// 		let result = await getFilterLists({
// 			initialQualifications
// 		})
// 		setSubjects(result.subjects)
// 		setDegrees(result.degrees)
// 	}, [])
// 	useEffect(async () => {
// 		if (degreeFilter) {
// 			setDegreeName(degrees.filter((x) => x.id === degreeFilter)[0].name)
// 		}
// 	}, [degreeFilter])

// 	const applyFilters = async () => {
// 		let customWhere = 'faculties:{id:' + faculty?.id + '}'
// 		if (subjectFilter) {
// 			customWhere = customWhere + `, subjects:{id:[${subjectFilter}]}`
// 		}
// 		if (degreeName) {
// 			customWhere = customWhere + `, degree_contains:"${degreeName}"`
// 		}
// 		let { qualifications } = await getGQLRequest({
// 			endpoint: `qualifications`,
// 			where: `organization:{id:${organizationId}},${customWhere}`,
// 			fields: `id,name,institution,shortDescription,university{logo{url}}`
// 		})
// 		setQualifications(qualifications)
// 	}
// 	const clearFilters = async () => {
// 		setQualifications(initialQualifications)
// 		setDegreeFilter(null)
// 		setDegreeName('')
// 		setSubjectFilter(null)
// 	}
// 	return (
// 		<div className='p-3 bg-compBg rounded-lg shadow-menu'>
// 			<div className='mb-2 text-lg text-textColor'>Filter</div>
// 			<div className='grid gap-2 place-items-stretch'>
// 				{degrees?.length > 0 && (
// 					<DefaultSelectNew
// 						placeholder='Degree'
// 						options={degrees}
// 						valueSetter={setDegreeFilter}
// 						value={degreeFilter}
// 						name='degree'
// 						id='degree'
// 					/>
// 				)}
// 				{subjects?.length > 0 && (
// 					<DefaultSelectNew
// 						placeholder='Subject'
// 						options={subjects}
// 						valueSetter={setSubjectFilter}
// 						value={subjectFilter}
// 						name='subject'
// 						id='subject'
// 					/>
// 				)}
// 			</div>
// 			<div className='flex gap-5 pt-3 pb-2 '>
// 				<div className='flex desktop:flex-wrap laptop:flex-wrap justify-end w-full mobile:justify-center'>
// 					<div>
// 						<Btn
// 							label='Clear Filters'
// 							color='bg-themeColorMain'
// 							onClickFunction={clearFilters}
// 						/>
// 					</div>
// 					<div>
// 						<Btn
// 							label='Apply Filters'
// 							color='bg-themeColorMain'
// 							onClickFunction={applyFilters}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default index
// TODO:data fetch

"use client";

import React, { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface FilterOption {
  id: string;
  label: string;
}

interface ApplicationFilterProps {
  statuses: FilterOption[];
  departments: FilterOption[];
  onFilterChange: (filters: {
    statuses: string[];
    departments: string[];
  }) => void;
}

export function ApplicationFilter({
  statuses,
  departments,
  onFilterChange,
}: ApplicationFilterProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const handleStatusChange = (statusId: string) => {
    setSelectedStatuses((current) =>
      current.includes(statusId)
        ? current.filter((id) => id !== statusId)
        : [...current, statusId],
    );
  };

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartments((current) =>
      current.includes(departmentId)
        ? current.filter((id) => id !== departmentId)
        : [...current, departmentId],
    );
  };

  const applyFilters = () => {
    onFilterChange({
      statuses: selectedStatuses,
      departments: selectedDepartments,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={statusOpen}
              className="w-[200px] justify-between"
            >
              {selectedStatuses.length > 0
                ? `${selectedStatuses.length} status${selectedStatuses.length > 1 ? "es" : ""} selected`
                : "Select statuses"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.id}
                    onSelect={() => handleStatusChange(status.id)}
                  >
                    <Checkbox
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={() => handleStatusChange(status.id)}
                    />
                    <Label className="ml-2">{status.label}</Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={departmentOpen}
              className="w-[200px] justify-between"
            >
              {selectedDepartments.length > 0
                ? `${selectedDepartments.length} department${selectedDepartments.length > 1 ? "s" : ""} selected`
                : "Select departments"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search department..." />
              <CommandEmpty>No department found.</CommandEmpty>
              <CommandGroup>
                {departments.map((department) => (
                  <CommandItem
                    key={department.id}
                    onSelect={() => handleDepartmentChange(department.id)}
                  >
                    <Checkbox
                      checked={selectedDepartments.includes(department.id)}
                      onCheckedChange={() =>
                        handleDepartmentChange(department.id)
                      }
                    />
                    <Label className="ml-2">{department.label}</Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
}
