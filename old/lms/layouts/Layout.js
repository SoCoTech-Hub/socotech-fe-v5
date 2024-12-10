import { useState } from 'react'
import { MainNavbar } from '@/components/MainNavbar'
import MainMenu from '@/components/MainMenu'
import SupportMenu from '@/components/SupportMenu'
// import LiveLessonMenu from '@/components/LiveLessonMenu'
import BackToTop from '@/components/BackToTop'
import Modal from '@/components/Modal'
import { Support } from '@/components/Support'
import LessonProgressMenu from '@/components/LessonProgressMenu'
import { MobileNavbar } from '@/components/MobileNavbar'
import SocialLinksMenu from '@/components/SocialLinksMenu'

const Layout = ({ children }) => {
	const [open, setOpen] = useState(false)
	const currentDate = new Date().toISOString()
	const calendarEndDate = new Date(Date.now() + 86400000 * 7).toISOString()
	const notificationDate = new Date(Date.now() - 86400000).toISOString()

	return (
		<>
			<div className='overflow-hidden appFullHeight row g-0 no-scrolly bg-appBg'>
				<MainNavbar
					currentDate={currentDate}
					calendarEndDate={calendarEndDate}
					notificationDate={notificationDate}
					open={open}
					setOpen={setOpen}
				/>
				<div className='flex mobile:pb-6 mobile:bg-appBg'>
					<div
						className='w-2/12 gap-2 px-3 mt-1.5 mb-12 space-y-2 overflow-scroll border-r-2 appSideBarHeight no-scrolly mobile:hidden desktop:block border-themeColorMain'
						// style={{
						//   borderRightColor: PrimaryColor,
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
						className='overflow-scroll pt-2.5 mobile:pt-3 desktop:w-8/12 laptop:w-8/12 mobile:w-full mobile:mx-1 desktop:mx-8 laptop:mx-8 justify-evenly h-content no-scrolly'
						id='container'
					>
						<main className='mb-4 main'>
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
