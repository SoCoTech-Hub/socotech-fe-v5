const MobileMenuButton = ({
	icon,
	color = '',
	title = 'Item',
	link,
	doWhat,
	iconColor,
	textColor
}) => {
	return (
		<div className='cursor-pointer '>
			<a
				onClick={doWhat}
				href={link}
			>
				<div className='flex items-center h-20 -mx-1 align-middle'>
					<div className='flex flex-wrap w-24 px-0.5 my-2'>
						<div className='flex w-full justify-content-center'>
							<div className={`w-10 h-10 p-2 rounded-full ${color}`}>
								<div
									className=''
									style={{ color: iconColor }}
								>
									{icon}
								</div>
							</div>
						</div>
						<div className='flex w-full justify-content-center'>
							<div
								className={`font-bold text-xs  mt-1 text-center ${textColor}`}
							>
								{title}
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	)
}

export default MobileMenuButton
