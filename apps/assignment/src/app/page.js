import Head from 'next/head'
import getDataRequest from '@/snippets/getDataRequest'
import Btn from '@/components/Btn'

function Assignment({ module, lessonId, response }) {
	const seo = {
		title: 'Topic - Assignment Home Page',
		description: 'Here you can find multiple Assignments!',
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			{module ? (
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

					<div className='bg-compBg rounded-lg mobile:p-1.5 laptop:p-2 desktop:p-3 grid mobile:gap-1 laptop:gap-3 desktop:gap-4 mobile:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-4'>
						{module.map((item, r) => (
							<div key={r}>
								<Btn
									color='bg-themeColorMain'
									link={`/${lessonId}/assignment/${item.id}`}
									label={item?.title}
								/>
								<div className=''>
									{response.map((x) =>
										x.assignment.id == item.id ? (
											<Btn
												key={x.id}
												color='bg-themeColorSecondary'
												label={`${item?.title} marks`}
												link={`/${lessonId}/assignment/${item.id}/marks`}
											/>
										) : null
									)}
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<>
					<Head>
						<title>Assignment Not Found</title>
						<meta
							property='og:title'
							content='Assignment Not Found'
							key='title'
						/>
					</Head>
					<div className='container'>
						<div>Assignment Not Found</div>
					</div>
				</>
			)}
		</>
	)
}

export async function getServerSideProps(context) {
	const { lesson } = context.query
	const userId = context.req.cookies['userid']
	const data = await getDataRequest(
		`/lms-assignments?lessons=${lesson}`,
		() => {}
	)
	const responses = await getDataRequest(
		`/assignment-replies?lesson=${lesson}&students=${userId}`,
		() => {}
	)

	return {
		props: {
			module: data ? data : null,
			lessonId: lesson ? lesson : null,
			response: responses ? responses : null
		}
	}
}

export default Assignment
