import { baseUrl } from '@/context/constants'
import { DigilibIcon } from '@/components/SvgIcons'
import DigilibHelp from '@/components/DigilibHelp'

const index = ({ categories }) => (
	<div className='w-full desktop:p-4 laptop:p-4 mobile:p-2 card bg-themeColorSecondary'>
		<div className='desktop:space-y-6 laptop:space-y-6 mobile:space-y-0'>
			<div className='pr-10 mr-24 text-4xl font-bold leading-tight text-white mobile:mr-0 mobile:p-1 mobile:text-xl'>
				Hello, how can we help you?
			</div>
			{/* <div className='float-right desktop:hidden laptop:hidden bottom-6 right-6'>
				<img
					src={`${baseUrl}/digilib.gif`}
					alt='Digilib Welcome Image'
					className='object-contain mobile:h-20 mobile:w-20 mobile:mx-0'
					height={120}
					width={120}
				/>
			</div> */}
			<div className='mr-28 mobile:p-1 mobile:mr-0'>
				<p className='py-2 text-xl leading-tight text-white mobile:text-sm mobile:py-0'>
					Tell us what you are looking for in the search bar below, select a
					category <br /> and we will find what your looking for or select a
					folder below.
				</p>
			</div>
		</div>
		{/* <div className='absolute bottom-3 right-3 mobile:hidden'>
			<img
				src={`${baseUrl}/digilib.gif`}
				alt='Digilib Welcome Image'
				className='object-contain'
				height={120}
				width={120}
			/>
		</div> */}
	</div>
)

export default index
