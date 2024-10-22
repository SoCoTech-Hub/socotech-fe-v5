import DigilibHelp from '@/components/DigilibHelp'
import DigilibCategories from '@/components/DigilibCategories'
import DigilibWelcome from '@/components/DigilibWelcome'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'
import { SEO } from '@/components/SeoHead'

const index = ({ categories, helpCategories }) => {
	const seo = {
		title: 'Digital Library Home Page',
		description: 'Choose from different libraries!'
	}

	return (
		<div className='col row mobile:mb-20'>
			<SEO
				description={seo.description}
				title={seo.title}
			/>

			<div className='flex flex-col desktop:gap-y-5 laptop:gap-y-5 mobile:gap-y-3'>
				<div className='desktop:block'>
					<DigilibWelcome categories={helpCategories} />
				</div>
				<div className='mobile:hidden'>
					<DigilibHelp categories={helpCategories} />
				</div>

				<div className='grid grid-cols-3 my-2 desktop:gap-6 laptop:gap-6 mobile:gap-1 mobile:overflow-x-scroll mobile:overflow-y-none'>
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
		fields: 'id,name,description,image{url},bgColor',
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
