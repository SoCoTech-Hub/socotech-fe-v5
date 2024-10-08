import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = '#',
	onClickFunction,
	color = 'current',
	// width = "28",
	textSize = 'text-xs',
	// padding = "p-3",
	fontWeight = 'normal',
	trackingAction = ''
}) => {
	const font = `font-${fontWeight}`
	const btnWidth = `w-36`

	if (link === null) {
		return (
			<div className='px-1 w-30'>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center text-black px-3 py-2 rounded-full ${btnWidth} ${textSize} ${font}`}
					onClick={onClickFunction}
				>
					{label}
				</button>
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
					className={`${color} text-center text-textColor px-3 py-2 rounded-full ${btnWidth} ${textSize} ${font}`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default Btn
