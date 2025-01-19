import React, {useState, useEffect} from 'react'

const BoardCell = (props) => {

    return(
        <span className="grayCell">
            <div className="whichCellContainer">
                <span className="tiny-log">{props.rowIndex}</span>,
                <span className="tiny-log">{props.colIndex}</span>

            </div>
            <span>{props.tickCount}</span>
        </span>
    )
}

export default BoardCell