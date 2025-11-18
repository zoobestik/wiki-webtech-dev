---
title: CSS изменения 2018-2022
description: Comprehensive обзор CSS Layout, селекторов, функций и media queries с практическими примерами
outline: deep
lastUpdated: true
---

# CSS изменения 2018–2022

## Обзор

Период 2018–2022 стал одним из самых продуктивных для CSS с точки зрения добавления новых возможностей. Ключевые тренды:

- **Layout революция:** окончательное утверждение CSS Grid, улучшения Flexbox, появление `aspect-ratio`
- **Адаптивность нового уровня:** Media Queries Level 5, начало Container Queries
- **Функциональность:** математические функции (`clamp()`, `min()`, `max()`)
- **Селекторы:** `:is()`, `:where()`, `:has()` (конец периода)
- **Accessibility:** `prefers-color-scheme`, `prefers-reduced-motion`, `:focus-visible`

## Layout

### CSS Grid — консолидация и расширение

**Статус в 2018:** Уже baseline (с марта 2017)

В период 2018–2022 CSS Grid не получил революционных изменений, но закрепил свою позицию как основного инструмента для layout. Все улучшения были incremental.

#### Ключевые возможности CSS Grid (baseline 2017-2018)

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: auto;
    gap: 1rem;
    grid-auto-flow: dense;
}

.grid-item {
    grid-column: span 2;
    grid-row: 1 / 3;
}
```

#### Subgrid — долгожданная фича (конец периода)

**Браузерная поддержка:**

| Браузер | Первая версия | Дата                      |
| ------- | ------------- | ------------------------- |
| Firefox | 71            | Декабрь 2019              |
| Safari  | 16            | Сентябрь 2022             |
| Chrome  | 117           | Август 2023 (вне периода) |
| Edge    | 117           | Август 2023 (вне периода) |

**Baseline статус:** Сентябрь 2023 (ВНЕ периода 2018–2022)

**Важно:** Subgrid НЕ достиг baseline в исследуемый период. Firefox поддерживал с 2019, Safari — с сентября 2022, но Chrome добавил поддержку только в 2023.

#### Что такое subgrid

```css
.parent-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.child-grid {
    grid-column: span 3;
    display: grid;
    /* Наследует колонки и gaps родительской grid */
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
}
```

**Практическое применение:** Согласование вложенных grid элементов с родительской сеткой без дублирования определений.

**До subgrid** разработчики использовали workaround:

```css
.fake-subgrid {
    display: contents; /* Делает элемент "прозрачным" для grid */
}
```

### Flexbox `gap` — долгожданное упрощение

**Браузерная поддержка:**

| Браузер | Первая версия | Дата         |
| ------- | ------------- | ------------ |
| Firefox | 63            | Октябрь 2018 |
| Chrome  | 84            | Июль 2020    |
| Edge    | 84            | Июль 2020    |
| Safari  | 14.1          | Апрель 2021  |

**Baseline статус:** Апрель 2021 (Compat 2021 initiative)

#### До и после

**До (2018):**

```css
.flex-container {
    display: flex;
}

.flex-item {
    margin-right: 1rem;
}

.flex-item:last-child {
    margin-right: 0;
}
```

**После (2021):**

```css
.flex-container {
    display: flex;
    gap: 1rem;
}
```

#### Практическое влияние

- Упрощение кода
- Единообразие с CSS Grid (где `gap` уже был)
- Часть **Compat 2021** инициативы — top compatibility pain point

### `aspect-ratio` — нативные пропорции

**Браузерная поддержка:**

| Браузер | Первая версия | Дата          |
| ------- | ------------- | ------------- |
| Chrome  | 88            | Январь 2021   |
| Firefox | 89            | Июнь 2021     |
| Safari  | 15            | Сентябрь 2021 |
| Edge    | 88            | Январь 2021   |

**Baseline статус:** Сентябрь 2021

#### Использование

```css
.video-container {
    aspect-ratio: 16 / 9;
    width: 100%;
}

