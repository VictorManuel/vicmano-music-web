import { useState, useEffect, FC, useCallback } from "react"
import { Download } from "lucide-react"
import { useLanguage } from "../../../context/LanguageContext"
import { MotionDiv } from '../../common/Motion/MyMotionComponents'
import MediaModal from "./MediaModal"

interface GalleryItem {
    id: number
    src: string
    title: string
    category: "Studio" | "Party" | "Logo" | "Other"
}

interface VideoItem {
    id: number
    src: string
    title: string
    description: {
        es: string
        en: string
    }
}

// Datos de ejemplo para la galería
const galleryItems: GalleryItem[] = [
    {
        id: 1,
        src: "/images/logo-texto.png",
        title: "Img Logo",
        category: "Logo"
    },
    {
        id: 2,
        src: "/images/logo.png",
        title: "Studio Vibes",
        category: "Logo"
    },
    {
        id: 3,
        src: "/images/Foto-5.png",
        title: "Studio Vibes",
        category: "Studio"
    },
    {
        id: 4,
        src: "/images/Foto-2.png",
        title: "Studio Vibes",
        category: "Studio"
    },
    {
        id: 5,
        src: "/images/Foto.png",
        title: "Img Logo",
        category: "Logo"
    },
    {
        id: 6,
        src: "/images/Foto-15.png",
        title: "Text Logo",
        category: "Logo"
    },
    {
        id: 7,
        src: "/images/Foto-8.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 8,
        src: "/images/Foto-4.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 9,
        src: "/images/Foto-7.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 10,
        src: "/images/Foto-3.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 11,
        src: "/images/Foto-9.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 12,
        src: "/images/Foto-10.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 13,
        src: "/images/Foto-11.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 14,
        src: "/images/Foto-12.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 15,
        src: "/images/Foto-13.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 16,
        src: "/images/Foto-14.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 17,
        src: "/images/Foto-6.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 18,
        src: "/images/Foto-15.png",
        title: "Studio VIbes",
        category: "Other"
    },
    {
        id: 19,
        src: "/images/Foto-15.png",
        title: "Studio VIbes",
        category: "Other"
    }
]

// Datos de ejemplo para videos
const videos: VideoItem[] = [
    {
        id: 1,
        src: "https://www.youtube.com/embed/To8uvgstKOo",
        title: "Vicmano @ Positive New Year 2025",
        description: {
            es: "Warm up de año nuevo en la Positive de 2025 en Markama",
            en: "New Year's 2025 Warm Up at Positive, Markama"
        }
    },
    {
        id: 2,
        src: "https://www.youtube.com/embed/3JD0_jytdYM",
        title: "Tumbando la Casa #1",
        description: {
            es: "Inauguración del ciclo de videos tumbando la casa",
            en: "Premiere of the 'Tumbando la Casa' video series"
        }
    },
    {
        id: 3,
        src: "https://www.youtube.com/embed/qX_rWBWv-sE",
        title: "Headline en La Terraza",
        description: {
            es: "Set en vivo desde La Terraza",
            en: "Live set from La Terraza"
        }
    },
    {
        id: 4,
        src: "https://www.youtube.com/embed/7bbehPPkwBo",
        title: "Pop & Tech",
        description: {
            es: "Set de remixes y mashups de musica pop",
            en: "Set of remixes and mashups of pop music"
        }
    }
]

