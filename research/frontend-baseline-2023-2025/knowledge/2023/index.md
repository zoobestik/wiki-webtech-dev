---
title: Frontend Development — 2023 год
description:
    Обзор всех изменений frontend-разработки за 2023 год с навигацией по технологическим отчётам
outline: deep
lastUpdated: true
---

# Frontend Development — 2023 год

**Период**: 1 января — 31 декабря 2023  
**Research ID**: `frontend-baseline-2023-2025`  
**Дата создания**: 18 ноября 2025

## Обзор года

2023 год стал **революционным** для frontend-разработки, особенно для CSS. Ключевые достижения:

### 🎯 Основные темы года

1. **CSS Revolution** — Container Queries, `:has()`, Subgrid, CSS Nesting достигли Baseline
2. **Declarative UI** — Popover API, улучшения `<dialog>`, атрибут `name` для `<details>`
3. **Privacy First** — Privacy Sandbox GA, CHIPS, партиционированные cookies
4. **Web Platform Baseline** — запуск инициативы для прозрачности совместимости
5. **Interop 2023** — беспрецедентный фокус на CSS (15 focus areas)
6. **Immutability** — ES2023 Change Array by Copy методы
7. **Network Protocols** — HTTP/3 достиг 40% трафика, WebTransport в Firefox
8. **Authentication** — WebAuthn Level 3, Passkeys в production

## Технологические отчёты

### 📄 [HTML — изменения 2023 года](./html.md)

**Объём**: 1,034 строки  
**Ключевые достижения**:

- ✅ Новый элемент **`<search>`** (Baseline октябрь 2023)
- ✅ **`<dialog>`** достиг Baseline Widely Available (май 2023)
- ✅ Атрибут **`inert`** стал Baseline (апрель 2023)
- ✅ **`loading="lazy"`** для iframe (Baseline декабрь 2023)
- ⏳ **Popover API** (Chrome 114, Safari 17, Baseline январь 2025)
- ⏳ **Declarative Shadow DOM** (Chrome, Safari 16.4)
- ✅ **Interop 2023**: Forms, Accessibility Investigation (1300+ тестов)

**Основные разделы**:

- Новые элементы и атрибуты
- Baseline-достижения
- Формы и валидация
- Мобильная оптимизация (`enterkeyhint`, `inputmode`)
- Web Application Manifest
- Accessibility improvements

### 🎨 [CSS — изменения 2023 года](./css.md)

**Объём**: 3,222 строки (самый большой отчёт)  
**Ключевые достижения**:

- ✅ **Container Queries** — Baseline Newly Available (февраль 2023)
- ✅ **Subgrid** — Baseline Newly Available (сентябрь 2023)
- ✅ **`:has()` selector** — Baseline Newly Available (декабрь 2023)
- ✅ **CSS Nesting** — кросс-браузерная поддержка (relaxed syntax в Chrome 120)
- ✅ **CSS Color Level 4** — `oklch`, `color-mix()`, relative color syntax
- ⏳ **Scroll-driven Animations** (Chrome 115)
- ⏳ **View Transitions API** (Chrome 111)
- ✅ **`@scope`, `@layer`, `@property`** — новые at-rules
- ✅ Тригонометрические функции (`sin()`, `cos()`, `tan()`)
- ✅ **Типографика**: `text-wrap: balance`, `lh`/`rlh` units, `initial-letter`

**Основные разделы** (14 категорий):

- Селекторы (`:has()`, `:nth-child()`, медиа-псевдоклассы)
- Container Queries
- CSS Nesting
- At-правила
- Цвета (Color Level 4)
- Типографика
- Layout (Subgrid, улучшения Grid/Flexbox)
- Математические функции
- Анимации
- View Transitions API
- Media Queries
- Изображения и эффекты

**Почему CSS 2023 революционен**:

- 100+ новых возможностей
- Interop 2023 с фокусом на CSS
- Container Queries решают 10-летнюю проблему
- `:has()` — "родительский селектор" наконец доступен
- Subgrid завершает CSS Grid
- CSS Nesting нативно в браузерах

### 💻 [JavaScript — изменения 2023 года](./javascript.md)

**Объём**: 2,163 строки  
**Ключевые достижения**:

**ECMAScript 2023 (ES2023)**:

