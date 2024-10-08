import Head from 'next/head'
import { useRouter } from 'next/router'
import Btn from '@/components/Btn'
// import DigilibHelp from '@/components/DigilibHelp'
// import DigilibWelcome from '@/components/DigilibWelcome'
import DigilibCategories from '@/components/DigilibCategories'
import client from '@/api/apolloClient'
import GetFAQCategories from 'graphql/queries/GetFAQCategories'

const Home = ({ categories }) => {
	const router = useRouter()

	const seo = {
		title: 'Topic - Digital Library FAQs',
		description: "Choose from different FAQ's!",
		image: 'https://lms.topic.co.za/digilib/logo.png',
		url: 'https://topic.co.za'
	}

	return (
		<div className='col row'>
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

			<div className='space-y-10 gx-5 desktop:gy-4'>
				<div className='text-4xl font-bold text-textColor'>
					Frequently Asked Questions
				</div>
				<Btn
					onClickFunction={() => router.back()}
					label='Back'
					color='bg-themeColorMain'
					padding='px-3 py-2'
					width='28'
				/>
				{/* <div className='mobile:hidden desktop:block'>
        <DigilibWelcome />
      </div> */}
				{/* <div className='desktop:hidden laptop:hidden mobile:block'>
        <DigilibHelp />
      </div> */}
				<div className='grid gap-2 mb-5 desktop:grid-cols-3 laptop:grid-cols-2 mobile:grid-cols-2 place-items-stretch'>
					{categories?.map((category) => (
						<DigilibCategories
							img={category?.image?.url}
							background={category?.background?.url}
							title={category.name}
							description={category.description}
							link={`/faqcategory/${category.id}`}
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
	const { data } = await client.query({
		query: GetFAQCategories,
		variables: {
			orgID: organizationId
		}
	})

	return {
		props: { categories: data.faqCategories ? data.faqCategories : null }
	}
}

export default Home
