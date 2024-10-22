import { Switch, Menu, MenuItem } from '@mui/material'
import { grey } from '@mui/material/colors'
import { makeStyles, withStyles } from '@mui/styles'
import { useAppContext } from '@/context/AppContext'
import {
	ComponentBg,
	ComponentBgHover,
	Text,
	TextHover
} from '@/context/constants'

export const useStyles = makeStyles(() => {
	// const { state } = useAppContext()
	return {
		root: {
			'& > *': {
				margin: { spacing: 1 }
			},
			display: 'flex'
		},
		margin: {
			margin: '0 0 0 0 '
		},
		extendedIcon: {
			marginRight: '0 0 0 0'
		}
		// paper: {
		//   marginRight: { spacing: 2 },
		// },
	}
})

export const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
		borderRadius: '25px',
		paddingTop: '5px',
		paddingLeft: '15px',
		paddingRight: '15px'
	}
})((props) => {
	// const { state } = useAppContext()
	return (
		<Menu
			elevation={5}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'left'
			}}
			{...props}
		/>
	)
})

export const StyledMenuItem = withStyles(() => {
	const { state } = useAppContext()
	return {
		root: {
			'&:focus': {
				backgroundColor: ComponentBg,
				'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
					color: Text
				}
			},
			'&:hover': {
				backgroundColor: ComponentBgHover,
				'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
					color: '#206969'
				}
			},
			padding: '5px',
			borderRadius: '8px'
		}
	}
})(MenuItem)

export const AntSwitch = withStyles(() => {
	const { state } = useAppContext()
	return {
		root: {
			width: 28,
			height: 16,
			padding: 0,
			display: 'flex'
		},
		thumb: {
			boxShadow:
				'0 0 12px 0 rgba(0,0,0,0.08), 0 0 8px 0 rgba(0,0,0,0.12), 0 0 4px 0 rgba(0,0,0,0.38)'
		},
		switchBase: {
			padding: 2,
			color: '#FFF',

			'& + $track': {
				opacity: 1,
				backgroundColor: ComponentBg
				// borderColor: theme.palette.primary.main,
			},
			'&$checked': {
				transform: 'translateX(12px)',
				color: Text,
				'& + $track': {
					opacity: 1,
					backgroundColor: ComponentBg
					// borderColor: theme.palette.primary.main,
				}
			}
		},
		thumb: {
			width: 12,
			height: 12,
			boxShadow: 'none'
		},
		track: {
			border: `1px solid ${grey[500]}`,
			borderRadius: 16 / 2,
			opacity: 1,
			backgroundColor: ComponentBg
		},
		checked: {}
	}
})(Switch)
