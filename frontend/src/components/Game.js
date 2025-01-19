import GameTime from "./GameTime";
import Gameboard from "./Gameboard";
import { useFrameTime } from "../hooks/FrameTimeHook";
const Game = () => {
    let TICK_LENGTH = 600
    const [frameTime, tickCount,  pauseTime, startTime, paused, setPaused, setStartTime, setPauseTime, setTickCount] = useFrameTime()
    return (
        <div>
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
            <Gameboard rows={Array(10).fill(0)} cols={Array(10).fill(0)} useFrameTime={useFrameTime} tickCount={tickCount} />
        </div>
    )
}

export default Game