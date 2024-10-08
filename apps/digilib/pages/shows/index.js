import Head from 'next/head'
import ShowsCategories from '@/components/ShowsCategories'
import ShowsWelcome from '@/components/ShowsWelcome'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'

const index = ({ categories }) => {
	const seo = {
		title: 'Topic - Digital Library Shows',
		description: 'Stay tuned for your favourite shows!',
		image: 'https://lms.topic.co.za/digilib/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<div className='col row mobile:mb-20'>
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

			<div className='desktop:space-y-5 laptop:space-y-5 mobile:space-y-3'>
				<div className=' desktop:block'>
					<ShowsWelcome
						title="Topic's Spotlight!"
						description='Our Captivating Shows and Original Content'
						image={
							<img
								src={`${baseUrl}/shows.gif`}
								alt='Shows Welcome Image'
								className='object-contain'
								height={150}
								width={150}
							/>
						}
					/>
				</div>

				<div className='grid grid-cols-3 desktop:gap-6 laptop:gap-6 mobile:gap-1 mobile:grid-cols-3 mobile:overflow-x-scroll mobile:overflow-y-none'>
					{categories?.map((category) => (
						<ShowsCategories
							img={category?.image?.url}
							title={category.name}
							link={`/shows/category/${category.id}`}
							key={category.id}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const organizationId = context.req.cookies['organizationId']

	const { showCategories } = await getGQLRequest({
		endpoint: 'showCategories',
		fields: 'id,name,image{url}',
		where: `organization: { id: ${organizationId} }`
	})

	return {
		props: {
			categories: showCategories
		}
	}
}

export default index
