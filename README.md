# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Project Overview

A learning project to understand React fundamentals — components, routing, project structure, and CSS layout.

### Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing (SPA navigation)

### Project Structure

```
src/
  main.jsx              # Entry point - BrowserRouter + App
  App.jsx               # Layout + Routes
  App.css               # Global styles
  components/           # Reusable UI pieces
    Header.jsx          # Top nav with logo + Link navigation
    Footer.jsx          # Copyright footer
    MainContent.jsx     # "Reasons I'm excited to learn React"
    Blog.jsx            # Blog post component
  pages/                # Full screen pages
    Home.jsx            # Home page (MainContent + Blog)
    About.jsx           # About page
    Contact.jsx         # Contact page
  assets/
    react.svg           # React logo
```

### App Flow

```
index.html → main.jsx (BrowserRouter) → App.jsx
                                          ├── Header     (always visible, has Links)
                                          ├── Routes     (swaps based on URL)
                                          │    ├── /        → Home
                                          │    ├── /about   → About
                                          │    └── /contact → Contact
                                          └── Footer     (always visible)
```

### What Was Built (Step by Step)

1. **Fixed Vite setup** - Restored `index.html` to use Vite's entry point (`main.jsx`) instead of loading JSX directly
2. **Component structure** - Built Header, MainContent, Footer, Blog as separate React components
3. **CSS layout** - Flexbox for sticky footer (`min-height: 100vh` + `flex: 1` on main)
4. **Project organization** - Separated `components/` (reusable pieces) from `pages/` (full screens)
5. **React Router** - Installed `react-router-dom`, added `BrowserRouter`, `Routes`, `Route`, and `Link` for SPA navigation
6. **Navigation** - Header links use `<Link>` to swap page content without full page reload

### Concepts Covered

- Vite project setup and file flow (index.html → main.jsx → App.jsx)
- React components (function components, export/import)
- JSX syntax
- CSS styling (flexbox layout, sticky footer)
- Project organization (components/ vs pages/)
- React Router (Routes, Route, Link, BrowserRouter)
- Single Page App (SPA) navigation without page reload
- Importing assets (images/SVGs) in Vite

### Lesson 1: Props

This lesson uses two places in the app to demonstrate props:

- `Footer` receives `year` and `name` from `App.jsx`
- `Card` receives profile data from `About.jsx`

#### Footer props

`App.jsx` passes values into the component:

```jsx
<Footer year={2026} name="CR Development" />
```

`Footer.jsx` receives those values in its parameter list:

```jsx
export default function Footer({ year, name }) {
  return (
    <small>
      &copy; {year} {name}. All rights reserved.
    </small>
  );
}
```

#### Reusable Card props

Instead of hardcoding the About card with separate child components, `Card` now receives its content through props like `name`, `role`, `email`, `about`, and `interests`.

That makes the component reusable: `About.jsx` can render multiple cards with different data while keeping the same structure and styling.

#### Key idea

Props are how parent components send data to child components. They make components flexible, reusable, and easier to maintain.

### React Router Setup — What We Did and Why

#### 1. Installed the package (npm)

```bash
npm install react-router-dom
```

- **What:** Downloaded `react-router-dom` from npm
- **Why:** React has no built-in routing. This library lets us show different pages based on the URL without reloading the browser.

#### 2. Wrapped App with BrowserRouter (`main.jsx`)

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

- **What:** Added `<BrowserRouter>` around `<App />` in `main.jsx`
- **Why:** React Router needs this wrapper to track URL changes. Without it, `<Routes>` and `<Link>` won't work. We put it in `main.jsx` (not `App.jsx`) so the entire app has access to routing.

#### 3. Created pages folder (`src/pages/`)

- `Home.jsx` — reuses existing MainContent + Blog components
- `About.jsx` — new page
- `Contact.jsx` — new page
- **What:** Each page is a React component in its own file under `pages/`
- **Why:** Separates full screens (`pages/`) from reusable UI pieces (`components/`). This is a common convention — pages are what the user sees, components are the building blocks.

#### 4. Added Routes to App.jsx

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
```

- **What:** Replaced `<MainContent />` and `<Blog />` with `<Routes>` containing three `<Route>` entries
- **Why:** This tells React — when URL is `/`, render Home. When `/about`, render About. Header and Footer sit outside `<Routes>` so they're always visible on every page.

#### 5. Updated Header with Link (`Header.jsx`)

```jsx
<Link to="/about">About</Link>
```

- **What:** Replaced plain `<li>` text with `<Link to="...">` from React Router
- **Why:** `<Link>` navigates without reloading the page — it just swaps the content area. A normal `<a href>` would cause a full browser refresh, losing the SPA (Single Page App) benefit. Also wrapped the logo in `<Link to="/">` so clicking it goes home.

#### 6. Styled the nav links (`App.css`)

```css
.nav-list a {
  color: white;
  text-decoration: none;
}
.nav-list a:hover {
  color: #61dafb;
}
```

- **What:** Added CSS for the links
- **Why:** `<Link>` renders as a default blue underlined `<a>` tag. These styles make it match the dark theme — white text, no underline, blue on hover.

#### Key Takeaway

React Router turns a React app into a **Single Page App (SPA)** — one HTML page where JavaScript swaps the content based on the URL. The browser never reloads. Header, Footer, and any shared layout stay fixed while only the page content changes.

### Getting Started

```bash
npm install
npm run dev
```
