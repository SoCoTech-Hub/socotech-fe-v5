import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = '#',
	onClickFunction,
	color = 'current'
}) => {
	if (link.startsWith('http')) {
		return (
			<div className='px-1 w-30'>
				<a href={link}>
					<button
						className={`${color} text-center text-black px-3 py-2 rounded-full w-36 mobile:w-20 text-xs`}
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
					className={`${color} text-center text-black px-3 py-2 rounded-full w-36 mobile:w-20 text-xs`}
					onClick={onClickFunction}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default Btn
