import { useEffect, useState } from 'react'
import Player from '@vimeo/player'
import { useAppContext } from '@/context/AppContext'

const VideoPlayer = ({ src }) => {
	const { state, dispatch } = useAppContext() //TODO: Check Cache
	// const [currentTimeSetter, setCurrentTime] = useState(0)
	// useEffect(async () => {
	// 	if (state?.videoProgress?.find((e) => e.videoLink == src)) {
	// 		setCurrentTime(
	// 			state?.videoProgress?.find((e) => e.videoLink === src)?.startTime
	// 		)
	// 	}
	// }, [state])
	// const saveProgress = async (player) => {
	// 	if (state?.videoProgress.find((e) => e.videoLink === src)) {
	// 		let progressArr = state?.videoProgress
	// 		player.getCurrentTime().then(function (currentTime) {
	// 			if (
	// 				progressArr[progressArr.findIndex((item) => item.videoLink === src)]
	// 			) {
	// 				progressArr[
	// 					progressArr.findIndex((item) => item.videoLink === src)
	// 				].startTime = currentTime
	// 				dispatch({ type: 'change_video_progress', value: progressArr })
	// 				setCurrentTime(currentTime)
	// 			}
	// 		})
	// 	} else {
	// 		let progressArr = []
	// 		player.getCurrentTime().then(function (currentTime) {
	// 			progressArr.push({
	// 				videoLink: src,
	// 				startTime: currentTime
	// 			})
	// 			dispatch({
	// 				type: 'change_video_progress',
	// 				value: progressArr
	// 			})
	// 			setCurrentTime(currentTime)
	// 		})
	// 	}
	// }

	useEffect(async () => {
		var iframe = document.querySelector('iframe')
		var player = new Player(iframe)
		player.on('play', function () {
			setInterval(function () {
				saveProgress(player)
			}, 60000)
		})
		player.on('pause', function () {
			saveProgress(player)
		})
		player.on('ended', function () {
			setCurrentTime(0)
			let progressArr = state?.videoProgress
			progressArr[
				progressArr.findIndex((item) => item.videoLink === src)
			].startTime = 0
			dispatch({ type: 'change_video_progress', value: progressArr })
		})
	}, [])

	return (
		<div>
			<iframe
				title='Video'
				src={src}
				className='w-full'
				frameBorder='0'
				allow='autoplay; fullscreen; picture-in-picture'
				style={{ height: 'calc(100vh * 0.55)', aspectRatio: 16 / 9 }}
				allowFullScreen
			></iframe>
		</div>
	)
}

export default VideoPlayer
