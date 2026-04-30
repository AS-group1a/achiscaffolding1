// src/seo/schemaData.js
// Shared business data constants for structured data / JSON-LD schemas

const SITE_ORIGIN = "https://achiscaffolding.com"

export const BUSINESS = {
  name: "ACHI Scaffolding",
  legalName: "ACHI Scaffolding SAL",
  alternateName: ["ACHI", "عشي للسقالات"],
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/assets/ArchiScaffoldinglogo.png`,
  priceRange: "$$",
  foundingYear: 2004,
  sameAs: [
    "https://www.facebook.com/achiscaffolding",
    "https://www.instagram.com/achiscaffolding",
    "https://www.linkedin.com/company/achiscaffolding",
  ],
}

export const LEBANON = {
  telephone: "+961 3 686 730",
  email: "info@achiscaffolding.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dbayeh, Main Road",
    addressLocality: "Dbayeh",
    addressRegion: "Mount Lebanon",
    addressCountry: "LB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.9164,
    longitude: 35.5574,
  },
  areaServed: { "@type": "Country", name: "Lebanon" },
  openingHours: "Mo-Fr 08:00-17:00",
}

export const ITALY = {
  name: "ACHI Servizi e Appalti",
  telephone: "+39 331 800 7652",
  email: "info@achiscaffolding.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Roma",
    addressLocality: "Roma",
    addressRegion: "Lazio",
    postalCode: "00100",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.9028,
    longitude: 12.4964,
  },
  areaServed: { "@type": "Country", name: "Italy" },
  openingHours: "Mo-Fr 08:00-18:00",
}

export const CONTACT_POINT = [
  {
    "@type": "ContactPoint",
    telephone: LEBANON.telephone,
    contactType: "customer service",
    areaServed: "LB",
    availableLanguage: ["English", "Arabic", "French"],
  },
  {
    "@type": "ContactPoint",
    telephone: ITALY.telephone,
    contactType: "customer service",
    areaServed: "IT",
    availableLanguage: ["Italian", "English"],
  },
]
