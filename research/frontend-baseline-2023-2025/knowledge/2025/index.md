---
title: Frontend Development — 2025 год
description:
    Обзор всех изменений frontend-разработки за период январь-ноябрь 2025 года с навигацией по
    технологическим отчётам
outline: deep
lastUpdated: true
---

# Frontend Development — 2025 год

**Период**: 1 января — 18 ноября 2025 (11 месяцев) **Research ID**: `frontend-baseline-2023-2025`
**Дата создания**: 19 ноября 2025

::: warning Внимание Данный обзор охватывает **частичный год** (январь — ноябрь 2025) и представляет
состояние веб-платформы на момент исследования. :::

## Обзор года

2025 год стал периодом **зрелости и консолидации** CSS-функций, введённых в 2023–2024 годах, и
**прорывным для безопасности** с массовым внедрением постквантовой криптографии и passkeys.

### Ключевые темы 2025 года

1. **CSS Anchor Positioning** — универсальная поддержка после Safari 26.0 (сентябрь 2025)
2. **Постквантовая криптография** — `ML-KEM` в 38% HTTPS-трафика
3. **Passkeys** — 3+ миллиарда активных, 48% топ-100 сайтов внедрили поддержку
4. **Container Queries** — достижение статуса Baseline High (август 2025)
5. **`@property`** — зрелость после Baseline (93.02% покрытие)
6. **Popover API** — статус Baseline (январь 2025)
7. **ECMAScript 2025** — `RegExp.escape()`, `Float16Array`, `Promise.try()`
8. **HTTP/3** — критическая масса внедрения (30-60% трафика)

## Технологические отчёты

### 📄 [HTML — изменения 2025 года](./html.md)

**Объём**: 1,555 строк **Версии браузеров**: Chrome 133–141+, Firefox 134–142+, Safari 18.2–18.6

**Ключевые достижения**:

- ✅ **Popover API** — Baseline Newly Available (январь 2025)
- ✅ Новое значение **`popover="hint"`** (Chrome 133)
- ✅ **Кастомизируемый `<select>`** (Chrome 134, март 2025)
- ✅ Атрибут **`closedby`** для `<dialog>` (Chrome 134)
- ⏳ **Invoker Commands API** — `command` и `commandfor` атрибуты
- ✅ **Declarative Shadow DOM** — зрелость после Baseline (август 2024)
- ⏳ **Улучшения `<details>`** — `::details-content` (Safari 18.4), `:open` (Firefox 136)
- ✅ **Улучшения форм** — `autocorrect` (Firefox 134), `input type="week"` (iOS 18.2),
  `webkitdirectory` (iOS 18.4)

**Основные разделы** (16 категорий):

- Popover API достигает Baseline
- Кастомизируемые элементы форм
- Улучшения диалогов
- Invoker Commands API
- Declarative Shadow DOM
- Улучшения `<details>`
- `hidden="until-found"` и `beforematch`
- Формы и валидация
- ARIA и доступность
- Interop 2025 HTML-области
- Прочие обновления
- Deprecations и removals
- Baseline Newly Available сводка
- Сводная таблица поддержки
- Ключевые выводы

### 🎨 [CSS — изменения 2025 года](./css.md)

**Объём**: 2,092 строки **Версии браузеров**: Chrome/Edge 133–142+, Firefox 134–144+, Safari
18.2–26.2+

**Ключевые достижения**:

- ✅ **Anchor Positioning** — универсальная поддержка (Safari 26.0, сентябрь 2025)
- ✅ **Container Queries** — Baseline High (август 2025)
- ✅ **`@property`** — зрелость (93.02% покрытие)
- ✅ **View Transitions API** — универсальная поддержка same-document transitions
- ⏳ **`text-box`** — точный контроль вертикального выравнивания (Chrome 133)
- ✅ **`text-wrap: balance`** — широкая поддержка (87.92%)
- ⏳ **`text-wrap: pretty`** — Safari 26.0 эксклюзив
- ✅ **Relative Color Syntax** — полная поддержка (88.2%)
- ⏳ **`contrast-color()`** — Safari 26.0 эксклюзив
- ⏳ **Scroll-driven Animations** — Safari 26.0 (78.52% покрытие)
- ⏳ **Customizable `<select>`** — Chrome 134
- ✅ **`scrollbar-width`** — Baseline Newly Available
- ⏳ **Enhanced `attr()`** — типизированные атрибуты (Chrome 133)

**Основные разделы** (14 категорий):

