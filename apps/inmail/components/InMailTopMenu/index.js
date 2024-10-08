import { useState } from 'react'
import router from 'next/router'
import {
	BurgerBarIcon,
	MoreIcon,
	TopRecycleTrashIcon,
	TopTrashIcon,
	ImMarkReadIcon
} from '../SvgIcons'
import MailSearch from '@/components/MailSearch'
import LeftDrawerMail from '../LeftDrawerMail'

const index = ({
	onSearch,
	searchQuery,
	isPrimaryChecked,
	handlePrimaryChecked,
	confirmAllTrash,
	confirmAllRead,
	showMenu,
	setShowMenu,
	open,
	setOpen
}) => {
	const [showOptions, setShowOptions] = useState(false)

	return (
		<div className='flex-col-reverse mobile:flex mobile:flex-col desktop:block laptop:block'>
			<div
				className='flex justify-between px-1 border-2 rounded-lg desktop:mb-3 laptop:mb-3 desktop:justify-between laptop:justify-between bg-appBg border-compBg'
				id='InMailTopMenu'
			>
				<div className='flex mobile:flex-row laptop:my-3 desktop:my-3'>
					<BurgerBarIcon
						className='w-6 h-6 mt-0.5 ml-2 mobile:hidden'
						onClick={() => setShowMenu(!showMenu)}
					/>
					<div className='desktop:hidden laptop:hidden'>
						<LeftDrawerMail
							open={open}
							setOpen={setOpen}
						/>
					</div>

					<div className='mt-0.5 ml-4 mr-4'>
						<input
							aria-labelledby='InMailTopMenu'
							className='w-4 h-4 mobile:mt-2.5 laptop:mt-1 desktop:mt-1 border border-gray-300 rounded-lg text-textColor focus:ring-indigo-400 focus:ring-opacity-25'
							type='checkbox'
							checked={isPrimaryChecked}
							onChange={handlePrimaryChecked}
						/>
					</div>
					<MoreIcon
						className='w-6 h-6 my-0.5 mobile:w-8 mobile:h-10 '
						onClick={() => setShowOptions(!showOptions)}
					/>

					{showOptions ? (
						router.query?.title === 'Trash' ? (
							<div className='flex flex-row cursor-pointer'>
								<div
									className='mt-1 ml-4'
									onClick={confirmAllTrash}
								>
									<TopRecycleTrashIcon
										className='w-5 h-5'
										stroke='#fff'
									/>
								</div>
								<div
									className='mt-1 ml-2'
									onClick={confirmAllRead}
								>
									<ImMarkReadIcon className='w-5 h-5' />
								</div>
							</div>
						) : (
							<div className='flex flex-row cursor-pointer'>
								<div
									className='h-10 laptop:-mt-1.5 desktop:-mt-1.5 mobile:mt-0'
									onClick={confirmAllTrash}
								>
									<TopTrashIcon className='w-10' />
								</div>
								<div
									className='desktop:mt-1 laptop:mt-1 ml-2 mobile:mt-2.5'
									onClick={confirmAllRead}
								>
									<ImMarkReadIcon className='w-5 h-5' />
								</div>
							</div>
						)
					) : (
						<></>
					)}
					{/* <div className='mr-8'>
					 <ImDownArrowIcon className='w-8 h-8' /> 
				</div> 
				<div className=''>
					<img
						src='/inmail/inmail_options.svg'
						className='w-8 h-8'
					/>
				</div>*/}
				</div>
				<div className='flex justify-end ml-4'>
					<MailSearch
						searchQuery={searchQuery}
						onSearch={onSearch}
					/>
				</div>
				{/* <div>
					<TablePagination />
				</div> */}
			</div>
		</div>
	)
}

export default index
