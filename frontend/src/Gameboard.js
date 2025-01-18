import BoardCell from './BoardCell'
const Gameboard = (props) => {
    const rows = props.rows, cols = props.cols
    const onCellClick = (ri,ci) =>{alert(ri,ci)}
    return(
        <div className="gameBoardContainer">
            {
                rows.map((row, rowIndex) => {
                    return(
                        <div key={rowIndex} className="boardRow">
                            {
                                cols.map((col, colIndex) => {
                                    return(
                                        <span className="boardCellContainer">
                                            <BoardCell colIndex={colIndex} rowIndex={rowIndex}  onClick={() => onCellClick(rowIndex, colIndex)} />
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