import React from 'react'
import ReadMore from '../ReadMore'

const PostDescription = ({ postDescription }) => {
	return (
		<div>
			<div className='text-textColor'>
				<ReadMore text={postDescription} />
			</div>
		</div>
	)
}

export default PostDescription
