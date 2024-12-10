import Head from 'next/head'
import DigilibCategories from '@/components/DigilibCategories'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'

const applications = ({ faculties }) => {
	const seo = {
		title: 'Topic - Applications',
		description: 'Explore Courses at Various South African Universities.',
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
			<div className='w-full desktop:p-4 laptop:p-4 mobile:p-1 card bg-themeColorMain '>
				<div className='space-y-6'>
					<div className='pr-10 mr-24 text-4xl font-bold leading-tight text-black mobile:mr-0 mobile:p-1 mobile:text-xl'>
						Know yourself. Know your future.
						<div className='float-right desktop:hidden laptop:hidden'>
							<img
								src={`${baseUrl}/Application.gif`}
								alt='Welcome Image'
								className='object-contain w-40 mx-2 -my-4'
							/>
						</div>
					</div>
					<div className='mr-28 mobile:mr-0'>
						<p className='py-2 text-xl font-normal leading-tight text-black mobile:text-sm'>
							Explore Courses at Various South African Universities
						</p>
					</div>
				</div>

				<div className='absolute desktop:bottom-5 right-6 mobile:hidden mobile:bottom-0'>
					<img
						src={`${baseUrl}/Application.gif`}
						alt='Welcome Image'
						className='object-contain mx-2 -my-8'
						height={200}
						width={200}
					/>
				</div>
			</div>

			<div className='grid grid-cols-5 gap-3 my-4 mobile:grid-cols-2 place-items-stretch'>
				{faculties?.map((faculty) => (
					<DigilibCategories
						background={faculty?.background?.url}
						// bgColor={faculty?.color}
						svgIcon={faculty?.svgIcon}
						icon={faculty?.icon}
						title={faculty?.name}
						description={faculty?.about}
						id={faculty?.id}
						key={faculty?.id}
						link='applications'
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
		props: { faculties: institutes }
	}
}

export default applications
