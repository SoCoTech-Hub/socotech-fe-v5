import { Tab, Tabs } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

export const StyledTab = styled((props) => (
	<Tab
		disableRipple
		{...props}
	/>
))(({ theme }) => ({
	textTransform: 'none',
	fontWeight: theme.typography.fontWeightRegular,
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

export const StyledTabs = styled((props) => (
	<Tabs
		{...props}
		TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
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
		color: '#fff'
	}
}))
