import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface ContentData {
  [key: string]: {
    [key: string]: {
      [key: string]: string | {
        [key: string]: string
      }
    }
  }
}

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, section?: string) => string
  content: ContentData
}

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, section?: string) => string
  content: ContentData
}

const defaultContent: ContentData = {
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

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  content: defaultContent,
})

interface LanguageProviderProps {
  children: ReactNode
  initialContent?: ContentData
}

export function LanguageProvider({ children, initialContent = defaultContent }: LanguageProviderProps) {
  const [language, setLanguage] = useState<string>("en")
  const [content, setContent] = useState<ContentData>(initialContent)
  const [isClient, setIsClient] = useState<boolean>(false)

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

  const t = (key: string, section?: string): string => {
    if (!content || !content[language]) return key

    if (section) {
      if (content[language][section] && content[language][section][key]) {
        const value = content[language][section][key]
        return typeof value === 'string' ? value : key
      }
    } else {
      for (const sectionKey in content[language]) {
        if (content[language][sectionKey][key]) {
          const value = content[language][sectionKey][key]
          return typeof value === 'string' ? value : key
        }
      }
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, content }}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 