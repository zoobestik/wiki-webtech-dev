---
title: Timeline релизов браузеров
description:
    Хронология релизов Chrome, Firefox, Safari и Edge в период 2023-2025 (январь-ноябрь) с baseline
    методологией
outline: deep
lastUpdated: true
---

# Timeline релизов браузеров 2023–2025

## Обзор

В период с 2023 по ноябрь 2025 года продолжилась эволюция релизных циклов основных браузеров с
беспрецедентным фокусом на межбраузерной совместимости:

- **Chrome/Edge** — стабильный 4-недельный цикл (продолжение с 2021)
- **Firefox** — 4-недельный цикл с 12–13 релизами в год
- **Safari** — сохранил привязку релизов к версиям macOS/iOS (2 мажорных релиза в год)
- **Baseline Initiative** — запуск в 2023 году для прозрачности совместимости
- **Interop 2023–2025** — рекордные достижения в синхронизации (95%+ совместимости)

## Google Chrome / Chromium

### Особенности релизного цикла

- **2023–2025:** стабильный 4-недельный релизный цикл
- **Extended Stable Channel:** введён для enterprise (8-недельный цикл)
- **Security updates:** регулярные out-of-band патчи для критических уязвимостей

### 2023 (версии 109–120)

| Версия     | Дата релиза      | Примечания                                                                     |
| ---------- | ---------------- | ------------------------------------------------------------------------------ |
| Chrome 109 | 10 января 2023   | OPFS на Android, улучшения WebGPU                                              |
| Chrome 110 | 7 февраля 2023   | User-Agent Reduction финал                                                     |
| Chrome 111 | 7 марта 2023     | **View Transitions API** (same-document), Color Level 4                        |
| Chrome 112 | 4 апреля 2023    | **CSS Nesting** (базовый синтаксис)                                            |
| Chrome 113 | 2 мая 2023       | **WebGPU API**, WebCodecs улучшения                                            |
| Chrome 114 | 30 мая 2023      | **Popover API**, **CHIPS** (партиционированные cookies)                        |
| Chrome 115 | 18 июля 2023     | **Privacy Sandbox GA**, Scroll-driven Animations, `document.domain` deprecated |
| Chrome 116 | 15 августа 2023  | Motion Path, Static Routing API origin trial                                   |
| Chrome 117 | 12 сентября 2023 | **`@starting-style`**, CSS Grid улучшения, Private Network Access enforcement  |
| Chrome 118 | 10 октября 2023  | **`@scope`**, CSS Media Queries 4                                              |
| Chrome 119 | 31 октября 2023  | **Web SQL removal**, CSS `relative-color` syntax, `:user-invalid`              |
| Chrome 120 | 5 декабря 2023   | **CSS Nesting relaxed syntax**, `light-dark()` color function                  |

### 2024 (версии 121–132)

| Версия     | Дата релиза      | Примечания                                                                 |
| ---------- | ---------------- | -------------------------------------------------------------------------- |
| Chrome 121 | 23 января 2024   | CSS `:has()` оптимизации, Iterator Helpers origin trial                    |
| Chrome 122 | 20 февраля 2024  | **Set Methods**, **Iterator Helpers** стабильно                            |
| Chrome 123 | 19 марта 2024    | **Service Worker Static Routing**, `field-sizing: content`, `light-dark()` |
| Chrome 124 | 16 апреля 2024   | **X25519Kyber768** (post-quantum crypto), **WebSocketStream**              |
| Chrome 125 | 14 мая 2024      | **Anchor Positioning**, **CSS `@starting-style`** улучшения                |
| Chrome 126 | 11 июня 2024     | **View Transitions** (cross-document experimental), WebGPU улучшения       |
| Chrome 127 | 24 июля 2024     | Passkeys улучшения, FedCM updates                                          |
| Chrome 128 | 20 августа 2024  | 38 security fixes (включая CVE-2024-7971), CSS Masonry дебаты              |
| Chrome 129 | 17 сентября 2024 | **Float16Array**, WebGPU улучшения                                         |
| Chrome 130 | 15 октября 2024  | WebGPU Dual Source Blending                                                |
| Chrome 131 | 12 ноября 2024   | **ML-KEM** (финальный post-quantum стандарт)                               |
| Chrome 132 | 10 декабря 2024  | WebGPU 32-bit Float Texture Blending                                       |

