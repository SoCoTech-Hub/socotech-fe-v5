// import { useEffect, useState } from "react";
// import videojs from "video.js";

// import "video.js/dist/video-js.css";
// import "@silvermine/videojs-quality-selector"; // This might need adjustment based on your setup
// import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";

// import { useAppContext } from "@/context/AppContext";
// import getConnectionSpeed from "@/snippets/lms/getConnectionSpeed";

// interface VideoPlayerProps {
//   src: string; // Required string for the video source URL
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
//   const { state, dispatch } = useAppContext();
//   const [resolution, setResolution] = useState<number>(4160);

//   useEffect(() => {
//     const videoJsOptions = {
//       controls: true,
//       responsive: true,
//       fluid: true,
//       controlBar: {
//         children: [
//           "playToggle",
//           "progressControl",
//           "volumePanel",
//           "qualitySelector",
//           "fullscreenToggle",
//         ],
//       },
//     };

//     const player = videojs(
//       "video_1",
//       videoJsOptions,
//       async function onPlayerReady() {
//         setResolution(await getConnectionSpeed());

//         this.on("play", function () {
//           const videoProgress = state?.videoProgress.find(
//             (e) => e.videoLink === src,
//           );
//           if (videoProgress) {
//             player.currentTime(videoProgress.startTime);
//           }
//         });

//         this.on("pause", function () {
//           const videoProgress = state?.videoProgress.find(
//             (e) => e.videoLink === src,
//           );
//           let progressArr = state?.videoProgress ?? [];

//           if (videoProgress) {
//             progressArr[
//               progressArr.findIndex((item) => item.videoLink === src)
//             ].startTime = player.currentTime();
//           } else {
//             progressArr.push({
//               videoLink: src,
//               startTime: player.currentTime(),
//             });
//           }
//           dispatch({ type: "change_video_progress", value: progressArr });
//         });

//         this.on("ended", function () {
//           let progressArr = state?.videoProgress ?? [];
//           const videoProgress = progressArr.find(
//             (item) => item.videoLink === src,
//           );
//           if (videoProgress) {
//             videoProgress.startTime = 0; // Reset startTime on video end
//           }
//           dispatch({ type: "change_video_progress", value: progressArr });
//         });
//       },
//     );

//     const baseUrl = src?.split("/upload/");

//     if (baseUrl?.length) {
//       const baseFormat = "f_auto,q_auto:";
//       let sources = [
//         {
//           src: `${baseUrl[0]}/upload/f_auto/${baseUrl[1]}`,
//           type: "video/mp4",
//           res: 4160,
//           label: "4K",
//           selected: false,
//         },
//         {
//           src: `${baseUrl[0]}/upload/f_auto,q80/${baseUrl[1]}`,
//           type: "video/mp4",
//           res: 1080,
//           label: "1080P",
//           selected: false,
//         },
//         {
//           src: `${baseUrl[0]}/upload/${baseFormat}best/${baseUrl[1]}`,
//           type: "video/mp4",
//           res: 720,
//           label: "720P",
//           selected: false,
//         },
//         {
//           src: `${baseUrl[0]}/upload/${baseFormat}good/${baseUrl[1]}`,
//           type: "video/mp4",
//           res: 480,
//           label: "480P",
//           selected: false,
//         },
//         {
//           src: `${baseUrl[0]}/upload/${baseFormat}eco/${baseUrl[1]}`,
//           type: "video/mp4",
//           res: 360,
//           label: "360P",
//           selected: false,
//         },
//         {
//           src: `${baseUrl[0]}/upload/${baseFormat}low/${baseUrl[1]}`,
//           type: "video/mp4",
//           res: 144,
//           label: "144p",
//           selected: false,
//         },
//       ];

//       sources.forEach((source) => {
//         if (source.res === resolution) {
//           source.selected = true;
//         }
//       });
//       player.src(sources);
//     }

//     return () => {
//       if (player) {
//         player.dispose(); // Clean up the player on component unmount
//       }
//     };
//   }, [resolution, src, state, dispatch]);

//   return (
//     <div data-vjs-player>
//       <video
//         id="video_1"
//         className="video-js vjs-big-play-centered"
//         controls
//         preload="auto"
//         data-setup=""
//       ></video>
//     </div>
//   );
// };

// export default VideoPlayer;

"use client";

import React, { useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import ReactPlayer from "react-player";

import { Button } from "@acme/ui/button";
import { Slider } from "@acme/ui/slider";

interface VideoPlayerProps {
  url: string;
  title?: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setMuted(value === 0);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleSeekChange = (value: number) => {
    setPlayed(value);
  };

  // const handleSeekMouseDown = () => {
  //   setSeeking(true);
  // };

  // const handleSeekMouseUp = (value: number[]) => {
  //   setSeeking(false);
  //   playerRef.current?.seekTo(value[0]);
  // };

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleToggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await playerContainerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      await document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  return (
    <div ref={playerContainerRef} className="relative aspect-video w-full">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        className="absolute left-0 top-0"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
        <div className="mb-2 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <div className="mx-4 flex flex-grow items-center space-x-2">
            <Slider
              value={[played]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleSeekChange()}
              // onPointerDown={handleSeekMouseDown}
              // onPointerUp={(value) => handleSeekMouseUp(value)}
              className="w-full"
            />
            <span className="text-sm">
              {formatTime(played * (playerRef.current?.getDuration() ?? 0))}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </Button>
            <Slider
              value={[muted ? 0 : volume]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFullscreen}
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {fullscreen ? (
                <Minimize className="h-6 w-6" />
              ) : (
                <Maximize className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {title && (
        <div className="absolute left-0 right-0 top-0 bg-black bg-opacity-50 p-2 text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      )}
    </div>
  );
}
// USE
// import VideoPlayer from '@acme/video-player'

// export default function VideoPlayerExample() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Video Player Example</h1>
//       <VideoPlayer
//         url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
//         title="Never Gonna Give You Up"
//       />
//     </div>
//   )
// }
