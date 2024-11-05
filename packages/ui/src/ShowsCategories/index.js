import { baseUrl } from '@/context/constants'

const index = ({
	img = 'coming_soon.jpg',
	title = 'Title Here',
	imgAlt = title,
	description = 'text here',
	link,
	bgColor
}) => {
	return (
		<a href={`${baseUrl}${link}`}>
			<div
				className='object-none w-full desktop:px-4 laptop:px-4 py-2 font-bold rounded-lg cursor-pointer desktop:h-60 laptop:h-60 mobile:h-28 mobile:w-auto shadow-md p-2 mobile:overflow-y-hidden'
				style={{
					backgroundImage: `url(${
						img.startsWith('https') ? img : `/digilib/${img}`
					})`,
					backgroundSize: 'cover',
					backgroundColor: bgColor,
					backgroundPosition: 'center'
				}}
			>
				{/* <div className='desktop:grid laptop:grid content-between w-full h-40 '>
					<div className='text-2xl font-bold text-black mobile:text-xs'>{title}</div> 
					<div className='content-center text-sm font-normal text-black mobile:text-xxs mobile:pt-3'>
						{description}
					</div>
				</div> */}
			</div>
		</a>
	)
}

export default index
