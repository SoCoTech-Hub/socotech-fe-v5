import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import InputField from '@/components/InputField'
import Checkbox from '@/components/Checkbox'
import api from '@/api/api'
import client from './api/apolloClient'
import GetRegisterC from 'graphql/queries/GetRegisterC'
import authCheck from '@/snippets/authCheck'
import updateUserC from '@/snippets/auth/updateUserC'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'
import AuthPage from '@/components/AuthPage'

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
			setLoading(false)
			// router.push(redirect)
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
			<AuthPage
				hasNavbar
				bgImage={`${baseUrl}/background2-h.png`}
				content={
					<div
						className='w-full h-screen p-8 overflow-x-hidden overflow-y-visible'
						style={{ marginTop: '72px' }}
					>
						<h1 className='justify-start mb-1 text-4xl font-bold leading-1'>
							School Information
						</h1>
						<div className='flex flex-row items-center text-xl'>
							<span className='mr-1.5'>Step</span>
							<span
								className='bg-themeColorMain text-white font-semibold mr-1.5'
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									height: '1.5rem',
									maxHeight: '1.5rem',
									width: '1.5rem',
									maxWidth: '1.5rem',
									borderRadius: '50%'
								}}
							>
								2
							</span>{' '}
							<span className='mr-1.5'>of</span>
							<span
								className='font-semibold text-white bg-themeColorMain'
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									height: '1.5rem',
									maxHeight: '1.5rem',
									width: '1.5rem',
									maxWidth: '1.5rem',
									borderRadius: '50%'
								}}
							>
								3
							</span>
						</div>
						<p className='my-2'>
							Finish your registration by completing the fields below. Almost
							there.
						</p>
						<form>
							<div className='mb-3'>
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
							<div className='mb-3'>
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
							{!findSchool && (
								<div className='mb-3'>
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
							)}
							{district && (
								<div className='mb-3 text-textColor'>
									<Checkbox
										label="Can't find your school"
										setter={setFindSchool}
										value={findSchool}
									/>
								</div>
							)}
							{findSchool && (
								<div className='mb-3 text-textColor'>
									<InputField
										className='text-textColor'
										placeholder='Enter your school name'
										value={schoolName}
										onChange={(e) => setSchoolName(e.target.value)}
									/>
								</div>
							)}
							<div>
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
									color='bg-themeColorSecondary'
								/>
							</div>
						</div>
					</div>
				}
				leftTitle={
					<span
						className='text-6xl font-bold text-white'
						style={{ marginTop: '72pt' }}
					>
						STEP 2
					</span>
				}
			/>
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
