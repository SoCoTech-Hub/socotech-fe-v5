import UploadForum from '@/components/Forum/UploadForum'
import { SEO } from '@/components/SeoHead'

function upload() {
	const seo = {
		title: `Topic - Forum: Create a Topic`,
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
			<UploadForum />
		</>
	)
}
export default upload
