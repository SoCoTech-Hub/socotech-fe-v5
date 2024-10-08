// import FilterDropdown from "@/components/FilterDropdown"
// import { useAppContext } from '@/context/AppContext'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import DigilibLoad from '@/components/DigilibLoad'
import Btn from '@/components/Btn'
import { profileId } from '@/context/constants'
import { useRouter } from 'next/router'
import getDataRequest from '@/snippets/getDataRequest'
import Pagination from '@/components/Pagination'

const index = ({
	articles,
	category
	// filters,
}) => {
	// const { state } = useAppContext()
	const [loading, setLoading] = useState(false)
	const [progresses, setReads] = useState([])
	let pageSize = 10
	const [currentPage, setCurrentPage] = useState(1)

	const router = useRouter()
	useEffect(async () => {
		await getDataRequest(
			`/kb-reads?kbCategory=${category.id}&profile=${profileId}`,
			setReads
		)
	}, [])

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize
		const lastPageIndex = firstPageIndex + pageSize
		return articles?.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, articles])
	useEffect(() => {
		setCurrentPage(1)
	}, [articles])

	return (
		<div className='overflow-hidden rounded-lg shadow-md bg-compBg'>
			<div className='flex justify-between desktop:gap-5 mobile:gap-2'>
				<div className='pt-4 pb-3 pl-8 text-lg text-textColor mobile:pl-4'>
					{category?.name}
				</div>
				<div className='mt-3 mr-6'>
					<div className='buttonHover'>
						<Btn
							onClickFunction={() => router.back()}
							label='Back'
							color='bg-themeColorMain'
							padding='px-3 py-2'
							width='28'
						/>
					</div>
				</div>
				{/* <div className="">
          <FilterDropdown
            filterName="Filter by"
            filters={filters}
            setOption={setOption}
          />
        </div> */}
				{/* {option ? (
          <div className="">
            <FilterDropdown
              filterName="Options"
              filters={optionFilters}
              // setOption={setFilter}
            />
          </div>
        ) : (
          <div className=""></div>
        )} */}
			</div>

			<div className='ml-8 mr-8'>
				<hr className='bg-compBg text-textColor' />
			</div>
			<div className=''>
				<table className='w-full'>
					<thead>
						<tr>
							{/* <th className="px-8 py-4 text-gray-600 ">
                Number
              </th> */}
							<th className='px-8 py-4 text-sm text-textColor mobile:hidden'>
								Title
							</th>
							<th className='px-8 py-4 text-sm text-textColor mobile:hidden'>
								Tag
							</th>
							<th className='px-8 py-4 text-sm text-textColor mobile:hidden'>
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						{currentTableData?.map((article) => {
							if (article.link) {
								let link = ''
								if (article.link.startsWith('http')) {
									link = article.link
								} else {
									link = `/${article.link}`
								}
								return (
									<Link
										href={link}
										key={article.id}
										passHref
									>
										{/* <td className="px-8 py-4 text-xs font-extrabold text-gray-600 ">
                        #{article.id}
                      </td> */}
										<tr
											onClick={() => setLoading(true)}
											className='cursor-pointer '
										>
											<td
												style={{
													width: '50%'
												}}
												className='px-8 py-4 text-sm text-textColor'
											>
												{article.name}
											</td>
											<td
												style={{
													width: '30%'
												}}
												className='px-8 py-4 text-sm text-textColor mobile:hidden'
											>
												{article.topics
													? article.topics.map((topic) => topic.name).toString()
													: ' '}
											</td>
											<td
												style={{
													width: '30%'
												}}
												className='px-8 py-4 text-sm text-textColor desktop:hidden laptop:hidden'
											>
												{article.topics
													? article.topics.map((topic) => topic.name).toString()
													: ' '}
												<div
													className={` ${
														progresses[
															progresses.findIndex(
																(item) => item.knowledgeBase.id == article.id
															)
														]?.read
															? 'text-digilibSeen'
															: 'text-digilibUnseen'
													}`}
												>
													{progresses[
														progresses.findIndex(
															(item) => item.knowledgeBase.id == article.id
														)
													]?.read
														? 'Read'
														: 'Unread'}
												</div>
											</td>
											<td
												style={{
													width: '10%'
												}}
												className={`px-8 py-4 text-xs font-extrabold mobile:hidden ${
													progresses[
														progresses.findIndex(
															(item) => item.knowledgeBase.id == article.id
														)
													]?.read
														? 'text-digilibSeen'
														: 'text-digilibUnseen'
												}`}
											>
												{progresses[
													progresses.findIndex(
														(item) => item.knowledgeBase.id == article.id
													)
												]?.read
													? 'Read'
													: 'Unread'}
											</td>
										</tr>
									</Link>
								)
							} else {
								return (
									<Link
										href={`/${article.id}`}
										passHref
										key={article.id}
									>
										<tr
											onClick={() => setLoading(true)}
											className='cursor-pointer'
										>
											{/* <td className="px-8 py-4 text-xs font-extrabold text-gray-600 ">
                        #{article.id}
                      </td> */}
											<td
												style={{
													width: '50%'
												}}
												className='px-8 py-4 text-textColor mobile:pl-4'
											>
												{article.name}
											</td>
											<td
												style={{
													width: '30%'
												}}
												className='px-8 py-4 text-textColor mobile:hidden'
											>
												{article.topics
													? article.topics.map((topic) => topic.name).toString()
													: ' '}
											</td>
											<td
												style={{
													width: '30%'
												}}
												className='px-8 py-4 text-textColor desktop:hidden laptop:hidden'
											>
												{article.topics
													? article.topics.map((topic) => topic.name).toString()
													: ' '}
												<div
													className={`${
														progresses[
															progresses.findIndex(
																(item) => item.knowledgeBase.id == article.id
															)
														]?.read
															? 'text-digilibSeen'
															: 'text-digilibUnseen'
													}`}
												>
													{progresses[
														progresses.findIndex(
															(item) => item.knowledgeBase.id == article.id
														)
													]?.read
														? 'Read'
														: 'Unread'}
												</div>
											</td>
											<td
												style={{
													width: '10%'
												}}
												className={`px-8 py-4 text-xs font-extrabold mobile:hidden ${
													progresses[
														progresses.findIndex(
															(item) => item.knowledgeBase.id == article.id
														)
													]?.read
														? 'text-digilibSeen'
														: 'text-digilibUnseen'
												}`}
											>
												{progresses[
													progresses.findIndex(
														(item) => item.knowledgeBase.id == article.id
													)
												]?.read
													? 'Read'
													: 'Unread'}
											</td>
										</tr>
									</Link>
								)
							}
						})}
					</tbody>
				</table>
				<div
					className='desktop:flex laptop:flex'
					style={{
						display: '',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Pagination
						className='pagination-bar'
						currentPage={currentPage}
						totalCount={articles ? articles.length : 0}
						pageSize={pageSize}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<DigilibLoad loading={loading} />
			</div>
		</div>
	)
}

export default index
