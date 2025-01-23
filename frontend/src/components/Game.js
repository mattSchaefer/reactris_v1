import GameTime from "./GameTime";
import Gameboard from "./GameBoard";
import { useFrameTime } from "../hooks/FrameTimeHook";
import { usePieceAllotment } from "../hooks/PieceAllotmentHook";
import { useGameBoardAllotment } from "../hooks/GameBoardAllotmentHook";
import logo from '../logo.svg';
import PieceList from './pieces/PieceList'
const Game = () => {
    let TICK_LENGTH = 600
    let BOARD_DIMENSIONS = {rows: 15, cols: 10}
    const fallingPiece = PieceList[0]
    const [pieceAllotment, setPieceAllotment] = usePieceAllotment(fallingPiece.props.type)
    const [gameBoardAllotment, setGameBoardAllotment] = useGameBoardAllotment(BOARD_DIMENSIONS.rows, BOARD_DIMENSIONS.cols, pieceAllotment)
    const [frameTime, tickCount,  pauseTime, startTime, paused, setPaused, setStartTime, setPauseTime, setTickCount] = useFrameTime(TICK_LENGTH, BOARD_DIMENSIONS.rows, BOARD_DIMENSIONS.cols, pieceAllotment, setPieceAllotment, setGameBoardAllotment, gameBoardAllotment)
    return (
        <div className="gameContainer">
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
                    />
                </span>
            </span>
            <span className="gameBoardContainer">
                Reactris
                {/* useFrameTime={useFrameTime} */}
                <Gameboard  tickCount={tickCount} pieceAllotment={pieceAllotment} setPieceAllotment={setPieceAllotment} gameBoardAllotment={gameBoardAllotment} startTime={startTime} pauseTime={pauseTime} />
            </span>
        </div>
    )
}

export default Game