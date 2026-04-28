const BASE_URL = "https://achiscaffolding.com"

const hasFileExtension = (p) => /\.[a-z0-9]+$/i.test(p)

const ensureLeadingSlash = (p) => {
  const s = String(p || "")
  if (!s) return "/"
  return s.startsWith("/") ? s : `/${s}`
}

export const stripQueryAndHash = (url) => {
  if (!url) return ""
  try {
    const u = new URL(url, BASE_URL)
    return u.pathname
  } catch {
    return String(url).split("?")[0].split("#")[0]
  }
}

/**
 * Canonical rule:
 * - "/" stays "/"
 * - locale roots "/fr" "/lb" "/it" => must end with "/"
 * - everything else => NO trailing slash
 */
export const normalizePathname = (pathname) => {
  const raw = ensureLeadingSlash(stripQueryAndHash(pathname || "/"))

  let normalized = raw.replace(/\/+/g, "/")

  if (normalized === "/") return "/"

  // keep files untouched (e.g., /sitemap.xml)
  if (hasFileExtension(normalized)) return normalized

  // remove trailing slashes for non-root
  normalized = normalized.replace(/\/+$/, "")

  // locale roots must end with "/"
  if (normalized === "/fr" || normalized === "/lb" || normalized === "/it") return `${normalized}/`

  return normalized
}

export const buildInternalHref = (path) => {
  if (!path) return "/"
  if (typeof path !== "string") return "/"

  if (path.startsWith("http://") || path.startsWith("https://")) return path
  if (path.startsWith("#")) return path
  if (path.startsWith("mailto:") || path.startsWith("tel:")) return path

  return normalizePathname(path)
}

export const getCanonicalUrl = (pathname, search = "") => {
  const normalized = normalizePathname(pathname || "/")

  const qs = (search || "").trim()
  const finalSearch = qs && qs.startsWith("?") ? qs : qs ? `?${qs}` : ""

  return `${BASE_URL}${normalized}${finalSearch}`
}

export const isCanonicalSelfReferencing = (canonicalUrl, currentPathname) => {
  if (!canonicalUrl || !currentPathname) return false

  try {
    const canonical = new URL(canonicalUrl)
    const current = new URL(currentPathname, canonical.origin)

    const canonicalPath = normalizePathname(canonical.pathname)
    const currentPath = normalizePathname(current.pathname)

    return canonicalPath === currentPath
  } catch {
    return false
  }
}

export const canonicalUrl = getCanonicalUrl

export const hasFilterParams = (url) => {
  if (!url) return false

  const searchParams = url.includes("?") ? url.split("?")[1].split("#")[0] : ""
  if (!searchParams) return false

  const filterParams = ["sort", "filter", "search", "q", "page", "offset", "limit", "category", "tag"]

  return filterParams.some((param) => searchParams.includes(`${param}=`))
}

export const getBasePath = () => {
  return ""
}

export { BASE_URL }