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
        src: "/videos/drops/See-you-later.mp4",
        title: "See You Later",
        description: {
            es: "Momentos épicos de See You Later.",
            en: "Epic moments from See You Later."
        }
    },
    {
        id: 2,
        src: "/videos/drops/0924-1.mov",
        title: "Live Drop 09/24",
        description: {
            es: "La energía de la pista en su punto máximo.",
            en: "Dancefloor energy at its peak."
        }
    },
    {
        id: 3,
        src: "/videos/drops/Terraza_15_12_2024.mp4",
        title: "Behind the Booth",
        description: {
            es: "Vista exclusiva desde la cabina.",
            en: "Exclusive view from the booth."
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
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const videoEl = e.currentTarget;
        setCurrentTime(videoEl.currentTime);
        if (duration === 0) setDuration(videoEl.duration);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="aspect-[9/16] bg-purple-900/10 rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl transition-all duration-500 group-hover:border-purple-400/40 group-hover:shadow-purple-500/20 group-hover:-translate-y-2">
            <video
                src={video.src}
                className="w-full h-full object-cover"
                autoPlay
                muted={!isActive}
                loop
                playsInline
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

            {/* Audio Wave Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center gap-[2px] px-6 pb-4 opacity-100 transition-opacity duration-300 pointer-events-none">
                {isLoading ? (
                    <div className="flex items-end gap-1 mb-2 animate-pulse">
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
                                className={`w-[4px] rounded-full transition-all duration-300 ${isPlayed ? 'bg-gradient-to-t from-purple-500 to-pink-500' : 'bg-white/20'}`}
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
        <section id="reels" className="min-h-screen py-20 bg-black/20 backdrop-blur-sm relative overflow-hidden snap-section full-section">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-audiowide mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {language === 'es' ? 'Vibras Verticales' : 'Vertical Vibes'}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        {language === 'es'
                            ? 'Explora mis momentos favoritos en formato vertical. Reels, Shorts y contenido exclusivo.'
                            : 'Explore my favorite moments in vertical format. Reels, Shorts, and exclusive content.'}
                    </p>
                </MotionDiv>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {verticalVideos.map((video, index) => (
                        <MotionDiv
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
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
