import GameTime from "./GameTime"
import Gameboard from "./GameBoard"
import Piece from '../components/pieces/Piece'
import { useFrameTime } from "../hooks/FrameTimeHook"
import { usePieceAllotment } from "../hooks/PieceAllotmentHook"
import { useGameBoardAllotment } from "../hooks/GameBoardAllotmentHook"
import logo from '../logo.svg';
const Game = () => {
    let TICK_LENGTH = 600
    let BOARD_DIMENSIONS = {rows: 15, cols: 10}
    let pieces = 100
    let random_pieces = []
    const piece_types = ["T", "J", "S", "Z", "L", "square", "bar"]
    for(let i = 0; i < pieces; i++)
        random_pieces.push(<Piece type={/*piece_types[Math.floor(Math.random() * piece_types.length)]*/"Z"} active={true} />)

    const [pieceAllotment, setPieceAllotment, pieceList, setPieceList] = usePieceAllotment(random_pieces)
    const [gameBoardAllotment, setGameBoardAllotment] = useGameBoardAllotment(
        BOARD_DIMENSIONS.rows, 
        BOARD_DIMENSIONS.cols, 
        pieceAllotment
    )
    const [
        frameTime, 
        tickCount,  
        pauseTime, 
        startTime, 
        paused, 
        setPaused, 
        setStartTime, 
        setPauseTime, 
        setTickCount,
        willCollideWithOccupiedCell,
        rotatePiece
    ] = useFrameTime(
        TICK_LENGTH, 
        BOARD_DIMENSIONS.rows, 
        BOARD_DIMENSIONS.cols, 
        pieceAllotment, 
        setPieceAllotment, 
        setGameBoardAllotment, 
        gameBoardAllotment,
        pieceList,
        setPieceList
    )
    const handleKeyDown = (e) => {
        console.log(e.key)
        if(
            e.key === "ArrowLeft" && 
            !willCollideWithOccupiedCell(pieceAllotment, "left") && 
            !willCollideWithOccupiedCell(pieceAllotment, "down") && 
            !paused
        ){
            e.preventDefault()
            setPieceAllotment((prevAllotment) =>
            {
                return prevAllotment.map((row) =>
                row.map((piece) => ({
                    ...piece,
                    posCol: parseInt(piece.posCol) - 1,
                }))
                )
            });
        }else if(
            e.key === "ArrowRight"  && 
            !willCollideWithOccupiedCell(pieceAllotment, "right") && 
            !willCollideWithOccupiedCell(pieceAllotment, "down") && 
            !paused
        ){
            e.preventDefault()
            setPieceAllotment((prevAllotment) =>
            {
                return prevAllotment.map((row) =>
                row.map((piece) => ({
                    ...piece,
                    posCol: parseInt(piece.posCol) + 1,
                }))
                )
            });
        }else if(e.key === "f"){
            //rotate piece right
            let piece_copy = [...pieceAllotment].flat()
            let center = piece_copy.filter((ele) => ele.center)[0]
            var new_piece = []
            if(pieceList[0].props.type == "Z"){
                console.log(piece_copy[0])
                if(piece_copy[0].rot == "h"){
                    for(var i = 0; i < piece_copy.length; i++){
                        let this_cell = piece_copy[i]
                        if(!this_cell.center){
                            if(this_cell.posCol > center.posCol){
                                new_piece.push({
                                    posCol: this_cell.posCol - 2, 
                                    posRow: this_cell.posRow /*- 1*/, 
                                    color: this_cell.color, 
                                    type: this_cell.type, 
                                    rot: "v"})
                            }else if(this_cell.posCol < center.posCol){
                                new_piece.push({
                                    posCol: this_cell.posCol + 1, 
                                    posRow: this_cell.posRow - 1, 
                                    color: this_cell.color, 
                                    type: this_cell.type, 
                                    rot: "v" })
                            }else{
                                new_piece.push({
                                    posCol: this_cell.posCol - 1, 
                                    posRow: this_cell.posRow - 1, 
                                    color: this_cell.color, 
                                    type: this_cell.type, 
                                    rot: "v"})
                            }
                        }else{//this_cell
                            new_piece.push({
                                posCol: this_cell.posCol, 
                                posRow: this_cell.posRow, 
                                color: this_cell.color, 
                                type: this_cell.type, 
                                rot: "v", center: true
                            })
                        }
                    }
                    setPieceAllotment((prevAllotment) => {
                        return [new_piece]
                    })
                }else{
                    for(var i = 0; i < piece_copy.length; i++){
                        let this_cell = piece_copy[i]
                        if(!this_cell.center){
                            if(this_cell.posRow > center.posRow && this_cell.posCol < center.posCol){
                                console.log("first")
                                new_piece.push({
                                    posCol: this_cell.posCol + 2, 
                                    posRow: this_cell.posRow, 
                                    color: this_cell.color, 
                                    type: this_cell.type, 
                                    rot: "h"})
                            }else if(this_cell.posCol == center.posCol && this_cell.posRow < center.posRow){
                                console.log("second")
                                new_piece.push({
                                    posCol: this_cell.posCol, 
                                    posRow: this_cell.posRow + 2, 
                                    color: this_cell.color, 
                                    type: this_cell.type, 
                                    rot: "h" })
                            }else{
                                console.log("thired")
                               new_piece.push({posCol: this_cell.posCol , 
                                posRow: this_cell.posRow, 
                                color: this_cell.color, 
                                type: this_cell.type, 
                                rot: "h"})
                            }
                        }else{//this_cell
                            new_piece.push({posCol: this_cell.posCol, 
                                posRow: this_cell.posRow, 
                                color: this_cell.color, 
                                type: this_cell.type, 
                                rot: "h", 
                                center: true})
                        }
                    }
                    setPieceAllotment((prevAllotment) => {
                        return [new_piece]
                    })
                }
            }
        }
    }
    const handleKeyUp = (e) => {
        e.preventDefault()
    }
    return (
        <div className="gameContainer" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
            <span className="gameSidePanel">
                <img src={logo} className="App-logo" alt="logo" />
                <span className="gameTimeContainer">
                    <GameTime tickLength={TICK_LENGTH}
                        frameTime={frameTime}
                        tickCount={tickCount}
                        pauseTime={pauseTime}
                        startTime={startTime}
                        setStartTime={setStartTime}
                        setPauseTime={setPauseTime}
                        setTickCount={setTickCount}
                        paused={paused}
                        setPaused={setPaused}
                        pieceAllotment={pieceAllotment}
                        pieceList={pieceList}
                    />
                </span>
            </span>
            <span className="gameBoardContainer">
                Reactris
                <Gameboard  tickCount={tickCount} pieceAllotment={pieceAllotment} 
                setPieceAllotment={setPieceAllotment} gameBoardAllotment={gameBoardAllotment} 
                startTime={startTime} pauseTime={pauseTime} />
            </span>
        </div>
    )
}

export default Game