### 2025 (версии 133–141+, январь–ноябрь)

| Версия     | Дата релиза      | Примечания                                                                               |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------- |
| Chrome 133 | 21 января 2025   | **`text-box`** properties, **`:open` pseudo-class**, enhanced `attr()`, `popover="hint"` |
| Chrome 134 | 18 февраля 2025  | **Customizable `<select>`**, **`closedby`** атрибут, **`Float16Array`**                  |
| Chrome 135 | 18 марта 2025    | **Invoker Commands API**, WebGPU продолжение                                             |
| Chrome 136 | 15 апреля 2025   | **`RegExp.escape()`**, WebAuthn Client Capabilities API                                  |
| Chrome 137 | 13 мая 2025      | CSS улучшения, performance updates                                                       |
| Chrome 138 | 10 июня 2025     | Security patches, Web Platform продолжение                                               |
| Chrome 139 | 8 июля 2025      | Interop 2025 progress                                                                    |
| Chrome 140 | 5 августа 2025   | CSS и JS стабилизация                                                                    |
| Chrome 141 | 2 сентября 2025  | **FedCM** улучшения, Privacy Sandbox evolution                                           |
| Chrome 142 | 30 сентября 2025 | **WebRTC PQC** (post-quantum crypto)                                                     |
| Chrome 143 | 28 октября 2025  | Финальные Interop 2025 улучшения                                                         |
| Chrome 144 | ~ноябрь 2025     | Прогноз: продолжение Web Platform                                                        |

**Примечание**: Chrome 133+ даты основаны на фактических релизах январь–сентябрь 2025 и прогнозах
для октября–ноября.

## Mozilla Firefox

### Особенности релизного цикла

- **2023–2025:** стабильный 4-недельный цикл
- **Extended Support Release (ESR):** поддержка для enterprise (102 ESR, 115 ESR в 2023)
- **Rapid Release:** 12–13 мажорных версий в год

### 2023 (версии 109–120)

| Версия      | Дата релиза      | Примечания                                                         |
| ----------- | ---------------- | ------------------------------------------------------------------ |
| Firefox 109 | 17 января 2023   | Import Maps, Manifest V3 поддержка                                 |
| Firefox 110 | 14 февраля 2023  | Container Queries, User-Agent Reduction                            |
| Firefox 111 | 14 марта 2023    | **Total Cookie Protection** (Strict Mode)                          |
| Firefox 112 | 11 апреля 2023   | **`inert` атрибут**, Color Level 4                                 |
| Firefox 113 | 9 мая 2023       | **CSS Color Level 4** (`color-mix()`, `oklch()`), `:nth-child(of)` |
| Firefox 114 | 6 июня 2023      | **WebTransport**, улучшения CSS Nesting                            |
| Firefox 115 | 4 июля 2023      | ESR база, Change Array by Copy, `Array.fromAsync`                  |
| Firefox 116 | 1 августа 2023   | Motion Path, CSS улучшения                                         |
| Firefox 117 | 26 сентября 2023 | **CSS Nesting**, **Subgrid** улучшения                             |
| Firefox 118 | 26 сентября 2023 | `<search>` элемент, Media Queries 4                                |
| Firefox 119 | 24 октября 2023  | COEP credentialless                                                |
| Firefox 120 | 21 ноября 2023   | `light-dark()`, CSS улучшения                                      |

### 2024 (версии 121–133)

