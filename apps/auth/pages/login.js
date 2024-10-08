import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { baseUrl } from '@/context/constants'
import publicapi from './api/publicapi'
import authCheck from '@/snippets/authCheck'
import generateUniqueId from '@/snippets/auth/generateUniqueId'
import { CreateAllCookies } from '@/snippets/createCookies'
import CreateInMail from '@/snippets/auth/createInMail'
import { SEO } from '@/components/SeoHead'
import getDataRequest from '@/snippets/getDataRequest'
import Alert from '@/components/Alert'

export default function Login({
	userId,
	error,
	user,
	profile,
	organization,
	modDevice,
	jwt
}) {
	const router = useRouter()
	const [redirect, setRedirect] = useState('')

	useEffect(async () => {
		CreateAllCookies({
			days: 28,
			rememberMe: true,
			jwt: jwt,
			organizationId: organization?.id || 1,
			organizationName: organization?.name,
			appBg: organization?.appBg,
			componentBg: organization?.componentBg,
			icon1: organization?.icon1,
			icon2: organization?.icon1,
			logo: organization?.logo?.url,
			primaryColor: organization?.primaryColor,
			secondaryColor: organization?.secondaryColor,
			text: organization?.text,
			firstName: profile?.firstName,
			lastName: profile?.lastName,
			modDevice: modDevice,
			// deviceId,
			email: user?.email,
			grades: profile?.grades,
			provinces: profile?.provinces,
			schools: profile?.schools,
			subjects: profile?.subjects,
			// hasSiyavulaAccess: profile?.hasSiyavulaAccess,
			isPaying: profile?.isPaying ? profile.isPaying : false,
			isDeveloper: profile?.isDeveloper,
			profileId: profile?.id,
			profilePicUrl: profile?.profilePic?.url,
			profileBannerUrl: profile?.banner
				? profile.banner?.url
				: organization?.banner
				? organization?.banner?.url
				: '',
			uniqueId: profile?.uniqueId,
			userId: user?.id,
			roleName: user?.role?.name
		})

		const routeTo = await authCheck({
			userid: userId
		})
		setRedirect(routeTo)
	}, [])

	useEffect(() => {
		if (redirect) {
			setTimeout(() => router.push(redirect), 2000)
		}
	}, [redirect])

	return (
		<>
			<SEO
				title='Topic - Confirm'
				description='You are ready to start!'
				image='https://lms.topic.co.za/auth/logo.png'
				url='https://topic.co.za'
			/>
			<div className='overflow-scroll desktop:h-screen laptop:h-screen no-scrolly mobile:h-screen'>
				{/* <div className='mobile:mb-10'><LogoOverlay /></div> */}
				<div
					className='flex items-center justify-center'
					style={{
						backgroundImage: `url(${baseUrl}/confirm-img.png)`,
						height: '100%',
						width: '100%',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center'
					}}
				>
					<div className='desktop:my-10 laptop:my-10 mobile:my-5 desktop:w-3/4 laptop:w-3/4 mobile:w-11/12 mobile:p-3 desktop:p-0 laptop:p-0'>
						<div className='grid justify-items-center'>
							<div className='mobile:w-full desktop:w-1/2 laptop:w-1/2 mobile:mt-3 desktop:mt-0 laptop:mt-0'>
								{/* <img
									src={`${baseUrl}/confirm-img.png`}
									alt='Confirmation Image'
								/> */}
							</div>
							<div className='items-center desktop:px-20 laptop:px-20 desktop:py-8 laptop:py-8 mobile:p-4 bg-compBg rounded-3xl '>
								<div className='my-3 font-bold text-center desktop:text-4xl text-textColor laptop:text-4xl mobile:text-2xl'>
									You are being redirected!
								</div>
								{error ? (
									<>
										<Alert error={error} />
										<div className='flex justify-center'>
											<div className='w-1/2 py-3'>
												<Link
													href='/login'
													passHref
												>
													<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'>
														Retry
													</div>
												</Link>
											</div>
										</div>
									</>
								) : (
									<>
										<div className='my-4 font-bold text-center text-textColor desktop:text-2xl laptop:text-2xl mobile:text-xl'>
											You are ready to start!
										</div>
										<div className='w-full mt-3 mb-3 text-center text-textColor mobile:text-xs'>
											<div className='flex justify-center desktop:mx-4 laptop:mx-4'>
												If you aren't redirected yet,
												<br className='mobile:hidden' /> please click on the
												Continue button to continue.
											</div>
										</div>
										<div className='flex justify-center'>
											<div className='w-1/2 py-3'>
												<Link
													href='/update'
													passHref
												>
													<div className='p-3 text-center text-black rounded-lg cursor-pointer bg-themeColorMain'>
														Continue
													</div>
												</Link>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps(context) {
	const { access_token, id_token } = context.query
	const deviceDetail = context.req.headers['user-agent']
	const modDevice = `device:${deviceDetail}`

	if (id_token && access_token) {
		try {
			const res = await publicapi.get(
				`/auth/google/callback?id_token=${id_token}&access_token=${access_token}`
			)
			let profileData = []
			let userData = []

			if (res.data?.user?.profile) {
				userData = res.data.user
				profileData = res.data.user.profile
			} else {
				const organization = await publicapi.get(`/organizations/1`)

				const uniqueId = generateUniqueId({
					organization: organization.data,
					userid: res.data.user.id
				})
				profileData = await publicapi.post(`/profiles`, {
					firstName: res.data.user.username,
					organization: { id: organization.data.id },
					uniqueId: uniqueId
				})

				userData = await publicapi.put(`/users/${res.data.user.id}`, {
					profile: { id: profileData.data.id }
				})
				await CreateInMail({
					orgName: organization.data.name,
					orgId: organization.data.id,
					firstName: profileData.data.firstName,
					profileId: profileData.data.id
				})
			}
			const user = await getDataRequest(`/users/${res.data.user.id}`, () => {})
			const profile = await getDataRequest(
				`/profiles/${user.profile.id}`,
				() => {}
			)
			const organization = profile?.organization
			// const transaction = await publicapi.get(
			// 	`/transactions?uniqueId=${profile.uniqueId}`
			// )

			return {
				props: {
					userId: res.data.user.id,
					user: user,
					profile: profile,
					organization: organization,
					modDevice: modDevice,
					jwt: res.data.jwt
				}
			}
		} catch (error) {
			console.log('error: ' + error)
			return {
				props: {
					userId: '',
					error: 'Something went wrong, please try again inside'
				}
			}
		}
	} else
		return {
			props: {
				userId: '',
				error: 'Something went wrong, please try again 1'
			}
		}
}
