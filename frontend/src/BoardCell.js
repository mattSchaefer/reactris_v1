import React, {useState, useEffect} from 'react'

const BoardCell = (props) => {

    return(
        <span className="grayCell">
            <span>{props.rowIndex}</span>,
            <span>{props.colIndex}</span>
        </span>
    )
}

export default BoardCell