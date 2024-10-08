import { baseUrl } from '@/context/constants'
const getConnectionSpeed = async () => {
	return new Promise(async (resolve, reject) => {
		var image = baseUrl + '/page500.png'
		var downloadSize = 16149
		window.setTimeout(measureConnectionSpeed, 0)
		function measureConnectionSpeed() {
			var startTime, endTime
			var download = new Image()
			download.onload = function () {
				endTime = new Date().getTime()
				showResults()
			}
			download.onerror = function (err, msg) {
				console.log('Invalid image, or error downloading')
				reject('error')
			}
			startTime = new Date().getTime()
			var cacheBuster = '?nnn=' + startTime
			download.src = image + cacheBuster
			function showResults() {
				var duration = (endTime - startTime) / 1000
				var bitsLoaded = downloadSize * 8
				var speedBps = (bitsLoaded / duration).toFixed(2)
				var speedKbps = (speedBps / 1024).toFixed(2)
				var speedMbps = (speedKbps / 1024).toFixed(2)

				let resolutionArray = [
					{ res: 144, mbps: 0.1 },
					{ res: 240, mbps: 0.3 },
					{ res: 360, mbps: 0.7 },
					{ res: 480, mbps: 1.5 },
					{ res: 720, mbps: 3 },
					{ res: 1080, mbps: 6 },
					{ res: 4160, mbps: 10 }
				]
				for (let i = 0; i < resolutionArray.length; i++) {
					if (speedMbps < resolutionArray[0].mbps) {
						let res = 144
						resolve(res)
					} else if (
						speedMbps > resolutionArray[resolutionArray.length - 1].mbps
					) {
						let res = 4160
						resolve(res)
					} else if (
						resolutionArray[i].mbps < speedMbps &&
						speedMbps < resolutionArray[i + 1].mbps
					) {
						let res = resolutionArray[i].res
						resolve(res)
					}
				}
			}
		}
	})
}
export default getConnectionSpeed
