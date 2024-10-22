import React from 'react'
import Avatar from '@/components/Avatar'
import FromMenu from '@/components/InMailFromMenu'
import { baseUrl } from '@/context/constants'

const FromLine = ({ mail }) => {
	const fullName = `${mail.from?.firstName} ${mail.from?.lastName}`
	let date = new Date(`${mail.created_at}`)
	let currentDate = date.toUTCString().substring(0, 22)

	return (
		<div className='flex justify-between'>
			<div className='flex'>
				<Avatar
					src={mail?.from?.profilePic?.url}
					size='50px'
					border={true}
				/>
				<div className='ml-2'>
					<div className='mt-1 text-xs'>{fullName}</div>
					<div className='mt-2'>
						<FromMenu to={mail.to} />
					</div>
				</div>
			</div>
			<div className='text-xs '>
				{mail?.attachments.length > 0 && (
					<div>
						<img
							src={`${baseUrl}/icons/inmail_attachment.svg`}
							alt='Attachment'
							className='w-8'
						/>
					</div>
				)}
				<div className=''>{currentDate}</div>
				{/* <div className="cursor-pointer">
          <a href="">
            <img src="/inmail/inmail_star.svg" alt="Star" className="w-8" />
          </a>
        </div>
        <div className="cursor-pointer">
          <a href="">
            <img src="/inmail/inmail_reply.svg" alt="Reply" className="w-8" />
          </a>
        </div>
        <div className="cursor-pointer">
          <a href="">
            <img
              src="/inmail/inmail_optionsVert.svg"
              alt="options"
              className="w-8"
            />
          </a>
        </div> */}
			</div>
		</div>
	)
}

export default FromLine
