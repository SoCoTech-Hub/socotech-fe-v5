const index = ({ title, description, image }) => (
	<div
		className='w-full desktop:p-4 laptop:p-4 mobile:p-2 card'
		style={{ background: '#81cc71' }}
	>
		<div className='desktop:space-y-6 laptop:space-y-6 mobile:space-y-0'>
			<div className='pr-10 mr-24 text-4xl font-bold leading-tight text-black mobile:mr-0 mobile:p-1 mobile:text-xl'>
				{title}
			</div>
			<div className='w-3/4 mr-28 mobile:p-1 mobile:mr-0 w-3/4 mobile:w-4/5 mobile:w-4/5'>
				<p className='py-2 text-xl leading-tight text-black mobile:text-sm mobile:py-0'>
					{description}
				</p>
			</div>
		</div>
		<div className='absolute px-5 -mt-4 right-4 mobile:hidden'>{image}</div>
		<div className='absolute mobile:w-20 mobile:h-30 mobile:right-2 desktop:hidden laptop:hidden mobile:visible mobile:px-2'>
			{image}
		</div>
	</div>
)

export default index