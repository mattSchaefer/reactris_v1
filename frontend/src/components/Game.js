import GameTime from "./GameTime"
import Gameboard from "./GameBoard"
import { useFrameTime } from "../hooks/FrameTimeHook"
import { usePieceAllotment } from "../hooks/PieceAllotmentHook"
import { useGameBoardAllotment } from "../hooks/GameBoardAllotmentHook"
import logo from '../logo.svg';
import PieceList from './pieces/PieceList'
const Game = () => {
    let TICK_LENGTH = 150
    let BOARD_DIMENSIONS = {rows: 15, cols: 10}
    const [pieceAllotment, setPieceAllotment, pieceList, setPieceList] = usePieceAllotment()
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
        willCollideWithOccupiedCell
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