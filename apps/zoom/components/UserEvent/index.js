import { mainUrl } from '@/context/constants'

const index = ({ img, imgAlt, month, day, title, description, href }) => {
	return (
		<div className='flex flex-wrap gap-3 p-3 mb-3 bg-compBg rounded-2xl w-72 justify-evenly shadow-menu'>
			<div>
				<img
					src={`${img}`}
					alt={imgAlt}
					className='w-full rounded'
				/>
			</div>
			<div className='flex flex-row justify-between '>
				<div className='px-3 py-2 mr-4 space-x-0 bg-compBg border-gray-200 rounded-lg border-1'>
					<div className='text-xs text-center text-textColor uppercase'>
						{month}
					</div>
					<div className='text-xl font-bold text-center'>{day}</div>
				</div>
				<div>
					<div className='font-bold leading-tight'>{title}</div>
					<div className='pt-1 text-xs text-textColor'>{description}</div>
				</div>
			</div>
			<a href={`${mainUrl}/lms/${href}`}>
				<div className='w-full text-center text-textColor rounded cursor-pointer event-button h-7 text-xxs'>
					<div className='pt-2 text-center'>VIEW EVENT</div>
				</div>
			</a>
		</div>
	)
}

export default index
