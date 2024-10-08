import React from 'react'

function Message(messageBody) {
	return {
		__html: `${messageBody}`
	}
}

const HTMLMessage = ({ body }) => {
	return (
		<div className='pb-4 mt-4'>
			<div
				dangerouslySetInnerHTML={Message(body)}
				className='text-xs '
			/>
		</div>
	)
}

export default HTMLMessage
