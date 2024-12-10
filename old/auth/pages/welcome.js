import { useEffect, useState } from 'react'
import LogoOverlay from '@/components/LogoOverlay'
import Link from 'next/link'
import { baseUrl } from '@/context/constants'
import { SEO } from '@/components/SeoHead'

const Index = () => {
	const [deferredPrompt, setDeferredPrompt] = useState(null)

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', (event) => {
			event.preventDefault()
			setDeferredPrompt(event)
		})
	}, [])

	return (
		<>
			<SEO
				title='Welcome'
				description='We need to know who you are'
			/>

			<div className='flex desktop:flex-row laptop:flex-row mobile:flex-col h-screen overflow-hidden'>
				{/* Left Section */}
				<div className='relative mobile:w-full desktop:w-1/2 laptop:w-1/2 h-full'>
					{/* Logo Overlay for Mobile */}
					<div className='absolute top-2 left-2'>
						<LogoOverlay />
					</div>

					<div className='flex items-center justify-center h-full'>
						<img
							src={`${baseUrl}/brand-image.png`}
							alt='Welcome Image'
							className='mobile:w-3/4 mobile:py-10 laptop:w-auto'
						/>
					</div>
				</div>

				{/* Right Section */}
				<div className='w-full desktop:w-1/2 laptop:w-1/2 bg-compBg h-full'>
					<div className='flex items-center justify-center h-full mobile:py-10'>
						<div className='w-10/12 laptop:w-3/5'>
							{deferredPrompt && (
								<div className='flex justify-center py-2'>
									<button
										id='install-button'
										className='w-64 py-2 font-bold text-center text-white rounded-full bg-themeColorMain'
										onClick={() => {
											if (deferredPrompt) {
												deferredPrompt.prompt()
												deferredPrompt.userChoice.then((choiceResult) => {
													if (choiceResult.outcome === 'accepted') {
														console.log('User accepted the A2HS prompt')
													} else {
														console.log('User dismissed the A2HS prompt')
													}
													setDeferredPrompt(null)
												})
											}
										}}
									>
										Install App
									</button>
								</div>
							)}

							<h6 className='mt-3 text-xs text-center text-textColor'>
								Ready to{' '}
								<span className='text-themeColorSecondary'>login?</span>
							</h6>

							<div className='flex justify-center py-2 mt-3 mb-3'>
								<Link href='/'>
									<span className='w-64 py-2 font-bold text-center text-white rounded-full cursor-pointer bg-themeColorMain'>
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
