"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, section?: string) => string
  content: any
}

// Valores predeterminados para el contexto
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

// Crear el contexto con valores predeterminados
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  content: defaultContent,
})

export function LanguageProvider({
  children,
  initialContent = defaultContent,
}: {
  children: ReactNode
  initialContent?: any
}) {
  const [language, setLanguage] = useState<Language>("en")
  const [content, setContent] = useState(initialContent)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
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

  // Translation function
  const t = (key: string, section?: string): string => {
    if (!content || !content[language]) return key

    if (section) {
      if (content[language][section] && content[language][section][key]) {
        return content[language][section][key]
      }
    } else {
      // Try to find the key in any section
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
