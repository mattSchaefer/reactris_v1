import React, {useState, useEffect} from 'react'
import Piece from './Piece'
// const PieceList = () => {
//     return(
//         <span className="grayCell">
//             {/* <div className="whichCellContainer">
//                 <span className="tiny-log">{props.rowIndex}</span>,
//                 <span className="tiny-log">{props.colIndex}</span>
//             </div> */}
//             {/* <span>{props.tickCount}</span> */}
//         </span>
//     )
// }
const PieceList = [<Piece type={'bar'} active={true}/>]
export default PieceList