import Link from 'next/link'
import styles from '@/styles/Index.module.css'
import { baseUrl } from '@/context/constants'
import Head from 'next/head'
import { useEffect } from 'react'
import logoutMain from '@/snippets/logoutMain'
import LogoOverlay from '@/components/LogoOverlay'

export default function verified() {
	useEffect(() => {
		logoutMain()
	}, [])

	return (
		<>
			<Head>
				<title>Logout</title>
				<meta
					name='description'
					content='Logout Page'
				/>
			</Head>
			<div className='w-full'>
				<div className='justify-items-center'>
					{/* <div className='h-48 '>
								<img
									src={`${baseUrl}/auth-img.png`}
									alt='Logout Image'
								/>
							</div> */}
					<div className='overflow-scroll desktop:h-screen laptop:h-screen no-scrolly mobile:h-screen'>
						{/* <div className='mobile:mb-10'><LogoOverlay /></div> */}
						<div
							className='flex items-center justify-center'
							style={{
								backgroundImage: `url(${baseUrl}/confirm-img.png)`,
								height: '100%',
								width: '100%',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center'
							}}
						>
							<div className='desktop:my-10 laptop:my-10 mobile:my-5 desktop:w-1/2 laptop:w-1/2 mobile:w-11/12 mobile:p-3 desktop:p-0 laptop:p-0'>
								<div className='justify-items-center'>
									<div className='mobile:w-full desktop:w-1/2 laptop:w-1/2 mobile:mt-3 desktop:mt-0 laptop:mt-0'>
										{/* <img
									src={`${baseUrl}/confirm-img.png`}
									alt='Confirmation Image'
								/> */}
									</div>
									<div className='items-center desktop:px-20 laptop:px-20 desktop:py-8 laptop:py-8 mobile:p-4 bg-compBg rounded-3xl '>
										<div className='my-3 font-bold text-center desktop:text-4xl text-textColor laptop:text-4xl mobile:text-2xl'>
											We're sad to see you go.
										</div>
										<div className='my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl'>
											You have successfully been logged out.
										</div>
										<div className='w-full mt-3 mb-3 text-center text-textColor mobile:text-xs'>
											<div className='flex justify-center desktop:mx-4 laptop:mx-4'>
												Please log in by clicking the button below.
											</div>
										</div>
										<div className='flex justify-center'>
											<div className='w-1/3 py-3'>
												<Link
													href='/'
													passHref
												>
													<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'>
														Log in
													</div>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
