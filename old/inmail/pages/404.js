import { useRouter } from 'next/router'
// import styles from "@/styles/error.module.css"
import { baseUrl } from '@/context/constants'

export default function Custom404() {
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
						<img
							src={`${baseUrl}/404.png`}
							alt='Error 404'
							className='w-full max-w-xl'
						/>
					</div>
					<div className='font-bold text-textColor '>
						Oops! This page does not exist
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
