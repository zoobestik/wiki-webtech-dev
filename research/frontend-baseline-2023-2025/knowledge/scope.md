---
title: Scope исследования
description: Границы, методология и критерии отбора для исследования Frontend Baseline 2023–2025
outline: deep
lastUpdated: true
---

# Scope исследования: Frontend Baseline 2023–2025

## Временные границы

- **Начало:** 1 января 2023
- **Конец:** 18 ноября 2025 (актуальная дата исследования)

Исследование охватывает изменения, которые:

- Были **анонсированы**, **вошли в спецификацию** или **реализованы в браузерах** в указанный период
- Достигли **Baseline статуса** (согласно Web Platform Baseline initiative) в течение этого периода
- Имеют **значительное практическое влияние** на frontend-разработку

## Контекст: связь с предыдущим исследованием

Данное исследование является продолжением **`frontend-baseline-2018-2022`** и начинается с точки, где предыдущее завершилось:

- **Браузерные версии на начало 2023:** Chrome 109+, Firefox 109+, Safari 16.3+, Edge 109+
- **Технологическое состояние:** ES2022, CSS `:has()` в процессе достижения baseline, `<dialog>` в baseline

## Технологические области

Исследование структурировано по **пяти ключевым технологиям**, каждая представлена отдельными файлами для каждого года:

### 1. HTML (HyperText Markup Language)

**Включаем:**

- Новые элементы (например, `<search>`, popover API)
- Новые атрибуты для существующих элементов
- Изменения в семантике или поведении элементов
- Улучшения форм и валидации
- Accessibility (ARIA) обновления, интегрированные в HTML
- Loading и performance атрибуты
- Изменения в parsing и DOM API

**Исключаем:**

- Экспериментальные предложения без baseline поддержки
- Микрофичи без практического влияния

### 2. CSS (Cascading Style Sheets)

**Включаем:**

- Новые CSS свойства
- Новые CSS селекторы и pseudo-классы/элементы
- Новые CSS функции
- Layout системы и их улучшения (Grid, Flexbox, Subgrid, Container Queries)
- Logical properties расширения
- Custom Properties (`@property`)
- At-rules (`@layer`, `@container`, `@scope`, расширения `@media`)
- CSS Nesting
- Color spaces и функции (oklch, color-mix)
- View Transitions API
- Scroll-driven animations
- Anchor positioning

**Исключаем:**

- Vendor-specific свойства без стандартизации
- Экспериментальные CSS Houdini APIs без широкой поддержки

### 3. JavaScript и Web APIs

**Включаем:**

#### ECMAScript (2023–2025)

- Языковые фичи ES2023, ES2024, ES2025, достигшие baseline в браузерах

#### Web APIs — категории для исследования:

- **DOM и UI:** Popover API, Declarative Shadow DOM, Custom Elements v2
- **Performance:** Navigation API, Performance APIs обновления
- **Loading:** Import maps, Module preload, Import assertions/attributes
- **Storage:** Storage API расширения, Cookie Store API updates
- **Network:** Fetch API расширения, WebSockets updates, WebTransport
- **Async и Control Flow:** Async iterators расширения
- **Media:** WebCodecs baseline статус, Media Session API
- **Device Integration:** Web Bluetooth updates, WebUSB updates, File System Access API
- **Security:** Permissions API updates, Permissions Policy расширения
- **Workers:** Updates и новые возможности
- **Platform-specific:** Progressive Web Apps APIs, Web App Manifest updates

**Исключаем:**

- Экспериментальные APIs без baseline статуса
- Node.js-специфичные фичи
- Frameworks и библиотеки (React, Vue, Svelte и т.д.)

### 4. HTTP и другие протоколы

**Включаем:**

- HTTP/3 adoption и улучшения
- Новые HTTP заголовки (Security, Privacy, Performance)
- Fetch API protocol updates
- Service Workers изменения
- WebSocket protocol updates
- WebRTC updates
- WebTransport

**Исключаем:**

- Серверные HTTP-технологии без влияния на клиентскую разработку

### 5. Безопасность (Security)

**Включаем:**

- Content Security Policy (CSP) updates
- Permissions Policy changes
- CORS/CORP/COEP/COOP updates
- Новые security APIs
- Deprecations и удаления небезопасных функций
- Privacy-related features (Privacy Sandbox initiatives)
- Secure Contexts требования
- Cookie security updates (SameSite, Partitioned)

**Исключаем:**

- Серверные security технологии без direct impact на frontend

## Браузеры в scope

**Основные (для определения baseline):**

1. **Google Chrome / Chromium** (109+ → текущая версия)
2. **Mozilla Firefox** (109+ → текущая версия)
3. **Apple Safari** (16.3+ → текущая версия, включая iOS)
4. **Microsoft Edge** (109+ → текущая версия, Chromium-based)

**Критерий Baseline:** Используется официальная методология **Web Platform Baseline** (запущена в 2023):

- **Baseline 2023 (newly available):** Фича поддерживается во всех основных браузерах
- **Baseline widely available:** Фича поддерживается 30+ месяцев во всех основных браузерах

## Источники данных

### Первичные источники:

