# BDs Sandbox

**Live site:** https://badeery.github.io/sandbox  
**Built with:** Eleventy (11ty), Nunjucks, Markdown, and custom CSS  
**Hosted on:** GitHub Pages

---

## 🧱 Features

- Modular layout using Nunjucks templates (`base.njk`, `article.njk`, `articles-page.njk`, `postslist.njk`)
- Article grid with responsive `.articles-page-card` layout
- Individual post pages via `article.njk` with semantic metadata
- Reading time via `eleventy-plugin-reading-time`
- Icons injected using `data-lucide`
- Semantic HTML + Markdown content (`index.md`, `articles-page.md`, etc.)
- Responsive design, dark mode support, and semantic spacing
- Custom sitemap via `sitemap.xml.njk`
- GitHub Pages-friendly build (`_site/`)

---

## 🔧 Setup

```bash
npm install
npx eleventy --serve
```

To deploy to GitHub Pages:

- Set build directory to `_site/`
- Push from your working branch to `gh-pages` (via GitHub Actions or manual build)

---

## 🗂️ Project Structure

```
.
├── eleventy.config.js
├── package.json
├── index.css
├── sitemap.xml.njk
├── layouts/
│   ├── base.njk
│   ├── article.njk
│   ├── articles-page.njk
│   └── postslist.njk
├── content/
│   ├── index.md
│   ├── articles-page.md
│   └── articles/ (markdown article folders)
└── _site/ (auto-generated)
```

---

## 🧩 Plugins

- `eleventy-plugin-reading-time` — shows estimated read time
- `luxon` — used in `auDate` filter for Australian-friendly date formatting

---

## 🧪 Notable Customisations

- `.articles-page-card` and `.article-meta-row` for semantic and visual clarity
- Custom Eleventy collection: `posts` pulls all `.md` articles from `/articles/`
- Clean handling of Obsidian-style wikilinks and image references
- Tooltip (`.quip-tooltip`) and inline symbol system (`.quip-wrapper`)
- Typography via `Space Mono` and `Muli` fonts
- CSS variables for theming and dark mode

---

## ✍️ Author

Created by **BD** — a neurodivergent systems thinker with a sandbox mind.
