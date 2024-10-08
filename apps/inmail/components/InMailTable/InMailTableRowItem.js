import { baseUrl } from '@/context/constants'
import {
	DefaultStarredIcon,
	ImportantBlueIcon,
	ImportantDefaultIcon,
	StarredIcon
} from '../SvgIcons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import DigilibLoad from '@/components/DigilibLoad'
import IMComposeButton from '../InMailMenu/IMComposeButton'
import SetResponse from 'graphql/mutations/SetResponse'
import Clamp from 'react-multiline-clamp'

export const InMailTableRowItem = ({
	responseID,
	userID,
	mailID,
	fromID,
	firstName,
	lastName,
	subject,
	dateTime,
	draft,
	read,
	starredInitial,
	importantInitial,
	profilePic,
	setCheckBoxList,
	checkBoxList,
	isPrimaryChecked,
	refetchMails,
	query,
	checkboxColor = 'text-themeColorSecondary'
}) => {
	const [starred, setStarred] = useState(starredInitial)
	const [important, setImportant] = useState(importantInitial)

	const [checkboxValue] = useState({
		inMailId: mailID,
		responseId: responseID
	})
	const [isChecked, setIsChecked] = useState(false)

	const [updateResponse, { data, loading, error }] = useMutation(SetResponse, {
		variables: {
			id: responseID,
			starred: starred,
			important: important
		},
		refetchQueries: [query]
	})

	useEffect(() => {
		if (data) {
			setStarred(data?.updateMailResponse?.mailResponse?.starred)
			setImportant(data?.updateMailResponse?.mailResponse?.important)
		}
	}, [data])

	useEffect(() => {
		setIsChecked(isPrimaryChecked)
		if (isPrimaryChecked) {
			if (!checkBoxList.includes(checkboxValue)) {
				setCheckBoxList((checkBoxList) => [...checkBoxList, checkboxValue])
			}
		} else if (!isPrimaryChecked) {
			setCheckBoxList([])
		}
	}, [isPrimaryChecked])

	if (loading) {
		return (
			<>
				<div className='flex place-content-center'>
					<DigilibLoad loading={loading} />
				</div>
			</>
		)
	}

	if (error) {
		console.error(error)
		return null
	}

	let fullName = `${firstName} ${lastName}`
	let date = new Date(`${dateTime}`)
	let currentDate = date.toUTCString().substring(0, 22)

	let mailRead = read ? '' : 'font-bold bg-themeColorSecondary bg-opacity-20'

	let mailStarred = starred ? (
		<StarredIcon className='w-5' />
	) : (
		<DefaultStarredIcon className='w-5' />
	)

	let mailImportant = important ? (
		<ImportantBlueIcon className='w-5' />
	) : (
		<ImportantDefaultIcon className='w-5' />
	)

	const handleChecked = () => {
		setIsChecked(!isChecked)
		if (!isChecked) {
			setCheckBoxList((checkBoxList) => [...checkBoxList, checkboxValue])
		} else {
			let removedCheckValue = checkBoxList.filter((e) => e !== checkboxValue)
			setCheckBoxList(removedCheckValue)
		}
	}

	return (
		<tr
			id={mailID}
			className={`flex flex-row h-12 divTableRow ${mailRead} align-middle hover:bg-themeColorSecondary hover:bg-opacity-10`}
			// onClick={() => handleTicketChange(ticketID, agentID)}
		>
			<td className='flex items-center mx-3 text-textColor'>
				<input
					aria-labelledby={mailID}
					className={`w-4 h-4 ml-1 cursor-pointer ${checkboxColor}`}
					type='checkbox'
					value={checkboxValue}
					checked={isChecked}
					onChange={handleChecked}
				/>
			</td>
			<td
				className='flex items-center w-10 px-2 cursor-pointer text-themeColorSecondary'
				onClick={() => updateResponse({ variables: { starred: !starred } })}
			>
				{mailStarred}
			</td>
			<td
				className='flex items-center w-10 px-2 cursor-pointer text-themeColorSecondary'
				onClick={() => updateResponse({ variables: { important: !important } })}
			>
				{mailImportant}
			</td>
			<Link
				href={`/${mailID}`}
				passHref
			>
				<div className='flex items-center w-full cursor-pointer text-themeColorSecondary'>
					<td className='text-xs lg:table-cell'>
						<div className='flex items-center'>
							<img
								className='w-10 h-10 rounded-lg'
								src={
									profilePic
										? `${profilePic}`
										: `${baseUrl}/images/profilePic.png`
								}
								alt=''
							/>
							<div className='px-3 mt-1 font-bold truncate '>{fullName}</div>
						</div>
					</td>
					{draft ? (
						<td className='flex px-3 text-sm'>
							<div className='text-xs desktop:w-64 laptop:w-40'>
								<Clamp lines={1}>{subject ? subject : ''}</Clamp>
								<IMComposeButton
									name={'draft'}
									bgColor={'bg-red-300'}
									userid={userID}
									mailID={mailID}
									draft={draft}
									refetchMails={refetchMails}
									width={'w-30'}
									query={query}
								/>
							</div>
						</td>
					) : (
						<td className='flex px-3 text-xs'>
							<div className='justify-start'>
								<Clamp lines={1}>{subject ? subject : ''}</Clamp>
							</div>
						</td>
					)}
					<td
						className={`flex text-xs font-medium text-right sm:pr-0 ml-auto mr-10`}
					>
						<div className='justify-end'>{currentDate}</div>
					</td>
				</div>
			</Link>
		</tr>
	)
}
