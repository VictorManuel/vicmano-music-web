import { FC } from "react"
import { HeroSection, AboutSection, MediaSection, ReelsSection, ContactSection } from "../components/sections"
import { ErrorBoundaryWrapper } from "../components/common"

import { Helmet } from 'react-helmet-async';

export const Home: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Vicmano Music - DJ & Producer</title>
        <meta name="description" content="Vicmano - Minimal Techno, Tech House & Hard Techno DJ. Listen to my sets and check upcoming events." />
      </Helmet>
      <ErrorBoundaryWrapper componentName="HeroSection">
        <HeroSection />
      </ErrorBoundaryWrapper>

      {/* <ShowsSection /> */}

      <ErrorBoundaryWrapper componentName="AboutSection">
        <AboutSection />
      </ErrorBoundaryWrapper>

      <MediaSection />
      <ReelsSection />
      {/* <MusicSection /> */}
      <ContactSection />

      {/* <ErrorBoundaryWrapper componentName="Footer">
        <Footer />
      </ErrorBoundaryWrapper> */}
    </div>
  )
}