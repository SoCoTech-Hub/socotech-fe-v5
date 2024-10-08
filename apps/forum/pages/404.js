import { useRouter } from 'next/router'
import Image from 'next/image'
import { baseUrl } from '@/context/constants'

export default function Custom404() {
	const router = useRouter()
	return (
		<>
			<div className='col row'>
				<div className='space-y-10 gx-5 gy-4'>
					<div className='grid justify-items-center'>
						<div className='font-bold text-themeColorMain error-font'>404</div>
						<div className='font-bold text-textColor '>
							Oops! This page does not exist
						</div>
						<div className='mt-3 mb-3'>
							<a
								onClick={() => router.push('/')}
								className='w-64 py-2 font-bold text-center text-black rounded-full cursor-pointer d-inline-block bg-themeColorMain '
							>
								Back to Home
							</a>
						</div>
						<div className='flex justify-center w-full'>
							<Image
								src={`${baseUrl}/page404.png`}
								alt='Error 404'
								width={1005}
								height={494}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
