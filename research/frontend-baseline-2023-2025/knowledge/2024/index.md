---
title: Frontend Development — 2024 год
description:
    Обзор всех изменений frontend-разработки за 2024 год с навигацией по технологическим отчётам
outline: deep
lastUpdated: true
---

# Frontend Development — 2024 год

- **Период**: 1 января — 31 декабря 2024
- **Research ID**: `frontend-baseline-2023-2025`
- **Дата создания**: 18 ноября 2025

## Обзор года

2024 год стал годом **консолидации и зрелости** веб-платформы. После революционных нововведений 2023
года, индустрия сосредоточилась на стабилизации, межбраузерной совместимости и достижении
Baseline-статуса для ключевых технологий. Ключевые достижения:

### 🎯 Основные темы года

1. **Interop 2024** — беспрецедентный успех: 46% → 95% совместимости (17 focus areas)
2. **Baseline Maturity** — 20+ возможностей достигли Baseline в 2024 году
3. **Third-party Cookies Reversal** — Google отменил deprecation (22 июля 2024) — главное событие
   года
4. **Post-Quantum Era** — внедрение ML-KEM в Chrome (124, 131)
5. **WebGPU Launch** — революционный API для GPU-вычислений
6. **CSS Maturity** — `@property`, `@starting-style`, Anchor Positioning
7. **Passkeys Mainstream** — 1+ миллиард аутентификаций на Google accounts
8. **Set Methods** — математические операции над множествами достигли Baseline

## Технологические отчёты

### 📄 [HTML — изменения 2024 года](./html.md)

**Объём**: 2,799 строк

**Ключевые достижения**:

- ✅ **Popover API** — достиг Baseline (январь 2025, разработка в 2024)
- ✅ **Declarative Shadow DOM** — Baseline август 2024 (Firefox 123)
- ✅ **Interop 2024** — 97% совместимости (высочайший показатель в истории)
- ✅ Улучшения **`<dialog>`** — возможности анимации (Chrome, Safari)
- ✅ Атрибут **`name`** для `<details>` — эксклюзивные аккордеоны
- ✅ **Forms enhancements** — native switch, `field-sizing`, `writingsuggestions`
- ✅ **Customizable `<select>`** — путь к кастомизации (Open UI)
- ⏳ **Invoker Commands** — `command`/`commandfor` атрибуты (Chrome origin trial)
- ✅ **ARIA 1.3** — новые роли и атрибуты, улучшения accessibility

**Основные разделы**:

- Popover API (Baseline январь 2025)
- Declarative Shadow DOM (Baseline август 2024)
- Dialog и Details улучшения
- Формы и валидация
- Customizable Select
- Accessibility (ARIA 1.3)
- Mobile viewport improvements
- Interop 2024 результаты

### 🎨 [CSS — изменения 2024 года](./css.md)

**Объём**: 3,328 строк (самый большой отчёт) **Ключевые достижения**:

- ✅ **Interop 2024** — рост с 46% до 95% совместимости (17 focus areas)
- ✅ **CSS Nesting** — Baseline Newly Available (май 2024)
- ✅ **`@property`** — Baseline Newly Available (сентябрь 2024)
- ✅ **Математические функции** — `round()`, `mod()`, `rem()` (Baseline февраль 2024)
- ✅ **Scrollbar styling** — `scrollbar-width`, `scrollbar-color` (Baseline декабрь 2024)
- ⏳ **Anchor Positioning** — Chrome 125+ (май 2024), Safari/Firefox в разработке
- ✅ **`@starting-style`** — анимация дискретных свойств (Chrome 117+, Firefox 129+, Safari 17.5+)
- ✅ **`light-dark()`** — адаптивная цветовая функция (Chrome 123+, Safari 17.5+)
- ✅ **Relative color syntax** — все браузеры в 2024
- ✅ **`field-sizing: content`** — автоматический размер форм (Chrome 123+)
- ✅ **Text-wrap improvements** — `balance`, `pretty`, `stable` (wide support)
- ⏳ **View Transitions API** — cross-document transitions (Chrome 126+)
- ⏳ **Scroll-driven Animations** — Chrome 115+, частично Firefox
- ✅ **`content-visibility`** — Baseline Newly Available (май 2024)

