const fs = require("fs")
const path = require("path")
const { pickLastmodForRoute } = require("./sitemapLastmod")

const SITE_ORIGIN = "https://achiscaffolding.com"
const FALLBACK_LASTMOD = "2026-01-29"

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function uniq(arr) {
  return Array.from(new Set((arr || []).filter(Boolean)))
}

function normalizePath(p) {
  const s = String(p || "").trim()
  if (!s) return "/"
  return s.startsWith("/") ? s : `/${s}`
}

function stripHashAndQuery(p) {
  const s = String(p || "")
  const hashI = s.indexOf("#")
  const qI = s.indexOf("?")
  const cut = Math.min(hashI === -1 ? Infinity : hashI, qI === -1 ? Infinity : qI)
  return cut === Infinity ? s : s.slice(0, cut)
}

function hasFileExt(p) {
  return /\.[a-z0-9]+$/i.test(p)
}

function canonicalPath(pathname) {
  const p0 = normalizePath(stripHashAndQuery(pathname))
  if (!p0 || p0 === "/") return "/"

  if (hasFileExt(p0)) return p0

  const trimmed = p0.replace(/\/+$/, "")

  if (trimmed === "/fr" || trimmed === "/lb" || trimmed === "/it") {
    return `${trimmed}/`
  }

  return trimmed
}

function joinUrl(origin, p) {
  const cleanOrigin = String(origin || "").replace(/\/+$/, "")
  const cleanPath = String(p || "").startsWith("/") ? p : `/${p}`
  return `${cleanOrigin}${cleanPath}`
}

function isValidISODate(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(s || ""))
}

function safeLastmodForRoute(route) {
  try {
    const v = pickLastmodForRoute(route)
    if (isValidISODate(v)) return v
  } catch (e) {}
  return FALLBACK_LASTMOD
}

function getMetaForRoute(routePathname) {
  let r = canonicalPath(routePathname)

  if (r === "/it/") r = "/"
  else if (r.startsWith("/it/")) r = r.slice(3) || "/"

  if (r === "/") return { changefreq: "weekly", priority: "1.0" }

  if (r === "/blog") return { changefreq: "monthly", priority: "0.8" }
  if (/^\/blog-post-\d+$/i.test(r)) return { changefreq: "monthly", priority: "0.7" }
  if (r.startsWith("/blog/")) return { changefreq: "monthly", priority: "0.7" }

  if (r === "/services") return { changefreq: "monthly", priority: "0.9" }
  if (r.startsWith("/services/")) return { changefreq: "monthly", priority: "0.9" }

  if (r === "/servizi") return { changefreq: "monthly", priority: "0.9" }
  if (r.startsWith("/servizi/")) return { changefreq: "monthly", priority: "0.9" }

  if (r === "/projects") return { changefreq: "monthly", priority: "0.8" }
  if (r.startsWith("/project/")) return { changefreq: "monthly", priority: "0.8" }

  if (r === "/i-nostri-lavori") return { changefreq: "monthly", priority: "0.8" }
  if (r.startsWith("/i-nostri-lavori/")) return { changefreq: "monthly", priority: "0.8" }

  if (r === "/gallery") return { changefreq: "monthly", priority: "0.7" }

  return { changefreq: "monthly", priority: "0.7" }
}

