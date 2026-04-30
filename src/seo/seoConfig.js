import { hasFilterParams } from "./urlUtils"

const BASE_URL = "https://achiscaffolding.com"
const SITE_NAME = "ACHI Scaffolding"

export const DEFAULT_SEO = {
  en: {
    title: "Construction & Industrial Scaffolding Systems | ACHI Scaffolding",
    description:
      "ACHI Scaffolding delivers access systems, shoring, and scaffolding solutions for construction, restoration, and industrial projects. Request technical consultation.",
  },
  fr: {
    title: "Entreprise d'échafaudage au Liban | ACHI",
    description:
      "ACHI Scaffolding fournit des systèmes d'accès, d'étaiement et d'échafaudage pour la construction, la restauration et les sites industriels au Liban.",
  },
  ar: {
    title: "عشي للسقالات | شركة سقالات في لبنان",
    description:
      "تقدم ACHI Scaffolding خدمات السقالات وأنظمة الوصول والتدعيم للمشاريع الإنشائية والصناعية وأعمال الترميم في لبنان.",
  },
  it: {
    title: "Ponteggi e Opere Provvisionali in Italia | ACHI Servizi e Appalti",
    description:
      "ACHI Servizi e Appalti: noleggio e montaggio ponteggi, manodopera specializzata, restauro e opere provvisionali in tutta Italia. Conformi Legge 198/2025. Preventivo 331 800 7652.",
  },
  ogImage: `${BASE_URL}/assets/ArchiScaffoldinglogo.png`,
  siteName: SITE_NAME,
}

