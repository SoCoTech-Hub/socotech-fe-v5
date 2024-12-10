import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import { Avatar } from '@mui/material'

const CommentDisplay = ({
	value,
	fullName,
	created_at,
	profilePic
}) => {
	return (
		<ul className='space-y-6 mx-1'>
			<li className='relative flex gap-x-4'>
				<>
					<Avatar
						alt='User Image'
						src={profilePic}
						style={{
							width: '45px',
							height: '45px'
						}}
						className='relative flex-none mt-3 border-4 border-white'
					/>
					<div className='flex-auto rounded-md p-3 ring-1 ring-inset text-textColor ring-gray-400'>
						<div className='flex justify-between gap-x-4'>
							<div className='py-0.5  leading-5'>
								<span className=' text-themeColorMain'>
									{fullName !== 'undefined undefined' ? fullName : 'No Name'}
									<br />
									<div className='py-0.5 text-xs leading-5 text-textColor'>
										@ {getTimeDifferenceFromPostDate(created_at)}
									</div>
								</span>
							</div>
							{created_at ? (
								<div className='flex-none py-0.5 text-xs leading-5 text-textColor'></div>
							) : (
								<></>
							)}
						</div>
						<p className='text-sm leading-6 text-textColor'>{value}</p>
					</div>
				</>
			</li>
		</ul>
	)
}

export default CommentDisplay
