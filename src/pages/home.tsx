import React, { FC, lazy, Suspense } from "react"
import { HeroSection, AboutSection } from "../components/sections"
import { ErrorBoundaryWrapper } from "../components/common"

import SEO from "../components/common/SEO/SEO";

const ReelsSection = lazy(() => import('../components/sections').then(module => ({ default: module.ReelsSection })));
const MediaSection = lazy(() => import('../components/sections').then(module => ({ default: module.MediaSection })));
const ContactSection = lazy(() => import('../components/sections').then(module => ({ default: module.ContactSection })));

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

      <Suspense fallback={<div className="h-96 bg-black" />}>
        <ReelsSection />
        <MediaSection />
        {/* <MusicSection /> */}
        <ContactSection />
      </Suspense>

      {/* <ErrorBoundaryWrapper componentName="Footer">
        <Footer />
      </ErrorBoundaryWrapper> */}
    </div>
  )
}