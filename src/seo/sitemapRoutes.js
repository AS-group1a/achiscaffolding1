// Frontend/src/seo/sitemapRoutes.js
import { SERVICE_KEY_TO_SLUG } from "../utils/serviceSlugs"
import { ITALY_ENABLED } from "../utils/featureFlags"

const SITE_ORIGIN = "https://achiscaffolding.com"

const LEB_STATIC_ROUTES = ["/", "/about", "/services", "/sectors", "/projects", "/blog", "/careers", "/gallery"]
const LEB_BLOG_ROUTES = ["/blog-post-1", "/blog-post-2", "/blog-post-3"]

const LEB_PROJECT_ROUTES = ["/project/aishti-mall", "/project/beirut-business-center", "/project/hotel-le-gray"]

const CAREERS_PARTNER_ROUTE = "/careers/partner"

const IT_STATIC_ROUTES = ["/", "/chi-siamo", "/servizi", "/settori-applicazioni", "/i-nostri-lavori", "/blog", "/lavora-con-noi"]

const IT_SERVICE_ROUTES = [
  "/servizi/manodopera-specializzata-ponteggi-italia",
  "/servizi/ponteggi-sospesi-italia",
  "/servizi/noleggio-a-caldo-ponteggi-italia",
  "/servizi/noleggio-a-freddo-ponteggi-italia",
  "/servizi/ponteggi-per-facciate-italia",
  "/servizi/ponteggi-per-ponte-italia",
  "/servizi/impalcature-per-eventi-italia",
  "/servizi/copertura-provvisoria-sottotetto-italia",
  "/servizi/ponteggi-per-costruzioni-speciali-italia",
  "/servizi/sicurezza-sul-lavoro-ponteggi-italia",
  "/servizi/ponteggi-multidirezionali-italia",
  "/servizi/ponteggi-tradizionali-telai-prefabbricati-italia",
  "/servizi/ponteggi-tubi-e-giunti-italia",
]

const IT_PROJECT_ROUTES = [
  "/i-nostri-lavori/ambasciata-polonia-via-pietro-paolo-rubens-roma-2025",
  "/i-nostri-lavori/crypta-giubileo-2025-via-carlo-alberto-cortina-roma",
  "/i-nostri-lavori/terme-di-diocleziano-restauro-statua-roma-2024",
]

const IT_BLOG_ROUTES = ["/blog/normative-ponteggi-2026-legge-198-2025-badge-cantiere", "/blog/come-scegliere-impalcature-per-restauro"]

function uniq(arr) {
  return Array.from(new Set((arr || []).filter(Boolean)))
}

export function getSitemapRoutes(locale) {
  if (locale === "it") {
    if (!ITALY_ENABLED) return []

    return uniq([
      ...IT_STATIC_ROUTES,
      ...IT_SERVICE_ROUTES,
      ...IT_PROJECT_ROUTES,
      ...IT_BLOG_ROUTES,
    ])
  }

  const slugs = Object.values(SERVICE_KEY_TO_SLUG || {}).filter(Boolean)
  const lebServiceRoutes = slugs.map((s) => `/services/${s}`)

  return uniq([
    ...LEB_STATIC_ROUTES,
    ...lebServiceRoutes,
    ...LEB_BLOG_ROUTES,
    ...LEB_PROJECT_ROUTES,
    CAREERS_PARTNER_ROUTE,
  ])
}

export function getSitemapConfig() {
  const langs = [
    { code: "en", prefix: "" },
    { code: "fr", prefix: "/fr" },
    { code: "ar-LB", prefix: "/lb" },
  ]

  return {
    siteOrigin: SITE_ORIGIN,
    langs,
  }
}