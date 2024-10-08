import Link from 'next/link'

const Btn = ({
	label = 'Save',
	link = null,
	onClickFunction = () => console.log('I was clicked'),
	color = 'current',
	trackingAction = '', disabled
}) => {
	if (link === null) {
		return (
			<div className='px-1 w-30'>
				<button
					data-tracking-action={trackingAction}
					className={`${color} text-center text-black text-md font-semibold desktop:px-4 desktop:py-3 laptop:px-4 laptop:py-3 mobile:px-3 mobile:py-2 rounded-full desktop:w-52 laptop:w-48 mobile:w-40`}
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
				<a href={disabled ? '#' : link}>
					<button
						data-tracking-action={trackingAction}
						className={`${color} text-center text-black text-md font-semibold desktop:px-4 desktop:py-3 laptop:px-4 laptop:py-3 mobile:px-3 mobile:py-2 rounded-full desktop:w-52 laptop:w-48 mobile:w-40`}
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
				href={disabled ? '#' : link}
				passHref
			>
				<button
					className={`${color} text-center text-md text-black font-semibold desktop:px-4 desktop:py-3 laptop:px-4 laptop:py-3 mobile:px-3 mobile:py-2 rounded-full desktop:w-52 laptop:w-48 mobile:w-40`}
				>
					{label}
				</button>
			</Link>
		</div>
	)
}
export default Btn
