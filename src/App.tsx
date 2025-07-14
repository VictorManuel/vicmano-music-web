import { FC } from 'react';
import { LanguageProvider } from "./context/LanguageContext"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import AboutSection from "./components/AboutSection"
import GallerySection from "./components/GallerySection"
import InstagramSection from "./components/InstagramSection"
import ShowsSection from "./components/ShowsSection"
import PresskitSection from "./components/PresskitSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import contentData from "./content.json"
import "./styles/globals.css"

const App: FC = () => {
  return (
    <LanguageProvider initialContent={contentData}>
      <div className="App">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <GallerySection />
          <InstagramSection />
          <ShowsSection />
          <PresskitSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App 