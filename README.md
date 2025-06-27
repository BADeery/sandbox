Sure — here's your updated `README` written in plain text (you can copy this directly into a `README.md` file):

---

````
# BDs Sandbox

**Live site:** https://badeery.github.io/sandbox  
**Built with:** Eleventy (11ty), Nunjucks, Markdown, and custom CSS  
**Hosted on:** GitHub Pages

---

## 🧱 Features

- Clean layout using Nunjucks templates (`base.njk`, `post.njk`, `articles.njk`)
- Article grid with responsive `.article-card` layout
- Reading time via `eleventy-plugin-reading-time`
- Icons injected using `data-lucide`
- Semantic HTML + Markdown content (`index.md`, `articles.md`, etc.)
- Responsive design, dark mode support, and semantic spacing
- Custom sitemap via `sitemap.xml.njk`
- GitHub Pages-friendly build (`_site/`)

---

## 🔧 Setup

Terminal:

```bash
npm install
npx eleventy --serve
````

To deploy to GitHub Pages:

* Set build directory to `_site/`
* Push from your working branch to `gh-pages` (via GitHub Actions or manual build)

---

## 🗂️ Project Structure

```
.
├── .eleventy.js (eleventy.config.js)
├── package.json
├── index.css
├── sitemap.xml.njk
├── layouts/
│   ├── base.njk
│   ├── post.njk
│   ├── articles.njk
│   └── postslist.njk
├── content/
│   ├── index.md
│   ├── articles.md
│   └── Bz & Dz.md
└── _site/ (auto-generated)
```

---

## 🧩 Plugins

* `eleventy-plugin-reading-time` — shows estimated read time on article cards
* `luxon` — used in `auDate` filter for Australian-friendly date formatting

---

## 🧪 Notable Customisations

* `.post-footer-meta-row` styles ensure date (with calendar icon) aligns bottom-left, and reading time (with clock icon) aligns bottom-right
* Responsive grid scaling via `grid-template-columns: repeat(auto-fit, minmax(...))`
* Typography via `Space Mono` and `Muli` fonts
* Custom color system using `--text-color` variables and `prefers-color-scheme`

---

## ✍️ Author

Created by **BD** — a neurodivergent systems thinker with a sandbox mind.

```

---

Let me know if you want a short `gh-pages` deploy section or comments for each template file.
```
