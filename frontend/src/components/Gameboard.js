import BoardCell from './BoardCell'

const Gameboard = (props) => {
    const rows = props.rows, cols = props.cols
    const onCellClick = (ri,ci) =>{alert(ri,ci)}
    return(
        <div className="gameBoardContainer">
            {
                props.gameBoardAllotment.map((row, rowIndex) => {
                    return(
                        <div key={rowIndex} className="boardRow">
                            {
                                row.map((cell, colIndex) => {
                                    return(
                                        <span className="boardCellContainer">
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