- Селекторы и псевдо-классы
- Anchor Positioning
- Типографика и текст
- Layout и Grid
- Цвета и графика
- Анимации и переходы
- Формы и интерактивность
- `@property` at-rule
- Enhanced `attr()`
- Scrollbar styling
- Pseudo-elements для Carousel
- `shape()` функция
- Relative Units в SVG
- Дополнительные улучшения

**Почему CSS 2025 важен**:

- Anchor Positioning наконец получил универсальную поддержку
- Container Queries достигли Baseline High
- `@property` стал стандартом для анимации custom properties
- Типографические инновации (`text-box`, `text-wrap`)
- Продвинутые цветовые возможности (relative color syntax, `contrast-color()`)

### 💻 [JavaScript — изменения 2025 года](./javascript.md)

**Объём**: 1,384 строки **Версии браузеров**: Chrome 130–136, Firefox 131–134, Safari 18.0–18.2

**Ключевые достижения**:

**ECMAScript 2025**:

- ✅ **`RegExp.escape()`** — Stage 4 (Chrome 136, Firefox 134, Safari 18.2)
- ✅ **`Float16Array`** — Stage 4 (Chrome 134, Safari 18.2)
- ✅ **`Promise.try()`** — Stage 4 (Chrome 128, Firefox 134, Safari 18.2)

**Iterator Helpers** — Production Ready:

- ✅ Chrome 122+ (февраль 2024), Firefox 131+ (сентябрь 2025), Safari 18.0+
- `.map()`, `.filter()`, `.take()`, `.drop()`, `.flatMap()`, `.reduce()`, `.toArray()`, `.forEach()`

**Uint8Array Base64/Hex методы**:

- ✅ Chrome 133+, Firefox 133+, Safari 18.2+
- `fromBase64()`, `fromHex()`, `toBase64()`, `toHex()`

**Set Methods** — Widely Available:

- ✅ Chrome 122+, Firefox 127+, Safari 17.0+
- `union()`, `intersection()`, `difference()`, `symmetricDifference()`
- `isSubsetOf()`, `isSupersetOf()`, `isDisjointFrom()`

**Temporal API** — Progress Report:

- ⏳ Firefox 139 — первый браузер с полной поддержкой
- ⏳ Chrome/Safari — в разработке

**WebGPU** — Production Ready:

- ✅ Chrome 113+ (активные улучшения в 2025)
- Chrome 130: Dual Source Blending
- Chrome 131: Clip Distances, `getConfiguration()`
- Chrome 132: 32-bit Float Texture Blending

**Основные разделы** (16 категорий):

- ECMAScript 2025 proposals
- Iterator Helpers
- Uint8Array методы
- Set Methods
- Temporal API
- WebGPU API
- Navigation API
- View Transitions API
- V8 Performance
- Chrome 133-134 updates
- Firefox 131-134 updates
- Safari 18.0-18.2 updates
- Baseline Status 2025
- Сводная таблица поддержки
- Ключевые выводы

### 🔒 [HTTP и безопасность — изменения 2025 года](./http-security.md)

**Объём**: 1,479 строк **Версии браузеров**: Chrome/Edge 133–142+, Firefox 134–136+, Safari
18.2–18.4+

**Ключевые достижения**:

**HTTP-протоколы**:

- ✅ **HTTP/3** — критическая масса внедрения (30-60% трафика)
- ⏳ **HTTP QUERY Method** — Internet-Draft `draft-ietf-httpbis-safe-method-w-body-11`
- ⏳ **No-Vary-Search Header** — улучшение кэширования
- ✅ **Fetch API** — универсальный стандарт (Node.js 21+)
- ⏳ **WebTransport** — стабильная поддержка (Chrome 97+, Firefox 115+)

**Постквантовая криптография**:

- ✅ **ML-KEM** — переход от Kyber (Chrome 131+, Firefox, Safari 18+)
- ✅ **38% HTTPS-трафика** использует гибридные постквантовые рукопожатия
- ✅ **Passkeys с PQC** — IANA COSE registry обновлён (апрель 2025)
- ✅ **WebRTC PQC** — Chrome 142

**Passkeys и WebAuthn**:

- ✅ **3+ миллиарда активных passkeys** в использовании
- ✅ **48% топ-100 сайтов** внедрили поддержку
- ✅ **WebAuthn Level 3** — First Public Working Draft (W3C)
- ✅ **Client Capabilities API** (Chrome 136+, Firefox 135+, Safari 18+)
- ✅ **PRF Extension** (Safari 18+)
- ✅ **Related Origins** (Safari 18+)

**Cookies после reversal**:

- ✅ Google отказался от унилатерального удаления third-party cookies
- ✅ **CHIPS** — Chrome 114+, Safari 18.4+
- ✅ **Bounce Tracking Protection** (Firefox 135+, Safari 18+)