| Версия      | Дата релиза     | Примечания                                                  |
| ----------- | --------------- | ----------------------------------------------------------- |
| Firefox 121 | 19 декабря 2023 | **Lazy loading для `<iframe>`** (`loading="lazy"`)          |
| Firefox 122 | 23 января 2024  | Declarative Shadow DOM progress, `<hr>` в `<select>`        |
| Firefox 123 | 20 февраля 2024 | **Declarative Shadow DOM** полная поддержка                 |
| Firefox 124 | 19 марта 2024   | Security updates                                            |
| Firefox 125 | 16 апреля 2024  | **Popover API** полная реализация, `content-visibility`     |
| Firefox 126 | 14 мая 2024     | **Screen Wake Lock API**, Mutation Events removal           |
| Firefox 127 | 11 июня 2024    | **Set Methods**, CSS улучшения                              |
| Firefox 128 | 9 июля 2024     | Web Platform updates                                        |
| Firefox 129 | 6 августа 2024  | **`@starting-style`**, CSS transitions улучшения            |
| Firefox 130 | 3 сентября 2024 | **Атрибут `name` для `<details>`**, Shadow DOM improvements |
| Firefox 131 | 1 октября 2024  | **Iterator Helpers**, performance updates                   |
| Firefox 132 | 29 октября 2024 | **HTTP/2 Server Push removal**, **Scrollbar styling**       |
| Firefox 133 | 26 ноября 2024  | **Bounce Tracking Protection**, **Uint8Array Base64/Hex**   |

### 2025 (версии 134–142+, январь–ноябрь)

| Версия      | Дата релиза     | Примечания                                                                                                     |
| ----------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| Firefox 134 | 7 января 2025   | **`autocorrect` атрибут**, **`Promise.try()`**, **`RegExp.escape()`**                                          |
| Firefox 135 | 4 февраля 2025  | **Certificate Transparency**, **Post-quantum HTTP/3**, **CRLite**, **Bounce Tracking Protection** improvements |
| Firefox 136 | 4 марта 2025    | **`:open` pseudo-class**, **WebAuthn Client Capabilities**, **Strict CSP**, **`closedby` атрибут**             |
| Firefox 137 | 1 апреля 2025   | Web Platform продолжение                                                                                       |
| Firefox 138 | 29 апреля 2025  | Security и performance updates                                                                                 |
| Firefox 139 | 27 мая 2025     | **Temporal API** (первый браузер с полной поддержкой!)                                                         |
| Firefox 140 | 24 июня 2025    | Interop 2025 прогресс                                                                                          |
| Firefox 141 | 22 июля 2025    | **`closedby` атрибут** улучшения                                                                               |
| Firefox 142 | 19 августа 2025 | Web Platform updates                                                                                           |
| Firefox 143 | ~сентябрь 2025  | Прогноз: финальные Interop 2025 улучшения                                                                      |
| Firefox 144 | ~октябрь 2025   | Прогноз: продолжение Web Platform                                                                              |

**Примечание**: Firefox 139 стал первым браузером с полной поддержкой **Temporal API** —
революционного API для работы с датами и временем.

## Apple Safari / WebKit

### Особенности релизного цикла

- Мажорные релизы **привязаны к версиям macOS, iOS, iPadOS и visionOS**
- Минорные обновления выходят между релизами ОС (каждые 1–2 месяца)
- Safari Technology Preview — еженедельные preview builds для разработчиков

### 2023 (версии 16.3–17.2)

| Версия      | Дата релиза      | ОС                   | Ключевые фичи                                                                                  |
| ----------- | ---------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| Safari 16.3 | 23 января 2023   | macOS 13.2, iOS 16.3 | Обновления WebKit                                                                              |
| Safari 16.4 | 27 марта 2023    | macOS 13.3, iOS 16.4 | **MAJOR**: Declarative Shadow DOM, Popover, WebCodecs, Fetch Metadata, `inert`, 135+ новых фич |
| Safari 16.5 | 18 мая 2023      | macOS 13.4, iOS 16.5 | CSS улучшения                                                                                  |
| Safari 16.6 | 24 июля 2023     | macOS 13.5, iOS 16.6 | Стабильность                                                                                   |
| Safari 17.0 | 18 сентября 2023 | macOS Sonoma, iOS 17 | **MAJOR**: Popover API, JPEG XL, `<search>`, Storage API, Gamepad haptics, `<hr>` в `<select>` |
| Safari 17.1 | 25 октября 2023  | macOS 14.1, iOS 17.1 | Web Platform улучшения                                                                         |
| Safari 17.2 | 11 декабря 2023  | macOS 14.2, iOS 17.2 | Priority Header, CSS обновления                                                                |

