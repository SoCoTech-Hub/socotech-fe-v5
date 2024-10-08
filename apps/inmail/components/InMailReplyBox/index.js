import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Alert from '@/components/Alert'
import InMailEditor from '@/components/InMailEditor'
import FilesDropzone from '@/components/FilesDropzone'
import api from '@/api/api'
import { profileId } from '@/context/constants'
import { useMutation } from '@apollo/client'
import InMailCreate from 'graphql/mutations/InMailCreate'
import TailWindToggle from '@/components/TailWindToggle'

const index = ({ mail }) => {
	const [attachmentCheckedReply, setAttachmentCheckedReply] = useState(false)
	const [replyChecked, setReplyChecked] = useState(false)
	const [documentsReply, setDocumentsReply] = useState([])
	const [documentPreviewsReply, setDocumentPreviewsReply] = useState([])
	const [replyBody, setReplyBody] = useState('')
	const [errorReply, setErrorReplyMessages] = useState('')

	const [createInMail] = useMutation(InMailCreate, {
		variables: {
			from: parseInt(profileId),
			subject: mail.subject,
			body: replyBody,
			draft: false,
			reply: replyChecked,
			replyParent: mail.id,
			attachments: documentsReply.map((e) => e.id),
			to: mail.from.id,
			cc: [],
			bcc: []
		}
	})

	const router = useRouter()

	useEffect(() => {
		setDocumentPreviewsReply(
			documentsReply.map((file) => ({
				id: file.id,
				preview: `${file.url}`,
				name: file.name,
				mime: file.mime
			}))
		)
	}, [documentsReply.length])

	const handleDocumentUpload = useCallback(async (acceptedFiles) => {
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
					setErrorReplyMessages(uploadedFiles.problem)
				}

				setDocumentsReply((state) => {
					setDocumentsReply([...state, ...uploadedFiles.data])
				})
			} catch (err) {
				setErrorReplyMessages(err)
			}
		}
	}, [])

	const toggleAttachmentReply = (event) => {
		event.preventDefault()
		setAttachmentCheckedReply((state) => !state)
	}

	const onSubmit = (event) => {
		event.preventDefault()
		if (!replyBody || replyBody === '<p><br></p>') {
			setErrorReplyMessages(`Please ensure you add a message to your reply`)
			setTimeout(() => setErrorReplyMessages(''), 5000)
		} else {
			createInMail()
			router.push({
				pathname: '/',
				query: { title: 'Sent' }
			})
		}
	}
	return (
		<>
			{mail.reply ? (
				<div className='mt-4 overflow-hidden border-2 border-gray-200 rounded-lg'>
					<form onSubmit={onSubmit}>
						<div className='flex items-center gap-2 p-2 align-middle'>
							<img
								src='/inmail/inmail_reply.svg'
								alt='Reply'
								className='w-8'
							/>
							<div className='text-lg font-semibold'>{`${mail.from.firstName} ${mail.from.lastName}`}</div>
						</div>
						<hr />
						<div className='p-2'>
							<InMailEditor
								onChange={setReplyBody}
								value={replyBody}
							/>
						</div>
						<div className='flex justify-between mx-2 mb-1'>
							<img
								src='/inmail/inmail_attachment.svg'
								alt='Attachment'
								className='w-12'
								onClick={toggleAttachmentReply}
							/>
							<div className='cursor-pointer'>
								<div
									className='flex items-center justify-center w-24 h-10 align-middle rounded-full text-textColor'
									style={{ backgroundColor: '#22273B' }}
								>
									<button className='text-center text-md'>Send</button>
								</div>
							</div>
							<TailWindToggle
								value={replyChecked}
								onChange={setReplyChecked}
								label={'Enable Reply'}
							/>
							{attachmentCheckedReply && (
								<>
									<FilesDropzone
										files={documentsReply}
										filesSetter={setDocumentsReply}
										filesPreviews={documentPreviewsReply}
										onDrop={handleDocumentUpload}
										acceptFileTypes=''
										dropzonePlaceholder='Resources'
									/>
								</>
							)}
						</div>
						<Alert error={errorReply} />
					</form>
				</div>
			) : (
				<div>Replies are disabled for this mail</div>
			)}
		</>
	)
}

export default index
