import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = '#',
	onClickFunction,
	color = 'current',
	textSize = 'text-xs',
	trackingAction = '',
	textColor = 'text-black',
	borderColor = 'border-none',
	width = 'w-36'
}) => {
	return (
		<div className='px-1 w-30'>
			<Link
				href={link}
				passHref
			>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center border-1 ${textColor} ${borderColor} px-3 py-2 rounded-full ${width} ${textSize}`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default Btn
