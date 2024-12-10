import { useState, useEffect } from 'react'
import PostImage from './Post'
import PostDescription from './PostDescription'
import Posted from './Posted'
import Social from './Social'
import { baseUrl } from '@/context/constants'

const index = ({ news, profileId }) => {
	const [isImage, setIsImage] = useState(false)
	// const prefix = process.env.NEXT_PUBLIC_API_URL

	useEffect(async () => {
		if (news.videoLink === null) setIsImage(true)
	}, [news.videoLink])

	let altText = !news.media
		? 'No Alternative Text Available'
		: news.media.alternativeText
		? news.media.alternativeText
		: 'No Alternative Text Available'

	let mediaUrl = news?.videoLink
		? news.videoLink
		: news?.media?.url
		? news.media.url
		: `${baseUrl}/dummypost.jpg`

	let fullName = `${news.author.firstName} ${news.author.lastName}`

	return (
		<div>
			<div className='p-4 bg-compBg rounded-lg shadow-menu'>
				<div className=''>
					<Posted
						postedBy={fullName}
						dateCreated={news.created_at}
						profilePic={news.author.profilePic}
					/>
				</div>
				<div className='pt-3'>
					<a href={news.url}>
						<PostImage
							mediaUrl={mediaUrl}
							altText={altText}
							isImage={isImage}
						/>
					</a>
				</div>
				<div className='pt-3'>
					<PostDescription postDescription={news.description} />
				</div>
				<div className=''>
					<Social
						comments='22'
						postId={news?.social?.id}
						feedId={news.id}
						profileId={profileId}
					/>
				</div>
			</div>
		</div>
	)
}

export default index
