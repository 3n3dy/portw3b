# Portfolio — React + Vite + TypeScript

Сучасний портфоліо-сайт. Деплой на Cloudflare Pages.

## Швидкий старт

```bash
npm install
npm run dev
```

## Що змінити перед запуском

### 1. Додай свої проекти
Редагуй `src/data/projects.ts`:
```ts
{
  title: "Назва проекту",
  url: "https://твій-живий-сайт.com",
  screenshot: "/screenshots/назва.png",  // клади в /public/screenshots/
  // ...
}
```

### 2. Додай скріншоти
Клади PNG-файли в `/public/screenshots/`:
```
public/
  screenshots/
    zvychaika.png
    nexus.png
    проект3.png
```

**Рекомендований розмір скріншоту:** 1280×800px

### 3. Заміни особисту інформацію
- `src/components/sections/About.tsx` — ім'я, біо, навички
- `src/components/sections/Contact.tsx` — email, telegram, Google Script URL
- `src/components/Footer.tsx` — посилання на GitHub

### 4. Фото
Клади фото в `/public/photo.jpg` і розкоментуй рядок в `About.tsx`:
```tsx
<img src="/photo.jpg" alt="Фото" className="w-full h-full object-cover" />
```

### 5. CV
Клади PDF в `/public/cv.pdf`

## Деплой на Cloudflare Pages

```bash
# Build
npm run build

# Cloudflare автоматично підхопить dist/
# Framework preset: Vite
# Build command: npm run build
# Build output directory: dist
```

`_routes.json` і `_redirects` вже налаштовані для SPA routing.

## Структура

```
src/
  components/
    Header.tsx          — хедер з auto-hide
    Footer.tsx          — футер
    sections/
      Hero.tsx          — Hero з marquee
      Projects.tsx      — Індекс проектів з hover-preview
      About.tsx         — Про мене + фото + навички
      Contact.tsx       — Форма + контакти
  data/
    projects.ts         — ✏️ РЕДАГУЙ ЦЕЙ ФАЙЛ
  hooks/
    useCustomCursor.ts  — кастомний курсор
    useScrollReveal.ts  — reveal при скролі
  types/
    index.ts            — TypeScript типи
```

## Технології

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion
- Lucide React
- Cloudflare Pages