**Основные разделы** (25 категорий):

- Селекторы (`:has()`, `:user-valid`, `:has-slotted`)
- CSS Nesting (Baseline май 2024)
- At-правила (`@layer`, `@scope`, `@property`)
- Container Queries (size, style)
- Anchor Positioning
- Анимации (`@starting-style`, scroll-driven, view transitions)
- Цвета (OKLCH, relative syntax, `light-dark()`)
- Типографика (`text-wrap`, `font-size-adjust`, Ruby)
- Layout (Subgrid зрелость, Masonry дебаты)
- Custom Properties (`@property` Baseline)
- Формы (`field-sizing`, Popover, Details)
- Скроллинг (scrollbar styling Baseline)
- Математические функции (Baseline февраль 2024)

**Почему CSS 2024 важен**:

- Interop 2024 достиг 95% — исторический максимум
- 15+ возможностей достигли Baseline
- Anchor Positioning открывает новые паттерны UI
- `@property` позволяет анимировать custom properties
- Native Nesting улучшает developer experience

### 💻 [JavaScript — изменения 2024 года](./javascript.md)

**Объём**: 2,544 строки

**Ключевые достижения**:

**ECMAScript 2024 (ES2024)**:

- ✅ **`Promise.withResolvers()`** — Baseline март 2024
- ✅ **`Object.groupBy()` / `Map.groupBy()`** — группировка элементов
- ✅ **ArrayBuffer Transfer** — передача ownership между contexts
- ✅ **Resizable ArrayBuffer / Growable SharedArrayBuffer**
- ✅ **RegExp Modifiers** — динамические флаги (`(?i:case)`)
- ✅ **RegExp `v` Flag** — расширенные Unicode свойства

**Core JavaScript APIs**:

- ✅ **Set Methods** — Baseline 2024: `union()`, `intersection()`, `difference()`,
  `symmetricDifference()`, `isSubsetOf()`, `isSupersetOf()`, `isDisjointFrom()`
- ✅ **Iterator Helpers** — ленивые операции: `map()`, `filter()`, `take()`, `drop()`, `flatMap()`,
  `reduce()`, `toArray()`
- ✅ **Float16Array** — 16-битные числа с плавающей точкой (Chrome 129+)
- ✅ **AbortSignal.any()** — композиция abort signals

**Web APIs**:

- ⏳ **WebGPU API** — Chrome 113+, Firefox origin trial — революционный API!
- ✅ **Popover API** — нативные всплывающие элементы (Baseline январь 2025)
- ⏳ **View Transitions API** — плавные переходы SPA/MPA (Chrome 111+, 126+ cross-document)
- ⏳ **Navigation API** — Chrome 102+, замена History API
- ✅ **Clipboard API** — улучшения копирования/вставки
- ✅ **WebCodecs API** — кодирование/декодирование медиа (Chrome, Safari 16.4+)
- ✅ **Storage Buckets API** — организация storage (Chrome 122+)
- ✅ **Screen Wake Lock API** — Baseline июль 2024

**Performance APIs**:

- ✅ **Long Animation Frames API** — отладка производительности (Chrome 123+)
- ✅ **LargestContentfulPaint API** — мониторинг LCP

**Deprecations**:

- ❌ Mutation Events (финальное удаление из Firefox 126)
- ⚠️ Unload event (не рекомендован, замена на `pagehide`/`visibilitychange`)

**Основные разделы**:

- ECMAScript 2024
- Set Methods (Baseline 2024)
- Iterator Helpers
- DOM APIs
- WebGPU API
- View Transitions
- Navigation API
- Storage & Performance
- Media & Graphics
- WebAssembly updates
- Internationalization

### 🔒 [HTTP, Protocols & Security — изменения 2024 года](./http-security.md)

**Объём**: 2,766 строк (объединённый отчёт)

