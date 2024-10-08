import ListView from './listView'

const List = ({ categories = [], setItem, prefix }) => {
	return (
		<div className='w-full rounded-lg desktop:p-4 laptop:p-4 mobile:p-1 bg-compBg mobile:grid mobile:grid-cols-1 shadow-menu laptop:mb-4'>
			<div className='space-y-3 desktop:mt-3 laptop:mt-3 mobile:mt-0 text-textColor '>
				{ListView({
					list: categories,
					prefix: prefix,
					setItem: setItem
				})}
			</div>
		</div>
	)
}

export default List
