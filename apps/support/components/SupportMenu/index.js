import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NoSsr } from '@mui/material'
import MainMenuLinkNew from '@/components/MainMenuLinkNew'
import {
	NotesIcon,
	// LogTicketIcon,
	// TicketIcon,
	WhatsAppIcon
	// NotificationIcon
} from '@/components/SvgIcons'
// import getNotificationUnreadCount from '@/snippets/lms/getNotificationUnreadCount'
import getNotesCount from '@/snippets/lms/getNotesCount'
import getTicketsCount from '@/snippets/lms/getTicketsCount'
import {
	mainUrl,
	// ComponentBg,
	profileId,
	SecondaryColor,
	Text,
	userName
} from '@/context/constants'

const SupportMenu = () => {
	const router = useRouter()
	const [ticketsCount, setTicketsCount] = useState(0)
	// const [notificationsCount, setNotificationCount] = useState(0)
	const [notesCount, setNotesCount] = useState(0)

	useEffect(async () => {
		setTicketsCount(await getTicketsCount({ profileId }))
		// setNotificationCount(await getNotificationUnreadCount({ profileId }))
		setNotesCount(await getNotesCount({ profileId }))
	})
	const { basePath, pathname } = router

	return (
		<div className='mobile:w-full'>
			<div className='p-3 text-xs rounded-lg shadow-md mobile:p-1 mobile:bg-navbarBg bg-compBg mobile:font-bold mobile:w-full'>
				<div className={`text-textColor mobile:mb-2 mobile:text-xl`}>
					Support Menu
				</div>
				<div className='flex flex-col text-xs text-textColor mobile:font-normal'>
					<NoSsr>
						{/* <MainMenuLinkNew
							title='Log Ticket'
							
							icon={
								basePath == '/support' && pathname == '/logTicket' ? (
										<LogTicketIcon  />
								) : (
									<LogTicketIcon  />
								)
							}
							iconColor={SecondaryColor}
							link={`${mainUrl}/support/logTicket?url=${baseUrl}${router.asPath}`}
							dataTour='supportIcon'
						/>
						<MainMenuLinkNew
							title='My Tickets'
							
							icon={
								basePath == '/support' && pathname == '/' ? (
									<TicketIcon />
								) : (
									<TicketIcon />
								)
							}
							iconColor={SecondaryColor}
							link={`${mainUrl}/support`}
							badgeCount={ticketsCount}
							dataTour='supportIcon'
						/>*/}
						{/* <div className='flex items-center justify-between align-middle '>
							<MainMenuLinkNew
								title='Notifications'
								
								icon={<NotificationIcon />}
								iconColor={
									SecondaryColor
								}
								link={`${mainUrl}/support/notifications`}
								badgeCount={notificationsCount}
							/>
						</div> */}
						<MainMenuLinkNew
							title='WhatsApp'
							icon={<WhatsAppIcon />}
							iconColor={SecondaryColor}
							link={`https://wa.me/27799196543?text=Hi,%20I'm%20${userName}`}
							dataTour='whatsapp'
						/>
						<MainMenuLinkNew
							title='Notes'
							activeIcon={<NotesIcon />}
							icon={
								basePath == '/support' && pathname == '/notes' ? (
									<NotesIcon />
								) : (
									<NotesIcon />
								)
							}
							iconColor={SecondaryColor}
							link={
								basePath == '/support'
									? '/support/notes'
									: `${mainUrl}/support/notes`
							}
							badgeCount={notesCount}
							dataTour='noted'
							isActive={basePath == '/support' && pathname == '/notes'}
						/>
					</NoSsr>
				</div>
			</div>
		</div>
	)
}

export default SupportMenu
