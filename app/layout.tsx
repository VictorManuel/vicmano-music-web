import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { LanguageProvider } from "@/context/language-context"
import localFont from "next/font/local"

// Importar el contenido directamente
import contentData from "../content.json"

const audiowide = localFont({
  src: "../public/fonts/Audiowide-Regular.ttf",
  display: "swap",
  variable: "--font-audiowide",
})

export const metadata: Metadata = {
  title: "Vicmano - DJ & Electronic Music Producer",
  description:
    "Official website of Vicmano, DJ and electronic music producer focused on Tech House, Minimal Techno, and Hard Techno.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${audiowide.variable} bg-black text-white`}>
        <LanguageProvider initialContent={contentData}>{children}</LanguageProvider>
      </body>
    </html>
  )
}
