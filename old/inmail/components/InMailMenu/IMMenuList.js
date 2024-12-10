import { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
	// ImDraftIcon,
	ImImportantIcon,
	ImInboxIcon,
	// ImSentIcon,
	// ImNewMailIcon,
	ImStarredIcon,
	ImTrashIcon
} from '@/components/SvgIcons'
import DigilibLoad from '@/components/DigilibLoad'
import GetInMailUnreadChips from 'graphql/queries/GetInMailUnreadChips'
import { profileId } from '@/context/constants'
import IMMenuListItem from './IMMenuListItem'

const IMMenuList = ({ setMenu = 0 }) => {
	const [selectedIndex, setSelectedIndex] = useState(setMenu)
	const { data, loading, error } = useQuery(GetInMailUnreadChips, {
		variables: {
			id: profileId
		},
		fetchPolicy: 'network-only'
	})

	if (loading) {
		return (
			<div className='flex justify-center'>
				<DigilibLoad />
			</div>
		)
	}

	if (error) {
		console.error(error)
		return null
	}

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index)
	}

	return (
		<div className='w-full p-4 divide-y-2 rounded-lg shadow-md bg-compBg'>
			<div aria-label='inmail main menu'>
				{/* <IMMenuListItem
          title="All Mail"
          iconName={<ImNewMailIcon className="w-8" />}
          chipNumber={data?.allMail?.aggregate?.count}
          selectedIndex={selectedIndex}
          handleListItemClick={handleListItemClick}
          listItemValue={1}
        /> */}
				<IMMenuListItem
					title='Inbox'
					iconName={<ImInboxIcon className='w-8' />}
					chipNumber={data?.inbox?.aggregate?.count}
					selectedIndex={selectedIndex}
					handleListItemClick={handleListItemClick}
					listItemValue={2}
				/>
				{/* <IMMenuListItem
					title='Sent'
					iconName={<ImSentIcon className='w-8' />}
					chipNumber={0}
					selectedIndex={selectedIndex}
					handleListItemClick={handleListItemClick}
					listItemValue={3}
				/> */}
				{/* <IMMenuListItem
          title="Draft"
          iconName={<ImDraftIcon className="w-8" />}
          chipNumber={data?.drafts?.aggregate?.count}
          selectedIndex={selectedIndex}
          handleListItemClick={handleListItemClick}
          listItemValue={4}
        /> */}
				<IMMenuListItem
					title='Trash'
					iconName={<ImTrashIcon className='w-8 px-1' />}
					chipNumber={0}
					selectedIndex={selectedIndex}
					handleListItemClick={handleListItemClick}
					listItemValue={5}
				/>
			</div>
			<div>
				<div className='mt-3 font-bold text-md text-textColor'>Filters</div>
				<div
					className='w-full'
					aria-label='inmail filters menu'
				>
					<IMMenuListItem
						title='Starred'
						iconName={<ImStarredIcon className='w-8 px-1' />}
						chipNumber={0}
						selectedIndex={selectedIndex}
						handleListItemClick={handleListItemClick}
						listItemValue={6}
					/>
					<IMMenuListItem
						title='Important'
						iconName={<ImImportantIcon className='w-8 px-1' />}
						selectedIndex={selectedIndex}
						handleListItemClick={handleListItemClick}
						listItemValue={7}
					/>
				</div>
				{/* <Divider />
      <div className="mt-3 text-xs">Label</div>
      <List sx={{ width: "100%" }} aria-label="inmail label menu">
        <IMMenuListItem
          title="Promotions"
          iconName="label_blue"
          chipNumber={3}
        />
        <IMMenuListItem title="Forums" iconName="label_yellow" chipNumber={1} />
      </List> */}
			</div>
		</div>
	)
}

export default IMMenuList
