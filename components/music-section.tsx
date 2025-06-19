"use client"

import { useLanguage } from "@/context/language-context"
import { motion } from "framer-motion"

export default function MusicSection() {
  const { t } = useLanguage()

  // YouTube video IDs
  const videoIds = ["Uw1SQ2dFO28", "Uw1SQ2dFO28", "Uw1SQ2dFO28"]

  return (
    <section id="music" className="py-20 bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-audiowide font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {t("title", "music")}
          </h2>

          <p className="text-white/80 text-center max-w-2xl mx-auto mb-12">{t("text", "music")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoIds.map((videoId, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="aspect-video bg-black/50 rounded-lg overflow-hidden"
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Vicmano DJ Set ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://youtube.com/@vicmanomusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
            >
              {t("youtube", "hero")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
