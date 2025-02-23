import React, { useState } from 'react'
import BoardCell from './BoardCell'
const NextPiece = (props) => {
    React.useEffect(() => {
        console.log("NextPiece mounted")
        console.log(props.pieceList[1])
    }, [props.pieceList])
    return(
        <div className="nextPiece">
            <h3>Next Piece</h3>
            <div className="nextPieceBackdrop">
                {
                    props.nextPieceBoardAllotment.map((row, rowIndex) => {
                        return(
                            <div className="nextPieceRow" key={rowIndex}>
                                {
                                    row.map((cell, colIndex) => {
                                        return(
                                            <span className="nextPieceCellContainer" key={colIndex}>
                                                {cell}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default NextPiece