1. **Официальные спецификации:**
    - W3C Recommendations и Working Drafts
    - WHATWG Living Standards
    - TC39 ECMAScript proposals (stage 4)
    - Web Incubator Community Group (WICG) proposals

2. **Baseline tracking:**
    - web.dev/baseline (официальный Baseline dashboard)
    - WebDX Community Group Baseline reports

3. **Релиз-ноуты браузеров:**
    - Chrome Platform Status, Chromium Blog, Chrome Developers blog
    - Firefox Release Notes, Mozilla Hacks
    - WebKit Feature Status, Safari Release Notes, WebKit Blog
    - Microsoft Edge Release Notes

4. **Документация и compatibility данные:**
    - MDN Web Docs (Mozilla Developer Network)
    - Can I Use (caniuse.com)
    - Browser Compatibility Data (BCD)
    - web-platform-tests

### Вторичные источники:

- Issue trackers браузеров (Chromium bugs, Mozilla Bugzilla, WebKit bugs)
- W3C и WHATWG GitHub repositories
- Технические блоги признанных экспертов (Jen Simmons, Una Kravets, Rachel Andrew, и др.)
- Статьи на web.dev, CSS-Tricks, Smashing Magazine
- Социальные сети: Twitter/X (Miriam Suzanne, Bramus, и др.), Mastodon

## Критерии значимости изменения

Изменение включается в исследование, если оно соответствует **хотя бы одному** из критериев:

1. **Высокое практическое влияние:**
    - Решает частую проблему разработчиков
    - Улучшает производительность или UX значительно
    - Упрощает или заменяет сложные паттерны (например, Container Queries vs media queries)

2. **Широкое применение:**
    - Используется в популярных production приложениях
    - Рекомендуется в best practices
    - Включено в Interop focus areas (2023, 2024, 2025)

3. **Архитектурная значимость:**
    - Вводит новую парадигму или подход
    - Является основой для будущих фич
    - Меняет mental model разработчиков

4. **Baseline status:**
    - Достигло Baseline newly available или widely available в период 2023–2025

5. **Deprecation impact:**
    - Депрекация влияет на существующий production-код
    - Требует миграции или рефакторинга

## Структура итоговых отчётов

### Структура директорий:

```
./research/frontend-baseline-2023-2025/knowledge/
├── index.md                    # Главный индекс
├── scope.md                    # Этот файл
├── sources.md                  # Все источники
├── retrospective.md            # Ретроспектива
├── 2023/
│   ├── index.md
│   ├── html.md
│   ├── css.md
│   ├── javascript.md
│   ├── http-protocols.md
│   └── security.md
├── 2024/
│   ├── index.md
│   ├── html.md
│   ├── css.md
│   ├── javascript.md
│   ├── http-protocols.md
│   └── security.md
└── 2025/
    ├── index.md
    ├── html.md
    ├── css.md
    ├── javascript.md
    ├── http-protocols.md
    └── security.md
```

### Структура отчета для каждой технологии:

Каждый файл (например, `2023/css.md`) содержит:

1. **Frontmatter** с метаданными
2. **Обзор года** для данной технологии
3. **Новые возможности** (группировка по темам)
4. **Изменения в существующих возможностях**
5. **Deprecations и removals**
6. **Baseline статусы** (newly available, widely available)
7. **Browser support tables** (где уместно)
8. **Примеры кода** (базовые, практические)
9. **Ссылки на источники**

## Ограничения исследования

### Сознательно исключаем:

1. Фреймворки и библиотеки (React, Vue, Angular, Svelte, Solid и др.)
2. Build tools и транспайлеры (Vite, Webpack, esbuild, Turbopack, Babel и др.)
3. CSS препроцессоры и постпроцессоры (Sass, Less, PostCSS, Lightning CSS и др.)
4. Meta-frameworks (Next.js, Nuxt, SvelteKit, Remix, Astro и др.)
5. Tooling и developer experience (кроме DevTools фич, влияющих на стандарты)
6. Серверные технологии и Node.js/Deno/Bun (кроме тех, что влияют на клиентскую разработку)
7. TypeScript (язык) — рассматриваем только стандартный JavaScript

### Технические ограничения:

1. **Актуальность данных:** Исследование опирается на источники, актуальные на 18.11.2025
2. **Глубина анализа:** Фокус на практическом применении, а не на теоретических деталях спецификаций
3. **Субъективность значимости:** Оценка влияния основана на анализе community feedback, экспертных мнений и Interop priorities

## Целевое использование отчёта

Итоговые отчёты предназначены для:

1. **Самостоятельного изучения** опытным разработчиком, который хочет восполнить пробелы в знаниях за 2023–2025
2. **Планирования углублённого обучения** — выбор тем для детального изучения
3. **Практического применения** — внедрение новых возможностей в реальные проекты
4. **Справочного материала** — быстрый поиск информации о конкретной фиче по году и технологии

---

- **Research ID:** `frontend-baseline-2023-2025`
- **Дата создания:** 18.11.2025
- **Методология:** DeepResearch-Claude
- **Связанное исследование:** [`frontend-baseline-2018-2022`](../../frontend-baseline-2018-2022/knowledge/final-report.md)