export const ROUTE_SEO_CONFIG = {
  "/": {
    en: {
      title: "Scaffolding Company in Lebanon | ACHI Scaffolding",
      description:
        "Professional scaffolding services in Lebanon: access systems, shoring, and engineered solutions for construction, restoration, and industrial projects.",
      keywords: "scaffolding Lebanon, scaffolding company Lebanon, temporary works contractor Lebanon, facade scaffolding Lebanon, suspended scaffolding Lebanon, shoring Lebanon, propping systems Lebanon, construction scaffolding Beirut, industrial scaffolding Lebanon, scaffolding rental Lebanon, scaffolding installation Lebanon, access scaffolding systems, ACHI Scaffolding",
    },
    fr: {
      title: "Entreprise d'échafaudage au Liban | ACHI",
      description:
        "Services d'échafaudage au Liban : systèmes d'accès, étaiement et solutions techniques pour la construction, la restauration et l'industrie.",
      keywords: "échafaudage Liban, entreprise échafaudage Liban, entrepreneur travaux temporaires Liban, échafaudage de façade, échafaudage suspendu, étaiement Liban, location échafaudage Liban, systèmes d'accès construction, ACHI",
    },
    ar: {
      title: "عشي للسقالات | شركة سقالات في لبنان",
      description:
        "خدمات سقالات في لبنان: أنظمة وصول، تدعيم وشدات، وحلول هندسية لمشاريع البناء والترميم والصناعة.",
      keywords: "سقالات لبنان, شركة سقالات لبنان, مقاول أعمال مؤقتة, سقالات واجهات, سقالات معلقة, تدعيم لبنان, دعامات قابلة للضبط, تأجير سقالات, شدات معدنية, بناء لبنان, عشي للسقالات",
    },
    it: {
      title: "Ponteggi & Opere Provvisionali in Italia | ACHI Servizi e Appalti",
      description:
        "Noleggio e montaggio ponteggi, manodopera specializzata e opere provvisionali in tutta Italia. Conformi normative 2026 e Legge 198/2025. Sede Roma. Preventivo 331 800 7652.",
      keywords: "ponteggi Italia, noleggio ponteggi Italia, montaggio ponteggi Roma, ponteggi facciate, ponteggi sospesi, opere provvisionali, puntellamento strutturale, manodopera specializzata ponteggi, subappalto ponteggi, ACHI Servizi e Appalti, Legge 198/2025",
    },
    indexable: true,
  },

  "/about": {
    en: {
      title: "About Us | ACHI Scaffolding",
      description:
        "Learn about ACHI Scaffolding, a leading provider of construction and industrial scaffolding systems, access solutions, and technical expertise.",
      keywords: "about ACHI Scaffolding, scaffolding company Lebanon, scaffolding expertise, temporary works contractor, engineering-led scaffolding, construction access solutions, scaffolding safety Lebanon, ACHI Scaffolding team",
    },
    fr: {
      title: "À propos | ACHI",
      description:
        "Découvrez ACHI Scaffolding, entreprise d'échafaudage au Liban spécialisée en solutions d'accès, d'étaiement et expertise technique.",
      keywords: "à propos ACHI, entreprise échafaudage Liban, expertise technique, solutions d'accès",
    },
    ar: {
      title: "من نحن | عشي للسقالات",
      description:
        "تعرف على ACHI Scaffolding شركة سقالات في لبنان تقدم حلول الوصول والتدعيم وخبرة فنية للمشاريع الصناعية والإنشائية.",
      keywords: "من نحن عشي, شركة سقالات لبنان, خبرة فنية, حلول وصول",
    },
    indexable: true,
  },

  "/chi-siamo": {
    it: {
      title: "Chi Siamo | ACHI Servizi e Appalti – Ponteggi, Restauro e Servizi Edili in Italia",
      description:
        "ACHI Servizi e Appalti: noleggio e montaggio ponteggi, manodopera specializzata, supporto restauro monumentale e interno in tutta Italia. Certificati INAIL – conformi Legge 198/2025. Sede Roma. Preventivo 331 800 7652.",
      canonical: "/it/chi-siamo",
      keywords: "chi siamo ACHI, ponteggi Italia, restauro monumentale, servizi edili Roma, INAIL, Legge 198/2025",
    },
    indexable: true,
  },

  "/services": {
    en: {
      title: "Scaffolding Services | ACHI Scaffolding",
      description:
        "Scaffolding installation, dismantling, supervision, rental, and engineered temporary works for construction and industrial projects.",
      keywords: "scaffolding services Lebanon, facade scaffolding installation, suspended scaffolding rental, propping and shoring services, indoor scaffolding, high-rise scaffolding, dome scaffolding, circular scaffolding, event scaffolding, industrial scaffolding, roof scaffolding, mobile suspended scaffolding bridges, scaffolding access stairs, loading unloading platforms, scaffolding design Lebanon, ACHI Scaffolding",
    },
    fr: {
      title: "Services d'échafaudage | ACHI",
      description:
        "Montage, démontage, supervision, location d'échafaudages, étaiement et solutions de travaux temporaires pour chantiers et sites industriels.",
      keywords: "services échafaudage, montage échafaudage, location échafaudage, étaiement, travaux temporaires Liban",
    },
    ar: {
      title: "خدمات السقالات | عشي للسقالات",
      description:
        "تركيب وفك وإشراف وتأجير السقالات، وخدمات التدعيم وأعمال مؤقتة هندسية للمشاريع الإنشائية والصناعية.",
      keywords: "خدمات سقالات, تركيب سقالات, تأجير سقالات, تدعيم, أعمال مؤقتة",
    },
    indexable: true,
  },

  "/servizi": {
    it: {
      title: "Servizi Ponteggi in Italia | ACHI Servizi e Appalti",
      description:
        "Servizi di ponteggi e opere provvisionali in Italia: noleggio a caldo, noleggio a freddo, ponteggi sospesi, facciate, eventi, sicurezza e manodopera specializzata.",
      canonical: "/it/servizi",
      keywords: "servizi ponteggi, noleggio ponteggi Italia, ponteggi sospesi, noleggio a caldo, noleggio a freddo, sicurezza cantiere",
    },
    indexable: true,
  },

  "/services/serviceItem": {
    en: {
      title: "Scaffolding Service | ACHI Scaffolding",
      description: "Service details for our scaffolding and temporary works solutions.",
      keywords: "scaffolding service details, temporary works, access solutions",
    },
    fr: {
      title: "Service d'échafaudage | ACHI",
      description: "Détails du service : échafaudage, accès temporaire, étaiement et travaux temporaires.",
      keywords: "service échafaudage, accès temporaire, étaiement",
    },
    ar: {
      title: "خدمة سقالات | عشي للسقالات",
      description: "تفاصيل الخدمة ضمن حلول السقالات وأنظمة الوصول والتدعيم والأعمال المؤقتة.",
      keywords: "خدمة سقالات, أنظمة وصول, تدعيم",
    },
    indexable: false,
  },

  "/projects": {
    en: {
      title: "Our Projects | ACHI Scaffolding",
      description: "Explore our scaffolding project portfolio across construction, restoration, and industrial sectors.",
      keywords: "scaffolding projects, construction projects Lebanon, restoration scaffolding, industrial scaffolding portfolio",
    },
    fr: {
      title: "Projets | ACHI",
      description: "Réalisations en échafaudage pour la construction, la restauration et la maintenance industrielle.",
      keywords: "projets échafaudage, réalisations construction, restauration Liban",
    },
    ar: {
      title: "المشاريع | عشي للسقالات",
      description: "استعرض مشاريع السقالات في البناء والترميم والصيانة الصناعية.",
      keywords: "مشاريع سقالات, بناء, ترميم, صيانة صناعية",
    },
    indexable: true,
  },

  "/i-nostri-lavori": {
    it: {
      title: "I Nostri Lavori | Progetti Ponteggi e Restauro in Italia | ACHI",
      description:
        "Scopri i lavori ACHI in Italia: ponteggi per restauro, edifici storici, cantieri complessi, opere provvisionali e interventi tecnici specializzati.",
      canonical: "/it/i-nostri-lavori",
      keywords: "lavori ponteggi Italia, restauro edifici storici, cantieri ponteggi, opere provvisionali Roma",
    },
    indexable: true,
  },

  "/sectors": {
    en: {
      title: "Industry Sectors | ACHI Scaffolding",
      description: "Construction, restoration, industrial maintenance, infrastructure, and events.",
      keywords: "scaffolding sectors Lebanon, renovation scaffolding, construction scaffolding, dome scaffolding Lebanon, church scaffolding, event scaffolding Lebanon, industrial scaffolding Lebanon, oil and gas scaffolding, marine scaffolding, offshore scaffolding, infrastructure scaffolding, ACHI Scaffolding",
    },
    fr: {
      title: "Secteurs | ACHI",
      description: "Construction, restauration, maintenance industrielle, infrastructures et événements.",
      keywords: "secteurs échafaudage, construction, restauration, maintenance industrielle, infrastructures",
    },
    ar: {
      title: "القطاعات | عشي للسقالات",
      description: "البناء والترميم والصيانة الصناعية والبنية التحتية والفعاليات.",
      keywords: "قطاعات سقالات, بناء, ترميم, صيانة صناعية, بنية تحتية",
    },
    indexable: true,
  },

  "/settori-applicazioni": {
    it: {
      title: "Settori di Applicazione | Dove Usiamo i Nostri Ponteggi in Italia – ACHI",
      description:
        "Settori in cui operiamo con ponteggi, impalcature e manodopera: condomini, restauro monumentale, edifici occupati, eventi, industria, cantieri navali. Soluzioni certificate 2026. Preventivo 331 800 7652.",
      canonical: "/it/settori-applicazioni",
      keywords: "settori ponteggi, restauro monumentale, condomini ponteggi, eventi ponteggi, industria ponteggi, cantieri navali",
    },
    indexable: true,
  },

  "/gallery": {
    en: {
      title: "Project Gallery | ACHI Scaffolding",
      description: "Scaffolding installations and project highlights.",
      keywords: "scaffolding gallery Lebanon, scaffolding project photos, facade scaffolding photos, suspended scaffolding images, industrial scaffolding gallery, dome scaffolding Lebanon, ACHI Scaffolding projects",
    },
    fr: {
      title: "Galerie | ACHI",
      description: "Installations d'échafaudage et projets réalisés.",
      keywords: "galerie échafaudage, photos projets, installations échafaudage",
    },
    ar: {
      title: "المعرض | عشي للسقالات",
      description: "صور تركيبات السقالات وأبرز المشاريع.",
      keywords: "معرض سقالات, صور مشاريع, تركيبات سقالات",
    },
    indexable: true,
  },

  "/blog": {
    en: {
      title: "Blog | ACHI Scaffolding",
      description: "Insights on scaffolding systems, temporary works, safety, and execution.",
      keywords: "scaffolding blog, construction insights, temporary works safety, scaffolding tips",
    },
    fr: {
      title: "Blog | ACHI",
      description: "Conseils et informations sur l'échafaudage, les travaux temporaires et la sécurité chantier.",
      keywords: "blog échafaudage, conseils construction, sécurité chantier, travaux temporaires",
    },
    ar: {
      title: "المدونة | عشي للسقالات",
      description: "مقالات عن السقالات والأعمال المؤقتة والسلامة والتنفيذ في الموقع.",
      keywords: "مدونة سقالات, مقالات بناء, سلامة, أعمال مؤقتة",
    },
    it: {
      title: "Blog Ponteggi Italia | ACHI Servizi e Appalti",
      description:
        "Approfondimenti su ponteggi, sicurezza, normativa, restauro e opere provvisionali in Italia.",
      canonical: "/it/blog",
      keywords: "blog ponteggi, sicurezza cantiere, normativa ponteggi Italia, restauro, opere provvisionali",
    },
    indexable: true,
  },

  "/blog-post-1": {
    en: {
      title: "Blog Post | ACHI Scaffolding",
      description: "Scaffolding and temporary works insights.",
      keywords: "scaffolding Lebanon regulation, scaffolding standards Lebanon, scaffolding industry Lebanon, construction safety Lebanon, scaffolding compliance, temporary works Lebanon, engineering-led scaffolding",
    },
    fr: {
      title: "Article | ACHI",
      description: "Échafaudage et travaux temporaires : conseils.",
      keywords: "réglementation échafaudage Liban, normes échafaudage, industrie échafaudage Liban, sécurité construction Liban, travaux temporaires, échafaudage conformité",
    },
    ar: {
      title: "مقال | عشي للسقالات",
      description: "محتوى عن السقالات والأعمال المؤقتة.",
      keywords: "تنظيم سقالات لبنان, معايير سقالات, صناعة سقالات لبنان, سلامة البناء, أعمال مؤقتة, الامتثال للسقالات",
    },
    indexable: true,
  },

  "/blog-post-2": {
    en: {
      title: "Blog Post | ACHI Scaffolding",
      description: "Scaffolding and temporary works insights.",
      keywords: "temporary works construction, what are temporary works, temporary works definition, shoring systems, propping systems, formwork, scaffolding temporary works, construction site safety",
    },
    fr: {
      title: "Article | ACHI",
      description: "Échafaudage et travaux temporaires : conseils.",
      keywords: "travaux temporaires construction, définition travaux temporaires, étaiement, systèmes de puntage, coffrage, sécurité chantier, échafaudage temporaire",
    },
    ar: {
      title: "مقال | عشي للسقالات",
      description: "محتوى عن السقالات والأعمال المؤقتة.",
      keywords: "أعمال مؤقتة في البناء, ما هي الأعمال المؤقتة, تعريف أعمال مؤقتة, أنظمة التدعيم, دعامات, قوالب, سلامة موقع البناء",
    },
    indexable: true,
  },

  "/blog-post-3": {
    en: {
      title: "Blog Post | ACHI Scaffolding",
      description: "Scaffolding and temporary works insights.",
      keywords: "scaffolding occupied buildings, scaffolding residential buildings, safe access scaffolding, scaffolding without disruption, construction access occupied site, scaffolding tenants safety, scaffolding installation planning",
    },
    fr: {
      title: "Article | ACHI",
      description: "Échafaudage et travaux temporaires : conseils.",
      keywords: "échafaudage bâtiments occupés, accès sécurisé échafaudage, échafaudage résidentiel, travaux sans perturbation, échafaudage locataires, planification installation échafaudage",
    },
    ar: {
      title: "مقال | عشي للسقالات",
      description: "محتوى عن السقالات والأعمال المؤقتة.",
      keywords: "سقالات مبانٍ مأهولة, وصول آمن للسقالات, سقالات مباني سكنية, أعمال بدون تعطيل, سلامة المستأجرين, تخطيط تركيب السقالات",
    },
    indexable: true,
  },

  "/careers": {
    en: {
      title: "Careers | ACHI Scaffolding",
      description:
        "Explore career opportunities at ACHI Scaffolding. Join a professional scaffolding company and temporary works contractor delivering complex projects across Lebanon.",
      canonical: "/careers",
      keywords: "scaffolding careers, jobs Lebanon, construction jobs, ACHI careers",
    },
    fr: {
      title: "Carrières | ACHI",
      description:
        "Découvrez les opportunités de carrière chez ACHI Scaffolding. Rejoignez une entreprise d'échafaudage et de travaux temporaires au Liban.",
      canonical: "/fr/careers",
      keywords: "carrières échafaudage, emploi Liban, construction emploi, ACHI carrières",
    },
    ar: {
      title: "الوظائف | عشي للسقالات",
      description:
        "استكشف فرص العمل لدى عشي للسقالات. انضم إلى شركة سقالات ومقاول أعمال مؤقتة ينفذ مشاريع معقدة في لبنان.",
      canonical: "/lb/careers",
      keywords: "وظائف سقالات, عمل لبنان, بناء وظائف, عشي وظائف",
    },
    indexable: true,
  },

  "/lavora-con-noi": {
    it: {
      title: "Lavora con Noi | Diventa Partner ACHI – Subappaltatori, Montatori, Trasportatori, Restauratori",
      description:
        "Entra nel network ACHI Servizi e Appalti. Registra la tua azienda e ricevi progetti in tutta Italia. Vantaggi: pagamenti puntuali, lavoro costante e burocrazia semplificata.",
      canonical: "/it/lavora-con-noi",
      keywords: "lavora con noi ponteggi, partner ACHI, subappaltatori Italia, montatori ponteggi, lavoro ponteggi Roma",
    },
    indexable: true,
  },

  "/careers/partner": {
    en: {
      title: "Partner Registration | ACHI",
      description: "Partner registration is available in Italian.",
      canonical: "/careers/partner",
      keywords: "partner registration, ACHI partner",
    },
    fr: {
      title: "Partenariat | ACHI",
      description: "Inscription partenaire disponible en italien.",
      canonical: "/fr/careers/partner",
      keywords: "partenariat ACHI, inscription partenaire",
    },
    ar: {
      title: "التسجيل كشريك | عشي",
      description: "التسجيل كشريك متاح بالإيطالية.",
      canonical: "/lb/careers/partner",
      keywords: "تسجيل شريك, عشي شراكة",
    },
    indexable: false,
  },

  "/lavora-con-noi-partner": {
    it: {
      title: "Partner ACHI | Registrazione Partner Italia",
      description:
        "Registrazione partner ACHI per subappaltatori, montatori, trasportatori, restauratori, progettisti e professionisti del settore ponteggi in Italia.",
      canonical: "/it/lavora-con-noi-partner",
      keywords: "registrazione partner ponteggi, subappaltatori Italia, montatori, trasportatori, restauratori",
    },
    indexable: false,
  },

  "/privacy-policy": {
    en: {
      title: "Privacy Policy | ACHI Scaffolding",
      description: "Read the ACHI Scaffolding privacy policy. Learn how we collect, use, and protect your personal data.",
      keywords: "privacy policy, data protection, ACHI Scaffolding privacy",
    },
    fr: {
      title: "Politique de confidentialité | ACHI",
      description: "Consultez la politique de confidentialité d'ACHI Scaffolding. Découvrez comment nous collectons et protégeons vos données.",
      keywords: "politique de confidentialité, protection des données, ACHI",
    },
    ar: {
      title: "سياسة الخصوصية | عشي للسقالات",
      description: "اقرأ سياسة الخصوصية لعشي للسقالات. تعرف على كيفية جمع واستخدام وحماية بياناتك الشخصية.",
      keywords: "سياسة الخصوصية, حماية البيانات, عشي للسقالات",
    },
    it: {
      title: "Informativa sulla Privacy | ACHI Servizi e Appalti",
      description: "Informativa sulla privacy di ACHI Servizi e Appalti. Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.",
      canonical: "/it/privacy-policy",
      keywords: "informativa privacy, protezione dati, ACHI Servizi e Appalti, GDPR",
    },
    indexable: true,
  },
}

