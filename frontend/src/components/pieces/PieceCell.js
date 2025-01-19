import React, { useState } from 'react'

const PieceCell = (props) => {
    return(
        <span className="blueCell">
            {/* <div className="whichCellContainer">
                <span className="tiny-log">{props.rowIndex}</span>,
                <span className="tiny-log">{props.colIndex}</span>
            </div> */}
            {/* <span>{props.tickCount}</span> */}
        </span>
    )
}

export default PieceCell