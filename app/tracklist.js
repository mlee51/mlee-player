import { useEffect, useRef, useState } from "react";
import FooterPlayer from "./FooterPlayer";
import AnimatedText from "./AnimatedText";

export default function TrackList({ setIsLoading }) {
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showIntroAnimation, setShowIntroAnimation] = useState(true);
    const [shuffledHistory, setShuffledHistory] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
        const loadManifest = async () => {
          const res = await fetch("/audio/manifest.json");
          const data = await res.json();
      
          setTracks(data);
          if (typeof setIsLoading === "function") setIsLoading(false);
          setShowIntroAnimation(false);
        };
      
        loadManifest();
      }, []);

    useEffect(() => {
        if (!isShuffling) setShuffledHistory([]);
    }, [isShuffling]);
    

    const playTrack = (index) => {
        if (!audioRef.current || index == null) return;
        audioRef.current.src = tracks[index].file;
        audioRef.current.play();
        setCurrentTrackIndex(index);
        if(shuffledHistory.length===tracks.length-1) setShuffledHistory([])
        else setShuffledHistory([...shuffledHistory,index])
    };

    const nextTrack = () => {
        if (!tracks.length) return;
        if (isShuffling) {
            if (tracks.length <= 1) return; // nothing else to shuffle
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * tracks.length);
            } while (randomIndex === currentTrackIndex || shuffledHistory.includes(randomIndex));
            playTrack(randomIndex);
        }
        else {
            playTrack((currentTrackIndex + 1) % tracks.length);
        }
    };

    const prevTrack = () => {
        if (!tracks.length) return;
        const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        playTrack(prevIndex);
    };

    return (
        <>
            {!showIntroAnimation && <AnimatedText className={`self-end font-mono tracking-widest px-4 lg:mt-50 mt-25 mb-6 select-none ${isPlaying? 'animate-pulse':''}`} />}
            <div className="grid w-full">
                {tracks.map((track, index) => (
                    <button
                        key={index}
                        onClick={() => playTrack(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`grid grid-cols-[1fr_auto] px-4 gap-x-1 w-full hover:font-semibold text-left py-1 rounded ${index%2===0? "":"gradient"} ${currentTrackIndex === index ? "backdrop-blur-xl animate-pulse font-semibold tracking-widest" : ""
                            }`}
                    >
                        <span>
                            {hoveredIndex === index || (index === currentTrackIndex && isPlaying)
                                ? <AnimatedText content={track.title} />
                                : track.title}
                        </span>
                        <span className="text-right">{track.duration}</span>
                    </button>
                ))}
            </div>

            <FooterPlayer
                track={tracks[currentTrackIndex]}
                audioRef={audioRef}
                tracks={tracks}
                onNext={nextTrack}
                onPrev={prevTrack}
                isShuffling={isShuffling}
                setIsShuffling={setIsShuffling}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            <audio ref={audioRef} hidden />
        </>
    );
}