export const NOINDEX_PATTERNS = [/^\/admin/, /^\/login/, /^\/dashboard/, /^\/cart/, /^\/checkout/, /^\/thank-you/]

const slugToLabel = (slug = "") =>
  String(slug)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const capitalizeWords = (value = "") =>
  String(value)
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

const buildDynamicSeo = (pathname, lang = "en") => {
  const p = String(pathname || "")

  if (/^\/services\/[^/]+$/i.test(p)) {
    const slug = p.split("/").pop() || ""
    const label = capitalizeWords(slugToLabel(slug))

    if (lang === "fr") {
      return {
        title: `${label} | Services d'échafaudage | ACHI`,
        description: `Découvrez le service ${slugToLabel(slug)} proposé par ACHI pour les chantiers, l'industrie et les travaux temporaires au Liban.`,
        canonical: p,
      }
    }

    if (lang === "ar") {
      return {
        title: `${label} | خدمات السقالات | عشي للسقالات`,
        description: `تعرف على خدمة ${slugToLabel(slug)} ضمن حلول السقالات والأعمال المؤقتة التي تقدمها ACHI Scaffolding في لبنان.`,
        canonical: p,
      }
    }

    return {
      title: `${label} | Scaffolding Services | ACHI Scaffolding`,
      description: `Explore ${slugToLabel(slug)} services from ACHI Scaffolding for construction, industrial access, and temporary works projects in Lebanon.`,
      canonical: p,
    }
  }

  if (/^\/project\/[^/]+$/i.test(p)) {
    const slug = p.split("/").pop() || ""
    const label = capitalizeWords(slugToLabel(slug))

    if (lang === "fr") {
      return {
        title: `${label} | Projet | ACHI`,
        description: `Découvrez le projet ${slugToLabel(slug)} réalisé par ACHI dans le domaine de l'échafaudage et des travaux temporaires au Liban.`,
        canonical: p,
      }
    }

    if (lang === "ar") {
      return {
        title: `${label} | مشروع | عشي للسقالات`,
        description: `استعرض مشروع ${slugToLabel(slug)} الذي نفذته ACHI Scaffolding ضمن أعمال السقالات والحلول المؤقتة في لبنان.`,
        canonical: p,
      }
    }

    return {
      title: `${label} | Project | ACHI Scaffolding`,
      description: `Explore the ${slugToLabel(slug)} project delivered by ACHI Scaffolding across construction, restoration, and temporary works in Lebanon.`,
      canonical: p,
    }
  }

  if (/^\/servizi\/[^/]+$/i.test(p)) {
    const slug = p.split("/").pop() || ""
    const label = capitalizeWords(slugToLabel(slug))

    return {
      title: `${label} | Servizi Ponteggi Italia | ACHI`,
      description: `Scopri il servizio ${slugToLabel(slug)} di ACHI Servizi e Appalti per ponteggi, opere provvisionali e cantieri complessi in Italia.`,
      canonical: `/it${p}`,
    }
  }

  if (/^\/i-nostri-lavori\/[^/]+$/i.test(p)) {
    const slug = p.split("/").pop() || ""
    const label = capitalizeWords(slugToLabel(slug))

    return {
      title: `${label} | Progetto Ponteggi Italia | ACHI`,
      description: `Scopri il progetto ${slugToLabel(slug)} realizzato da ACHI Servizi e Appalti in Italia per ponteggi, restauro e opere provvisionali.`,
      canonical: `/it${p}`,
    }
  }

  if (/^\/blog\/[^/]+$/i.test(p) && lang === "it") {
    const slug = p.split("/").pop() || ""
    const label = capitalizeWords(slugToLabel(slug))

    return {
      title: `${label} | Blog Ponteggi Italia | ACHI`,
      description: `Leggi l'articolo ${slugToLabel(slug)} sul blog ACHI dedicato a ponteggi, sicurezza, normativa e opere provvisionali in Italia.`,
      canonical: `/it${p}`,
    }
  }

  return null
}

