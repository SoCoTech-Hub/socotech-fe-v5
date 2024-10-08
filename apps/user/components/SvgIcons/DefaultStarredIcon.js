export const DefaultStarredIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			{...props}
		>
			<path
				d='M10 1.8l2.6 5.4 6 .9-4.3 4.2 1 5.9-5.3-2.8-5.3 2.8 1-5.9-4.3-4.2 6-.9z'
				fill='#9aa3b3'
				stroke='#4a5b7a'
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeMiterlimit={10}
			/>
		</svg>
	)
}
