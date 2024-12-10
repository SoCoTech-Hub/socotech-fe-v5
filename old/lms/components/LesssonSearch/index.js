import { useState } from 'react'
import { baseUrl, organizationId } from '@/context/constants'
import getGQLRequest from '@/snippets/getGQLRequest'

const LessonSearch = ({ categories, setLessons }) => {
	const [category, setCategory] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const date = new Date().toISOString()

	const Search = () => {
		searchTerm ? (
			getGQLRequest({
				endpoint: `lessons`,
				stateSetter: setLessons,
				where: `_or:[{description_contains:"${searchTerm}"}, {name_contains:"${searchTerm}"}],${
					category ? `subjectCategory:{id:${category}},` : ''
				} organization:{id:${organizationId}},published_at_lt:"${date}"`,
				fields: `id,subject{id,name},name,duration,featuredImage{id,url}`,
				sort: `name:asc`
			})
		) : (
			<></>
		)
	}

	return (
		<div className=''>
			<div className='flex flex-row px-2 mt-4 align-middle rounded-lg bg-compBg align-items-center'>
				<div className=''>
					<select
						className='py-1.5 px-4 mr-2 text-textColor rounded-lg bg-digilibWelcomeButton text-center appearance-none outline-none'
						id='dropdown-button'
						data-dropdown-toggle='dropdown'
						type='button'
						placeholder='Select a category'
						disabled={!categories || categories?.length === 0}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option
							className='bg-compBg text-textColor center-text'
							value={''}
						>
							Select a Category
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

				<div className='flex justify-end w-full px-2 border-2 rounded-lg bg-compBg align-items-center'>
					<div className='w-full ml-2 col-xs-4 '>
						<input
							className={`bg-compBg border-0 ml-5 rounded-lg shadow-none  form-control   `}
							type='text'
							placeholder='Start typing to search...'
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<div className='-mb-2.0 flex justify-end'>
						<button onClick={() => Search()}>
							<div className='w-8 h-8 p-1 rounded-full bg-digilibWelcomeButton'>
								<img
									src={`${baseUrl}/search_icon.svg`}
									alt='Search Icon'
								/>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LessonSearch
