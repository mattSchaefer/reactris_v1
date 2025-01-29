import BoardCell from './BoardCell'

const Gameboard = (props) => {
    return(
        <div className="gameBoardContainer">
            {
                props.gameBoardAllotment.map((row, rowIndex) => {
                    return(
                        <div key={rowIndex} className="boardRow">
                            {
                                row.map((cell, colIndex) => {
                                    return(
                                        <span className="boardCellContainer" key={colIndex}>
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
    )
};


export default Gameboard