import { Helmet } from "react-helmet-async"
import { getRouteSEO, DEFAULT_SEO } from "./seoConfig"
import {
  stripLocalePrefix,
  stripPublicBase,
  getLogicalPathFromLocalizedPath,
  getPathForLocale,
} from "../utils/langRouting"
import { BUSINESS, LEBANON, ITALY, CONTACT_POINT } from "./schemaData"

const SITE_ORIGIN = "https://achiscaffolding.com"

const getLocaleFromPath = (pathname) => {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr"
  if (pathname === "/lb" || pathname.startsWith("/lb/")) return "ar"
  if (pathname === "/it" || pathname.startsWith("/it/")) return "it"
  return "en"
}

const hrefLangForOg = (locale) => {
  if (locale === "ar") return "ar-LB"
  if (locale === "fr") return "fr"
  if (locale === "it") return "it"
  return "en"
}

const htmlLangFor = (locale) => {
  if (locale === "ar") return "ar-LB"
  if (locale === "fr") return "fr"
  if (locale === "it") return "it"
  return "en"
}

const normalizePath = (p) => {
  if (!p) return "/"
  const s = String(p)
  if (!s.startsWith("/")) return `/${s}`
  return s
}

const stripHash = (url) => {
  const s = String(url || "")
  const i = s.indexOf("#")
  return i === -1 ? s : s.slice(0, i)
}

const stripHashAndQuery = (p) => {
  const s = String(p || "")
  const hashI = s.indexOf("#")
  const qI = s.indexOf("?")
  const cut = Math.min(hashI === -1 ? Infinity : hashI, qI === -1 ? Infinity : qI)
  return cut === Infinity ? s : s.slice(0, cut)
}

const hasFileExt = (p) => /\.[a-z0-9]+$/i.test(p)

const ensureCanonicalPath = (path) => {
  const p0 = normalizePath(stripHashAndQuery(path))
  if (p0 === "/") return "/"
  if (hasFileExt(p0)) return p0
  const p = p0.replace(/\/+$/, "")
  return p || "/"
}

const stripKnownPrefix = (path) => {
  const p0 = ensureCanonicalPath(path)

  if (p0 === "/fr" || p0.startsWith("/fr/")) {
    const rest = p0.replace(/^\/fr(\/|$)/, "/")
    return ensureCanonicalPath(rest)
  }
  if (p0 === "/lb" || p0.startsWith("/lb/")) {
    const rest = p0.replace(/^\/lb(\/|$)/, "/")
    return ensureCanonicalPath(rest)
  }
  if (p0 === "/it" || p0.startsWith("/it/")) {
    const rest = p0.replace(/^\/it(\/|$)/, "/")
    return ensureCanonicalPath(rest)
  }

  return ensureCanonicalPath(p0)
}

const withLocalePrefix = (locale, logicalPath) => {
  const clean = stripKnownPrefix(logicalPath)
  if (locale === "fr") return clean === "/" ? "/fr" : `/fr${clean}`
  if (locale === "ar") return clean === "/" ? "/lb" : `/lb${clean}`
  if (locale === "it") return clean === "/" ? "/it" : `/it${clean}`
  return clean
}

const toAbsolute = (p) => `${SITE_ORIGIN}${ensureCanonicalPath(p)}`

const normalizeToSiteOrigin = (maybeAbsoluteOrPath) => {
  const s = String(maybeAbsoluteOrPath || "").trim()
  if (!s) return ""

  if (s.startsWith("/")) return `${SITE_ORIGIN}${ensureCanonicalPath(s)}`

  if (s.startsWith("http://") || s.startsWith("https://")) {
    try {
      const u = new URL(s)
      const pathname = ensureCanonicalPath(u.pathname)
      return `${SITE_ORIGIN}${pathname}${u.search || ""}`
    } catch {
      return ""
    }
  }

  return ""
}

const isServicePath = (logicalPath) => {
  const p = String(logicalPath || "/")
  return p.startsWith("/services/") && p.split("/").filter(Boolean).length === 2
}

const isBlogPostPath = (logicalPath) => {
  const p = String(logicalPath || "/")
  return p.startsWith("/blog-post-")
}

const getRegionData = (locale) => {
  if (locale === "it") return ITALY
  return LEBANON
}

const buildBreadcrumbList = (canonicalUrl, logicalPath, finalTitle) => {
  if (logicalPath === "/") return null

  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
  ]

  const segments = logicalPath.split("/").filter(Boolean)
  let currentPath = ""

  segments.forEach((seg, idx) => {
    currentPath += `/${seg}`
    const isLast = idx === segments.length - 1
    const name = isLast
      ? finalTitle.split("|")[0].trim()
      : seg.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

    const listItem = { "@type": "ListItem", position: idx + 2, name }
    if (!isLast) {
      listItem.item = `${SITE_ORIGIN}${currentPath}`
    }
    items.push(listItem)
  })

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: items,
  }
}

