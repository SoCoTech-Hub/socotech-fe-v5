import Link from 'next/link'

const BtnLink = ({
	label = 'Save',
	link = '#',
	color = 'current',
	textSize = 'text-xs',
	trackingAction = '',
	textColor = 'text-textColor',
	borderColor = 'border-none'
}) => {
	return (
		<div className='px-1 w-full'>
			{link.startsWith('/') ? (
				<Link
					href={link}
					passHref
				>
					<div
						data-tracking-action={trackingAction}
						className={`${color} text-center ${textSize} ${textColor} border-2 ${borderColor} rounded-full px-3 py-2`}
					>
						{label}
					</div>
				</Link>
			) : link.startsWith('http') ? (
				<a href={link}>
					<div
						data-tracking-action={trackingAction}
						className={`${color} text-center ${textSize} ${textColor} border-2 ${borderColor} rounded-full px-3 py-2`}
					>
						{label}
					</div>
				</a>
			) : (
				<div
					data-tracking-action={trackingAction}
					className={`${color} text-center ${textSize} ${textColor} border-2 ${borderColor} rounded-full px-3 py-2`}
				>
					{label}
				</div>
			)}
		</div>
	)
}
export default BtnLink
