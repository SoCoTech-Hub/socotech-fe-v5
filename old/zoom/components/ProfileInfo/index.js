import { useEffect, useState } from 'react'
import Alert from '@/components/Alert'
import Btn from '@/components/Btn'
import InputField from '@/components/InputField'
import DatePickField from '@/components/DatePickField'
import MaskedIdnumber from '@/components/MaskedIdnumber'
import MaskedMobile from '@/components/MaskedMobile'
import DefaultSelectNew from '@/components/DefaultSelectNew'
import getGQLRequest from '@/snippets/getGQLRequest'
import MaskedSerial from '@/components/MaskedSerial'
import MaskedImei from '@/components/MaskedImei'
import updateUserBio from '@/snippets/user/updateUserBio'
import updateUserAdd from '@/snippets/user/updateUserAdd'
import updateUserSchool from '@/snippets/user/updateUserSchool'
import checkSerial from '@/snippets/auth/checkSerial'
import checkImei from '@/snippets/auth/checkImei'
import updateUserDevice from '@/snippets/user/updateUserDevice'
import updateUserKin from '@/snippets/user/updateUserKin'
import delay from '@/snippets/delay'

const index = ({ user }) => {
	const [firstName, setFirstName] = useState(user?.firstName)
	const [lastName, setLastName] = useState(user?.lastName)
	const [idNumber, setIdNumber] = useState(user?.idNumber)
	const [dob, setDob] = useState(user?.dob)
	const [genders, setGenders] = useState([])
	const [gender, setGender] = useState(user?.gender?.id)

	const [addProvince, setAddProvince] = useState(
		user?.addresses[0]?.province?.id
	)
	const [schoolProvince, setSchoolProvince] = useState(
		user?.schools[0]?.province?.id
	)
	const [provinces, setProvinces] = useState([])
	const [grade, setGrade] = useState(user?.grades[0]?.id)
	const [grades, setGrades] = useState([])
	const [school, setSchool] = useState(user?.schools[0]?.id)
	const [schools, setSchools] = useState([])
	const [district, setDistrict] = useState(user?.schools[0]?.district?.id)
	const [districts, setDistricts] = useState([])
	const [serialNumber, setSerial] = useState(user?.serialNumber)
	const [imei, setImei] = useState(user?.imei)
	const [parent] = useState(user?.kins[0])
	const [parentFirstName, setParentFirstName] = useState(
		user?.kins[0]?.firstName
	)
	const [parentLastName, setParentLastName] = useState(user?.kins[0]?.lastName)
	const [parentMobileNr, setParentMobileNr] = useState(user?.kins[0]?.mobileNr)
	// const [parentWorkNr, setParentWorkNr] = useState(user?.kins[0]?.workNr)
	// const [parentIdnumber, setParentIdnumber] = useState(user?.kins[0]?.idnumber)
	// const [parentTitle, setParentTitle] = useState(user?.kins[0]?.title)
	// const [titles, setTitles] = useState([])
	// const [parentIdnumber, setParentIdnumber] = useState(user?.kins[0]?.idnumber)
	const [userRelation, setUserRelation] = useState(
		user?.kins[0]?.userRelation?.id
	)
	const [userRelations, setUserRelations] = useState([])

	const [addresses] = useState(user?.addresses[0])
	const [addressLine1, setAddressLine1] = useState(
		user?.addresses[0]?.addressLine1
	)
	const [addressLine2, setAddressLine2] = useState(
		user?.addresses[0]?.addressLine2
	)
	const [town, setTown] = useState(user?.addresses[0]?.town)
	const [contactNr, setContactNr] = useState(user?.mobileNr)

	const [bioError, setBioError] = useState('')
	const [bioSuccess, setBioSuccess] = useState('')
	const [addError, setAddError] = useState('')
	const [addSuccess, setAddSuccess] = useState('')
	const [schoolError, setSchoolError] = useState('')
	const [schoolSuccess, setSchoolSuccess] = useState('')
	const [deviceError, setDeviceError] = useState('')
	const [deviceSuccess, setDeviceSuccess] = useState('')
	const [kinError, setKinError] = useState('')
	const [kinSuccess, setKinSuccess] = useState('')

	useEffect(() => {
		const fetchDropdownOptions = async () => {
			await getGQLRequest({
				endpoint: `genders`,
				stateSetter: setGenders,
				fields: `id,name`
			})
			await getGQLRequest({
				endpoint: `provinces`,
				stateSetter: setProvinces,
				fields: `id,name`
			})
			await getGQLRequest({
				endpoint: `grades`,
				stateSetter: setGrades,
				fields: `id,name`
			})
			await getGQLRequest({
				endpoint: `userRelations`,
				stateSetter: setUserRelations,
				fields: `id,name`
			})
		}
		fetchDropdownOptions()
	}, [])

	useEffect(async () => {
		if (schoolProvince) {
			await getGQLRequest({
				endpoint: `districts`,
				stateSetter: setDistricts,
				fields: `id,name`,
				where: `province: {id: ${
					schoolProvince.id ? schoolProvince.id : schoolProvince
				}}`
			})
		}
	}, [schoolProvince])

	useEffect(async () => {
		if (district) {
			await getGQLRequest({
				endpoint: `schools`,
				stateSetter: setSchools,
				fields: `id,name`,
				where: `district: {id: ${district.id ? district.id : district}}`
			})
		}
	}, [district])

	const accountBiological = async (event) => {
		event.preventDefault()
		if (!firstName || !lastName || !dob || !idNumber || !gender) {
			setBioError('Please complete all the fields before saving')
			return
		}
		setBioError('')
		try {
			await updateUserBio({
				profileId: user.id,
				firstName,
				lastName,
				dob,
				idNumber,
				gender
			})
			setBioSuccess('Save successfull')
			await delay(2000)
			setBioSuccess('')
			return
		} catch (err) {
			setBioError(err)
			return
		}
	}
	const accountAddress = async (event) => {
		event.preventDefault()
		if (!addressLine1 || !addProvince || !town || !contactNr) {
			setAddError('Please complete all the fields before saving')
			return
		}
		setAddError('')
		try {
			await updateUserAdd({
				profileId: user.id,
				addressId: addresses ? addresses.id : null,
				addressLine1,
				addressLine2,
				addProvince,
				town,
				contactNr
			})
			setAddSuccess('Save successfull')
			await delay(2000)
			setAddSuccess('')
			return
		} catch (err) {
			setAddError(err)
			return
		}
	}
	const accountSchool = async (event) => {
		event.preventDefault()
		if (!schoolProvince || !school || !grade) {
			setSchoolError('Please complete all the fields before saving')
			return
		}
		setSchoolError('')
		try {
			await updateUserSchool({
				profileId: user.id,
				schoolProvince,
				school,
				grade
			})
			setSchoolSuccess('Save successfull')
			await delay(2000)
			setSchoolSuccess('')
			return
		} catch (err) {
			setSchoolError(err)
			return
		}
	}
	const accountDevice = async (event) => {
		event.preventDefault()
		if (!serialNumber || !imei) {
			setDeviceError('Please complete all the fields before saving')
			return
		}
		let serialSplit = serialNumber.split('_')[0]
		let imeiSplit = imei.split('_')[0]
		if (serialSplit.length < 12) {
			setDeviceError('Please provide your full device serial number')
			return
		}
		if (imeiSplit.length <= 16) {
			setDeviceError('Please ensure your Sim IMEI number is correct')
			return
		}
		const serialCheck = await checkSerial({
			serialNumber: serialSplit,
			userid: user.id
		})
		if (serialCheck.data.length) {
			setDeviceError('Device serial already in use')
			return
		}
		const imeiCheck = await checkImei({
			userid: user.id,
			imei: imeiSplit
		})
		if (imeiCheck.data.length) {
			setDeviceError('Sim IMEI already in use')
			return
		}
		setDeviceError('')
		try {
			await updateUserDevice({
				profileId: user.id,
				serialNumber,
				imei
			})
			setDeviceSuccess('Save successfull')
			await delay(2000)
			setDeviceSuccess('')
			return
		} catch (err) {
			setDeviceError(err)
			return
		}
	}
	const accountKin = async (event) => {
		event.preventDefault()
		if (
			!parentFirstName ||
			!parentLastName ||
			!userRelation ||
			!parentMobileNr
		) {
			setKinError('Please complete all the fields before saving')
			return
		}
		setKinError('')
		try {
			await updateUserKin({
				profileId: user.id,
				parent: parent ? parent.id : null,
				parentFirstName,
				parentLastName,
				userRelation,
				parentMobileNr
			})
			setKinSuccess('Save successfull')
			await delay(2000)
			setKinSuccess('')
			return
		} catch (err) {
			setKinError(err)
			return
		}
	}

	return (
		<div className='space-y-3'>
			{/* Biological Info Start */}
			<div className='p-4 bg-compBg rounded-lg shadow-menu  '>
				<div className='flex flex-row '>
					<div className=''>
						<img
							src='/user/Icon_Biological.png'
							alt='Biological Info'
							className=' w-14'
						/>
					</div>
					<div className='my-auto ml-4 text-lg font-bold text-textColor '>
						Account Info - Biological
					</div>
				</div>
				<div className='pt-3'>
					<div className=''>
						<InputField
							placeholder='First Name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className=''>
						<InputField
							placeholder='Last Name'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div className=''>
						<DatePickField
							placeholder='Date of birth (Required)'
							onChange={(event) => setDob(event.target.value)}
							value={dob}
						/>
					</div>
					<div className=''>
						<MaskedIdnumber
							placeholder='ID Number'
							required={true}
							setter={setIdNumber}
							value={idNumber}
						/>
					</div>
					<div className=''>
						<DefaultSelectNew
							disableUnderline
							options={genders}
							id='gender'
							name='gender'
							placeholder='Gender (Required)'
							value={gender}
							valueSetter={setGender}
							required
						/>
					</div>
				</div>
				<div className='flex flex-row justify-start w-full pt-4'>
					<Btn
						label='Save'
						trackingAction='Click on Save Account Info - Biological'
						onClickFunction={accountBiological}
						color='bg-themeColorMain'
						width='36'
						padding='px-3 py-2'
					/>
					<Alert
						error={bioError}
						success={bioSuccess}
					/>
				</div>
			</div>
			{/* Biological Info End */}
			{/* Address Info Start */}
			<div className='p-4 bg-compBg rounded-lg shadow-menu  '>
				<div className='flex flex-row '>
					<div className=''>
						<img
							src='/user/Icon_Contact.png'
							alt='Biological Info'
							className=' w-14'
						/>
					</div>
					<div className='my-auto ml-4 text-lg font-bold text-textColor '>
						Account Info - Contact
					</div>
				</div>
				<div className='pt-3'>
					<div className=''>
						<InputField
							placeholder='Address line 1: House number and street name'
							value={addressLine1}
							onChange={(e) => setAddressLine1(e.target.value)}
						/>
					</div>
					<div className=''>
						<InputField
							placeholder='Address line 2: Suburb can come here'
							value={addressLine2}
							onChange={(e) => setAddressLine2(e.target.value)}
						/>
					</div>
					<div className=''>
						<DefaultSelectNew
							options={provinces}
							id='province'
							name='province'
							placeholder='Province (Required)'
							value={addProvince}
							valueSetter={setAddProvince}
							required
						/>
					</div>
					<div className=''>
						<InputField
							placeholder='City or Town (Required)'
							onChange={(e) => setTown(e.target.value)}
							value={town}
						/>
					</div>
					<div className=''>
						<MaskedMobile
							required={true}
							setter={setContactNr}
							value={contactNr}
							placeholder='Contact Number'
						/>
					</div>
				</div>
				<div className='flex flex-row justify-start w-full pt-4'>
					<Btn
						label='Save'
						trackingAction='Click on Save Account Info - Contact'
						onClickFunction={accountAddress}
						color='bg-themeColorMain'
						width='36'
						padding='px-3 py-2'
					/>
					<Alert
						error={addError}
						success={addSuccess}
					/>
				</div>
			</div>
			{/* Address Info End */}
			{/* School Info Start */}
			<div className='p-4 bg-compBg rounded-lg shadow-menu  '>
				<div className='flex flex-row '>
					<div className=''>
						<img
							src='/user/Icon_School.png'
							alt='Biological Info'
							className=' w-14'
						/>
					</div>
					<div className='my-auto ml-4 text-lg font-bold text-textColor '>
						Account Info - School
					</div>
				</div>
				<div className='pt-3'>
					<div className=''>
						<DefaultSelectNew
							options={provinces}
							id='province'
							name='province'
							placeholder='Province (Required)'
							value={schoolProvince}
							valueSetter={setSchoolProvince}
							required
						/>
					</div>
					<div className=''>
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
					<div className=''>
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
					<div className=''>
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
				</div>
				<div className='flex flex-row justify-start w-full pt-4'>
					<Btn
						label='Save'
						trackingAction='Click on Save Account Info - School'
						onClickFunction={accountSchool}
						color='bg-themeColorMain'
						width='36'
						padding='px-3 py-2'
					/>
					<Alert
						error={schoolError}
						success={schoolSuccess}
					/>
				</div>
			</div>
			{/* School Info End */}
			{/* Device and Sim Info Start */}
			<div className='p-4 bg-compBg rounded-lg shadow-menu  '>
				<div className='flex flex-row '>
					<div className=''>
						<img
							src='/user/Icon_Device.png'
							alt='Biological Info'
							className=' w-14'
						/>
					</div>
					<div className='my-auto ml-4 text-lg font-bold text-textColor '>
						Account Info - Device and Sim
					</div>
				</div>
				<div className='pt-3'>
					<div className=''>
						<MaskedSerial
							required
							setter={setSerial}
							value={serialNumber}
						/>
					</div>
					<div className=''>
						<MaskedImei
							required
							setter={setImei}
							value={imei}
						/>
					</div>
				</div>
				<div className='flex flex-row justify-start w-full pt-4'>
					<Btn
						label='Save'
						trackingAction='Click on Save Account Info - Device and Sim'
						onClickFunction={accountDevice}
						color='bg-themeColorMain'
						width='36'
						padding='px-3 py-2'
					/>
					<Alert
						error={deviceError}
						success={deviceSuccess}
					/>
				</div>
			</div>
			{/* School Info End */}
			{/* Next of Kin Info Start */}
			<div className='p-4 bg-compBg rounded-lg shadow-menu  '>
				<div className='flex flex-row '>
					<div className=''>
						<img
							src='/user/Icon_NextOfKin.png'
							alt='Biological Info'
							className=' w-14'
						/>
					</div>
					<div className='my-auto ml-4 text-lg font-bold text-textColor '>
						Account Info - Next of kin
					</div>
				</div>
				<div className='pt-3'>
					<div className=''>
						<DefaultSelectNew
							options={userRelations}
							id='relationship'
							name='relationship'
							placeholder='Relationship next of kin (Required)'
							value={userRelation}
							valueSetter={setUserRelation}
							required
						/>
					</div>
					<div className=''>
						<InputField
							placeholder='First Name'
							value={parentFirstName}
							onChange={(e) => setParentFirstName(e.target.value)}
						/>
					</div>
					<div className=''>
						<InputField
							placeholder='Last Name'
							value={parentLastName}
							onChange={(e) => setParentLastName(e.target.value)}
						/>
					</div>

					<div className=''>
						<MaskedMobile
							required={true}
							setter={setParentMobileNr}
							value={parentMobileNr}
							placeholder='Contact Number'
						/>
					</div>
				</div>
				<div className='flex flex-row justify-start w-full pt-4'>
					<Btn
						label='Save'
						trackingAction='Click on Save Account Info - Next of Kin'
						onClickFunction={accountKin}
						color='bg-themeColorMain'
						width='36'
						padding='px-3 py-2'
					/>
					<Alert
						error={kinError}
						success={kinSuccess}
					/>
				</div>
			</div>
			{/* Next of Kin Info End */}
		</div>
	)
}

export default index