**Ключевые достижения**:

**HTTP & Protocols**:

- ✅ **HTTP/3** — 30%+ adoption, 91.55% browser coverage
- ✅ **Priority Header** — Baseline Newly Available (октябрь 2024)
- ✅ **Fetch Priority** (`fetchpriority`) — Baseline Newly Available (октябрь 2024)
- ✅ **Fetch `keepalive`** — Baseline Newly Available (ноябрь 2024)
- ✅ **Request/Response `bytes()`** — Baseline Newly Available (ноябрь 2024)
- ✅ **Service Worker Static Routing API** — Chrome 123+ (март 2024)
- ⏳ **WebSocketStream API** — Chrome 124+ (апрель 2024)
- ✅ **WebTransport** — 63% compatibility score
- ✅ **Speculation Rules API** — Chrome prefetch/prerender improvements
- ✅ **HTTPS auto-upgrade** — Safari 18.2, Chrome, Firefox

**Security & Privacy** (THE major story of 2024):

- 🔴 **Third-party Cookies Reversal** — Google отменил deprecation (22 июля 2024) — главное событие
  года!
- ✅ **Post-Quantum Cryptography**:
    - Chrome 124 (апрель 2024): X25519Kyber768 hybrid key agreement
    - Chrome 131 (ноябрь 2024): финальный ML-KEM стандарт
- ✅ **Privacy Sandbox** — корректировка стратегии после отмены deprecation
- ✅ **CHIPS** — дальнейшее развитие партиционированных cookies
- ✅ **WebAuthn Level 3** — стабилизация спецификации
- ✅ **Passkeys Mainstream** — 1+ миллиард аутентификаций на Google accounts (20% топ-100 сайтов)
- ✅ **FedCM** — рост adoption для federated login
- ✅ **Bounce Tracking Protection** — Firefox 133 (октябрь 2024) присоединился к Safari и Chrome
- ✅ **Chrome Security Fixes** — 38 уязвимостей в Chrome 128, включая активно эксплуатируемую
  CVE-2024-7971
- ✅ **Safari Private Browsing 2.0** — Enhanced Tracking Prevention
- ✅ **Firefox Total Cookie Protection** — rollout продолжается

**Breaking Changes**:

- ❌ **HTTP/2 Server Push** — удалён из Firefox 132 (сентябрь 2024)
- ⚠️ **Padlock icon** — замена на «tune» icon в Chrome (2023-2024)

**Основные разделы**:

- HTTP/3 и adoption metrics
- HTTP headers (Priority, Fetch Priority)
- Fetch API updates
- Service Workers (Static Routing)
- WebTransport & WebSockets
- Resource loading (Speculation Rules)
- Performance APIs
- **Third-party cookies reversal** — детальный анализ
- Post-quantum cryptography
- Privacy Sandbox корректировка
- CHIPS & Storage Access API
- WebAuthn Level 3 & Passkeys
- FedCM
- Bounce tracking protection
- Browser-specific security features

## Статистика Baseline 2024

### Достигли Baseline Newly Available в 2024

| Технология                           | Дата Baseline | Browser Milestone |
| ------------------------------------ | ------------- | ----------------- |
| **Promise.withResolvers()**          | Март 2024     | Safari 17.4       |
| **Math functions** (round, mod, rem) | Февраль 2024  | Safari 17.4       |
| **CSS Nesting**                      | Май 2024      | Firefox 117       |
| **Set Methods**                      | Июнь 2024     | Safari 17         |
| **Screen Wake Lock API**             | Июль 2024     | Firefox 126       |
| **Declarative Shadow DOM**           | Август 2024   | Firefox 123       |
| **`@property`**                      | Сентябрь 2024 | Safari 16.4       |
| **Priority Header**                  | Октябрь 2024  | Safari 17.2       |
| **Fetch Priority**                   | Октябрь 2024  | Safari 17.2       |
| **Request/Response bytes()**         | Ноябрь 2024   | Safari 18.0       |
| **Fetch keepalive**                  | Ноябрь 2024   | Safari 18.0       |
| **Scrollbar styling**                | Декабрь 2024  | Firefox 132       |
| **content-visibility**               | Май 2024      | Firefox 125       |

