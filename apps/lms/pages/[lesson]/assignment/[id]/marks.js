import Head from 'next/head'
import getDataRequest from '@/snippets/getDataRequest'
import AccordionSection from '@/components/Accordion/AccordionSection'
import { Reply } from '@mui/icons-material'
import UploadThumbnail from '@/components/UploadThumbnail'

const Marks = ({ reply }) => {
	const seo = {
		title: 'Topic - Assignment Not Found',
		description: 'No Assignments were found!',
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	if (!reply?.grade) {
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
							<div className='font-bold text-themeColorMain error-font'>
								404
							</div>
							<div className='font-bold text-center text-textColor'>
								Oops! This Assignment is not completed yet.
							</div>
							<div className='mt-3 mb-3'>
								<a
									onClick={() => router.back()}
									className='w-64 py-2 font-bold text-center text-black rounded-full cursor-pointer d-inline-block bg-themeColorMain '
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
	const { isCompleted, assignment, grade, RubiconMark } = reply
	const date = new Date(assignment.updated_at)
	const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} : ${date.getHours()}: ${date.getMinutes()}`

	return (
		<>
			{isCompleted || grade ? (
				grade ? (
					<>
						<Head>
							<title>View Marks</title>
							<meta
								property='og:title'
								content='View Marks'
								key='title'
							/>
						</Head>
						<div className='p-3 border-none rounded-lg card'>
							<div className='px-8 text-2xl font-bold text-textColor'>
								{assignment.title}
							</div>
							<div className='px-8 text-sm text-textColor'>{dateString}</div>
							<hr className='border-8 border-white'></hr>
							<div className='px-8 pb-2 text-normal mobile:text-base'>
								{assignment.question}
							</div>
						</div>
						<div className='pt-4'>
							{RubiconMark.map((mark, i) => (
								<div key={i}>
									<AccordionSection
										topic={mark.topic}
										criteria={mark.criteria}
										remarks={mark.remarks}
										score={mark.score}
									/>
								</div>
							))}
							<div
								className='p-3 border-none rounded-lg card'
								dangerouslySetInnerHTML={{ __html: reply.feedback }}
							/>
							<div className='p-3 mt-2 border-none rounded-lg card'>
								{assignment?.attachment ? (
									<>
										<b>Marked Assignment:</b>
										<UploadThumbnail files={reply.attachmentReply} />
									</>
								) : (
									<></>
								)}
							</div>
							<div
								className='pt-4 pl-12 text-lg font-semibold'
								id='grade'
							>
								Total score: {grade}%
							</div>
						</div>
					</>
				) : (
					<>
						<Head>
							<title>Assignment Not Marked</title>
							<meta
								property='og:title'
								content='Assignment Not Found'
								key='title'
							/>
						</Head>
						<div className='col row'>
							<div className='space-y-10 gx-5 gy-4'>
								<div className='grid justify-items-center'>
									<div className='text-xl font-bold text-themeColorMain'>
										Check back soon
									</div>
									<div className='font-bold text-textColor heading justify-items-center'>
										This assignment was not marked yet
									</div>
									<div className='mt-3 mb-3'>
										<a
											onClick={() => router.back()}
											className='w-64 py-2 font-bold text-center rounded-full cursor-pointer text-textColor d-inline-block bg-themeColorMain'
										>
											Back to Home
										</a>
									</div>
									<div className='flex justify-center w-full'>
										<img
											src='/lms/confirm-img.png'
											alt='Error 404'
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				)
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
					<div className='col row'>
						<div className='space-y-10 gx-5 gy-4'>
							<div className='grid justify-items-center'>
								<div className='font-bold text-mainColor404 error-font'>
									404
								</div>
								<div className='font-bold text-textColor heading '>
									Oops! This Assignment is not completed yet.
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
			)}
		</>
	)
}

export async function getServerSideProps(context) {
	const userId = context.req.cookies['userid']
	const { id, lesson } = context.query
	let replyData = await getDataRequest(
		`/assignment-replies?lesson=${lesson}&assignment=${id}&students=${userId}`,
		() => {}
	)
	if (!replyData.length) {
		replyData = [
			{
				isCompleted: false,
				assignment: [],
				grade: 0,
				RubiconMark: []
			}
		]
	}

	return {
		props: {
			reply: replyData?.length ? replyData[0] : null
		}
	}
}

export default Marks
