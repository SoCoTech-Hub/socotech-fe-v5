// import { useAppContext } from "@/context/AppContext"
// import { PrimaryColor } from "@/context/constants"

const MainMenuButton = ({
	icon,
	color = '',
	title = 'Item',
	description,
	doWhat,
	badgeCount,
	// iconColor,
	textColor,
	mobile
}) => {
	// const { state } = useAppContext()
	return (
		<div
			className='w-full rounded-lg cursor-pointer hover:shadow-md'
			onClick={doWhat}
		>
			<div className='flex items-center justify-between w-full mt-2 align-middle '>
				{mobile ? (
					<div className='flex flex-wrap items-center px-3'>
						<div className={` mobile:w-12 mobile:h-12 p-2 rounded-lg ${color}`}>
							<div
								className='mx-auto my-auto text-themeColorMain'
								// style={{ color: iconColor }}
							>
								{icon}
							</div>
						</div>
						<div className=''>
							<div className={`text-textColor  ${textColor}`}>{title}</div>
						</div>
					</div>
				) : (
					<div className='flex align-middle align-items-center'>
						<div
							className={`desktop:w-12 desktop:h-12 laptop:h-10 laptop:w-10 mobile:w-12 mobile:h-12 p-2 rounded-lg ${color}`}
						>
							<div
								className='mx-auto my-auto text-themeColorMain'
								// style={{ color: iconColor }}
							>
								{icon}
							</div>
						</div>
						<div className='ml-2 item'>
							<div className={`text-textColor ${textColor}`}>{title}</div>
							{description ? (
								<div className={`paragraph text-textColor ${textColor}`}>
									{description}
								</div>
							) : (
								''
							)}
						</div>
					</div>
				)}

				{badgeCount ? (
					<div
						className='flex items-center justify-center w-8 h-8 font-bold align-middle rounded-lg text-textColor bg-themeColorMain'
						// style={{
						//   backgroundColor:
						//     PrimaryColor,
						// }}
					>
						{badgeCount}
					</div>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default MainMenuButton