.square {
    aspect-ratio: 1;
}

.golden-ratio {
    aspect-ratio: 1.618;
}

/* С min/max размерами */
.responsive-box {
    aspect-ratio: 4 / 3;
    width: 100%;
    max-width: 600px;
}
```

#### До `aspect-ratio` — padding-bottom хак

```css
/* Старый способ для 16:9 */
.video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 9/16 = 0.5625 */
    height: 0;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

#### Практическое влияние

- Избавление от padding-bottom хаков
- Улучшение Core Web Vitals (CLS — Cumulative Layout Shift)
- Поддержка responsive media без JavaScript

### Container Queries — начало новой эры (конец периода)

**Браузерная поддержка:**

| Браузер | Первая версия | Дата                       |
| ------- | ------------- | -------------------------- |
| Chrome  | 105           | Август 2022                |
| Edge    | 105           | Август 2022                |
| Safari  | 16            | Сентябрь 2022              |
| Firefox | 110           | Февраль 2023 (вне периода) |

**Baseline статус:** Февраль 2023 (ВНЕ периода 2018–2022)

**Важно:** Container Queries появились в Chrome и Safari в самом конце 2022, но НЕ достигли baseline в исследуемый период.

#### Что такое Container Queries

```css
.card-container {
    container-type: inline-size;
    container-name: card;
}

.card {
    display: grid;
    grid-template-columns: 1fr;
}

/* Когда контейнер шире 400px */
@container card (min-width: 400px) {
    .card {
        grid-template-columns: 200px 1fr;
    }
}

/* Container Query Units */
.card-title {
    font-size: clamp(1rem, 5cqw, 2rem);
}
```

**Container Query Units:**

- `cqw` — 1% ширины контейнера
- `cqh` — 1% высоты контейнера
- `cqi` — 1% inline размера
- `cqb` — 1% block размера
- `cqmin`, `cqmax`

#### Практическое влияние

Смена парадигмы: от **viewport-based** к **container-based** адаптивному дизайну.

**Полифилл:** Google Chrome Labs создал polyfill (maintenance mode с ноября 2022).

## Селекторы и Pseudo-классы

### `:is()` и `:where()` — упрощение селекторов

**Браузерная поддержка:**

| Браузер | `:is()`        | `:where()`     |
| ------- | -------------- | -------------- |
| Firefox | 78 (июнь 2020) | 78 (июнь 2020) |
| Chrome  | 88 (янв 2021)  | 88 (янв 2021)  |
| Safari  | 14 (сент 2020) | 14 (сент 2020) |
| Edge    | 88 (янв 2021)  | 88 (янв 2021)  |

**Baseline статус:** Январь 2021

#### Синтаксис

**До:**

```css
.header h1,
.header h2,
.header h3,
.footer h1,
.footer h2,
.footer h3 {
    font-family: sans-serif;
}
```

**После:**

```css
:is(.header, .footer) :is(h1, h2, h3) {
    font-family: sans-serif;
}
```

#### Разница между `:is()` и `:where()`

**`:is()` — учитывает специфичность самого специфичного селектора:**

```css
:is(#id, .class, div) {
} /* специфичность = (1,0,0) — от #id */
```

**`:where()` — специфичность всегда 0:**

```css
:where(#id, .class, div) {
} /* специфичность = (0,0,0) */
```

#### Практическое применение

```css
/* Упрощение сложных селекторов */
:is(section, article, aside) :is(h1, h2, h3) {
    margin-block-start: 1rem;
}

/* Утилитарные классы с нулевой специфичностью */
:where(.mt-1) {
    margin-top: 0.25rem;
}

/* Легко переопределить */
.custom-component .mt-1 {
    margin-top: 0.5rem; /* Работает без !important */
}
```

### `:has()` — "родительский" селектор (конец периода)

