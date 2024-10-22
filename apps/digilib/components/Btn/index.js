import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = null,
	onClickFunction,
	color = 'current',
	width = 'w-36',
	textSize = 'text-xs',
	fontWeight = 'normal',
	trackingAction = ''
}) => {
	const font = fontWeight ? `font-${fontWeight}` : ''

	if (link === null) {
		return (
			<button
				data-tracking-action={trackingAction}
				className={`flex items-center justify-center text-center text-textColor px-3 py-2 rounded-full ${width} ${textSize} ${font} ${color}`}
				onClick={onClickFunction}
			>
				{label}
			</button>
		)
	}
	if (link.startsWith('http')) {
		return (
			<a href={link}>
				<button
					data-tracking-action={trackingAction}
					className={`flex items-center justify-center text-center text-textColor px-3 py-2 rounded-full ${width} ${textSize} ${font} ${color}`}
				>
					{label}
				</button>
			</a>
		)
	}

	return (
		<Link
			href={link}
			passHref
		>
			<button
				className={`flex items-center justify-center text-center text-textColor px-3 py-2 rounded-full ${width} ${textSize} ${font} ${color}`}
				onClick={onClickFunction}
			>
				{label}
			</button>
		</Link>
	)
}

export default Btn
