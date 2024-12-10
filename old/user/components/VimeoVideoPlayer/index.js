import { useEffect, useState } from 'react'
import Player from '@vimeo/player'
import { useAppContext } from '@/context/AppContext'

const VimeoVideoPlayer = ({ src }) => {
	const { state, dispatch } = useAppContext()
	const [currentTimeSetter, setCurrentTime] = useState(0)

	useEffect(() => {
		const fetchVideoProgress = async () => {
			if (Array.isArray(state?.videoProgress)) {
				const foundVideo = state.videoProgress.find((e) => e.videoLink === src)
				if (foundVideo) {
					setCurrentTime(foundVideo.startTime)
				}
			}
		}

		fetchVideoProgress()
	}, [state, src])

	const saveProgress = async (player) => {
		player.getCurrentTime().then((currentTime) => {
			const progressArr = Array.isArray(state?.videoProgress)
				? [...state.videoProgress]
				: []
			const foundIndex = progressArr.findIndex((item) => item.videoLink === src)
			if (foundIndex !== -1) {
				progressArr[foundIndex].startTime = currentTime
			} else {
				progressArr.push({ videoLink: src, startTime: currentTime })
			}
			dispatch({ type: 'change_video_progress', value: progressArr })
			setCurrentTime(currentTime)
		})
	}

	useEffect(() => {
		const player = new Player(document.querySelector('iframe'))
		player.on('play', () => {
			setInterval(() => {
				saveProgress(player)
			}, 60000)
		})
		player.on('pause', () => {
			saveProgress(player)
		})
		player.on('ended', () => {
			setCurrentTime(0)
			const progressArr = [...state?.videoProgress]
			const foundIndex = progressArr.findIndex((item) => item.videoLink === src)
			if (foundIndex !== -1) {
				progressArr[foundIndex].startTime = 0
				dispatch({ type: 'change_video_progress', value: progressArr })
			}
		})
	}, [src, state, dispatch])

	return (
		<div>
			<iframe
				title='Video'
				src={src + '#t=' + currentTimeSetter}
				className='w-full'
				frameBorder='0'
				allow='autoplay; fullscreen; picture-in-picture'
				style={{
					height: 'calc(100vh * 0.35)',
					aspectRatio: 16 / 9
				}}
				allowFullScreen
			></iframe>
		</div>
	)
}

export default VimeoVideoPlayer
