import { baseUrl } from '@/context/constants'
const index = ({
	icon = 'coming_soon.jpg',
	background = '',
	svgIcon = '',
	title = 'Title Here',
	imgAlt = title,
	description,
	bgColor,
	id,
	link = ''
}) => {
	return (
		<a href={`${baseUrl}/${link}/${id}`}>
			<div
				className={`bg-compBg cursor-pointer rounded-lg  shadow-menu   h-full w-full`}
			>
				<div
					className={`flex rounded-lg rounded-t-lg place-self-center ${
						bgColor ? bgColor : 'bg-white'
					}`}
					style={{
						backgroundImage: background ? `url(${background})` : '',
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
					) : (
						icon && (
							<img
								alt={imgAlt}
								src={icon?.url}
								className='object-cover w-24 h-24 mx-auto my-4'
							/>
						)
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
