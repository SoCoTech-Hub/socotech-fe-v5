import Btn from '@/components/Btn'
import { SEO } from '@/components/SeoHead'
import ShowsCategories from '@/components/ShowsCategories'
import ShowsWelcome from '@/components/ShowsWelcome'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl } from '@/context/constants'

const ShowsCategory = ({ categories }) => {
	const seo = {
		title: 'Topic- Digital Library Shows',
		description: 'Stay tuned for your favourite shows!'
	}
	const hasImage = categories.some((category) => category?.image?.url)
	return (
		<div className='col row mobile:mb-20'>
			<SEO
				description={seo.description}
				title={seo.title}
			/>

			{hasImage ? (
				<div className='desktop:space-y-5 laptop:space-y-5 mobile:space-y-3'>
					<div className='desktop:block'>
						<ShowsWelcome
							title='Battle of the Brains!'
							description='The Schooled Series Presents Grade 12’s Going Head-to-Head in The Ultimate Trivia Showdown.'
							image={
								<img
									src={`${baseUrl}/episodes.gif`}
									alt='Shows Episodes Image'
									className='object-contain'
									height={100}
									width={100}
								/>
							}
						/>
					</div>

					<div className='grid grid-cols-3 desktop:gap-6 laptop:gap-6 mobile:gap-1 mobile:grid-cols-3 place-items-stretch mobile:overflow-x-scroll mobile:overflow-y-none'>
						{categories?.map((category) => (
							<ShowsCategories
								img={category?.image?.url}
								title={category.name}
								link={`/shows/${category.id}`}
								key={category.id}
							/>
						))}
					</div>
					<div className='flex flex-row flex-wrap justify-between gap-2 p-4'>
						<Btn
							label='Back'
							link='/shows'
							color='bg-themeColorMain'
						/>
					</div>
				</div>
			) : (
				<>
					<img
						src={`${baseUrl}/Shows_ComingSoon.png`}
						alt='Coming Soon'
					/>
					<div className='flex flex-row flex-wrap justify-between gap-2 p-4'>
						<Btn
							label='Back to Shows'
							link='/shows'
							color='bg-themeColorMain'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export async function getServerSideProps(context) {
	const { id } = context.params

	const { shows } = await getGQLRequest({
		endpoint: 'shows',
		fields: 'id,name,image{url}',
		where: `showCategory: { id: ${id} }`
	})
	return {
		props: {
			categories: shows
		}
	}
}

export default ShowsCategory