function toXml({ entries }) {
  const urlBlocks = entries
    .map((e) => {
      const links = (e.alternates || [])
        .map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(a.hreflang)}" href="${escapeXml(a.href)}" />`
        )
        .join("\n")

      const lastmodLine = e.lastmod ? `    <lastmod>${escapeXml(e.lastmod)}</lastmod>\n` : ""
      const changefreqLine = e.changefreq ? `    <changefreq>${escapeXml(e.changefreq)}</changefreq>\n` : ""
      const priorityLine = e.priority ? `    <priority>${escapeXml(e.priority)}</priority>\n` : ""

      return (
        `  <url>\n` +
        `    <loc>${escapeXml(e.loc)}</loc>\n` +
        lastmodLine +
        changefreqLine +
        priorityLine +
        (links ? `${links}\n` : "") +
        `  </url>`
      )
    })
    .join("\n")

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset\n` +
    `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n` +
    `>\n` +
    `${urlBlocks}\n` +
    `</urlset>\n`
  )
}

function localizeLebanonPath(prefix, logicalPath) {
  const p = canonicalPath(logicalPath)
  if (p === "/") return canonicalPath(`${prefix || ""}/`)
  return canonicalPath(`${prefix || ""}${p}`)
}

function localizeItalyPath(logicalPath) {
  const p = canonicalPath(logicalPath)
  if (p === "/") return "/it/"
  return canonicalPath(`/it${p}`)
}

function buildAlternatesForLebanon(logicalRoute) {
  return [
    { hreflang: "en", href: joinUrl(SITE_ORIGIN, localizeLebanonPath("", logicalRoute)) },
    { hreflang: "fr", href: joinUrl(SITE_ORIGIN, localizeLebanonPath("/fr", logicalRoute)) },
    { hreflang: "ar-LB", href: joinUrl(SITE_ORIGIN, localizeLebanonPath("/lb", logicalRoute)) },
    { hreflang: "x-default", href: joinUrl(SITE_ORIGIN, localizeLebanonPath("", logicalRoute)) },
  ]
}

function main() {
  const LB_LOGICAL_ROUTES = uniq([
    "/",
    "/about",
    "/services",
    "/sectors",
    "/projects",
    "/blog",
    "/careers",
    "/gallery",

    "/services/facade-scaffolding",
    "/services/suspended-scaffolding",
    "/services/propping-shoring",
    "/services/adjustable-props",
    "/services/high-capacity-structures",
    "/services/event-scaffolding",

    "/project/aishti-mall",
    "/project/beirut-business-center",
    "/project/hotel-le-gray",

    "/blog-post-1",
    "/blog-post-2",
    "/blog-post-3",
  ]).map(canonicalPath)

  const IT_LOGICAL_ROUTES = uniq([
    "/",
    "/chi-siamo",
    "/servizi",
    "/settori-applicazioni",
    "/i-nostri-lavori",
    "/blog",
    "/lavora-con-noi",

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

    "/i-nostri-lavori/ambasciata-polonia-via-pietro-paolo-rubens-roma-2025",
    "/i-nostri-lavori/crypta-giubileo-2025-via-carlo-alberto-cortina-roma",
    "/i-nostri-lavori/terme-di-diocleziano-restauro-statua-roma-2024",

    "/blog/normative-ponteggi-2026-legge-198-2025-badge-cantiere",
    "/blog/come-scegliere-impalcature-per-restauro",
  ]).map(canonicalPath)

  const entries = []

  const lbLocales = [
    { hreflang: "en", prefix: "" },
    { hreflang: "fr", prefix: "/fr" },
    { hreflang: "ar-LB", prefix: "/lb" },
  ]

  for (const logicalRoute of LB_LOGICAL_ROUTES) {
    const alternates = buildAlternatesForLebanon(logicalRoute)

    for (const locale of lbLocales) {
      const localizedPath = localizeLebanonPath(locale.prefix, logicalRoute)
      const meta = getMetaForRoute(localizedPath)
      const loc = joinUrl(SITE_ORIGIN, localizedPath)
      const lastmod = safeLastmodForRoute(localizedPath)

      entries.push({
        loc,
        lastmod,
        alternates,
        changefreq: meta.changefreq,
        priority: meta.priority,
      })
    }
  }

  for (const itLogical of IT_LOGICAL_ROUTES) {
    const fullPath = localizeItalyPath(itLogical)
    const meta = getMetaForRoute(fullPath)
    const loc = joinUrl(SITE_ORIGIN, fullPath)
    const lastmod = safeLastmodForRoute(fullPath)
    const alternates = [{ hreflang: "it", href: loc }]

    entries.push({
      loc,
      lastmod,
      alternates,
      changefreq: meta.changefreq,
      priority: meta.priority,
    })
  }

  const xml = toXml({ entries })

  const publicOut = path.resolve(__dirname, "../public/sitemap.xml")
  fs.writeFileSync(publicOut, xml, "utf8")

  const buildDir = path.resolve(__dirname, "../build")
  const buildOut = path.resolve(buildDir, "sitemap.xml")
  if (fs.existsSync(buildDir)) {
    fs.writeFileSync(buildOut, xml, "utf8")
  }

  console.log(
    `✅ sitemap.xml generated (${entries.length} urls) -> ${publicOut}${fs.existsSync(buildDir) ? ` and ${buildOut}` : ""}`
  )
}

main()