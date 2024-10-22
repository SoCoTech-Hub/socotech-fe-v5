export const ChevronRightIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={props.stroke || '2'}
		stroke={props.stroke || 'currentColor'}
		className={props.className || 'h-6 w-6'}
		{...props}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='2'
			d='M9 5l7 7-7 7'
		/>
	</svg>
)
