import { FC } from "react"
import { HeroSection, ShowsSection, AboutSection, GallerySection, MusicSection, ContactSection} from "../components/sections"
import { Footer } from "../components/common"

export const Home: FC = () => {
  return (
    <div>
         <HeroSection />
          {/* <ShowsSection /> */}
          <AboutSection />
          {/* <GallerySection /> */}
          {/* <MusicSection /> */}
          {/* <ContactSection /> */}
          <Footer />
    </div>
  )
}