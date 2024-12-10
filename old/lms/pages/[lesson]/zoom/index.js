import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Box } from 'reflexbox'
import { NoSsr } from '@mui/material'
import getDataRequest from '@/snippets/getDataRequest'
import { baseUrl } from '@/context/constants'
import Btn from '@/components/Btn'

function ZoomLesson({ mainlesson }) {
	const {
		name,
		topic,
		description,
		presenter,
		featuredImage,
		lesson,
		startDate,
		endDate
	} = mainlesson
	const endingTime = new Date(endDate).getTime()
	const startingTime = new Date(startDate).getTime()

	const [countUp, setCountUp] = useState('')
	const [countDown, setCountDown] = useState('')

	const [remaining, setRemaining] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)

	const getTimeString = (date) => {
		const time = date.getTime()
		const days = Math.floor(
			(time % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
		)
		const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((time % (1000 * 60)) / 1000)

		return `${
			days > 0 ? `${days} day(s)` : ''
		} ${hours}h ${minutes}min ${seconds}s`
	}

	const getTimeDiff = (xTime, yTime) => new Date(xTime - yTime)

	useEffect(
		async () =>
			lesson !== null
				? setInterval(() => {
						const presentTime = Date.now()
						const overtime = getTimeDiff(presentTime, endingTime)
						const deadline = getTimeDiff(startingTime, presentTime)
						setRemaining(deadline)
						setCurrentTime(presentTime)
						setCountUp(getTimeString(overtime))
						setCountDown(getTimeString(deadline))
				  }, 1000)
				: null,
		[countUp, countDown, remaining, currentTime]
	)

	//FeatureImage
	const featureImageUrl = () => {
		if (!featuredImage) {
			return `${baseUrl}/featureimage.jpg`
		}
		return featuredImage
			? `${featuredImage.url}`
			: `${baseUrl}/featureimage.jpg`
	}

	const seo = {
		title: `Topic - ${name}`,
		description: name,
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<Box variant='container'>
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

			<NoSsr>
				<img
					src={featureImageUrl()}
					alt='Lesson Image'
					className='rounded-t-lg '
					style={{
						width: '100%',
						height: '100%'
					}}
				/>
				<div className='flex flex-col mt-5 space-y-7'>
					<div className='w-full item'>
						<div className='p-5 rounded-lg shadow-outline bg-compBg'>
							<div className='flex items-center space-x-2 align-middle'>
								<div className='item'>
									<div className='text-base font-bold'>{name}</div>
								</div>
							</div>
							<div className='flex flex-row my-3'>
								<div className='mr-2 item'>
									Lesson Topic:{' '}
									<span className='text-sm font-bold'>{topic}</span>
								</div>
								<div className='mr-2 item'>
									Presenter:{' '}
									<span className='text-sm font-bold'>{presenter}</span>
								</div>
							</div>
							<div className='w-full mb-3 item'>
								<div dangerouslySetInnerHTML={{ __html: description }}></div>
							</div>
							<div className='w-full mb-3 item'>
								{remaining > 0 ? (
									<p>
										Starting in:{' '}
										<span className='text-sm font-bold'>{countDown}</span>
									</p>
								) : (
									<>
										{currentTime < endingTime ? (
											<Btn
												label='Start Lesson'
												color='bg-themeColorSecondary'
												target={
													mainlesson.link?.startsWith('http')
														? '_blank'
														: '_self'
												}
											/>
										) : mainlesson.modules.length ? (
											<Btn
												label='View Recording'
												color='bg-themeColorMain'
												link={`/${mainlesson.id}/zoom/${mainlesson.modules[0].id}`}
											/>
										) : (
											<p className='text-sm font-bold'>
												This session has ended. Recording coming soon
											</p>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</NoSsr>
		</Box>
	)
}
export async function getServerSideProps(context) {
	const { lesson } = context.query
	const lessonDetail = await getDataRequest(`/lessons/${lesson}`, () => {})
	return {
		props: {
			mainlesson: lessonDetail
		}
	}
}

export default ZoomLesson
