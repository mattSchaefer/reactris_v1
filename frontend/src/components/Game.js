import GameTime from "./GameTime";
import Gameboard from "./GameBoard";
import { useFrameTime } from "../hooks/FrameTimeHook";
import { usePieceAllotment } from "../hooks/PieceAllotmentHook";
import { useGameBoardAllotment } from "../hooks/GameBoardAllotmentHook";
import logo from '../logo.svg';
import PieceList from './pieces/PieceList'
const Game = () => {
    let TICK_LENGTH = 600
    const [frameTime, tickCount,  pauseTime, startTime, paused, setPaused, setStartTime, setPauseTime, setTickCount] = useFrameTime()
    const fallingPiece = PieceList[0]

    const [pieceAllotment] = usePieceAllotment(fallingPiece.props.type)
    const [gameBoardAllotment] = useGameBoardAllotment(10, 10, pieceAllotment)
    const paintBoardCells = (allotment) => {
    
    }
    // if(tickCount < 1)
    //     console.log(pieceAllotment)

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
                    />
                </span>
            </span>
            <span className="gameBoardContainer">
                Reactris
                <Gameboard useFrameTime={useFrameTime} tickCount={tickCount} pieceAllotment={pieceAllotment} gameBoardAllotment={gameBoardAllotment} />
            </span>
        </div>
    )
}

export default Game