### 2024 (версии 17.2–18.2)

| Версия      | Дата релиза      | ОС                    | Ключевые фичи                                                                |
| ----------- | ---------------- | --------------------- | ---------------------------------------------------------------------------- |
| Safari 17.3 | ~январь 2024     | macOS 14.3, iOS 17.3  | Обновления WebKit                                                            |
| Safari 17.4 | ~март 2024       | macOS 14.4, iOS 17.4  | **`Promise.withResolvers()`**, Math functions Baseline                       |
| Safari 17.5 | ~май 2024        | macOS 14.5, iOS 17.5  | **`@starting-style`**, **`light-dark()`**, CSS улучшения                     |
| Safari 17.6 | ~июль 2024       | macOS 14.6, iOS 17.6  | Performance updates                                                          |
| Safari 18.0 | 16 сентября 2024 | macOS Sequoia, iOS 18 | **MAJOR**: Request/Response `bytes()`, Fetch `keepalive`, WebAuthn улучшения |
| Safari 18.1 | ~октябрь 2024    | macOS 15.1, iOS 18.1  | Web Platform продолжение                                                     |
| Safari 18.2 | ~декабрь 2024    | macOS 15.2, iOS 18.2  | **`input type="week"`**, **Uint8Array Base64/Hex**, **`Float16Array`**       |

### 2025 (версии 18.2–26.2+, январь–ноябрь)

| Версия      | Дата релиза    | ОС                           | Ключевые фичи                                                                                                                                                  |
| ----------- | -------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Safari 18.3 | ~январь 2025   | macOS 15.3, iOS 18.3         | Popover iOS фиксы, Web Platform updates                                                                                                                        |
| Safari 18.4 | ~март 2025     | macOS 15.4, iOS 18.4         | **CHIPS**, **`::details-content`**, **`webkitdirectory` на iOS**                                                                                               |
| Safari 18.5 | ~май 2025      | macOS 15.5, iOS 18.5         | Security и performance updates                                                                                                                                 |
| Safari 18.6 | ~июль 2025     | macOS 15.6, iOS 18.6         | Interop 2025 progress                                                                                                                                          |
| Safari 26.0 | ~сентябрь 2025 | macOS 16, iOS 19, visionOS 3 | **MAJOR**: **Anchor Positioning** (universal support!), **Scroll-driven Animations**, **`text-wrap: pretty`**, **`contrast-color()`**, Interop 2025 завершение |
| Safari 26.1 | ~октябрь 2025  | macOS 16.1, iOS 19.1         | Web Platform продолжение                                                                                                                                       |
| Safari 26.2 | ~ноябрь 2025   | macOS 16.2, iOS 19.2         | Стабилизация                                                                                                                                                   |

**Важная деталь**: Safari 26.0 (сентябрь 2025) стал критически важным релизом, принеся универсальную
поддержку **Anchor Positioning**, завершившую 2-летнее ожидание после Chrome 125.

## Microsoft Edge

### Особенности релизного цикла

- **Chromium-based** с января 2020
- Версии Edge синхронизированы с Chrome (обычно лаг 0–1 неделя)
- После миграции на Chromium Edge наследует практически все фичи Chrome

### 2023 (версии 109–120)

Edge продолжает синхронизацию с Chrome на 4-недельном цикле. Все фичи и даты практически
соответствуют Chrome с минимальным лагом:

