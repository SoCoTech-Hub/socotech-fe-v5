import { useEffect, useState } from "react"
import videojs from "video.js"
import "video.js/dist/video-js.css"
require("@silvermine/videojs-quality-selector")(videojs)
require("@silvermine/videojs-quality-selector/dist/css/quality-selector.css")
import { useAppContext } from "@/context/AppContext"
import getConnectionSpeed from "@/snippets/lms/getConnectionSpeed"

const VideoPlayer = ({ src }) => {
  const { state, dispatch } = useAppContext()
  const [resolution, setResolution] = useState(4160)

  useEffect(async () => {
    const videoJsOptions = {
      controls: true,
      responsive: true,
      fluid: true,
      controlBar: {
        children: [
          "playToggle",
          "progressControl",
          "volumePanel",
          "qualitySelector",
          "fullscreenToggle",
        ],
      },
    }
    var player = videojs(
      "video_1",
      videoJsOptions,
      async function onPlayerReady() {
        setResolution(await getConnectionSpeed())
        this.on("play", function () {
          if (state?.videoProgress.find((e) => e.videoLink == src)) {
            player.currentTime(
              state?.videoProgress.find((e) => e.videoLink === src).startTime
            )
          }
        })
        this.on("pause", function () {
          if (state?.videoProgress.find((e) => e.videoLink === src)) {
            let progressArr = state?.videoProgress
            progressArr[
              progressArr.findIndex((item) => item.videoLink === src)
            ].startTime = player.currentTime()
            dispatch({ type: "change_video_progress", value: progressArr })
          } else {
            let progressArr = state?.videoProgress
            progressArr.push({
              videoLink: src,
              startTime: player.currentTime(),
            })
            dispatch({
              type: "change_video_progress",
              value: progressArr,
            })
          }
        })
        this.on("ended", function () {
          let progressArr = state?.videoProgress
          progressArr[
            progressArr.findIndex((item) => item.videoLink === src)
          ].startTime = player.currentTime(0)
          dispatch({ type: "change_video_progress", value: progressArr })
        })
      }
    )
    const baseUrl = src?.split("/upload/")

    if (baseUrl?.length) {
      const baseFormat = "f_auto,q_auto:"
      let sources = [
        {
          src: `${baseUrl[0]}/upload/f_auto/${baseUrl[1]}`,
          type: "video/mp4",
          res: 4160,
          label: "4K",
          selected: false,
        },
        {
          src: `${baseUrl[0]}/upload/f_auto,q80/${baseUrl[1]}`,
          type: "video/mp4",
          res: 1080,
          label: "1080P",
          selected: false,
        },
        {
          src: `${baseUrl[0]}/upload/${baseFormat}best/${baseUrl[1]}`,
          type: "video/mp4",
          res: 720,
          label: "720P",
          selected: false,
        },
        {
          src: `${baseUrl[0]}/upload/${baseFormat}good/${baseUrl[1]}`,
          type: "video/mp4",
          res: 480,
          label: "480P",
          selected: false,
        },
        {
          src: `${baseUrl[0]}/upload/${baseFormat}eco/${baseUrl[1]}`,
          type: "video/mp4",
          res: 360,
          label: "360P",
          selected: false,
        },
        {
          src: `${baseUrl[0]}/upload/${baseFormat}low/${baseUrl[1]}`,
          type: "video/mp4",
          res: 144,
          label: "144p",
          selected: false,
        },
      ]
      sources.map((x) => {
        if (x.res === resolution) {
          x.selected = true
          player.src(sources)
        }
      })
    }
  }, [resolution])

  return (
    <div data-vjs-player>
      <video
        id="video_1"
        className="video-js vjs-big-play-centered"
        controls
        preload="auto"
        data-setup=""></video>
    </div>
  )
}

export default VideoPlayer
