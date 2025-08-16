import { FC } from "react"
import { HeroSection, ShowsSection, AboutSection, GallerySection, MusicSection, ContactSection} from "../components/sections"
import { Footer, ErrorBoundaryWrapper } from "../components/common"

export const Home: FC = () => {
  return (
    <div>
      <ErrorBoundaryWrapper componentName="HeroSection">
        <HeroSection />
      </ErrorBoundaryWrapper>
      
      {/* <ShowsSection /> */}
      
      <ErrorBoundaryWrapper componentName="AboutSection">
        <AboutSection />
      </ErrorBoundaryWrapper>
      
      {/* <GallerySection /> */}
      {/* <MusicSection /> */}
      {/* <ContactSection /> */}
      
      <ErrorBoundaryWrapper componentName="Footer">
        <Footer />
      </ErrorBoundaryWrapper>
    </div>
  )
}