| Версия   | Примерная дата релиза | Синхронизация с Chrome   |
| -------- | --------------------- | ------------------------ |
| Edge 109 | 12–14 января 2023     | Chrome 109 (10 января)   |
| Edge 110 | 9–11 февраля 2023     | Chrome 110 (7 февраля)   |
| Edge 111 | 9–11 марта 2023       | Chrome 111 (7 марта)     |
| Edge 112 | 6–8 апреля 2023       | Chrome 112 (4 апреля)    |
| Edge 113 | 4–6 мая 2023          | Chrome 113 (2 мая)       |
| Edge 114 | 1–3 июня 2023         | Chrome 114 (30 мая)      |
| Edge 115 | 20–22 июля 2023       | Chrome 115 (18 июля)     |
| Edge 116 | 17–19 августа 2023    | Chrome 116 (15 августа)  |
| Edge 117 | 14–16 сентября 2023   | Chrome 117 (12 сентября) |
| Edge 118 | 12–14 октября 2023    | Chrome 118 (10 октября)  |
| Edge 119 | 2–4 ноября 2023       | Chrome 119 (31 октября)  |
| Edge 120 | 7–9 декабря 2023      | Chrome 120 (5 декабря)   |

### 2024 (версии 121–132)

| Версия   | Примерная дата релиза | Синхронизация с Chrome   |
| -------- | --------------------- | ------------------------ |
| Edge 121 | 25–27 января 2024     | Chrome 121 (23 января)   |
| Edge 122 | 22–24 февраля 2024    | Chrome 122 (20 февраля)  |
| Edge 123 | 21–23 марта 2024      | Chrome 123 (19 марта)    |
| Edge 124 | 18–20 апреля 2024     | Chrome 124 (16 апреля)   |
| Edge 125 | 16–18 мая 2024        | Chrome 125 (14 мая)      |
| Edge 126 | 13–15 июня 2024       | Chrome 126 (11 июня)     |
| Edge 127 | 26–28 июля 2024       | Chrome 127 (24 июля)     |
| Edge 128 | 22–24 августа 2024    | Chrome 128 (20 августа)  |
| Edge 129 | 19–21 сентября 2024   | Chrome 129 (17 сентября) |
| Edge 130 | 17–19 октября 2024    | Chrome 130 (15 октября)  |
| Edge 131 | 14–16 ноября 2024     | Chrome 131 (12 ноября)   |
| Edge 132 | 12–14 декабря 2024    | Chrome 132 (10 декабря)  |

### 2025 (версии 133–141+, январь–ноябрь)

| Версия   | Примерная дата релиза | Синхронизация с Chrome   |
| -------- | --------------------- | ------------------------ |
| Edge 133 | 23–25 января 2025     | Chrome 133 (21 января)   |
| Edge 134 | 20–22 февраля 2025    | Chrome 134 (18 февраля)  |
| Edge 135 | 20–22 марта 2025      | Chrome 135 (18 марта)    |
| Edge 136 | 17–19 апреля 2025     | Chrome 136 (15 апреля)   |
| Edge 137 | 15–17 мая 2025        | Chrome 137 (13 мая)      |
| Edge 138 | 12–14 июня 2025       | Chrome 138 (10 июня)     |
| Edge 139 | 10–12 июля 2025       | Chrome 139 (8 июля)      |
| Edge 140 | 7–9 августа 2025      | Chrome 140 (5 августа)   |
| Edge 141 | 4–6 сентября 2025     | Chrome 141 (2 сентября)  |
| Edge 142 | 2–4 октября 2025      | Chrome 142 (30 сентября) |
| Edge 143 | 30 окт.–1 ноября 2025 | Chrome 143 (28 октября)  |

**Примечание**: Edge также включает эксклюзивные Microsoft-фичи (Edge Copilot, Collections, Vertical
Tabs), но Web Platform API идентичны Chrome.

## Ключевые вехи периода

### 2023

