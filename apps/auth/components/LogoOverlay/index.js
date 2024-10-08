import { baseUrl } from '@/context/constants'

const LogoOverlay = () => {
	return (
		<div className=''>
			<img
				src={`${baseUrl}/logo.png`}
				alt='Logo'
				className='desktop:h-16 desktop:mb-10 laptop:h-14 mobile:h-8'
			/>
		</div>
	)
}

export default LogoOverlay
