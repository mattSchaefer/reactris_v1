import React, {useState, useEffect} from 'react'
import BoardCell from '../components/BoardCell'
const useGameBoardAllotment = (rows, cols, activePieceAllotment) => {
    const [gameBoardAllotment, setGameBoardAllotment] = useState([[]])
    React.useEffect(() => {
        const flatPiece = activePieceAllotment.flat()
        const isActivePieceCell = (rowIndex, colIndex) => {
            for(let i = 0; i < flatPiece.length; i++){
                if(flatPiece[i].props.posRow == rowIndex && flatPiece[i].props.posCol == colIndex){
                    return true
                }
            }
            return false
        }
        const boardArray = []
        for(let i = 0; i < rows; i++){
            let rowArray = []
            for(let j = 0; j < cols; j++){
                const isActive = isActivePieceCell(i,j)
                if(isActive){
                    rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={"blue"} />)
                }else{
                    rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={"gray"} />)
                }
            }
            boardArray.push(rowArray)
        }
        console.log(boardArray)
        setGameBoardAllotment(boardArray)  
    }, [activePieceAllotment])
    return[gameBoardAllotment]
}
export {useGameBoardAllotment}