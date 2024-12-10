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
	id
}) => {
	return (
		<div className='w-16 '>
			<button
				data-tracking-action={trackingAction}
				className={`${color} text-center border-2 ${textColor} ${borderColor} rounded-full w-16 ${textSize} `}
				onClick={onClickFunction}
				id={id}
			>
				{label}
			</button>
		</div>
	)
}
export default BtnSm
