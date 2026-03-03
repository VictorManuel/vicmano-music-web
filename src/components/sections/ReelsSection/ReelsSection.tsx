import { FC, useState, useRef, useEffect } from 'react';
import { useLanguage } from "../../../context/LanguageContext";
import { MotionDiv } from '../../common/Motion/MyMotionComponents';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioWaveform } from '../../../hooks/useAudioWaveform';

interface VerticalVideo {
    id: number;
    src: string;
    title: string;
    description: {
        es: string;
        en: string;
    };
}

const verticalVideos: VerticalVideo[] = [
    {
        id: 1,
        src: "/videos/drops/See-you-later.min.mp4",
        title: "See You Later",
        description: {
            es: "Momentos del after de See You Later.",
            en: "Moments from the after of See You Later."
        }
    },
    {
        id: 2,
        src: "/videos/drops/Terraza-15-12-2024.min.mp4",
        title: "Terraza",
        description: {
            es: "Vista exclusiva desde la cabina.",
            en: "Exclusive view from the booth."
        }
    },
    {
        id: 3,
        src: "/videos/drops/Brians-Backyard.min.mp4",
        title: "Brian's Backyard",
        description: {
            es: "Momentos del after de See you Later.",
            en: "Moments from the after of See you Later."
        }
    },
    {
        id: 4,
        src: "/videos/drops/Terraza-01.min.mp4",
        title: "Terraza 01",
        description: {
            es: "Directo desde la terraza.",
            en: "Live from the terrace."
        }
    },
    {
        id: 5,
        src: "/videos/drops/Kook.min.mp4",
        title: "Kook x Amazonia",
        description: {
            es: "Un warmup que se picó.",
            en: "A warmup that was lit."
        }
    },
    {
        id: 6,
        src: "/videos/drops/Detroit-Techno-City.min.mp4",
        title: "Detroit Techno City",
        description: {
            es: "Una noche realmente desaforada.",
            en: "A lit night."
        }
    },
    {
        id: 7,
        src: "/videos/drops/Necochea.min.mp4",
        title: "Necochea Furiosa",
        description: {
            es: "Salteamos la misa en Necochea.",
            en: "We skipped mass in Necochea."
        }
    }
];

const WAVE_BARS = 30;

const ReelCard: FC<{
    video: VerticalVideo,
    isActive: boolean,
    onToggleAudio: () => void,
    language: string
}> = ({ video, isActive, onToggleAudio, language }) => {
    const { waveform, isLoading } = useAudioWaveform(video.src, WAVE_BARS);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.2 // Se considera visible si el 20% está en pantalla
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isScrubbing, setIsScrubbing] = useState(false);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isVisible) {
            videoRef.current.play().catch(() => {
                // Autoplay bloqueado por el navegador hasta interacción del usuario
            });
        } else {
            videoRef.current.pause();
        }
    }, [isVisible]);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const videoEl = e.currentTarget;
        if (!isScrubbing) {
            setCurrentTime(videoEl.currentTime);
        }
        if (duration === 0) setDuration(videoEl.duration);
    };

    const handleSeek = (e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current || !videoRef.current || duration === 0) return;

        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = x / rect.width;
        const newTime = percentage * duration;

        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsScrubbing(true);
        handleSeek(e);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isScrubbing) {
            handleSeek(e);
        }
    };

    const handleMouseUp = () => {
        setIsScrubbing(false);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div
            ref={cardRef}
            className="aspect-[9/16] bg-purple-900/10 rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl transition-all duration-500 group-hover:border-purple-400/40 group-hover:shadow-purple-500/20 group-hover:-translate-y-2"
        >
            <video
                ref={videoRef}
                src={isVisible ? video.src : undefined}
                className="w-full h-full object-cover"
                muted={!isActive}
                loop
                playsInline
                preload={isVisible ? "auto" : "none"}
                onTimeUpdate={handleTimeUpdate}
            />

            {/* Audio Toggle Icon */}
            <button
                onClick={onToggleAudio}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-black/60 transition-all duration-300 transform group-hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
                title={isActive ? (language === 'es' ? 'Silenciar' : 'Mute') : (language === 'es' ? 'Activar sonido' : 'Unmute')}
            >
                {isActive ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            {/* Audio Wave Progress Bar (Timeline) */}
            <div
                ref={containerRef}
                className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center gap-[2px] px-6 pb-4 opacity-100 transition-opacity duration-300 cursor-pointer select-none z-30"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => {
                    setIsScrubbing(true);
                    handleSeek(e);
                }}
                onTouchMove={(e) => {
                    if (isScrubbing) handleSeek(e);
                }}
                onTouchEnd={() => setIsScrubbing(false)}
            >
                {isLoading ? (
                    <div className="flex items-end gap-1 mb-2 animate-pulse pointer-events-none">
                        {[...Array(WAVE_BARS)].map((_, i) => (
                            <div key={i} className="w-[4px] h-4 bg-white/10 rounded-full" />
                        ))}
                    </div>
                ) : (
                    waveform.map((height, i) => {
                        const barProgress = (i / WAVE_BARS) * 100;
                        const isPlayed = progress >= barProgress;

                        return (
                            <div
                                key={i}
                                className={`w-[4px] rounded-full transition-all duration-300 pointer-events-none ${isPlayed ? 'bg-gradient-to-t from-purple-500 to-pink-500' : 'bg-white/20'}`}
                                style={{
                                    height: `${height}%`,
                                    opacity: isPlayed ? 1 : 0.4
                                }}
                            />
                        );
                    })
                )}
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-x-0 bottom-16 p-6 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-audiowide text-lg mb-2">{video.title}</h3>
                <p className="text-gray-300 text-sm italic">
                    {video.description[language as keyof typeof video.description]}
                </p>
            </div>
        </div>
    );
};

const ReelsSection: FC = () => {
    const { language } = useLanguage();
    const [activeAudioId, setActiveAudioId] = useState<number | null>(null);

    return (
        <section id="reels" className="min-h-screen py-11 bg-black/20 backdrop-blur-sm relative overflow-hidden snap-section full-section flex flex-col justify-center">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    {/* <h2 className="text-4xl md:text-5xl font-audiowide mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {language === 'es' ? 'Drops' : 'Drops'}
                    </h2> */}
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {language === 'es'
                            ? 'Algunos drops, para escuchar, para reel, para shorts, para música'
                            : 'Some drops, to listen, for reels, for shorts, for music'}
                    </p>
                </MotionDiv>

                <div className="flex flex-col lg:flex-row lg:overflow-x-auto lg:snap-x lg:snap-mandatory gap-6 w-full pb-8 px-4 items-center lg:items-start custom-scrollbar">
                    {verticalVideos.map((video, index) => (
                        <MotionDiv
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative w-full lg:max-w-[280px] lg:min-w-[280px] lg:flex-shrink-0 lg:snap-center"
                        >
                            <ReelCard
                                video={video}
                                isActive={activeAudioId === video.id}
                                onToggleAudio={() => setActiveAudioId(activeAudioId === video.id ? null : video.id)}
                                language={language}
                            />
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default ReelsSection;

// Custom Scrollbar Styles
const style = document.createElement('style');
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    height: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to right, #a855f7, #ec4899);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, #9333ea, #db2777);
  }
`;
document.head.appendChild(style);
