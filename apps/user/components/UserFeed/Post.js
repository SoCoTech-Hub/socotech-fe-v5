import React from 'react'

const PostImage = ({ mediaUrl, altText, isImage, videoLink }) => {
	if (isImage) {
		return (
			<img
				src={mediaUrl}
				alt={altText}
				className='w-full rounded-lg'
			/>
		)
	} else {
		const getVideoId = (videoLink) => {
			// Check for AWS M3U8 URL
			if (
				videoLink?.includes('amazonaws.com') &&
				videoLink?.includes('.m3u8')
			) {
				return videoLink
			}

			let videoId = ''

			switch (true) {
				case videoLink?.includes('youtube.com'):
				case videoLink?.includes('youtu.be'): {
					const youtubeIdMatch = videoLink.match(
						/(?:\?v=|\/embed\/|\/watch\?v=|\.be\/|\/v\/|\/e\/|\/u\/\w+\/|\/d\/|\/ytscreeningroom\?v=|\/artist\/\w+\/|\/trailer\/r\/|\/embed\/iframe\/|\/embed\/shorts\/)([^#\&\?]*).*/
					)
					if (youtubeIdMatch) {
						videoId = youtubeIdMatch[1]
					}
					break
				}
				case videoLink?.includes('vimeo.com'): {
					videoId = videoLink.split('/').pop() || ''
					break
				}
				default:
					break
			}

			return videoId
		}

		const getVideoSrc = (videoId) => {
			// AWS M3U8 URL
			if (videoId?.includes('.m3u8')) {
				return videoId
			}

			let videoSrc = ''

			switch (true) {
				case videoLink?.includes('youtube.com'):
				case videoLink?.includes('youtu.be'): {
					videoSrc = `https://www.youtube.com/embed/${videoId}?rel=0`
					break
				}
				case videoLink?.includes('vimeo.com'): {
					videoSrc = `https://player.vimeo.com/video/${videoId}`
					break
				}
				case videoLink?.includes('amazonaws.com'): {
					videoSrc = `https://${process.env.NEXT_PUBLIC_BUCKET}/${videoId}.mp4`
					break
				}
				default:
					break
			}

			return videoSrc
		}

		const videoId = getVideoId(videoLink)
		const videoSrc = getVideoSrc(videoId)

		return (
			<>
				{videoSrc && videoSrc.includes('.m3u8') ? (
					<>
						<div className='desktop:visible laptop:hidden mobile:hidden'>
							<video
								width='100%'
								height='400'
								controls
								autoPlay
								muted
							>
								<source src={videoSrc} />
								Your browser does not support the video tag.
							</video>
						</div>
						<div className='desktop:hidden laptop:visible mobile:hidden'>
							<video
								width='100%'
								height='300'
								controls
								autoPlay
								muted
							>
								<source src={videoSrc} />
								Your browser does not support the video tag.
							</video>
						</div>
						<div className='desktop:hidden laptop:hidden mobile:visible'>
							<video
								width='100%'
								height='200'
								controls
								autoPlay
								muted
							>
								<source src={videoSrc} />
								Your browser does not support the video tag.
							</video>
						</div>
					</>
				) : (
					<>
						<div className='desktop:visible laptop:hidden mobile:hidden'>
							<iframe
								width='100%'
								height='400'
								allow='fullscreen; picture-in-picture'
								src={videoSrc}
								allowFullScreen
								className='rounded-lg bg-black p-1'
							></iframe>
						</div>
						<div className='desktop:hidden laptop:visible mobile:hidden'>
							<iframe
								width='100%'
								height='300'
								allow='fullscreen; picture-in-picture'
								src={videoSrc}
								allowFullScreen
								className='rounded-lg bg-black p-1'
							></iframe>
						</div>
						<div className='desktop:hidden laptop:hidden mobile:visible'>
							<iframe
								width='100%'
								height='200'
								allow='fullscreen; picture-in-picture'
								src={videoSrc}
								allowFullScreen
								className='rounded-lg bg-black p-1'
							></iframe>
						</div>
					</>
				)}
			</>
		)
	}
}

export default PostImage