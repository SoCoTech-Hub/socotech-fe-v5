import Link from 'next/link'

const BtnBig = ({
	label = 'Save',
	link = '#',
	onClickFunction,
	color = 'current',
	textSize = 'text-lg',
	trackingAction = '',
	textColor = 'text-textColor',
	borderColor = 'border-none',
	width = 'w-30'
}) => {
	return (
		<div className={`px-1 w-30`}>
			<Link
				href={link}
				passHref
			>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center border-2 ${textColor} ${borderColor} p-3 rounded-full ${width} ${textSize}`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default BtnBig
