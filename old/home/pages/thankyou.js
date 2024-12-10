import Link from 'next/link'
import Head from 'next/head'

export default function verified() {
	return (
		<>
			<Head>
				<title>Thank You</title>
				<meta
					name='description'
					content='Thank you for subscribing'
				/>
			</Head>
			<img
				src='.\logo.png'
				alt='Logo'
				className='logo-overlay desktop:h-24 laptop:h-20 mobile:h-12'
			/>
			<div className='flex items-center w-full h-screen place-content-center'>
				<div className='flex flex-wrap justify-center desktop:w-1/2 mobile:w-3/4'>
					<div className='flex justify-center'>
						<img
							src='.\thankyou.png'
							alt='Thank You Image'
						/>
					</div>
					<div className='w-full mt-4 mb-3 text-4xl font-bold text-center text-themeColorSecondary'>
						Thank you for Subscribing!
					</div>

					<div className='w-full mt-4 mb-3 text-sm text-center text-themeColorSecondary'>
						A receipt is on it's way to your email account
					</div>
					<div className='mt-4 desktop:w-1/3 mobile:w-3/4'>
						<Link
							href={`${process.env.NEXT_PUBLIC_AUTH_URL}`}
							passHref
						>
							<a className='py-3 -mt-2 text-center text-textColor cursor-pointer auth-button bg-themeColorSecondary'>
								Log In
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
