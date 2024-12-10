import { baseUrl, organizationId } from '@/context/constants'
import { StyledMenu, StyledMenuItem } from './styles'
import { useState } from 'react'
import getGQLRequest from '@/snippets/getGQLRequest'

const index = ({ setQualifications }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [filter, setFilter] = useState('Filter')
	const [search, setSearch] = useState('')
	const [filterList] = useState([
		{
			id: '1',
			name: 'Degree',
			field: 'degree'
		},
		{
			id: '2',
			name: 'Faculty',
			field: 'institution'
		},
		{
			id: '3',
			name: 'Requirements',
			field: 'requirements'
		},
		{
			id: '4',
			name: 'Subjects',
			field: 'subjects'
		},
		{
			id: '5',
			name: 'Title',
			field: 'name'
		}
	])
	const searchQuery = async ({ searchValue }) => {
		filter == 'Filter'
			? setSearch(
					`name_contains:"${searchValue}",organization:{id:${organizationId}}`
			  )
			: filter === 'Subjects'
			? setSearch(searchValue)
			: setSearch(
					filterList.filter((x) => x.name === filter)[0].field +
						`_contains:"${searchValue}",organization:{id:${organizationId}}`
			  )
	}
	const searchResult = async () => {
		if (filter === 'Subjects') {
			const { subjects } = await getGQLRequest({
				endpoint: `subjects`,
				fields: `id`,
				where: `name_contains: "${search}",organization:{id:${organizationId}}`
			})
			await getGQLRequest({
				endpoint: `qualifications`,
				stateSetter: setQualifications,
				where: `subjects:{id:[${subjects.map(
					(x) => x.id
				)}]},organization:{id:${organizationId}}`,
				fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`
			})
		} else {
			await getGQLRequest({
				endpoint: `qualifications`,
				stateSetter: setQualifications,
				where: search,
				fields: `id,name,institution,degree,shortDescription,url,created_at,duration,openDate,closeDate,programmDescription,requirements`
			})
		}
	}
	return (
		<div className='flex flex-row justify-between px-2 mt-4 bg-compBg rounded-lg align-items-center'>
			<div className=''>
				<button
					className='h-8 rounded-full text-textColor bg-digilibWelcomeButton w-36'
					onClick={(e) => setAnchorEl(e.currentTarget)}
				>
					{filter}
				</button>
				<StyledMenu
					id='customized-menu'
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={() => setAnchorEl(null)}
				>
					{filterList.length ? (
						filterList?.map((filter) => {
							return (
								<div key={filter.id}>
									<StyledMenuItem>
										<div className='flex justify-between'>
											<button
												className='mt-2 item'
												onClick={() => {
													setFilter(filter.name), setAnchorEl(null)
												}}
											>
												{filter.name}
											</button>
										</div>
									</StyledMenuItem>
								</div>
							)
						})
					) : (
						<StyledMenuItem>
							<div className='flex justify-between'>Coming Soon</div>
						</StyledMenuItem>
					)}
				</StyledMenu>
			</div>
			<div className='w-full ml-2 col-xs-4'>
				<input
					className='h-10 border-0 shadow-none form-control'
					type='text'
					placeholder='Start typing to search...'
					onChange={(e) => searchQuery({ searchValue: e.target.value })}
				/>
			</div>
			<div className='-mb-1.5'>
				<button onClick={searchResult}>
					<div className='w-8 h-8 p-1 rounded-full bg-digilibWelcomeButton'>
						<img
							src={`${baseUrl}/search_icon.svg`}
							alt='Search Icon'
						/>
					</div>
				</button>
			</div>
		</div>
	)
}
export default index
