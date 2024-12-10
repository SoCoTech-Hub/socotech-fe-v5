import { organizationId, profileId, userId } from '@/context/constants'
import Head from 'next/head'
import Btn from '@/components/Btn'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import getDataRequest from '@/snippets/getDataRequest'
import getGQLRequest from '@/snippets/getGQLRequest'
import Alert from '@/components/Alert'
import api from '@/api/api'

const RegisterAffiliate = () => {
	const router = useRouter()
	const [responses, setResponses] = useState([])
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [disabled, setDisabled] = useState(false)

	useEffect(async () => {
		await getDataRequest(
			`/affiliate-settings?organization=${organizationId}`,
			setResponses
		)
		const { affiliates } = await getGQLRequest({
			endpoint: 'affiliates',
			fields: 'id,profile{isAffiliate}',
			where: `profile:{id:${profileId}}`
		})
		if (affiliates.length) {
			if (affiliates[0].profile.isAffiliate) {
				setSuccess('You are already an affiliate.')
			} else {
				setSuccess('Your request is being processed.')
			}
			setDisabled(true)
		}
	}, [])

	async function Apply() {
		const { affiliates } = await getGQLRequest({
			endpoint: 'affiliates',
			fields: 'id',
			where: `user:{id:${userId}}`
		})
		if (affiliates.length) {
			setError('You Already Applied.')
		} else {
			await api.post('/affiliates', {
				user: { id: parseInt(userId) },
				profile: { id: parseInt(profileId) }
			})
			setSuccess('Thank You For Applying!')
		}
	}

	return (
		<>
			<Head>
				<title>Affiliate Program Registration</title>
				<meta
					name='description'
					content='Affiliate Application'
				/>
			</Head>
			<div className='p-2 overflow-scroll desktop:h-full laptop:h-full mobile:h-full no-scrolly'>
				<div className='p-2 rounded-lg bg-compBg desktop:mt-2 laptop:mt-2 mobile:mt-2 drop-shadow-md no-scrolly'>
					<div className='flex items-center justify-between pb-2 mb-2'>
						<div className='text-xl text-textColor'>
							Affiliate Program - Terms and Conditions
						</div>
						<div className=''>
							<div className='flex justify-center'>
								<div className='flex flex-row pt-3'>
									<Btn
										label='Back'
										color='bg-themeColorMain'
										onClickFunction={() => router.back()}
									/>
								</div>
							</div>
						</div>
					</div>
					{responses.length ? (
						<div dangerouslySetInnerHTML={{ __html: responses[0].terms }} />
					) : (
						<></>
					)}
					{!disabled ? (
						<div className='flex justify-center'>
							<div className='flex flex-row pt-3'>
								<Btn
									label='Cancel'
									color='bg-themeColorMain'
									onClickFunction={() => router.back()}
								/>
								<Btn
									label='Apply'
									color='bg-themeColorMain'
									onClickFunction={() => Apply()}
								/>
							</div>
						</div>
					) : (
						<div className='flex justify-center'>
							<div className='flex flex-row pt-3'>
								<Btn
									label='Back'
									color='bg-themeColorMain'
									onClickFunction={() => router.back()}
								/>
							</div>
						</div>
					)}

					<div className='justify-center mt-3'>
						<Alert
							error={error}
							success={success}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default RegisterAffiliate
