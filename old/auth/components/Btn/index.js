import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = null,
	onClickFunction,
	disable = false,
	color = 'current',
	textSize = 'text-xs',
	fontWeight = '',
	trackingAction = '',
	target = '_self'
}) => {
	const font = `font-${fontWeight}`
	const btnWidth = `w-full`

	if (disable === true) {
		return (
			<div className='px-1 cursor-pointer w-30'>
				<button
					data-tracking-action={trackingAction}
					disabled={disable}
					className={`${color} text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
				>
					{label}
				</button>
			</div>
		)
	}

	if (link === null) {
		return (
			<div className='px-1 cursor-pointer w-30'>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</div>
		)
	}

	return (
		<div
			className='px-1 w-30 '
			data-tracking-action={trackingAction}
		>
			{link?.startsWith('http') ? (
				<a
					href={link}
					target={target}
					rel='noreferrer'
					className={`${color} cursor-pointer text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
				>
					{label}
				</a>
			) : (
				<Link
					href={link}
					passHref
				>
					<div
						className={`${color} cursor-pointer text-center text-white px-4 py-2 rounded-md ${btnWidth} ${textSize} ${font}`}
					>
						{label}
					</div>
				</Link>
			)}
		</div>
	)
}
export default Btn
