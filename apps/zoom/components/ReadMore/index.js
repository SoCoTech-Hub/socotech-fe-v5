import React, { useState } from 'react'

const ReadMore = ({ text }) => {
	const [isReadMore, setIsReadMore] = useState(true)
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore)
	}
	return (
		<>
			{/* <div dangerouslySetInnerHTML={{ __html: text }}></div> */}
			<p className='leading-normal '>
				{isReadMore ? text.slice(0, 150) : text}
				{text.length >= 150 ? (
					<button
						onClick={toggleReadMore}
						className='ml-2 font-bold text-textColor read-or-hide'
					>
						{isReadMore ? 'See more' : 'See less'}
					</button>
				) : (
					<></>
				)}
			</p>
		</>
	)
}

export default ReadMore
