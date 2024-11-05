import Loader from '../Loader'
import Card from './card'

const ListView = ({ list, prefix, setItem }) => {
	const sortedList = [...list]?.sort((a, b) => Number(a.id) - Number(b.id))

	const itemList = sortedList ? (
		<div className='grid desktop:grid-cols-5 laptop:grid-cols-4 mobile:grid-cols-3 place-items-stretch'>
			{sortedList.map((item) => (
				<div
					className='m-2'
					key={item.id}
				>
					<Card
						alignment={prefix.length ? true : false}
						title={`${prefix} ${item.name}`}
						setItem={setItem}
						id={parseInt(item.id)}
						color={item?.color}
						icon={item?.icon?.url}
						svgIcon={item.svgIcon}
					/>
				</div>
			))}
		</div>
	) : (
		<Loader />
	)

	return list ? itemList : <Loader />
}

export default ListView
