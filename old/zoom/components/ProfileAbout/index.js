import React, { useState } from 'react'
import Avatar from '@/components/Avatar'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import ProfilePicUrl from '@/snippets/getProfilePicUrl'
import updateUserAbout from '@/snippets/user/updateUserAbout'
import { parseCookies } from '@/snippets/parseCookies'

const index = ({ about, profileId }) => {
	const [About, setAbout] = useState(about ? about : '')
	const [errorMessages, setErrorMessages] = useState('')
	const [successMessages, setSuccessMessages] = useState('')
	const [loading, setloading] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (About == about) {
			setErrorMessages('Please complete the About before saving')
			return
		}
		setErrorMessages('')
		setloading(true)
		try {
			await updateUserAbout({
				profileId,
				about: About
			})
			setSuccessMessages('Save successfull')
			setloading(false)
			return
		} catch (err) {
			setErrorMessages(err)
			return
		}
	}
	return (
		<div>
			<div className='p-4 rounded-lg bg-compBg shadow-menu'>
				<div className='flex flex-row '>
					<div className='avatar'>
						<Avatar
							src={ProfilePicUrl()}
							size='56px'
							border={true}
						/>
					</div>
					<div className='my-auto ml-4 text-lg font-bold text-textColor'>
						About
					</div>
				</div>
				<div className='pt-3'>
					<TextareaAutosize
						aria-label='minimum height'
						minRows={5}
						placeholder='Tell us more about yourself, start typing...'
						className='w-full p-3 text-lg border-2 border-gray-200 rounded-lg'
						value={About}
						onChange={(e) => setAbout(e.target.value)}
					/>
				</div>
				<div className='flex flex-row justify-end w-full pt-4'>
					<Alert
						error={errorMessages}
						success={successMessages}
					/>
					<Btn
						trackingAction='Click on Save profile about'
						label={loading ? 'Loading...' : 'Save'}
						onClickFunction={handleSubmit}
						color='bg-themeColorMain'
						width='36'
						padding='px-3 py-2'
					/>
				</div>
			</div>
		</div>
	)
}

index.getInitialProps = async ({ req }) => {
	const cookies = parseCookies(req)

	return {
		profileId: cookies.userid
	}
}

export default index
