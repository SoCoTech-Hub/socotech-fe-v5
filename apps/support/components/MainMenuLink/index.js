import { baseUrl } from '@/context/constants'
import { useRouter } from 'next/router'
// import { useAppContext } from "@/context/AppContext"
// import { PrimaryColor } from "@/context/constants"

const MainMenuLink = ({
	icon,
	color = '',
	title = 'Item',
	link = null,
	description,
	doWhat,
	badgeCount,
	// iconColor,
	textColor,
	mobile,
	dataTour
}) => {
	// const { state } = useAppContext()
	const router = useRouter()
	const pathname = router.pathname
	const url =
		pathname == '/'
			? process.env.NEXT_PUBLIC_BASE_URL
			: process.env.NEXT_PUBLIC_BASE_URL + pathname

	const Icon = () => icon
	return (
		<div
			id='text-decoration'
			className={`hover:shadow-md rounded-lg w-full cursor-pointer`}
			data-tour={dataTour}
		>
			<a
				onClick={doWhat}
				href={link}
			>
				<div
					className={`flex items-center mobile:pb-2 justify-between mobile:bg-compBg mobile:px-3 rounded-lg w-full mt-2 align-middle ${
						link == url ? `${color}` : ''
					}`}
				>
					{mobile ? (
						<div className='flex flex-wrap items-center px-3'>
							<div
								className={` mobile:w-12 mobile:h-12 p-2 rounded-lg ${color}`}
							>
								<div
									className='mx-auto my-auto '
									// style={{ color: iconColor }}
								>
									<Icon />
								</div>
							</div>
							<div className=''>
								<div
									className={`${link == url ? textColor : 'text-textColor'}`}
								>
									{title}
								</div>
							</div>
						</div>
					) : (
						<div className='flex align-middle align-items-center group'>
							<div
								className={`desktop:w-12 desktop:h-12 laptop:h-10 laptop:w-10 mobile:w-12 mobile:h-12 p-0.5 group-hover:bg-themeColorMain rounded-full ${color}`}
							>
								<div className=''>
									<Icon />
								</div>
							</div>
							<div className='ml-2 item'>
								<div
									className={`${textColor} text-sm group-hover:underline-offset-2 group-hover:decoration-themeColorMain group-hover:decoration-solid`}
								>
									{title}
								</div>
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
							className='flex items-center justify-center w-8 h-8 font-bold text-black align-middle rounded-lg bg-themeColorMain'
							// style={{
							//   backgroundColor:
							//     PrimaryColor
							// }}
						>
							{badgeCount}
						</div>
					) : (
						''
					)}
				</div>
			</a>
		</div>
	)
}

export default MainMenuLink
