import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import SetResponse from 'graphql/mutations/SetResponse'
import { useMutation } from '@apollo/client'
import {
	DefaultStarredIcon,
	ImportantBlueIcon,
	ImportantDefaultIcon,
	StarredIcon
} from '@/components/SvgIcons'
import DigilibLoad from '@/components/DigilibLoad'
import Clamp from 'react-multiline-clamp'

const index = ({
	mailToDisplay,
	checkBoxList,
	setCheckBoxList,
	isPrimaryChecked,
	query
}) => {
	const [starred, setStarred] = useState(mailToDisplay?.starred)
	const [important, setImportant] = useState(mailToDisplay?.important)

	const [checkboxValue] = useState({
		inMailId: mailToDisplay?.inMail?.id,
		responseId: mailToDisplay.id
	})
	const [isChecked, setIsChecked] = useState(false)

	const [updateResponse, { data, loading, error }] = useMutation(SetResponse, {
		variables: {
			id: mailToDisplay.id,
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
			<div className='flex justify-center'>
				<DigilibLoad loading={loading} />
			</div>
		)
	}

	if (error) {
		console.error(error)
		return null
	}

	let mailRead = mailToDisplay.read ? '' : 'font-bold bg-gray-200'

	const handleChecked = () => {
		setIsChecked(!isChecked)
		if (!isChecked) {
			setCheckBoxList((checkBoxList) => [...checkBoxList, checkboxValue])
		} else {
			let removedCheckValue = checkBoxList.filter((e) => e !== checkboxValue)
			setCheckBoxList(removedCheckValue)
		}
	}

	const formatText = document.createElement('span')
	formatText.innerHTML = mailToDisplay?.inMail?.body

	return (
		<div
			className={`w-full p-2 desktop:mobileMailRow laptop:mobileMailRow text-textColor ${mailRead}`}
		>
			<div className='flex gap-2'>
				<div className='pt-2 pr-3'>
					<input
						aria-labelledby={mailToDisplay?.inMail?.id}
						className='w-5 h-5 ml-3 border border-gray-300 rounded-lg text-textColor focus:ring-indigo-400 focus:ring-opacity-25'
						type='checkbox'
						value={checkboxValue}
						checked={isChecked}
						onChange={handleChecked}
					/>
				</div>
				<div className='flex flex-wrap w-full '>
					<Link
						href={`/${mailToDisplay?.inMail?.id}`}
						passHref
					>
						<div className='cursor-pointer hover:bg-themeColorSecondary hover:bg-opacity-10'>
							<div className='flex justify-between w-full'>
								<div className='flex text-themeColorSecondary'>
									{/* <div
                className=''
                onClick={() =>
                  updateResponse({ variables: { important: !important } })
                }>
                {mailToDisplay?.important ? (
                  <ImportantBlueIcon className='w-5' />
                ) : (
                  <ImportantDefaultIcon className='w-5' />
                )}
              </div> */}
									{/* <Link href={`/${mailToDisplay?.inMail?.id}`} passHref> */}
									<Clamp lines={1}>
										<div className='w-32 text-themeColorSecondary'>
											{mailToDisplay?.inMail?.subject}
										</div>
									</Clamp>
									{/* </Link> */}
								</div>
								<div className='text-themeColorSecondary'>
									{mailToDisplay?.inMail?.created_at
										.split('T')[0]
										.replace('-', '/')}
								</div>
							</div>
							<div className='flex justify-between w-full text-themeColorSecondary'>
								<div className=''>
									<Clamp lines={1}>
										<div className=''>
											{formatText.textContent || formatText.innerText}
										</div>
									</Clamp>
								</div>
								<div
									className=''
									onClick={() =>
										updateResponse({ variables: { starred: !starred } })
									}
								>
									{/* {mailToDisplay?.starred ? (
                    <StarredIcon className='w-5' />
                  ) : (
                    <DefaultStarredIcon className='w-5' />
                  )} */}
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default index
