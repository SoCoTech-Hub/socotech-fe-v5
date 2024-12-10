import Head from 'next/head'
import Link from 'next/link'

const Cancel = () => (
	<>
		<Head>
			<title>Redirect</title>
			<meta
				name='description'
				content='redirecting you'
			/>
		</Head>
		<img
			src={`/logo.png`}
			alt='Logo'
			className='logo-overlay desktop:h-24 laptop:h-20 mobile:h-12'
		/>
		<div className='flex items-center w-full h-screen place-content-center'>
			<div className='w-2/3'>
				<div className='flex flex-wrap justify-center w-full'>
					<div className='w-full py-2 font-bold text-center break-words text-mainColor404 desktop:text-8xl mobile:text-5xl'>
						Payment Failed
					</div>
					<div className='flex justify-center py-2 mt-3 mb-3'>
						<Link href='./create'>
							<div className='w-64 py-2 font-bold text-center rounded-full cursor-pointer text-textColor d-inline-block bg-themeColorMain'>
								Try Again
							</div>
						</Link>
					</div>
				</div>
				<div className='flex justify-center'>
					<img
						src={`/page404.png`}
						alt='Redirecting'
						className='w-5/6 desktop:py-0'
					/>
				</div>
			</div>
		</div>
	</>
)
export default Cancel
