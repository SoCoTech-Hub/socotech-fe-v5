import { baseUrl } from '@/context/constants'

const LogoOverlay = () => {
	return (
		<div className=''>
			<img
				src={`${baseUrl}logo.png`}
				alt='Logo'
				className='absolute top-3 left-3 mobile:left-6 desktop:h-28 laptop:h-20 mobile:h-12'
			/>
		</div>
	)
}

export default LogoOverlay
