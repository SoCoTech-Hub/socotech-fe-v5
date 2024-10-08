import { withStyles } from '@mui/styles'
import { LinearProgress, Rating } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

// export const BorderLinearProgress = withStyles(() => ({
//   root: {
//     height: 10,
//     borderRadius: 5,
//     marginLeft: "8px",
//     marginTop: "2px",
//   },
//   colorPrimary: {
//     backgroundColor: "#fff",
//   },
//   bar: {
//     borderRadius: 5,
//     backgroundColor: "#63D480",
//   },
// }))(LinearProgress)

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === 'light' ? '#63D480' : '#63D480'
	}
}))

export const StyledRating = withStyles({
	iconFilled: {
		color: '#FCEE21'
	},
	iconEmpty: {
		color: '#fef'
	},
	iconHover: {
		color: '#FCcc00'
	}
})(Rating)

export const BorderLinearProgressView = styled(LinearProgress)(({ theme }) => ({
	height: 6,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: '#D6F379'
	}
}))
