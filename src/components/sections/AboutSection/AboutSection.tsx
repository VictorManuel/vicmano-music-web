import {FC} from 'react';
import { useLanguage } from "../../../context/LanguageContext"
import { MotionDiv } from '../../common/Motion/MyMotionComponents'

const AboutSection: FC = () => {
  const { t } = useLanguage()

  return (
    <section id="about" className="min-h-screen bg-black py-7 snap-section full-section">
      <div className="container mx-auto pt-20 md:pt-0 px-4 py-20 flex items-center justify-center min-h-screen">
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
                <img
                  src="/images/logo.png"
                  alt="Vicmano"
                  width={320}
                  height={320}
                  className="relative z-10 rounded-full"
                />
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