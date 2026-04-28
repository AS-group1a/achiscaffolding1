import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import "./i18n"
import App from "./App"
import { geoRedirectIfNeeded } from "./utils/geoRedirect"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <HelmetProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </HelmetProvider>
)

geoRedirectIfNeeded({
  baseUrl: process.env.PUBLIC_URL || "",
  pathname: window.location.pathname,
  search: window.location.search,
  hash: window.location.hash,
  italyPrefix: "/it",
  lebanonPrefix: "/",
}).catch(() => {})