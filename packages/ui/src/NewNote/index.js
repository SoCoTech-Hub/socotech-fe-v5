import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Btn from '@/components/Btn'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import Alert from '@/components/Alert'
import createNote from '@/snippets/support/createNote'
import editNote from '@/snippets/support/editNote'
import getGQLRequest from '@/snippets/getGQLRequest'
import delay from '@/snippets/delay'
import InputField from '@/components/InputField'
// import setNoteRead from '@/snippets/support/setNoteRead'

const index = ({ subjects, profileId, note, edit }) => {
	const router = useRouter()
	// const fullDate = new Date().toISOString()
	// const currentDate = fullDate.split('T')

	const [title, setTitle] = useState(note?.name)
	const [subject, setSubject] = useState(note?.subject?.id)
	const [description, setNote] = useState(note?.note)
	const [read, setRead] = useState(note?.read)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	useEffect(async () => {
		if (note) {
			const { notes } = await getGQLRequest({
				endpoint: `notes`,
				where: `id:${note.id},profile:{id:${profileId}}`,
				fields: `read`
			})
			setRead(notes[0].read)
		}
	}, [note])

	// const handleDiscard = () => {
	// setTitle("")
	// setSubject("")
	// setNote("")
	// setError("")
	//   router.push({ pathname: "/notes" })
	// }

	const onSubmit = async () => {
		setError('')
		if (!subject) {
			setError('Please provide a subject')
			return
		}
		if (!title) {
			setError('Please provide a title')
			return
		}
		if (edit) {
			const response = await editNote({
				id: note.id,
				name: title,
				note: description,
				read: read,
				subjectId: subject,
				profileId: profileId
			})
			if (!response.status.toString().startsWith(2) && response.data.message) {
				setError(response)
			} else {
				setSuccess('Updated successfully 👍')
				await delay(3000)
				router.push({ pathname: '/notes' })
			}
		} else {
			const response = await createNote({
				name: title,
				note: description,
				read: read,
				subjectId: subject,
				profileId: profileId
			})
			if (!response.status.toString().startsWith(2) && response.data.message) {
				setError(response)
			} else {
				setSuccess('Created successfully 👍')
				await delay(3000)
				router.push({ pathname: '/notes' })
			}
		}
	}
	// const onReadSubmit = async () => {
	//   setError('')
	//   setRead(!read)
	//   await setNoteRead(!read, note.id)
	// }

	return (
		<div className='p-4 rounded-lg shadow-md bg-compBg'>
			<InputField
				id='titleInput'
				placeholder='Title'
				type='text'
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			{/* <div className='px-1 py-2'>
				<div className='font-bold text-md text-textColor focus:outline-none'>
					{currentDate[0]}
				</div>
			</div> */}
			<div className='pb-3 placeholder-textColor'>
				<DefaultSelectNew
					options={subjects}
					id='subjects'
					name='subjects'
					placeholder='Subject'
					value={subject}
					valueSetter={setSubject}
					// className='text-lg font-bold placeholder-textColor focus:outline-none'
				/>
			</div>
			{/* <div className='pb-3'>
				<hr className='bg-compBg' />
			</div> */}
			<div className='pb-3'>
				<textarea
					className='block w-full p-2 mt-1 border-2 rounded-lg resize-none border-themeColorSecondary bg-compBg placeholder-textColor text-textColor form-textarea focus:outline-none'
					rows='13'
					placeholder='Start typing your note...'
					value={description}
					onChange={(e) => setNote(e.target.value)}
				></textarea>
			</div>
			<div className='flex flex-wrap'>
				<Alert
					success={success}
					error={error}
				/>
				<div className='mt-4'>
					<Btn
						textColor='text-white'
						color='bg-themeColorSecondary'
						onClickFunction={onSubmit}
					/>
				</div>
				{note ? (
					// <div className="mt-4">
					//   <Btn
					//     label={read ? "Mark as Unread" : "Mark as Read"}
					//     color="bg-themeColorMain"
					//     onClickFunction={() => onReadSubmit()}
					//   />
					// </div>
					<div className='mt-4'>
						<Btn
							label='Back'
							textColor='text-white'
							color='bg-themeColorMain'
							onClickFunction={() => router.back()}
						/>
					</div>
				) : (
					// <div className="mt-4">
					//   <Btn
					//     label="Discard"
					//     onClickFunction={handleDiscard}
					//     color="bg-themeColorMain"
					//   />
					// </div>
					<div className='mt-4'>
						<Btn
							label='Back'
							textColor='text-white'
							onClickFunction={() => router.back()}
							color='bg-themeColorMain'
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default index
