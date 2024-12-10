import { useRouter } from 'next/router'
import Head from 'next/head'

export default function LiveLessonFull() {
	const router = useRouter()

	const seo = {
		title: 'Topic - Live Lesson Capacity Reached',
		description: 'This live lesson is at full capacity!',
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>

			<div className='col row'>
				<div className='space-y-10 gx-5 gy-4'>
					<div className='grid justify-items-center'>
						<div className='font-bold text-mainColor404 error-font'>
							Capactity Reached
						</div>
						<div className='font-bold text-textColor heading '>
							This live lesson is at full capacity
						</div>
						<div className='mt-3 mb-3'>
							<a
								onClick={() => router.back()}
								className='w-64 py-2 font-bold text-center text-black rounded-full cursor-pointer d-inline-block bg-themeColorMain'
							>
								Back to Home
							</a>
						</div>
						<div className='flex justify-center w-full'>
							<img
								src='/lms/page404.png'
								alt='Error 404'
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
