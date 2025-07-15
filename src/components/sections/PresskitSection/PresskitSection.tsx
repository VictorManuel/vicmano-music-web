import { useLanguage } from "../../../context/LanguageContext"
import { MotionDiv } from "../../common/Motion/MyMotionComponents"
import { Download, FileText, ImageIcon, Music } from "lucide-react"
import { FC } from "react"

const PresskitSection: FC = () => {
  const { t } = useLanguage()

  return (
    <section id="presskit" className="min-h-screen bg-black snap-section full-section">
      <div className="container pt-20 md:pt-0 mx-auto px-4 flex items-center justify-center min-h-screen">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto w-full"
        >
          <h2 className="text-4xl md:text-6xl font-audiowide font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {t("title", "presskit")}
          </h2>

          <p className="text-white/80 text-lg text-center max-w-2xl mx-auto mb-16">{t("text", "presskit")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 hover:bg-purple-900/40 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 p-4 rounded-full">
                  <FileText className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-audiowide font-bold text-white">Technical Rider</h3>
              </div>
              <p className="text-white/70 mb-6 text-lg">
                Technical requirements and equipment specifications for performances.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
              >
                <Download size={20} />
                Download Rider
              </a>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 hover:bg-purple-900/40 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 p-4 rounded-full">
                  <ImageIcon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-audiowide font-bold text-white">Press Photos</h3>
              </div>
              <p className="text-white/70 mb-6 text-lg">
                High-resolution promotional photos for media and event promotion.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
              >
                <Download size={20} />
                Download Photos
              </a>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 hover:bg-purple-900/40 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 p-4 rounded-full">
                  <Music className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-audiowide font-bold text-white">Music Samples</h3>
              </div>
              <p className="text-white/70 mb-6 text-lg">
                Sample mixes and tracks showcasing Vicmano's style and sound.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
              >
                <Download size={20} />
                Download Samples
              </a>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8 hover:bg-purple-900/40 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 p-4 rounded-full">
                  <ImageIcon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-audiowide font-bold text-white">Logo Pack</h3>
              </div>
              <p className="text-white/70 mb-6 text-lg">
                Official Vicmano logos in various formats for promotional use.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
              >
                <Download size={20} />
                Download Logos
              </a>
            </MotionDiv>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white px-10 py-4 rounded-full transition-all transform hover:scale-105 font-audiowide text-lg"
            >
              <Download size={24} />
              {t("button", "presskit")}
            </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}

export default PresskitSection 