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

			<div className='col bg-compBg text-textColor'>
				<LogoOverlay />
				<div className={styles.container}>
					<div className='desktop:w-1/2 mobile:w-11/12 '>
						<div className='grid justify-items-center'>
							{/* <div className='w-3/5'>
								<img
									src={`${baseUrl}/auth-img.png`}
									alt='Logout Image'
								/>
							</div> */}
							<div className='my-3 text-2xl text-center mobile:w-2/3'>
								Your account is active on another device or internet browser.
							</div>
							<div className='w-3/4 mt-4 mb-3 text-xl text-center'>
								You have been logged out.
								<br />
								To log back in on this device, click on the button below.
							</div>

							<div className='w-1/3 mt-4'>
								<Link href='/'>
									<a className='py-3 -mt-2 text-center text-black cursor-pointer auth-button bg-themeColorMain'>
										Log In
									</a>
								</Link>
							</div>
							<div className='w-3/4 mt-4 mb-3 text-center'>
								You can reset your password for security reasons if you feel
								this is needed.
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
