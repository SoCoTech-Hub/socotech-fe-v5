import { useState, useEffect } from 'react'
import Avatar from '@/components/Avatar'
import PostImage from './Post'
import Social from './Social'

import {
	baseUrl,
	// ComponentBg,
	Text,
	uniqueId
} from '@/context/constants'
import { useAppContext } from '@/context/AppContext'
// import { getTimeDifferenceFromPostDate } from '@/snippets/user/getTimeDifferenceFromPostDate'

const index = ({ news, profileId }) => {
	const { state } = useAppContext()
	const [isImage, setIsImage] = useState(false)
	const [expanded, setExpanded] = useState(false)

	const toggleExpand = () => {
		setExpanded(!expanded)
	}

	useEffect(() => {
		if (!news.videoLink) {
			setIsImage(true)
		}
	}, [news.videoLink])

	let altText = !news.media
		? 'No Alternative Text Available'
		: news.media.alternativeText
		? news.media.alternativeText
		: 'No Alternative Text Available'

	let mediaUrl = news?.media?.url ? news.media.url : `${baseUrl}/dummypost.png`

	let fullName = news.subject
		? news.subject.name
		: news.author
		? `${news.author.firstName} ${
				news.author.lastName ? news.author.lastName : ''
		  }`
		: 'Anonymous'

	return (
		<>
			<div className='mb-4 rounded-lg desktop:p-4 laptop:p-4 bg-compBg shadow-menu mobile:w-full mobile:overflow-x-hidden mobile:p-1'>
				<div className='flex flex-row justify-between mb-2'>
					<div className='flex flex-row items-start h-auto align-middle'>
						<div
							className='avatar'
							style={{ flexShrink: 0 }}
						>
							{news?.subject?.svgIcon ? (
								<div
									className='w-12 h-12'
									dangerouslySetInnerHTML={{
										__html: news.subject?.svgIcon
									}}
								/>
							) : (
								<Avatar
									src={news.author?.profilePic?.url}
									size='56px'
									border={true}
									borderColor='white'
								/>
							)}
						</div>

						<div className='pl-4 text-textColor'>
							{fullName !== 'undefined undefined' ? fullName : 'No Name'}
							<div className='mt-1 unique-id text-textColor'>@{uniqueId}</div>
						</div>
					</div>
				</div>
				<div className={`pt-3 pb-2 text-textColor`}>
					{expanded ? (
						<div
							className=''
							dangerouslySetInnerHTML={{ __html: news.description }}
						/>
					) : (
						<>
							<div className='line-clamp-2'>
								<div
									dangerouslySetInnerHTML={{
										__html: news.description
									}}
								/>
							</div>
							{news.url ? (
								<a
									className='font-bold'
									href={news.url}
								>
									Read more
								</a>
							) : (
								<>
									{news.description.length > 140 && (
										<div
											className='cursor-pointer read-more'
											onClick={toggleExpand}
											style={{
												display: expanded ? 'none' : 'block'
											}}
										>
											Read more
										</div>
									)}
								</>
							)}
						</>
					)}
					{news.description.length > 140 && (
						<div
							className='cursor-pointer read-less'
							onClick={toggleExpand}
							style={{ display: expanded ? 'block' : 'none' }}
						>
							Read less
						</div>
					)}
				</div>
				<div className='mt-1'>
					<div className={`break-words heading  ${Text}`}>
						<div className='line-clamp-1'>
							<div
								className=''
								dangerouslySetInnerHTML={{ __html: news.name }}
							/>
						</div>
					</div>

					<div className={`w-full my-1  ${Text} body-text font-bold`}>
						{/* Date {getTimeDifferenceFromPostDate(news.published_at)} */}
					</div>
					<div className='cursor-pointer'>
						{news.url ? (
							<a href={news.url}>
								<PostImage
									mediaUrl={mediaUrl}
									altText={altText}
									videoLink={news.videoLink}
									isImage={isImage}
								/>
							</a>
						) : (
							<>
								<PostImage
									mediaUrl={mediaUrl}
									altText={altText}
									videoLink={news.videoLink}
									isImage={isImage}
								/>
							</>
						)}
					</div>
					<div className='px-2 py-2 -ml-5'>
						<Social
							news={news}
							feedId={news.id}
							profileId={profileId}
							name={news.name}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default index
