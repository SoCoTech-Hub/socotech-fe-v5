import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress"
import { styled } from "@mui/material/styles"

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: 'black'
		// theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor:
			theme.palette.mode === 'light' ? 'rgba(214, 243, 121)' : '#63D480'
	}
}))
