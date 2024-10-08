import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = '#',
	onClickFunction,
	color = 'current',
	width = '28',
	textSize = 'text-xs',
	padding = 'p-3',
	trackingAction = ''
}) => {
	return (
		<div className='px-1 w-30'>
			<Link
				href={link}
				passHref
			>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center text-black ${padding} rounded-full w-${width} ${textSize} btnAnim`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default Btn
