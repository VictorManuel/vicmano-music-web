"use client"

import { createContext, useContext, useState, useEffect } from "react"

const defaultContent = {
  en: {
    hero: {
      title: "Vicmano",
      subtitle: "A musical journey from minimal to electrifying dance",
      youtube: "YouTube",
      instagram: "Instagram",
    },
  },
  es: {
    hero: {
      title: "Vicmano",
      subtitle: "Un viaje musical del minimal al éxtasis electrónico",
      youtube: "YouTube",
      instagram: "Instagram",
    },
  },
}

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  content: defaultContent,
})

export function LanguageProvider({ children, initialContent = defaultContent }) {
  const [language, setLanguage] = useState("en")
  const [content, setContent] = useState(initialContent)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "es") {
        setLanguage("es")
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("language", language)
    }
  }, [language, isClient])

  const t = (key, section) => {
    if (!content || !content[language]) return key

    if (section) {
      if (content[language][section] && content[language][section][key]) {
        return content[language][section][key]
      }
    } else {
      for (const sectionKey in content[language]) {
        if (content[language][sectionKey][key]) {
          return content[language][sectionKey][key]
        }
      }
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, content }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
