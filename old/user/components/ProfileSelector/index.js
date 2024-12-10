import Typography from '@mui/material/Typography'
import { NoSsr } from '@mui/material'
import ProfileAbout from '@/components/ProfileAbout'
import ProfileInfo from '@/components/ProfileInfo'
import { useStyles } from './styles'
import ProfileReport from '../ProfileReport'

export default function ProfileSelector({ user, value }) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<div className={classes.demo2}>
				<NoSsr>
					<Typography className={classes.padding} />
					{value == 0 ? (
						<div className='row'>
							<ProfileAbout />
						</div>
					) : value == 1 ? (
						<div className='row'>
							<ProfileInfo user={user} />
						</div>
					) : value == 2 ? (
						<div className='row'>
							<ProfileReport />
						</div>
					) : (
						<></>
					)}
				</NoSsr>
			</div>
		</div>
	)
}
