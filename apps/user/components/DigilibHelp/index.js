import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { StyledMenu, StyledMenuItem } from './styles'
import getGQLRequest from '@/snippets/getGQLRequest'
import { baseUrl, organizationId } from '@/context/constants'

const index = () => {
	const router = useRouter()
	const [anchorEl, setAnchorEl] = useState(null)
	const [category, setCategory] = useState('Category')
	const [search, setSearch] = useState('')
	const [categories, setCategories] = useState([])

	useEffect(async () => {
		await getGQLRequest({
			endpoint: `kbCategories`,
			where: `organization:{id:${organizationId}}`,
			stateSetter: setCategories,
			fields: `id,name`
		})
	}, [])

	const searchQuery = ({ searchValue }) => {
		category == 'Category'
			? setSearch(`name_contains=${searchValue}`)
			: setSearch(
					`category=${
						categories[categories.findIndex((item) => item.name == category)]
							?.id
					}&name_contains=${searchValue}`
			  )
	}

	const searchResult = () => {
		router.push(`/search?${search}`)
	}

	return (
		<div className='px-4 py-4 rounded-lg bg-digilibWelcome shadow-menu  '>
			<div className='row'>
				<div className='flex col justify-self-center'>
					<img
						src={`${baseUrl}/digilib_welcome.png`}
						alt='Welcome Image'
						className='p-1 img-fluid'
					/>
				</div>
				<div className='col'>
					<div className='pb-5 pr-3'>
						<div className='pt-3 text-5xl font-bold leading-tight text-digilibWelcomeFont '>
							Hello, how can we help you?
						</div>
						<div className='pt-3 pr-6 '>
							<p className='text-lg break-words text-digilibWelcomeFont '>
								Tell us what you are looking for in the search bar below, select
								a category and we will find what your looking for or select a
								folder below.
							</p>
						</div>
						<div className='flex flex-row justify-between px-2 mt-4 bg-compBg rounded-lg align-items-center'>
							<div className=''>
								<button
									className='h-8 text-lg rounded-full text-textColor bg-digilibWelcomeButton w-36'
									onClick={(e) => setAnchorEl(e.currentTarget)}
								>
									{category}
								</button>
								<StyledMenu
									id='customized-menu'
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={() => setAnchorEl(null)}
								>
									{categories.length ? (
										categories?.map((category) => {
											return (
												<div key={category.id}>
													<StyledMenuItem>
														<div className='flex justify-between'>
															<a
																className='mt-2 item'
																onClick={() => {
																	setCategory(category.name), setAnchorEl(null)
																}}
															>
																{category.name}
															</a>
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
					</div>
				</div>
			</div>
		</div>
	)
}

export default index
