import classnames from 'classnames'
import { usePagination, DOTS } from '@/snippets/usePagination'
const Pagination = (props) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className
	} = props

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	})

	if (currentPage === 0 || paginationRange.length < 2) {
		return null
	}

	const onNext = () => {
		onPageChange(currentPage + 1)
	}

	const onPrevious = () => {
		onPageChange(currentPage - 1)
	}

	const itemClasses = 'pagination-item cursor-pointer my-2'

	let lastPage = paginationRange[paginationRange.length - 1]
	return (
		<div
			className={classnames(
				'pagination-container flex items-center space-x-5',
				{
					[className]: className
				}
			)}
		>
			<div
				className={classnames(itemClasses, {
					disabled: currentPage === 1
				})}
				onClick={onPrevious}
			>
				<div className='arrow left' />
			</div>
			{paginationRange.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return (
						<div
							key={index}
							className='pagination-item dots'
						>
							&#8230;
						</div>
					)
				}

				return (
					<div
						key={index}
						className={`${itemClasses} ${
							pageNumber == currentPage?'text-black bg-themeColorMain px-2 py-1 rounded-full':'text-themeColorMain'
						}`}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</div>
				)
			})}
			<div
				className={classnames(itemClasses, {
					disabled: currentPage === lastPage
				})}
				onClick={onNext}
			>
				<div className='arrow right' />
			</div>
		</div>
	)
}

export default Pagination
