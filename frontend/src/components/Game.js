import GameTime from "./GameTime"
import Gameboard from "./GameBoard"
import Piece from '../components/pieces/Piece'
import { useFrameTime } from "../hooks/FrameTimeHook"
import { usePieceAllotment } from "../hooks/PieceAllotmentHook"
import { useGameBoardAllotment } from "../hooks/GameBoardAllotmentHook"
import { rotatePiece, movePieceLeft, movePieceRight, progressPieceDownward } from '../hooks/PieceMover'
import logo from '../logo.svg';
const Game = () => {
    let TICK_LENGTH = 600
    let BOARD_DIMENSIONS = {rows: 15, cols: 10}
    let pieces = 100
    let random_pieces = []
    const PIECE_TYPES = ["T", "J", "S", "Z", "L", "square", "bar"]
    for(let i = 0; i < pieces; i++)
        random_pieces.push(<Piece type={PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)]/*"bar"*/} active={true} />)

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
        tickLength,
        setTickLength
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
        var e_key = e.key
        var e_lower = e.key.toString().toLowerCase()
        if(
            e_key === "ArrowLeft" && 
            !willCollideWithOccupiedCell(pieceAllotment, "left") && 
            !willCollideWithOccupiedCell(pieceAllotment, "down") && 
            !paused
        ){
            e.preventDefault()
            setPieceAllotment((prevAllotment) =>
                movePieceLeft(prevAllotment)
            );
        }else if(
            e_key === "ArrowRight"  && 
            !willCollideWithOccupiedCell(pieceAllotment, "right") && 
            !willCollideWithOccupiedCell(pieceAllotment, "down") && 
            !paused
        ){//TODO: move to pieceRotator
            e.preventDefault()
            setPieceAllotment((prevAllotment) =>
                movePieceRight(prevAllotment)
            );
        }else if(e_key == "ArrowDown" && !willCollideWithOccupiedCell(pieceAllotment, "down") && !paused){
            setPieceAllotment((prevAllotment) => progressPieceDownward(prevAllotment))
            //setTickLength((prev) => {return 450;})
        }else if(e.key == "f" || e.key== "d"){
            //TODO:
            //invoke the function before setting the state...
            //then, make a function that takes the cells of the to-be-placed piece and make sure it's not occupied
            //if not occupied, rotatePiece
            var dir
            if(e_lower == "f")
                dir = "r"
            else
                dir = "l"
            if(pieceList[0].props.type == "square")
                return
            let rotated_piece = rotatePiece(pieceAllotment, pieceList, dir)
            //setPieceAllotment((prevAllotment) => rotatePiece(prevAllotment, pieceList, dir))
            if(!willCollideWithOccupiedCell(rotated_piece))
                setPieceAllotment((prevAllotment) => rotated_piece)
        }
    }
    const handleKeyUp = (e) => {
        e.preventDefault()
        console.log("key up")
        console.log(e.key)
        setTimeout(() => {
            if(e.key == "ArrowDown" && !willCollideWithOccupiedCell(pieceAllotment, "down") && !paused){
               // setTickLength((prev) => {return 600;})

            }
        },5)
    }
    return (
        <div className="gameContainer" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex="0">
            <span className="gameSidePanel">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
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