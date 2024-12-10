import DigilibCategories from '@/components/DigilibCategories'
import getGQLRequest from '@/snippets/getGQLRequest'
import PageTitle from '@/components/PageTitle'
import Btn from '@/components/Btn'
import { SEO } from '@/components/SeoHead'

const applications = ({ faculties, university }) => {
	const seo = {
		title: `Topic - ${university.name} Applications`,
		description: 'Explore Courses at Various South African Universities.',
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
				<div className='flex justify-end font-bold desktop:mt-5 laptop:mt-5 mobile:mt-4'>
					<Btn
						label='Back'
						link={`/applications`}
						color='bg-themeColorMain'
					/>
				</div>
				<div className='grid gap-3 desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-3 laptop:grid-cols-3 mobile:grid-cols-1 place-items-stretch'>
					{faculties?.map((faculty) => (
						<DigilibCategories
							background={faculty?.background?.url}
							bgColor={faculty?.color}
							svgIcon={faculty?.svgIcon}
							icon={faculty?.icon}
							title={faculty?.name}
							description={faculty?.about}
							id={faculty?.id}
							key={faculty?.id}
							link={`applications/${university?.id}`}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
export async function getServerSideProps(context) {
	const { university } = context.params
	const { faculties } = await getGQLRequest({
		endpoint: `faculties`,
		fields: `id,name,svgIcon,about,color,icon{id,url},background{id,url}`,
		where: `institutes:{id:${university}}`
	})

	const { institute } = await getGQLRequest({
		endpoint: 'institute',
		fields: 'id, name',
		findOne: true,
		id: university
	})

	return {
		props: { faculties: faculties, university: institute }
	}
}

export default applications
