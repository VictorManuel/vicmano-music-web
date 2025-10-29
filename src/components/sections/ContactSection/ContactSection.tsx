import { FC } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { Mail, Instagram } from "lucide-react"
import { MotionDiv } from '../../common/Motion/MyMotionComponents'
import { ContactForm } from "../../../forms"

const ContactSection: FC = () => {
  const { t } = useLanguage()

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-black to-purple-950 snap-section full-section">
      <div className="container py-20 mx-auto px-4 flex items-center justify-center min-h-screen">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto w-full"
        >
          <h2 className="text-4xl md:text-6xl font-audiowide font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500">
            {t("title", "contact")}
          </h2>

          <p className="text-white/80 text-lg text-center max-w-2xl mx-auto mb-6">{t("text", "contact")}</p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
            <a
              href={`mailto:${t("email", "contact")}`}
              className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
            >
              <Mail size={24} />
              {t("email", "contact")}
            </a>
            <a
              href={`https://instagram.com/${t("instagram", "contact")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-lg"
            >
              <Instagram size={24} />
              @{t("instagram", "contact")}
            </a>
          </div>

          {/* Formulario de contacto activado */}
          <ContactForm />
        </MotionDiv>
      </div>
    </section>
  )
}

export default ContactSection