- ✅ **Change Array by Copy** — `toReversed()`, `toSorted()`, `toSpliced()`, `with()`
- ✅ **Array find from last** — `findLast()`, `findLastIndex()`
- ✅ **Symbols as WeakMap Keys**
- ✅ **Hashbang Grammar**

**Web APIs**:

- ⏳ **Popover API** (Chrome 114, Safari 17)
- ⏳ **View Transitions API** (Chrome 111)
- ⏳ **Navigation API** (Chrome 102)
- ✅ **Compression Streams API** — Baseline (май 2023)
- ✅ **WebCodecs API** (Safari 16.4)
- ✅ **Offscreen Canvas** (Safari 16.4-17.0)
- ✅ **File System Access + OPFS** (Chrome 109 Android)
- ✅ **Screen Wake Lock API** (Safari 16.4)
- ✅ **Gamepad haptic feedback** (Safari 17)

**Deprecations**:

- ❌ **`document.domain`** setter (Chrome 115)
- ❌ **Web SQL Database** (Chrome 119)

**Основные разделы**:

- ECMAScript 2023
- DOM APIs
- Web APIs по категориям
- Storage & Performance
- Медиа и графика
- Устройства и периферия
- Безопасность и приватность

### 🔒 [HTTP, Protocols & Security — изменения 2023 года](./http-security.md)

**Объём**: 2,716 строк (объединённый отчёт)  
**Ключевые достижения**:

**HTTP & Protocols**:

- ✅ **HTTP/3** — 40% трафика к концу 2023
- ✅ **Fetch Metadata Headers** — Baseline (март 2023, Safari 16.4)
- ✅ **Import Maps** — Baseline (март 2023)
- ✅ **Modulepreload** — Baseline (сентябрь 2023)
- ✅ **WebTransport** — Firefox 114 (июнь 2023)
- ⏳ **Static Routing API** для Service Workers (Chrome 116 origin trial)
- ✅ **Priority Hints** / `fetchpriority` (Chrome 102+)

**Security & Privacy**:

- ✅ **Privacy Sandbox GA** (Chrome 115, июль 2023) — MAJOR
    - Topics API
    - Protected Audience API (FLEDGE)
    - Attribution Reporting API
    - Shared Storage API
    - Fenced Frames
- ✅ **CHIPS** — Partitioned Cookies (Chrome 114-115, май 2023)
- ✅ **WebAuthn Level 3 & Passkeys** — Conditional UI (октябрь 2023)
- ✅ **Private Network Access** enforcement (Chrome 117)
- ✅ **COEP credentialless** (Firefox 119, Chrome 96+)
- ✅ **Safari 17**: Enhanced Private Browsing, Link Tracking Protection
- ✅ **Firefox**: Total Cookie Protection (Firefox 111)

**Breaking Changes**:

- ❌ **`document.domain`** immutable (Chrome 115)
- ❌ **Web SQL** removal (Chrome 119)

**Основные разделы**:

- HTTP/3 и протоколы
- Security headers (CSP, Permissions Policy, CORS)
- Privacy Sandbox
- Cookies и privacy
- WebAuthn и authentication
- Deprecations

## Статистика Baseline 2023

### Достигли Baseline Newly Available в 2023

| Технология                    | Дата              | Widely Available |
| ----------------------------- | ----------------- | ---------------- |
| **Container Queries**         | Февраль 2023      | Август 2025      |
| **Fetch Metadata Headers**    | Март 2023         | —                |
| **Import Maps**               | Март 2023         | —                |
| **`inert` атрибут**           | Апрель 2023       | —                |
| **Compression Streams API**   | Май 2023          | Ноябрь 2025      |
| **`<dialog>` element**        | Май 2023 (Widely) | ✅               |
| **CSS Nesting**               | Август 2023       | Февраль 2026     |
| **Subgrid**                   | Сентябрь 2023     | Март 2026        |
| **Modulepreload**             | Сентябрь 2023     | —                |
| **`<search>` element**        | Октябрь 2023      | ✅               |
| **`:has()` selector**         | Декабрь 2023      | Июнь 2026        |
| **`loading="lazy"` (iframe)** | Декабрь 2023      | ✅               |

### Близки к Baseline (2024-2025)

- **Popover API** → Baseline январь 2025
- **Declarative Shadow DOM** → ожидание Firefox
- **View Transitions API** → ожидание Safari/Firefox
- **WebAuthn Conditional UI** → приближается

## Ключевые метрики года

### Браузерные релизы 2023

