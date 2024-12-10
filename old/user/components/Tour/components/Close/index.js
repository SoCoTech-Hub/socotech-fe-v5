import React from 'react'

export const Close = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{
				position: 'absolute',
				right: -10,
				top: -10,
				color: 'black',
				backgroundColor: '#D6F379',
				padding: '0.2rem 0.5rem',
				borderRadius: '9999px'
			}}
		>
			x
		</button>
	)
}