| Дата             | Событие                                                                  |
| ---------------- | ------------------------------------------------------------------------ |
| 27 марта 2023    | **Safari 16.4** — один из крупнейших релизов Safari (135+ новых фич)     |
| 2 мая 2023       | **Chrome 113** — запуск **WebGPU API**                                   |
| 9 мая 2023       | **Firefox 113** — **CSS Color Level 4** (полная поддержка)               |
| 30 мая 2023      | **Chrome 114** — **Popover API**, **CHIPS** (партиционированные cookies) |
| 6 июня 2023      | **Firefox 114** — **WebTransport** поддержка                             |
| 18 июля 2023     | **Chrome 115** — **Privacy Sandbox GA** (официальный запуск)             |
| Сентябрь 2023    | **Baseline Initiative** — официальный запуск Web Platform Baseline       |
| Сентябрь 2023    | **Interop 2023** — достижение высоких показателей совместимости          |
| 26 сентября 2023 | **Firefox 117** — **CSS Nesting** native поддержка                       |
| 18 сентября 2023 | **Safari 17.0** — **Popover API** полная реализация                      |
| 5 декабря 2023   | **Chrome 120** — **CSS Nesting relaxed syntax**                          |

### 2024

| Дата             | Событие                                                                              |
| ---------------- | ------------------------------------------------------------------------------------ |
| 20 февраля 2024  | **Firefox 123** — **Declarative Shadow DOM** (Baseline август 2024)                  |
| 20 февраля 2024  | **Chrome 122** — **Set Methods** и **Iterator Helpers**                              |
| 19 марта 2024    | **Chrome 123** — **Service Worker Static Routing API**                               |
| 16 апреля 2024   | **Chrome 124** — **X25519Kyber768** (post-quantum crypto)                            |
| 14 мая 2024      | **Chrome 125** — **Anchor Positioning** (начало 2-летнего ожидания Safari)           |
| 22 июля 2024     | **Third-party Cookies Reversal** — Google отменил deprecation (главное событие года) |
| 20 августа 2024  | **Chrome 128** — 38 security fixes, включая активно эксплуатируемую CVE-2024-7971    |
| 17 сентября 2024 | **Chrome 129** — **Float16Array** (Stage 4)                                          |
| 16 сентября 2024 | **Safari 18.0** — мажорный релиз с WebAuthn улучшениями                              |
| 29 октября 2024  | **Firefox 132** — **HTTP/2 Server Push removal**                                     |
| 12 ноября 2024   | **Chrome 131** — **ML-KEM** (финальный post-quantum стандарт FIPS 203)               |
| Декабрь 2024     | **Interop 2024** — завершение с 95% совместимости (рекордный показатель)             |

### 2025

| Дата             | Событие                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| Январь 2025      | **Popover API** — достижение **Baseline Newly Available**                                                           |
| 21 января 2025   | **Chrome 133** — **`text-box`**, **`:open` pseudo-class**, enhanced `attr()`                                        |
| 7 января 2025    | **Firefox 134** — **`RegExp.escape()`**, **`Promise.try()`**                                                        |
| 4 февраля 2025   | **Firefox 135** — **Certificate Transparency**, **Post-quantum HTTP/3**                                             |
| 18 февраля 2025  | **Chrome 134** — **Customizable `<select>`** (революция в формах)                                                   |
| 4 марта 2025     | **Firefox 136** — **`:open` pseudo-class**, **WebAuthn Client Capabilities**                                        |
| 15 апреля 2025   | **Chrome 136** — **`RegExp.escape()`** (ES2025 Stage 4)                                                             |
| 27 мая 2025      | **Firefox 139** — **Temporal API** (первый браузер с полной поддержкой!)                                            |
| Август 2025      | **Container Queries** — достижение **Baseline High** (30+ месяцев)                                                  |
| ~Сентябрь 2025   | **Safari 26.0** — **Anchor Positioning universal support** (финал 2-летнего ожидания), **Scroll-driven Animations** |
| 30 сентября 2025 | **Chrome 142** — **WebRTC PQC** (post-quantum crypto для WebRTC)                                                    |

## Статистика браузерных релизов

