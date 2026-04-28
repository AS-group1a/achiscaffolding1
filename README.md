# ACHI Scaffolding Website

Official repository for the **ACHI Scaffolding corporate website**.

This project is a **React-based multilingual website** designed to present the company's services, projects, and expertise. The site focuses on **SEO performance, multilingual accessibility, and optimized deployment on GitHub Pages**.

---

# Project Overview

The website provides the public-facing platform for ACHI Scaffolding and includes:

- Multilingual architecture
- Country-based routing (Lebanon / Italy)
- SEO optimization (meta tags, canonical URLs, structured data)
- Static prerendering for search engines
- Performance optimizations (lazy loading, WebP images)
- 3D model viewer for scaffolding products

---

# Technology Stack

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

# Repository Structure
Frontend/
├── public/ Static assets (images, sitemap, etc.)
├── scripts/ Build scripts (sitemap generation, prerendering, image optimization)
├── src/
│ ├── components/ Shared UI components
│ ├── pages/ Page-level components
│ ├── routes/ Main routing configuration
│ ├── routing/ Language routing helpers
│ ├── seo/ SEO utilities
│ ├── translations/Multilingual JSON files
│ └── utils/ Utility functions



---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

---

### `npm test`

Launches the test runner in the interactive watch mode.

---

### `npm run build`

Builds the app for production to the `build` folder.

The build is optimized and minified for best performance.

---

### `npm run eject`

Note: this is a one-way operation. Once you eject, you cannot go back.

If you are not satisfied with the build configuration, ejecting will copy all configuration files into the project so you can modify them directly.

---

# Deployment

The site is deployed using **GitHub Pages**.

Build scripts also generate:

- `sitemap.xml`
- prerendered HTML pages for search engines
- optimized WebP images

---

# Learn More

You can learn more about Create React App here:

https://facebook.github.io/create-react-app/docs/getting-started

React documentation:

https://reactjs.org/

