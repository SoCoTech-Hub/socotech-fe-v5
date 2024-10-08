import { baseUrl, mainUrl, orgName } from '@/context/constants'
import Head from 'next/head'
import Link from 'next/link'

const Cancel = ({ url }) => (
	<>
		<Head>
			<title>Redirect</title>
			<meta
				name='description'
				content='redirecting you'
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
										Payment Failed
									</div>
									<div className='w-full mt-4 mb-3 text-sm text-center text-themeColorSecondary'>
										Something went wrong...
									</div>
									<div className='flex justify-center gap-x-2'>
										<div className='w-1/3 py-3'>
											<Link
												href={`/subscribe?from=${url}`}
												passHref
											>
												<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'>
													Try Again
												</div>
											</Link>
										</div>
										<div className='w-1/3 py-3'>
											<a href={`${mainUrl}${url}`}>
												<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorSecondary'>
													Return to {`${orgName}`}
												</div>
											</a>
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
export async function getServerSideProps(context) {
	const url = context.req.__NEXT_INIT_QUERY?.returnTo

	return {
		props: {
			url: url
		}
	}
}

export default Cancel