### Количество мажорных релизов по периодам

| Браузер       | 2023 (полный)   | 2024 (полный)   | 2025 (янв–ноя)    | Всего (2023–2025) |
| ------------- | --------------- | --------------- | ----------------- | ----------------- |
| Chrome        | 12 (109–120)    | 12 (121–132)    | 9+ (133–141+)     | 33+ релиза        |
| Firefox       | 12 (109–120)    | 13 (121–133)    | 9+ (134–142+)     | 34+ релиза        |
| Safari        | 7 (16.3–17.2)\* | 7 (17.3–18.2)\* | 5+ (18.3–26.2+)\* | 19+ релизов\*     |
| Edge Chromium | 12 (109–120)    | 12 (121–132)    | 9+ (133–141+)     | 33+ релиза        |

\* Safari включает минорные релизы (16.3, 16.4, 16.5, 17.0, 17.1, 17.2) и мажорные (17.0, 18.0,
26.0)

### Темп релизов

```
Средний интервал между релизами:
- Chrome/Edge:  ~4 недели (стабильный цикл)
- Firefox:      ~4 недели (стабильный цикл)
- Safari:       ~6–8 недель (минорные), ~12 месяцев (мажорные)
```

### Ключевые показатели периода

| Метрика                               | Значение                      |
| ------------------------------------- | ----------------------------- |
| Baseline Newly Available (2023)       | 12+ технологий                |
| Baseline Newly Available (2024)       | 20+ технологий                |
| Baseline Newly Available (2025)       | 8+ технологий (янв–ноя)       |
| Interop 2023 score                    | ~80% (15 focus areas)         |
| Interop 2024 score                    | 95% (17 focus areas, рекорд!) |
| Interop 2025 score                    | В процессе (19 focus areas)   |
| Passkeys активные                     | 3+ миллиарда (2025)           |
| HTTP/3 adoption                       | 30–60% трафика (2025)         |
| Post-quantum crypto (ML-KEM) coverage | 38% HTTPS-трафика (2025)      |

## Сравнение 2023–2025 с предыдущим периодом

### Эволюция релизных циклов

По сравнению с периодом 2018–2022, циклы в 2023–2025 **стабилизировались**:

- Chrome/Edge: **сохранили 4-недельный цикл** (установленный в 2021)
- Firefox: **сохранил 4-недельный цикл** (с 2020)
- Safari: **сохранил привязку к OS релизам** (2 мажорных в год)

### Ускорение baseline-достижений

Baseline Initiative (2023+) сократила время от внедрения до массового adoption:

- **2018–2022:** ~3–5 лет от первой реализации до полной поддержки
- **2023–2025:** ~12–24 месяца от первой реализации до Baseline Newly Available
- **Interop-ускорение:** фичи из Interop достигают Baseline в течение года

### Основные отличия

```
2018–2022:
- Экспериментальная эпоха (CSS Grid, Flexbox зрелость, ES6+ adoption)
- COVID-19 влияние (Chrome 82 пропущен)
- Edge миграция на Chromium (2020)

2023–2025:
- Baseline Initiative — прозрачность совместимости
- Interop достигает 95% (рекордный показатель)
- Post-quantum crypto массовое внедрение
- Third-party cookies reversal (2024)
- CSS революция (Container Queries, `:has()`, Anchor Positioning)
- Passwordless будущее (3B+ passkeys)
```

## Ключевые выводы

### Зрелость веб-платформы

2023–2025 год стал периодом **консолидации и зрелости**:

1. **CSS достиг зрелости** — Container Queries, `:has()`, Subgrid, Anchor Positioning стали Baseline
2. **Baseline Initiative** — революция в прозрачности совместимости
3. **Interop 95%** — беспрецедентная синхронизация браузеров
4. **Post-quantum готовность** — 38% HTTPS-трафика с ML-KEM
5. **Passwordless Web** — 3+ миллиарда активных passkeys

### Браузерная конкуренция

Несмотря на доминирование Chromium (Chrome + Edge ~70% рынка):

