// import { useState, useEffect } from 'react'
// import { Autocomplete, TextField } from '@mui/material'
// import { withStyles } from '@mui/styles'

// const WhiteTextField = withStyles({
// 	root: {
// 		'& .MuiInput-underline:before': {
// 			borderBottomColor: '#fff8'
// 		},
// 		'& .MuiInput-underline:hover:before': {
// 			display: 'none'
// 		},
// 		'& .MuiInput-underline:after': {
// 			display: 'none'
// 		}
// 	}
// })(TextField)

// export default function AddressSelect({
// 	options,
// 	id,
// 	name,
// 	className = 'font-bold style2-input form-control text-textColor',
// 	valueSetter,
// 	placeholder = '',
// 	isSearchField = false,
// 	required = true,
// 	value = null,
// 	valueKey = 'id'
// }) {
// 	const [autocompleteValue, setAutocompleteValue] = useState(null)

// 	useEffect(() => {
// 		if (!options.length || !value) {
// 			setAutocompleteValue(null)
// 		}

// 		if (options.length && value) {
// 			// if (typeof value === "number") {
// 			const selectedOption = options.filter(
// 				(option) => parseInt(option.id) === parseInt(value)
// 			)
// 			setAutocompleteValue(selectedOption ? selectedOption[0] : '' || value)
// 			// } else {
// 			//   setAutocompleteValue(value)
// 			// }
// 		}
// 	}, [options.length, value])

// 	const onChange = (_, newValue) => {
// 		if (newValue) {
// 			if (isSearchField) {
// 				valueSetter(name, newValue[valueKey])
// 			} else {
// 				if (newValue?.uniqueId) {
// 					valueSetter(newValue.uniqueId)
// 				} else {
// 					valueSetter(newValue[valueKey])
// 				}
// 			}
// 			setAutocompleteValue(newValue)
// 		} else {
// 			if (isSearchField) {
// 				valueSetter(name, '')
// 			} else {
// 				valueSetter('')
// 			}

// 			setAutocompleteValue(null)
// 		}
// 		return
// 	}
// 	return (
// 		<div className='font-bold'>
// 			<Autocomplete
// 				value={autocompleteValue}
// 				className={className}
// 				onChange={onChange}
// 				options={options}
// 				getOptionLabel={(option) =>
// 					option.name ||
// 					`${option?.firstName} ${option?.lastName} [${option?.uniqueId}]`
// 				}
// 				autoComplete={false}
// 				disabled={!options.length}
// 				renderInput={(params) => (
// 					<div className='pt-1.5'>
// 						<WhiteTextField
// 							className=''
// 							variant='standard'
// 							{...params}
// 							inputProps={{
// 								...params.inputProps,
// 								name,
// 								id,
// 								required,
// 								placeholder,
// 								autoComplete: 'off',
// 								disableunderline: 'true'
// 							}}
// 						/>
// 					</div>
// 				)}
// 			/>
// 		</div>
// 	)
// }
// TODO:data fetch

"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface Address {
  id: string;
  fullAddress: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressSelectProps {
  addresses: Address[];
  onAddressChange: (address: Address | null) => void;
  onNewAddress: (address: Omit<Address, "id">) => void;
}

export function AddressSelect({
  addresses,
  onAddressChange,
  onNewAddress,
}: AddressSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    fullAddress: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    const selectedAddress = addresses.find(
      (address) => address.id === currentValue,
    );
    onAddressChange(selectedAddress ?? null);
  };

  const handleNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewAddress(newAddress);
    setNewAddress({
      fullAddress: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? addresses.find((address) => address.id === value)?.fullAddress
            : "Select an address..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search address..." />
          <CommandEmpty>No address found.</CommandEmpty>
          <CommandGroup heading="Saved Addresses">
            {addresses.map((address) => (
              <CommandItem
                key={address.id}
                onSelect={() => handleSelect(address.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === address.id ? "opacity-100" : "opacity-0",
                  )}
                />
                {address.fullAddress}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Add New Address">
            <form onSubmit={handleNewAddressSubmit} className="space-y-2 p-4">
              <Input
                placeholder="Street"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                required
              />
              <Input
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                required
              />
              <div className="flex space-x-2">
                <Input
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Zip Code"
                  value={newAddress.zipCode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Address
              </Button>
            </form>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
