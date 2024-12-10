import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useTour } from "@reactour/tour"
import Fuse from 'fuse.js'
import { useLazyQuery, useMutation } from '@apollo/client'
import { SEO } from '@/components/SeoHead'
import InMailMenu from '@/components/InMailMenu'
import InMailTopMenu from '@/components/InMailTopMenu'
import InMailTable from '@/components/InMailTable'
import NoMail from '@/components/InMailTable/NoMail'
import DigilibLoad from '@/components/DigilibLoad'
import InMailMobileRowItem from '@/components/InMailMobileRowItem'
import { profileId } from '@/context/constants'
import InMailInbox from 'graphql/queries/InMailInbox'
import InMailSetDeleted from 'graphql/mutations/InMailSetDeleted'
import InMailAll from 'graphql/queries/InMailAll'
import InMailSent from 'graphql/queries/InMailSent'
import InMailDraft from 'graphql/queries/InMailDraft'
import InMailDeleted from 'graphql/queries/InMailDeleted'
import InMailStarred from 'graphql/queries/InMailStarred'
import InMailImportant from 'graphql/queries/InMailImportant'
import InMailSetRead from 'graphql/mutations/InMailSetRead'

const index = () => {
	const router = useRouter()
	// const ref = useRef(null)
	// const { setIsOpen, ...rest } = useTour()
	const [mailsToDisplay, setMailsToDisplay] = useState([])
	const [showMenu, setShowMenu] = useState(true)
	const [checkBoxList, setCheckBoxList] = useState([])
	const [isPrimaryChecked, setIsPrimaryChecked] = useState(false)
	const [setMenu, setSetMenu] = useState(2)
	const [searchQuery, setSearchQuery] = useState('')
	const [query, setQuery] = useState(InMailInbox)
	const [open, setOpen] = useState(false)

	const [getMail, { data, loading, error, refetch }] = useLazyQuery(query, {
		variables: {
			id: parseInt(profileId)
		},
		fetchPolicy: 'no-cache'
	})

	const [setInMailDeleted] = useMutation(InMailSetDeleted, {
		refetchQueries: [query]
	})

	const [setReadMail] = useMutation(InMailSetRead, { refetchQueries: [query] })

	useEffect(() => {
		if (data && !loading) {
			setMailsToDisplay(data?.mailResponses)
		}
	}, [data, loading])

	useEffect(() => {
		if (router.query) {
			switch (router.query?.title) {
				case 'All Mail':
					setQuery(InMailAll)
					setSetMenu(1)
					break
				case 'Inbox':
					setQuery(InMailInbox)
					setSetMenu(2)
					break
				case 'Sent':
					setQuery(InMailSent)
					setSetMenu(3)
					break
				case 'Draft':
					setQuery(InMailDraft)
					setSetMenu(4)
					break
				case 'Trash':
					setQuery(InMailDeleted)
					setSetMenu(5)
					break
				case 'Starred':
					setQuery(InMailStarred)
					setSetMenu(6)
					break
				case 'Important':
					setQuery(InMailImportant)
					setSetMenu(7)
					break
				case 'Modal':
					setModalRedirect()
					break
				default:
				// setQuery(InMailInbox)
				// getMail()
			}
		}
		// getMail()
		refetch()
		setCheckBoxList([])
		setIsPrimaryChecked(false)
	}, [router.query.title])

	const fuse = new Fuse(mailsToDisplay, {
		keys: [
			'inMail.subject',
			'inMail.body',
			'inMail.from.firstName',
			'inMail.from.lastName'
		]
	})

	const results = fuse.search(searchQuery)

	const emailResults = searchQuery
		? results.map((email) => email.item)
		: mailsToDisplay

	const onSearch = (event) => {
		setSearchQuery(event.currentTarget.value)
	}

	const setModalRedirect = () => {
		ref.current.parentModalSet()
	}

	const handlePrimaryChecked = () => {
		setIsPrimaryChecked(!isPrimaryChecked)
	}

	const confirmAllTrashAndReturn = () => {
		let deleteMailList = checkBoxList.map((id) => id.responseId)
		if (deleteMailList && router.query?.title !== 'Trash') {
			deleteMailList.map((mailResponse) => {
				setInMailDeleted({ variables: { id: mailResponse, deleted: true } })
			})
		} else {
			deleteMailList.map((mailResponse) => {
				setInMailDeleted({ variables: { id: mailResponse, deleted: false } })
			})
		}
		setCheckBoxList([])
		setIsPrimaryChecked(false)
	}

	const confirmAllMarkRead = () => {
		let readMailList = checkBoxList.map((id) => id.responseId)
		if (readMailList) {
			readMailList.map((mailResponse) => {
				setReadMail({ variables: { id: mailResponse, read: true } })
			})
		} else {
			readMailList.map((mailResponse) => {
				setReadMail({ variables: { id: mailResponse, read: false } })
			})
		}
		setCheckBoxList([])
		setIsPrimaryChecked(false)
		router.reload()
	}

	if (error) {
		console.error(error)
		return null
	}

	if (loading) {
		return (
			<div className='flex items-center justify-center my-8'>
				<DigilibLoad loading={loading} />
			</div>
		)
	}

	const seo = {
		title: 'Inbox',
		description: 'Inbox'
	}

	return (
		<div className='flex w-full gap-2 desktop:flex-nowrap mobile:flex-wrap'>
			<SEO
				description={seo.description}
				title={seo.title}
			/>
			{showMenu ? (
				<div className='w-1/4 mobile:hidden'>
					<InMailMenu
						setMenu={setMenu}
						refetchMails={refetch}
					/>
				</div>
			) : (
				<></>
			)}
			<div className='w-full px-2 text-xs mobile:bg-compBg mobile:mb-10'>
				{data?.mailResponses?.length > 0 ? (
					<>
						<InMailTopMenu
							searchQuery={searchQuery}
							onSearch={onSearch}
							confirmAllTrash={confirmAllTrashAndReturn}
							isPrimaryChecked={isPrimaryChecked}
							handlePrimaryChecked={handlePrimaryChecked}
							setShowMenu={setShowMenu}
							showMenu={showMenu}
							confirmAllRead={confirmAllMarkRead}
						/>
						<div className='h-screen overflow-scroll no-scrolly'>
							<div className='mx-auto mobile:hidden'>
								<InMailTable
									mailsToDisplay={emailResults}
									userID={profileId}
									checkBoxList={checkBoxList}
									setCheckBoxList={setCheckBoxList}
									isPrimaryChecked={isPrimaryChecked}
									refetchMails={refetch}
									query={query}
								/>
							</div>
							<div className='w-full rounded-lg bg-compBg desktop:hidden laptop:hidden'>
								{emailResults?.map((mail) => (
									<InMailMobileRowItem
										key={mail?.id}
										mailToDisplay={mail}
										checkBoxList={checkBoxList}
										setCheckBoxList={setCheckBoxList}
										isPrimaryChecked={isPrimaryChecked}
										refetchMails={refetch}
										query={query}
									/>
								))}
							</div>
						</div>
					</>
				) : (
					<>
						<InMailTopMenu
							searchQuery={searchQuery}
							onSearch={onSearch}
							confirmAllTrash={confirmAllTrashAndReturn}
							isPrimaryChecked={isPrimaryChecked}
							handlePrimaryChecked={handlePrimaryChecked}
							setShowMenu={setShowMenu}
							showMenu={showMenu}
							confirmAllRead={confirmAllMarkRead}
							open={open}
							setOpen={setOpen}
						/>
						<NoMail />
					</>
				)}
			</div>
			{/* <LeftDrawerMail
					className=''
					open={showMenu}
					setOpen={setShowMenu}
				/> */}
		</div>
	)
}

export default index
