import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import DigilibLoad from '@/components/DigilibLoad'
import Btn from '@/components/Btn'
import { profileId } from '@/context/constants'
import { useRouter } from 'next/router'
import Pagination from '@/components/Pagination'
import getGQLRequest from '@/snippets/getGQLRequest'
// import FilterDropdown from "@/components/FilterDropdown"
// import { useAppContext } from '@/context/AppContext'

const index = ({
	articles,
	category
	// filters,
}) => {
	const [loading, setLoading] = useState(false)
	const [progresses, setReads] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10
	const router = useRouter()

	// Fetch read progress data
	useEffect(() => {
		const fetchProgressData = async () => {
			await getGQLRequest({
				endpoint: 'kbReads',
				fields: 'read,knowledgeBase{id}',
				where: `kbCategory:${category.id},profile:${profileId}`,
				stateSetter: setReads
			})
		}
		fetchProgressData()
	}, [category.id])

	// Reset page when articles change
	useEffect(() => {
		setCurrentPage(1)
	}, [articles])

	// Memoize the current page data
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize
		const lastPageIndex = firstPageIndex + pageSize
		return articles?.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, articles])

	// Helper function to render the progress status
	const renderReadStatus = (articleId) => {
		const progress = progresses.find(
			(item) => item.knowledgeBase.id === articleId
		)
		return progress?.read ? 'Read' : 'Unread'
	}

	// Helper function to render the article row
	const renderArticleRow = (article) => {
		const link = article.link?.startsWith('http')
			? article.link
			: `/${article.link}`

		return (
			<Link
				href={`/${article.id}`}
				key={article.id}
				passHref
			>
				<tr
					onClick={() => setLoading(true)}
					className='cursor-pointer'
				>
					<td className='w-1/2 px-8 py-4 text-sm text-textColor mobile:px-2 mobile:py-2'>
						{article.name}
					</td>
					<td className='w-1/3 px-8 py-4 text-sm text-textColor mobile:hidden'>
						{article.topics?.map((topic) => topic.name).join(', ') || ' '}
					</td>
					<td className='w-1/3 px-8 py-4 text-sm text-textColor desktop:hidden laptop:hidden'>
						{article.topics?.map((topic) => topic.name).join(', ') || ' '}
						<div
							className={
								renderReadStatus(article.id) == 'Read'
									? 'text-themeColorMain'
									: 'text-textColor'
							}
						>
							{renderReadStatus(article.id)}
						</div>
					</td>
					<td
						className={`px-8 py-4 text-xs font-extrabold mobile:hidden w-1/12 ${
							renderReadStatus(article.id) == 'Read'
								? 'text-themeColorMain'
								: 'text-textColor'
						}`}
					>
						{renderReadStatus(article.id)}
					</td>
				</tr>
			</Link>
		)
	}

	return (
		<div className='overflow-hidden rounded-lg shadow-md bg-compBg'>
			<div className='flex justify-between gap-5 mobile:gap-2'>
				<div className='pt-4 pb-3 pl-8 text-lg text-textColor mobile:pl-4'>
					{category?.name}
				</div>
				<div className='mt-3 mr-6'>
					<Btn
						label='Back'
						color='bg-themeColorMain'
						onClickFunction={() => router.back()}
					/>
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

			<hr className='mx-8 bg-compBg text-textColor' />
			<div className='mx-8 mobile:mx-1'>
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
					<tbody>{currentTableData?.map(renderArticleRow)}</tbody>
				</table>
				<div className='flex justify-center align-middle'>
					<Pagination
						className='pagination-bar'
						currentPage={currentPage}
						totalCount={articles ? articles.length : 0}
						pageSize={pageSize}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			</div>
			<div className='flex justify-center mx-2 align-middle'>
				<DigilibLoad loading={loading} />
			</div>
		</div>
	)
}

export default index
