import { useState, useEffect, FC } from "react"
import { useLanguage } from "../../../context/LanguageContext"
import { Menu, X } from "lucide-react"
import { IMAGES } from "../../../utils/imagePaths"

interface NavLink {
  href: string
  label: string
}

const Header: FC = () => {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-4">
        <div className="container py-0 mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white text-xl font-audiowide">Vicmano</span>
          </div>
        </div>
      </header>
    )
  }

  const navLinks: NavLink[] = [
    { href: "about", label: t("title", "about") },
    // { href: "gallery", label: t("title", "gallery") },
    // { href: "instagram", label: t("title", "instagram") },
    // { href: "shows", label: t("title", "shows") },
    // { href: "presskit", label: t("title", "presskit") },
    // { href: "contact", label: t("title", "contact") },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container py-0 mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
          <img src={IMAGES.logo()} alt="Vicmano" width={50} height={50} className="mr-2" />
          <span className="text-white text-xl font-audiowide">Vicmano</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-white/90 hover:text-fuchsia-400 transition-colors font-audiowide text-sm tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="ml-4 px-4 py-2 border border-fuchsia-500/70 rounded-md text-white/90 hover:bg-fuchsia-500/20 hover:border-fuchsia-400 transition-all font-audiowide text-sm"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/90 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black/95 backdrop-blur-md absolute top-full left-0 right-0 p-4 flex flex-col space-y-4 border-t border-purple-500/20 z-[110] shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-white/90 hover:text-fuchsia-400 transition-colors font-audiowide text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="self-start px-4 py-2 border border-fuchsia-500/70 rounded-md text-white/90 hover:bg-fuchsia-500/20 transition-colors font-audiowide text-sm"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header 