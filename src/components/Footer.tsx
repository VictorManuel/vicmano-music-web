import { useLanguage } from "../context/LanguageContext"
import { Instagram, Youtube, Mail } from "lucide-react"
import { FC } from "react"

const Footer: FC = () => {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-12 border-t border-purple-900/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="/images/logo.png" alt="Vicmano" width={60} height={60} className="mr-4" />
            <div>
              <h3 className="text-2xl font-audiowide font-bold text-white">Vicmano</h3>
              <p className="text-white/60">DJ & Electronic Music Producer</p>
            </div>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://youtube.com/@vicmanomusic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-fuchsia-400 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
            <a
              href="https://www.instagram.com/vicmano.minimal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-fuchsia-400 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="mailto:contact@vicmano.com"
              className="text-white/80 hover:text-fuchsia-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-purple-900/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Vicmano{" "}
            {language === "en" ? "All rights reserved." : "Todos los derechos reservados."}
          </p>

          <div className="flex space-x-6 text-sm">
            <button className="text-white/60 hover:text-white transition-colors">
              {language === "en" ? "Privacy Policy" : "Política de Privacidad"}
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              {language === "en" ? "Terms of Service" : "Términos de Servicio"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 