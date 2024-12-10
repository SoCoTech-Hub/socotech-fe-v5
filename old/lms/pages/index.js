import { useEffect, useState } from 'react'
import Head from 'next/head'
import UserCover from '@/components/UserCover'
import LessonCard from '@/components/LessonCard'
import DigilibLoad from '@/components/DigilibLoad'
import LessonSelector from '@/components/LessonSelector'
import LessonList from '@/components/LessonList'
import getGQLRequest from '@/snippets/getGQLRequest'
import { isPaying } from '@/context/constants'

const Home = ({ subjectCategories, organizationId }) => {
	const [subjectCategory, setSubjectCategory] = useState(5)
	const [subjectCategoryList, setSubjectCategoryList] = useState([])
	const [lessons, setLessons] = useState([])
	const [subjectId, setSubject] = useState(null)
	const date = new Date().toISOString()

	// useEffect(async () => {
	// 	if (subjectCategory) {
	// 		const { lessons } = await getGQLRequest({
	// 			endpoint: 'lessons',
	// 			fields: 'subjectCategory{id},subject{id}',
	// 			where: `organization:{id:${organizationId}},published_at_lt:"${date}",subjectCategory:{id:${subjectCategory}}`
	// 		})
	// 		// Find the subject category in the response data
	// 		const EffectSubjectCategory = subjectCategories.find(
	// 			(category) => category.id == subjectCategory
	// 		)
	// 		if (EffectSubjectCategory) {
	// 			// Create a map of subject IDs to lesson counts
	// 			const subjectLessonCounts = lessons.reduce((countMap, lesson) => {
	// 				if (lesson.subject && lesson.subject.id) {
	// 					const subjectId = lesson.subject.id
	// 					countMap[subjectId] = (countMap[subjectId] || 0) + 1
	// 				}
	// 				return countMap
	// 			}, {})

	// 			// Map subjects with their lesson counts using the above map
	// 			const subjectsWithLessonCount = EffectSubjectCategory.subjects.map(
	// 				(subject) => ({
	// 					...subject,
	// 					lessonCount: subjectLessonCounts[subject.id] || 0
	// 				})
	// 			)
	// 			// Create a new subject category object with the updated subjects
	// 			const subjectCategoryWithLessonCount = {
	// 				...subjectCategory,
	// 				subjects: subjectsWithLessonCount
	// 			}
	// 			setSubjectCategoryList(subjectCategoryWithLessonCount)
	// 		}
	// 	}
	// }, [subjectCategory])

	useEffect(async () => {
		if (subjectCategory) {
			setSubjectCategoryList(
				subjectCategories.find((x) => x.id == subjectCategory)
			)
		}
	}, [subjectCategory])

	useEffect(async () => {
		if (subjectId && subjectCategory) {
			await getGQLRequest({
				endpoint: `lessons`,
				stateSetter: setLessons,
				where: `subjectCategory:{id:${subjectCategory}},subject:{id:${subjectId}},organization:{id:${organizationId}},published_at_lt:"${date}"`,
				fields: `id,subject{id,name},name,duration,featuredImage{id,url},price`,
				sort: `name:asc`
			})
		}
	}, [subjectId, subjectCategory])

	const seo = {
		title: 'Topic - LMS Home Page',
		description: 'Choose from different lessons!',
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<div className='desktop:mb-3 laptop:mb-3 mobile:mb-0'>
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

			<div className='space-y-10 mobile:space-y-3 mobile:w-full mobile:mb-10'>
				<div className='px-3 pt-3 pb-0 rounded-lg desktop:mb-4 laptop:mb-4 mobile:mb-0 bg-compBg shadow-menu '>
					<UserCover edit='true' />
					<div className='mt-4 ml-2 mr-2 '>
						<hr className='pb-2 border-b-2 border-themeColorMain' />
					</div>

					<LessonSelector
						subjectCategories={subjectCategories}
						setSubjectCategory={setSubjectCategory}
						subjectCategory={subjectCategory}
						setSubject={setSubject}
					/>
				</div>
				<div className='flex flex-row'>
					{subjectCategory && !subjectId && (
						<div className='grid w-full desktop:grid-col-5 laptop:grid-col-4 mobile:grid-col-2'>
							<div className='w-full text-xs'>
								<LessonList
									subjectCategory={subjectCategoryList}
									setSubject={setSubject}
								/>
							</div>
						</div>
					)}
					{subjectCategory && subjectId && (
						<div className='grid desktop:grid-col-5 laptop:grid-col-4 mobile:grid-col-1'>
							{lessons.length ? (
								<div className='grid gap-2 desktop:grid-cols-4 laptop:grid-cols-3 mobile:grid-cols-2 place-items-stretch'>
									{lessons.map((lesson) => {
										return (
											<div key={lesson.id}>
												<LessonCard
													imageUrl={lesson?.featuredImage?.url}
													subject={lesson?.subject?.name}
													lessonTitle={lesson?.name}
													duration={lesson?.duration}
													link={`/${lesson.id}`}
													disabled={isPaying ? '' : lesson.price}
												/>
											</div>
										)
									})}
								</div>
							) : (
								<div className='grid text-sm desktop:gap-2 mobile:gap-4 desktop:grid-cols-2 mobile:grid-cols-1 place-items-stretch text-textColor'>
									<DigilibLoad lessonTitle='Choose a subject to get started' />
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const cookies = context.req.cookies
	const { organizationId } = cookies
	const date = new Date().toISOString()

	const { subjectCategories } = await getGQLRequest({
		endpoint: 'subjectCategories',
		fields: 'id,name,subjects{id,name,color,icon{url},svgIcon}',
		where: `organization:{id:${organizationId}}`
	})

	return {
		props: {
			subjectCategories: subjectCategories,
			organizationId: organizationId
		}
	}
}

export default Home
