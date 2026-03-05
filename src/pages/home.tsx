import { FC } from "react"
import { HeroSection, AboutSection, MediaSection, ReelsSection, ContactSection } from "../components/sections"
import { ErrorBoundaryWrapper } from "../components/common"

import SEO from "../components/common/SEO/SEO";

export const Home: FC = () => {
  return (
    <div>
      <SEO />
      <ErrorBoundaryWrapper componentName="HeroSection">
        <HeroSection />
      </ErrorBoundaryWrapper>

      {/* <ShowsSection /> */}

      <ErrorBoundaryWrapper componentName="AboutSection">
        <AboutSection />
      </ErrorBoundaryWrapper>

      <ReelsSection />
      <MediaSection />
      {/* <MusicSection /> */}
      <ContactSection />

      {/* <ErrorBoundaryWrapper componentName="Footer">
        <Footer />
      </ErrorBoundaryWrapper> */}
    </div>
  )
}