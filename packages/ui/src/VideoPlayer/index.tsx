import { useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@silvermine/videojs-quality-selector"; // This might need adjustment based on your setup
import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";
import { useAppContext } from "@/context/AppContext";
import getConnectionSpeed from "@/snippets/lms/getConnectionSpeed";

interface VideoPlayerProps {
  src: string; // Required string for the video source URL
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const { state, dispatch } = useAppContext();
  const [resolution, setResolution] = useState<number>(4160);

  useEffect(() => {
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
    };

    const player = videojs("video_1", videoJsOptions, async function onPlayerReady() {
      setResolution(await getConnectionSpeed());

      this.on("play", function () {
        const videoProgress = state?.videoProgress.find((e) => e.videoLink === src);
        if (videoProgress) {
          player.currentTime(videoProgress.startTime);
        }
      });

      this.on("pause", function () {
        const videoProgress = state?.videoProgress.find((e) => e.videoLink === src);
        let progressArr = state?.videoProgress || [];

        if (videoProgress) {
          progressArr[progressArr.findIndex((item) => item.videoLink === src)].startTime = player.currentTime();
        } else {
          progressArr.push({
            videoLink: src,
            startTime: player.currentTime(),
          });
        }
        dispatch({ type: "change_video_progress", value: progressArr });
      });

      this.on("ended", function () {
        let progressArr = state?.videoProgress || [];
        const videoProgress = progressArr.find((item) => item.videoLink === src);
        if (videoProgress) {
          videoProgress.startTime = 0; // Reset startTime on video end
        }
        dispatch({ type: "change_video_progress", value: progressArr });
      });
    });

    const baseUrl = src?.split("/upload/");

    if (baseUrl?.length) {
      const baseFormat = "f_auto,q_auto:";
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
      ];

      sources.forEach((source) => {
        if (source.res === resolution) {
          source.selected = true;
        }
      });
      player.src(sources);
    }

    return () => {
      if (player) {
        player.dispose(); // Clean up the player on component unmount
      }
    };
  }, [resolution, src, state, dispatch]);

  return (
    <div data-vjs-player>
      <video
        id="video_1"
        className="video-js vjs-big-play-centered"
        controls
        preload="auto"
        data-setup=""
      ></video>
    </div>
  );
};

export default VideoPlayer;