**Браузерная поддержка:**

| Браузер | Первая версия | Дата                       |
| ------- | ------------- | -------------------------- |
| Safari  | 15.4          | Март 2022                  |
| Chrome  | 105           | Август 2022                |
| Edge    | 105           | Август 2022                |
| Firefox | 121           | Декабрь 2023 (вне периода) |

**Baseline статус:** Декабрь 2023 (ВНЕ периода 2018–2022)

**Важно:** `:has()` появился в Safari и Chrome в 2022, но НЕ достиг baseline в исследуемый период.

#### Синтаксис и возможности

```css
/* "Родительский" селектор */
.card:has(img) {
    display: grid;
    grid-template-columns: 200px 1fr;
}

.card:not(:has(img)) {
    display: block;
}

/* Состояния форм */
form:has(:invalid) {
    border: 2px solid red;
}

form:has(:focus) {
    outline: 2px solid blue;
}

/* Sibling селектор */
h2:has(+ p) {
    margin-bottom: 0.5rem;
}

/* Сложные комбинации */
article:has(> h2):has(> .featured-image) {
    /* Статья с заголовком H2 И featured изображением */
}
```

#### Практическое влияние

Революционная фича, которая меняет подход к CSS:

- Устраняет необходимость в JavaScript для многих state-based стилей
- Позволяет стилизовать родителей на основе состояния потомков
- Новые паттерны дизайна (например, "quantity queries")

**Примеры практического использования:**

```css
/* Адаптивный layout на основе контента */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid:has(.item:nth-child(n + 7)) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Стилизация формы при ошибках */
.form-group:has(input:invalid:not(:placeholder-shown)) {
    --input-border-color: red;
}
```

### `:focus-visible` — умный фокус

**Браузерная поддержка:**

| Браузер | Первая версия | Дата         |
| ------- | ------------- | ------------ |
| Firefox | 85            | Январь 2021  |
| Chrome  | 86            | Октябрь 2020 |
| Safari  | 15.4          | Март 2022    |
| Edge    | 86            | Октябрь 2020 |

**Baseline статус:** Март 2022

#### Проблема с `:focus`

```css
button:focus {
    outline: 2px solid blue;
}
```

**Проблема:** outline показывается даже при клике мышью, что многие считают визуальным шумом.

**Плохое решение (до `:focus-visible`):**

```css
button:focus {
    outline: none; /* ⚠️ Ломает accessibility! */
}
```

#### Решение: `:focus-visible`

```css
/* Outline только при навигации клавиатурой */
button:focus-visible {
    outline: 2px solid blue;
}

/* Можно убрать default focus без вреда для a11y */
button:focus:not(:focus-visible) {
    outline: none;
}
```

#### Поведение браузера

С 2022 **все основные браузеры** изменили user-agent stylesheets, заменив `:focus` на `:focus-visible` для элементов управления.

## Функции

### `min()`, `max()`, `clamp()` — математика в CSS

**Браузерная поддержка:**

| Браузер | Первая версия | Дата         |
| ------- | ------------- | ------------ |
| Safari  | 13.1          | Март 2020    |
| Chrome  | 79            | Декабрь 2019 |
| Firefox | 75            | Апрель 2020  |
| Edge    | 79            | Январь 2020  |

**Baseline статус:** Июль 2020

#### `clamp()` — ограничение значения диапазоном

```css
.title {
    /* min, preferred, max */
    font-size: clamp(1.5rem, 5vw, 3rem);
}
```

Эквивалентно:

```css
.title {
    font-size: 5vw;
    font-size: max(1.5rem, min(5vw, 3rem));
}
```

#### Практические примеры

**Responsive typography без media queries:**

```css
h1 {
    font-size: clamp(2rem, 4vw + 1rem, 4rem);
}

p {
    font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
    line-height: 1.6;
}
```

**Responsive spacing:**

