import React, {useState, useEffect} from 'react'
const BoardCell = (props) => {
    const [populated, setPopulated] = useState(false)
    const[tempPoplated, setTempPopulated] = useState(false)
    const colorClass = props.color+"Cell"
    return(
        <span className={colorClass}>
            
             <span className="boardCellLabel">{props.rowIndex+","+props.colIndex}</span> 
        </span>
    )
}
export default BoardCell