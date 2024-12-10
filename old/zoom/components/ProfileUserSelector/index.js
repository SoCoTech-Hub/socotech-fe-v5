import ProfileUserCover from '@/components/ProfileUserCover'
import { StyledTab, StyledTabs, useStyles } from './styles'

const index = ({ value, handleChange }) => {
	const classes = useStyles()

	return (
		<div className='pt-3 pl-3 pr-3 mb-4 -m-3 bg-compBg rounded-lg shadow-menu'>
			<ProfileUserCover edit='true' />
			<div className='mt-4 mb-2 ml-2 mr-2'>
				<hr className='bg-compBg' />
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
			</StyledTabs>
		</div>
	)
}

export default index
