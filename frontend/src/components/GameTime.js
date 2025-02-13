import React, { useState } from 'react';
const GameTime = (props) => {
  const displayTime = props.paused ? props.pauseTime : (props.frameTime - (props.startTime || props.frameTime))
  const pause = () => {
    props.setPauseTime(displayTime)
    props.setPaused(true)
  }
  const play = () => {
    props.setStartTime(performance.now() - props.pauseTime)
    props.setPauseTime(undefined)
    props.setPaused(false)
  }
  const reset = () => {
    props.setStartTime(0)
    props.setPauseTime(0)
    props.setTickCount(0)
    props.setPaused(true)
  }
  return (
    <div className="timer">
      <h1>{props.tickCount}</h1>
      
      <button onClick={props.paused ? play : pause}>
        {props.paused ? "play" : "pause"}
     </button>
     {
        (!props.paused || displayTime > 0) &&
        <button onClick={reset}>
          Reset
        </button> 
     }

     {/* <span className="smallFont">{JSON.stringify(props.pieceAllotment, null, 2, 2)}</span> */}
      {props.pieceList[0].rot} 
    </div>
  );
};
export default GameTime;