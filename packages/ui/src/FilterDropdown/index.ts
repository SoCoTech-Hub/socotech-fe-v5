import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import NativeSelect from "@mui/material/NativeSelect"

interface Filter {
  id: string
  display: string
}

interface FilterDropdownProps {
  filterName?: string
  filters?: Filter[]
  // setOption?: (option: string) => void // Uncomment this if setOption is needed
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filterName = "Filter",
  filters = [],
  // setOption,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {filterName}
        </InputLabel>
        <NativeSelect>
          {filters.length ? (
            filters.map((filter) => (
              <option
                key={filter.id}
                // value={filter.name}
                // click={() => setOption && setOption(filter.name)} // Uncomment this if setOption is needed
              >
                {filter.display}
              </option>
            ))
          ) : (
            <option>No Filters Available</option>
          )}
        </NativeSelect>
      </FormControl>
    </Box>
  )
}

export default FilterDropdown
