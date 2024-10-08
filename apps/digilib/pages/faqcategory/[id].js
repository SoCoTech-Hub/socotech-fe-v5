import Head from 'next/head'
import { useRouter } from 'next/router'
// import DigilibHelp from '@/components/DigilibHelp'
import Btn from '@/components/Btn'
// import Faq from '@/components/Faq';
// import getGQLRequest from '@/snippets/getGQLRequest';
import client from '@/api/apolloClient'
import GetFAQCategory from 'graphql/queries/GetFAQCategoryData'
import Accordion from '@/components/Accordion'

const categoryDisplay = ({ category }) => {
	const router = useRouter()

	const seo = {
		title: `Topic - ${category?.name}`,
		description: category?.name,
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

			<div className='space-y-10 gx-5 gy-4'>
				<div className='text-4xl text-textColor'>{category?.name}</div>
				<Btn
					onClickFunction={() => router.back()}
					label='Back'
					color='bg-themeColorMain'
					padding='px-3 py-2'
					width='28'
				/>
				{/* <div className=''>
          <DigilibHelp />
        </div> */}
				<div className='pl-3 pr-3'>
					<Accordion faqs={category?.faqs} />
				</div>
				<div className='mobile:h-16'></div>
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { id } = context.query

	const { data } = await client.query({
		query: GetFAQCategory,
		variables: {
			faqCategoryID: id
		}
	})

	return {
		props: {
			category: data.faqCategory ? data.faqCategory : null
		}
	}
}

export default categoryDisplay
