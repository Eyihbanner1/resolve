# Resolve OTC AI Guide

## Big Picture
- Landing page is static HTML/CSS/JS (`index.html`, `css/style.css`, `js/script.js`) with no build step; load locally via any static server or `php -S localhost:8000` when testing `contact-handler.php`.
- Tailwind utilities are pulled from the CDN in `index.html`, but custom Material 3 styling lives in `css/style.css`; keep shared look-and-feel by editing tokens and `.m3-*` helpers before sprinkling new Tailwind classes.
- Animations and scroll reveals rely on `animate-on-scroll` classes plus observers in `js/script.js`; new sections should reuse those hooks for consistent behavior.

## Styling Conventions
- Color, spacing, and elevation variables are defined under `:root` in `css/style.css`; reuse these custom properties instead of hard-coding values.
- Feature/marketing components use `.m3-card`, `.feature-card`, `.market-item-card`, and `.faq-item`; match their structure (icon wrapper + heading + copy) to inherit glassmorphism and hover effects.
- For responsive tweaks prefer media queries already used (`max-width: 768px`, `639px`, `480px`) and extend them close to existing blocks; keep gradients and blur effects intact.

## JavaScript Patterns
- All DOM hooks are queried on `DOMContentLoaded`; add new behaviors inside that block near related features to avoid duplicate listeners.
- Contact/newsletter forms intercept submit, build `mailto:` URLs for `admin@resolve.ng`, and show feedback via `showModal`; follow this pattern for any additional lightweight forms.
- Market asset cards (`.market-item-card[role="button"]`) auto-scroll and prefill the main form—mirror that event delegation when adding new cards to keep analytics consistent.

## Forms & Backend
- Default deployment uses mailto flows; `contact-handler.php` remains as a fallback PHP endpoint expecting `POST` with `contact*` fields—if you switch back, update the form `action` and the JS mailto logic together.
- Validation is client-side only; if you introduce server calls, remember current UX expects success modals instead of inline errors.

## Assets & Fonts
- Custom Sansation font files live under `fonts/` and are referenced via `@font-face`; drop additional weights there and update the block instead of linking new CDNs.
- Images reside in `img/`; large hero/marketing assets are preloaded in `index.html`—add new critical imagery to the preload list to avoid layout shifts.

## Deployment & Automation
- GitHub Action `.github/workflows/deploy.yml` deploys via FTP on pushes to `main`; keep secrets (`FTP_HOST`, etc.) in repo settings and avoid committing credentials.
- When altering deployment behavior, adjust the workflow `exclude` list carefully so marketing artifacts (e.g., `.playwright-mcp` captures) do not ship to production unless needed.

## Testing & QA
- For quick visual checks, open `index.html` directly or via Live Server; mobile regressions are easiest to catch by resizing to 320–390px and confirming single-column feature cards.
- Scroll-triggered animations require actual scrolling; if something seems static, ensure the element still carries `animate-on-scroll` and that the observer threshold fits the new layout.
