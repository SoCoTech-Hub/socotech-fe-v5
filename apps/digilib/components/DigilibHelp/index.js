import { useState } from 'react'
import { useRouter } from 'next/router'
import { baseUrl } from '@/context/constants'

const index = ({ categories }) => {
	const router = useRouter()
	const [category, setCategory] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const handleSearch = () => {
		if (category.trim() || searchTerm.trim()) {
			router.push({
				pathname: '/search',
				query: { category, name_contains: searchTerm }
			})
		}
	}
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<div className=''>
			<div className='flex flex-row justify-between px-2 py-2 mt-4 shadow-md rounded-xl bg-compBg align-items-center'>
				<div className=''>
					<select
						className='h-8 text-center text-white rounded-lg shadow-md outline-none appearance-none bg-themeColorMain w-36'
						id='dropdown-button'
						data-dropdown-toggle='dropdown'
						type='button'
						placeholder='Category'
						disabled={!categories || categories?.length === 0}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option
							className='text-center bg-compBg text-textColor'
							value={''}
						>
							Category
						</option>
						{categories?.map((category) => (
							<option
								key={category.id}
								className='flex justify-between bg-compBg text-textColor'
								value={category.id}
							>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className='w-full ml-2 col-xs-4 text-textColor'>
					<input
						className='h-10 border-0 shadow-none form-control bg-compBg placeholder-textColor'
						type='text'
						placeholder='Start typing to search...'
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={(e) => handleKeyDown(e)}
					/>
				</div>
				<div className='-mb-1.5'>
					<button
						onClick={() =>
							router.push({
								pathname: '/search',
								query: { category: category, name_contains: searchTerm }
							})
						}
					>
						<div className='w-10 p-1 rounded-full text-textColor'>
							<img
								src={`${baseUrl}/search_icon.svg`}
								alt='Search Icon'
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}

export default index
