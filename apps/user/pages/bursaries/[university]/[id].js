import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Scrollbars } from 'react-custom-scrollbars'
import getGQLRequest from '@/snippets/getGQLRequest'
import BursaryTour from '@/components/BursaryTour'
import BursaryListing from '@/components/BursaryListing'
import BursaryPost from '@/components/BursaryPost'
import getSelectedBursary from '@/snippets/user/getSelectedBursary'
import Modal from '@/components/Modal'
import { profileId } from '@/context/constants'
import PageTitle from '@/components/PageTitle'
import Btn from '@/components/Btn'
import router from 'next/router'
import Overlay from '@/components/Overlay'

export default function bursary({
	universityId,
	bursariesArr,
	bursaryCategory
}) {
	const [bursaries] = useState(bursariesArr ? bursariesArr : [])
	const [selectedId, setSelectedId] = useState(null)
	const [selected, setSelected] = useState({})
	const [loading, setLoading] = useState(true)
	const [numberOfApplications, setNumberOfApplications] = useState(0)

	useEffect(async () => {
		setLoading(true)
		setSelected({})
		setSelectedId(null)
		if (bursaries.length) {
			let resultData = await getSelectedBursary({
				bursaryId: bursaries[0].id,
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
	}, [bursaries])
	useEffect(async () => {
		setLoading(true)
		if (bursaries.length) {
			let resultData = await getSelectedBursary({
				bursaryId: bursaries[0].id,
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
		title: `Topic - ${bursaryCategory?.name}`,
		description:
			'Discover Scholarships and Bursaries That Are Looking For Students Like You.',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}
	return (
		<div className=' col row'>
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
				<PageTitle PageTitle={bursaryCategory?.name} />
				<div className='flex justify-end my-4 font-bold'>
					<Btn
						label='Back'
						link={`/bursaries/${universityId}`}
						color='bg-themeColorMain'
					/>
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
								<BursaryPost
									loading={loading}
									courseTitle={selected.name}
									companyDescription={bursaryCategory?.name}
									timePosted={selected.created_at}
									open={selected.open}
									close={selected.close}
									whoQualifies={selected.whoQualifies}
									application={selected.application}
									particulars={selected.particulars}
									notes={selected.note}
									value={selected.value}
									iconSvg={bursaryCategory?.iconSvg}
									bgColor={bursaryCategory?.color}
									applicationFeatureImage={
										bursaryCategory?.icon
											? bursaryCategory?.icon
											: '/user/Icon_School.png'
									}
									setSelection={setSelectedId}
									numberOfApplicants={numberOfApplications}
									bursaryUrl={selected.url}
									bursaryId={selected.id}
									profileId={profileId}
								/>
							</>
						}
					/>
				</div>

				{bursaries?.length > 0 && (
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
								{bursaries.map((item) => (
									<div key={item.id}>
										<BursaryListing
											id={item.id}
											courseTitle={item.name}
											courseCompanyName={bursaryCategory?.name}
											courseDescription={item.whoQualifies}
											applicationFeatureImage={
												bursaryCategory?.icon
													? bursaryCategory?.icon
													: '/user/Icon_School.png'
											}
											bgColor={bursaryCategory?.color}
											iconSvg={bursaryCategory?.iconSvg}
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
							<Scrollbars
								style={{ height: '600px' }}
								renderThumbVertical={({ style, ...props }) => (
									<div
										{...props}
										style={{ ...style, backgroundColor: '#D6F379' }}
									/>
								)}
							>
								{bursaries.map((item) => (
									<div key={item.id}>
										<BursaryListing
											id={item.id}
											courseTitle={item.name}
											courseCompanyName={bursaryCategory?.name}
											courseDescription={item.whoQualifies}
											applicationFeatureImage={
												bursaryCategory?.icon
													? bursaryCategory?.icon
													: '/user/Icon_School.png'
											}
											bgColor={bursaryCategory?.color}
											iconSvg={bursaryCategory?.iconSvg}
											setSelection={setSelectedId}
										/>
									</div>
								))}
							</Scrollbars>
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
									<BursaryPost
										loading={loading}
										courseTitle={selected.name}
										companyDescription={bursaryCategory?.name}
										timePosted={selected.updated_at}
										open={selected.open}
										close={selected.close}
										whoQualifies={selected.whoQualifies}
										application={selected.application}
										particulars={selected.particulars}
										notes={selected.note}
										value={selected.value}
										iconSvg={bursaryCategory?.iconSvg}
										bgColor={bursaryCategory?.color}
										applicationFeatureImage={
											bursaryCategory?.icon
												? bursaryCategory?.icon
												: '/user/Icon_School.png'
										}
										numberOfApplicants={numberOfApplications}
										bursaryUrl={selected.url}
										bursaryId={selected.id}
										profileId={profileId}
									/>
								)}
							</Scrollbars>
						</div>
					</div>
				)}

				{bursaries?.length === 0 && !loading && (
					<div align='center'>No Bursaries found</div>
				)}
			</div>
		</div>
	)
}
export async function getServerSideProps(context) {
	const { university, id } = context.params

	const { bursaries } = await getGQLRequest({
		endpoint: `bursaries`,
		where: `bursaryCategories:{id: ${id},institutes:{id:${university}}}`,
		fields: `id,name,whoQualifies,bursaryCategories{id,name},open,close,application,particulars,value,note,created_at`
	})
	const { bursaryCategory } = await getGQLRequest({
		endpoint: `bursaryCategory`,
		findOne: true,
		id: id,
		fields: `id,name,color,iconSvg,icon{id,url}`
	})

	return {
		props: {
			bursariesArr: bursaries,
			bursaryCategory: bursaryCategory,
			universityId: university
		}
	}
}
