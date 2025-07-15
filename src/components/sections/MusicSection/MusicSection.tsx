import { useLanguage } from "../../../context/LanguageContext"
import { Play, Pause, Music, Headphones, Download, ExternalLink } from "lucide-react"
import { FC, useState } from "react"
import { MotionDiv } from '../../common/Motion/MyMotionComponents'

interface Track {
  id: number
  title: string
  artist: string
  duration: string
  genre: string
  imageUrl: string
  audioUrl?: string
  streamingUrl?: string
  downloadUrl?: string
}

const MusicSection: FC = () => {
  const { t } = useLanguage()
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  // Placeholder tracks - en un caso real vendrían de una API
  const tracks: Track[] = [
    {
      id: 1,
      title: "Neon Dreams",
      artist: "Vicmano",
      duration: "6:42",
      genre: "Minimal Techno",
      imageUrl: "https://via.placeholder.com/300x300/9c27b0/ffffff?text=Neon+Dreams",
      streamingUrl: "https://soundcloud.com/vicmano/neon-dreams",
      downloadUrl: "https://vicmano.bandcamp.com/track/neon-dreams"
    },
    {
      id: 2,
      title: "Digital Pulse",
      artist: "Vicmano",
      duration: "7:15",
      genre: "Tech House",
      imageUrl: "https://via.placeholder.com/300x300/e91e63/ffffff?text=Digital+Pulse",
      streamingUrl: "https://soundcloud.com/vicmano/digital-pulse",
      downloadUrl: "https://vicmano.bandcamp.com/track/digital-pulse"
    },
    {
      id: 3,
      title: "Midnight Groove",
      artist: "Vicmano",
      duration: "8:23",
      genre: "Deep House",
      imageUrl: "https://via.placeholder.com/300x300/673ab7/ffffff?text=Midnight+Groove",
      streamingUrl: "https://soundcloud.com/vicmano/midnight-groove",
      downloadUrl: "https://vicmano.bandcamp.com/track/midnight-groove"
    },
    {
      id: 4,
      title: "Electric Soul",
      artist: "Vicmano",
      duration: "6:58",
      genre: "Progressive House",
      imageUrl: "https://via.placeholder.com/300x300/3f51b5/ffffff?text=Electric+Soul",
      streamingUrl: "https://soundcloud.com/vicmano/electric-soul",
      downloadUrl: "https://vicmano.bandcamp.com/track/electric-soul"
    }
  ]

  const handlePlayPause = (trackId: number) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId)
  }

  return (
    <section id="music" className="min-h-screen bg-gradient-to-b from-purple-950 to-black snap-section full-section">
      <div className="container pt-20 md:pt-0 mx-auto px-4 flex items-center justify-center min-h-screen">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <h2 className="text-4xl md:text-6xl font-audiowide font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {t("title", "music") || "Music"}
          </h2>

          <p className="text-white/80 text-lg text-center max-w-2xl mx-auto mb-12">
            {t("text", "music") || "Discover the latest tracks and releases from Vicmano"}
          </p>

          {/* Featured Track */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-purple-500/30"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={tracks[0].imageUrl}
                  alt={tracks[0].title}
                  className="w-64 h-64 rounded-xl object-cover shadow-2xl"
                />
                <button
                  onClick={() => handlePlayPause(tracks[0].id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  {playingTrack === tracks[0].id ? (
                    <Pause className="text-white" size={48} />
                  ) : (
                    <Play className="text-white" size={48} />
                  )}
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-audiowide font-bold text-white mb-4">
                  {tracks[0].title}
                </h3>
                <p className="text-purple-300 text-lg mb-2">{tracks[0].artist}</p>
                <p className="text-white/60 mb-4">{tracks[0].genre} • {tracks[0].duration}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a
                    href={tracks[0].streamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 font-audiowide"
                  >
                    <Headphones size={20} />
                    Listen
                  </a>
                  <a
                    href={tracks[0].downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-700 to-purple-700 hover:from-fuchsia-600 hover:to-purple-600 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105 font-audiowide"
                  >
                    <Download size={20} />
                    Download
                  </a>
                </div>
              </div>
            </div>
          </MotionDiv>

          {/* Track List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.slice(1).map((track, index) => (
              <MotionDiv
                key={track.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={track.imageUrl}
                      alt={track.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <button
                      onClick={() => handlePlayPause(track.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {playingTrack === track.id ? (
                        <Pause className="text-white" size={20} />
                      ) : (
                        <Play className="text-white" size={20} />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-audiowide font-bold text-white mb-1">
                      {track.title}
                    </h4>
                    <p className="text-purple-300 text-sm mb-1">{track.artist}</p>
                    <p className="text-white/60 text-xs">{track.genre} • {track.duration}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href={track.streamingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/60 hover:text-purple-400 transition-colors"
                      title="Listen"
                    >
                      <Headphones size={16} />
                    </a>
                    <a
                      href={track.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-white/60 hover:text-fuchsia-400 transition-colors"
                      title="Download"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>

          {/* Call to Action */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://vicmano.bandcamp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 font-audiowide text-lg shadow-lg"
            >
              <Music size={24} />
              {t("cta", "music") || "Explore All Releases"}
              <ExternalLink size={20} />
            </a>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  )
}

export default MusicSection 