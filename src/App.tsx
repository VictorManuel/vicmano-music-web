import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from "./context/LanguageContext"
import { Header } from "./components/common"
import contentData from "./content.json"
import "./styles/globals.css"

import ErrorBoundary from './ErrorBoundary';

const Home = lazy(() => import('./pages').then(module => ({ default: module.Home })));
const LinktreePage = lazy(() => import('./pages').then(module => ({ default: module.LinktreePage })));

const App: FC = () => {
  return (
    <ErrorBoundary>
      <LanguageProvider initialContent={contentData}>
        <Router>
          <div className="App">
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <Routes>
                <Route path="/" element={
                  <>
                    <Header />
                    <main>
                      <Home />
                    </main>
                  </>
                } />
                <Route path="/links" element={<LinktreePage />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App 