```
Chrome/Edge:  12 версий (109 → 120)
Firefox:      12 версий (109 → 120)
Safari:       2 версии (16.3 → 17.0)
```

### Объём изменений

```
HTML:       ~10 значимых изменений
CSS:        100+ новых возможностей
JavaScript: 4 ES2023 features + 20+ Web APIs
HTTP:       ~15 protocol/header updates
Security:   10+ major initiatives
```

### Interop 2023

- **15 focus areas** (большинство — CSS)
- **1300+ новых accessibility тестов**
- **Достижения**: Container Queries, Subgrid, `:has()`, CSS Color, Nesting

## Рекомендации по изучению

### 🚀 Начать немедленно (Production-ready)

1. **CSS**: Container Queries, `:has()`, Subgrid
2. **HTML**: `<dialog>`, `inert`, `loading="lazy"`
3. **JavaScript**: ES2023 Array methods (toSorted, toReversed, etc.)
4. **HTTP**: Import Maps, Modulepreload

### ⚠️ С осторожностью (Feature detection)

1. **Popover API** — fallback для старых браузеров
2. **CSS Nesting** — polyfill или PostCSS
3. **View Transitions API** — progressive enhancement
4. **Privacy Sandbox APIs** — Chrome-only (2023)

### 📚 Следить за развитием

1. **Declarative Shadow DOM** — ожидание Firefox
2. **Scroll-driven Animations** — Chrome-only
3. **WebAuthn Level 3** — приближается к Baseline
4. **Private Network Access** — готовиться к enforcement

## Навигация по исследованию

### Технические отчёты 2023

1. **[HTML 2023](./html.md)** — 1,034 строки, 12 разделов
2. **[CSS 2023](./css.md)** — 3,222 строки, 14 категорий
3. **[JavaScript 2023](./javascript.md)** — 2,163 строки, 13 разделов
4. **[HTTP & Security 2023](./http-security.md)** — 2,716 строк, 2 части

### Вспомогательные материалы

- **[Scope](../../scope.md)** — границы и методология исследования
- **[Baseline Initiative](../../baseline-initiative.md)** — что такое Baseline
- **[Источники данных](../../data-sources.md)** — все использованные источники

### Связанные исследования

- **Предыдущий период**:
  [Веб-технологии 2018-2022](../../../frontend-baseline-2018-2022/knowledge/index.md)
- **Следующий период**: Веб-технологии 2024 _(в разработке)_

## Ключевые выводы 2023 года

### 🎨 CSS стал зрелым

2023 год решил десятилетние проблемы CSS:

- Container Queries → responsive components
- `:has()` → parent selector
- Subgrid → полный контроль Grid
- Nesting → DX как в Sass
- Color Level 4 → современные цветовые пространства

### 🔐 Privacy-first Web

Индустрия перешла от third-party cookies к privacy-preserving APIs:

- Privacy Sandbox GA
- CHIPS (партиционированные cookies)
- Enhanced tracking protection

### 🌐 Web Platform Baseline

Запуск инициативы для прозрачности совместимости:

- Newly Available (все браузеры)
- Widely Available (30+ месяцев)
- Интеграция в MDN, Can I Use, DevTools

### 📊 Interop 2023

Беспрецедентное сотрудничество браузеров:

- 15 focus areas (большинство — CSS)
- Быстрое достижение совместимости
- Container Queries, Subgrid, `:has()` стали Baseline

### 🚀 Производительность

Улучшения loading и networking:

- HTTP/3 → 40% трафика
- Import Maps, Modulepreload → Baseline
- Priority Hints → управление приоритетами

## Метаданные исследования

**Research ID**: `frontend-baseline-2023-2025`  
**Методология**: DeepResearch Agent  
**Дата создания**: 18 ноября 2025  
**Версия**: 1.0

**Объём исследования**:

- Сырые данные: ~7,000 строк
- Финальные отчёты: 9,135 строк
- Источники: 150+ официальных URL
- Браузерные версии: Chrome 109-120, Firefox 109-120, Safari 16.3-17.0

**Качество**:

- ✅ Академический стиль на русском языке
- ✅ Технические термины в backticks
- ✅ Правильная типографика
- ✅ Obsidian-совместимый Markdown
- ✅ Code examples с syntax highlighting
- ✅ Browser support tables
- ✅ Baseline statuses
- ✅ Только реальные источники (no fake URLs)
