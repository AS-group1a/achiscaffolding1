/**
 * Post-build script to verify 404.html for GitHub Pages SPA routing
 */

const fs = require("fs")
const path = require("path")

const buildDir = path.join(__dirname, "..", "build")
const notFoundHtmlPath = path.join(buildDir, "404.html")

function hasSpaRedirectScript(html) {
  const s = String(html || "")

  const hasQueryParam = s.includes("?p=")

  const hasReplaceCall =
    s.includes(".replace(") &&
    (
      s.includes("l.replace(") ||
      s.includes("location.replace(") ||
      s.includes("window.location.replace(")
    )

  const hasReplaceToP =
    s.includes("replace(") &&
    (
      s.includes('"/?p="') ||
      s.includes("'/ ?p='".replace(" ", "")) || // avoids escape issue cleanly
      s.includes("/?p=")
    )

  return hasQueryParam && (hasReplaceCall || hasReplaceToP)
}

try {
  if (!fs.existsSync(buildDir)) {
    console.error('Build directory does not exist. Run "npm run build" first.')
    process.exit(1)
  }

  if (!fs.existsSync(notFoundHtmlPath)) {
    console.error("404.html not found in build directory. Ensure public/404.html exists.")
    process.exit(1)
  }

  const notFoundHtml = fs.readFileSync(notFoundHtmlPath, "utf8")

  if (!hasSpaRedirectScript(notFoundHtml)) {
    console.warn("⚠ Warning: 404.html may not contain the redirect script. Check public/404.html")
  } else {
    console.log("✓ Verified 404.html contains redirect script for SPA routing")
  }
} catch (error) {
  console.error("Error verifying 404.html:", error)
  process.exit(1)
}