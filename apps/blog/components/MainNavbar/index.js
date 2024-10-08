import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { Badge, IconButton, ListItemText } from '@mui/material'
import { useStyles, StyledMenu, StyledMenuItem } from './styles'
import {
	NavBellIcon,
	NavEventsIcon,
	NavOptionsIcon
} from '@/components/SvgIcons'
import logout from '@/snippets/logout'
// import getNotificationUnreadCount from '@/snippets/lms/getNotificationUnreadCount';
// import getEventCount from '@/snippets/lms/getEventCount';
import {
	AppBg,
	baseUrl,
	Logo,
	mainUrl,
	profileId,
	ProfilePic,
	Text,
	organizationId
} from '@/context/constants'
import GetUserNotificationNavBar from 'graphql/queries/GetUserNotificationNavBar'
import getGQLRequest from '@/snippets/getGQLRequest'
import RightSwipeDrawer from '@/components/RightSwipeDrawer'
import Avatar from '@/components/Avatar'

export const MainNavbar = ({
	currentDate,
	calendarEndDate
	// notificationDate
}) => {
	const router = useRouter()
	const { basePath } = router
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const [notificationCount, setNotificationCount] = useState(0)
	const [eventCount, setEventCount] = useState(0)
	const [affiliate, setAffiliate] = useState(false)
	const [open, setOpen] = useState(false)

	const { loading } = useQuery(GetUserNotificationNavBar, {
		variables: {
			profileID: profileId,
			currentDate: currentDate,
			// notificationDate: notificationDate,
			calendarEndDate: calendarEndDate
		},
		onCompleted: (data) => {
			setNotificationCount(
				data?.notificationResponsesConnection?.aggregate?.count
			)
			setEventCount(data?.eventResponsesConnection?.aggregate?.count)
		}
	})
	useEffect(async () => {
		const { affiliateSettings } = await getGQLRequest({
			endpoint: 'affiliateSettings',
			fields: 'isActive',
			where: `organization:${organizationId}`
		})
		setAffiliate(affiliateSettings[0])
	}, [])

	// useEffect(async () => {
	//   if (profileId) {
	//     setNotificationCount(
	//       await getNotificationUnreadCount({
	//         profileId
	//       })
	//     );
	//     setEventCount(await getEventCount({ profileId }));
	//   }
	// }, [profileId]);

	return (
		<>
			<nav
				className={`w-full mobile:h-20 h-24  shadow-md navbar navbar-light justify-content-between z-50 bg-navbarBg ${AppBg} ${Text}`}
			>
				<div className='flex flex-row align-items-center'>
					<div className='pl-6 mobile:pl-4'>
						<a
							href={
								basePath == '/user'
									? '/user/userdashboard'
									: `${mainUrl}/user/userdashboard`
							}
							aria-label='home'
						>
							<img
								src={Logo}
								alt=''
								className='h-14 mobile:h-8'
								data-tracking-action='Click on Topic Logo'
							/>
						</a>
					</div>
				</div>
				<div className='flex flex-row ml-auto mr-4 space-x-4 align-middle mobile:mr-2 mobile:space-x-1.5 align-items-center'>
					<div
						className='desktop:px-3 laptop:px-3'
						data-tour='notifications'
					>
						<IconButton
							aria-label='notifications'
							href={
								basePath == '/support'
									? '/support/notifications'
									: `${mainUrl}/support/notifications`
							}
							className={classes.margin}
							size='small'
						>
							{!loading && notificationCount > 0 ? (
								<Badge
									variant='dot'
									color='error'
								>
									<NavBellIcon className='w-8 mobile:w-6 text-themeColorMain' />
								</Badge>
							) : (
								<>
									<NavBellIcon className='w-8 mobile:w-6 text-themeColorMain' />
								</>
							)}
						</IconButton>
					</div>
					<div
						className='desktop:px-3 laptop:px-3'
						data-tour='events'
					>
						<IconButton
							aria-label='events'
							href={
								basePath == '/user'
									? `${baseUrl}/events`
									: `${mainUrl}/user/events`
							}
							className={classes.margin}
							size='small'
						>
							{!loading && eventCount > 0 ? (
								<Badge
									variant='dot'
									color='error'
								>
									<NavEventsIcon className='w-8 mobile:w-6 text-themeColorMain' />
								</Badge>
							) : (
								<>
									<NavEventsIcon className='w-8 mobile:w-6 text-themeColorMain' />
								</>
							)}
						</IconButton>
					</div>
					<div
						className='cursor-pointer desktop:px-3 laptop:px-3'
						data-tour='options'
					>
						<NavOptionsIcon
							className='w-8 mobile:w-6 text-themeColorMain'
							onClick={(e) => setAnchorEl(e.currentTarget)}
						/>
						<StyledMenu
							id='customized-menu'
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={() => setAnchorEl(null)}
						>
							<div className='ml-4 text-2xl'>Settings</div>

							{affiliate?.isActive && (
								<StyledMenuItem>
									<div className='my-2'>
										<a
											href={
												basePath == '/user'
													? '/user/affiliate'
													: `${mainUrl}/user/affiliate`
											}
										>
											<ListItemText primary='Affiliate Program' />
										</a>
									</div>
								</StyledMenuItem>
							)}
							<StyledMenuItem>
								<div className='my-2'>
									<button onClick={logout}>
										<ListItemText primary='Logout' />
									</button>
								</div>
							</StyledMenuItem>
							<div className='py-1'>
								<hr />
							</div>
							<StyledMenuItem>
								<div className='my-2'>
									<a
										href={`${mainUrl}/auth/tou`}
										rel='noreferrer'
									>
										<ListItemText primary='Terms of Use' />
									</a>
								</div>
							</StyledMenuItem>
							<StyledMenuItem>
								<div className='my-2'>
									<a
										href={`${mainUrl}/auth/safeguard`}
										rel='noreferrer'
									>
										<ListItemText primary='Safeguard Policy' />
									</a>
								</div>
							</StyledMenuItem>
							<StyledMenuItem>
								<div className='my-2'>
									<a
										href={`${mainUrl}/auth/copyright`}
										rel='noreferrer'
									>
										<ListItemText primary='Copyright' />
									</a>
								</div>
							</StyledMenuItem>
							<StyledMenuItem>
								<div className='my-2'>
									<a
										href={`${mainUrl}/auth/privacy`}
										rel='noreferrer'
									>
										<ListItemText primary='Privacy' />
									</a>
								</div>
							</StyledMenuItem>
							<StyledMenuItem>
								<div className='my-2'>
									<a
										href={`${mainUrl}/auth/payment`}
										rel='noreferrer'
									>
										<ListItemText primary='Payment' />
									</a>
								</div>
							</StyledMenuItem>

							<StyledMenuItem>
								<div className='my-2'>
									<a
										rel='noreferrer'
										href={
											basePath == '/user'
												? '/user/accountSettings'
												: `${mainUrl}/user/accountSettings`
										}
									>
										<ListItemText primary='Account Settings' />
									</a>
								</div>
							</StyledMenuItem>
						</StyledMenu>
					</div>
					<div className='desktop:hidden laptop:hidden'>
						<RightSwipeDrawer
							open={open}
							setOpen={setOpen}
						/>
					</div>
					<div className='desktop:px-3 laptop:px-3'>
						<a href={basePath == '/user' ? '/user' : `${mainUrl}/user`}>
							<Avatar
								src={ProfilePic}
								border={true}
							/>
						</a>
					</div>
				</div>
			</nav>
		</>
	)
}
