import { useState } from "react"
import {
    PlayCircleFilled,
    PauseOutlined,
    FastRewind,
    FastForward,
    VolumeDown,
    VolumeUp,


} from "@material-ui/icons";

function Player() {
    const [vol, setVol] = useState(50);
    const [playTime, setPlayTime] = useState(0);
    return (
        <div className="flex  justify-between text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-25-55%20Wix%20Logo%20Maker.png?alt=media&token=ea3eec4e-3896-4361-b25c-877a47cbdd1c" alt="logo" />
                <div >
                    <h3>Podcast Name</h3>
                    <p>Podcast Artist</p>
                </div>
            </div>
            <div>
                <div>
                    <input className="w-full  cursor-pointer my-1" type="range" min={0} step={1} max={100} value={playTime} onChange={(e) => {
                        setPlayTime(e.target.value)
                    }} />
                </div>
                <div className="flex  items-center justify-evenly">
                    <FastRewind className="playbtn" />
                    <PlayCircleFilled className="w-10 h-10 playbtn  text-green-500" />
                    <FastForward className="playbtn" />
                </div>

            </div>

            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <div className="playbtn">
                    <VolumeDown onClick={() => {
                        vol > 0 && setVol(vol - 2)
                    }} />
                </div>

                <input className="w-10 md:w-28 cursor-pointer" type="range" min={0} step={1} max={100} value={vol} onChange={(e) => {
                    setVol(e.target.value)
                }} />
                <div className="playbtn">
                    <VolumeUp onClick={() => {
                        vol < 100 && setVol(vol + 2)
                    }} />
                </div>

            </div>
        </div>
    )
}

export default Player
