import { useState, useRef, useEffect } from "react"
import {
    PlayCircleFilled,
    PauseOutlined,
    FastRewind,
    FastForward,
    VolumeDown,
    VolumeUp,
    PauseCircleFilled,


} from "@material-ui/icons";
import { useStateValue } from "../redux/StateProvider";

function Player() {
    // state
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // references
    const audioPlayer = useRef();   // reference our audio component
    const progressBar = useRef();   // reference our progress bar
    const animationRef = useRef();  // reference the animation

    useEffect(() => {
        const seconds = Math?.floor(audioPlayer?.current?.duration);
        setDuration(seconds);
        if (progressBar?.current)
            progressBar?.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs) => {
        const minutes = Math?.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math?.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer?.current?.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            audioPlayer?.current?.pause();
            cancelAnimationFrame(animationRef?.current);
        }
    }

    const whilePlaying = () => {
        if (progressBar?.current)
            progressBar?.current.value = audioPlayer?.current?.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }

    const changeRange = () => {
        audioPlayer?.current.currentTime = progressBar?.current?.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar?.current?.style?.setProperty('--seek-before-width', `${progressBar?.current?.value / duration * 100}%`)
        setCurrentTime(progressBar?.current?.value);
    }
    const updateCurrentTime = () => {
        setCurrentTime(progressBar?.current?.value);
    };
    const changeAudioToPlayhead = () => {
        audioPlayer?.current.currentTime = progressBar?.current?.value;
        setCurrentTime(progressBar?.current?.value);
        progressBar?.current?.style?.setProperty(
            '--seek-before-width',
            `${(progressBar?.current?.value / duration) * 100}%`
        );
    };

    const timeTravel = (newTime) => {
        progressBar?.current.value = newTime;
        updateCurrentTime();
        changeAudioToPlayhead();
    };

    const backThirty = () => {
        timeTravel(Number(progressBar?.current?.value) - 30);
    }

    const forwardThirty = () => {
        timeTravel(Number(progressBar?.current?.value) + 30);
    }

    const [vol, setVol] = useState(50);
    // const audio = document?.getElementById('audioPlayer');
    const [{podcast},dispatch] = useStateValue();
    useEffect(()=>{
        if (podcast)
        {
            setIsPlaying(true);
            audioPlayer?.current?.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
    },[podcast])
    // const url = "https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Podcast1.wav?alt=media&token=2e628242-28a8-4366-a07d-b06779d3f3f3"
    if (podcast.url)
    return (

        <div className="flex  justify-between text-xs md:text-base px-2 md:px-8">
            <audio id={"audioplayer"} ref={audioPlayer} src={podcast.url} preload="metadata" loop={true} ></audio>


            <div className="flex items-center space-x-4">
                <img className="hidden md:inline h-10 w-10" src={podcast?.img?podcast.img:"https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/Screenshot%202022-01-05%20at%2023-25-55%20Wix%20Logo%20Maker.png?alt=media&token=ea3eec4e-3896-4361-b25c-877a47cbdd1c"} alt="logo" />
                <div className="w-[80px] relative flex flex-col overflow-x-hidden">
                    <div className="w-fit animate-marquee whitespace-nowrap">
                        <span className="overflow-ellipsis">{podcast.title}</span>

                    </div>
                    <div className="w-fit animate-marquee whitespace-nowrap">
                        <span className="">{podcast.creators}</span>

                    </div>
                </div>
            </div>
            <div className="flex-1 flex items-center mx-3">

                {!isNaN(duration) ? (<div className="mx-1">{calculateTime(currentTime)}</div>) : null}

                <input className="w-full  cursor-pointer my-1" type="range" defaultValue="0" ref={progressBar} onChange={changeRange} />
                {!isNaN(duration) ? (<div className="mx-1">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>) : null}




            </div>

            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <div className="flex  items-center justify-evenly">
                    <FastRewind className="playbtn" onClick={backThirty} />
                    <div onClick={togglePlayPause} className="cursor-pointer">
                        {isPlaying ? <PauseCircleFilled className="w-10 h-10 playbtn  text-green-500" /> : <PlayCircleFilled className="w-10 h-10 playbtn  text-green-500" />}
                    </div>

                    <FastForward className="playbtn" onClick={forwardThirty} />
                </div>
            </div>
        </div>
    )
    return null
}

export default Player
