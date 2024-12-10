import Link from 'next/link'

const index = ({
	img = 'coming_soon.jpg',
	title = 'Title Here',
	imgAlt = title,
	description = 'text here',
	link
}) => (
	<Link
		href={link}
		passHref
	>
		<div className='rounded-lg cursor-pointer bg-compBg desktop:w-72 laptop:w-64 mobile:w-full shadow-menu'>
			<div className='flex place-self-center'>
				{img.startsWith('https') ? (
					<div className='mx-auto'>
						<img
							src={`${img}`}
							alt={imgAlt}
							className='object-cover my-4 w-60 h-44'
						/>
					</div>
				) : (
					<img
						src={`/digilib/${img}`}
						alt={imgAlt}
						className='object-cover w-60 h-44'
					/>
				)}
			</div>
			<div className='px-4 leading-none heading'>
				{title}
			</div>
			<div className='px-4 py-2 leading-6 body-text'>
				{description}
			</div>
		</div>
	</Link>
)

export default index
