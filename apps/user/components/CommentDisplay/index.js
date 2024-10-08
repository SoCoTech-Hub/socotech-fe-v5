import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import Avatar from '@/components/Avatar'

const CommentDisplay = ({
	value,
	fullName,
	created_at,
	profilePic
}) => {
	return (
		<ul className='mx-1 space-y-6'>
			<li className='relative flex gap-x-4'>
				<>
					<Avatar
						src={profilePic}
						size='45px'
						border={true}
						borderColor='white'
						className='relative flex-none mt-3'
					/>
					<div className='flex-auto p-3 rounded-md ring-1 ring-inset text-textColor ring-gray-400'>
						<div className='flex justify-between gap-x-4'>
							<div className='py-0.5  leading-5'>
								<span className=' text-textColor'>
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
