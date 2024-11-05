import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Btn from '@/components/Btn'
import { InfoIcon } from '@/components/SvgIcons'
import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'
import { ForumReply } from '@/components/ForumReviewDisplay/ForumReplyWIP'
import { baseUrl, orgName } from '@/context/constants'
import Overlay from '@/components/Overlay'
import ContentLock from '@/components/ContentLock'
import WelcomeBanner from '@/components/WelcomeBanner'
import Link from 'next/link'

const DisplayForum = ({ forums }) => {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	// Memoized sorting logic
	const sortedForums = useMemo(() => {
		return forums?.sort((a, b) => {
			if (a.pin && !b.pin) return -1
			if (!a.pin && b.pin) return 1
			return new Date(b.updated_at) - new Date(a.updated_at)
		})
	}, [forums])

	// Helper function to render the rules in the Overlay
	const renderForumRules = () => (
		<div className='p-3'>
			{[
				{ title: 'Respect', content: 'Treat fellow members with kindness.' },
				{
					title: 'Stay on Topic',
					content: "Keep discussions relevant to the forum's theme."
				},
				{
					title: 'No Spamming',
					content:
						'Avoid advertising, personal promotions of unrelated topics, and repeated comments.'
				},
				{
					title: 'Be Civil',
					content:
						'Disagree respectfully; no hate speech, profanity, bullying, or harassment.'
				}
			].map(({ title, content }, index) => (
				<div
					className='ml-3'
					key={index}
				>
					<h1 className='text-lg font-bold text-textColor'>{title}:</h1>
					<p className='text-lg text-textColor'>{content}</p>
				</div>
			))}
		</div>
	)

	return (
		<div className='flex flex-col gap-2 my-4'>
			{/* Banner */}
			<WelcomeBanner
				heading={
					<>
						Welcome to the <br />
						{orgName} Forum!
					</>
				}
				subHeading='Join the conversation and make it a positive space for everyone.'
				icon={`${baseUrl}/megaphone_black-border.gif`}
			/>

			{/* Rules Section */}
			<div className='mt-2 shadow-md bg-compBg rounded-xl'>
				<div className='flex items-center justify-between'>
					<h2 className='p-3 mr-20 text-2xl leading-tight mobile:pl-8 mobile:text-xl mobile:p-1 text-textColor'>
						Our Rules
					</h2>
					<div className='flex flex-row'>
						<InfoIcon
							onClick={() => setIsOpen(!isOpen)}
							className='mx-2 cursor-pointer w-7'
						/>
						<Overlay
							isOpen={isOpen}
							onClose={() => setIsOpen(false)}
							bgColor='compBg'
							title='Posts will be removed if you do not adhere to the rules.'
							content={renderForumRules()}
						/>
					</div>
				</div>
			</div>

			{/* Forum Section */}
			<ContentLock bgColor='bg-themeColorMain'>
				<div className='p-2 rounded-lg shadow-md bg-compBg mobile:mb-24 gap-y-2'>
					<div className='flex justify-between m-2'>
						<h1 className='text-xl font-bold text-textColor'>FORUM</h1>
						<Btn
							label='Create New Topic'
							color='bg-themeColorMain'
							link='/upload'
						/>
					</div>
					<hr className='mx-8 bg-compBg text-textColor' />

					{/* Display Forums */}
					{sortedForums?.map((forum, index) => (
						<div
							key={index}
							className={`cursor-pointer flex flex-col w-full rounded-lg shadow-md mobile:my-1 my-2 desktop:p-2 mobile:p-0.5 ${
								forum.pin ? 'bg-themeColorMain' : 'bg-compBg'
							}`}
						>
							<ForumReply
								userName={`${forum.user?.profile?.firstName} ${
									forum.user?.profile?.lastName || ''
								}`}
								profilePic={forum.user?.profile?.profilePic?.url}
								message={forum.name}
								pin={forum.pin}
								createdAt={getTimeDifferenceFromPostDate(forum.updated_at)}
								url={`${baseUrl}/${forum.slug}`}
							/>
						</div>
					))}
				</div>
			</ContentLock>
		</div>
	)
}

export default DisplayForum
