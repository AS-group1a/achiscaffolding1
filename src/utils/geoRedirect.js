function safeGet(key) {
  try {
    return localStorage.getItem(key) || ""
  } catch {
    return ""
  }
}

function safeSet(key, value) {
  try {
    if (value === "" || value == null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {}
}

function normalizeBase(baseUrl) {
  const b = (baseUrl || "/").trim()
  return b === "/" ? "" : b.replace(/\/$/, "")
}

function joinBase(base, path) {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`.replace(/\/{2,}/g, "/")
}

function normalizePath(path) {
  const p = String(path || "").trim()
  if (!p) return "/"
  if (p === "/") return "/"
  return p.replace(/\/+$/, "") || "/"
}

function stripBase(pathname, base) {
  const p = String(pathname || "").trim() || "/"
  const b = normalizeBase(base)

  if (!b) return normalizePath(p)

  if (p === b) return "/"
  if (p.startsWith(`${b}/`)) {
    return normalizePath(p.slice(b.length) || "/")
  }

  return normalizePath(p)
}

function isProbablyBot() {
  try {
    const ua = String(navigator.userAgent || "").toLowerCase()
    return (
      ua.includes("googlebot") ||
      ua.includes("bingbot") ||
      ua.includes("yandex") ||
      ua.includes("baiduspider") ||
      ua.includes("duckduckbot") ||
      ua.includes("slurp") ||
      ua.includes("facebot") ||
      ua.includes("twitterbot") ||
      ua.includes("linkedinbot") ||
      ua.includes("semrush") ||
      ua.includes("ahrefs") ||
      ua.includes("mj12bot") ||
      ua.includes("siteaudit") ||
      ua.includes("screaming frog")
    )
  } catch {
    return false
  }
}

function getRestoredPathFromQuery(search) {
  try {
    const s = String(search || "")
    if (!s || !s.startsWith("?p=")) return ""
    return decodeURIComponent(s.slice(3) || "")
  } catch {
    return ""
  }
}

function isLebanonHomeRoute(path) {
  return normalizePath(path) === "/"
}

function isItalyHomeRoute(path, italyPrefix = "/it") {
  return normalizePath(path) === normalizePath(italyPrefix)
}

const GEO_CACHE_KEY = "site_geo_country_cache_v1"
const GEO_CACHE_TTL_MS = 6 * 60 * 60 * 1000

function nowMs() {
  return Date.now()
}

function safeParseJson(s) {
  try {
    return JSON.parse(String(s || ""))
  } catch {
    return null
  }
}

function getCachedCountryCode() {
  const raw = safeGet(GEO_CACHE_KEY)
  if (!raw) return ""
  const data = safeParseJson(raw)
  if (!data || typeof data !== "object") return ""
  const cc = String(data.cc || "").trim().toUpperCase()
  const exp = Number(data.exp || 0)
  if (!cc || !exp) return ""
  if (nowMs() > exp) return ""
  return cc
}

function setCachedCountryCode(cc) {
  const code = String(cc || "").trim().toUpperCase()
  if (!code) return
  const payload = {
    cc: code,
    exp: nowMs() + GEO_CACHE_TTL_MS,
  }
  safeSet(GEO_CACHE_KEY, JSON.stringify(payload))
}

async function getCountryCodeFromIpApi() {
  const r = await fetch("https://ipapi.co/country/", {
    cache: "no-store",
    credentials: "omit",
  })
  if (!r.ok) return ""
  const txt = await r.text()
  return String(txt || "").trim().toUpperCase()
}

async function getCountryCodeFromIpWho() {
  const r = await fetch("https://ipwho.is/", {
    cache: "no-store",
    credentials: "omit",
  })
  if (!r.ok) return ""
  const j = await r.json()
  return String(j.country_code || "").trim().toUpperCase()
}

async function detectCountryCode() {
  const cached = getCachedCountryCode()
  if (cached) return cached

  let cc = ""
  try {
    cc = await getCountryCodeFromIpApi()
  } catch {
    cc = ""
  }

  if (cc) {
    setCachedCountryCode(cc)
    return cc
  }

  try {
    cc = await getCountryCodeFromIpWho()
  } catch {
    cc = ""
  }

  if (cc) {
    setCachedCountryCode(cc)
    return cc
  }

  return ""
}

export async function geoRedirectIfNeeded(opts = {}) {
  const MANUAL_OVERRIDE_KEY = "site_locale_override_v1"
  const COUNTRY_LOCK_KEY = "site_country_lock_v1"

  if (isProbablyBot()) return
  if (opts.disable === true) return

  const base = normalizeBase(opts.baseUrl)
  const pathname = opts.pathname || "/"
  const search = opts.search || ""

  const italyPrefix = normalizePath(opts.italyPrefix || "/it")
  const lebanonPrefix = normalizePath(opts.lebanonPrefix || "/")

  const restoredPathRaw = getRestoredPathFromQuery(search)
  const restoredPath = restoredPathRaw ? normalizePath(restoredPathRaw) : ""

  const relativePath = stripBase(pathname, base)
  const effectivePath = restoredPath || relativePath

  const isLebHome = isLebanonHomeRoute(effectivePath)
  const isItHome = isItalyHomeRoute(effectivePath, italyPrefix)
  const isHomeEntry = isLebHome || isItHome

  const currentRelativePath = stripBase(pathname, base)

  const redirectTo = (targetPath) => {
    const normalizedTargetPath = normalizePath(targetPath)
    if (normalizedTargetPath === currentRelativePath) return

    const target = joinBase(base, normalizedTargetPath)
    window.location.replace(target)
  }

  const manual = String(safeGet(MANUAL_OVERRIDE_KEY) || "").trim().toUpperCase()

  if (manual === "IT") {
    safeSet(COUNTRY_LOCK_KEY, "IT")
    if (isLebHome) {
      redirectTo(italyPrefix)
    }
    return
  }

  if (manual === "LB") {
    safeSet(COUNTRY_LOCK_KEY, "LB")
    if (isItHome) {
      redirectTo(lebanonPrefix)
    }
    return
  }

  if (!isHomeEntry) return

  const cc = await detectCountryCode()
  if (!cc) return

  if (cc === "IT") {
    safeSet(COUNTRY_LOCK_KEY, "IT")
    if (isLebHome) {
      redirectTo(italyPrefix)
    }
    return
  }

  if (cc === "LB") {
    safeSet(COUNTRY_LOCK_KEY, "LB")
    return
  }

  safeSet(COUNTRY_LOCK_KEY, "")
}