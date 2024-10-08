import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = null,
	onClickFunction,
	color = 'current',
	width = 'w-36',
	textSize = 'text-xs',
	// padding = "p-3",
	fontWeight = 'normal',
	trackingAction = '',
	textColor = 'text-black'
}) => {
	const font = `font-${fontWeight}`
	const btnWidth = width

	if (link === null) {
		return (
			<div className='px-1 w-30'>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center ${textColor} px-3 justify-between py-2 rounded-full ${btnWidth} ${textSize} ${font}`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</div>
		)
	}
	if (link.startsWith('http')) {
		return (
			<div className='px-1 w-30'>
				<a href={link}>
					<button
						data-tracking-action={trackingAction}
						className={`${color} text-center ${textColor} px-3 py-2 rounded-full ${btnWidth} ${textSize} ${font}`}
					>
						{label}
					</button>
				</a>
			</div>
		)
	}

	return (
		<div className='px-1 w-30'>
			<Link
				href={link}
				passHref
			>
				<button
					className={`${color} text-center ${textColor} px-3 py-2 rounded-full ${btnWidth} ${textSize} ${font}`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default Btn
