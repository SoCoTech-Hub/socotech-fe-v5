import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = null,
	onClickFunction,
	color = 'current',
	btnWidth = 'w-36',
	rounded = 'rounded-full',
	textSize = 'text-xs',
	// padding = "p-3",
	paddingX='px-3',
	paddingY='py-2',
	fontWeight = 'normal',
	trackingAction = '',
	disabled = false
}) => {
	const font = `font-${fontWeight}`

	if (link === null) {
		return (
			<div className='px-1 w-30'>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center text-black ${paddingX} ${paddingY} ${rounded} ${btnWidth} ${textSize} ${font}`}
					onClick={onClickFunction}
					disabled={disabled}
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
						disabled={disabled}
						className={`${color} text-center text-black ${paddingX} ${paddingY} ${rounded} ${btnWidth} ${textSize} ${font}`}
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
					className={`${color} text-center text-black ${paddingX} ${paddingY} ${rounded} ${btnWidth} ${textSize} ${font}`}
					onClick={onClickFunction}
					disabled={disabled}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default Btn
