import UploadForum from '@/components/Forum/UploadForum'
import { SEO } from '@/components/SeoHead'
import { orgName } from '@/context/constants'

function upload() {
	const seo = {
		title: `${orgName} - Forum: Create a Topic`,
		description:
			'Join the conversation and make it a positive space for everyone'
	}
	return (
		<>
			<SEO
				title={seo.title}
				description={seo.description}
			/>
			<UploadForum />
		</>
	)
}
export default upload
