import { Select, Chip, Input, MenuItem } from '@mui/material'
// import { Select } from "@/components/forms/selects";
// import OutlinedInput from "@mui/material/OutlinedInput";

const MultiUsers = ({ label, name, updatefield, value = [], list = [] }) => {
	const ITEM_HEIGHT = 48
	const ITEM_PADDING_TOP = 8
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
				// width: 310,
			}
		}
	}

	const handelSelected = (event) => {
		updatefield(
			value.concat(event.target.value).reduce((arr, it) => {
				if (arr.findIndex((v) => v.id === it.id) === -1) {
					arr.push(it)
				}
				return arr
			}, [])
		)
	}

	const handleRemoved = (item) => {
		updatefield(value.filter((p) => p.id !== item))
	}

	return (
		<>
			<div className='flex mb-2 form-label'>
				<div className='pt-2 mr-4 text-textColor'>{label}</div>
				<div className='flex w-1/2'>
					<Select
						multiple
						className='font-bold style2-input form-control text-textColor'
						value={value}
						placeholder={label}
						id={`${name}-multiple-chip`}
						input={<Input id='select-multiple-chip' />}
						onChange={handelSelected}
						renderValue={() => <></>}
						MenuProps={MenuProps}
					>
						{list ? (
							list.map((option) => (
								<MenuItem
									key={option.id}
									value={option}
								>
									{option.name ||
										option.display ||
										option?.profile?.firstName +
											' ' +
											option?.profile?.lastName}
								</MenuItem>
							))
						) : (
							<></>
						)}
					</Select>
				</div>
			</div>
			<div className='flex flex-wrap gap-3'>
				{value.map((item) => (
					<Chip
						key={item.id}
						label={
							item.name ||
							item.display ||
							item.profile.firstName + ' ' + item.profile.lastName
						}
						onDelete={() => handleRemoved(item.id)}
						sx={
							{
								// marginRight: "10px",
							}
						}
					/>
				))}
			</div>
		</>
	)
}
export default MultiUsers
