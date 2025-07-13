"use client"

import { useLanguage } from "../context/LanguageContext"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"

export default function InstagramSection() {
  const { t } = useLanguage()

  // Placeholder para posts de Instagram
  const instagramPosts = Array(6)
    .fill(null)
    .map((_, i) => ({
      id: i,
      imageUrl: `https://via.placeholder.com/300x300/${i % 2 === 0 ? "9c27b0" : "e91e63"}/ffffff?text=DJ+Post+${i + 1}`,
      link: "https://www.instagram.com/vicmano.minimal",
    }))

  return (
    <section id="instagram" className="min-h-screen bg-purple-950 snap-section full-section">
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl"
        >
          <h2 className="text-4xl md:text-6xl font-audiowide font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {t("title", "instagram")}
          </h2>

          <p className="text-white/80 text-lg text-center max-w-2xl mx-auto mb-12">{t("text", "instagram")}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {instagramPosts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-square overflow-hidden rounded-lg group hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={`Instagram post ${post.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <Instagram className="text-white" size={24} />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/vicmano.minimal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-700 to-purple-700 hover:from-fuchsia-600 hover:to-purple-600 text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 font-audiowide text-lg"
            >
              <Instagram size={24} />
              Follow @vicmano.minimal
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
