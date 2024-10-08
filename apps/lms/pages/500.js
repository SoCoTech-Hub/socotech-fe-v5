import { useRouter } from 'next/router'

export default function Custom500() {
	const router = useRouter()
		return (
			<>
				{/* <img
				src={`${baseUrl}/logo.png`}
				alt='Logo'
				className='logo-overlay desktop:h-24 laptop:h-20 mobile:h-12'
			/> */}

				<div className='space-y-10'>
					<div className='grid justify-items-center'>
						<div className='font-bold error-font text-themeColorMain'>500</div>
						<div className='font-bold text-textColor '>
							Oops! Something went wrong, we are working on it and will be back
							soon.
						</div>
						<div className='my-4'>
							<a
								onClick={() => router.back()}
								className='w-64 py-2 font-bold text-center text-black rounded-full cursor-pointer d-inline-block bg-themeColorMain'
							>
								Back to Home
							</a>
						</div>
						<div className='flex justify-center w-full h-48 mb-4'>
							<img
								src={`${baseUrl}/page500.png`}
								alt='Error 500'
							/>
						</div>
					</div>
				</div>
			</>
		)
}
