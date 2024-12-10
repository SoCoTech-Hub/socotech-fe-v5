import React, { useCallback, useEffect, useState } from 'react'
import { ImAttachmentIcon, ImModalCloseIcon } from '@/components/SvgIcons'
import InMailEditor from '@/components/InMailEditor'
import FilesDropzone from '@/components/FilesDropzone'
import Alert from '@/components/Alert'
import InMailEmailInput from '@/components/InMailEmailInput'
// import Switch from "react-switch"
import TailWindToggle from '@/components/TailWindToggle'
import api from '@/api/api'
import { profileId } from '@/context/constants'
import { useMutation } from '@apollo/client'
import InMailCreate from 'graphql/mutations/InMailCreate'
import InMailUpdate from 'graphql/mutations/InMailUpdate'

const ComposeMail = ({
	setShowModal,
	showModal,
	// userid,
	agentEmail,
	draftMail,
	draftSubject = '',
	draftBody = '',
	// draftTo,
	// draftCC,
	// draftBCC,
	validEmailList,
	refetchMails = null,
	query
}) => {
	const [ccChecked, setccChecked] = useState(false)
	const [bccChecked, setbccChecked] = useState(false)
	const [attachmentChecked, setAttachmentChecked] = useState(false)
	const [replyChecked, setReplyChecked] = useState(false)

	const [to, setTo] = useState('')
	const [cc, setCC] = useState('')
	const [bcc, setBCC] = useState('')
	const [subject, setSubject] = useState(draftSubject)
	const [body, setBody] = useState(draftBody)
	const [draft, setDraft] = useState(true)

	const [toList, setToList] = useState([])
	const [ccList, setCCList] = useState([])
	const [bccList, setBCCList] = useState([])

	const [duplicateEmailIdList, setDuplicateEmailIdList] = useState([])

	const [documents, setDocuments] = useState([])
	const [documentPreviews, setDocumentPreviews] = useState([])

	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const [updateInMail] = useMutation(InMailUpdate, {
		variables: {
			id: draftMail?.id,
			subject: subject,
			body: body,
			draft: draft,
			reply: replyChecked,
			attachments: documents.map((e) => e.id),
			to: toList.map((e) => e.id),
			cc: ccList.map((e) => e.id),
			bcc: bccList.map((e) => e.id)
		},
		refetchQueries: [query]
	})

	const [createInMail] = useMutation(InMailCreate, {
		variables: {
			from: parseInt(profileId),
			subject: subject,
			body: body,
			draft: draft,
			reply: replyChecked,
			attachments: documents.map((e) => e.id),
			to: toList.map((e) => e.id),
			cc: ccList.map((e) => e.id),
			bcc: bccList.map((e) => e.id)
		},
		refetchQueries: [query]
	})

	useEffect(async () => {
		let validToList = []
		let validCcList = []
		let validBccList = []
		let validIdList = []

		if (draftMail) {
			if (draftMail?.to?.length > 0) {
				draftMail.to.map((user) => {
					let temp = validEmailList.find(
						(validEmailList) => validEmailList.id === user.id
					)
					validToList.push(temp)
					validIdList.push(user.id)
				})
			}
			if (draftMail.cc?.length > 0) {
				setccChecked(true)
				draftMail.cc.map((user) => {
					let temp = validEmailList.find(
						(validEmailList) => validEmailList.id === user.id
					)
					validCcList.push(temp)
					validIdList.push(user.id)
				})
			}
			if (draftMail.bcc?.length > 0) {
				setbccChecked(true)
				draftMail.bcc.map((user) => {
					let temp = validEmailList.find(
						(validEmailList) => validEmailList.id === user.id
					)
					validBccList.push(temp)
					validIdList.push(user.id)
				})
			}

			if (draftMail.attachments?.length > 0) {
				setAttachmentChecked(true)
				setDocuments([...documents, ...draftMail.attachments])
			}
			setToList(validToList)
			setCCList(validCcList)
			setBCCList(validBccList)
			setDuplicateEmailIdList(validIdList)
		} else if (agentEmail) {
			agentEmail.map((user) => {
				let temp = validEmailList.find(
					(validEmailList) => validEmailList.id === user.id
				)
				validToList.push(temp)
				validIdList.push(user.id)
			})
			setToList(validToList)
			setDuplicateEmailIdList(validIdList)
		}
	}, [])

	useEffect(() => {
		setDocumentPreviews(
			documents.map((file) => ({
				id: file.id,
				preview: `${file.url}`,
				name: file.name,
				mime: file.mime
			}))
		)
	}, [documents.length])

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
					setError(uploadedFiles.problem)
				}
				setDocuments((state) => {
					setDocuments([...state, ...uploadedFiles.data])
				})
			} catch (err) {
				setError(err)
				setTimeout(() => setError(''), 5000)
			}
		}
	}, [])

	const toggleCcChecked = (event) => {
		event.preventDefault()
		setccChecked((state) => !state)
	}

	const togglebccChecked = (event) => {
		event.preventDefault()
		setbccChecked((state) => !state)
	}

	const toggleAttachmentChecked = (event) => {
		event.preventDefault()
		setAttachmentChecked((state) => !state)
	}

	const saveDraft = async () => {
		let checkEmpty = [toList, ccList, bccList, documents, subject].some(
			(x) => x.length > 0
		)
		if (draftMail && checkEmpty) {
			updateInMail()
		} else if (checkEmpty) {
			createInMail()
		}
		setShowModal(!showModal)
	}

	const onSubmit = async (event) => {
		event.preventDefault()

		if (subject.length === 0) {
			setError(
				`Please ensure you add subject to the 'Subject' field or close to save as draft`
			)
			setTimeout(() => setError(''), 5000)
		} else if (toList.length <= 0 || toList === undefined) {
			setError(
				`Please ensure you add an email to the 'To' field or close to save as draft`
			)
			setTimeout(() => setError(''), 5000)
		} else if (draftMail?.id) {
			updateInMail()
			setShowModal(!showModal)
		} else {
			createInMail()
			setShowModal(!showModal)
		}
	}

	return (
		<div>
			<form
				className='w-full'
				onSubmit={onSubmit}
			>
				<div className='flex items-center justify-between align-middle'>
					<p className='ml-1 text-lg font-bold text-textColor '>New Message</p>
					<div
						className='cursor-pointer modal-close'
						data-dismiss='modal'
					>
						<div className='cursor-pointer'>
							{/* <ImModalCloseIcon
								className='w-7 h-7'
								onClick={() => {
									setDraft(true)
									saveDraft()
								}}
							/> */}
						</div>
					</div>
				</div>
				<div className='mt-2 ml-1 mr-1'>
					<hr className='bg-gray-400' />
				</div>
				<div className=''>
					<div className='flex justify-end'>
						<a href=''>
							<div className='my-1 text-xs font-semibold text-textColor'>
								<span onClick={toggleCcChecked}>CC </span>{' '}
								<span onClick={togglebccChecked}>| BCC</span>
							</div>
						</a>
					</div>
					<div className=''>
						<div className=''>
							<InMailEmailInput
								name={'to'}
								value={to || ''}
								setValue={setTo}
								error={setError}
								success={setSuccess}
								emailList={toList}
								setEmailList={setToList}
								duplicateList={duplicateEmailIdList}
								setDuplicates={setDuplicateEmailIdList}
								validEmailList={validEmailList}
							/>
							{ccChecked && (
								<InMailEmailInput
									name={'cc'}
									value={cc || ''}
									setValue={setCC}
									error={setError}
									success={setSuccess}
									emailList={ccList}
									setEmailList={setCCList}
									duplicateList={duplicateEmailIdList}
									setDuplicates={setDuplicateEmailIdList}
									validEmailList={validEmailList}
								/>
							)}
							{bccChecked && (
								<InMailEmailInput
									name={'bcc'}
									value={bcc || ''}
									setValue={setBCC}
									error={setError}
									success={setSuccess}
									emailList={bccList}
									setEmailList={setBCCList}
									duplicateList={duplicateEmailIdList}
									setDuplicates={setDuplicateEmailIdList}
									validEmailList={validEmailList}
								/>
							)}
						</div>
						<div className=''>
							{subject && (
								<>
									<label className='ml-1 text-sm font-bold text-textColor '>
										Subject
									</label>
								</>
							)}
							<input
								type='text'
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								id='names'
								autoComplete='off'
								name='subject'
								className='w-full h-3 p-6 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none'
								placeholder='Subject'
							/>
						</div>
						<div className='w-full h-full p-1 border-2 border-gray-300 rounded-lg focus:outline-none'>
							<InMailEditor
								value={body}
								onChange={setBody}
							/>
						</div>
					</div>
					<div>
						{attachmentChecked && (
							<div className='pt-4'>
								<FilesDropzone
									files={documents}
									filesSetter={setDocuments}
									filesPreviews={documentPreviews}
									onDrop={handleDocumentUpload}
									acceptFileTypes=''
									dropzonePlaceholder='Attachments'
								/>
							</div>
						)}
						<div className='flex items-center justify-between'>
							<div className='cursor=pointer'>
								<a
									href=''
									onClick={toggleAttachmentChecked}
								>
									<ImAttachmentIcon className='w-16' />
								</a>
							</div>
							<div className='pt-3'>
								<Alert
									success={success}
									error={error}
								/>
							</div>
							<TailWindToggle
								value={replyChecked}
								onChange={setReplyChecked}
								label={'Enable Reply'}
							/>
						</div>
						<div className='flex items-center justify-between'>
							<div className='cursor=pointer'>
								<a
									href=''
									onClick={toggleAttachmentChecked}
								>
									{/* <ImAttachmentIcon className='w-16' /> */}
								</a>
							</div>
							<div className='pt-3'>
								<Alert
									success={success}
									error={error}
								/>
							</div>
							<TailWindToggle
								value={replyChecked}
								onChange={setReplyChecked}
								label={'Enable Reply'}
							/>
						</div>
						<div>
							<div className='cursor-pointer pl-96 ml-72'>
								<div
									className='flex items-center justify-center w-24 h-10 align-middle rounded-lg text-textColor'
									style={{ backgroundColor: '#22273B' }}
								>
									<button
										className='text-center text-md'
										onClick={() => {
											setDraft(false)
										}}
										type='submit'
									>
										Send
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ComposeMail
