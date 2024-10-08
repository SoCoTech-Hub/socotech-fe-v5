import Avatar from '../Avatar'
import Btn from '../Btn'

export const ForumReply = ({
	userName = 'Unknown',
	profilePic,
	createdAt,
	message,
	view = false,
	pin = false
}) => {
	return message ? (
		<div className='flex flex-col mt-2'>
			<div className='flex items-center justify-between p-2 mobile:mb-2'>
				<div className='flex flex-col'>
					{!view ? (
						<div className='flex flex-col ml-14 mb-2 font-bold text-textColor mobile:text-xs text-md'>
							<div dangerouslySetInnerHTML={{ __html: message }} />
						</div>
					) : (
						<></>
					)}
					<div
						className={`flex flex-col ${
							!view ? '-mt-3' : 'mt-2'
						} text-textColor`}
					>
						<Avatar
							message={!view}
							userName={!view ? `posted by: ${userName}` : userName}
							border={true}
							src={profilePic}
							size='3rem'
						/>
					</div>
				</div>
				<span
					className={`justify-end mr-1 ${
						!view ? '-mt-7' : 'mt-1'
					} text-xs text-textColor mobile:text-xs`}
				>
					<span className='mobile:hidden'>Posted: </span> {createdAt}
				</span>
			</div>
			{!view ? (
				<div className='flex flex-row justify-end -mt-8 mb-2'>
					<Btn
						rounded='desktop:rounded-md laptop:rounded-md mobile:rounded-sm'
						btnWidth='mobile:w-20 desktop:w-36 laptop:w-36'
						className='text-black'
						label='View Discussion'
						color='bg-themeColorMain'
						textSize='mobile:text-xxs desktop:text-md laptop:text-md'
						paddingX='mobile:px-0.5 desktop:px-3 laptop:px-3'
						paddingY='mobile:py-1 desktop:py-2 laptop:py-2'
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	) : (
		<></>
	)
}
