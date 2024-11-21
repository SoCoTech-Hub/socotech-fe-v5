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

import { Button } from "../button";
import { Slider } from "../slider";

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
  const [showVolume, setShowVolume] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0] ?? 0);
    setMuted(newVolume[0] === 0);
  };

  const handleToggleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekChange = (newPlayed: number[]) => {
    setPlayed(newPlayed[0] ?? 0);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (newPlayed: number[]) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(newPlayed[0] ?? 0);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void playerWrapperRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      void document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
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
            onPointerDown={handleSeekMouseDown}
            onPointerUp={(value) => handleSeekMouseUp(value)}
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
                  onValueChange={(newVolume) => {
                    handleVolumeChange(newVolume);
                    setShowVolume(true);
                  }}
                  onPointerUp={() => {
                    setTimeout(() => setShowVolume(false), 1000);
                  }}
                  max={1}
                  step={0.01}
                  className="w-20"
                />
                {showVolume && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded bg-black bg-opacity-75 px-2 py-1 text-xs text-white">
                    {Math.round(volume * 100)}%
                  </div>
                )}
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
