import Link from 'next/link'

import { baseUrl } from '@/context/constants'
import Head from 'next/head'

export default function verified() {
	return (
		<>
			<Head>
				<title>Verified</title>
				<meta
					name='description'
					content='Verified Page'
				/>
			</Head>
			<div className='overflow-scroll desktop:h-screen laptop:h-screen no-scrolly mobile:h-screen'>
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
					<div className='desktop:my-10 laptop:my-10 mobile:my-5 desktop:w-3/4 laptop:w-3/4 mobile:w-11/12 mobile:p-3 desktop:p-0 laptop:p-0'>
						<div className='grid justify-items-center'>
							<div className='mobile:w-full desktop:w-1/2 laptop:w-1/2 mobile:mt-3 desktop:mt-0 laptop:mt-0'></div>
							<div className='items-center desktop:px-20 laptop:px-20 desktop:py-8 laptop:py-8 mobile:p-4 bg-compBg rounded-3xl '>
								<div className='my-3 font-bold text-center desktop:text-4xl text-textColor laptop:text-4xl mobile:text-2xl'>
									Thanks!
								</div>
								<div className='my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl'>
									Your email address has been validated.{' '}
								</div>
								<div className='w-full mt-3 mb-3 text-center text-textColor mobile:text-xs'>
									<div className='flex justify-center desktop:mx-4 laptop:mx-4'>
										Click on the button below to log in.
										
								</div>
								</div>

								<div className='flex justify-center'>
									<div className='w-1/2 py-3'>
										<Link href='/'>
											<a className='py-3 -mt-2 text-center text-black cursor-pointer auth-button bg-themeColorMain'>
												Log In
											</a>
										</Link>
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
