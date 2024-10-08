import Clamp from 'react-multiline-clamp'
import { Text } from '@/context/constants'

const PostDescription = ({ postDescription }) => {
	return (
		<div className={`mt-1  body-text  line-clamp-3 ${Text}`}>
			<Clamp lines={3}>
				<div
					className=''
					dangerouslySetInnerHTML={{ __html: postDescription }}
				/>
			</Clamp>
		</div>
	)
}

export default PostDescription