```css
.section {
    padding-block: clamp(2rem, 5vw, 6rem);
    padding-inline: clamp(1rem, 3vw, 3rem);
}
```

**Ширина контейнера:**

```css
.container {
    width: min(90%, 1200px);
    margin-inline: auto;
}
```

#### `min()` и `max()`

```css
/* Минимум из двух значений */
.sidebar {
    width: min(300px, 30%);
}

/* Максимум из двух значений */
.content {
    min-height: max(300px, 50vh);
}

/* Комбинации */
.responsive-grid {
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
}
```

## Свойства

### Logical Properties — writing mode aware свойства

**Браузерная поддержка:**

Большинство logical properties получили baseline поддержку в период 2018–2020.

**Ключевые браузерные вехи:**

- Firefox: хорошая поддержка с 2018
- Chrome: baseline поддержка 2018-2019
- Safari: baseline поддержка 2019-2020
- Edge: синхронизирован с Chrome с 2020

**Baseline статус:** ~2020 для core properties

#### Концепция

Вместо физических направлений (`left`, `right`, `top`, `bottom`) — логические относительно writing mode.

**Mapping:**

| Physical        | Logical (horizontal LTR) |
| --------------- | ------------------------ |
| `margin-left`   | `margin-inline-start`    |
| `margin-right`  | `margin-inline-end`      |
| `margin-top`    | `margin-block-start`     |
| `margin-bottom` | `margin-block-end`       |
| `width`         | `inline-size`            |
| `height`        | `block-size`             |

#### Примеры

```css
.card {
    /* Вместо: margin-left, margin-right */
    margin-inline: 1rem;

    /* Вместо: margin-top, margin-bottom */
    margin-block: 2rem;

    /* Вместо: padding: 1rem 2rem */
    padding-block: 1rem;
    padding-inline: 2rem;

    /* Вместо: border-left */
    border-inline-start: 2px solid blue;

    /* Вместо: width, height */
    inline-size: 300px;
    block-size: 200px;
}

.text {
    /* Вместо: text-align: left */
    text-align: start;

    /* Вместо: text-align: right */
    text-align: end;
}
```

#### Преимущества

**Интернационализация (i18n):**

```css
html[dir='rtl'] .card {
    /* С logical properties — ничего менять не нужно! */
}

/* Вместо: */
html[dir='rtl'] .card {
    margin-left: 0;
    margin-right: 1rem;
    text-align: right;
}
```

**Vertical writing modes:**

```css
.vertical-text {
    writing-mode: vertical-rl;
    /* Logical properties автоматически адаптируются */
}
```

#### Shorthand свойства

```css
/* Block и inline одновременно */
.element {
    margin-block: 1rem 2rem; /* start end */
    margin-inline: 0.5rem 1rem; /* start end */

    /* Сокращённая форма (аналог margin) */
    margin: logical 1rem 2rem 1rem 2rem; /* ❌ Не существует */
    /* Используйте раздельно: */
    margin-block: 1rem;
    margin-inline: 2rem;
}
```

### `backdrop-filter` — эффекты фона

**Браузерная поддержка:**

| Браузер | Первая версия | Дата        | Примечания             |
| ------- | ------------- | ----------- | ---------------------- |
| Safari  | 9             | 2015        | С префиксом `-webkit-` |
| Chrome  | 76            | Июль 2019   |                        |
| Edge    | 79            | Январь 2020 |                        |
| Firefox | 103           | Июль 2022   |                        |

**Baseline статус:** Март 2025 (ожидается) — НЕ baseline в период 2018–2022

#### Использование

```css
.glassmorphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-overlay {
    backdrop-filter: blur(5px) brightness(0.8);
}

.frosted-glass {
    backdrop-filter: blur(20px) contrast(0.8);
}
```

#### Доступные фильтры

