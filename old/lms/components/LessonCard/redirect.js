import { baseUrl, mainUrl } from '@/context/constants'

const Redirect = () => {
	return (
		<div className='flex justify-center items-center'>
			<div className='desktop:my-10 laptop:my-10 mobile:my-5 desktop:w-1/2 laptop:w-1/2 mobile:w-11/12 mobile:p-3 desktop:p-0 laptop:p-0'>
				<div className='justify-items-center'>
					<div className='items-center desktop:px-20 laptop:px-20 desktop:py-8 laptop:py-8 mobile:p-4 bg-compBg rounded-3xl '>
						<div className='my-3 font-bold text-center desktop:text-4xl text-textColor laptop:text-4xl mobile:text-2xl'>
							You need an active subscription to access all lessons, quizzes and
							additional materials on the platform.
						</div>
						{/* <div className='my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl'>
							Your subscription will unlock all the lessons, quizzes and
							additional materials available on our platform.
						</div> */}
						<div className='w-full mt-3 mb-3 text-center text-textColor mobile:text-xs'>
							<div className='flex justify-center desktop:mx-4 laptop:mx-4'>
								Click the button below to subscribe and enjoy our full range of
								educational resources.
							</div>
						</div>
						<div className='flex justify-center'>
							<div className='desktop:w-1/3 laptop:w-1/3 py-3 mobile:w-2/3'>
								<a href={`${mainUrl}/auth/subscribe?from=${baseUrl}`}>
									<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'>
										Subscribe
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Redirect