const MediaSection: FC = () => {
    const { language } = useLanguage()
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Gallery Logic
    const openModal = (item: GalleryItem) => {
        const index = galleryItems.findIndex((galleryItem) => galleryItem.id === item.id)
        setCurrentIndex(index)
        setSelectedItem(item)
    }

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [selectedItem])

    const closeModal = () => {
        setSelectedItem(null)
    }

    const navigateToNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % galleryItems.length
        setCurrentIndex(nextIndex)
        setSelectedItem(galleryItems[nextIndex])
    }, [currentIndex])

    const navigateToPrevious = useCallback(() => {
        const prevIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
        setCurrentIndex(prevIndex)
        setSelectedItem(galleryItems[prevIndex])
    }, [currentIndex])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!selectedItem) return

            switch (event.key) {
                case "Escape":
                    closeModal()
                    break
                case "ArrowLeft":
                    navigateToPrevious()
                    break
                case "ArrowRight":
                    navigateToNext()
                    break
                default:
                    break
            }
        }

        if (selectedItem) {
            window.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectedItem, navigateToNext, navigateToPrevious])

    const handleDownload = async (e: React.MouseEvent, item: GalleryItem) => {
        e.stopPropagation()
        try {
            const response = await fetch(item.src)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = item.title.replace(/\s+/g, "_") + ".jpg"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.error("Download failed", err)
        }
    }

    return (
        <section id="media" className="min-h-screen snap-section full-section p-2">
            <div className="container mx-auto pt-10 min-h-screen flex flex-col justify-center overflow-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-full lg:max-h-[80vh]">

                    {/* Left Column: Gallery (Vertical Scroll) */}
                    <div className="flex flex-col gap-4 h-[50vh] lg:h-[85vh] overflow-hidden">
                        <div className="overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 lg:pr-2 h-full custom-scrollbar snap-x snap-mandatory lg:snap-none">
                            <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:pb-4">
                                {/* Mobile: Two horizontal flex rows */}
                                <div className="flex lg:hidden flex-col gap-4 w-max">
                                    <div className="flex gap-4">
                                        {galleryItems.filter((_, i) => i % 2 === 0).map((item) => (
                                            <div
                                                key={item.id}
                                                className="relative group overflow-hidden rounded-lg bg-black/50 cursor-pointer h-[22vh] snap-center flex justify-center items-center"
                                                onClick={() => openModal(item)}
                                            >
                                                <img
                                                    src={item.src}
                                                    alt={item.title}
                                                    className="w-auto h-full object-contain border border-white/10 rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        {galleryItems.filter((_, i) => i % 2 !== 0).map((item) => (
                                            <div
                                                key={item.id}
                                                className="relative group overflow-hidden rounded-lg bg-black/50 cursor-pointer h-[22vh] snap-center flex justify-center items-center"
                                                onClick={() => openModal(item)}
                                            >
                                                <img
                                                    src={item.src}
                                                    alt={item.title}
                                                    className="w-auto h-full object-contain border border-white/10 rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Desktop: Static grid */}
                                {galleryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="hidden lg:flex relative group overflow-hidden rounded-lg bg-black/50 cursor-pointer justify-center items-center aspect-video"
                                        onClick={() => openModal(item)}
                                    >
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            className="w-full h-auto object-contain border border-white/10 rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-white font-audiowide text-xs">{item.title}</span>
                                                <button
                                                    onClick={(e) => handleDownload(e, item)}
                                                    className="bg-white/10 hover:bg-white/20 p-1 rounded-full text-white transition-colors cursor-pointer"
                                                    title="Descargar imagen"
                                                >
                                                    <Download size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Videos (Horizontal Scroll 2 Rows) */}
                    <div className="flex flex-col gap-4 h-[40vh] lg:h-[85vh] overflow-hidden">
                        <div className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-4 overflow-x-auto pb-6 snap-x snap-mandatory h-full custom-scrollbar">
                            {videos.map((video, index) => (
                                <MotionDiv
                                    key={video.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="w-[85vw] md:w-[500px] snap-center flex flex-col gap-3 bg-purple-900/10 rounded-xl p-4 border border-purple-500/20 h-full"
                                >
                                    <div className="aspect-video bg-black/50 rounded-lg overflow-hidden shadow-lg shrink-0">
                                        <iframe
                                            src={video.src}
                                            title={video.title}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                    <div className="overflow-y-auto">
                                        <h4 className="text-xl font-audiowide text-white mb-1">{video.title}</h4>
                                        <p className="text-white/60 text-sm leading-relaxed">{video.description[language as keyof typeof video.description]}</p>
                                    </div>
                                </MotionDiv>
                            ))}
                        </div>
                    </div>

                </div>

            </div>

            {/* Gallery Modal */}
            {selectedItem && (
                <MediaModal
                    item={selectedItem}
                    onClose={closeModal}
                    onNext={navigateToNext}
                    onPrevious={navigateToPrevious}
                    onDownload={handleDownload}
                />
            )}
        </section>
    )
}

export default MediaSection
