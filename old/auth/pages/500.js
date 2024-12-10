import { useRouter } from 'next/router'
import { baseUrl } from '@/context/constants'

export default function Custom500() {
	const router = useRouter()
	return (
		<>
			{/* <img
        src={`${baseUrl}/logo.png`}
        alt='Logo'
        className='logo-overlay desktop:h-24 laptop:h-20 mobile:h-12'
      /> */}
			<div className='flex flex-col items-center justify-center h-screen px-2 space-y-10'>
				<div className='grid justify-items-center'>
					<div className='flex flex-col items-center justify-center'>
						<div className='font-bold error-font text-themeColorSecondary'>
							500
						</div>
						<img
							src={`${baseUrl}/500.png`}
							alt='Error 500'
							className='w-full max-w-xs'
						/>
					</div>
					<div className='font-bold text-textColor '>
						Oops! Something went wrong, we are working on it and will be back
						soon.
					</div>
					<div className='my-4'>
						<a
							onClick={() => router.push('/')}
							className='w-64 py-2 font-bold text-center text-white rounded-full cursor-pointer d-inline-block bg-themeColorMain'
						>
							Back to Home
						</a>
					</div>
				</div>
			</div>
		</>
	)
}
