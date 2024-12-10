import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import UserCover from '@/components/UserCover'
import LessonCard from '@/components/LessonCard'
import LessonSelector from '@/components/LessonSelector'
import LessonList from '@/components/LessonList'
import getGQLRequest from '@/snippets/getGQLRequest'
import { profileId } from '@/context/constants'

const Home = ({ subjectCategories }) => {
	const [subjectCategory, setSubjectCategory] = useState(1)
	const [completedProgress, setCompletedProgress] = useState([])
	const [subjectId, setSubject] = useState(null)

	useEffect(async () => {
		setCompletedProgress([])
		if (profileId) {
			if (subjectId && subjectCategory) {
				await getGQLRequest({
					endpoint: `progresses`,
					stateSetter: setCompletedProgress,
					where: `subject:{id:${subjectId}},lesson:{subjectCategory:{id:${subjectCategory}}}profile:{id:${profileId}},isComplete:true`,
					fields: `id,lesson{id,subject{name},name,duration,featuredImage{id,url}},subject{id,name}`
				})
			}
		}
	}, [subjectId, subjectCategory])

	const seo = {
		title: 'Topic - LMS Home Page',
		description: 'Lesson has been completed!',
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<div className='mb-3 col row'>
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

			<div className='w-full px-3 pt-2'>
				<div className='pt-3 pl-3 pr-3 mb-4 rounded-lg bg-compBg shadow-menu '>
					<UserCover />
					<LessonSelector
						subjectCategories={subjectCategories}
						setSubjectCategory={setSubjectCategory}
						subjectCategory={subjectCategory}
					/>
				</div>
				<div className='flex flex-row row'>
					<div className='desktop:w-4/12 laptop:w-4/12 mobile:w-full'>
						{subjectCategory && (
							<div className=' row'>
								<div className='w-full '>
									<LessonList
										subjectCategory={subjectCategories[subjectCategory - 1]}
										setSubject={setSubject}
									/>
								</div>
							</div>
						)}
					</div>
					<div className='desktop:w-8/12 laptop:w-8/12 mobile:w-full mobile:mt-6 desktop:mt-0 '>
						{completedProgress.length ? (
							<div className='grid gap-2 desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1 place-items-stretch'>
								{completedProgress.map((progress) => {
									return (
										<div key={progress.id}>
											<LessonCard
												imageUrl={progress.lesson?.featuredImage?.url}
												subject={progress.lesson?.subject?.name}
												lessonTitle={progress.lesson?.name}
												duration={progress.lesson?.duration}
												link={`/${parseInt(progress.lesson.id)}`}
											/>
										</div>
									)
								})}
							</div>
						) : (
							<LessonCard
								lessonTitle='Choose a subject on the left'
								subject='to view the completed lessons'
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	const { subjectCategories } = await getGQLRequest({
		endpoint: `subjectCategories`,
		fields: `id,name,subjects{id,name}`
	})

	return {
		props: { subjectCategories: subjectCategories }
	}
}

export default Home
