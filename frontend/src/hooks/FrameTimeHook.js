import React, { useState } from "react";
import BoardCell from "../components/BoardCell";
//TICK_LENGTH, pieceAllotment, setPieceAllotment, setGameBoardAllotment)
const useFrameTime = (TICK_LENGTH = 600, BOARD_ROWS = 15, BOARD_COLS = 10, pieceAllotment, setPieceAllotment, setGameBoardAllotment, gameBoardAllotment, pieceList, setPieceList) => {
  const [frameTime, setFrameTime] = useState(performance.now());
  const [tickCount, setTickCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(undefined);
  const [lastTickTime, setLastTickTime] = useState(performance.now());
  const [paused, setPaused] = useState(false);
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
      default:
        flatPiece.forEach((pieceCell) => {
          if(pieceCell.posRow  + 1 >= BOARD_ROWS || gameBoardAllotment[pieceCell.posRow + 1][pieceCell.posCol].props.occupied){
            //(flatPiece)
            collision_flag = true
          }
        })
        break
    }
    return collision_flag
  }
  const rotatePiece = (type, direction) => {
    console.log(type)
    let piece_copy = [...pieceAllotment].flat()
    let center = piece_copy.filter((ele) => ele.center)
    if(type == "Z"){
      for(var i = 0; i < piece_copy.length; i++){
        let this_piece = piece_copy[i]
        if(this_piece.posCol <= center.posCol){
          this_piece = {...this_piece, posCol: this_piece.posCol - 1, posRow: this_piece.posRow - 1}
        }else{
          this_piece = {...this_piece, posCol: this_piece.posCol + 1, posRow: this_piece.posRow - 1}
        }
        piece_copy = [...piece_copy, this_piece]
      }
      setPieceAllotment((prevAllotment) => {
        return piece_copy
      })
      
      // setPieceAllotment((prevAllotment) =>
      //   {
      //       return prevAllotment.map((row) =>
      //       row.map((piece) => ({
      //           ...piece,
      //           posCol: parseInt(piece.posCol) - 1,
      //       }))
      //       )
      //   });
    }
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
      if (elapsedSinceLastTick >= TICK_LENGTH) {
        checkForFullRows()
        setTickCount((prevCount) => prevCount + 1)
        setLastTickTime(currentTime)
        if(!willCollideWithOccupiedCell(pieceAllotment, "down")){
          progressPieceDownward()
        }else{
            markStoppedPieceGameBoardCellsOccupied()
            //checkForFullRows() //move to start of loop
            initializeNextPiece()
        }
      }
      animationFrameId = requestAnimationFrame(frame);
    };
    const progressPieceDownward = () => {
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
    rotatePiece,
  ];
};
export {useFrameTime}