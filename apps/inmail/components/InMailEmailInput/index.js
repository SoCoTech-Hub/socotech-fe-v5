import React, { useEffect, useState } from 'react'
import { Chip, Stack } from '@mui/material'
import { grades, organizationId } from '@/context/constants'
import { AddressBook } from '@/components/SvgIcons'
import AddressSelect from '@/components/AddressSelect'
import checkValidEmailAddress from '@/snippets/checkValidEmailAddress'
import getGQLRequest from '@/snippets/getGQLRequest'

const InMailEmailInput = ({
	name,
	value,
	setValue,
	error,
	success,
	emailList,
	setEmailList,
	duplicateList,
	setDuplicates,
	validEmailList
}) => {
	const capitalName = name.toUpperCase()
	const [userList, setUserList] = useState([])
	const [showDropdown, setShowDropdown] = useState(false)

	useEffect(async () => {
		const res = await getGQLRequest({
			endpoint: 'users',
			fields: 'id,profile{id,uniqueId,firstName,lastName},email',
			where: `profile:{organization:{id:${organizationId}},grades:{id:[${grades}]}}`
		})

		if (res) {
			setUserList(res.users.map((user) => user.profile))
		}
	}, [])

	const handleDelete = (id) => () => {
		setEmailList(emailList.filter((object) => object.id !== id))
		setDuplicates(duplicateList.filter((list) => list !== id))
	}

	const checkEmail = () => {
		const valid = checkValidEmailAddress(
			validEmailList,
			value,
			emailList,
			duplicateList
		)
		if (valid.valid) {
			setDuplicates(valid.duplicateList)
			setEmailList(valid.emailList)
			setValue('')
			success(valid.message)
			setTimeout(() => success(''), 3000)
		} else {
			setValue('')
			error(valid.message)
			setTimeout(() => error(''), 5000)
		}
	}
	return (
		<>
			{value.length > 0 && (
				<>
					<label className='ml-1 text-sm font-bold text-textColor '>
						{capitalName}
					</label>
				</>
			)}

			<div className='flex items-center content-center w-full pl-1 mb-4 border-2 border-gray-300 rounded-lg h-14 focus:outline-none'>
				{emailList.length > 0 ? (
					<Stack
						direction='row'
						spacing={1}
					>
						{emailList?.map((list) => (
							<Chip
								key={list?.id}
								label={list?.email}
								variant='outlined'
								onDelete={handleDelete(list?.id)}
							/>
						))}
					</Stack>
				) : (
					<></>
				)}
				{value.length ? (
					<>
						<button
							className='flex items-center justify-center w-24 h-10 align-middle rounded-full text-textColor bg-modalButton text-md'
							onClick={() => {
								checkEmail()
								if (showDropdown) {
									setShowDropdown(false)
								}
							}}
							name={name}
						>
							Add email
						</button>
					</>
				) : (
					<></>
				)}
				<input
					type='text'
					id={name}
					autoComplete='off'
					name={name}
					className='content-between w-full h-10'
					placeholder={capitalName}
					value={value}
					onChange={(e) => {
						setValue(e.target.value)
					}}
				/>

				{showDropdown ? (
					<div className='w-1/2 my-1'>
						<AddressSelect
							options={userList}
							value={value}
							valueSetter={setValue}
							placeholder='User Search'
						/>
					</div>
				) : (
					<></>
				)}
				<button
					onClick={() => setShowDropdown(!showDropdown)}
					className='w-8 h-8'
				>
					{/* <AddressBook /> */}
				</button>
			</div>
		</>
	)
}

export default InMailEmailInput
