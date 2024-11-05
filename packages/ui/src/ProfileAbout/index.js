import { useState, useEffect } from 'react'
import Avatar from '@/components/Avatar'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import ProfilePicUrl from '@/snippets/getProfilePicUrl'
import updateUserAbout from '@/snippets/user/updateUserAbout'
import { parseCookies } from '@/snippets/parseCookies'
import getGQLRequest from '@/snippets/getGQLRequest'
import unicodeToChar from '@/snippets/unicodeToChar'
import { profileId } from '@/context/constants'
//import { useRouter } from "next/router"

const index = () => {
	//const router = useRouter()

	const [About, setAbout] = useState('')
	const [errorMessages, setErrorMessages] = useState('')
	const [successMessages, setSuccessMessages] = useState('')
	const [loading, setloading] = useState(false)
	const [edit, setEdit] = useState(false)
	const [loadingContent, setLoadingContent] = useState(false)

	useEffect(async () => {
		if (profileId) {
			setLoadingContent(true)
			let { profile } = await getGQLRequest({
				endpoint: `profile`,
				findOne: true,
				id: profileId,
				fields: `about`
			})
			setAbout(profile.about)
			if (!profile.about) {
				setEdit(true)
			}
			setLoadingContent(false)
		}
	}, [profileId])

	const handleSubmit = async () => {
		if (!About) {
			setErrorMessages('Please complete the About before saving')
			return
		}
		setErrorMessages('')
		setloading(true)
		const aboutDetail = unicodeToChar(About)
		try {
			await updateUserAbout({
				profileId,
				about: aboutDetail
			})
			setSuccessMessages('Save successfull')
			setloading(false)
			setEdit(false)
			// router.reload()
			return
		} catch (err) {
			setErrorMessages(err)
			return
		}
	}
	return (
		<div>
			<div className='p-4 mb-24 rounded-lg bg-compBg shadow-menu  '>
				<div className='flex flex-row '>
					<div className='avatar'>
						<Avatar
							src={ProfilePicUrl()}
							size='56px'
							border={true}
						/>
					</div>
					<div className='my-auto ml-4 font-bold text-textColor'>About</div>
				</div>
				{loadingContent ? (
					<div className='rounded-md h-16 bg-gray-700 my-3 animate-pulse' />
				) : (
					<>
						<div className='pt-3'>
							<TextareaAutosize
								disabled={edit ? false : true}
								aria-label='minimum height'
								minRows={2}
								placeholder='Tell us more about yourself, start typing...'
								className={`w-full p-3 bg-compBg rounded-lg focus:ring-0 text-sm resize-none text-textColor border border-textColor`}
								value={About || ''}
								onChange={(e) => setAbout(e.target.value)}
								maxLength={280}
							/>
						</div>
						<div className='flex flex-row justify-end w-full pt-4'>
							<Alert
								error={errorMessages}
								success={successMessages}
							/>
							{About && edit && (
								<Btn
									trackingAction='Click on Save profile about'
									label={loading ? 'Loading...' : 'Save'}
									onClickFunction={handleSubmit}
									color='bg-themeColorMain'
								/>
							)}
							{!edit && About && (
								<Btn
									trackingAction='Click on Save profile about'
									label={loading ? 'Loading...' : 'Edit'}
									onClickFunction={() => setEdit(true)}
									color='bg-themeColorMain'
								/>
							)}
						</div>
					</>
				)}
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
