import DisplayForum from '@/components/Forum/DisplayForum'
import { SEO } from '@/components/SeoHead'
import getGQLRequest from '@/snippets/getGQLRequest'

const Home = ({ forums }) => {
	const seo = {
		title: 'Topic - Forum',
		description:
			'Join the conversation and make it a positive space for everyone',
		image: 'https://lms.topic.co.za/forum/logo.png',
		url: 'https://topic.co.za'
	}
	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
				image={seo.image}
				url={seo.url}
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
		where: 'name_null:false'
	})

	return {
		props: {
			forums: forums
		}
	}
}

export default Home
