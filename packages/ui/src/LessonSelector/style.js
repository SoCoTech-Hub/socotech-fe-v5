import { makeStyles } from '@mui/styles'
import { Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		variant='scrollable'
		scrollButtons
		TabIndicatorProps={{
			children: <span className='MuiTabs-indicatorSpan ' />
		}}
	/>
))({
	'& .MuiTabs-indicator': {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		color: '#fff'
	},
	'& .MuiTabs-indicatorSpan': {
		maxWidth: 40,
		width: '100%',
		backgroundColor: '#D6F379'
	}
})

export const StyledTab = styled((props) => (
	<Tab
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	textTransform: 'none',
	fontWeight: '400',
	fontSize: theme.typography.pxToRem(12),
	marginRight: theme.spacing(1),
	color: '#fff',

	'&.Mui-selected': {
		color: '#D6F379',
		fontWeight: 'bold'
	},
	'&.Mui-focusVisible': {
		backgroundColor: 'rgba(100, 95, 228, 0.32)'
	}
}))

export const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1
	},
	padding: {
		padding: { spacing: 3 }
	},

	demo2: {
		backgroundColor: 'none'
	},
	tabs: {
		color: 'rgba(75, 85, 99)'
	}
}))
