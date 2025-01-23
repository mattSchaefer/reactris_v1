import React, {useState, useEffect} from 'react'
import BoardCell from '../components/BoardCell'
const useGameBoardAllotment = (rows, cols, pieceAllotment, frameTime, tickCount, startTime, pauseTime, TICK_LENGTH, lastTickTime) => {
    const [gameBoardAllotment, setGameBoardAllotment] = useState([[]])
    React.useEffect(() => {
        console.log("game board effect on PieceAllotment change")
        const flatPiece = pieceAllotment.flat()
        const isFallingPieceCell = (rowIndex, colIndex) => {
            for(let i = 0; i < flatPiece.length; i++){
                if(flatPiece[i].posRow == rowIndex && flatPiece[i].posCol == colIndex){
                    return true
                }
            }
            return false
        }
        const boardArray = []
        for(let i = 0; i < rows; i++){
            let rowArray = []
            for(let j = 0; j < cols; j++){
                const isActive = isFallingPieceCell(i,j)
                if(isActive){
                    rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={"blue"} tickCount={tickCount} />)
                }else{
                    rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={"gray"} tickCount={tickCount} />)
                }
            }
            boardArray.push(rowArray)
        }
        setGameBoardAllotment(boardArray)  
    }, [pieceAllotment])
    return[gameBoardAllotment, setGameBoardAllotment]
}
export {useGameBoardAllotment}