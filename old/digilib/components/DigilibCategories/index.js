import { baseUrl } from '@/context/constants'

const index = ({
	background,
	img,
	title = 'Title Here',
	imgAlt = title,
	description = 'text here',
	svgIcon = '',
	link,
	bgColor
}) => {
	return (
		<a href={`${baseUrl}${link}`}>
			<div
				className={`bg-compBg cursor-pointer rounded-lg shadow-md h-full w-full`}
			>
				<div
					className={`flex place-self-center rounded-lg bg-auth shadow-sm`}
					style={{
						backgroundImage: `url(${background})`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundColor: bgColor
					}}
				>
					{svgIcon ? (
						<div
							className='object-cover w-24 h-24 mx-auto my-4'
							dangerouslySetInnerHTML={{
								__html: svgIcon
							}}
						/>
					) : img ? (
						<img
							alt={imgAlt}
							src={img}
							className='object-cover w-auto h-32 mx-auto my-1'
						/>
					) : (
						<div className='object-cover w-24 h-24 mx-auto my-4'></div>
					)}
				</div>
				<div className='px-4 my-2 font-bold leading-none text-center text-textColor'>
					{title}
				</div>
				{/* {description && (
					<div className='px-4 py-2 leading-6 text-textColor'>
						{description}
					</div>
				)} */}
			</div>
		</a>
	)
}

export default index
