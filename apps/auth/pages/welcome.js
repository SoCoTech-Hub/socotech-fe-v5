import { useEffect, useState } from 'react'
import Head from 'next/head'
import LogoOverlay from '@/components/LogoOverlay'
import Link from 'next/link'
import { baseUrl } from '@/context/constants'

const Index = () => {
	const [deferredPrompt, setDeferredPrompt] = useState(null)
	useEffect(() => {
		window.addEventListener('beforeinstallprompt', (event) => {
			// Prevent Chrome 76 and later from automatically showing the prompt
			event.preventDefault()

			// Store the event so it can be triggered later
			setDeferredPrompt(event)
		})
	}, [])

	return (
		<>
			<Head>
				<title>Welcome</title>
				<meta
					name='description'
					content='We need to know who you are'
				/>
			</Head>

			<div className='flex flex-wrap g-0'>
				<div
					className='w-1/2 mobile:w-full mobile:h-1/3'
					style={{ position: 'relative' }}
				>
					<div
						className='desktop:hidden laptop:hidden mobile:visible'
						style={{ position: 'absolute', top: '10px', left: '10px' }}
					>
						<LogoOverlay />
					</div>
					<div className='flex w-full items-left desktop:h-screen laptop:h-screen mobile:place-content-center mobile:bg-themeColorMain '>
						<img
							src={`${baseUrl}/welcome.png`}
							alt='Welcome Image'
							className='desktop:hidden laptop:hidden mobile:py-10 mobile:w-60'
						/>
						<img
							src={`${baseUrl}/topic-login.png`}
							alt='Welcome Image'
							className='object-left mobile:hidden'
						/>
					</div>
				</div>
				<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3'>
					<div className='flex items-center w-full desktop:h-screen laptop:h-screen place-content-center'>
						<div className='my-10 desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5'>
							{deferredPrompt && (
								<div className='flex justify-center py-2 mt-3 mb-3'>
									<button
										id='install-button'
										className='mt-3 text-xs text-textColor'
										onClick={() => {
											if (deferredPrompt) {
												deferredPrompt.prompt()
												deferredPrompt.userChoice.then((choiceResult) => {
													if (choiceResult.outcome === 'accepted') {
														console.log('User accepted the A2HS prompt')
													} else {
														console.log('User dismissed the A2HS prompt')
													}
													// Clear the prompt event so it can't be triggered again
													setDeferredPrompt(null)
												})
											}
										}}
									>
										<div className='w-64 py-2 font-bold text-center text-black rounded-full cursor-pointer d-inline-block bg-themeColorMain'>
											Install App
										</div>
									</button>
								</div>
							)}
							<h6 className='mt-3 text-xs text-center text-textColor'>
								Ready to <span className='text-themeColorMain'>login?</span>
							</h6>
							<div className='flex justify-center py-2 mt-3 mb-3'>
								<Link href='/'>
									<span className='w-64 py-2 font-bold text-center text-black rounded-full cursor-pointer d-inline-block bg-themeColorMain '>
										Login
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Index
