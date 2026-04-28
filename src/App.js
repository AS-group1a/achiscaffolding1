import { useState, useEffect } from 'react'
import './App.css'
import { useTranslation } from "react-i18next"
import ScrollToTop from './components/ScrollToTop'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [showMenu, setShowMenu] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('English')
  const [currentCountry, setCurrentCountry] = useState('Country')

  const { t, i18n } = useTranslation()

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang)

    if (lang === 'en') setCurrentLanguage(t('langDropwn.english'))
    else if (lang === 'ar') setCurrentLanguage(t('langDropwn.arabic'))
    else if (lang === 'it') setCurrentLanguage(t('langDropwn.italian'))
    else setCurrentLanguage(t('langDropwn.french'))
  }

  const handleCountry = (country) => {
    setCurrentCountry(country)
  }

  useEffect(() => {
    document.dir = i18n.dir()
  }, [i18n, i18n.language])

  return (
    <>
      <ScrollToTop />
      <AppRoutes
        showMenu={showMenu}
        setshowMenu={setShowMenu}
        userLang={i18n.language}
        direction={i18n.dir()}
        handleLanguage={handleLanguage}
        currentLanguage={currentLanguage}
        handleCountry={handleCountry}
        currentCountry={currentCountry}
      />
    </>
  )
}

export default App