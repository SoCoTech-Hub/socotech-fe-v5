const WelcomeBanner = ({ heading, subHeading, icon }) => (
	<div className='p-6 rounded-lg mobile:p-2 bg-themeColorMain'>
		<div className='flex flex-row items-center'>
			<div className='flex flex-col gap-y-2 text-textColorSecondary'>
				<h1 className='text-5xl font-bold mobile:text-xl'>{heading}</h1>
				<p className='text-lg mobile:text-xs'>{subHeading}</p>
			</div>
			<div className='h-auto ml-auto w-52 mobile:w-24'>
				<img
					src={icon}
					alt='Forum Welcome Image'
					className='h-auto w-52 mobile:w-24'
				/>
			</div>
		</div>
	</div>
)
export default WelcomeBanner
