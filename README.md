<div align="center">

<img src="https://img.shields.io/badge/FT-FiatTrack-00e5a0?style=for-the-badge&labelColor=0a0b0f&color=00e5a0" alt="FiatTrack" height="40"/>

# FiatTrack

**A modern, educational fiat currency tracking dashboard**  
Built with pure HTML5 · CSS3 · JavaScript — no frameworks, no build tools.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-00e5a0?style=flat-square&logo=vercel&logoColor=white&labelColor=0a0b0f)](https://hamzlabs.github.io/FiatTrack-Mini-projet-Web)
[![GitHub Stars](https://img.shields.io/github/stars/HamzLabs/FiatTrack-Mini-projet-Web?style=flat-square&logo=github&labelColor=0a0b0f&color=00e5a0)](https://github.com/HamzLabs/FiatTrack-Mini-projet-Web/stargazers)
[![License](https://img.shields.io/badge/License-MIT-00e5a0?style=flat-square&labelColor=0a0b0f)](LICENSE)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## ✨ Overview

**FiatTrack** is a fully static, front-end-only currency dashboard that simulates a professional financial platform. It tracks 20 major fiat currencies, features interactive charts, a real-time converter, and supports three languages — all without a single backend or npm package.

> ⚠️ All exchange rate data is either fetched from a free public API or simulated for demonstration purposes. Do not use for real financial decisions.

---

## 🖥️ Pages & Features

| Page | Description |
|------|-------------|
| `index.html` | Hero landing page with animated circuit-board canvas, live rate cards, featured currencies grid, and EUR/USD trend chart |
| `market.html` | Full interactive market table — sortable, searchable, with sparklines, favorites (localStorage), and per-currency modal charts |
| `converter.html` | Instant converter between 20 currencies using USD as pivot, with a 30-day historical trend chart |
| `about.html` | Project description, tech stack cards, learning objectives, and annotated file architecture |
| `contact.html` | Validated contact form (client-side), contact info cards |

### Core Features

- 🌍 **FR / EN / AR** language switcher with full RTL support for Arabic
- 🌙 **Dark / Light** theme toggle, persisted in `localStorage`
- 📈 **Interactive charts** via Chart.js — line graphs with gradient fills, hover tooltips, period tabs (24h / 7d / 30d / 90d)
- ⚡ **Live ticker bar** — scrolling exchange rate marquee across all pages
- ⭐ **Favorites system** — star currencies and filter by favorites, saved across sessions
- 🔍 **Search & sort** — filter the market table by name, code, or symbol; sort by rate or 24h change
- 📱 **Fully responsive** — mobile, tablet, and desktop layouts
- ♿ **Accessible** — semantic HTML5, ARIA attributes, keyboard navigation
- 🔄 **Auto-refresh** every 30 seconds with live API fallback simulation

---

## 🗂️ Project Structure

```
fiattrack/
├── index.html          # Home — hero, featured currencies, trend chart
├── market.html         # Market — interactive table with sparklines & modal charts
├── converter.html      # Converter — 20-currency converter with history chart
├── about.html          # About — project details, tech stack, architecture
├── contact.html        # Contact — validated contact form
├── css/
│   └── style.css       # Main stylesheet (shared across pages)
└── js/
    ├── currencydata.js  # Currency metadata, base rates, convert() helper
    └── app.js           # Application logic (shared behaviors)
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic markup, ARIA accessibility |
| **CSS3** | Custom properties, Grid, Flexbox, animations, transitions |
| **Vanilla JavaScript** | DOM manipulation, fetch API, Canvas API, localStorage |
| **[Chart.js](https://www.chartjs.org/)** | Line charts with gradients, tooltips, and animations |
| **[Font Awesome 6](https://fontawesome.com/)** | Icon library |
| **[Google Fonts](https://fonts.google.com/)** | Syne (display) · DM Sans (body) · Space Mono (mono) |
| **[exchangerate-api.com](https://www.exchangerate-api.com/)** | Free public API for live USD-based rates |

---

## 🚀 Getting Started

No installation or build step required — just open the files in a browser.

### Option 1 — Open directly

```bash
git clone https://github.com/HamzLabs/FiatTrack-Mini-projet-Web.git
cd FiatTrack-Mini-projet-Web
# Open index.html in your browser
```

> 💡 For full API functionality (live rates), serve over HTTP rather than opening as a local file. Use any static server:

### Option 2 — Local dev server

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
# Install the "Live Server" extension and click "Go Live"
```

Then visit `http://localhost:8080`.

---

## 🌐 Internationalization (i18n)

FiatTrack supports three languages, switchable via the nav bar on every page:

| Code | Language | Direction |
|------|----------|-----------|
| `fr` | Français | LTR |
| `en` | English  | LTR |
| `ar` | العربية  | RTL (full `dir="rtl"`) |

Language preference is saved to `localStorage` and applied on every page load. The `data-i18n` attribute system drives all translations — no external library needed.

---

## 🎨 Design System

The entire UI is built on a set of CSS custom properties defined in `:root`:

```css
--accent:   #00e5a0   /* Primary green — CTAs, active states, charts  */
--accent2:  #00b4ff   /* Secondary blue — secondary highlights         */
--up:       #00e5a0   /* Positive price change                         */
--down:     #ff4466   /* Negative price change                         */
--warning:  #ffaa00   /* Favorites, warnings                           */
```

Both dark and light themes are supported via `[data-theme="light"]` overrides.

---

## 📚 Learning Objectives

This project was built to practice and demonstrate:

- Multi-page site architecture with shared navigation patterns
- Modern CSS layout — Grid, Flexbox, custom properties, and animations
- Dynamic DOM manipulation and event-driven JavaScript
- `localStorage` for persistent user preferences (theme, language, favorites)
- Client-side form validation without libraries
- Canvas API for the animated hero background
- Integration of third-party chart and icon libraries
- Responsive design with media queries
- Accessibility best practices (ARIA roles, semantic HTML)

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with 🟢 in Morocco · **FiatTrack** — Educational use only

</div>
