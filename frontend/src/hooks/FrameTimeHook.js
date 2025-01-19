import React, { useState } from "react";
const useFrameTime = (TICK_LENGTH = 600) => {
  const [frameTime, setFrameTime] = useState(performance.now());
  const [tickCount, setTickCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(undefined); // `undefined` when not paused
  const [lastTickTime, setLastTickTime] = useState(performance.now());
  const [paused, setPaused] = useState(false);
  React.useEffect(() => {
    let animationFrameId;
    const frame = (currentTime) => {
      if (pauseTime !== undefined) {
        setPaused(true)
        cancelAnimationFrame(animationFrameId);
        return;
      }
      setFrameTime(currentTime);
      const elapsedSinceStart = currentTime - startTime;
      const elapsedSinceLastTick = currentTime - lastTickTime;
      if (elapsedSinceLastTick >= TICK_LENGTH) {
        setTickCount((prevCount) => prevCount + 1);
        setLastTickTime(currentTime); // Update the last tick timestamp
      }
      animationFrameId = requestAnimationFrame(frame);
    };

    if (pauseTime === undefined) {
      animationFrameId = requestAnimationFrame(frame);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [startTime, pauseTime, TICK_LENGTH, lastTickTime]);

  return [
    frameTime,
    tickCount,
    pauseTime,
    startTime,
    paused,
    setPaused,
    setStartTime,
    setPauseTime,
    setTickCount,
  ];
};

export {useFrameTime}