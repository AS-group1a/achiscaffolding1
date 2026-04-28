// src/routes/AppRoutes.js
import { useEffect, useMemo, useState } from "react"
import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

import Home from "../pages/Home"
import About from "../pages/About"
import Product3DView from "../pages/Product3DView"
import Projects from "../pages/Projects"
import Sectors from "../pages/Sectors"
import SettoriApplicazioniIt from "../pages/SettoriApplicazioniIt"
import ProjectDetails from "../pages/ProjectDetails"
import Gallery from "../pages/Gallery"
import Blog from "../pages/Blog"
import BlogItem from "../pages/BlogItem"
import Services from "../pages/Services"
import SingleService from "../components/services/SingleService"
import PageNotFound from "../pages/PageNotFound"
import Careers from "../pages/Careers"
import CareersPartner from "../pages/CareersPartner"
import PrivacyPolicy from "../pages/PrivacyPolicy"

import LangRouter, { useLangRouter } from "../routing/LangRouter"
import { ITALY_ENABLED } from "../utils/featureFlags"
import RouteSeo from "../seo/RouteSeo"
import { normalizeTrailingSlash } from "../seo/urlNormalizer"
import { initMixedContentGuard } from "../seo/mixedContentGuard"

import "glider-js/glider.min.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function AppRoutesInner({
  showMenu,
  setshowMenu,
  handleLanguage,
  currentLanguage,
  handleCountry,
  currentCountry,
}) {
  const { i18n } = useTranslation()
  const { cleanLocation, urlLang } = useLangRouter()
  const navigate = useNavigate()
  const location = useLocation()
  const [headerHeight, setHeaderHeight] = useState(0)

  const isHome = useMemo(() => cleanLocation.pathname === "/", [cleanLocation.pathname])

  useEffect(() => {
    const countryFromUrl = urlLang === "it" && ITALY_ENABLED ? "Italy" : "Lebanon"
    handleCountry(countryFromUrl)
  }, [urlLang, handleCountry])

  useEffect(() => {
    normalizeTrailingSlash(navigate, location.pathname)
    initMixedContentGuard()
  }, [navigate, location.pathname])

  useEffect(() => {
    if (headerHeight === 0) return

    const scrollToHash = (retryCount = 0) => {
      const hash = window.location.hash || location.hash
      if (!hash) return

      const element = document.querySelector(hash) || document.getElementById(hash.slice(1))

      if (!element) {
        if (retryCount < 3) {
          setTimeout(() => scrollToHash(retryCount + 1), 100 * (retryCount + 1))
        }
        return
      }

      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - 20
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }

    if (location.hash) {
      scrollToHash()
    } else if (window.location.hash) {
      scrollToHash()
    }

    const onHashChange = () => scrollToHash()
    window.addEventListener("hashchange", onHashChange)

    return () => window.removeEventListener("hashchange", onHashChange)
  }, [headerHeight, location.hash])

  return (
    <>
      <RouteSeo />
      <ScrollToTop />

      <div className="App" onClick={() => (showMenu ? setshowMenu(false) : true)}>
        <Header
          handleLanguage={handleLanguage}
          currentLanguage={currentLanguage}
          handleCountry={handleCountry}
          currentCountry={currentCountry}
          onHeightChange={setHeaderHeight}
        />

        <div
          className="main-content-wrapper"
          style={!isHome && headerHeight > 0 ? { paddingTop: `${headerHeight}px` } : {}}
        >
          <Routes location={cleanLocation} key={`${cleanLocation.pathname}${cleanLocation.search || ""}`}>
            <Route
              path="/"
              element={
                <Home
                  showMenu={showMenu}
                  setshowMenu={setshowMenu}
                  direction={i18n.dir()}
                  userLang={i18n.language}
                />
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            <Route path="/products/3d/:slug" element={<Product3DView />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/settori-applicazioni" element={<SettoriApplicazioniIt />} />

            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/partner" element={<CareersPartner />} />

            <Route
              path="/services"
              element={
                <Services
                  showMenu={showMenu}
                  setshowMenu={setshowMenu}
                  userLang={i18n.language}
                />
              }
            />
            <Route path="/services/:serviceSlug" element={<SingleService />} />
            <Route path="/services/serviceItem" element={<SingleService />} />

            <Route
              path="/gallery"
              element={urlLang === "it" ? <PageNotFound /> : <Gallery />}
            />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-post-1" element={<BlogItem />} />
            <Route path="/blog-post-2" element={<BlogItem />} />
            <Route path="/blog-post-3" element={<BlogItem />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  )
}

function AppRoutes(props) {
  return (
    <LangRouter>
      <AppRoutesInner {...props} />
    </LangRouter>
  )
}

export default AppRoutes