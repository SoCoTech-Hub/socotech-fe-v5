import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import FilesDropzone from '@/components/FilesDropzone'
// import Loader from "@/components/Loader"
import getGQLRequest from '@/snippets/getGQLRequest'
import createTicket from '@/snippets/support/createTicket'
import delay from '@/snippets/delay'
import api from '@/api/api'
import {
	baseUrl,
	baseName,
	SecondaryColor,
	profileId,
	device
} from '@/context/constants'
import { useAppContext } from '@/context/AppContext'

export const Support = ({ setShowModal, showModal, url }) => {
	const { state } = useAppContext()
	const router = useRouter()
	const [topics, setTopics] = useState([])
	const [title, setTitle] = useState('')
	const [message, setMessage] = useState('')
	const [topic, setTopic] = useState(null)

	const [attachments, setAttachments] = useState([])
	const [attachmentPreviews, setAttachmentPreviews] = useState([])
	const [error, setErrorMessages] = useState('')
	const [success, setSuccessMessage] = useState('')

	useEffect(async () => {
		await getGQLRequest({
			endpoint: `supportTopics`,
			stateSetter: setTopics,
			sort: `name:asc`,
			fields: `id,name`
		})
		const { supportTopics } = await getGQLRequest({
			endpoint: `supportTopics`,
			where: `name_contains: "${baseName}"`,
			fields: `id,name`
		})
		setTopic(supportTopics[0]?.id)
	}, [])

	useEffect(() => {
		setAttachmentPreviews(
			attachments.map((file) => ({
				id: file.id,
				preview: file.url,
				name: file.name,
				mime: file.mime
			}))
		)
	}, [attachments.length])

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
				}
				setAttachments((state) => {
					setAttachments([...state, ...uploadedFiles.data])
				})
				setSuccessMessage('Upload successful 👍')
			} catch (err) {
				setErrorMessages(err)
			}
		}
	}, [])

	const submit = async () => {
		setErrorMessages('')
		setSuccessMessage('')
		createTicket({
			title: title,
			description: message,
			attachments: attachments,
			supportTopicId: topic,
			createdBy: profileId,
			path: url ? url : `${baseUrl}${router.asPath}`,
			device: decodeURIComponent(device)
		}).then((res) => {
			if (!res.ok) {
				setErrorMessages(res.data.message)
				// delay(2000).then(() => setShowModal(!showModal))
			} else {
				setSuccessMessage('Ticket created Successfully 👍')
				delay(2000).then(() => {
					if (url) {
						router.back()
					} else {
						// setShowModal(!showModal)
					}
				})
			}
		})
	}

	return (
		<>
			<div className='flex justify-end'>
				<button
					onClick={router.back}
					className='text-black bg-themeColorMain px-1.5 rounded-full'
				>
					x
				</button>
			</div>
			<div className='flex items-center justify-between py-2 align-middle'>
				<p className='ml-1 text-2xl font-bold text-themeColorMain'>
					Log Ticket
				</p>
			</div>
			<div className='mx-1 mt-2'>
				<hr className='bg-compBg' />
			</div>
			<div className='w-full h-screen'>
				<div className='grid gap-2 desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1'>
					<div className='mt-2'>
						<div className='w-full px-2'>
							<label
								htmlFor='names'
								className='mb-2 font-bold text-textColor text-md '
							>
								Ticket Title
							</label>
						</div>
						<div className='w-full px-2'>
							<input
								type='text'
								id='names'
								autoComplete='off'
								name='names'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='w-full px-2 py-3 border-2 border-gray-300 rounded-lg bg-compBg text-textColor desktop:mb-4 laptop:mb-4 mobile:mt-1 focus:outline-none'
								placeholder={'Start typing here'}
							/>
						</div>
					</div>
					<div className='desktop:mt-2 laptop:mt-2'>
						<div className='w-full px-2'>
							<label className='font-bold text-textColor text-md '>
								Select Tag
							</label>
						</div>
						<div className='w-full px-2'>
							<DefaultSelectNew
								options={topics}
								id='topics'
								name='topics'
								valueSetter={setTopic}
								value={topic}
							/>
						</div>
					</div>
				</div>

				<div className='w-full'>
					<div className='w-full px-2'>
						<label
							htmlFor='phone'
							className='mb-2 font-bold text-textColor text-md '
						>
							Ticket Message
						</label>
					</div>
					<div className='w-full px-2'>
						<textarea
							className='block w-full p-2 border-2 border-gray-300 border-solid rounded-lg resize-none bg-compBg text-textColor form-textarea focus:outline-none'
							rows='4'
							placeholder='Start typing here'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
					</div>
				</div>
				<div className='w-full px-2'>
					<div className='mt-2 rounded-lg'>
						<FilesDropzone
							files={attachments}
							filesSetter={setAttachments}
							filesPreviews={attachmentPreviews}
							onDrop={handleDocumentUpload}
							acceptFileTypes=''
							dropzonePlaceholder='Attachments'
						/>
					</div>
				</div>
				<div className='w-full px-2'>
					<div className=''>
						<Alert
							error={error}
							success={success}
						/>
						{title && message && topic && profileId && (
							<button
								className='w-full p-3 px-4 font-bold text-black rounded-full bg-themeColorMain'
								onClick={() => submit()}
							>
								Log Ticket Now
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
