import React from 'react'
import Avatar from '@/components/Avatar'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'

const Posted = ({ postedBy, dateCreated, profilePic }) => {
	return (
		<div>
			<div className='flex flex-row '>
				<div className='avatar'>
					<Avatar
						src={profilePic}
						size='56px'
						border={true}
					/>
				</div>
				<div className=''>
					<div className='my-auto ml-4 text-lg font-bold text-textColor'>
						{postedBy}
					</div>
					<div className='my-auto ml-4 text-xs font-bold text-textColor'>
						{getTimeDifferenceFromPostDate(dateCreated)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Posted
