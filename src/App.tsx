import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from "./context/LanguageContext"
import { Header } from "./components/common"
import contentData from "./content.json"
import "./styles/globals.css"

import { Home, LinktreePage } from './pages'
import ErrorBoundary from './ErrorBoundary';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <LanguageProvider initialContent={contentData}>
        <Router>
          <div className="App">
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
          </div>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App 