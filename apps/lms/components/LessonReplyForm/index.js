import React from 'react'
import Avatar from '@/components/Avatar'
import ProfilePicUrl from '@/snippets/getProfilePicUrl'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Btn from '@/components/Btn'

const index = ({ isDisabled, inputRef, onSubmit }) => {
	return (
		<div>
			<div className='p-4 rounded-lg bg-compBg shadow-menu  '>
				<div className='flex flex-row '>
					<div className='avatar'>
						<Avatar
							src={ProfilePicUrl()}
							size='56px'
							border={true}
						/>
					</div>
					<div className='my-auto ml-4 text-lg font-bold text-textColor '>
						Leave a reply
					</div>
				</div>
				<div className='pt-3'>
					<TextareaAutosize
						aria-label='minimum height'
						minRows={8}
						ref={inputRef}
						placeholder='Tell us about your experience...'
						className='w-full p-3 text-lg border-2 border-gray-200 rounded-lg'
					/>
				</div>
				<div className='flex flex-row justify-end w-full pt-4'>
					<Btn
						disabled={isDisabled}
						label='Save'
						onClickFunction={onSubmit}
						color='bg-themeColorMain'
						width='32'
						padding='px-3 py-2'
					/>
				</div>
			</div>
		</div>
	)
}

export default index