### Приближаются к Baseline (2025-2026)

- **Popover API** → Baseline январь 2025 (Safari 18.3 iOS fix)
- **Anchor Positioning** → ожидание Safari/Firefox
- **WebGPU API** → ожидание Safari/Firefox
- **View Transitions (cross-document)** → ожидание Safari/Firefox
- **Navigation API** → ожидание Safari/Firefox
- **WebSocketStream** → ожидание Safari/Firefox

## Ключевые метрики года

### Браузерные релизы 2024

```
Chrome/Edge:  12 версий (121 → 132)
Firefox:      13 версий (121 → 133)
Safari:       7 версий (17.2 → 18.2, включая iOS/iPadOS/visionOS)
```

### Объём изменений

```
HTML:       ~20 значимых изменений (Popover, Declarative Shadow DOM, формы)
CSS:        100+ новых возможностей (Interop 2024 фокус)
JavaScript: 6 ES2024 features + 60+ Web APIs
HTTP:       ~10 protocol/header updates (HTTP/3, Fetch Priority, Static Routing)
Security:   15+ major initiatives (cookies reversal, post-quantum, passkeys)
```

### Interop 2024

- **17 focus areas** (CSS-heavy)
- **95% pass rate** — исторический максимум (начало года: 46%)
- **Достижения**: `@property`, CSS Nesting, Scrollbar styling, Popover, Declarative Shadow DOM,
  accessibility

## Рекомендации по изучению

### 🚀 Начать немедленно (Production-ready)

1. **CSS**:
    - CSS Nesting (Baseline май 2024)
    - `@property` для анимации custom properties (Baseline сентябрь 2024)
    - Math functions: `round()`, `mod()`, `rem()` (Baseline февраль 2024)
    - Scrollbar styling (Baseline декабрь 2024)
    - `light-dark()` (wide support)
    - Relative color syntax (все браузеры)

2. **JavaScript**:
    - Set Methods (Baseline июнь 2024)
    - `Promise.withResolvers()` (Baseline март 2024)
    - ES2024 features (`Object.groupBy()`, ArrayBuffer Transfer)
    - Iterator Helpers (Chrome, Safari)

3. **HTML**:
    - Declarative Shadow DOM (Baseline август 2024)
    - `name` attribute для `<details>`
    - Forms improvements (`field-sizing` с fallback)

4. **HTTP**:
    - Fetch Priority (Baseline октябрь 2024)
    - HTTP/3 (95%+ browser support)
    - `keepalive` и `bytes()` (Baseline ноябрь 2024)

### ⚠️ С осторожностью (Feature detection + fallback)

1. **Popover API** — Baseline январь 2025, fallback для старых браузеров
2. **Anchor Positioning** — Chrome-only, polyfill для Safari/Firefox
3. **WebGPU API** — Chrome-only, fallback на WebGL2
4. **View Transitions** — progressive enhancement, Chrome-only
5. **Navigation API** — Chrome-only, fallback на History API
6. **`@starting-style`** — graceful degradation для старых браузеров

### 📚 Следить за развитием

1. **Customizable `<select>`** — Open UI прототипирование
2. **Invoker Commands** — Chrome origin trial
3. **CSS Masonry** — дебаты о синтаксе
4. **Post-quantum crypto** — мониторить migration path
5. **Third-party cookies alternative** — Privacy Sandbox evolution, FedCM

## Навигация по исследованию

### Технические отчёты 2024

1. **[HTML 2024](./html.md)** — 2,799 строк, 22 раздела
2. **[CSS 2024](./css.md)** — 3,328 строк, 25 категорий
3. **[JavaScript 2024](./javascript.md)** — 2,544 строки, 14 разделов
4. **[HTTP & Security 2024](./http-security.md)** — 2,766 строк, 2 части (8 + 12 разделов)