const buildSchemaGraph = ({
  locale,
  htmlLang,
  canonicalUrl,
  logicalPath,
  finalTitle,
  finalDescription,
  finalOgImage,
}) => {
  const orgId = `${SITE_ORIGIN}/#organization`
  const lbId = `${SITE_ORIGIN}/#localbusiness`
  const region = getRegionData(locale)
  const businessName = locale === "it" ? ITALY.name : BUSINESS.name

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      url: BUSINESS.url,
      name: BUSINESS.name,
      alternateName: BUSINESS.alternateName,
      logo: { "@type": "ImageObject", url: BUSINESS.logo },
      telephone: LEBANON.telephone,
      email: LEBANON.email,
      sameAs: BUSINESS.sameAs,
      contactPoint: CONTACT_POINT,
    },
    {
      "@type": "LocalBusiness",
      "@id": lbId,
      url: BUSINESS.url,
      name: businessName,
      parentOrganization: { "@id": orgId },
      image: BUSINESS.logo,
      telephone: region.telephone,
      email: region.email,
      address: region.address,
      geo: region.geo,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: locale === "it" ? "08:00" : "08:00",
        closes: locale === "it" ? "18:00" : "17:00",
      },
      priceRange: BUSINESS.priceRange,
      areaServed: [region.areaServed],
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: finalTitle,
      description: finalDescription,
      inLanguage: htmlLang,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": orgId },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: DEFAULT_SEO.siteName || "ACHI Scaffolding",
      inLanguage: htmlLang,
      publisher: { "@id": orgId },
    },
  ]

  // BreadcrumbList for non-homepage routes
  const breadcrumb = buildBreadcrumbList(canonicalUrl, logicalPath, finalTitle)
  if (breadcrumb) {
    graph.push(breadcrumb)
    // Link webpage to breadcrumb
    graph[2].breadcrumb = { "@id": breadcrumb["@id"] }
  }

  if (isServicePath(logicalPath)) {
    graph.push({
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      url: canonicalUrl,
      name: finalTitle,
      description: finalDescription,
      provider: { "@id": lbId },
      areaServed: [region.areaServed],
      inLanguage: htmlLang,
    })
  } else if (isBlogPostPath(logicalPath)) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#blogposting`,
      mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
      url: canonicalUrl,
      headline: finalTitle,
      description: finalDescription,
      inLanguage: htmlLang,
      author: { "@id": orgId },
      publisher: { "@id": orgId },
      image: normalizeToSiteOrigin(finalOgImage) || finalOgImage,
    })
  }

  return { "@context": "https://schema.org", "@graph": graph }
}

const RouteSeo = ({ title, description, ogImage, indexable, canonical: canonicalOverride }) => {
  const rawPathname = typeof window !== "undefined" ? window.location.pathname : "/"
  const rawSearch = typeof window !== "undefined" ? window.location.search : ""

  const pathname = stripPublicBase(rawPathname)
  const locale = getLocaleFromPath(pathname)

  const cleanPathname = stripLocalePrefix(pathname)
  const logicalPath = ensureCanonicalPath(getLogicalPathFromLocalizedPath(cleanPathname, locale))
  const search = rawSearch

  const routeSEO = getRouteSEO(logicalPath, locale, search)
  const shouldIndex = indexable !== undefined ? indexable : routeSEO.indexable

  const fallbackDefaults = DEFAULT_SEO[locale] || DEFAULT_SEO.en

  const finalTitle = title || routeSEO.title || fallbackDefaults.title
  const finalDescription = description || routeSEO.description || fallbackDefaults.description
  const finalOgImage = ogImage || routeSEO.ogImage || DEFAULT_SEO.ogImage

  const localizedPath = withLocalePrefix(locale, logicalPath)
  const canonicalFromConfig = canonicalOverride || routeSEO.canonical || localizedPath

  const canonicalUrlValue = stripHash(normalizeToSiteOrigin(canonicalFromConfig) || toAbsolute(localizedPath))

  const robotsContent = shouldIndex ? "index,follow" : "noindex,follow"
  const ogUrl = canonicalUrlValue

  const htmlLang = htmlLangFor(locale)
  const htmlDir = locale === "ar" ? "rtl" : "ltr"

  const schemaGraph = buildSchemaGraph({
    locale,
    htmlLang,
    canonicalUrl: canonicalUrlValue,
    logicalPath,
    finalTitle,
    finalDescription,
    finalOgImage,
  })

  const enUrl = `${SITE_ORIGIN}${withLocalePrefix("en", getPathForLocale("en", logicalPath))}`
  const frUrl = `${SITE_ORIGIN}${withLocalePrefix("fr", getPathForLocale("fr", logicalPath))}`
  const arUrl = `${SITE_ORIGIN}${withLocalePrefix("ar", getPathForLocale("ar", logicalPath))}`
  const itUrl = `${SITE_ORIGIN}${withLocalePrefix("it", getPathForLocale("it", logicalPath))}`

  const keywords = routeSEO.keywords || ""

  // Geo meta tags based on locale
  const isItaly = locale === "it"
  const geoRegion = isItaly ? "IT-RM" : "LB"
  const geoPlacename = isItaly ? "Roma, Italia" : "Dbayeh, Lebanon"
  const geoPosition = isItaly ? "41.9028;12.4964" : "33.9164;35.5574"
  const icbm = isItaly ? "41.9028, 12.4964" : "33.9164, 35.5574"

  return (
    <Helmet>
      <html lang={htmlLang} dir={htmlDir} />

      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={robotsContent} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrlValue} />

      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="ar-LB" href={arUrl} />
      <link rel="alternate" hrefLang="it" href={itUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Geo meta tags */}
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={geoPlacename} />
      <meta name="geo.position" content={geoPosition} />
      <meta name="ICBM" content={icbm} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />

      <meta property="og:locale" content={hrefLangForOg(locale).replace("-", "_")} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />

      <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
    </Helmet>
  )
}

export default RouteSeo
