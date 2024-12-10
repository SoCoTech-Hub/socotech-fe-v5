import { useRouter } from 'next/router'
// import DigilibHelp from '@/components/DigilibHelp'
import Btn from '@/components/Btn'
// import Faq from '@/components/Faq';
// import getGQLRequest from '@/snippets/getGQLRequest';
import Accordion from '@/components/Accordion'
import { SEO } from '@/components/SeoHead'
import getGQLRequest from '@/snippets/getGQLRequest'

const FaqDisplay = ({ category }) => {
	const router = useRouter()

	const seo = {
		title: category?.name,
		description: category?.name
	}

	return (
		<div className='col row'>
			<SEO
				description={seo.description}
				title={seo.title}
			/>
			<div className='space-y-10 gx-5 gy-4'>
				<div className='text-4xl text-textColor'>{category?.name}</div>
				<Btn
					onClickFunction={() => router.back()}
					label='Back'
					color='bg-themeColorMain'
					padding='px-3 py-2'
					width='w-28'
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
	const { faqCategory } = await getGQLRequest({
		endpoint: 'faqCategory',
		fields: 'id,name,faqs{id,question,answer}',
		findOne: true,
		id: id
	})

	return {
		props: {
			category: faqCategory
		}
	}
}

export default FaqDisplay
