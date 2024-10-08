import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Alert from '@/components/Alert'
import AuthNavbar from '@/components/AuthNavbar'
import Btn from '@/components/Btn'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import InputField from '@/components/InputField'
import Checkbox from '@/components/Checkbox'
import CssStepper from '@/components/CssStepper'
import api from '@/api/api'
import client from './api/apolloClient'
import GetRegisterC from 'graphql/queries/GetRegisterC'
import authCheck from '@/snippets/authCheck'
import updateUserC from '@/snippets/auth/updateUserC'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'

const RegisterC = ({ userId, profile, provinces, grades }) => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const [province, setProvince] = useState(
		profile?.provinces ? profile?.provinces[0]?.id : null
	)

	const [district, setDistrict] = useState(
		profile?.schools ? profile?.schools[0]?.district?.id : null
	)
	const [school, setSchool] = useState(
		profile?.schools ? profile?.schools[0]?.id : null
	)
	const [grade, setGrade] = useState(
		profile?.grades ? profile?.grades[0]?.id : null
	)
	const [schools, setSchools] = useState([])
	const [districts, setDistricts] = useState([])

	const [redirect, setRedirect] = useState('')
	const [errors, setErrorMessages] = useState('')

	const [findSchool, setFindSchool] = useState(false)
	const [schoolName, setSchoolName] = useState('')

	useEffect(async () => {
		if (userId) {
			const routeTo = await authCheck({ userid: userId })

			if (routeTo.startsWith('..')) {
				setRedirect(`${routeTo}?firstLogin=true`)
			} else {
				setRedirect(routeTo)
			}
		} else {
			setRedirect('/')
		}
	}, [userId])

	useEffect(() => {
		if (redirect) {
			router.push(redirect)
			setLoading(false)
		}
	}, [redirect])

	useEffect(async () => {
		if (province) {
			setLoading(true)
			await getGQLRequest({
				endpoint: `districts`,
				stateSetter: setDistricts,
				fields: `id,name`,
				where: `province:{id:${province?.id ? province.id : province}}`
			})
			setLoading(false)
		}
	}, [province])

	useEffect(async () => {
		if (district) {
			setLoading(true)
			await getGQLRequest({
				endpoint: `schools`,
				stateSetter: setSchools,
				fields: `id,name`,
				where: `district:{id:${district?.id ? district.id : district}}`
			})
			setLoading(false)
		}
	}, [district])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)
		if (!province || !district || !grade) {
			setErrorMessages('Some required fields are incomplete')
			setLoading(false)
			return
		}
		setErrorMessages('')
		const date = Math.floor(new Date().getTime() / 1000.0)
		let newSchool = null
		if (findSchool) {
			if (schoolName) {
				const slugify = (str) => {
					str
						.toLowerCase()
						.trim()
						.replace(/[^\w\s-]/g, '')
						.replace(/[\s_-]+/g, '-')
						.replace(/^-+|-+$/g, '')
				}
				const schoolNameSlug = slugify(schoolName)
				let data = await api.post('/schools', {
					name: schoolName,
					province: province?.id ? province.id : province,
					district: district?.id ? district.id : district,
					slug: schoolNameSlug + date.toString(16)
				})
				newSchool = data.data
			} else {
				setErrorMessages('Please provide a school name')
				setLoading(false)
				return
			}
		}
		try {
			await updateUserC({
				profileId: profile.id,
				schools: newSchool ? newSchool : school,
				grades: grade,
				provinces: province
			})
			router.push('/registere')
		} catch (err) {
			setErrorMessages(err)
			setLoading(false)
		}
	}

	return (
		<>
			<Head>
				<title>Register School Info</title>
				<meta
					name='description'
					content='Register C Page'
				/>
			</Head>
			<div className=''>
				<div className='fixed w-full'>
					<AuthNavbar />
				</div>

				<div className='flex flex-wrap g-0'>
					<div className='w-1/2 mobile:w-full mobile:mt-10 bg-registerC mobile:bg-compBg desktop:block laptop:mt-16'>
						<div className='flex items-center w-full'>
							<img
								src={`${baseUrl}/reg-step-2.jpg`}
								alt='Registration Step 2'
								className='mobile:hidden'
							/>
							<div className='flex items-center w-full'>
								<img
									src={`${baseUrl}/reg-step-2-mobile.png`}
									alt='Registration Step 2'
									className='desktop:hidden laptop:hidden'
								/>
							</div>
						</div>
					</div>

					<div className='w-full bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 mobile:mb-4'>
						<div className='flex items-center desktop:h-screen laptop:h-screen place-content-center desktop:mx-4 laptop:mx-4 mobile:mx-1'>
							<div className='w-5/6 desktop:pt-10 laptop:pt-10 mobile:pt-5 mobile:w-10/12 desktop:my-0'>
								<div className='mt-10 mb-4 text-4xl text-textColor mobile:block mobile:text-3xl'>
									School
									<br />
									Information
								</div>

								<div className='w-auto mb-4 text-textColor mobile:text-sm'>
									Finish your registration by completing the fields below,
									almost there.
								</div>

								<form>
									<div className='mt-2 mb-3'>
										<DefaultSelectNew
											options={provinces}
											id='province'
											name='province'
											placeholder='Province (Required)'
											value={province}
											valueSetter={setProvince}
											required
										/>
									</div>
									<div className='mt-3 mb-3'>
										<DefaultSelectNew
											options={districts}
											id='district'
											name='district'
											placeholder='School District (Required)'
											value={district}
											valueSetter={setDistrict}
											required
										/>
									</div>
									<div className='mt-3 mb-3'>
										<DefaultSelectNew
											options={schools}
											id='school'
											name='school'
											placeholder='School (Required)'
											value={school}
											valueSetter={setSchool}
											required
										/>
									</div>
									{district && (
										<div className='mt-3 mb-3 text-textColor'>
											<Checkbox
												label="Can't find your school"
												setter={setFindSchool}
												value={findSchool}
											/>
										</div>
									)}
									{findSchool && (
										<div className='mt-3 mb-3 text-textColor'>
											<InputField
												className='text-textColor'
												placeholder='Enter your school name'
												value={schoolName}
												onChange={(e) => setSchoolName(e.target.value)}
											/>
										</div>
									)}
									<div className='mt-3'>
										<DefaultSelectNew
											options={grades}
											id='grade'
											name='grade'
											placeholder='Grade (Required)'
											value={grade}
											valueSetter={setGrade}
											required
										/>
									</div>
								</form>
								<div className='p-0 mt-4 text-left col-sm-12'>
									<div className=''>
										<Alert error={errors} />
										<Btn
											label={loading ? 'Loading...' : 'Next'}
											onClickFunction={handleSubmit}
											color='bg-themeColorMain text-black w-full'
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export async function getServerSideProps(context) {
	const userId = context.req.cookies['userid']
	const profileId = context.req.cookies['profile']

	const { data } = await client.query({
		query: GetRegisterC,
		variables: { profileID: profileId }
	})

	return {
		props: {
			userId: userId ? userId : null,
			profile: data.profiles[0] ? data.profiles[0] : null,
			provinces: data.provinces ? data.provinces : null,
			grades: data.grades ? data.grades : null
		}
	}
}

export default RegisterC
