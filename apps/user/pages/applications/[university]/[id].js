import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Scrollbars } from 'react-custom-scrollbars'
// import ApplicationsTour from '@/components/ApplicationsTour'
// import ApplicationFilter from '@/components/ApplicationFilter'
import ApplicationsListing from '@/components/ApplicationsListing'
import ApplicationsPost from '@/components/ApplicationsPost'
import { profileId } from '@/context/constants'
import Modal from '@/components/Modal'
import Btn from '@/components/Btn'
import PageTitle from '@/components/PageTitle'
import getGQLRequest from '@/snippets/getGQLRequest'
import getSelectedQualification from '@/snippets/user/getSelectedQualification'
import Overlay from '@/components/Overlay'

export default function application({
	qualificationsArr,
	faculty,
	universityId
}) {
	const [selectedId, setSelectedId] = useState(null)
	const [selected, setSelected] = useState({})
	const [numberOfApplications, setNumberOfApplications] = useState(0)
	const [loading, setLoading] = useState(true)

	useEffect(async () => {
		setLoading(true)
		setSelected({})
		setSelectedId(null)
		if (qualificationsArr.length) {
			let resultData = await getSelectedQualification({
				qualificationId: qualificationsArr[0].id,
				selectedId: selectedId
			})
			setSelected(resultData.selected)
			setNumberOfApplications(resultData.numberOfApplicants)
		} else {
			setSelected({})
			setNumberOfApplications(0)
			setSelectedId(null)
		}
		setLoading(false)
	}, [qualificationsArr])
	useEffect(async () => {
		setLoading(true)
		if (qualificationsArr.length) {
			let resultData = await getSelectedQualification({
				qualificationId: qualificationsArr[0].id,
				selectedId: selectedId
			})
			setSelected(resultData.selected)
			setNumberOfApplications(resultData.numberOfApplicants)
		} else {
			setSelected({})
			setNumberOfApplications(0)
			setSelectedId(null)
		}
		setLoading(false)
	}, [selectedId])

	const seo = {
		title: `Topic - ${faculty?.name}`,
		description: 'Explore Courses at Various South African Universities.',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<div className='col row no-pad'>
			<Head>
				<title>{seo.title}</title>
				<meta
					name='title'
					content={seo.title}
				/>
				<meta
					name='description'
					content={seo.description}
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content={seo.url}
				/>
				<meta
					property='og:title'
					content={seo.title}
				/>
				<meta
					property='og:description'
					content={seo.description}
				/>
				<meta
					property='og:image'
					content={seo.image}
				/>
				<meta
					property='twitter:card'
					content='summary_large_image'
				/>
				<meta
					property='twitter:url'
					content={seo.url}
				/>
				<meta
					property='twitter:title'
					content={seo.title}
				/>
				<meta
					property='twitter:description'
					content={seo.description}
				/>
				<meta
					property='twitter:image'
					content={seo.image}
				/>
			</Head>
			<div className='w-full'>
				<PageTitle PageTitle={faculty?.name} />

				<div className=''>
					<div className='flex justify-end w-full my-4'>
						<Btn
							label='Back'
							color='bg-themeColorMain'
							link={`/applications/${universityId}`}
						/>
					</div>
					{/* <ApplicationFilter
						qualifications={qualifications}
						setQualifications={setQualifications}
						organizationId={organizationId}
						faculty={faculty}
					/> */}
				</div>
				<div className='desktop:hidden laptop:hidden'>
					<Overlay
						isOpen={selectedId}
						setOpen={setSelectedId}
						bgColor='compBg'
						width={'full'}
						height={58}
						onClose={() => setSelectedId(false)}
						content={
							<>
								<ApplicationsPost
									loading={loading}
									qualificationUrl={selected.url}
									qualificationId={selected.id}
									profileId={profileId}
									courseTitle={selected.name}
									companyDescription={selected.institution}
									timePosted={selected.updated_at}
									numberOfApplicants={numberOfApplications}
									positionTitle={
										selected.duration && selected.degree
											? selected.duration + '  -  ' + selected.degree
											: ''
									}
									fieldDescription={
										selected.openDate && selected.closeDate
											? selected.openDate + '  -  ' + selected.closeDate
											: 'Date: TBC'
									}
									topDescription={selected.programmDescription}
									requirementsDescription={selected.requirements}
									compareDescription={null}
									responsibilitiesDescription={null}
									applicationFeatureImage={
										faculty?.icon ? faculty?.icon : '/user/Icon_School.png'
									}
									bgColor={faculty?.color}
									svgIcon={faculty?.svgIcon}
									setSelection={setSelectedId}
								/>
							</>
						}
					/>
				</div>

				{qualificationsArr?.length > 0 && (
					<div className='flex p-3 divide-x rounded-lg bg-compBg shadow-menu'>
						<div
							className='grid grid-cols-1 space-y-2 divide-y shadow-inner desktop:w-1/3 laptop:w-1/3 mobile:hidden no-scrolly'
							id='scrollplz'
						>
							<Scrollbars
								style={{ height: '600px' }}
								renderThumbVertical={({ style, ...props }) => (
									<div
										{...props}
										style={{ ...style, backgroundColor: '#D6F379' }}
									/>
								)}
							>
								{qualificationsArr.map((item) => (
									<div key={item.id}>
										<ApplicationsListing
											id={item.id}
											courseTitle={item.name}
											courseCompanyName={item.institution}
											courseDescription={item.shortDescription}
											applicationFeatureImage={
												faculty?.icon ? faculty?.icon : '/user/Icon_School.png'
											}
											bgColor={faculty?.color}
											svgIcon={faculty?.svgIcon}
											setSelection={setSelectedId}
										/>
									</div>
								))}
							</Scrollbars>
						</div>
						<div
							className='grid grid-cols-1 space-y-2 divide-y mobile:w-full desktop:hidden laptop:hidden no-scrolly'
							id='scrollplz'
						>
							{qualificationsArr.map((item) => (
								<div key={item.id}>
									<ApplicationsListing
										id={item.id}
										courseTitle={item.name}
										courseCompanyName={item.institution}
										courseDescription={item.shortDescription}
										applicationFeatureImage={
											faculty?.icon ? faculty?.icon : '/user/Icon_School.png'
										}
										bgColor={faculty?.color}
										svgIcon={faculty?.svgIcon}
										setSelection={setSelectedId}
									/>
								</div>
							))}
						</div>
						<div
							className='desktop:w-2/3 mobile:w-1/2 laptop:w-2/3 mobile:hidden no-scrolly'
							id='scrollplz'
						>
							<Scrollbars
								style={{ height: '600px' }}
								renderThumbVertical={({ style, ...props }) => (
									<div
										{...props}
										style={{ ...style, backgroundColor: '#D6F379' }}
									/>
								)}
							>
								{selected && (
									<ApplicationsPost
										loading={loading}
										qualificationUrl={selected.url}
										qualificationId={selected.id}
										profileId={profileId}
										courseTitle={selected.name}
										companyDescription={selected.institution}
										timePosted={selected.created_at}
										numberOfApplicants={numberOfApplications}
										positionTitle={
											selected.duration && selected.degree
												? selected.duration + '  -  ' + selected.degree
												: ''
										}
										fieldDescription={
											selected.openDate && selected.closeDate
												? selected.openDate + '  -  ' + selected.closeDate
												: 'Date: TBC'
										}
										topDescription={selected.programmDescription}
										requirementsDescription={selected.requirements}
										compareDescription={null}
										responsibilitiesDescription={null}
										applicationFeatureImage={
											faculty?.icon ? faculty?.icon : '/user/Icon_School.png'
										}
										bgColor={faculty?.color}
										svgIcon={faculty?.svgIcon}
									/>
								)}
							</Scrollbars>
						</div>
					</div>
				)}

				{qualificationsArr?.length === 0 && !loading && (
					<div
						align='center'
						className='text-white'
					>
						No Qualifications found
					</div>
				)}
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { university, id } = context.params

	const { qualifications } = await getGQLRequest({
		endpoint: `qualifications`,
		where: `faculties:{id: ${id},institutes:{id:${university}}}`,
		fields: `id,name,institution,shortDescription,university{logo{url}},degree,subjects{id,name}`
	})
	const { faculty } = await getGQLRequest({
		endpoint: `faculty`,
		id: id,
		findOne: true,
		fields: `id,name,color,svgIcon,icon{id,url}`
	})

	return {
		props: {
			qualificationsArr: qualifications,
			faculty: faculty,
			universityId: university
		}
	}
}
