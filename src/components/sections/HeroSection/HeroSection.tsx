import { useEffect, useState, useRef, FC } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import ParticleBackground from "../../ParticleBackground/ParticleBackground"
import { Instagram, Youtube } from "lucide-react"
import { MotionDiv } from "../../common/Motion/MyMotionComponents"

const HeroSection: FC = () => {
  const { t } = useLanguage()
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const parallaxOffset = scrollY * 0.5

  const title = mounted ? t("title", "hero") : "Vicmano"
  const subtitle = mounted ? t("subtitle", "hero") : "A musical journey from minimal to electrifying dance"
  const youtubeText = mounted ? t("youtube", "hero") : "YouTube"
  const instagramText = mounted ? t("instagram", "hero") : "Instagram"

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden snap-section"
    >
      {/* Gradient overlay - base background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-[-15]"></div>

      {/* Performance image with parallax effect */}
      <div className="absolute inset-0 w-full h-full z-[-10]">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            opacity: Math.max(0.3, 1 - scrollY / 500),
          }}
        >
          <img
            src="/images/performance.png"
            alt="Vicmano Performance"
            className="w-full h-full object-cover object-center"
            style={{
              filter: "brightness(0.6) contrast(1.1)",
            }}
          />
        </div>
      </div>

      {/* Additional gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-[-8]"></div>

      {/* Particles will be rendered here with z-index: -5 */}
      <ParticleBackground />

      {/* Main content */}
      <div className="container pt-20 md:pt-0 mx-auto px-4 z-20 relative text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-audiowide font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-600 to-fuchsia-500"
            style={{
              textShadow: "0 0 30px rgba(156, 39, 176, 0.8), 0 0 60px rgba(233, 30, 99, 0.6)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {title}
          </h1>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mx-auto font-audiowide"
            style={{
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
            }}
          >
            {subtitle}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            <a
              href="https://youtube.com/@vicmanomusic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 font-audiowide text-lg shadow-lg hover:shadow-purple-500/25"
            >
              <Youtube size={24} />
              {youtubeText}
            </a>
            <a
              href="https://www.instagram.com/vicmano.minimal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-fuchsia-700 to-purple-700 hover:from-fuchsia-600 hover:to-purple-600 text-white px-8 py-4 rounded-full transition-all transform hover:scale-105 font-audiowide text-lg shadow-lg hover:shadow-fuchsia-500/25"
            >
              <Instagram size={24} />
              {instagramText}
            </a>
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Scroll indicator */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/80 hover:text-white transition-colors"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </MotionDiv>
    </section>
  )
}

export default HeroSection 