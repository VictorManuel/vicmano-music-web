import dynamic from "next/dynamic"

// Importación dinámica del Header para evitar problemas de hidratación
const Header = dynamic(() => import("@/components/header"), { ssr: false })
const HeroSection = dynamic(() => import("@/components/hero-section"), { ssr: false })
const AboutSection = dynamic(() => import("@/components/about-section"), { ssr: false })
const GallerySection = dynamic(() => import("@/components/gallery-section"), { ssr: false })
const InstagramSection = dynamic(() => import("@/components/instagram-section"), { ssr: false })
const ShowsSection = dynamic(() => import("@/components/shows-section"), { ssr: false })
const PresskitSection = dynamic(() => import("@/components/presskit-section"), { ssr: false })
const ContactSection = dynamic(() => import("@/components/contact-section"), { ssr: false })
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <InstagramSection />
      <ShowsSection />
      <PresskitSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
