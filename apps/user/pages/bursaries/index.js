import Head from 'next/head'
import DigilibCategories from '@/components/DigilibCategories'
import getGQLRequest from '@/snippets/getGQLRequest'
import PageTitle from '@/components/PageTitle'
import Link from 'next/link'
import { baseUrl } from '@/context/constants'

const bursaries = ({ bursaryCategories }) => {
	const seo = {
		title: 'Topic - Bursaries',
		description:
			'Discover Scholarships and Bursaries That Are Looking For Students Like You.',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}
	return (
		<div>
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
			<div className='w-full p-4 card mobile:p-1 mobile:mb-5 bg-themeColorMain'>
				<div className='space-y-6'>
					<div className='pr-10 mr-24 text-4xl font-bold leading-tight text-black mobile:mr-0 mobile:p-1 mobile:text-xl'>
						Your Future Is Bright, Bright Like A Diamond.
						<div className='float-right desktop:hidden laptop:hidden'>
							<img
								src={`${baseUrl}/bursaries_banner.gif`}
								alt='Welcome Image'
								className='object-contain w-16 mx-2'
							/>
						</div>
					</div>
					<div className='mr-28 mobile:p-1 mobile:mr-0'>
						<p className='py-2 text-xl font-normal leading-tight text-black mobile:text-sm'>
							Discover Scholarships and Bursaries That Are Looking For Students
							Like You.
						</p>
					</div>
				</div>

				<div className='absolute bottom-5 right-10 mobile:hidden'>
					<img
						src={`${baseUrl}/bursaries_banner.gif`}
						alt='Welcome Image'
						className='object-contain mx-2'
						height={120}
						width={120}
					/>
				</div>
			</div>

			<div className='grid grid-cols-5 gap-3 my-4 mobile:grid-cols-2 place-items-stretch'>
				{bursaryCategories?.map((bursary) => (
					<DigilibCategories
						// bgColor={bursary?.color}
						svgIcon={bursary?.svgIcon}
						icon={bursary?.icon}
						title={bursary?.name}
						description={bursary?.description}
						id={bursary?.id}
						key={bursary?.id}
						link='bursaries'
					/>
				))}
			</div>
		</div>
	)
}
export async function getServerSideProps() {
	const { institutes } = await getGQLRequest({
		endpoint: `institutes`,
		fields: `id,name,svgIcon,color,icon{id,url},background{id,url},logo{id,url}`
	})

	return {
		props: { bursaryCategories: institutes }
	}
}

export default bursaries
