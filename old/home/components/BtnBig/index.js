const BtnBig = ({
	label = 'Save',
	link = '#',
	onClick,
	color = 'current',
	width = 'w-full'
}) => {
	return (
		<div className={`${width}`}>
			<a
				href={link}
				className={`${color} text-center text-black py-6 w-full rounded-full d-inline-block`}
				onClick={onClick}
			>
				{label}
			</a>
		</div>
	)
}
export default BtnBig
