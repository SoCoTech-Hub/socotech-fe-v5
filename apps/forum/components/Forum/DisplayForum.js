import { useRouter } from 'next/router'
import Btn from '@/components/Btn'
import { InfoIcon } from '@/components/SvgIcons/InfoIcon'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import { ForumReply } from '../ForumReviewDisplay/ForumReplyWIP'
import { baseUrl } from '@/context/constants'
import Overlay from '../Overlay'
import { useState } from 'react'
import ContentLock from '../ContentLock'

const DisplayForum = ({ forums }) => {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	// Updated sorting logic
	const sortedForums = forums?.sort((a, b) => {
		// Prioritize pinned forums
		if (a.pin && !b.pin) {
			return -1
		}
		if (!a.pin && b.pin) {
			return 1
		}
		// If both forums are either pinned or not, then sort by date
		return new Date(b.updated_at) - new Date(a.updated_at)
	})

	return (
		<div className='flex flex-col gap-2 my-4'>
			<div>
				{/* Banner */}
				<div className='p-6 rounded-lg mobile:p-2 bg-themeColorMain'>
					<div className='row'>
						<div className='col'>
							<div className='pr-3 mr-20 text-5xl font-bold leading-tight mobile:text-xl mobile:pl-2 text-textColorSecondary'>
								Welcome to the <br />
								Topic Forum!
							</div>
							<div className='float-right -mt-32 '>
								<img
									src={`${baseUrl}/megaphone_black-border.gif`}
									alt='Forum Welcome Image'
									className='mobile:hidden'
									height={200}
									width={200}
								/>
								<div className='float-right mt-20'>
									<img
										src={`${baseUrl}/megaphone_black-border.gif`}
										alt='Forum Welcome Image'
										className='desktop:hidden laptop:hidden'
										height={100}
										width={100}
									/>
								</div>
							</div>
							<div className='mr-20 mobile:pl-2'>
								<p className='mt-4 text-lg leading-tight mobile:text-xs text-textColorSecondary'>
									Join the conversation and make it a positive space for
									everyone.
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* Rules */}
				<div className='mt-2 bg-white rounded-xl'>
					<div className='row'>
						<div className='flex items-center justify-between'>
							<div className='p-3 mr-20 text-2xl leading-tight mobile:pl-8 mobile:text-xs mobile:p-1 text-textColorSecondary'>
								Our Rules
							</div>
							<div className='flex flex-row '>
								<InfoIcon
									onClick={() => setIsOpen(!isOpen)}
									className='w-6 h-6 mx-2 cursor-pointer mobile:h-4 mobile:w-4'
									fill='#000'
								/>
								<Overlay
									isOpen={isOpen}
									width='4/5'
									height='auto'
									onClose={() => setIsOpen(false)}
									bgColor='compBg'
									title='Posts will be removed if you do not adhere to the rules.'
									content={
										<>
											<div className='p-3'>
												<div className='ml-3'>
													<h1 className='text-lg font-bold text-textColor'>
														Respect:{' '}
													</h1>
													<p className='text-lg text-textColor '>
														Treat fellow members with kindness.
													</p>
												</div>
												<div className='ml-3'>
													<h1 className='text-lg font-bold text-textColor'>
														Stay on Topic:{' '}
													</h1>
													<p className='text-lg text-textColor'>
														Keep discussions relevant to the forum's theme.
													</p>
												</div>
												<div className='ml-3'>
													<h1 className='text-lg font-bold text-textColor'>
														No Spamming:{' '}
													</h1>
													<p className='text-lg text-textColor'>
														Avoid advertising, personal promotions of unrelated
														topics and repeated comments.
													</p>
												</div>
												<div className='ml-3'>
													<h1 className='text-lg font-bold text-textColor'>
														Be Civil:{' '}
													</h1>
													<p className='text-lg text-textColor '>
														Disagree respectfully; no hate speech, profanity,
														bullying, or harassment.
													</p>
												</div>
											</div>
										</>
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<ContentLock
					bgColor={'bg-themeColorMain'}
					children={
						<>
							<div className='rounded-lg desktop:mt-4 laptop:mt-4 mobile:mt-2 laptop:p-3 mobile:py-2 mobile:px-1 desktop:p-3 card bg-compBg mobile:mb-24'>
								<div className='flex flex-row justify-between'>
									<h1 className='flex flex-row justify-start mb-2 font-bold desktop:text-xl laptop:text-xl mobile:text-xs text-textColor'>
										FORUM
									</h1>
									<div className='flex flex-row justify-end mobile:-mt-1'>
										<Btn
											className='text-black'
											label='Create New Topic'
											color='bg-themeColorMain'
											link='/upload'
											btnWidth='mobile:w-20 desktop:w-36 laptop:w-36'
											textSize='mobile:text-xxs desktop:text-md laptop:text-md'
											paddingX='mobile:px-0.5 desktop:px-3 laptop:px-3'
											paddingY='mobile:py-1 desktop:py-2 laptop:py-2'
										/>
									</div>
								</div>

								{sortedForums?.map((x, i) => (
									<div
										key={`key-${i}`}
										className='cursor-pointer'
										onClick={() => router.push(`/${x.slug}`)}
									>
										<div
											className={`flex flex-col w-full border border-white rounded-md shadow-md mobile:my-1 desktop:my-2 laptop:my-2 desktop:p-2 laptop:p-2 mobile:p-0.5  ${
												x.pin ? '' : 'bg-compBg'
											}`}
											style={{ backgroundColor: x.pin ? '#3a3a3a' : '' }}
										>
											<ForumReply
												userName={`${x.user.profile.firstName} ${
													x.user?.profile?.lastName
														? x.user.profile.lastName
														: ''
												}`}
												profilePic={x.user?.profile?.profilePic?.url}
												message={x.name}
												pin={x.pin}
												createdAt={getTimeDifferenceFromPostDate(x.updated_at)}
											/>
										</div>
									</div>
								))}
							</div>
						</>
					}
				/>
			</div>
		</div>
	)
}
export default DisplayForum
