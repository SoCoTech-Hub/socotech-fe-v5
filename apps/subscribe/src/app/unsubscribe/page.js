import Head from 'next/head'
import { useState } from 'react'
import { baseUrl, profileId, userId } from '@/context/constants'
import InputField from '@/components/InputField'
import deleteAccount from '@/snippets/deleteAccount'
import logout from '@/snippets/logout'
import api from './api/api'

export default function Unsubscribe() {
	const [reason, setReason] = useState('')
	const [option, setOption] = useState('')

	async function handleSubmit() {
		if (option == 'break') {
			await api.put(`/users/${userId}`, {
				deleted: true,
				onBreak: true
			})
			if (reason) {
				await api.put(`/profiles/${profileId}`, {
					about: reason
				})
			}
			logout()
			return
		}

		try {
			await deleteAccount({
				reason: reason,
				option: option,
				list: radioList
			})
		} catch (error) {
			console.log('Error:', error)
		}
	}

	const radioList = [
		{
			value: 'subjects',
			description: 'I no longer need help with my subjects.'
		},
		{
			value: 'school',
			description: "I'm no longer in school."
		},
		{
			value: 'helpful',
			description: "The content isn't helpful."
		},
		{
			value: 'break',
			description: 'I need a break. I’ll be back.'
		}
	]

	return (
		<>
			<div
				className='flex flex-col items-center justify-center h-screen overflow-scroll rounded-md no-scrolly'
				style={{
					backgroundImage: `url(${baseUrl}/bursariesComingSoon.jpg)`,
					height: '100vh',
					width: '100%',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center'
				}}
			>
				<div className='w-5/6 h-auto rounded-md shadow-lg bg-compBg'>
					<div className='desktop:p-8 laptop:p-8 mobile:p-4'>
						<h2 className='mb-3 text-2xl font-bold text-themeColorMain'>
							We’re sad to see you go…
						</h2>
						<span className='text-textColor'>
							If you have a moment, please let us know why you are deleting your
							account.
						</span>
						<div className='my-2'>
							{radioList.map((item) => (
								<div
									key={`radio-${item.value}`}
									className='flex flex-row items-center'
								>
									<input
										name={item.value}
										type='radio'
										value={item.value}
										className='w-4 h-4 mb-1 border-gray-400 cursor-pointer bg-compBg text-themeColorMain focus:ring-themeColorMain focus:ring-offset-black ring-inset-none hover:border-themeColorMain'
										checked={item.value === option}
										onChange={(e) => setOption(e.target.value)}
									/>
									<label
										htmlFor={item.value}
										className='mb-1 ml-3 leading-6 desktop:text-sm laptop:text-sm mobile:text-xs text-textColor'
									>
										{item.description}
									</label>
								</div>
							))}
						</div>

						<span className='font-semibold text-md text-textColor'>
							Reason for goodbye (optional)
						</span>
						<div className='my-2'>
							<InputField
								placeholder='Start typing here...'
								value={reason}
								onChange={(e) => setReason(e.target.value)}
							/>
						</div>

						<div className='flex flex-row'>
							<button
								type='submit'
								className='p-2.5 rounded-md w-36 justify-start font-bold text-center text-black cursor-pointer unsubscribe-button bg-red-700 hover:bg-red-600 shadow-md'
								onClick={() => handleSubmit()}
							>
								Delete My Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
