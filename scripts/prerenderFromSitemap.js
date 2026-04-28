const fs = require("fs")
const path = require("path")

const BUILD_DIR = path.resolve(__dirname, "..", "build")
const SITEMAP_IN_BUILD = path.join(BUILD_DIR, "sitemap.xml")
const SITEMAP_IN_PUBLIC = path.resolve(__dirname, "..", "public", "sitemap.xml")
const INDEX_HTML = path.join(BUILD_DIR, "index.html")

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function normalizePathname(loc) {
  const u = new URL(loc)
  let p = u.pathname || "/"
  p = p.replace(/\/{2,}/g, "/")
  if (!p.endsWith("/")) p += "/"
  return p
}

function readSitemapXml() {
  if (fs.existsSync(SITEMAP_IN_BUILD)) return fs.readFileSync(SITEMAP_IN_BUILD, "utf8")
  if (fs.existsSync(SITEMAP_IN_PUBLIC)) return fs.readFileSync(SITEMAP_IN_PUBLIC, "utf8")
  throw new Error(`sitemap.xml not found in build or public`)
}

function main() {
  if (!fs.existsSync(BUILD_DIR)) throw new Error(`build folder not found: ${BUILD_DIR}`)
  if (!fs.existsSync(INDEX_HTML)) throw new Error(`index.html not found: ${INDEX_HTML}`)

  const xml = readSitemapXml()

  const locs = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g))
    .map((m) => m[1])
    .filter(Boolean)

  const unique = Array.from(new Set(locs))

  let created = 0

  for (const loc of unique) {
    const pathname = normalizePathname(loc)

    if (pathname === "/") continue

    // build/<pathname>/index.html
    const targetDir = path.join(BUILD_DIR, pathname)
    ensureDir(targetDir)

    const targetIndex = path.join(targetDir, "index.html")
    fs.copyFileSync(INDEX_HTML, targetIndex)
    created++
  }

  console.log(`[prerenderFromSitemap] locs=${unique.length} created=${created}`)
}

main()