**Privacy Sandbox**:

- ✅ **FedCM** — зрелая реализация (Chrome 141+)
- ✅ **Topics API** — активное развитие

**Content Security Policy**:

- ✅ **Trusted Types** — Chrome/Edge 83+
- ✅ **CSP Level 3** — Firefox 135 строгий CSP

**Certificate Management**:

- ✅ **Certificate Transparency** — Firefox 136 обязательное применение
- ✅ **CRLite** — Firefox 135

**Основные разделы** (11 категорий):

- HTTP-протоколы (HTTP/3, QUIC, новые Internet-Drafts)
- Постквантовая криптография
- Passkeys и WebAuthn
- Cookies после reversal
- Privacy Sandbox
- Content Security Policy
- Certificate management
- Baseline-достижения 2025
- Сводная таблица поддержки
- Ключевые выводы
- Рекомендации по внедрению

## Статистика Baseline 2025

### Достигли Baseline в 2025

| Технология                       | Дата          | Статус          |
| -------------------------------- | ------------- | --------------- |
| **Popover API**                  | Январь 2025   | Newly Available |
| **Container Queries**            | Август 2025   | Baseline High   |
| **Anchor Positioning**           | Сентябрь 2025 | Newly Available |
| **`scrollbar-width`**            | 2025          | Newly Available |
| **`scrollbar-gutter`**           | Q1 2025       | Newly Available |
| **`ruby-align`**                 | Q1 2025       | Newly Available |
| **Uint8Array Base64/Hex**        | Начало 2025   | Newly Available |
| **Alignment для `position:abs`** | Январь 2025   | Универсальная   |

### Ожидается Baseline в 2025-2027

- **Iterator Helpers** — 2025–2027
- **`RegExp.escape()`** — 2027+
- **`Promise.try()`** — 2027+
- **`Float16Array`** — 2027+
- **View Transitions API** — ожидание Safari/Firefox

## Ключевые метрики года (январь-ноябрь)

### Браузерные релизы 2025

```
Chrome/Edge:  9+ версий (133 → 142+)
Firefox:      9+ версий (134 → 142+)
Safari:       5+ версий (18.2 → 26.2+)
```

### Объём изменений

```
HTML:       15+ значимых изменений (Popover Baseline, кастомизируемый select)
CSS:        45+ новых возможностей (Anchor Positioning, text-box, enhanced attr())
JavaScript: 3 ES2025 features + Iterator Helpers + 20+ API updates
HTTP:       10+ protocol updates (HTTP/3 maturity, QUERY method)
Security:   20+ major initiatives (ML-KEM, Passkeys 3B+, FedCM)
```

### Interop 2025

- **19 focus areas** (17 новых + 2 из 2024)
- **Фокус**: Anchor Positioning, `<details>`, Declarative Shadow DOM, кастомизируемый `<select>`
- **Успех**: WebKit завершил Interop 2024 с 98% (Safari 18.2) и 99% (Safari TP)

## Рекомендации по внедрению

### Немедленно внедрять (Production-ready)

**CSS**:

- ✅ Container Queries — Baseline High (92.49% покрытие)
- ✅ `@property` — 93.02% покрытие
- ✅ Relative Color Syntax — 88.2% покрытие
- ✅ `text-wrap: balance` — 87.92% покрытие
- ✅ CSS Nesting — 90.97% покрытие
- ✅ CSS Subgrid — 88.92% покрытие
- ✅ `:has()` — 92.62% покрытие

**HTML**:

- ✅ Popover API — Baseline Newly Available
- ✅ Declarative Shadow DOM — Baseline
- ✅ `<dialog>` — Baseline Widely Available
- ✅ `inert` — Baseline Newly Available

**JavaScript**:

- ✅ Set Methods — Baseline Widely Available (декабрь 2024)
- ✅ Iterator Helpers — ~85% покрытие (Chrome 122+, Firefox 131+, Safari 18.0+)

**HTTP/Security**:

- ✅ Passkeys — 3B+ активных, 48% топ-100 сайтов
- ✅ HTTP/3 — 30-60% трафика
- ✅ CHIPS — партиционированные cookies (Chrome 114+, Safari 18.4+)

### С осторожностью (Feature detection или polyfill)

**CSS**:

- ⚠️ Anchor Positioning — 76.84% покрытие (требуется fallback для Firefox)
- ⚠️ Scroll-driven Animations — 78.52% (Firefox за флагом)
- ⚠️ Enhanced `attr()` — Chrome/Edge only
- ⚠️ Customizable `<select>` — Chrome/Edge only
- ⚠️ `field-sizing` — 75.86% (отсутствует Firefox/iOS Safari)

