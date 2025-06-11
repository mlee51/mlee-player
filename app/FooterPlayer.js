import { useEffect, useRef, useState } from "react";
import AnimatedText from "./AnimatedText";

export default function FooterPlayer({
    track,
    audioRef,
    tracks,
    onNext,
    onPrev,
    isShuffling,
    setIsShuffling,
    isPlaying,
    setIsPlaying
}) {
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const progressBarRef = useRef(null);


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);

        const updateProgress = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            onNext(); // auto next
        };

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [audioRef, onNext]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) audio.volume = volume;
    }, [volume]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const seek = (e) => {
        const audio = audioRef.current;
        const progressBar = progressBarRef.current;
        if (!audio || !progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX; // global horizontal mouse position
        const percent = (x - rect.left) / rect.width;
        // Clamp value to 0–1 and apply
        audio.currentTime = Math.min(1, percent) * audio.duration;
    };


    const format = (t) =>
        isNaN(t) ? "--:--" : `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;

    if (!track) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 px-4 py-2 z-50 backdrop-blur-xs select-none font-semibold">
            <div className="flex items-center lg:pr-0 pr-10 justify-between gap-4">


                {/* Controls */}
                <div className="pl-2 flex items-center gap-2 ">
                    <button className="cursor-pointer hover:animate-pulse" onClick={onPrev} title="Previous">«</button>
                    <button
                        onClick={togglePlay}
                        title="Play/Pause"
                        className="w-6 flex-auto text-center cursor-pointer hover:animate-pulse"
                    >
                        {isPlaying ? "❚❚" : "▶"}
                    </button>
                    <button className="cursor-pointer" onClick={onNext} title="Next">»</button>
                  
                </div>

               
                {/* Track Info */}
                <div className="flex-1 min-w-[200px] lg:mr-0">
                    
                    <div className="font-medium truncate mb-[2px]">
                        {isPlaying ? <AnimatedText className='font-semibold' content={track.title} /> : track.title}
                    </div>
                    
                    <div
                        ref={progressBarRef}
                        className="h-2 border opacity-40 cursor-pointer w-full m-0"
                        onClick={seek}
                    >

                        <div
                            className="h-2 bg-foreground"
                            style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                        />
                    </div>
                    <div className="text-xs mt-1">
                        {format(progress)} / {format(duration)}
                    </div>
                </div>
                
                <button
                    onClick={() => setIsShuffling((s) => !s)}
                    title="Shuffle"
                    className={`cursor-pointer font-light mr-1 ml-1 hover:animate-pulse ${isShuffling && 'font-semibold'}`}
                >
                    shuffle
                </button>

        
                
                {/* Volume */}
                <div className="hidden lg:flex items-center gap-2 min-w-[120px] hover:animate-pulse">
                    <label className="cursor-pointer" onClick={() => setVolume(volume !== 0 ? 0 : 1)}>vol</label>
                    <input
                        className="volume opacity-40 cursor-pointer "
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}
