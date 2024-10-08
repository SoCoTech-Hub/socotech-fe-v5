import DigilibCategories from '@/components/DigilibCategories'
import getGQLRequest from '@/snippets/getGQLRequest'
import PageTitle from '@/components/PageTitle'
import Btn from '@/components/Btn'
import { SEO } from '@/components/SeoHead'
import ContentLock from '@/components/ContentLock'

const bursaries = ({ bursaryCategories, university }) => {
	const seo = {
		title: `Topic - ${university.name} Bursaries`,
		description:
			'Discover Scholarships and Bursaries That Are Looking For Students Like You.',
		image: 'https://lms.topic.co.za/user/logo.png',
		url: 'https://topic.co.za'
	}
	return (
		<div>
			<SEO
				title={seo.title}
				description={seo.description}
				image={seo.image}
				url={seo.url}
			/>
			<div className='w-full mb-5'>
				<PageTitle PageTitle={university.name} />
				<div className='flex justify-end desktop:mt-5 laptop:mt-5 mobile:mt-4'>
					<Btn
						label='Back'
						link={`/bursaries`}
						color='bg-themeColorMain'
					/>
				</div>
				<ContentLock
					bgColor={'bg-themeColorMain'}
					children={
						<>
							<div className='grid gap-3 desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-3 laptop:grid-cols-3 mobile:grid-cols-1 place-items-stretch'>
								{bursaryCategories?.map((bursary) => (
									<DigilibCategories
										bgColor={bursary?.color}
										svgIcon={bursary?.iconSvg}
										icon={bursary?.icon}
										title={bursary?.name}
										description={bursary?.description}
										id={bursary?.id}
										key={bursary?.id}
										link={`bursaries/${university?.id}`}
									/>
								))}
							</div>
						</>
					}
				/>
			</div>
		</div>
	)
}
export async function getServerSideProps(context) {
	const { university } = context.params

	const { bursaryCategories } = await getGQLRequest({
		endpoint: `bursaryCategories`,
		fields: `id,name,iconSvg,description,color,icon{id,url}`,
		where: `institutes:{id:${university}}`
	})

	const { institute } = await getGQLRequest({
		endpoint: 'institute',
		fields: 'id, name',
		findOne: true,
		id: university
	})

	return {
		props: { bursaryCategories: bursaryCategories, university: institute }
	}
}

export default bursaries
