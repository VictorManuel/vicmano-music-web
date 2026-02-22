import { FC } from "react"
import { Download, X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryItem {
    id: number
    src: string
    title: string
    category: "Studio" | "Party" | "Logo" | "Other"
}

interface MediaModalProps {
    item: GalleryItem
    onClose: () => void
    onNext: () => void
    onPrevious: () => void
    onDownload: (e: React.MouseEvent, item: GalleryItem) => void
}

const MediaModal: FC<MediaModalProps> = ({ item, onClose, onNext, onPrevious, onDownload }) => {
    return (
        <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="relative max-w-4xl w-full max-h-full cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-colors cursor-pointer"
                >
                    <X size={24} />
                </button>
                <button
                    onClick={onPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-colors cursor-pointer"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={onNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition-colors cursor-pointer"
                >
                    <ChevronRight size={24} />
                </button>
                <div className="p-6 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg overflow-hidden flex flex-col justify-between gap-6">
                    <div className="relative">
                        <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-auto max-h-[70vh] object-contain"
                        />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <h3 className="text-2xl font-audiowide font-bold text-white">{item.title}</h3>
                        <button
                            onClick={(e) => onDownload(e, item)}
                            className="bg-black/60 hover:bg-black/80 p-3 rounded-full text-white transition-colors cursor-pointer"
                            title="Descargar imagen"
                        >
                            <Download size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaModal
