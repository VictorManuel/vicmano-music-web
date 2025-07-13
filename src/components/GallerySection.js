"use client"

import { useLanguage } from "../context/LanguageContext"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"

export default function GallerySection() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Datos de ejemplo para la galería
  const galleryItems = [
    {
      id: 1,
      type: "video",
      src: "https://www.youtube.com/embed/Uw1SQ2dFO28",
      thumbnail: "https://via.placeholder.com/600x400/9c27b0/ffffff?text=Live+Set",
      title: "Live Set - Tech House Session",
      videoId: "Uw1SQ2dFO28",
    },
    {
      id: 2,
      type: "photo",
      src: "https://via.placeholder.com/600x400/e91e63/ffffff?text=Studio+Session",
      title: "Studio Session",
    },
    {
      id: 3,
      type: "video",
      src: "https://www.youtube.com/embed/Uw1SQ2dFO28",
      thumbnail: "https://via.placeholder.com/600x400/7928ca/ffffff?text=Festival",
      title: "Festival Performance",
      videoId: "Uw1SQ2dFO28",
    },
    {
      id: 4,
      type: "photo",
      src: "https://via.placeholder.com/600x400/00bcd4/ffffff?text=Crowd+Energy",
      title: "Crowd Energy",
    },
    {
      id: 5,
      type: "photo",
      src: "https://via.placeholder.com/600x400/9c27b0/ffffff?text=Equipment",
      title: "Equipment Setup",
    },
    {
      id: 6,
      type: "video",
      src: "https://www.youtube.com/embed/Uw1SQ2dFO28",
      thumbnail: "https://via.placeholder.com/600x400/e91e63/ffffff?text=Minimal+Mix",
      title: "Minimal Techno Mix",
      videoId: "Uw1SQ2dFO28",
    },
    {
      id: 7,
      type: "photo",
      src: "https://via.placeholder.com/600x400/7928ca/ffffff?text=Portrait",
      title: "Artist Portrait",
    },
    {
      id: 8,
      type: "photo",
      src: "https://via.placeholder.com/600x400/00bcd4/ffffff?text=Atmosphere",
      title: "Event Atmosphere",
    },
  ]

  const filteredItems = galleryItems.filter((item) => {
    if (filter === "all") return true
    return filter === "photos" ? item.type === "photo" : item.type === "video"
  })

  const openModal = (item) => {
    const index = filteredItems.findIndex((filteredItem) => filteredItem.id === item.id)
    setCurrentIndex(index)
    setSelectedItem(item)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedItem(null)
    document.body.style.overflow = "unset"
  }

  const navigateToNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length
    setCurrentIndex(nextIndex)
    setSelectedItem(filteredItems[nextIndex])
  }

  const navigateToPrevious = () => {
    const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelectedItem(filteredItems[prevIndex])
  }

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
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
  }, [selectedItem, currentIndex, filteredItems])

  return (
    <section id="gallery" className="min-h-screen bg-gradient-to-b from-black to-purple-950 snap-section full-section">
      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col h-full"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-audiowide font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
              {t("title", "gallery")}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">{t("text", "gallery")}</p>

            {/* Filtros */}
            <div className="flex justify-center gap-4 mb-8">
              {["all", "photos", "videos"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-6 py-3 rounded-full font-audiowide transition-all ${
                    filter === filterType
                      ? "bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white"
                      : "bg-purple-900/30 text-white/70 hover:text-white hover:bg-purple-900/50"
                  }`}
                >
                  {t(filterType, "gallery.filter")}
                </button>
              ))}
            </div>
          </div>

          {/* Galería */}
          <div className="flex-1 min-h-0">
            {/* Vista Desktop */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group cursor-pointer overflow-hidden rounded-lg bg-purple-900/20 aspect-video hover:scale-105 transition-transform duration-300"
                  onClick={() => openModal(item)}
                >
                  <img
                    src={item.type === "video" ? item.thumbnail : item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-audiowide text-sm">{item.title}</h3>
                    </div>
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-purple-600/80 rounded-full p-4">
                          <Play className="text-white" size={24} fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Vista Mobile - Scroll Horizontal */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg bg-purple-900/20 flex-shrink-0 w-72 aspect-video active:scale-95 transition-transform duration-200"
                    onClick={() => openModal(item)}
                  >
                    <img
                      src={item.type === "video" ? item.thumbnail : item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-audiowide text-sm">{item.title}</h3>
                      </div>
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-purple-600/80 rounded-full p-3">
                            <Play className="text-white" size={20} fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Indicador de scroll para móvil */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  <span>Desliza para ver más</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal con navegación */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-7xl max-h-[95vh] m-4 flex items-center justify-center">
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black/90 rounded-full p-3 text-white transition-all duration-200 hover:scale-110"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>

            {/* Flecha izquierda */}
            <button
              onClick={navigateToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 rounded-full p-3 text-white transition-all duration-200 hover:scale-110 disabled:opacity-50"
              aria-label="Anterior"
              disabled={filteredItems.length <= 1}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Flecha derecha */}
            <button
              onClick={navigateToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 rounded-full p-3 text-white transition-all duration-200 hover:scale-110 disabled:opacity-50"
              aria-label="Siguiente"
              disabled={filteredItems.length <= 1}
            >
              <ChevronRight size={28} />
            </button>

            {/* Contenido del modal */}
            <div className="w-full h-full flex items-center justify-center px-16">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                {selectedItem.type === "video" ? (
                  <div className="w-full h-full max-w-5xl aspect-video">
                    <iframe
                      src={selectedItem.src}
                      title={selectedItem.title}
                      className="w-full h-full rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={selectedItem.src || "/placeholder.svg"}
                    alt={selectedItem.title}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                )}
              </motion.div>
            </div>

            {/* Información del elemento */}
            <div className="absolute bottom-4 left-4 right-4 text-center z-10">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-audiowide text-lg mb-2">{selectedItem.title}</h3>
                <div className="flex justify-center items-center gap-4 text-white/70 text-sm">
                  <span>
                    {currentIndex + 1} / {filteredItems.length}
                  </span>
                  <span className="capitalize">{selectedItem.type}</span>
                </div>
              </div>
            </div>

            {/* Indicadores de navegación */}
            {filteredItems.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex gap-2">
                  {filteredItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index)
                        setSelectedItem(filteredItems[index])
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === currentIndex ? "bg-fuchsia-500 scale-125" : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Ir al elemento ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
