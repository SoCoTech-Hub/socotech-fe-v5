import { useState } from 'react'
import DigilibTable from '@/components/DigilibTable'
import DigilibFilter from '@/components/DigilibFilter'
import { SEO } from '@/components/SeoHead'
import getGQLRequest from '@/snippets/getGQLRequest'
import { orgName } from '@/context/constants'

const categoryDisplay = ({ filters, articles, category, organizationId }) => {
	const [articleList, setArticleList] = useState(articles)

	const seo = {
		title: `${orgName} - ${category?.name}`,
		description: category?.name
	}

	return (
		<div className='col row'>
			<SEO
				description={seo.description}
				title={seo.title}
			/>

			<div className='space-y-10 gx-5 gy-4 mobile:px-1'>
				{articleList?.length > 0 && (
					<div className=''>
						<DigilibFilter
							articleList={articleList}
							setArticleList={setArticleList}
							organizationId={organizationId}
							categoryId={category?.id}
						/>
					</div>
				)}
				<div className=''>
					<DigilibTable
						articles={articleList}
						category={category}
						filters={filters}
					/>
				</div>
				<div className='mobile:h-16' />
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	const { id } = context.query
	const { organizationId } = context.req.cookies

	const { knowledgeBases } = await getGQLRequest({
		endpoint: 'knowledgeBases',
		fields:
			// 'id,link,name,topics{id,name},categories{id,name},language,releaseYear,subject{id,name},grades{id,name}',
			'id,link,name,categories{id,name},language,releaseYear,subject{id,name},grades{id,name}',
		where: `categories: ${id},organization: { id: ${organizationId} }`
	})

	const { kbCategory } = await getGQLRequest({
		endpoint: 'kbCategory',
		fields: 'id,name',
		findOne: true,
		id: id
	})

	return {
		props: {
			articles: knowledgeBases,
			filters: [],
			category: kbCategory,
			organizationId: organizationId ? organizationId : null
		}
	}
}

export default categoryDisplay
