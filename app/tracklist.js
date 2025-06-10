import { useEffect, useRef, useState } from "react";
import FooterPlayer from "./FooterPlayer";
import AnimatedText from "./AnimatedText";

export default function TrackList() {
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const audioRef = useRef(null);


    useEffect(() => {
        const loadManifest = async () => {
            const res = await fetch("/audio/manifest.json");
            const data = await res.json();

            const withDurations = await Promise.all(
                data.map((track) => {
                    return new Promise((resolve) => {
                        const audio = new Audio(track.file);
                        audio.addEventListener("loadedmetadata", () => {
                            const duration = audio.duration;
                            const minutes = Math.floor(duration / 60);
                            const seconds = Math.floor(duration % 60)
                                .toString()
                                .padStart(2, "0");
                            resolve({ ...track, duration: `${minutes}:${seconds}` });
                        });
                        audio.addEventListener("error", () => {
                            resolve({ ...track, duration: "unknown" });
                        });
                    });
                })
            );

            setTracks(withDurations);
        };

        loadManifest();
    }, []);

    const playTrack = (index) => {
        if (!audioRef.current || index == null) return;
        audioRef.current.src = tracks[index].file;
        audioRef.current.play();
        setCurrentTrackIndex(index);
    };

    const nextTrack = () => {
        if (!tracks.length) return;
        if (isShuffling) {
            if (tracks.length <= 1) return; // nothing else to shuffle
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * tracks.length);
            } while (randomIndex === currentTrackIndex);
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
            <div className="grid w-full pb-24">
                {tracks.map((track, index) => (
                    <button
                        key={index}
                        onClick={() => playTrack(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`grid grid-cols-[1fr_auto] gap-x-12 w-full text-left py-2 px-3 rounded hover:backdrop-blur-xs hover:font-semibold ${currentTrackIndex === index ? "backdrop-blur-xs font-semibold" : ""
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
