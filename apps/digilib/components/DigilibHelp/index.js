import { useState } from 'react'
import { useRouter } from 'next/router'
import { baseUrl } from '@/context/constants'

const index = ({ categories }) => {
	const router = useRouter()
	const [category, setCategory] = useState('')
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<div className=''>
			<div className='flex flex-row justify-between px-2 mt-4 bg-compBgg rounded-lg align-items-center'>
				<div className=''>
					<select
						className='h-8 text-center rounded-lg outline-none appearance-none text-textColor bg-digilibWelcomeButton w-36'
						id='dropdown-button'
						data-dropdown-toggle='dropdown'
						type='button'
						placeholder='Category'
						disabled={!categories || categories?.length === 0}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option
							className='bg-compBg text-textColor center-text'
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
				<div className='w-full ml-2 col-xs-4'>
					<input
						className='h-10 border-0 shadow-none form-control bg-compBg text-textColor'
						type='text'
						placeholder='Start typing to search...'
						onChange={(e) => setSearchTerm(e.target.value)}
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
