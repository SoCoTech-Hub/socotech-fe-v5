import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import FilesDropzone from '@/components/FilesDropzone'
import getGQLRequest from '@/snippets/getGQLRequest'
import createTicket from '@/snippets/support/createTicket'
import delay from '@/snippets/delay'
import api from '@/api/api'
import {
	baseUrl,
	baseName,
	profileId,
	device,
} from '@/context/constants'
import { useAppContext } from '@/context/AppContext'

interface SupportProps {
	setShowModal: (value: boolean) => void
	showModal: boolean
}

interface FileType {
	id: string
	preview: string
	name: string
	mime: string
}

export const Support: React.FC<SupportProps> = ({ setShowModal, showModal }) => {
	const { state } = useAppContext()
	const router = useRouter()
	const [topics, setTopics] = useState<{ id: string; name: string }[]>([])
	const [title, setTitle] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [topic, setTopic] = useState<string | null>(null)

	const [attachments, setAttachments] = useState<FileType[]>([])
	const [attachmentPreviews, setAttachmentPreviews] = useState<FileType[]>([])
	const [error, setErrorMessages] = useState<string>('')
	const [success, setSuccessMessage] = useState<string>('')

	useEffect(() => {
		const fetchTopics = async () => {
			await getGQLRequest({
				endpoint: `supportTopics`,
				stateSetter: setTopics,
				sort: `name:asc`,
				fields: `id,name`,
			})
			const { supportTopics } = await getGQLRequest({
				endpoint: `supportTopics`,
				where: `name_contains: \"${baseName}\"`,
				fields: `id,name`,
			})
			setTopic(supportTopics[0]?.id)
		}
		fetchTopics()
	}, [])

	useEffect(() => {
		setAttachmentPreviews(
			attachments.map((file) => ({
				id: file.id,
				preview: file.preview,
				name: file.name,
				mime: file.mime,
			}))
		)
	}, [attachments])

	const handleDocumentUpload = useCallback(async (acceptedFiles: File[]) => {
		setSuccessMessage('')
		setErrorMessages('')
		if (acceptedFiles[0]) {
			const formData = new FormData()
			formData.append('files', acceptedFiles[0])

			try {
				const uploadedFiles = await api.post('/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				if (!uploadedFiles.ok) {
					setErrorMessages(uploadedFiles.problem)
				}
				setAttachments((state) => [...state, ...uploadedFiles.data])
				setSuccessMessage('Upload successful 👍')
			} catch (err) {
				setErrorMessages(err.message)
			}
		}
	}, [])

	const submit = async () => {
		setErrorMessages('')
		setSuccessMessage('')
		const response = await createTicket({
			title: title,
			description: message,
			attachments: attachments,
			supportTopicId: topic,
			createdBy: profileId,
			path: `${baseUrl}${router.asPath}`,
			device: decodeURIComponent(device),
		})
		if (!response.ok) {
			setErrorMessages(response.data.message)
			await delay(2000)
			setShowModal(!showModal)
		} else {
			setSuccessMessage('Ticket created Successfully 👍')
			await delay(2000)
			setShowModal(!showModal)
		}
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
			<div className='flex items-center justify-between h-full py-2 pl-2 align-middle'>
				<p className='ml-1 text-2xl font-bold text-themeColorMain bg-compBg'>
					Log Ticket
				</p>
			</div>
			<div className='mt-2 ml-1 mr-1'>
				<hr className='bg-compBg' />
			</div>
			<form className='w-full pl-2'>
				<div className='grid gap-2 desktop:grid-cols-2 laptop:grid-cols-2 mobile:grid-cols-1'>
					<div className='mt-2'>
						<div className='w-full pl-2'>
							<label
								htmlFor='names'
								className='mb-2 font-bold text-textColor text-md '
							>
								Ticket Title
							</label>
						</div>
						<div className='w-full pl-2'>
							<input
								type='text'
								id='names'
								autoComplete='off'
								name='names'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='w-full px-2 py-3 border-2 border-gray-300 rounded-lg desktop:mb-4 laptop:mb-4 mobile:mt-1 focus:outline-none bg-compBg text-textColor'
								placeholder={'Start typing here'}
							/>
						</div>
					</div>
					<div className='desktop:mt-2 laptop:mt-2'>
						<div className='w-full pl-2'>
							<label className='font-bold text-textColor text-md '>
								Select Tag
							</label>
						</div>
						<div className='w-full pl-2'>
							<DefaultSelectNew
								options={topics}
								id='topics'
								name='topics'
								valueSetter={setTopic}
								value={topic}
								className='p-2 font-bold border-2 border-gray-300 rounded-lg text-grey-900 bg-compBg text-textColor'
							/>
						</div>
					</div>
				</div>

				<div className='w-full pl-2'>
					<div className='w-full'>
						<label
							htmlFor='phone'
							className='mb-2 font-bold text-md text-textColor'
						>
							Ticket Message
						</label>
					</div>
					<div className='w-full'>
						<textarea
							className='block w-full p-2 border-2 border-gray-300 border-solid rounded-lg resize-none form-textarea focus:outline-none bg-compBg text-textColor'
							rows={4}
							placeholder='Start typing here'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						></textarea>
					</div>
				</div>
				<div className='w-full pl-2 text-textColor'>
					<div className='mt-2 rounded-lg text-textColor'>
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
				<div className='w-full pl-2'>
					<div className=''>
						<Alert error={error} success={success} />
						{title && message && topic && profileId && (
							<button
								className='w-full p-3 px-4 font-bold text-black rounded-full text-md bg-themeColorMain'
								onClick={submit}
							>
								Log Ticket Now
							</button>
						)}
					</div>
				</div>
			</form>
		</>
	)
}
