import React, { useState } from "react";
import BoardCell from "../components/BoardCell";
import { progressPieceDownward } from "./PieceMover";
//TICK_LENGTH, pieceAllotment, setPieceAllotment, setGameBoardAllotment)
const useFrameTime = (TICK_LENGTH = 600, BOARD_ROWS = 15, BOARD_COLS = 10, pieceAllotment, setPieceAllotment, setGameBoardAllotment, gameBoardAllotment, pieceList, setPieceList) => {
  const [frameTime, setFrameTime] = useState(performance.now());
  const [tickCount, setTickCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(undefined);
  const [lastTickTime, setLastTickTime] = useState(performance.now());
  const [paused, setPaused] = useState(false);
  const [tickLength, setTickLength] = useState(TICK_LENGTH)
  const willCollideWithOccupiedCell = (piece, whichCase) => {
    const flatPiece = piece.flat()
    let collision_flag = false
    switch(whichCase){
      case "left":
        flatPiece.forEach((pieceCell) => {
          if(pieceCell.posCol - 1 < 0 || gameBoardAllotment[pieceCell.posRow][pieceCell.posCol - 1].props.occupied){
            collision_flag = true
          }
        })
        break
      case "right":
        flatPiece.forEach((pieceCell) => {
          if(pieceCell.posCol  + 1 >= BOARD_COLS || gameBoardAllotment[pieceCell.posRow][pieceCell.posCol + 1].props.occupied){
            collision_flag = true
          }
        })
        break
      case "down":
        flatPiece.forEach((pieceCell) => {
          if(pieceCell.posRow  + 1 >= BOARD_ROWS || gameBoardAllotment[pieceCell.posRow + 1][pieceCell.posCol].props.occupied){
            //(flatPiece)
            collision_flag = true
          }
        })
        break
      default:
        flatPiece.forEach((pieceCell) => {
          if(pieceCell.posRow >= BOARD_ROWS || pieceCell.posCol >= BOARD_COLS || pieceCell.posCol < 0 ||  gameBoardAllotment[pieceCell.posRow + 1][pieceCell.posCol].props.occupied){
            //(flatPiece)
            collision_flag = true
          }
        })
        break
    }
    return collision_flag
  }
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
      if (elapsedSinceLastTick >= tickLength/*TICK_LENGTH*/) {
        checkForFullRows()
        setTickCount((prevCount) => prevCount + 1)
        setLastTickTime(currentTime)
        if(!willCollideWithOccupiedCell(pieceAllotment, "down")){

          setPieceAllotmentDownward()
        }else{
            markStoppedPieceGameBoardCellsOccupied()
            //checkForFullRows() //move to start of loop
            initializeNextPiece()
        }
      }
      animationFrameId = requestAnimationFrame(frame);
    };

    const setPieceAllotmentDownward = () => {
      setPieceAllotment((prevAllotment) => {
        return progressPieceDownward(prevAllotment)
      })
    }
   
    const markStoppedPieceGameBoardCellsOccupied = () => {
      //console.log("marking stopped piece cells as occupied")
      const flatPiece = pieceAllotment.flat()
      setGameBoardAllotment((prevAllotment) => {
        return prevAllotment.map((row) => {
          return row.map((cell) => {
            for(let i = 0; i < flatPiece.length; i++){
              if(cell.props.rowIndex == flatPiece[i].posRow && cell.props.colIndex == flatPiece[i].posCol){
                return <BoardCell rowIndex={cell.props.rowIndex} colIndex={cell.props.colIndex} color={flatPiece[i].color} tickCount={tickCount} active={false} occupied={true} />
              }
            }
            return cell
          })
        })
      })
    }
    const checkForFullRows = () => {
      var rows_to_break = []
      var allotment_copy = [...gameBoardAllotment]
      for(var i = 0; i < allotment_copy.length; i++){
        var row = allotment_copy[i]
        var is_full = true
        for(var j = 0; j < row.length; j++){
          if(!row[j].props.occupied){
            is_full = false
            break
          }
        }
        if(is_full){
          rows_to_break.push(i)
        }
      }
      if(rows_to_break.length > 0)
        breakRowsAndShiftDown(rows_to_break)
      return rows_to_break
    }
    const breakRowsAndShiftDown = (rows_to_break) => {
      let new_board = [...gameBoardAllotment]
      let blank_rows = []
      for(var i = 0; i < rows_to_break.length; i++){
        var new_row = []
        for(var j = 0; j < BOARD_COLS; j++){
          new_row.push(<BoardCell rowIndex={i} colIndex={j} color={"gray"} tickCount={tickCount} active={false} occupied={false}/>)
        }
        blank_rows.push(new_row)
      }
      new_board = blank_rows.concat(
        new_board.map((row, index) => {
          if(rows_to_break.indexOf(index) < 0)
            return row
        }).filter((arr) => {return arr !== undefined})
      )
      
      setGameBoardAllotment((prevValue) => {
        return new_board
      })
    }
    const initializeNextPiece = () => {
      //console.log(pieceAllotment)
      setPieceList((prevList) => 
        prevList.slice(1)
      )
    }
    if (pauseTime === undefined) {
      animationFrameId = requestAnimationFrame(frame);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [startTime, pauseTime, TICK_LENGTH, lastTickTime, pieceAllotment]);
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
    willCollideWithOccupiedCell,
    tickLength, setTickLength
  ];
};
export {useFrameTime}




//moved to piecemover
 // const progressPieceDownward = () => {
    //   setPieceAllotment((prevAllotment) =>
    //     {
    //       return prevAllotment.map((row) =>
    //         row.map((piece) => ({
    //           ...piece,
    //           posRow: parseInt(piece.posRow) + 1, // Update posRow
    //         }))
    //       )
    //     }
    //   );
    // }