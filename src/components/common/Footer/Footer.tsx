import { Instagram, Youtube, Mail } from "lucide-react"
import { FC } from "react"
import { IMAGES } from "../../../utils/imagePaths"

const Footer: FC = () => {

  return (
    <footer className="min-h-screen bg-gradient-to-t from-black to-purple-950 snap-section full-section ">
      
      <div className="container py-20 h-full flex flex-col justify-center">
        <div className="flex py-6 flex-col md:flex-row justify-between items-center border-y border-purple-900/30">
          <div className="flex items-center mb-6 md:mb-0">
            <img src={IMAGES.logo()} alt="Vicmano" width={60} height={60} className="mr-4" />
            <div>
              <h3 className="text-2xl font-audiowide font-bold text-white">Vicmano</h3>
              <p className="text-white/60">Music</p>
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
              href="mailto:vicmano.music@gmail.com"
              className="text-white/80 hover:text-fuchsia-400 transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 