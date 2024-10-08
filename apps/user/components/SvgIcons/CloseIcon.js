export const CloseIcon = (props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 30 30'
			{...props}
		>
			<path
				d='M12.8 10.9l1.2 1.8c.3.5.6.9.9 1.4h.1c.3-.5.6-1 .9-1.4l1.2-1.8h1.7L15.9 15l3 4.4H17l-1.3-1.9-.9-1.5-.9 1.5-1.2 1.9H11l3-4.4-2.9-4.2h1.7z'
				fill='#000'
			/>
			<circle
				cx={14.8}
				cy={15}
				r={10}
				fill='none'
				stroke='#000'
				strokeMiterlimit={10}
			/>
		</svg>
	)
}