**Итого**: 11,437 строк финальной документации

### Вспомогательные материалы

- **[Scope](../../scope.md)** — границы и методология исследования
- **[Baseline Initiative](../../baseline-initiative.md)** — что такое Baseline
- **[Источники данных](../../data-sources.md)** — все использованные источники

### Связанные исследования

- **Предыдущий период**: [Frontend 2023](../2023/index.md)
- **Следующий период**: Frontend 2025 _(в разработке)_

## Ключевые выводы 2024 года

### 🤝 Interoperability — исторический успех

Interop 2024 продемонстрировал беспрецедентное сотрудничество браузеров:

- Рост с 46% до 95% совместимости
- 17 focus areas достигли консенсуса
- CSS Nesting, `@property`, Scrollbar styling, Popover стали Baseline
- Подготовка почвы для Interop 2025

### 🎨 CSS — от революции к консолидации

После революционного 2023 года, CSS в 2024 сосредоточился на стабилизации:

- `@property` достиг Baseline — анимация custom properties
- CSS Nesting достиг Baseline — native developer experience
- Anchor Positioning (Chrome) — новая парадигма layout
- Math functions достигли Baseline — `round()`, `mod()`, `rem()`
- 15+ возможностей достигли Baseline

### 🍪 Third-party Cookies — великий разворот

22 июля 2024 года стал переломным для веб-индустрии:

- Google отменил планы deprecation third-party cookies
- Радикальное изменение стратегии Privacy Sandbox
- Shift к user choice вместо принудительного удаления
- Индустрия переосмысливает подходы к privacy

### 🔐 Post-Quantum Era — подготовка к будущему

2024 год начал миграцию на постквантовую криптографию:

- Chrome 124: X25519Kyber768 hybrid key agreement
- Chrome 131: финальный ML-KEM стандарт (FIPS 203)
- Защита от «harvest now, decrypt later» атак
- Прозрачная миграция для пользователей

### 🎮 WebGPU — новая эра GPU-вычислений

WebGPU API стал доступен в Chrome (113+):

- Замена устаревшему WebGL
- Современный API для GPU-вычислений
- Machine learning в браузере
- Высокопроизводительная графика

### 🔑 Passkeys — массовое внедрение

Passkeys перешли из «emerging» в «mainstream»:

- 1+ миллиард аутентификаций на Google accounts
- 20% топ-100 сайтов поддерживают passkeys
- WebAuthn Level 3 стабилизация
- Microsoft добавила third-party plugin support

### 📊 Baseline Initiative — зрелость

Инициатива Web Platform Baseline продолжает рост:

- 20+ возможностей достигли Baseline в 2024
- Интеграция в DevTools всех браузеров
- Ясность для разработчиков о «safe to use»
- Сокращение времени от внедрения до Baseline

### 🌐 HTTP/3 — production standard

HTTP/3 из «emerging» стал «production standard»:

- 30%+ adoption среди сайтов
- 91.55% browser coverage
- Safari удалил флаг «experimental»
- Стабильная production-поддержка

## Метаданные исследования

- **Research ID**: `frontend-baseline-2023-2025`
- **Методология**: DeepResearch Agent
- **Дата создания**: 18 ноября 2025
- **Версия**: 1.0

**Объём исследования**:

- Сырые данные: ~10,000 строк (5 файлов)
- Финальные отчёты: 11,437 строк (4 файла)
- Источники: 200+ официальных URL
- Браузерные версии: Chrome 121-132, Firefox 121-133, Safari 17.2-18.2

**Качество**:

- ✅ Академический стиль на русском языке
- ✅ Технические термины в backticks
- ✅ Правильная типографика
- ✅ Obsidian-совместимый Markdown
- ✅ Code examples с syntax highlighting
- ✅ Browser support tables
- ✅ Baseline statuses
- ✅ Только реальные источники (no fake URLs)

---

**Предыдущий этап**: [Исследование 2023 года](../2023/index.md) **Следующий этап**:
[Исследование 2025 года](../2025/index.md)
