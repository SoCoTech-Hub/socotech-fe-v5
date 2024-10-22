import DisplayForum from '@/components/Forum/DisplayForum'
import { SEO } from '@/components/SeoHead'
import getGQLRequest from '@/snippets/getGQLRequest'

const Home = ({ forums }) => {
	const seo = {
		title: 'Topic - Forum',
		description:
			'Join the conversation and make it a positive space for everyone'
	}
	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
			/>

			<DisplayForum forums={forums} />
		</>
	)
}
export async function getServerSideProps() {
	const { forums } = await getGQLRequest({
		endpoint: 'forums',
		fields:
			'id,slug,name,question,user{profile{firstName,lastName,profilePic{url}}},created_at,updated_at,pin',
		where: 'name_null:false,parentForum_null:true'
	})

	return {
		props: {
			forums: forums
		}
	}
}

export default Home
