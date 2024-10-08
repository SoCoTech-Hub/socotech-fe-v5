import { useRouter } from 'next/router'
import Image from 'next/image'
import { baseUrl } from '@/context/constants'

export default function Custom500() {
	const router = useRouter()
	return (
		<>
			<div className='col row'>
				<div className='space-y-10 gx-5 gy-4'>
					<div className='grid justify-items-center'>
						<div className='font-bold error-font text-mainColor404'>500</div>
						<div className='font-bold text-textColor'>
							Oops! Something went wrong, we are working on it and will be back
							soon.
						</div>
						<div className='mt-3 mb-5'>
							<a
								onClick={() => router.back()}
								className='w-64 py-2 font-bold text-center rounded-full cursor-pointer text-textColor d-inline-block bg-themeColorMain btnAnim'
							>
								Back to Home
							</a>
						</div>
						<div className='flex justify-center w-full'>
							<Image
								src={`${baseUrl}/page500.png`}
								alt='Error 500'
								width={502}
								height={474}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
