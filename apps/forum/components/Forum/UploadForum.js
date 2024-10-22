import { useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/api/api'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import MdxEditor from '@/components/MdxEditor/MdxEditor'
import { role, userId } from '@/context/constants'

const UploadForum = () => {
	const router = useRouter()
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [check, setCheck] = useState(false)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')
	const isAdmin = role !== 'Student' ? true : false

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}
	const handleSubmit = async () => {
		setLoading(true)
		try {
			const { ok, ...rest } = await api.post('/forums', {
				user: { id: parseInt(userId) },
				name: title.trim(),
				question: description,
				pin: check
			})
			if (ok) {
				setSuccess('Topic posted')
				setLoading(false)
				router.push('/')
			} else {
				setError('Something went wrong')
				setLoading(false)
			}
		} catch (error) {
			console.error('Error creating topic:', error)
		}
		return
	}

	return (
		<div className='flex flex-col mt-4 text-textColor'>
			<div className='justify-start mb-3 text-2xl font-bold'>
				<div className='flex items-center justify-between'>
					<h1 className='ml-2'>Create a New Topic</h1>
					<Btn
						label='Back'
						color='bg-themeColorMain'
						link='/'
					/>
				</div>
			</div>

			<div className='flex flex-col'>
				<div className='mx-2 my-3'>
					<input
						className='w-full py-2 pl-3 mx-auto rounded-lg shadow-md bg-compBg'
						type='text'
						placeholder='Enter your title'
						maxLength='74'
						value={title}
						onChange={handleTitleChange}
					/>
				</div>
				{title ? (
					<div className='m-2'>
						<MdxEditor
							setValue={setDescription}
							value={description}
						/>
					</div>
				) : (
					<></>
				)}
				{isAdmin ? (
					<div className='m-2'>
						<input
							type='checkbox'
							onChange={(e) => setCheck(e.target.checked)}
							value={check}
						/>{' '}
						Pin this Topic
					</div>
				) : (
					<></>
				)}
				{title ? (
					<div className='flex mt-3 mobile:justify-center laptop:justify-start desktop:justify-start desktop:mb-12 laptop:mb-12 mobile:mb-32'>
						<Btn
							onClickFunction={() => handleSubmit()}
							disabled={loading}
							label='Submit Question'
							color='bg-themeColorMain'
							type='submit'
						/>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default UploadForum
