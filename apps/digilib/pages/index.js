import Head from 'next/head'
import DigilibHelp from '@/components/DigilibHelp'
import DigilibCategories from '@/components/DigilibCategories'
import DigilibWelcome from '@/components/DigilibWelcome'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'

const index = ({ categories, helpCategories }) => {
	const seo = {
		title: 'Topic - Digital Library Home Page',
		description: 'Choose from different libraries!',
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
					<DigilibWelcome categories={helpCategories} />
				</div>
				<div className='desktop:hidden laptop:hidden mobile:hidden'>
					<DigilibHelp categories={helpCategories} />
				</div>

				<div className='grid grid-cols-3 desktop:gap-6 laptop:gap-6 mobile:gap-1 mobile:grid-cols-3 place-items-stretch mobile:overflow-x-scroll mobile:overflow-y-none'>
					{categories?.map((category) => (
						<DigilibCategories
							img={category?.image?.url}
							background={category?.background?.url}
							title={category.name}
							description={category.description}
							link={`/category/${category.id}`}
							key={category.id}
							bgColor={category.bgColor}
						/>
					))}
					<DigilibCategories
						img={`${baseUrl}/FAQIcon.png`}
						background={`${baseUrl}/FAQBG.png`}
						title="FAQ's"
						description="The wonderful world of FAQ's"
						link={`/faqcategory`}
					/>
				</div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const organizationId = context.req.cookies['organizationId']

	const { kbCategories } = await getGQLRequest({
		endpoint: 'kbCategories',
		fields: 'id,name,description,image{url},bgColor,background{url}',
		where: `organization: { id: ${organizationId} }`
	})

	return {
		props: {
			categories: kbCategories,
			helpCategories: kbCategories
				? kbCategories.map((x) => ({
						id: parseInt(x.id),
						name: x.name
				  }))
				: null
		}
	}
}

export default index
