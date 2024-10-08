import { useTour } from '@reactour/tour'

const Tour = () => {
	const { setIsOpen } = useTour()

	return (
		<div className='px-1 w-30'>
			<button
				data-tracking-action='Click on Take the tour button'
				className={`bg-compBg text-center text-textColor desktop:p-3 laptop:p-1 mobile:p-1 rounded-full desktop:w-60 laptop:w-40 mobile:w-40 desktop:text-lg laptop:text-base mobile:text-sm`}
				onClick={() => setIsOpen(true)}
			>
				Take the tour
			</button>
		</div>
	)
}

export default Tour
