import { baseUrl } from '@/context/constants'

const index = () => {
	return (
		<div className='w-full p-4 card mobile:p-1 mobile:mb-5 bg-themeColorMain'>
			<div className='space-y-6'>
				<div className='pr-10 mr-24 text-4xl font-bold leading-tight text-black mobile:mr-0 mobile:p-1 mobile:text-xl'>
					Indulge in blog brilliance that'll have you hooked from the first
					sentence.
				</div>
				<div className='float-right mt-6 desktop:hidden laptop:hidden'>
					<img
						src={`${baseUrl}/blog_welcome.gif`}
						alt='Blog Welcome Image'
						className='object-contain mx-2'
						height={120}
						width={120}
					/>
				</div>

				<div className='w-3/4  mr-28 mobile:p-1 mobile:mr-0 mobile:w-4/5'>
					<p className='py-2 text-xl font-normal leading-tight text-black mobile:text-sm'>
						A whirlwind of wisdom, and wild adventures. It's the ultimate brain
						buffet, serving up captivating stories and mind-blowing insights.
					</p>
				</div>
			</div>
			<div className='absolute bottom-20 right-10 mobile:hidden'>
				<img
					src={`${baseUrl}/blog_welcome.gif`}
					alt='Blog Welcome Image'
					className='object-contain mx-2'
					height={120}
					width={120}
				/>
			</div>
		</div>
	)
}

export default index