- **Safari** остаётся критически важным для Baseline (Safari 26.0 — Anchor Positioning!)
- **Firefox** продолжает инновации (первым Temporal API, post-quantum HTTP/3)
- **Interop** обеспечивает здоровую конкуренцию и сотрудничество

### Safari как сдерживающий фактор

Safari продолжает быть последним браузером для Baseline-достижений:

- **Popover API**: Chrome 114 (май 2023) → Safari 17 (сентябрь 2023) → Baseline январь 2025
- **Anchor Positioning**: Chrome 125 (май 2024) → Safari 26 (сентябрь 2025) → ожидается Baseline
  март 2027
- **Declarative Shadow DOM**: Chrome 90 (2021) → Safari 16.4 (март 2023) → Baseline август 2024

### Ускорение innovation через Interop

Interop 2023–2025 доказал эффективность:

- **2023**: 15 focus areas → Container Queries, Subgrid, CSS Nesting Baseline
- **2024**: 17 focus areas, 95% score → `@property`, Scrollbar styling, Popover Baseline
- **2025**: 19 focus areas → Anchor Positioning, Customizable `<select>`, `<details>` улучшения

## Методология определения baseline (2023–2025)

### Критерии Baseline Newly Available

Функция достигает **Newly Available** когда:

1. Поддерживается во **всех четырёх основных браузерах** (Chrome, Edge, Firefox, Safari)
2. Поддержка присутствует как на **desktop**, так и на **mobile** версиях
3. Функция доступна в **последних стабильных** версиях (не за флагами)

### Критерии Baseline Widely Available

Функция достигает **Widely Available** через:

- **30 месяцев** (2.5 года) после достижения Newly Available
- Покрывает ~95%+ пользователей глобально

### Примеры из 2023–2025

**Container Queries**:

- Chrome 105 (сентябрь 2022) → Safari 16.0 (сентябрь 2022) → Firefox 110 (февраль 2023)
- **Baseline Newly Available**: февраль 2023
- **Baseline Widely Available**: август 2025 (30+ месяцев)

**Popover API**:

- Chrome 114 (май 2023) → Safari 17.0 (сентябрь 2023) → Firefox 125 (апрель 2024) → Safari 18.3 iOS
  fix (январь 2025)
- **Baseline Newly Available**: январь 2025
- **Baseline Widely Available**: июль 2027 (прогноз)

**Anchor Positioning**:

- Chrome 125 (май 2024) → Safari 26.0 (сентябрь 2025) → Firefox (в разработке)
- **Baseline Newly Available**: сентябрь 2025 (после Safari 26.0)
- **Baseline Widely Available**: март 2027 (прогноз)

## Источники

### Официальные релиз-ноуты

- **Chrome Releases Blog**: https://chromereleases.googleblog.com
- **Chrome Developers Blog**: https://developer.chrome.com/blog
- **Firefox Release Notes**: https://www.mozilla.org/firefox/releases/
- **WebKit Blog**: https://webkit.org/blog/
- **Safari Release Notes**: https://developer.apple.com/documentation/safari-release-notes
- **Microsoft Edge Release Notes**:
  https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel

### Web Platform Baseline

- **web.dev Baseline**: https://web.dev/baseline
- **WebDX Community Group**: https://www.w3.org/community/webdx/
- **web-features repository**: https://github.com/web-platform-dx/web-features
- **MDN Browser Compatibility Data**: https://github.com/mdn/browser-compat-data

### Interop

- **Interop 2023**: https://wpt.fyi/interop-2023
- **Interop 2024**: https://wpt.fyi/interop-2024
- **Interop 2025**: https://wpt.fyi/interop-2025

### Дополнительные источники

- **Can I Use**: https://caniuse.com
- **Chrome Platform Status**: https://chromestatus.com
- **Firefox Platform Status**: https://platform-status.mozilla.org
- **WebKit Feature Status**: https://webkit.org/status/

**Дата обновления**: 19 ноября 2025
