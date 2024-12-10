import encodeSVG from '@/snippets/encodeSvg'

const Card = ({
	title,
	setItem,
	id,
	color = '#dd00ee',
	icon,
	svgIcon,
	alignment = false
}) => {
	return (
		<div
			className='w-full'
			id={id}
			value={id}
			onClick={() => setItem(id)}
		>
			<div
				className={`h-auto overflow-hidden rounded-lg cursor-pointer bg-cover bg-center bg-compBg shadow-menu ${color} relative`}
				style={{
					backgroundColor: color,
					backgroundImage: icon
						? `url(${icon})`
						: svgIcon
						? encodeSVG(svgIcon)
						: 'none'
				}}
			>
				{alignment ? (
					<div className='flex flex-wrap justify-between desktop:p-3 laptop:p-3 mobile:p-1 relative'>
						<div className='w-full text-2xl  font-bold leading-tight text-black mobile:text-sm desktop:h-36 laptop:h-32 mobile:h-20 flex flex-col justify-end items-center'>
							{title}
						</div>
					</div>
				) : (
					<div className='flex flex-wrap justify-between desktop:p-3 laptop:p-3 mobile:p-1'>
						<div className='w-full text-base font-bold leading-tight text-black mobile:text-sm desktop:h-28 laptop:h-28 mobile:h-20'>
							{title}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Card
