const BtnBig = ({
	label = 'Save',
	link = '#',
	onClick,
	color = 'current',
	disabled = false
}) => {
	return (
		<div className='w-full'>
			<a
				href={link}
				className={`${color} text-center font-bold text-black py-6 w-full rounded-lg d-inline-block`}
				onClick={onClick}
				disabled={disabled}
			>
				{label}
			</a>
		</div>
	)
}
export default BtnBig
