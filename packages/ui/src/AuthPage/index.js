import AuthNavbar from '@/components/AuthNavbar'

const AuthPage = ({
	bgImage,
	bgColor,
	bgSize,
	leftTitle,
	content,
	contentBgColor,
	hasNavbar,
	customNavbar
}) => {
	return (
		<>
			{hasNavbar ? (
				customNavbar ? (
					customNavbar
				) : (
					<div
						className='fixed w-full'
						style={{
							zIndex: '999'
						}}
					>
						<AuthNavbar />
					</div>
				)
			) : (
				<></>
			)}
			<div
				className='flex desktop:flex-row laptop:flex-row mobile:flex-col w-full h-screen'
				style={{ zIndex: '1' }}
			>
				<div
					style={{
						backgroundImage: `${bgImage ? `url(${bgImage})` : 'none'}`,
						backgroundRepeat: 'no-repeat',
						backgroundColor: `${bgColor ? bgColor : 'inherit'}`,
						backgroundPosition: 'center',
						backgroundSize: `${bgSize ? bgSize : 'cover'}`,
						height: '110vh',
						userSelect: 'none',
						msUserSelect: 'none',
						MozUserSelect: 'none',
						WebkitUserSelect: 'none'
					}}
					className='w-1/2 h-auto mobile:hidden flex justify-center items-center'
				>
					{leftTitle ? leftTitle : <></>}
				</div>
				<div
					className='w-1/2 h-auto mobile:w-full flex justify-center items-start overflow-y-scroll'
					style={{
						backgroundColor: `${contentBgColor ? contentBgColor : 'inherit'}`
					}}
				>
					{content ? content : <></>}
				</div>
			</div>
		</>
	)
}

export default AuthPage
