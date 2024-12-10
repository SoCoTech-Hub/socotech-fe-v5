import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { getNextButtonHref } from '@/lib/utils'
import getDataRequest from '@/snippets/getDataRequest'
import Btn from '@/components/Btn'
import { useRouter } from 'next/router'
import { grades, userId } from '@/context/constants'
import api from '@/api/api'
import FilesDropzone from '@/components/FilesDropzone'
import Alert from '@/components/Alert'
import getGQLRequest from '@/snippets/getGQLRequest'
import MultiUsers from '@/components/MultiUsers'
import TextEditor from '@/components/TextEditor'
import UploadThumbnail from '@/components/UploadThumbnail'
import AccordionBase from '@/components/Accordion/base'
import getReadableDate from '@/snippets/user/getReadableDate'

const Assignment = ({ lessonId, assignment }) => {
	const router = useRouter()
	const [isCompleted, setIsCompleted] = useState(false)
	const [nextButtonHref, setNextButtonHref] = useState('/')
	const [responseId, setResponseId] = useState(null)
	const [answer, setAnswer] = useState(null)
	const [success, setSuccessMessage] = useState('')
	const [error, setErrorMessages] = useState('')
	const [users, setUsers] = useState([])
	const [userList, setUserList] = useState([])
	const [attachments, setAttachments] = useState([])
	const [attachmentPreviews, setAttachmentPreviews] = useState([])
	const dueDate = new Date(assignment.dueDate)
	const currentDate = new Date()

	useEffect(async () => {
		const res = await getGQLRequest({
			endpoint: 'assignmentReplies',
			fields:
				'id, answer, attachments{id,mime,name,url},students{id,profile{id,firstName,lastName}},isCompleted',
			where: `lesson:{id:${lessonId}}, students:{id:${userId}}, assignment:{id:${assignment.id}}`
		})

		if (res) {
			setResponseId(res?.assignmentReplies[0]?.id)
			setAnswer(res?.assignmentReplies[0]?.answer)
			setAttachments(res?.assignmentReplies[0]?.attachments)
			setUserList(res?.assignmentReplies[0]?.students)
			setIsCompleted(res?.assignmentReplies[0]?.isCompleted)
		}
		if (currentDate >= dueDate) {
			setErrorMessages('Due date has passed')
		}
	}, [])

	useEffect(async () => {
		const res = await getGQLRequest({
			endpoint: 'users',
			fields: 'id, profile{id,firstName, lastName, uniqueId}',
			where: `profile:{grades: ${parseInt(grades.split(','))}}`
		})
		setUsers(res?.users)
	}, [])

	useEffect(() => {
		setAttachmentPreviews(
			attachments?.map((file) => ({
				id: file.id,
				preview: file.url,
				name: file.name,
				mime: file.mime
			}))
		)
	}, [attachments?.length])

	useEffect(async () => {
		const href = await getNextButtonHref(lessonId, 'assignment', assignment.id)
		setNextButtonHref(href)
	}, [])

	const handleDocumentUpload = useCallback(async (acceptedFiles) => {
		setSuccessMessage('')
		setErrorMessages('')
		if (acceptedFiles[0]) {
			const formData = new FormData()
			formData.append('files', acceptedFiles[0])

			try {
				const uploadedFiles = await api.post('/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				if (!uploadedFiles.ok) {
					setErrorMessages(uploadedFiles.problem)
					return
				}

				setAttachments((state) => {
					if (state) {
						setAttachments([...state, ...uploadedFiles.data])
					} else {
						setAttachments([...uploadedFiles.data])
					}
				})
				setSuccessMessage('Upload successful 👍')
				return
			} catch (err) {
				setErrorMessages(err)
				return
			}
		}
	}, [])

	const markComplete = async () => {
		if (isCompleted) {
			return
		}
		await api.put(`/assignment-replies/${responseId}`, { isCompleted: true })
		setIsCompleted(true)
		router.push(nextButtonHref)
	}

	const saveAssignment = async () => {
		const newCurrentDate = new Date()
		setSuccessMessage('')
		setErrorMessages('')
		if (newCurrentDate >= dueDate) {
			setErrorMessages('The Due date has already passed')
			return
		}
		if (isCompleted) {
			setErrorMessages('The assignment has already been completed')
			return
		}
		let userListMap = []
		if (assignment.isGrouped) {
			userListMap = userList?.map((user) => parseInt(user.id))
		}
		userListMap.push(userId)

		if (!responseId) {
			const res = await api.post(`/assignment-replies`, {
				students: userListMap,
				lesson: { id: lessonId },
				assignment: { id: assignment.id },
				answer: answer,
				attachments: attachments,
				isGrouped: assignment.isGrouped,
				isCompleted: isCompleted
			})

			if (res.ok) {
				setResponseId(res.data.id)
			} else {
				setErrorMessages('Something went wrong')
				return
			}
		} else {
			const res = await api.put(`/assignment-replies/${responseId}`, {
				students: userListMap,
				answer: answer,
				attachments: attachments,
				isGrouped: assignment.isGrouped,
				isCompleted: isCompleted
			})

			if (res.ok) {
				setResponseId(res.data.id)
			} else {
				setErrorMessages('Something went wrong')
				return
			}
		}
		setSuccessMessage('Save Successfull')
	}

	const seo = {
		title: `Topic - ${assignment.title}`,
		description: assignment.title,
		image: 'https://lms.topic.co.za/lms/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<>
			<div className='items-center laptop:flex desktop:flex mobile:px-1 mobile:space-y-2 laptop:justify-between desktop:justify-between'>
				<div className='min-w-0 laptop:flex-1 desktop:flex-1'>
					<h2 className='text-2xl font-bold leading-7 mobile:text-xl text-textColor sm:truncate sm:text-3xl sm:tracking-tight'>
						{assignment?.title}
					</h2>
				</div>
				<div className='flex md:mr-2 md:mt-0'>
					<div className='inline-flex items-center text-sm rounded-lg text-textColor'>
						Due date: {getReadableDate(dueDate)}
					</div>
				</div>
			</div>

			{assignment ? (
				<div className='py-2 rounded-lg text-textColor'>
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

					<div className='p-4 rounded-lg shadow-md bg-compBg'>
						{assignment?.question ? (
							<div dangerouslySetInnerHTML={{ __html: assignment.question }} />
						) : (
							<div
								className='text-textColor text-md'
								align='center'
							>
								Assignment Question not found
							</div>
						)}
					</div>
					<div className='p-4 mt-2 rounded-lg shadow-md bg-compBg'>
						{assignment?.attachment ? (
							<>
								<UploadThumbnail files={assignment.attachment} />
							</>
						) : (
							<></>
						)}
					</div>
				</div>
			) : (
				<div className='container'>
					<Head>
						<title>Assignment not found</title>
						<meta
							property='og:title'
							content='Assignment not found'
							key='title'
						/>
					</Head>
					<div className='text-textColor text-md'>Assignment not found</div>
				</div>
			)}
			{/*Answering area */}
			<div className='hidden'>
				<AccordionBase
					title='Answer'
					data={
						<TextEditor
							minRows={8}
							value={answer}
							onChange={setAnswer}
							placeholder='Give your Answer here...'
							className='w-full p-3 text-lg border-2 border-gray-200 rounded-lg'
						/>
					}
				/>
			</div>
			{assignment.isGrouped ? (
				<div className='pt-3 pb-3'>
					<MultiUsers
						label='Choose your group members'
						name='groupUsers'
						updatefield={setUserList}
						value={userList}
						list={users}
					/>
				</div>
			) : (
				<></>
			)}

			<div className='flex flex-row justify-end w-full pt-4'>
				{isCompleted || currentDate >= dueDate ? (
					<UploadThumbnail files={attachments} />
				) : (
					<FilesDropzone
						files={attachments}
						filesSetter={setAttachments}
						filesPreviews={attachmentPreviews}
						onDrop={handleDocumentUpload}
						dropzonePlaceholder='Attachments'
					/>
				)}
			</div>
			{/* NextButton */}
			<div className='pt-3'>
				<Alert
					success={success}
					error={error}
				/>
			</div>

			<div className='flex flex-row justify-end'>
				{isCompleted ? (
					<></>
				) : (
					<div className='mt-3 mr-6'>
						<Btn
							label='Save'
							color='bg-themeColorMain'
							onClickFunction={() => saveAssignment()}
						/>
					</div>
				)}
				{isCompleted ? (
					<div className='mt-3 mr-6'>
						<Btn
							label='Next'
							color='bg-themeColorMain'
							onClickFunction={() => router.push(nextButtonHref)}
						/>
					</div>
				) : (
					responseId && (
						<div className='mt-3 mr-6'>
							<Btn
								label='Complete'
								color='bg-themeColorMain'
								onClickFunction={() => markComplete()}
							/>
						</div>
					)
				)}
			</div>
		</>
	)
}

export async function getStaticProps({ params }) {
	const { id, lesson } = params
	const assignmentData = await getDataRequest(
		`/lms-assignments/${id}`,
		() => {}
	)

	return {
		props: {
			lessonId: lesson ? lesson : null,
			assignment: assignmentData ? assignmentData : null
		},
		revalidate: 3600 // hourly revalidate
	}
}

export async function getStaticPaths() {
	const assignmentData = await getDataRequest(`/lms-assignments`, () => {})

	const paths = assignmentData.map((assignment) =>
		assignment?.lessons.map((x) => ({
			params: { lesson: x.id.toString(), id: assignment.id.toString() }
		}))
	)
	return {
		paths: paths.flat(),
		fallback: 'blocking'
	}
}

export default Assignment
