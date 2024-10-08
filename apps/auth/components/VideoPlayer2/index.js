import { useEffect, useState, useRef, useCallback } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
require('@silvermine/videojs-quality-selector')(videojs)
require('@silvermine/videojs-quality-selector/dist/css/quality-selector.css')
import { useAppContext } from '@/context/AppContext'
import getConnectionSpeed from '@/snippets/lms/getConnectionSpeed'

const VideoPlayer = ({
	src = `${process.env.NEXT_PUBLIC_CLOUDFRONT}/72a2ade3-7260-4b24-ae07-2663ea441c1c/AppleHLS1/Grade12Tourism.m3u8`
}) => {
	const { state, dispatch } = useAppContext()
	const [resolution, setResolution] = useState(4160)
	const playerRef = useRef(null)
	const videoContainerRef = useRef(null)

	const initializePlayer = useCallback(async () => {
		if (!videoContainerRef.current) return

		const videoJsOptions = {
			controls: true,
			responsive: true,
			fluid: true,
			controlBar: {
				children: [
					'playToggle',
					'progressControl',
					'volumePanel',
					'qualitySelector',
					'fullscreenToggle'
				]
			},
			sources: [
				{
					src,
					type: 'application/x-mpegURL'
				}
			]
		}

		const player = videojs(
			videoContainerRef.current,
			videoJsOptions,
			async function onPlayerReady() {
				const speed = await getConnectionSpeed()
				setResolution(speed)

				this.on('play', () => handlePlay(player))
				this.on('pause', () => handlePause(player))
				this.on('ended', () => handleEnded(player))
			}
		)

		playerRef.current = player

		// Cleanup function to dispose the player instance
		return () => {
			if (playerRef.current) {
				playerRef.current.dispose()
				playerRef.current = null
			}
		}
	}, [src])

	const handlePlay = useCallback(
		(player) => {
			const videoProgress = state?.videoProgress.find(
				(e) => e.videoLink === src
			)
			if (videoProgress) {
				player.currentTime(videoProgress.startTime)
			}
		},
		[state, src]
	)

	const handlePause = useCallback(
		(player) => {
			const videoProgress = state?.videoProgress || []
			const existingProgressIndex = videoProgress.findIndex(
				(item) => item.videoLink === src
			)

			if (existingProgressIndex > -1) {
				videoProgress[existingProgressIndex].startTime = player.currentTime()
			} else {
				videoProgress.push({
					videoLink: src,
					startTime: player.currentTime()
				})
			}

			dispatch({ type: 'change_video_progress', value: videoProgress })
		},
		[state, src, dispatch]
	)

	const handleEnded = useCallback(
		(player) => {
			const videoProgress = state?.videoProgress || []
			const existingProgressIndex = videoProgress.findIndex(
				(item) => item.videoLink === src
			)

			if (existingProgressIndex > -1) {
				videoProgress[existingProgressIndex].startTime = 0
				dispatch({ type: 'change_video_progress', value: videoProgress })
			}
		},
		[state, src, dispatch]
	)

	useEffect(() => {
		const cleanup = initializePlayer()
		return cleanup
	}, [initializePlayer])

	useEffect(() => {
		const sources = [
			{ res: 4160, label: '4K' },
			{ res: 1080, label: '1080P' },
			{ res: 720, label: '720P' },
			{ res: 480, label: '480P' },
			{ res: 360, label: '360P' },
			{ res: 144, label: '144p' }
		]

		const selectedSource = sources.find((source) => source.res === resolution)
		if (selectedSource && playerRef.current) {
			playerRef.current.src([
				{
					src,
					type: 'application/x-mpegURL',
					label: selectedSource.label,
					selected: true
				}
			])
		}
	}, [resolution, src])

	return (
		<div data-vjs-player>
			<video
				ref={videoContainerRef}
				id='player'
				className='video-js vjs-big-play-centered'
				controls
				preload='auto'
				data-setup=''
			></video>
		</div>
	)
}

export default VideoPlayer
