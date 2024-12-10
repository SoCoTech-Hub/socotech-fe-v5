import { useState, useMemo } from 'react'
import { InMailTableRowItem } from './InMailTableRowItem'
import Pagination from '../Pagination'

const index = ({
	mailsToDisplay,
	userID,
	checkBoxList,
	setCheckBoxList,
	isPrimaryChecked,
	refetchMails,
	query
}) => {
	let pageSize = 10
	const [currentPage, setCurrentPage] = useState(1)
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * pageSize
		const lastPageIndex = firstPageIndex + pageSize
		return mailsToDisplay?.slice(firstPageIndex, lastPageIndex)
	}, [currentPage, mailsToDisplay])

	return (
		<div className='-mx-4 sm:-mx-0'>
			<table className='min-w-full border-2 divide-y divide-gray-300 rounded-lg bg-compBg border-compBg '>
				<div className='overflow-scroll no-scrolly'>
					<div className='flow-root'>
						<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ms-auto'>
							<div className='inline-block min-w-full py-2 align-middle rounded-lg sm:px-6 lg:px-8'>
								<tbody>
									{currentTableData?.map((mail) => (
										<tr
											key={mail?.inMail?.id}
											className='inline-block w-full py-2 align-middle sm:px-6 lg:px-8'
										>
											<InMailTableRowItem
												key={mail?.inMail?.id}
												userID={userID}
												responseID={mail?.id}
												mailID={mail?.inMail?.id}
												fromID={mail?.inMail?.from?.id}
												firstName={mail?.inMail?.from?.firstName}
												lastName={mail?.inMail?.from?.lastName}
												subject={mail?.inMail?.subject}
												dateTime={mail?.inMail?.updated_at}
												draft={mail?.inMail?.draft}
												read={mail?.read}
												starredInitial={mail?.starred}
												importantInitial={mail?.important}
												profilePic={mail?.inMail?.from?.profilePic?.url}
												setCheckBoxList={setCheckBoxList}
												checkBoxList={checkBoxList}
												isPrimaryChecked={isPrimaryChecked}
												refetchMails={refetchMails}
												query={query}
											/>
										</tr>
									))}
								</tbody>
							</div>
						</div>
					</div>
					<div className='flex justify-center align-middle'>
						<Pagination
							className='pagination-bar'
							currentPage={currentPage}
							totalCount={mailsToDisplay ? mailsToDisplay.length : 0}
							pageSize={pageSize}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					</div>
				</div>
			</table>
		</div>
	)
}

export default index