**HTML**:

- ⚠️ `popover="hint"` — Chrome 133+ only
- ⚠️ Кастомизируемый `<select>` — Chrome 134+, ожидается в других (Interop 2025)
- ⚠️ Атрибут `closedby` — Chrome 134+, Firefox 141+
- ⚠️ Invoker Commands API — Chrome 135+
- ⚠️ `::details-content` — Safari 18.4+ only
- ⚠️ `:open` — Firefox 136+ only

**JavaScript**:

- ⚠️ `Promise.try()` — ~75% покрытие
- ⚠️ `RegExp.escape()` — ~69% покрытие
- ⚠️ Uint8Array Base64/Hex — с полифиллом
- ⚠️ `Float16Array` — для WebGPU приложений

**HTTP/Security**:

- ⚠️ WebAuthn PRF Extension — Safari 18+, Chrome (iCloud Keychain)
- ⚠️ FedCM — Chrome only
- ⚠️ WebTransport — Chrome/Firefox, отсутствует Safari

### Следить за развитием

**CSS**:

- Masonry Layout — продолжающиеся дебаты в CSSWG
- `contrast-color()` — Safari эксклюзив
- `text-wrap: pretty` — Safari эксклюзив
- `text-box` — Chrome only
- `shape()` — скоро Baseline
- Cross-document View Transitions — Chrome experimental

**JavaScript**:

- Temporal API — Firefox 139 первый, Chrome/Safari в разработке
- View Transitions API — для плавных переходов
- Navigation API — Chrome 102+, Safari/Firefox в разработке

**HTTP/Security**:

- HTTP QUERY Method — Internet-Draft
- No-Vary-Search Header — Internet-Draft
- Topics API — Chrome only
- Related Origins — Safari only

## Ключевые выводы 2025 года

### Зрелость CSS

2025 год закрепил достижения 2023–2024:

- Anchor Positioning получил универсальную поддержку
- Container Queries достигли Baseline High
- `@property` стал стандартом
- Типографические инновации (text-box, text-wrap)
- Продвинутые возможности цвета

### Постквантовая готовность

Массовое внедрение постквантовой криптографии:

- ML-KEM в 38% HTTPS-трафика
- Passkeys с PQC защитой
- WebRTC постквантовая защита

### Passwordless будущее

3+ миллиарда активных passkeys:

- 48% топ-100 сайтов с поддержкой
- WebAuthn Level 3 возможности
- PRF Extension для E2E шифрования

### HTTP/3 зрелость

Критическая масса внедрения:

- 30-60% глобального трафика
- Universal browser support
- Оптимизации QUIC

### Privacy-preserving Web

Cookies после reversal:

- Google отказался от унилатерального удаления
- CHIPS для партиционированных cookies
- Bounce tracking protection
- Privacy Sandbox evolution

### Декларативный UI

HTML получил мощные декларативные возможности:

- Popover API Baseline
- Кастомизируемый `<select>`
- Invoker Commands API
- Улучшения `<dialog>` и `<details>`

## Навигация по исследованию

### Технические отчёты 2025

1. **[HTML 2025](./html.md)** — 1,555 строк, 16 разделов
2. **[CSS 2025](./css.md)** — 2,092 строки, 14 категорий
3. **[JavaScript 2025](./javascript.md)** — 1,384 строки, 16 разделов
4. **[HTTP & Security 2025](./http-security.md)** — 1,479 строк, 11 категорий

### Связанные исследования

- **Предыдущий период**: [Frontend Development 2023](../2023/index.md)

## Метаданные исследования

**Research ID**: `frontend-baseline-2023-2025` **Методология**: DeepResearch Agent **Дата
создания**: 19 ноября 2025 **Версия**: 1.0 **Охваченный период**: 1 января — 18 ноября 2025 (11
месяцев, частичный год)

**Объём исследования**:

- Финальные отчёты: 6,510 строк (HTML: 1,555, CSS: 2,092, JS: 1,384, HTTP/Security: 1,479)
- Источники: 200+ официальных URL
- Браузерные версии:
    - Chrome/Edge: 133–142+
    - Firefox: 134–142+
    - Safari: 18.2–26.2+

**Качество**:

- ✅ Академический стиль на русском языке
- ✅ Технические термины в backticks
- ✅ Правильная типографика (кавычки «», тире —)
- ✅ Obsidian-совместимый Markdown
- ✅ Code examples с syntax highlighting
- ✅ Browser support tables
- ✅ Baseline statuses
- ✅ Только реальные источники

---

**Следующие шаги**: Данное исследование будет обновлено в декабре 2025 года для включения полного
года и финальных статистик.
