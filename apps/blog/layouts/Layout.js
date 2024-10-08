import { useState } from 'react'
import { MainNavbar } from '@/components/MainNavbar'
import MainMenu from '@/components/MainMenu'
import SupportMenu from '@/components/SupportMenu'
import LiveLessonMenu from '@/components/LiveLessonMenu'
import BackToTop from '@/components/BackToTop'
import Modal from '@/components/Modal'
import { Support } from '@/components/Support'
import { useAppContext } from '@/context/AppContext'
import LessonProgressMenu from '@/components/LessonProgressMenu'
import {
	AppBg
	// PrimaryColor,
} from '@/context/constants'
import { MobileNavbar } from '@/components/MobileNavbar'
import SocialLinksMenu from '@/components/SocialLinksMenu'

const Layout = ({ children }) => {
	const { state } = useAppContext()
	const [open, setOpen] = useState(false)
	const currentDate = new Date().toISOString()
	const calendarEndDate = new Date(Date.now() + 86400000 * 7).toISOString()
	const notificationDate = new Date(Date.now() - 86400000).toISOString()

	return (
		<>
			<div
				className={`overflow-hidden appFullHeight row g-0 no-scrolly pb-5  ${AppBg}`}
			>
				<MainNavbar
					currentDate={currentDate}
					calendarEndDate={calendarEndDate}
					notificationDate={notificationDate}
					open={open}
					setOpen={setOpen}
				/>
				<div className='flex'>
					<div
						className='w-2/12 gap-2 px-3 pt-1 mb-12 space-y-2 overflow-scroll border-r-2 appSideBarHeight no-scrolly mobile:hidden desktop:block border-themeColorMain'
						// style={{
						//   borderRightColor:
						// PrimaryColor,
						// }}
					>
						<MainMenu />
						<SupportMenu
							open={open}
							setOpen={setOpen}
						/>
						<SocialLinksMenu />
						<div className='space-y-2 desktop:hidden laptop:hidden '>
							{/* <LiveLessonMenu /> */}
							<LessonProgressMenu />
						</div>
						<div className='h-16'></div>
					</div>
					<div
						className='overflow-scroll desktop:w-8/12 laptop:w-8/12 mobile:w-full mobile:mx-1 desktop:mx-8 laptop:mx-8 justify-evenly h-content no-scrolly'
						id='container'
					>
						<main className='main'>
							<div
								className=''
								id='scrollplz'
							>
								{children}
								<Modal
									open={open}
									setOpen={setOpen}
								>
									<Support
										setShowModal={setOpen}
										showModal={open}
									/>
								</Modal>
								<BackToTop />
							</div>
						</main>
					</div>
					<div className='w-2/12 h-full pt-1 pl-0 pr-3 space-y-2 mobile:hidden desktop:block'>
						<div
							className=''
							data-tour='liveLesson'
						>
							{/* <LiveLessonMenu /> */}
						</div>
						<LessonProgressMenu />
					</div>
				</div>
				<div className='desktop:hidden laptop:hidden'>
					<MobileNavbar />
				</div>
			</div>
		</>
	)
}

export default Layout
