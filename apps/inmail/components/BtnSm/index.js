// import Link from "next/link"

const BtnSm = ({
	label = 'Save',
	// link = "#",
	onClickFunction,
	color = 'current',
	textSize = 'text-xs',
	trackingAction = '',
	textColor = 'text-black',
	borderColor = 'border-none',
	width = 'w-16',
	id
}) => {
	return (
		<button
			data-tracking-action={trackingAction}
			className={`${color} text-center border-2 ${textColor} ${borderColor} rounded-full ${textSize} ${width}`}
			onClick={onClickFunction}
			id={id}
		>
			{label}
		</button>
	)
}
export default BtnSm
