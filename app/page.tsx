"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(1500); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 1) {
            if (audioRef.current) {
              audioRef.current.play();
            }
            setIsActive(false);
          }
          return seconds - 1;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetTimer = () => {
    setSeconds(1500);
    setIsActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Pomodoro Annoying Clock</h1>
      <div className="text-6xl font-mono mb-8">{formatTime(seconds)}</div>
      <div className="space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="btn btn-primary"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer} className="btn btn-secondary">
          Reset
        </button>
      </div>
      <audio ref={audioRef} src="/nightmare.mp3" />
    </div>
  );
}
