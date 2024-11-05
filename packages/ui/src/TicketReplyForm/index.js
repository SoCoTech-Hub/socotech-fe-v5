import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Avatar from '@/components/Avatar'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import FilesDropzone from '@/components/FilesDropzone'
import api from '@/api/api'
import ProfilePicUrl from '@/snippets/getProfilePicUrl'
import createTicketComment from '@/snippets/support/createTicketComment'
import delay from '@/snippets/delay'

const index = ({ ticketId, profileId }) => {
	const route = useRouter()
	const [comment, setComment] = useState('')
	const [attachments, setAttachments] = useState([])
	const [attachmentPreviews, setAttachmentPreviews] = useState([])
	const [error, setErrorMessages] = useState('')
	const [success, setSuccessMessage] = useState('')

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

	const onSubmit = async (event) => {
		event.preventDefault()
		setErrorMessages('')
		setSuccessMessage('')
		const response = await createTicketComment({
			comment: comment,
			attachments: attachments,
			ticketId: ticketId,
			authorId: profileId
		})
		if (!response.status.toString().startsWith(2) && response.data.message) {
			setErrorMessages(response)
		} else {
			setSuccessMessage('Saved Successfully 👍')
			await delay(2000)
			route.reload()
		}
	}
	return (
		<div>
			<div className='p-4 rounded-lg bg-compBg shadow-menu  '>
				<div className='flex flex-row '>
					<div className='avatar'>
						<Avatar
							src={ProfilePicUrl()}
							size='56px'
						/>
					</div>
					<div className='my-auto ml-4 text-sm font-bold text-textColor'>
						Leave a reply
					</div>
				</div>
				<div className='pt-3'>
					<TextareaAutosize
						aria-label='minimum height'
						minRows={8}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='Tell us more about your experience...'
						className='w-full p-3 text-sm border-2 border-gray-200 rounded-lg bg-compBg text-textColor'
					/>
				</div>
				<Alert
					error={error}
					success={success}
				/>
				<div className='flex flex-row justify-end w-full pt-4 align-items-center'>
					<div>
						<FilesDropzone
							files={attachments}
							filesSetter={setAttachments}
							filesPreviews={attachmentPreviews}
							onDrop={handleDocumentUpload}
							acceptFileTypes=''
							dropzonePlaceholder='Attachments'
						/>
					</div>
					<div className='-mt-4'>
						<Btn
							disabled={comment.length ? true : false}
							label='Save'
							onClickFunction={onSubmit}
							color='bg-themeColorMain text-white'
							width='32'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default index
