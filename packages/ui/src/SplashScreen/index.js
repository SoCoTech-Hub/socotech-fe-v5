const { baseUrl } = require('@/context/constants')

const SplashScreen = () => {
	return (
		<div
			id='splashScreen'
			className='flex items-center justify-center h-screen bg-appBg'
		>
			<img
				src={`${baseUrl}/animations/loading.gif`}
				className='w-11/12'
			/>
		</div>
	)
}
export default SplashScreen
