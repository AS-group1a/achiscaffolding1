/**
 * URL normalization utilities for client-side redirects
 * Canonical policy:
 * - "/" stays "/"
 * - "/fr" "/lb" "/it" => must end with "/"
 * - everything else => NO trailing slash
 */

import { stripLocalePrefix, stripPublicBase } from "../utils/langRouting"

const hasFileExtension = (p) => /\.[a-z0-9]+$/i.test(p)
const ensureLeadingSlash = (p) => (p?.startsWith("/") ? p : `/${p || ""}`)

const stripHashAndQuery = (p) => {
  const s = String(p || "")
  const hashI = s.indexOf("#")
  const qI = s.indexOf("?")
  const cut = Math.min(hashI === -1 ? Infinity : hashI, qI === -1 ? Infinity : qI)
  return cut === Infinity ? s : s.slice(0, cut)
}

const canonicalizePath = (pathname) => {
  const p0 = ensureLeadingSlash(stripHashAndQuery(pathname))

  if (p0 === "/") return "/"

  const p = p0.replace(/\/+$/, "")

  // locale roots must have trailing slash
  if (p === "/fr" || p === "/lb" || p === "/it") return `${p}/`

  // files keep as-is
  if (hasFileExtension(p0)) return p0

  // everything else: no trailing slash
  return p
}

/**
 * Returns normalized pathname if different, null if already normalized.
 */
export const getNormalizedPathname = (currentPathname) => {
  const currentFull = ensureLeadingSlash(String(currentPathname || "/"))
  const current = stripPublicBase(currentFull)

  // detect locale prefix (fr/lb/it)
  const m = current.match(/^\/(fr|lb|it)(\/|$)/)
  const localePrefix = m ? `/${m[1]}` : ""

  // strip locale for canonicalization
  const clean = stripLocalePrefix(current)
  const cleanCanonical = canonicalizePath(clean)

  // rebuild with locale prefix
  const finalPath = localePrefix
    ? localePrefix + (cleanCanonical === "/" ? "/" : cleanCanonical)
    : cleanCanonical

  // preserve exact locale root format ("/fr/" not "/fr")
  const finalCanonical = canonicalizePath(finalPath)

  if (finalCanonical === current) return null
  return finalCanonical
}

/**
 * Optional normalization redirect
 * Call once on app load
 */
export const normalizeTrailingSlash = (navigate, currentPathname) => {
  const normalized = getNormalizedPathname(currentPathname)
  if (normalized) {
    navigate(normalized, { replace: true })
    return true
  }
  return false
}