```css
backdrop-filter: blur(5px);
backdrop-filter: brightness(0.8);
backdrop-filter: contrast(1.2);
backdrop-filter: grayscale(100%);
backdrop-filter: saturate(2);
backdrop-filter: opacity(0.5);
backdrop-filter: hue-rotate(45deg);
backdrop-filter: invert(100%);

/* Комбинации */
backdrop-filter: blur(10px) saturate(150%) contrast(1.1);
```

#### Feature detection

```css
@supports (backdrop-filter: blur(1px)) {
    .glass {
        backdrop-filter: blur(10px);
    }
}

@supports not (backdrop-filter: blur(1px)) {
    .glass {
        background: rgba(255, 255, 255, 0.9); /* Fallback */
    }
}
```

### `overscroll-behavior` — контроль scroll chaining

**Браузерная поддержка:**

| Браузер | Первая версия | Дата          |
| ------- | ------------- | ------------- |
| Chrome  | 63            | Декабрь 2017  |
| Firefox | 59            | Март 2018     |
| Safari  | 16            | Сентябрь 2022 |
| Edge    | 18            | Ноябрь 2018   |

**Baseline статус:** Сентябрь 2022

#### Проблема: scroll chaining

При прокрутке вложенного элемента (например, modal) браузер продолжает прокручивать родительский элемент (страницу).

#### Решение

```css
.modal {
    overscroll-behavior: contain;
}

.horizontal-scroller {
    overscroll-behavior-x: contain;
    overscroll-behavior-y: auto;
}

/* Отключить pull-to-refresh */
body {
    overscroll-behavior-y: none;
}
```

**Значения:**

- `auto` — дефолтное поведение (scroll chaining)
- `contain` — блокирует scroll chaining
- `none` — блокирует scroll chaining + bounce effects + pull-to-refresh

## Media Queries Level 5

### `prefers-color-scheme` — тёмная тема

**Браузерная поддержка:**

| Браузер | Первая версия | Дата        |
| ------- | ------------- | ----------- |
| Safari  | 12.1          | Март 2019   |
| Chrome  | 76            | Июль 2019   |
| Firefox | 67            | Май 2019    |
| Edge    | 79            | Январь 2020 |

**Baseline статус:** Январь 2020

#### Использование

```css
:root {
    --bg-color: white;
    --text-color: black;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #f0f0f0;
    }
}

body {
    background: var(--bg-color);
    color: var(--text-color);
}
```

#### С custom properties

```css
:root {
    color-scheme: light dark;
}

@media (prefers-color-scheme: light) {
    :root {
        --surface: white;
        --on-surface: #202124;
        --primary: #1a73e8;
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --surface: #202124;
        --on-surface: #e8eaed;
        --primary: #8ab4f8;
    }
}
```

### `prefers-reduced-motion` — уважение к пользователю

**Браузерная поддержка:**

| Браузер | Первая версия | Дата         |
| ------- | ------------- | ------------ |
| Safari  | 10.1          | Март 2017    |
| Firefox | 63            | Октябрь 2018 |
| Chrome  | 74            | Апрель 2019  |
| Edge    | 79            | Январь 2020  |

**Baseline статус:** ~2019-2020

#### Использование

```css
.animation {
    animation: slide-in 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
    .animation {
        animation: none;
    }

    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

#### Best practice

```css
/* Mobile-first подход для анимаций */
* {
    transition: none;
    animation: none;
}

@media (prefers-reduced-motion: no-preference) {
    * {
        transition: all 0.3s ease;
    }

    .fancy-animation {
        animation: rotate 2s infinite;
    }
}
```

## Custom Properties и Houdini

### CSS Variables (Custom Properties)

**Статус в 2018:** Уже baseline (с 2016-2017)

```css
:root {
    --primary-color: #1a73e8;
    --spacing-unit: 8px;
}

