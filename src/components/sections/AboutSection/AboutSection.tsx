import {FC, useState, useEffect} from 'react';
import { useLanguage } from "../../../context/LanguageContext"
import { MotionDiv } from '../../common/Motion/MyMotionComponents'
import { IMAGES } from "../../../utils/imagePaths"

const AboutSection: FC = () => {
  const { t } = useLanguage()
  const [showAlternateImage, setShowAlternateImage] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlternateImage(prev => !prev)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="min-h-screen bg-black snap-section full-section">
      <div className="container mx-auto py-20 px-4  flex items-center justify-center min-h-screen">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                <div className="relative w-full h-full">
                  <img
                    src={IMAGES.logo()}
                    alt="Vicmano"
                    width={320}
                    height={320}
                    className={`absolute inset-0 w-full h-full object-cover rounded-full transition-all duration-1000 ease-in-out ${
                      showAlternateImage ? 'opacity-0 rotate-180 scale-95' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                  <img
                    src={IMAGES.vicmano()} // Reemplaza con la ruta real de tu imagen
                    alt="Vicmano Profile"
                    width={320}
                    height={320}
                    className={`absolute inset-0 w-full h-full object-cover rounded-full transition-all duration-1000 ease-in-out ${
                      showAlternateImage ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-95'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <p className="text-white/90 text-xl leading-relaxed text-center lg:text-left whitespace-pre-line">{t("text", "about")}</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}

export default AboutSection 