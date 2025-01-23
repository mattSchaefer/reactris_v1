import React, { useState } from "react";
//TICK_LENGTH, pieceAllotment, setPieceAllotment, setGameBoardAllotment)
const useFrameTime = (TICK_LENGTH = 600, BOARD_ROWS = 15, BOARD_COLS = 10, pieceAllotment, setPieceAllotment, setGameBoardAllotment, gameBoardAllotment) => {
  const [frameTime, setFrameTime] = useState(performance.now());
  const [tickCount, setTickCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(undefined);
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
        setTickCount((prevCount) => prevCount + 1)
        setLastTickTime(currentTime)
        if(!willCollideWithOccupiedCell(pieceAllotment)){
          progressPiece()
        }else{
          markStoppedPieceGameBoardCellsOccupied()
          initializeNextPiece()
        }
      }
      animationFrameId = requestAnimationFrame(frame);
    };
    const progressPiece = () => {
      setPieceAllotment((prevAllotment) =>
        {
          return prevAllotment.map((row) =>
            row.map((piece) => ({
              ...piece,
              posRow: parseInt(piece.posRow) + 1, // Update posRow
            }))
          )
        }
      );
      
    }
    const willCollideWithOccupiedCell = (piece) => {
      const flatGameBoard = gameBoardAllotment.flat()
      const flatPiece = piece.flat()
      let collision_flag = false
      flatPiece.forEach((pieceCell) => {
        //for now just check that it is not the end of the board...
        //TODO: check if the cells beneath the piece are occupied (by a past piece / portion)
        if(pieceCell.posRow  + 1 >= BOARD_ROWS){
          collision_flag = true
        }
      })
      return collision_flag
    }
    const markStoppedPieceGameBoardCellsOccupied = () => {

    }
    const initializeNextPiece = () => {
      
    }
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