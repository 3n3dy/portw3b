import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    slug: "zvychaika",
    title: "ЗВИЧАЇКА",
    category: "Корпоративний лендінг",
    description:
      "Корпоративна екосистема управління знаннями та адаптацією для малого і середнього бізнесу. Анімований canvas, 3D flip-картки пакетів, мультикрокова форма, Easter Egg.",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion"],
    url: "https://zvychaika.com",
    year: "2026",
    screenshot: "/screenshoots/zvych.webp",
    featured: true,
  },
  {
    id: 2,
    slug: "nexus-landing",
    title: "NEXUS",
    category: "Dark editorial лендінг",
    description:
      "Паралельна версія консалтингового лендінгу з темною editorial-естетикою. Обсидіан + бурштин, анімовані лічильники, кастомна типографіка.",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion"],
    url: "https://nexus.yoursite.com",
    year: "2026",
    screenshot: "/screenshoots/nexus.jpg",
    featured: true,
  },
  {
    id: 3,
    slug: "BonnieBeadShop",
    title: "BONNIEBEAD",
    category: "Seller website",
    description:
      "Хендмейд магазин з каталогами, адмінкою та локальною реєстрацією юзера",
    tech: ["React", "TypeScript", "Vite"],
    url: "https://bonniebead.pages.dev",
    year: "2026",
    screenshot: "/screenshoots/bbstore1.gif",
    featured: true,
  },
    {
    id: 4,
    slug: "Ще деякі",
    title: "Side websites",
    category: "Landing Page",
    description:
      "Різні сайти, різні задачі",
    tech: ["React", "TypeScript", "Vite"],
    url: "https://projectssample.all.com",
    year: "2025",
    screenshot: "/screenshoots/proj3.webp",
    featured: true,
  },
];
