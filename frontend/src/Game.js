import GameTime from "./GameTime";
import Gameboard from "./Gameboard";

const Game = () => {
    let TICK_LENGTH = 600
    return (
        <div>
            <GameTime tickLength={TICK_LENGTH}/>
            <Gameboard rows={Array(10).fill(0)} cols={Array(10).fill(0)} />
        </div>
    )
}

export default Game