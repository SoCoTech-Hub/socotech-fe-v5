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
	// Compose classes based on props
	const btnClasses = `flex items-center justify-center text-center text-textColor px-3 py-2 rounded-full ${width} ${textSize} font-${fontWeight} ${color}`

	// Render button without link
	if (!link) {
		return (
			<button
				data-tracking-action={trackingAction}
				className={btnClasses}
				onClick={onClickFunction}
				aria-label={label}
			>
				{label}
			</button>
		)
	}

	// Render anchor link for external URLs
	if (link.startsWith('http')) {
		return (
			<a
				href={link}
				aria-label={label}
			>
				<button
					data-tracking-action={trackingAction}
					className={btnClasses}
				>
					{label}
				</button>
			</a>
		)
	}

	// Render Next.js Link for internal routes
	return (
		<Link
			href={link}
			passHref
		>
			<button
				className={btnClasses}
				onClick={onClickFunction}
				aria-label={label}
			>
				{label}
			</button>
		</Link>
	)
}

export default Btn
