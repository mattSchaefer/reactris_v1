import React, {useState, useEffect} from 'react'
import BoardCell from '../components/BoardCell'
const useGameBoardAllotment = (rows, cols, pieceAllotment,nextPieceAllotment, tickCount = null, startTime= null, pauseTime= null, TICK_LENGTH= null, lastTickTime= null) => {
    const boardArray = []
    for(let i = 0; i < rows; i++){
        let rowArray = []
        for(let j = 0; j < cols; j++){
            
            rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={"gray"} tickCount={tickCount} active={false} occupied={false} />)
            
        }
        boardArray.push(rowArray)
    }
    const nextPieceArray = []
    for(let i = 0; i < 4; i++){
        let rowArray1 = []
        for(let j = 0; j < 5; j++){
            
            rowArray1.push(<BoardCell rowIndex={i} colIndex={j} color={"gray"} tickCount={tickCount} active={false} occupied={false} />)
            
        }
        nextPieceArray.push(rowArray1)
    }
    const [gameBoardAllotment, setGameBoardAllotment] = useState(boardArray)
    const [nextPieceBoardAllotment, setNextPieceBoardAllotment] = useState(nextPieceArray)
    React.useEffect(() => {
        //console.log("game board effect on PieceAllotment change")
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
        for(let i = 0; i < gameBoardAllotment.length; i++){
            let rowArray = []
            for(let j = 0; j < gameBoardAllotment[i].length; j++){
                const isActive = isFallingPieceCell(i,j)
                if(isActive){
                    rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={flatPiece[0].color} tickCount={tickCount} active={true} occupied={false} />)
                }else{
                    //console.log("!!!extra piece" + gameBoardAllotment[i][j])
                    var clone_props = {...gameBoardAllotment[i][j].props}
                    if(clone_props.occupied == false)
                        rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={"gray"} tickCount={tickCount} active={false} occupied={false} />)
                    else
                        rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={clone_props.color} tickCount={tickCount} active={false} occupied={true} />)
                }
            }
            boardArray.push(rowArray)
        }
        setGameBoardAllotment(boardArray)  
    }, [pieceAllotment])//added gameBoardAllotment.... is this needed?
    React.useEffect(() => {
        console.log("next piece allotment change")
        const flatPiece = nextPieceAllotment.flat()
        const isPieceCell = (rowIndex, colIndex) => {
            for(let i = 0; i < flatPiece.length; i++){
                if(flatPiece[i].posRow == rowIndex && flatPiece[i].posCol == colIndex){
                    return true
                }
            }
            return false
        }
        const boardArray = []
        for(let i = 0; i < nextPieceBoardAllotment.length; i++){
            let rowArray = []
            for(let j = 0; j < nextPieceBoardAllotment[i].length; j++){
                const isActive = isPieceCell(i,j)
                if(isActive){
                    rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={flatPiece[0].color} tickCount={tickCount} active={true} occupied={false} />)
                }else{
                    //console.log("!!!extra piece" + gameBoardAllotment[i][j])
                    var clone_props = {...nextPieceBoardAllotment[i][j].props}
                    if(clone_props.occupied == false)
                        rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={"clear"} tickCount={tickCount} active={false} occupied={false} />)
                    else
                        rowArray.push(<BoardCell rowIndex={i} colIndex={j} color={clone_props.color} tickCount={tickCount} active={false} occupied={true} />)
                }
            }
            boardArray.push(rowArray)
        }
        setNextPieceBoardAllotment(boardArray)
    }, [nextPieceAllotment])
    return[gameBoardAllotment, setGameBoardAllotment, nextPieceBoardAllotment, setNextPieceBoardAllotment]
}
export {useGameBoardAllotment} 