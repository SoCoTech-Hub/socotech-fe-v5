import Link from 'next/link'

const BtnBig = ({
	label = 'Save',
	link = '',
	onClick,
	color = 'bg-current',
	textSize = 'text-lg',
	trackingAction = '',
	textColor = 'text-textColor',
	borderColor = 'border-none',
	width = 'w-60',
	disabled = false
}) => {
	return (
		<div className='px-1'>
			{link ? (
				<Link
					href={link}
					passHref
				>
					<button
						data-tracking-action={trackingAction}
						className={`${color} text-center border-2 ${textColor} ${borderColor} p-3 rounded-md ${width} ${textSize}`}
					>
						{label}
					</button>
				</Link>
			) : (
				<button
					type='button'
					disabled={disabled}
					data-tracking-action={trackingAction}
					className={`${color} text-center border-2 ${textColor} ${borderColor} p-3 rounded-md ${width} ${textSize}`}
					onClick={onClick}
				>
					{label}
				</button>
			)}
		</div>
	)
}

export default BtnBig