export const isRouteIndexable = (pathname, search = "", lang = "en") => {
  for (const pattern of NOINDEX_PATTERNS) {
    if (pattern.test(pathname)) return false
  }

  if (hasFilterParams(pathname + search)) return false

  const routeConfig = ROUTE_SEO_CONFIG[pathname]
  if (!routeConfig) {
    const dynamicSeo = buildDynamicSeo(pathname, lang)
    return dynamicSeo ? true : true
  }

  if (routeConfig.indexable === false) return false

  const langCfg = routeConfig[lang]
  if (langCfg && langCfg.indexable === false) return false

  return true
}

export const getRouteSEO = (pathname, lang = "en", search = "") => {
  const routeConfig = ROUTE_SEO_CONFIG[pathname] || {}
  const cfg = routeConfig[lang] || routeConfig.en || {}
  const defaults = DEFAULT_SEO[lang] || DEFAULT_SEO.en
  const dynamicSeo = !routeConfig[lang] && !routeConfig.en ? buildDynamicSeo(pathname, lang) : null

  return {
    title: cfg.title || dynamicSeo?.title || defaults.title,
    description: cfg.description || dynamicSeo?.description || defaults.description,
    ogImage: cfg.ogImage || dynamicSeo?.ogImage || DEFAULT_SEO.ogImage,
    canonical: cfg.canonical || dynamicSeo?.canonical || "",
    indexable: cfg.indexable !== undefined ? cfg.indexable : isRouteIndexable(pathname, search, lang),
    keywords: cfg.keywords || dynamicSeo?.keywords || "",
  }
}

export const CANONICAL_ROUTES = [
  "/",
  "/about",
  "/chi-siamo",
  "/services",
  "/servizi",
  "/projects",
  "/i-nostri-lavori",
  "/sectors",
  "/settori-applicazioni",
  "/gallery",
  "/blog",
  "/blog-post-1",
  "/blog-post-2",
  "/blog-post-3",
  "/careers",
  "/lavora-con-noi",
  "/privacy-policy",
]
