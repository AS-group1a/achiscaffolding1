# ACHI Scaffolding Website

Official repository for the **ACHI Scaffolding corporate website**.

This project is a **React-based multilingual website** designed to present the company's services, projects, and expertise. The site focuses on **SEO performance, multilingual accessibility, and optimized deployment on GitHub Pages**.

---

## Project Overview

The website provides the public-facing platform for ACHI Scaffolding and includes:

- Multilingual architecture (English, French, Arabic, Italian)
- Country-based routing (Lebanon / Italy)
- SEO optimization (meta tags, canonical URLs, structured data, JSON-LD schemas)
- AI search visibility (llms.txt, AI crawler directives)
- SPA page view tracking (GA4 via GTM dataLayer)
- Static prerendering for search engines
- Performance optimizations (lazy loading, WebP images)
- 3D model viewer for scaffolding products

---

## Technology Stack

- **React 18**
- **Create React App**
- **React Router DOM**
- **Tailwind CSS**
- **Material UI**
- **Framer Motion**
- **Three.js**
- **i18next / react-i18next**
- **react-helmet-async**
- **Formik + Yup**

---

## Repository Structure

```
├── public/                  Static assets (images, sitemap, robots.txt, llms.txt)
├── scripts/                 Build scripts (sitemap generation, prerendering, image optimization)
├── src/
│   ├── components/          Shared UI components
│   ├── pages/               Page-level components
│   ├── routes/              Main routing configuration
│   ├── routing/             Language routing helpers
│   ├── seo/                 SEO utilities, schema data, route SEO config
│   ├── translations/        Multilingual JSON files
│   └── utils/               Utility functions
```

---

## SEO & Analytics

The site includes a comprehensive SEO setup:

- **Google Analytics 4** (GA4) with GTM integration
- **Google Tag Manager** (GTM) for tag management
- **Microsoft Clarity** for heatmaps and session recordings
- **Structured Data** (JSON-LD): Organization, LocalBusiness, WebPage, WebSite, BreadcrumbList, Service, BlogPosting, FAQPage
- **AeoJsonLd** component for dynamic JSON-LD injection on SPA navigation
- **Hreflang tags** for all 4 languages + x-default
- **Canonical URLs** on every page
- **Sitemap** auto-generated with `npm run generate:sitemap`
- **robots.txt** with AI crawler directives (GPTBot, ClaudeBot, PerplexityBot, etc.)
- **llms.txt** for AI search engine guidance
- **OG & Twitter meta tags** with image dimensions
- **Geo meta tags** per locale (Lebanon / Italy)
- **Keywords meta** per route and language
- **SPA page view tracking** via `dataLayer.push` on route changes

### SEO Files

| File | Purpose |
|------|---------|
| `src/seo/seoConfig.js` | Route-level SEO config (title, description, keywords, canonical) |
| `src/seo/RouteSeo.jsx` | Helmet-based SEO component injected on every route |
| `src/seo/schemaData.js` | Shared business data constants for JSON-LD schemas |
| `src/components/AeoJsonLd.js` | Dynamic JSON-LD injector for page-level schemas |
| `public/robots.txt` | Crawler directives |
| `public/llms.txt` | AI crawler guidance |
| `public/sitemap.xml` | Auto-generated sitemap |
| `scripts/generateSitemap.js` | Sitemap generator script |

### Google Search Console Setup

1. Get your GSC verification code from [Google Search Console](https://search.google.com/search-console)
2. Uncomment and replace `YOUR_CODE` in `public/index.html`:
   ```html
   <meta name="google-site-verification" content="YOUR_CODE" />
   ```
3. Deploy, then submit `https://achiscaffolding.com/sitemap.xml` in GSC

### GTM SPA Tracking Setup

The app pushes `spa_page_view` events to the dataLayer on every route change. To wire this to GA4:

1. In GTM, create a **Custom Event** trigger for event name `spa_page_view`
2. Create a **GA4 Event** tag using that trigger
3. Publish the GTM container

---

## Security

### Content Security Policy (CSP)

A CSP `<meta>` tag is set in `public/index.html` to prevent script injection from unknown domains. GitHub Pages does not support server-side response headers, so the meta tag approach is used instead.

**Allowed sources:**

| Directive | Allowed domains |
|-----------|----------------|
| `script-src` | `self`, GTM, Google Analytics, Microsoft Clarity, Cloudflare CDN |
| `style-src` | `self`, Google Fonts, Cloudflare CDN |
| `font-src` | `self`, Google Fonts (gstatic), Cloudflare CDN |
| `img-src` | `self`, Google Analytics, GTM |
| `connect-src` | `self`, Google Analytics, GTM, Clarity, Open-Meteo, ipapi.co, ipwho.is |
| `frame-src` | GTM (noscript iframe) |
| `object-src` | `none` (blocks Flash/plugins) |
| `base-uri` | `self` (prevents base tag hijacking) |
| `form-action` | `self` (prevents form hijacking) |

> **Note:** `'unsafe-inline'` is required for `script-src` and `style-src` because Google Tag Manager and Microsoft Clarity inject inline scripts at runtime. This is a known GTM limitation.

**To update the CSP** (e.g. if you add a new third-party service), edit the `Content-Security-Policy` meta tag in `public/index.html` and add the new domain to the appropriate directive, then redeploy with `npm run deploy`.

---

## Available Scripts

### `npm start`

Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run generate:sitemap`

Regenerates `public/sitemap.xml` and copies it to `build/` if the build directory exists.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run eject`

**Note: this is a one-way operation.** Once you eject, you cannot go back.

---

## Deployment

The site is deployed using **GitHub Pages**.

Build scripts also generate:

- `sitemap.xml` (88 URLs across 4 languages)
- Prerendered HTML pages for search engines
- Optimized WebP images

---

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
