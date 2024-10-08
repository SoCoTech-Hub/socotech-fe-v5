import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { StyledMenu, StyledMenuItem } from './styles'

const InMailFromMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<div>
				<div
					onClick={handleClick}
					className='cursor-pointer'
				>
					<div className='flex flex-row text-xs'>
						<div className=''>To me</div>
						<div className='w-2 -mt-0.5'>
							<ArrowDropDownIcon />
						</div>
					</div>
				</div>
				<StyledMenu
					id='customized-menu'
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<StyledMenuItem>
						<div className='flex-col'>
							<div className=''>to: Me, 2 others</div>
						</div>
					</StyledMenuItem>
				</StyledMenu>
			</div>
		</div>
	)
}

export default InMailFromMenu
