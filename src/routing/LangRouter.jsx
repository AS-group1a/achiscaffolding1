// src/routing/LangRouter.jsx
import { useEffect, useMemo, createContext, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  getLangFromPath,
  stripLocalePrefix,
  stripPublicBase,
  getLogicalPathFromLocalizedPath,
} from "../utils/langRouting"
import { ITALY_ENABLED } from "../utils/featureFlags"
import { normalizeTrailingSlash } from "../seo/urlNormalizer"

const LangRouterContext = createContext(null)

export const useLangRouter = () => {
  const context = useContext(LangRouterContext)
  if (!context) throw new Error("useLangRouter must be used within LangRouter")
  return context
}

function LangRouter({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const pathnameNoBase = useMemo(() => stripPublicBase(location.pathname), [location.pathname])

  // Normalize URL shape:
  // - keep trailing slash for locale roots: / /fr/ /lb/ /it/
  // - remove trailing slash for inner pages
  useEffect(() => {
    normalizeTrailingSlash(navigate, pathnameNoBase)
  }, [navigate, pathnameNoBase])

  const urlLang = useMemo(() => getLangFromPath(pathnameNoBase), [pathnameNoBase])

  const cleanPath = useMemo(() => {
    const afterLocale = stripLocalePrefix(pathnameNoBase)
    const lang = getLangFromPath(pathnameNoBase)
    return getLogicalPathFromLocalizedPath(afterLocale, lang)
  }, [pathnameNoBase])

  const cleanLocation = useMemo(
    () => ({
      ...location,
      pathname: cleanPath,
    }),
    [location, cleanPath]
  )

  useEffect(() => {
    // Only keep this safeguard:
    // if Italy site is disabled, /it should not remain accessible
    if (!ITALY_ENABLED && (pathnameNoBase === "/it" || pathnameNoBase.startsWith("/it/"))) {
      const withoutIt = pathnameNoBase.replace(/^\/it\/?/, "") || "/"
      const target = withoutIt.startsWith("/") ? withoutIt : `/${withoutIt}`
      navigate(`${target}${location.search || ""}${location.hash || ""}`, { replace: true })
      return
    }

    // URL is the source of truth for current language
    if (i18n.language !== urlLang) {
      i18n.changeLanguage(urlLang)
    }
  }, [pathnameNoBase, urlLang, i18n, navigate, location.search, location.hash])

  useEffect(() => {
    const isRTL = urlLang === "ar"
    document.documentElement.dir = isRTL ? "rtl" : "ltr"

    const htmlLang =
      urlLang === "ar" ? "ar" : urlLang === "fr" ? "fr" : urlLang === "it" ? "it" : "en"

    document.documentElement.lang = htmlLang
  }, [urlLang])

  useEffect(() => {
    try {
      localStorage.setItem("selectedLanguage", urlLang || "en")
    } catch {}
  }, [urlLang])

  return <LangRouterContext.Provider value={{ cleanLocation, urlLang }}>{children}</LangRouterContext.Provider>
}

export default LangRouter