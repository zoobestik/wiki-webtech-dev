---
title: Scope исследования
description: Границы, методология и критерии отбора для исследования Frontend Baseline 2018-2022
outline: deep
lastUpdated: true
---

# Scope исследования: Frontend Baseline 2018–2022

## Временные границы

**Начало:** 1 января 2018
**Конец:** 31 декабря 2022

Исследование охватывает изменения, которые:

- Были **анонсированы** или **вошли в спецификацию** в указанный период
- Достигли **baseline статуса** (поддержка во всех основных браузерах) к концу 2022 или в течение этого периода
- Имеют **значительное практическое влияние** на frontend-разработку

## Технологические области

### 1. HTML (HyperText Markup Language)

**Включаем:**

- Новые элементы (например, `<dialog>`)
- Новые атрибуты для существующих элементов
- Изменения в семантике или поведении элементов
- Улучшения форм и валидации
- Accessibility (ARIA) обновления, интегрированные в HTML
- Loading и performance атрибуты

**Исключаем:**

- Экспериментальные предложения без baseline поддержки
- Микрофичи без практического влияния

### 2. CSS (Cascading Style Sheets)

**Включаем:**

- Новые CSS свойства
- Новые CSS селекторы и pseudo-классы/элементы
- Новые CSS функции (`clamp()`, `min()`, `max()`, color functions)
- Layout системы и их улучшения (Grid, Flexbox)
- Logical properties
- Custom Properties расширения
- At-rules (`@supports`, `@media` с новыми features)
- CSS Houdini APIs в baseline статусе
- Responsive и адаптивные фичи

**Исключаем:**

- Vendor-specific свойства без стандартизации
- Экспериментальные Houdini APIs без широкой поддержки

### 3. JavaScript и Web APIs

**Включаем:**

#### ECMAScript (2018–2022)

- Языковые фичи ES2018–ES2022, достигшие baseline в браузерах

#### Web APIs — категории для исследования:

- **DOM и UI:** Observers (Intersection, Resize, Mutation), Visual Viewport API
- **Performance:** Paint Timing, Element Timing, Layout Instability (Core Web Vitals)
- **Loading:** Native lazy loading, Module scripts improvements
- **Storage:** IndexedDB обновления, Cookie Store API, Storage Manager
- **Network:** Fetch API расширения, Streams API, WebRTC updates
- **Async и Control Flow:** AbortController/AbortSignal, async/await улучшения
- **Media:** WebCodecs (если baseline), Picture-in-Picture, Media Capabilities
- **Device Integration:** Web Bluetooth, WebUSB, WebHID (если baseline)
- **Security:** Permissions API, Feature Policy/Permissions Policy
- **Workers:** Module workers, SharedArrayBuffer возвращение

**Исключаем:**

- Экспериментальные APIs без baseline статуса
- Node.js-специфичные фичи
- Frameworks и библиотеки (React, Vue и т.д.)

## Браузеры в scope

**Основные (для определения baseline):**

1. Google Chrome / Chromium
2. Mozilla Firefox
3. Apple Safari (macOS и iOS)
4. Microsoft Edge (включая переход на Chromium в 2019-2020)

**Критерий baseline:** Фича считается baseline, когда поддерживается во всех четырёх основных браузерах (последние 2 major версии на момент оценки).

## Источники данных

### Первичные источники:

1. **Официальные спецификации:**
    - W3C Recommendations и Working Drafts
    - WHATWG Living Standards
    - TC39 ECMAScript proposals (stage 4)

2. **Релиз-ноуты браузеров:**
    - Chrome Platform Status и Chromium Blog
    - Firefox Release Notes и Mozilla Hacks
    - WebKit Feature Status и Safari Release Notes
    - Microsoft Edge Release Notes

3. **Документация и compatibility данные:**
    - MDN Web Docs (Mozilla Developer Network)
    - Can I Use (caniuse.com)
    - web-platform-tests
    - Baseline features tracking (web.dev/baseline)

### Вторичные источники:

- Issue trackers браузеров (Chromium, Mozilla, WebKit bugs)
- W3C и WHATWG GitHub repositories
- Технические блоги признанных экспертов
- Статьи на web.dev, CSS-Tricks, Smashing Magazine

## Критерии значимости изменения

Изменение включается в исследование, если оно соответствует **хотя бы одному** из критериев:

1. **Высокое практическое влияние:**
    - Решает частую проблему разработчиков
    - Улучшает производительность или UX значительно
    - Упрощает или заменяет сложные паттерны

2. **Широкое применение:**
    - Используется в популярных production приложениях
    - Рекомендуется в best practices

3. **Архитектурная значимость:**
    - Вводит новую парадигму или подход
    - Является основой для будущих фич
    - Меняет mentality разработчиков

4. **Deprecation impact:**
    - Депрекация влияет на существующий production-код
    - Требует миграции или рефакторинга

## Структура итогового отчёта

Финальный отчёт будет структурирован следующим образом:

```
final-report.md
├── Обзор периода 2018–2022
├── HTML изменения
│   ├── По годам (2018, 2019, 2020, 2021, 2022)
│   ├── Новые элементы
│   ├── Новые атрибуты
│   ├── Семантические изменения
│   ├── Депрекации
│   └── Примеры кода
├── CSS изменения
│   ├── По годам
│   ├── Layout (Grid, Flexbox, новые методы)
│   ├── Селекторы и pseudo-классы
│   ├── Свойства визуализации
│   ├── Функции и custom properties
│   ├── At-rules и media queries
│   ├── Депрекации
│   └── Примеры кода
├── JavaScript и Web APIs
│   ├── ECMAScript по годам (ES2018–ES2022)
│   ├── Web APIs по категориям
│   ├── Депрекации и удаления
│   └── Примеры кода
├── Инициативы и спецификации
│   ├── W3C рабочие группы
│   ├── WHATWG инициативы
│   └── Влияние на индустрию
├── Анализ трендов и паттернов
│   ├── Ключевые направления развития
│   ├── Adoption timeline
│   └── Практические рекомендации
├── Визуализации
│   ├── Timeline диаграммы (mermaid)
│   └── Таблицы browser support
└── Источники и ссылки
```

## Ограничения исследования

### Сознательно исключаем:

1. Фреймворки и библиотеки (React, Vue, Angular, Svelte и др.)
2. Build tools и транспайлеры (Webpack, Vite, Babel и др.)
3. CSS препроцессоры и постпроцессоры (Sass, Less, PostCSS и др.)
4. Tooling и developer experience (кроме DevTools фич, влияющих на стандарты)
5. Серверные технологии и Node.js (кроме тех, что влияют на клиентскую разработку)

### Технические ограничения:

1. **Актуальность данных:** Исследование опирается на источники, актуальные на момент 02.11.2025
2. **Глубина анализа:** Фокус на практическом применении, а не на теоретических деталях спецификаций
3. **Субъективность значимости:** Оценка влияния основана на анализе community feedback и экспертных мнений

## Целевое использование отчёта

Итоговый отчёт предназначен для:

1. **Самостоятельного изучения** разработчиком, который хочет восполнить пробелы в знаниях за 2018–2022
2. **Планирования углублённого обучения** — выбор тем для детального изучения
3. **Практического применения** — внедрение новых возможностей в реальные проекты
4. **Справочного материала** — быстрый поиск информации о конкретной фиче

- **Research ID:** `frontend-baseline-2018-2022`
- **Дата создания:** 17.11.2025
- **Методология:** DeepResearch-Claude
