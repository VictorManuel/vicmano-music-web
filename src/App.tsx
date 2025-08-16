import { FC } from 'react';
import { LanguageProvider } from "./context/LanguageContext"
import { Header } from "./components/common"
import contentData from "./content.json"
import "./styles/globals.css"
import { Home } from './pages/home'
import CustomForm from './components/common/CustomForm/CustomForm';

const App: FC = () => {
  return (
    <LanguageProvider initialContent={contentData}>
      <div className="App">
        <Header />
        <main>
          <Home />
        </main>
      </div>
    </LanguageProvider>
  )
}

export default App 