.button {
    background: var(--primary-color);
    padding: var(--spacing-unit);
}
```

### `@property` — typed custom properties (Houdini)

**Браузерная поддержка:**

| Браузер | Первая версия | Дата                    |
| ------- | ------------- | ----------------------- |
| Chrome  | 85            | Август 2020             |
| Edge    | 85            | Август 2020             |
| Safari  | 16.4          | Март 2023 (вне периода) |
| Firefox | 128           | Июль 2024 (вне периода) |

**Baseline статус:** Июль 2024 (ВНЕ периода 2018–2022)

**Важно:** `@property` появился в Chrome в 2020, но НЕ достиг baseline в исследуемый период.

#### Синтаксис

```css
@property --my-color {
    syntax: '<color>';
    inherits: false;
    initial-value: #c0ffee;
}

@property --angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

.element {
    --my-color: blue;
    background: var(--my-color);

    transition: --my-color 1s;
}

.element:hover {
    --my-color: red;
    /* Анимация работает! */
}
```

#### Практическое применение

```css
@property --gradient-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

.animated-gradient {
    background: linear-gradient(var(--gradient-angle), blue, red);
    animation: rotate-gradient 3s linear infinite;
}

@keyframes rotate-gradient {
    to {
        --gradient-angle: 360deg;
    }
}
```

## Выводы

### Ключевые тренды CSS 2018–2022

1. **Layout достиг зрелости:**
    - CSS Grid — baseline и широко используется
    - Flexbox gap — устранение top pain point (2021)
    - `aspect-ratio` — нативное решение (2021)
    - Subgrid и Container Queries — появились, но не достигли baseline

2. **Функциональное программирование в CSS:**
    - `min()`, `max()`, `clamp()` — baseline 2020
    - Responsive design без media queries

3. **Accessibility и UX:**
    - `prefers-color-scheme` — baseline 2020
    - `prefers-reduced-motion` — baseline 2019-2020
    - `:focus-visible` — baseline 2022

4. **Селекторы нового поколения:**
    - `:is()` и `:where()` — baseline 2021
    - `:has()` — появился в 2022, baseline после периода

5. **Интернационализация:**
    - Logical properties — baseline 2020
    - Writing mode aware layout

6. **Safari как сдерживающий фактор:**
    - Многие фичи достигли baseline только после поддержки Safari
    - Примеры: Flexbox gap (2021), `:focus-visible` (2022), `aspect-ratio` (2021)

### Практические рекомендации

**Что можно использовать сегодня (baseline к концу 2022):**

- CSS Grid, Flexbox с `gap`
- `aspect-ratio`
- `min()`, `max()`, `clamp()`
- `:is()`, `:where()`, `:focus-visible`
- Logical properties
- `prefers-color-scheme`, `prefers-reduced-motion`
- `overscroll-behavior`

**Что требует осторожности (не baseline в 2018-2022):**

- `subgrid` — нужен fallback
- Container Queries — нужен polyfill или progressive enhancement
- `:has()` — progressive enhancement
- `@property` — progressive enhancement, работает только в Chrome/Edge

**Стратегия progressive enhancement:**

```css
/* Базовый layout для всех */
.grid {
    display: grid;
    grid-template-columns: 1fr;
}

/* Улучшение для современных браузеров */
@supports (aspect-ratio: 1) {
    .grid-item {
        aspect-ratio: 16 / 9;
    }
}

/* Container Queries для самых новых */
@supports (container-type: inline-size) {
    .grid {
        container-type: inline-size;
    }

    @container (min-width: 400px) {
        .grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
```

**Источники:**

- MDN Web Docs: https://developer.mozilla.org/CSS
- Can I Use: https://caniuse.com
- CSS Working Group: https://github.com/w3c/csswg-drafts
- web.dev: https://web.dev
- CSS-Tricks: https://css-tricks.com
- Compat 2021: https://web.dev/compat2021
- Baseline (web-platform-dx): https://web-platform-dx.github.io/web-features/

- **Research ID:** `frontend-baseline-2018-2022`
- **Дата создания:** 17.11.2025
- **Методология:** DeepResearch-Claude
