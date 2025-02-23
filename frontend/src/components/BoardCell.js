import React, {useState, useEffect} from 'react'
const BoardCell = (props) => {
    const colorClass = props.color+"Cell"
    return(
        <span className={colorClass}>
            
             <span className="boardCellLabel">
                {/* {props.rowIndex+","+props.colIndex} */}
                
            </span> 
        </span>
    )
}
export default BoardCell