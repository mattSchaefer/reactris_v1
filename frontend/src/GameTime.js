import React, { useState } from 'react';

const useFrameTime = () => {
  const [frameTime, setFrameTime] = React.useState(performance.now())
  const [tickCount, setTickCount] = React.useState(0)
  React.useEffect(() => {
    let frameId
    let tick = 600
    const frame = time => {
      setTickCount((prev) => prev+1)
      setFrameTime(time)
      frameId = setTimeout(() => {
        requestAnimationFrame(frame)
      }, tick)
    }
    requestAnimationFrame(frame)
    return () => cancelAnimationFrame(frameId)
  }, [])
  return [frameTime, tickCount]
}

const GameTime = () => {
  const [startTime, setStartTime] = React.useState(0)
  const [pauseTime, setPauseTime] = React.useState(0)
  const paused = pauseTime !== undefined
  const [frameTime, tickCount] = useFrameTime()
  const displayTime = paused ? pauseTime : (frameTime - (startTime || frameTime))
  const gameTicks = Math.max(Math.trunc(displayTime / 600), 0)
  const pause = () => {
    setPauseTime(displayTime)
  }
  const play = () => {
    setStartTime(performance.now() - pauseTime)
    setPauseTime(undefined)
    
  }
  return (
    <div className="timer">
      <h1>{gameTicks}</h1>
     <div>{gameTicks}</div> 
     <button onClick={paused ? play : pause}>
      {paused ? "play" : "pause"}
     </button>
     {
        (!paused || displayTime > 0) &&
        <button onClick={() => {setStartTime(0); setPauseTime(0); }}>
          Reset
        </button> 
     }
    </div>
  );
};
export default GameTime;

//  const fetchMessage = async () => {
//   try {
//     const response = await fetch(`http://127.0.0.1:8000/api/hello?name=${name}`);
//     const data = await response.json();
//     setMessage(data.message);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };
