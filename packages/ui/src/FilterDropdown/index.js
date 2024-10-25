import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

export default function FilterDropdown({
  filterName = "Filter",
  filters = [],
  // setOption,
}) {
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
                // click={setOption(filter.name)}
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
  );
}
