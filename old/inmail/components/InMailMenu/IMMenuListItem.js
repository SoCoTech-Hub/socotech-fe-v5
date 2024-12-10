import { useRouter } from 'next/router'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import { PrimaryColor, SecondaryColor } from '@/context/constants'

const IMMenuListItem = ({
	title,
	iconName,
	chipNumber = 0,
	onClick,
	selectedIndex,
	handleListItemClick,
	listItemValue
}) => {
	const router = useRouter()

	const handleClick = null
	return (
		<ListItemButton
			className='w-full h-12 p-1'
			selected={selectedIndex === listItemValue}
			style={{
				backgroundColor: selectedIndex === listItemValue ? '#D9DADD' : ''
			}}
			onClick={(event) => {
				handleListItemClick(event, listItemValue)
				{
					router.push({
						pathname: '/',
						query: { title }
					})
				}
			}}
		>
			{iconName ? <ListItemIcon>{iconName}</ListItemIcon> : <></>}
			<ListItemText
				primary={title}
				style={{ color: '#206969' }}
			/>
			{chipNumber ? (
				<Chip
					style={{
						color: 'black',
						borderRadius: '1em',
						backgroundColor: PrimaryColor,
						fontWeight: 'bolder'
					}}
					label={chipNumber}
					onClick={handleClick}
					size='small'
				/>
			) : (
				<></>
			)}
		</ListItemButton>
	)
}

export default IMMenuListItem
