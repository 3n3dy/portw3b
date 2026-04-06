# SEO and i18n URL Structure Fixes

## Meta and Canonical Tags
Implement the following meta, canonical, and hreflang tags for the /en/ and /uk/ entry points:

```html
<!-- English Version -->
<link rel="canonical" href="https://example.com/en/">
<meta name="description" content="Description for English Version">
<link rel="alternate" href="https://example.com/en/" hreflang="en">
<link rel="alternate" href="https://example.com/uk/" hreflang="uk">

<!-- Ukrainian Version -->
<link rel="canonical" href="https://example.com/uk/">
<meta name="description" content="Description for Ukrainian Version">
<link rel="alternate" href="https://example.com/en/" hreflang="en">
<link rel="alternate" href="https://example.com/uk/" hreflang="uk">
```

## LangContext and LangSwitcher Updates
Update LangContext and LangSwitcher components to utilize the URL path as the source of truth:

```javascript
// Pseudo-code
const LangContext = createContext();

function LangSwitcher() {
    const currentLang = window.location.pathname.split('/')[1]; // Extract language from URL path
    // Implement navigation based on language change
}
```

## _redirects File Update
Update the public/_redirects file to redirect from / to /en/ and provide SPA fallbacks for language-specific paths:

```
# Redirects
/ /en/
/en/* https://example.com/en/
/uk/* https://example.com/uk/
```

## sitemap.xml Update
Ensure the public/sitemap.xml includes the following entries with correct lastmod:

```xml
<url>
    <loc>https://example.com/en/</loc>
    <lastmod>2026-04-06T13:13:04Z</lastmod>
</url>
<url>
    <loc>https://example.com/uk/</loc>
    <lastmod>2026-04-06T13:13:04Z</lastmod>
</url>
```

## robots.txt Update
If public/robots.txt needs updating, allow access to language versions:

```
User-agent: *
Allow: /en/
Allow: /uk/
```

## Remove Junk and Update .gitignore
Remove tracked build artifacts and junk files:
```
.DS_Store
dist/
tsbuildinfo
```
Update .gitignore to reflect these changes:
```
# Ignore junk files
.DS_Store
dist/
tsbuildinfo
```