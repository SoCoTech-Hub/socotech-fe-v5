"use client";

import { useCallback, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import ReactPlayer from "react-player";

import { Button } from "./button";
import { Slider } from "./slider";

interface HLSVideoPlayerProps {
  url: string;
  title: string;
}

export default function HLSVideoPlayer({ url, title }: HLSVideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = useCallback(() => setPlaying((prev) => !prev), []);
  const handleVolumeChange = useCallback((newVolume: number[]) => {
    setVolume(newVolume[0] ?? 0);
    setMuted(newVolume[0] === 0);
  }, []);
  const handleToggleMute = useCallback(() => setMuted((prev) => !prev), []);
  const handleSeekChange = useCallback((newPlayed: number[]) => {
    setPlayed(newPlayed[0] ?? 0);
  }, []);
  const handleSeekMouseUp = useCallback((newPlayed: number[]) => {
    setSeeking(false);
    playerRef.current?.seekTo(newPlayed[0] ?? 0);
  }, []);
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      void playerWrapperRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      void document.exitFullscreen();
      setFullscreen(false);
    }
  }, []);
  const handleDuration = useCallback(
    (duration: number) => setDuration(duration),
    [],
  );
  const handleProgress = useCallback(
    (state: { played: number }) => {
      if (!seeking) setPlayed(state.played);
    },
    [seeking],
  );

  const formatTime = useCallback((seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return hh ? `${hh}:${mm.toString().padStart(2, "0")}:${ss}` : `${mm}:${ss}`;
  }, []);

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">{title}</h1>
      <div
        ref={playerWrapperRef}
        className="relative mx-auto w-full max-w-3xl bg-black"
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          width="100%"
          height="auto"
          style={{ aspectRatio: "16 / 9" }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-4 py-2">
          <Slider
            value={[played]}
            onValueChange={handleSeekChange}
            onValueCommit={(value) => handleSeekMouseUp(value)}
            max={1}
            step={0.01}
            className="mb-2 w-full"
          />
          <div className="mb-2 flex items-center justify-between text-sm text-white">
            <span>{formatTime(played * duration)}</span>
            <span>{formatTime(duration * (1 - played))}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                {playing ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={handleToggleMute}>
                  {muted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider
                  value={[muted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={1}
                  step={0.01}
                  className="w-20"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFullscreen}
            >
              {fullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
