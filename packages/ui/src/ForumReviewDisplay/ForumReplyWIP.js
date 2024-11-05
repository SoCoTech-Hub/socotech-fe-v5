import Avatar from '@/components/Avatar'
import Btn from '@/components/Btn'

export const ForumReply = ({
	userName = 'Unknown',
	profilePic,
	createdAt,
	message,
	view = false,
	pin = false,
	url = null
}) => {
	return message ? (
		<a href={!view && url}>
			<div
				className={`flex text-textColor flex-col p-2 rounded-lg ${
					pin ? 'bg-themeColorMain' : 'bg-compBg'
				}`}
			>
				<div className='flex flex-col justify-between desktop:flex-row laptop:flex-row'>
					{/* Left Section: Avatar and Message */}
					<div className='flex flex-col gap-y-2'>
						{/* Avatar */}
						<Avatar
							userName={
								!view ? (
									<>
										{/* Timestamp */}
										<div className='text-xs mobile:text-xxs'>{createdAt}</div>
										<div className=''>Posted by: {userName}</div>
									</>
								) : (
									userName
								)
							}
							border={true}
							src={profilePic}
							size='3rem'
						/>
						{/* Message below the Avatar */}
						{!view && (
							<div className=''>
								<div
									className='text-sm mobile:text-xs'
									dangerouslySetInnerHTML={{ __html: message }}
								/>
							</div>
						)}
					</div>

					{/* Right Section: Created At and View Discussion Btn */}
					{!view && (
						<div className='flex flex-col items-start mt-4 laptop:mt-0 desktop:mt-0 laptop:items-end desktop:items-end'>
							{/* View Discussion Button */}
							<Btn
								label='View Discussion'
								color={`${
									pin
										? 'bg-themeColorSecondary text-textColorSecondary'
										: 'bg-themeColorMain text-textColor'
								}`}
								width='mobile:w-full laptop:w-auto'
							/>
						</div>
					)}
				</div>
			</div>
		</a>
	) : null
}
