import ProfileUserCover from '@/components/ProfileUserCover'
import { StyledTab, StyledTabs, useStyles } from './styles'

const index = ({ value, handleChange }) => {
	const classes = useStyles()

	return (
		<div className='pt-3 pl-3 pr-3 mb-4 rounded-lg bg-compBg shadow-menu '>
			<ProfileUserCover edit='true' />
			<div className='mt-4 ml-2 mr-2 '>
				<hr className='pb-2 border-b-2 border-themeColorMain' />
			</div>

			<StyledTabs
				value={value}
				onChange={handleChange}
				aria-label='styled tabs example'
			>
				<StyledTab
					label='About'
					className={classes.tabs}
				/>
				<StyledTab
					label='Account Info'
					className={classes.tabs}
				/>
				<StyledTab
					label='Report'
					className={classes.tabs}
				/>
			</StyledTabs>
		</div>
	)
}

export default index
