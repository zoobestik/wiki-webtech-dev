---
title: CSS — изменения 2023 года
description: Комплексный обзор изменений в CSS за 2023 год — революционные технологии, Baseline-достижения, новые возможности стилизации и практические рекомендации
outline: deep
lastUpdated: true
---

# CSS — изменения 2023 года

- **Период**: 1 января 2023 — 31 декабря 2023
- **Версии браузеров**: Chrome/Edge 109–120, Firefox 109–121, Safari 16.3–17.2

## Обзор года

2023 год стал одним из самых революционных в истории CSS. Долгожданные возможности, над которыми разработчики работали годами, наконец достигли кросс-браузерной стабильности. Ключевые темы года:

- **Container Queries**: стали Baseline Newly Available (февраль 2023) — компонентно-ориентированная адаптивность
- **CSS Nesting**: нативная поддержка вложенности без препроцессоров
- **Селектор `:has()`**: достиг Baseline Widely Available (декабрь 2023) — решение проблемы «родительского селектора»
- **Subgrid**: стал Baseline Newly Available (сентябрь 2023) — выравнивание вложенных grid-элементов
- **Scroll-driven Animations**: анимации на основе позиции скролла вместо времени
- **CSS Color Level 4**: расширенные цветовые пространства (`oklch`, `color-mix`, relative colors)
- **View Transitions API**: плавные переходы между состояниями DOM
- **Interop 2023**: беспрецедентный фокус на CSS (15 из 26 focus areas)

Фокус Interop 2023 был сильно направлен на CSS, что обеспечило быструю межбраузерную совместимость ключевых функций.

## 1. Селекторы (Selectors)

### 1.1. Селектор `:has()` — родительский селектор

**Статус**: Baseline Widely Available (декабрь 2023)

Псевдокласс `:has()` решает давнюю проблему CSS — невозможность стилизовать родительские элементы на основе наличия определённых потомков. Это один из самых мощных селекторов, добавленных в CSS за последнее десятилетие.

**Поддержка браузерами**:

- Safari 15.4 — 14 марта 2022
- Chrome 105 — 30 августа 2022
- Firefox 121 — 19 декабря 2023 ⭐

**Практическое применение**:

```css
/* Адаптация layout на основе наличия контента */
section:has(img) {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

section:not(:has(img)) {
    display: block;
    max-inline-size: 60ch;
}

/* Валидация форм */
form:has(:invalid) {
    border: 2px solid red;
}

form:has(:valid) {
    border: 2px solid green;
}

/* Self-aware компоненты */
.card:not(:has(h2)) {
    padding-block-start: 1rem;
}

.card:has(> .card-image) {
    padding: 0;
}

/* Работа с медиа-элементами */
.video-container:has(video:playing) {
    aspect-ratio: 16/9;
    background: black;
}

.audio-player:has(audio:paused)::after {
    content: '⏸ Пауза';
}
```

**Кейсы использования**:

- Адаптация компонентов в зависимости от наличия контента
- Стилизация родителей при валидации форм
- Создание self-aware UI компонентов
- Реализация accordion без JavaScript
- Адаптивные карточки товаров

**Рекомендации**:

- Безопасно использовать в production с декабря 2023
- Один из самых мощных инструментов для компонентно-ориентированной разработки
- Позволяет создавать адаптивные компоненты без media queries

**Источники**:

- [MDN: :has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [Chrome for Developers: :has()](https://developer.chrome.com/blog/has-m105/)
- [WebKit Blog: :has() in Safari 15.4](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/)

### 1.2. Расширенный синтаксис `:nth-child()`

**Статус**: Широко доступен с 2023

Синтаксис `:nth-child(An+B of S)` позволяет применять An+B паттерн к подмножеству элементов, соответствующих селектору S.

**Поддержка браузерами**:

- Safari 9+ (с ранних версий)
- Chrome 111 — март 2023
- Firefox 113 — май 2023

**Практическое применение**:

```css
/* Выбрать каждый второй элемент с классом .highlight */
:nth-child(2n of .highlight) {
    background: yellow;
}

/* Выбрать первые три видимых элемента списка */
li:nth-child(-n + 3 of :not([hidden])) {
    font-weight: bold;
}

/* Zebra-striping для отфильтрованных элементов */
.item:nth-child(odd of .visible) {
    background: #f0f0f0;
}

/* Выделение последних двух элементов определённого типа */
.card:nth-child(n + 3 of .featured) {
    border-color: gold;
}
```

**Кейсы использования**:

- Стилизация подмножеств элементов
- Zebra-striping для динамически фильтрованных списков
- Выделение первых N видимых элементов
- Адаптивные таблицы с условным форматированием

**Источники**:

- [MDN: :nth-child()](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)
- [Chrome 111 Release Notes](https://developer.chrome.com/blog/new-in-chrome-111/)

### 1.3. Псевдокласс `:picture-in-picture`

**Статус**: Chrome 110 (февраль 2023)

Позволяет стилизовать медиа-элементы, находящиеся в режиме picture-in-picture.

**Практическое применение**:

```css
video:picture-in-picture {
    box-shadow: 0 0 0 3px red;
}

/* Адаптация UI при переходе в PiP */
#video-container:has(video:picture-in-picture) {
    display: none;
}

#video-container:has(video:picture-in-picture)::before {
    content: 'Видео воспроизводится в окне Picture-in-Picture';
    display: block;
    padding: 2rem;
    color: #666;
}
```

**Кейсы использования**:

- Индикация состояния PiP
- Адаптация UI при переходе в PiP режим
- Управление placeholder-элементами

**Источники**:

- [Chrome 110 Release Notes](https://developer.chrome.com/blog/new-in-chrome-110/)

### 1.4. Псевдоклассы `:user-valid` и `:user-invalid`

**Статус**: Chrome 119 (ноябрь 2023)

В отличие от `:valid` и `:invalid`, эти псевдоклассы срабатывают только после значительного взаимодействия пользователя с полем, обеспечивая улучшенный UX валидации форм.

**Практическое применение**:

```css
/* Стандартный подход: показывает ошибку сразу */
input:invalid {
    border-color: red; /* Появляется до ввода! */
}

/* Улучшенный подход: ошибка только после взаимодействия */
input:user-invalid {
    border-color: red;
}

input:user-valid {
    border-color: green;
}

/* Комбинирование с ::after для сообщений */
input:user-invalid + .error-message {
    display: block;
}

input:user-valid + .success-message {
    display: block;
}
```

**Кейсы использования**:

- Улучшенный UX валидации форм
- Избежание преждевременных ошибок валидации
- Валидация на лету после первого взаимодействия
- Адаптивные формы регистрации

**Рекомендации**:

- Использовать вместо `:invalid` для полей ввода
- Комбинировать с атрибутами `required`, `pattern`, `type`
- Требуется polyfill для старых браузеров

**Источники**:

- [Chrome 119 Release Notes](https://developer.chrome.com/blog/new-in-chrome-119/)
- [MDN: :user-invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid)

### 1.5. Улучшения псевдокласса `:lang()`

**Статус**: Firefox 114 (июнь 2023)

Теперь использует string-matching семантику (включая wildcards `*`) вместо prefix-matching, поддерживает списки языков через запятую.

**Практическое применение**:

```css
/* Китайский язык в любом регионе */
:lang('zh-*') {
    font-family: 'Noto Sans CJK SC', sans-serif;
}

/* Несколько языков одновременно */
:lang(en, fr, de) {
    quotes: '"' '"';
}

:lang(ru) {
    quotes: '«' '»';
}

/* Адаптация типографики */
:lang('ja') {
    line-height: 1.8;
    letter-spacing: 0.05em;
}
```

**Кейсы использования**:

- Гибкая типографика для разных языков
- Адаптация контента к локали
- Мультиязычные сайты
- Правильные кавычки для разных языков

**Источники**:

- [Firefox 114 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/114)

### 1.6. Псевдокласс `:dir()`

**Статус**: Safari 16.4 (март 2023)

Выбирает элементы на основе направления текста (LTR/RTL).

**Практическое применение**:

```css
:dir(rtl) {
    text-align: right;
}

:dir(ltr) {
    text-align: left;
}

/* Адаптация иконок */
.icon-arrow:dir(rtl) {
    transform: scaleX(-1);
}

/* Margin и padding */
.card:dir(rtl) {
    margin-inline-start: auto;
    margin-inline-end: 0;
}
```

**Кейсы использования**:

- Адаптация layout для RTL языков (арабский, иврит)
- Автоматическая корректировка направления
- Мультиязычные интерфейсы
- Logical properties с RTL

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 1.7. Медиа-псевдоклассы для видео/аудио

**Статус**: Safari 16.4 (март 2023)

Новые псевдоклассы для медиа-элементов, используемые в связке с `:has()`.

**Доступные псевдоклассы**:

- `:playing` — медиа воспроизводится
- `:paused` — медиа на паузе
- `:seeking` — идёт поиск позиции
- `:buffering` — идёт буферизация
- `:stalled` — загрузка остановлена
- `:muted` — звук отключён
- `:volume-locked` — громкость заблокирована

**Практическое применение**:

```css
/* Адаптация layout при воспроизведении */
.video-container:has(video:playing) {
    aspect-ratio: 16/9;
    background: black;
}

.video-container:has(video:paused) {
    filter: grayscale(0.5);
}

/* Индикатор буферизации */
video:buffering::after {
    content: 'Загрузка...';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

/* Визуальная индикация muted */
video:muted {
    border: 2px dashed orange;
}

/* Комбинирование состояний */
.audio-player:has(audio:playing:not(:muted)) .volume-icon {
    animation: pulse 1s infinite;
}
```

**Кейсы использования**:

- Динамические медиа-плееры
- Автоматическая индикация состояния
- Адаптивные UI для медиа
- Custom контролы для audio/video

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

## 2. Container Queries — контейнерные запросы

### 2.1. Основные возможности

**Статус**: Baseline Newly Available (февраль 2023)

Container Queries — одна из самых революционных возможностей в истории CSS. Позволяют стилизовать элементы на основе размера их контейнера, а не viewport. Это фундаментальный сдвиг парадигмы от page-based к component-based адаптивности.

**Поддержка браузерами**:

- Safari 16.0 — 12 сентября 2022
- Chrome 106 — 27 сентября 2022
- Firefox 110 — 14 февраля 2023 ⭐

**Основные свойства**:

- `container-type` — определяет тип контейнера
- `container-name` — именует контейнер
- `container` — shorthand для type и name

**Практическое применение**:

```css
/* Определение контейнера */
.card-container {
    container-type: inline-size;
    container-name: card;
}

/* Запрос к контейнеру */
@container card (min-width: 400px) {
    .card {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

    .card__image {
        aspect-ratio: 16/9;
    }
}

@container card (max-width: 399px) {
    .card {
        display: block;
    }

    .card__image {
        aspect-ratio: 4/3;
    }
}

/* Shorthand синтаксис */
.sidebar {
    container: sidebar / inline-size;
}

@container sidebar (width > 300px) {
    .widget {
        padding: 2rem;
        display: grid;
        grid-template-columns: auto 1fr;
    }
}

@container sidebar (width <= 300px) {
    .widget {
        padding: 1rem;
        display: block;
    }
}
```

**Container Query Length Units**:

```css
.card {
    /* Адаптивный font-size на основе контейнера */
    font-size: clamp(1rem, 2.5cqi, 2rem);
    padding: 2cqi;
    gap: 1cqmin;
}

.responsive-heading {
    /* Масштабирование относительно контейнера */
    font-size: calc(3cqw + 1rem);
    margin-block: 2cqh;
}

/* Доступные единицы */
.demo {
    width: 50cqw; /* 50% ширины контейнера */
    height: 30cqh; /* 30% высоты контейнера */
    padding: 2cqi; /* 2% inline size контейнера */
    margin: 1cqb; /* 1% block size контейнера */
    gap: 5cqmin; /* 5% меньшего измерения */
    border-radius: 2cqmax; /* 2% большего измерения */
}
```

**Кейсы использования**:

- Truly responsive компоненты независимо от расположения
- Адаптивные карточки товаров в grid/flex
- Виджеты в sidebar разной ширины
- Компонентные библиотеки с встроенной адаптивностью
- Модульные UI-системы

**Рекомендации**:

- Безопасно использовать в production с февраля 2023
- Комбинировать с `cq*` единицами для fluid typography
- Использовать именованные контейнеры для сложных layout
- Один из главных инструментов для компонентно-ориентированной разработки

**Interop 2023**: Container Queries были ключевым focus area.

**Источники**:

- [MDN: CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [web.dev: Container Queries](https://web.dev/articles/container-queries)
- [Firefox 110 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/110)

### 2.2. Containment — контейнмент

**Статус**: Interop 2023 focus area

Свойство `contain` определяет, как элемент изолирует своё содержимое от остального документа для оптимизации производительности.

**Практическое применение**:

```css
.card {
    /* Изоляция layout и paint */
    contain: layout paint;
}

.widget {
    /* Полная изоляция */
    contain: strict;
}

.list-item {
    /* Изоляция содержимого (без size) */
    contain: content;
}

/* Значения */
.examples {
    contain: size; /* Размер не зависит от потомков */
    contain: layout; /* Изоляция layout */
    contain: paint; /* Изоляция отрисовки */
    contain: style; /* Изоляция стилей */
    contain: strict; /* size layout paint style */
    contain: content; /* layout paint style */
}
```

**Кейсы использования**:

- Оптимизация производительности рендеринга
- Изоляция компонентов
- Подготовка к container queries
- Виртуализация больших списков

**Источники**:

- [MDN: contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)

### 2.3. `contain-intrinsic-size`

**Статус**: Firefox 117 (сентябрь 2023), Safari 17 (сентябрь 2023)

Позволяет указать intrinsic размер элемента с size containment, предотвращая layout shift.

**Практическое применение**:

```css
.lazy-loaded {
    content-visibility: auto;
    contain-intrinsic-size: auto 300px;
}

/* Grid/multicolumn layout с пустым контентом */
.grid-item {
    contain-intrinsic-size: auto none;
}

/* Виртуализация списков */
.virtual-list-item {
    contain: size layout paint;
    contain-intrinsic-size: 1px 50px;
}
```

**Кейсы использования**:

- Виртуализация списков
- Ленивая загрузка контента
- Стабильный layout при загрузке
- Предотвращение Cumulative Layout Shift (CLS)

**Источники**:

- [Firefox 117 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/117)
- [Safari 17 Release Notes](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

## 3. CSS Nesting — вложенность

### 3.1. Нативный CSS Nesting

**Статус**: Широко доступен с середины 2023

Нативная поддержка вложенных правил в CSS, аналогично препроцессорам (Sass, Less). Реализован Option 3 из спецификации.

**Поддержка браузерами**:

- Safari Technology Preview 162 — январь 2023
- Chrome 112 — 4 апреля 2023
- Firefox 117 — 26 сентября 2023
- Chrome 120 — relaxed syntax (декабрь 2023)

**Базовый синтаксис** (Chrome 112–119):

```css
.card {
    padding: 1rem;
    background: white;
    border-radius: 8px;

    /* Вложенные селекторы должны начинаться с символа */
    & h2 {
        font-size: 1.5rem;
        margin: 0 0 0.5rem;
    }

    & .subtitle {
        color: gray;
        font-size: 0.875rem;
    }

    /* Селекторы классов, ID, атрибутов, псевдоклассов */
    & .description {
        line-height: 1.6;
    }

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &[data-featured] {
        border: 2px solid gold;
    }
}
```

**Relaxed синтаксис** (Chrome 120+, декабрь 2023):

```css
.card {
    padding: 1rem;

    /* Амперсанд опционален для большинства случаев */
    h2 {
        font-size: 1.5rem;
    }

    a {
        color: blue;

        &:hover {
            text-decoration: underline;
        }
    }

    /* Для element селекторов амперсанд больше не нужен */
    img {
        max-width: 100%;
        height: auto;
    }
}
```

**Nesting selector `&`**:

```css
.button {
    background: blue;
    color: white;
    padding: 0.5rem 1rem;

    /* Compound селекторы */
    &.primary {
        background: darkblue;
    }

    &.secondary {
        background: gray;
    }

    /* Родитель в конце */
    .dark-theme & {
        background: lightblue;
    }

    /* Множественные родители */
    &:hover,
    &:focus {
        outline: 2px solid;
        outline-offset: 2px;
    }

    /* Модификаторы */
    &--large {
        padding: 1rem 2rem;
        font-size: 1.25rem;
    }
}
```

**At-rules внутри правил**:

```css
.component {
    display: block;

    @media (width >= 768px) {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

    @supports (container-type: inline-size) {
        container: component / inline-size;
    }

    @container (width > 600px) {
        padding: 2rem;
    }
}
```

**Кейсы использования**:

- Организация кода по компонентам
- Уменьшение повторений селекторов
- Упрощение рефакторинга
- Локальность стилей
- BEM без длинных имён классов

**Ограничения начального синтаксиса** (Chrome 112–119):

- Вложенные селекторы должны начинаться с символа (`.`, `#`, `:`, `[`, `>`, `+`, `~`, `*`, `&`)
- Селекторы типов элементов требуют `&` или обёртку в `:is()`

**Рекомендации**:

- Безопасно использовать в production с сентября 2023
- С декабря 2023 (Chrome 120) доступен relaxed синтаксис
- Один из самых ожидаемых features в CSS

**Источники**:

- [WebKit: CSS Nesting in Safari TP](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/)
- [Chrome 112 Release Notes](https://developer.chrome.com/blog/new-in-chrome-112/)
- [Firefox 117 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/117)
- [Chrome 120: Relaxed syntax](https://developer.chrome.com/blog/new-in-chrome-120/)

## 4. At-правила (At-rules)

### 4.1. `@scope` — scoped styles

**Статус**: Chrome 118 (октябрь 2023)

Позволяет ограничить область действия стилей определённым поддеревом DOM с поддержкой proximity-based приоритета.

**Практическое применение**:

```css
/* Базовое использование */
@scope (.card) {
    h2 {
        color: blue;
    }

    p {
        line-height: 1.6;
    }
}

/* С исключениями (donut scope) */
@scope (.article) to (.sidebar) {
    /* Применяется к .article, но не к .sidebar и её потомкам */
    a {
        color: darkblue;
    }

    img {
        border-radius: 8px;
    }
}

/* Proximity-based приоритет */
@scope (.theme-pink) {
    a {
        color: hotpink;
    }
}

@scope (.theme-blue) {
    a {
        color: skyblue;
    }
}

/* Если элемент внутри обоих scope, применится ближайший */

/* Scoped counters */
@scope (.chapter) {
    h2 {
        counter-increment: heading;
    }

    h2::before {
        content: counter(heading) '. ';
    }
}
```

**Кейсы использования**:

- Изоляция компонентных стилей
- Темизация отдельных секций
- Микрофронтенды
- Избежание конфликтов имён
- Scoped CSS без CSS Modules

**Рекомендации**:

- Доступно только в Chromium (на конец 2023)
- Альтернатива: CSS Modules, Shadow DOM
- Мощный инструмент для изоляции стилей

**Источники**:

- [Chrome 118 Release Notes](https://developer.chrome.com/blog/new-in-chrome-118/)
- [MDN: @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope)

### 4.2. `@layer` — cascade layers

**Статус**: Baseline Widely Available (с марта 2022)

Управление порядком каскада через явные слои. Широко использовался в 2023.

**Поддержка браузерами**:

- Safari 15.4 — март 2022
- Chrome 99 — март 2022
- Firefox 97 — февраль 2022

**Практическое применение**:

```css
/* Определение порядка слоёв */
@layer reset, base, components, utilities;

@layer reset {
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
}

@layer base {
    body {
        font-family: system-ui, sans-serif;
        line-height: 1.5;
    }

    h1,
    h2,
    h3 {
        line-height: 1.2;
    }
}

@layer components {
    .button {
        padding: 0.5rem 1rem;
        border-radius: 4px;
        background: blue;
        color: white;
    }

    .card {
        padding: 1rem;
        border: 1px solid #ccc;
    }
}

@layer utilities {
    .text-center {
        text-align: center;
    }
    .mt-1 {
        margin-top: 0.5rem;
    }
}

/* Unlayered стили имеют наивысший приоритет */
.special {
    color: red;
}
```

**Вложенные слои**:

```css
@layer framework {
    @layer base {
        h1 {
            font-size: 2rem;
        }
    }

    @layer components {
        .card {
            background: white;
        }
    }
}

/* Доступ извне */
@layer framework.components {
    .button {
        border: 1px solid;
    }
}
```

**Кейсы использования**:

- Управление приоритетом без `!important`
- Организация больших кодовых баз
- Интеграция сторонних библиотек
- Predictable cascade
- Фреймворки и дизайн-системы

**Источники**:

- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

### 4.3. `@property` — custom properties с типами

**Статус**: Safari 16.4 (март 2023), ранее Chrome/Edge

Определение кастомных CSS-переменных с типизацией, начальными значениями и наследованием. Позволяет анимировать custom properties.

**Поддержка браузерами**:

- Chrome 85 — август 2020
- Safari 16.4 — 27 марта 2023
- Firefox — не поддерживается (на конец 2023)

**Практическое применение**:

```css
@property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

.gradient-bg {
    background: linear-gradient(var(--gradient-angle), blue, red);
    animation: rotate 3s linear infinite;
}

@keyframes rotate {
    to {
        --gradient-angle: 360deg;
    }
}

/* Типизированные цвета */
@property --theme-color {
    syntax: '<color>';
    initial-value: blue;
    inherits: true;
}

.element {
    background: var(--theme-color);
    transition: --theme-color 0.3s;
}

.element:hover {
    --theme-color: red;
}

/* Числовые значения */
@property --progress {
    syntax: '<number>';
    initial-value: 0;
    inherits: false;
}

.progress-bar {
    width: calc(var(--progress) * 100%);
    transition: --progress 0.5s;
}
```

**Доступные типы данных (syntax)**:

- `<length>`, `<number>`, `<percentage>`
- `<color>`, `<angle>`, `<time>`
- `<image>`, `<url>`
- `<transform-function>`, `<custom-ident>`
- `*` — любое значение

**Кейсы использования**:

- Анимация кастомных свойств
- Валидация значений переменных
- Type-safe CSS переменные
- Улучшенная производительность анимаций
- Градиентные анимации

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)
- [MDN: @property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)

### 4.4. `@counter-style` — кастомные счётчики

**Статус**: Safari 17 (сентябрь 2023)

Создание пользовательских стилей для нумерации списков.

**Практическое применение**:

```css
@counter-style thumbs {
    system: cyclic;
    symbols: 👍;
    suffix: ' ';
}

@counter-style japanese {
    system: alphabetic;
    symbols: あ い う え お か き く け こ;
}

@counter-style roman-upper {
    system: upper-roman;
    range: 1 infinite;
}

ol.custom {
    list-style: thumbs;
}

ol.japanese {
    list-style: japanese;
}
```

**Кейсы использования**:

- Локализация нумерации
- Кастомные маркеры списков
- Декоративные счётчики
- Мультиязычные списки

**Источники**:

- [Safari 17 Release Notes](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

### 4.5. `@import` с `supports()`

**Статус**: Firefox 115 (июль 2023)

Условный импорт стилей на основе поддержки функций.

**Практическое применение**:

```css
@import url('modern-layout.css') supports(display: grid);
@import url('fallback.css') supports(not (display: grid));

/* Комбинация с media query */
@import url('advanced.css') supports(container-type: inline-size) screen and (min-width: 768px);

/* Множественные условия */
@import url('cutting-edge.css') supports(selector(:has(*))) supports(display: grid)
    (prefers-color-scheme: dark);
```

**Кейсы использования**:

- Прогрессивное улучшение
- Feature-based загрузка стилей
- Оптимизация загрузки
- Условная загрузка polyfills

**Источники**:

- [Firefox 115 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/115)

### 4.6. `@page` с именованными страницами

**Статус**: Firefox 110 (февраль 2023)

Именование страниц для печати с возможностью принудительных разрывов.

**Практическое применение**:

```css
@page chapter {
    margin: 2cm;

    @top-center {
        content: 'Глава ' counter(chapter);
    }
}

@page appendix {
    margin: 1.5cm;

    @bottom-right {
        content: 'Приложение';
    }
}

.chapter-start {
    page: chapter;
    page-break-before: always;
}

.appendix-start {
    page: appendix;
    page-break-before: always;
}
```

**Кейсы использования**:

- Сложные print стили
- Книги и документы
- Разные стили для разных секций
- Профессиональная печать

**Источники**:

- [Firefox 110 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/110)

### 4.7. `@starting-style` — entry animations

**Статус**: Chrome 117 (сентябрь 2023)

Определение начальных стилей для анимации появления из `display: none` или в top layer.

**Практическое применение**:

```css
.dialog {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s;

    @starting-style {
        opacity: 0;
        transform: scale(0.9);
    }
}

/* При появлении элемент плавно проявляется от 0 до 1 */

.modal {
    translate: 0 0;
    transition:
        translate 0.4s,
        opacity 0.4s;

    @starting-style {
        translate: 0 -100vh;
        opacity: 0;
    }
}
```

**Кейсы использования**:

- Entry animations для dialogs
- Плавное появление модалок
- Анимация из top layer
- Transitions без JavaScript

**Источники**:

- [Chrome 117 Release Notes](https://developer.chrome.com/blog/new-in-chrome-117/)

## 5. Цвета (Colors)

### 5.1. CSS Color Level 4

**Статус**: Chrome 111 (март 2023), Firefox 113 (май 2023), Safari 15+ (частично ранее)

CSS Color Level 4 принёс революционные изменения в работу с цветом: новые цветовые пространства, перцептивно-единообразные функции и расширенные возможности.

**Новые цветовые пространства**:

- `srgb` — стандартное RGB
- `srgb-linear` — линейное sRGB
- `display-p3` — широкая гамма (Apple displays)
- `rec2020` — Rec. 2020 (HDR TV)
- `a98-rgb` — Adobe RGB
- `prophoto-rgb` — ProPhoto RGB
- `xyz`, `xyz-d50`, `xyz-d65` — CIE XYZ

**Функция `color()`**:

```css
.element {
    /* Display P3 для широкой гаммы */
    background: color(display-p3 0.8 0.2 0.5);

    /* С альфа-каналом */
    color: color(rec2020 0.5 0.7 0.2 / 0.8);

    /* sRGB */
    border-color: color(srgb 1 0 0);
}
```

**`lab()` и `lch()` (CIE LAB)**:

```css
.element {
    /* LAB: lightness, a, b */
    background: lab(50% 20 -30);

    /* LCH: lightness, chroma, hue */
    background: lch(70% 45 270);
}
```

**`oklab()` и `oklch()` (улучшенный LAB)**:

```css
.element {
    /* Более перцептивно-единообразный */
    background: oklab(60% 0.15 -0.1);

    /* Oklch — полярная форма (рекомендуется) */
    background: oklch(70% 0.2 230);
}

/* Преимущества oklch */
.gradient {
    /* Перцептивно-единообразный градиент */
    background: linear-gradient(oklch(70% 0.2 230), oklch(70% 0.2 280));
}

.palette {
    /* Создание палитры с фиксированной lightness */
    --color-1: oklch(70% 0.2 0);
    --color-2: oklch(70% 0.2 60);
    --color-3: oklch(70% 0.2 120);
    --color-4: oklch(70% 0.2 180);
}
```

**`color-mix()` — смешивание цветов**:

```css
.element {
    /* Смешать 25% blue в white */
    background: color-mix(in oklch, white 75%, blue);

    /* В разных цветовых пространствах */
    color: color-mix(in srgb, red, yellow 50%);
    border: 1px solid color-mix(in lab, purple, transparent 20%);

    /* С currentColor */
    border-color: color-mix(in srgb, currentColor 20%, transparent);

    /* Создание оттенков */
    --primary: blue;
    --primary-light: color-mix(in oklch, var(--primary), white 30%);
    --primary-dark: color-mix(in oklch, var(--primary), black 30%);
}
```

**Поддержка браузерами**:

- Chrome 111 — март 2023: все функции
- Firefox 113 — май 2023: `color()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `color-mix()`
- Safari 15+ — поддержка с ранних версий

**Кейсы использования**:

- HDR и широкая цветовая гамма
- Перцептивно-единообразные градиенты
- Программное создание палитр
- Тонкая настройка цветов
- Доступные контрастные варианты

**Рекомендации**:

- Использовать `oklch` для новых проектов
- `color-mix()` для создания оттенков
- Display P3 для HDR-дисплеев
- Fallback для старых браузеров

**Источники**:

- [Chrome 111 Release Notes](https://developer.chrome.com/blog/new-in-chrome-111/)
- [Firefox 113 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/113)
- [web.dev: High Definition CSS Color Guide](https://web.dev/articles/high-definition-css-color-guide)

### 5.2. Relative Color Syntax

**Статус**: Chrome 119 (ноябрь 2023), Safari 16.4 (март 2023)

Создание цветовых вариаций на основе существующего цвета — одна из самых мощных возможностей CSS Color Level 4.

**Практическое применение**:

```css
:root {
    --primary: oklch(60% 0.2 230);

    /* Светлее на 20% */
    --primary-light: oklch(from var(--primary) calc(l * 1.2) c h);

    /* Темнее */
    --primary-dark: oklch(from var(--primary) calc(l * 0.8) c h);

    /* Другой оттенок */
    --accent: oklch(from var(--primary) l c calc(h + 60));

    /* Полупрозрачный */
    --primary-alpha: oklch(from var(--primary) l c h / 0.5);

    /* Desaturated */
    --primary-muted: oklch(from var(--primary) l calc(c * 0.5) h);
}

/* С именованными цветами */
.element {
    background: rgb(from blue r g b / 0.5);
    border-color: hsl(from magenta h s calc(l * 0.8));
}

/* Создание палитры из одного цвета */
.palette {
    --base: oklch(70% 0.2 230);

    --shade-100: oklch(from var(--base) 95% c h);
    --shade-200: oklch(from var(--base) 90% c h);
    --shade-300: oklch(from var(--base) 80% c h);
    --shade-400: oklch(from var(--base) 70% c h);
    --shade-500: var(--base);
    --shade-600: oklch(from var(--base) 60% c h);
    --shade-700: oklch(from var(--base) 50% c h);
    --shade-800: oklch(from var(--base) 40% c h);
    --shade-900: oklch(from var(--base) 30% c h);
}
```

**Доступные каналы по пространствам**:

- `rgb()`: `r`, `g`, `b`, `alpha`
- `hsl()`: `h`, `s`, `l`, `alpha`
- `hwb()`: `h`, `w`, `b`, `alpha`
- `lab()`, `oklab()`: `l`, `a`, `b`, `alpha`
- `lch()`, `oklch()`: `l`, `c`, `h`, `alpha`

**Кейсы использования**:

- Динамические цветовые палитры
- Темы с одним базовым цветом
- Автоматическая генерация оттенков
- Доступные контрастные варианты
- Adaptive color systems

**Рекомендации**:

- Использовать с `oklch` для предсказуемых результатов
- Генерация палитр из единого brand color
- Создание hover/active состояний

**Источники**:

- [Chrome 119 Release Notes](https://developer.chrome.com/blog/new-in-chrome-119/)
- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)
- [MDN: Relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors)

### 5.3. System Color Keywords

**Статус**: Safari 16.4 (март 2023)

CSS-переменные, представляющие системные цвета ОС/браузера, адаптирующиеся к light/dark mode.

**Практическое применение**:

```css
.button {
    background: Canvas;
    color: CanvasText;
    border: 1px solid ButtonBorder;
}

.link {
    color: LinkText;
}

.link:visited {
    color: VisitedText;
}

/* Автоматически адаптируются к dark mode */
.native-looking {
    background: ButtonFace;
    color: ButtonText;
    border: 1px solid ButtonBorder;
}
```

**Кейсы использования**:

- Native-looking UI
- Автоматическая адаптация к теме системы
- Доступность в high contrast режиме
- Cross-platform consistency

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 5.4. Media Query: `color-gamut`

**Статус**: Firefox 110 (февраль 2023)

Определение возможностей цветовой гаммы дисплея.

**Практическое применение**:

```css
@media (color-gamut: srgb) {
    /* Стандартная гамма */
    .image {
        filter: none;
    }
}

@media (color-gamut: p3) {
    /* Широкая гамма */
    .vibrant {
        color: color(display-p3 1 0.5 0);
        background: color(display-p3 0 1 0.8);
    }
}

@media (color-gamut: rec2020) {
    /* Очень широкая гамма (HDR) */
    .hdr-content {
        background: color(rec2020 1 0 0);
    }
}
```

**Кейсы использования**:

- Оптимизация для HDR дисплеев
- Прогрессивное улучшение цвета
- Визуальная оптимизация

**Источники**:

- [Firefox 110 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/110)

## 6. Типографика (Typography)

### 6.1. Новые единицы измерения: `lh` и `rlh`

**Статус**: Chrome 109 (январь 2023), Safari 16.4 (март 2023)

Единицы измерения на основе line-height.

**Описание**:

- `lh` — равен `line-height` элемента
- `rlh` — равен `line-height` корневого элемента

**Практическое применение**:

```css
.textarea {
    /* Высота в 10 строк */
    height: 10lh;
    line-height: 1.5;
}

.sidebar {
    /* Padding на основе line-height */
    padding-block: 2lh;
}

.card {
    /* Вертикальный ритм */
    margin-block: 1rlh;
    padding: 2rlh;
}

/* Baseline grid */
.content * {
    margin-block: 1rlh;
}
```

**Кейсы использования**:

- Вертикальный ритм
- Baseline grid
- Размеры на основе типографики
- Консистентный spacing

**Источники**:

- [Chrome 109 Release Notes](https://developer.chrome.com/blog/new-in-chrome-109/)
- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 6.2. `hyphenate-limit-chars`

**Статус**: Chrome 109 (январь 2023)

Минимальное количество символов в словах для переноса.

**Практическое применение**:

```css
p {
    hyphens: auto;
    /* мин. длина слова, мин. до переноса, мин. после */
    hyphenate-limit-chars: 8 4 4;
}

/* Только минимальная длина */
.text {
    hyphenate-limit-chars: 10;
}

/* Для узких колонок */
.narrow-column {
    hyphens: auto;
    hyphenate-limit-chars: 6 3 3;
}
```

**Кейсы использования**:

- Контроль качества переносов
- Типографика для узких колонок
- Избежание некрасивых переносов
- Улучшенная читаемость

**Источники**:

- [Chrome 109 Release Notes](https://developer.chrome.com/blog/new-in-chrome-109/)

### 6.3. `font-size-adjust`

**Статус**: Safari 16.4 (март 2023), Safari 17 расширения (сентябрь 2023)

Сохранение видимого размера текста при смене шрифтов.

**Safari 16.4** (базовая поддержка):

```css
body {
    font-family: 'Preferred Font', Arial, sans-serif;
    /* Корректировка на основе x-height */
    font-size-adjust: 0.5;
}
```

**Safari 17** (расширенная):

```css
.text {
    /* Автоматически из шрифта */
    font-size-adjust: from-font;

    /* Конкретная метрика */
    font-size-adjust: ex-height 0.5;
    font-size-adjust: cap-height 0.7;
    font-size-adjust: ch-width 0.5;
    font-size-adjust: ic-width 1;
    font-size-adjust: ic-height 1;
}
```

**Кейсы использования**:

- Консистентный размер при fallback шрифтах
- Мультиязычная типографика
- Улучшенная читаемость
- Web font loading

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)
- [Safari 17 Release Notes](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

### 6.4. `text-wrap: balance`

**Статус**: Chrome 114 (май 2023)

Сбалансированный перенос строк для заголовков (максимум 4 строки).

**Практическое применение**:

```css
h1 {
    text-wrap: balance;
    max-inline-size: 50ch;
}

/* Для коротких блоков текста */
.headline {
    text-wrap: balance;
}

.card-title {
    text-wrap: balance;
    max-inline-size: 30ch;
}
```

**Ограничения**:

- Максимум 4 строки (производительность)
- Только для block-level элементов

**Кейсы использования**:

- Заголовки без «висячих» слов
- Улучшенная читаемость
- Типографское качество
- Landing pages

**Источники**:

- [Chrome 114 Release Notes](https://developer.chrome.com/blog/new-in-chrome-114/)

### 6.5. `text-transform` расширения

**Статус**: Safari 17 (сентябрь 2023)

Новые значения для CJK типографики.

**Практическое применение**:

```css
.japanese {
    /* Полноширинные символы */
    text-transform: full-width;

    /* Полноразмерная кана */
    text-transform: full-size-kana;

    /* Множественные значения */
    text-transform: full-width full-size-kana;
}
```

**Кейсы использования**:

- Японская/китайская типографика
- Вертикальное письмо
- Мультиязычные сайты

**Источники**:

- [Safari 17 Release Notes](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

### 6.6. `initial-letter`

**Статус**: Chrome 110 (февраль 2023)

Drop caps — буквица в начале абзаца.

**Практическое применение**:

```css
p::first-letter {
    /* Высота в 3 строки */
    initial-letter: 3;

    /* Высота и глубина */
    initial-letter: 3 2;

    /* Стилизация */
    font-weight: bold;
    color: crimson;
    margin-right: 0.5em;
}

.chapter-start::first-letter {
    initial-letter: 4;
    font-family: Georgia, serif;
    color: darkblue;
}
```

**Кейсы использования**:

- Журнальная вёрстка
- Декоративные заголовки
- Традиционная типографика
- Editorial design

**Источники**:

- [Chrome 110 Release Notes](https://developer.chrome.com/blog/new-in-chrome-110/)

### 6.7. Поддержка шрифтов: `@supports font-tech()` и `font-format()`

**Статус**: Safari 17 (сентябрь 2023)

Условная загрузка шрифтов на основе поддержки технологий.

**Практическое применение**:

```css
@supports font-tech(color-COLRv1) {
    @font-face {
        font-family: 'Color Emoji';
        src: url('emoji-color.woff2') format('woff2') tech(color-COLRv1);
    }
}

@font-face {
    font-family: 'Variable Font';
    src: url('font-var.woff2') format('woff2') tech(variations);
}

/* Множественные технологии */
@font-face {
    font-family: 'Modern Font';
    src:
        url('font.woff2') format('woff2') tech(variations, features-opentype),
        url('font.woff') format('woff');
}
```

**Доступные технологии**:

- `color-COLRv0`, `color-COLRv1`
- `color-sbix`, `color-CBDT`
- `variations` (variable fonts)
- `features-opentype`, `features-aat`
- `palettes` (color palettes)

**Кейсы использования**:

- Прогрессивная загрузка шрифтов
- Оптимизация для возможностей браузера
- Fallback стратегии
- Variable fonts

**Источники**:

- [Safari 17 Release Notes](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

### 6.8. Математические свойства (MathML)

**Chrome 109** (январь 2023):

- `math-depth`
- `math-shift`
- `math-style`
- `display: math`

**Firefox 117** (сентябрь 2023):

- `math-style`
- `math-depth`
- `font-size: math`

**Практическое применение**:

```css
math {
    font-size: math;
    math-style: compact;
}

mfrac {
    math-depth: auto-add;
}
```

**Кейсы использования**:

- Научные публикации
- Образовательный контент
- Математическая нотация в HTML
- MathML Core

**Источники**:

- [Chrome 109 Release Notes](https://developer.chrome.com/blog/new-in-chrome-109/)
- [Firefox 117 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/117)

### 6.9. Font Synthesis

**Статус**: Firefox 118 (сентябрь 2023)

Контроль синтеза шрифтовых стилей.

**Практическое применение**:

```css
@font-face {
    font-family: 'MyFont';
    src: url('font.woff2');
    /* Запретить синтез bold/italic */
    font-synthesis: none;
}

.element {
    /* Запретить синтез позиционных вариантов */
    font-synthesis-position: none;

    /* Shorthand с position */
    font-synthesis: weight style position;
}
```

**Кейсы использования**:

- Контроль качества отображения
- Предотвращение fake bold/italic
- Типографская точность

**Источники**:

- [Firefox 118 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/118)

## 7. Layout — макетирование

### 7.1. Subgrid

**Статус**: Baseline Newly Available (15 сентября 2023)

Subgrid — одна из самых ожидаемых возможностей Grid Layout. Позволяет вложенным grid-элементам наследовать треки, шаблоны и имена линий родительского grid.

**Поддержка браузерами**:

- Firefox 71 — 3 декабря 2019
- Safari 16 — 12 сентября 2022
- Chrome 117 — 12 сентября 2023 ⭐
- Edge 117 — 12 сентября 2023 ⭐

**Практическое применение**:

```css
.parent-grid {
    display: grid;
    grid-template-columns:
        [full-start] 1fr
        [content-start] 2fr
        [content-end] 1fr
        [full-end];
    grid-template-rows: auto auto auto;
    gap: 1rem;
}

.nested-grid {
    /* Наследует columns от родителя */
    grid-column: full-start / full-end;
    display: grid;
    grid-template-columns: subgrid;

    /* Дочерние элементы используют родительские линии */
}

.child {
    grid-column: content-start / content-end;
}

/* Subgrid в обоих направлениях */
.card {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
}

/* Card grid с общим выравниванием */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: auto 1fr auto;
    gap: 1rem;
}

.card {
    display: grid;
    grid-template-rows: subgrid;
    /* Все карточки имеют согласованные высоты header, content, footer */
}
```

**Кейсы использования**:

- Выравнивание вложенных компонентов
- Card grid с общим выравниванием
- Сложные layout с согласованностью
- Дизайн-системы с макро-grid
- Формы с aligned labels

**Рекомендации**:

- Безопасно использовать в production с сентября 2023
- Мощный инструмент для сложных layout
- Альтернатива: display: contents (с ограничениями)

**Interop 2023**: Subgrid был focus area для Chromium реализации.

**Источники**:

- [web.dev: Subgrid](https://web.dev/articles/css-subgrid)
- [Chrome 117 Release Notes](https://developer.chrome.com/blog/new-in-chrome-117/)
- [MDN: Subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid)

### 7.2. `margin-trim`

**Статус**: Safari 16.4 (март 2023)

Удаляет margins дочерних элементов на краях контейнера.

**Практическое применение**:

```css
.container {
    margin-trim: block;
    /* Убирает margin-top первого и margin-bottom последнего */
}

.container {
    margin-trim: inline;
    /* Убирает margin-left первого и margin-right последнего */
}

.container {
    margin-trim: block-start;
    margin-trim: block-end;
    margin-trim: inline-start;
    margin-trim: inline-end;
}
```

**Кейсы использования**:

- Устранение «double margin» проблемы
- Чистые края контейнеров
- Упрощение margin collapsing

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 7.3. Flexbox и Grid улучшения (Interop 2023)

**Статус**: Interop 2023 focus areas

Улучшение согласованности реализаций Flexbox и Grid между браузерами.

**Ключевые области**:

- Intrinsic sizing в Grid
- Alignment в Flexbox
- `aspect-ratio` взаимодействие
- Gap в Flexbox/Grid
- Baseline alignment

**Кейсы использования**:

- Более предсказуемое поведение
- Меньше браузерных багов
- Надёжные layout решения

**Источники**:

- [web.dev: Interop 2023](https://web.dev/blog/interop-2023/)

## 8. Математические функции (Math Functions)

### 8.1. Тригонометрические функции

**Статус**: Chrome 111 (март 2023)

**Доступные функции**:

- `sin()`, `cos()`, `tan()`
- `asin()`, `acos()`, `atan()`
- `atan2()`

**Практическое применение**:

```css
.element {
    /* Круговое движение */
    --angle: 45deg;
    translate: calc(cos(var(--angle)) * 100px) calc(sin(var(--angle)) * 100px);
}

.spinner {
    /* Равномерное распределение по кругу */
    --items: 8;
    --index: 3;
    --angle: calc(360deg / var(--items) * var(--index));

    transform: rotate(var(--angle)) translateY(-50px);
}

.wave {
    /* Волновой эффект */
    transform: translateY(calc(sin(var(--progress) * 3.14159) * 20px));
}

/* Круговое меню */
.menu-item {
    --total: 6;
    --i: 1;
    --radius: 100px;
    --angle: calc(360deg / var(--total) * var(--i));

    position: absolute;
    left: calc(50% + cos(var(--angle)) * var(--radius));
    top: calc(50% + sin(var(--angle)) * var(--radius));
}
```

**Кейсы использования**:

- Круговые layouts
- Диаграммы и графики
- Волновые анимации
- Геометрические паттерны
- Радиальные меню

**Источники**:

- [Chrome 111 Release Notes](https://developer.chrome.com/blog/new-in-chrome-111/)

### 8.2. Расширенные math функции

**Статус**: Firefox 118 (сентябрь 2023)

**Новые функции**:

- `abs()` — абсолютное значение
- `sign()` — знак числа (-1, 0, 1)
- `round()`, `mod()`, `rem()` — округление и остатки
- `pow()`, `sqrt()`, `hypot()` — степени и корни
- `log()`, `exp()` — логарифмы и экспоненты

**Практическое применение**:

```css
.element {
    /* Абсолютное значение */
    width: abs(-100px); /* 100px */

    /* Округление */
    margin: round(15.7px); /* 16px */

    /* Остаток */
    padding: mod(25px, 10px); /* 5px */

    /* Степень */
    font-size: calc(pow(1.2, 3) * 1rem); /* 1.728rem */

    /* Квадратный корень */
    width: calc(sqrt(144) * 1px); /* 12px */

    /* Гипотенуза */
    diagonal: hypot(3px, 4px); /* 5px */
}

.logarithmic {
    /* Логарифмическая шкала */
    --value: 1000;
    width: calc(log(var(--value)) * 20px);
}

/* Экспоненциальная шкала */
.exponential {
    --level: 3;
    opacity: calc(exp(var(--level) * -0.5));
}
```

**Кейсы использования**:

- Математические вычисления в CSS
- Логарифмические шкалы
- Физические симуляции
- Сложные анимации
- Data visualization

**Источники**:

- [Firefox 118 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/118)

### 8.3. `calc()` с `infinity` и `NaN`

**Статус**: Firefox 114 (июнь 2023)

Поддержка математических констант в `calc()`.

**Практическое применение**:

```css
.element {
    /* Использование infinity */
    width: min(100%, calc(infinity * 1px)); /* всегда 100% */

    /* Проверка на NaN */
    --value: calc(0 / 0); /* NaN */
}
```

**Кейсы использования**:

- Граничные случаи вычислений
- Fallback значения
- Защита от некорректных данных

**Источники**:

- [Firefox 114 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/114)

## 9. Анимации и переходы (Animations & Transitions)

### 9.1. Scroll-Driven Animations

**Статус**: Chrome 115 (июль 2023)

Scroll-Driven Animations — революционная возможность создания анимаций, управляемых позицией скролла вместо времени.

**Типы timeline**:

1. **Scroll Progress Timeline** — на основе позиции скролла контейнера
2. **View Progress Timeline** — на основе видимости элемента в viewport

**Scroll timeline**:

```css
@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.element {
    animation: fade-in linear;
    animation-timeline: scroll();
    animation-range: entry 0% cover 50%;
}

/* Именованный scroll timeline */
.scroller {
    scroll-timeline: --page-scroll block;
}

.animated {
    animation: fade-in linear;
    animation-timeline: --page-scroll;
}
```

**View timeline**:

```css
.element {
    animation: appear linear;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
}

/* Именованный view timeline */
.element {
    view-timeline: --item-appear;
}

.child {
    animation: scale-up linear;
    animation-timeline: --item-appear;
}
```

**Animation range**:

```css
.element {
    animation-timeline: view();

    /* Диапазоны */
    animation-range: entry 0% entry 100%;
    animation-range: contain 0% contain 100%;
    animation-range: exit 0% exit 100%;

    /* Shorthand */
    animation-range: cover 0% cover 100%;
}

/* Parallax эффект */
.parallax {
    animation: parallax linear;
    animation-timeline: scroll();
}

@keyframes parallax {
    to {
        transform: translateY(calc(var(--scroll-progress) * -50px));
    }
}

/* Reveal on scroll */
.reveal {
    opacity: 0;
    transform: translateY(20px);
    animation: reveal linear;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
}

@keyframes reveal {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Кейсы использования**:

- Parallax эффекты
- Reveal on scroll анимации
- Progress indicators
- Scroll-based storytelling
- Sticky header animations

**Рекомендации**:

- Доступно только в Chromium (на конец 2023)
- Альтернатива: Intersection Observer + JavaScript
- Мощный инструмент для scroll-based UI

**Источники**:

- [Chrome 115 Release Notes](https://developer.chrome.com/blog/new-in-chrome-115/)
- [MDN: Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)

### 9.2. `animation-composition`

**Статус**: Firefox 115 (июль 2023)

Определяет, как комбинировать несколько анимаций на одном свойстве.

**Практическое применение**:

```css
.element {
    animation:
        spin 2s,
        move 3s;
    animation-composition: add;
}

@keyframes spin {
    to {
        rotate: 360deg;
    }
}

@keyframes move {
    to {
        translate: 100px 0;
    }
}
```

**Значения**:

- `replace` — заменяет предыдущие (по умолчанию)
- `add` — добавляет к предыдущим
- `accumulate` — аккумулирует значения

**Кейсы использования**:

- Комбинирование трансформаций
- Сложные анимации
- Независимые анимационные слои

**Источники**:

- [Firefox 115 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/115)

### 9.3. Motion Path

**Статус**: Chrome 116 (август 2023), Firefox 116 (август 2023)

Анимация элемента вдоль произвольного пути.

**Практическое применение**:

```css
.element {
    /* Путь как SVG path */
    offset-path: path('M 0 0 L 100 100 L 200 0');
    offset-distance: 0%;

    animation: move-along-path 3s linear infinite;
}

@keyframes move-along-path {
    to {
        offset-distance: 100%;
    }
}

/* С базовыми фигурами */
.circle-motion {
    offset-path: circle(50%);
    offset-rotate: auto;
}

/* С координатной системой */
.box-motion {
    offset-path: rect(0 100% 100% 0);
}
```

**Свойства**:

- `offset-path` — определяет путь
- `offset-distance` — позиция на пути (0%-100%)
- `offset-rotate` — угол поворота (`auto`, `reverse`, angle)
- `offset-anchor` — точка привязки

**Firefox 116 расширения**:

```css
.element {
    /* <ray()>, <basic-shape>, <coord-box> */
    offset-path: ray(45deg closest-side);
    offset-path: inset(10px);
    offset-path: content-box;
}
```

**Кейсы использования**:

- Сложные траектории движения
- Следование по кривым
- Анимации иконок
- Decorative движения

**Источники**:

- [Chrome 116 Release Notes](https://developer.chrome.com/blog/new-in-chrome-116/)
- [Firefox 116 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/116)

### 9.4. Entry/Exit Animations

**Статус**: Chrome 117 (сентябрь 2023)

**Новые возможности**:

1. `transition-behavior: allow-discrete` — transitions для discrete свойств
2. `@starting-style` — начальные стили для entry animations
3. `overlay` property — контроль z-index при transitions

**Transition для `display`**:

```css
.dialog {
    display: none;
    opacity: 0;
    transition:
        opacity 0.3s,
        display 0.3s;
    transition-behavior: allow-discrete;
}

.dialog[open] {
    display: block;
    opacity: 1;
}
```

**Entry animation с `@starting-style`**:

```css
.modal {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s;

    @starting-style {
        opacity: 0;
        transform: scale(0.9);
    }
}
```

**Exit animation с `overlay`**:

```css
dialog {
    transition:
        opacity 0.3s,
        overlay 0.3s,
        display 0.3s;
    transition-behavior: allow-discrete;
}

dialog:not([open]) {
    opacity: 0;
}
```

**Кейсы использования**:

- Плавное появление dialogs
- Анимированные popovers
- Entry/exit для top layer элементов
- Transitions без JavaScript

**Источники**:

- [Chrome 117 Release Notes](https://developer.chrome.com/blog/new-in-chrome-117/)

### 9.5. `display` и `content-visibility` в keyframes

**Статус**: Chrome 116 (август 2023)

Возможность анимировать `display` и `content-visibility` в ключевых кадрах.

**Практическое применение**:

```css
@keyframes appear {
    from {
        display: none;
        opacity: 0;
    }
    to {
        display: block;
        opacity: 1;
    }
}

.element {
    animation: appear 0.3s;
}
```

**Кейсы использования**:

- Exit animations чисто в CSS
- Контроль видимости в анимациях
- Устранение JavaScript для простых случаев

**Источники**:

- [Chrome 116 Release Notes](https://developer.chrome.com/blog/new-in-chrome-116/)

### 9.6. `linear()` easing function

**Статус**: Firefox 112 (апрель 2023)

Кусочно-линейная easing функция для аппроксимации сложных кривых.

**Практическое применение**:

```css
.element {
    animation: bounce 1s linear(0, 0.25, 0.5, 0.75, 1, 0.9, 0.8, 0.7, 0.8, 0.9, 1);
}

/* Более сложная аппроксимация */
.spring {
    transition: transform 0.5s linear(0, 0.2, 0.4, 0.6, 0.8, 1.1, 1.05, 0.95, 1.02, 0.98, 1);
}
```

**Кейсы использования**:

- Аппроксимация физических пружин
- Сложные easing без JS
- Точный контроль timing

**Источники**:

- [Firefox 112 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/112)

## 10. View Transitions API

**Статус**: Chrome 111 (март 2023) — same-document

View Transitions API предоставляет способ создания плавных переходов между состояниями DOM.

**CSS аспекты**:

**View transition псевдоэлементы**:

```
::view-transition
├── ::view-transition-group(name)
│   └── ::view-transition-image-pair(name)
│       ├── ::view-transition-old(name)
│       └── ::view-transition-new(name)
```

**Кастомизация анимаций**:

```css
/* Корневой переход */
::view-transition-old(root) {
    animation: fade-out 0.3s;
}

::view-transition-new(root) {
    animation: fade-in 0.3s;
}

/* Индивидуальные элементы */
.card {
    view-transition-name: card-1;
}

::view-transition-old(card-1) {
    animation: slide-out 0.4s;
}

::view-transition-new(card-1) {
    animation: slide-in 0.4s;
}

/* Кастомные анимации */
@keyframes slide-out {
    to {
        transform: translateX(-100%);
    }
}

@keyframes slide-in {
    from {
        transform: translateX(100%);
    }
}
```

**Opt-in для cross-document** (Chrome 126+):

```css
@view-transition {
    navigation: auto;
}
```

**Кейсы использования**:

- SPA навигация
- Плавные переходы состояний
- Морфинг элементов
- Shared element transitions

**Рекомендации**:

- Доступно только в Chromium (на конец 2023)
- Мощный инструмент для SPA
- Требует JavaScript для триггера

**Источники**:

- [Chrome Developers: View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [Chrome 111 Release Notes](https://developer.chrome.com/blog/new-in-chrome-111/)

## 11. Media Queries

### 11.1. Range Syntax

**Статус**: Safari 16.4 (март 2023), Interop 2023

Упрощённый синтаксис для range-based media queries.

**Практическое применение**:

```css
/* Старый синтаксис */
@media (min-width: 400px) and (max-width: 900px) {
    /* ... */
}

/* Новый range синтаксис */
@media (400px <= width < 900px) {
    /* ... */
}

/* Больше/меньше */
@media (width > 1200px) {
    /* ... */
}

@media (height >= 600px) {
    /* ... */
}

/* Множественные условия */
@media (400px <= width < 900px) and (height > 600px) {
    /* ... */
}
```

**Кейсы использования**:

- Более читаемые media queries
- Интуитивный синтаксис диапазонов
- Меньше verbosity

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 11.2. `overflow-block` и `overflow-inline`

**Статус**: Chrome 113 (май 2023), Safari 17 (сентябрь 2023)

Определение поведения overflow на block/inline осях устройства.

**Практическое применение**:

```css
@media (overflow-block: scroll) {
    /* Устройство скроллит по block оси */
    body {
        padding-block: 2rem;
    }
}

@media (overflow-block: paged) {
    /* Постраничное устройство (печать) */
    .chapter {
        page-break-before: always;
    }
}

@media (overflow-inline: scroll) {
    /* Горизонтальный скролл */
    .gallery {
        display: flex;
        overflow-x: auto;
    }
}
```

**Значения**:

- `none` — нет overflow
- `scroll` — скроллинг
- `paged` — постраничный

**Кейсы использования**:

- Адаптация к устройству
- Оптимизация для печати
- Кроссплатформенный design

**Источники**:

- [Chrome 113 Release Notes](https://developer.chrome.com/blog/new-in-chrome-113/)
- [Safari 17 Release Notes](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

### 11.3. `scripting` media feature

**Статус**: Firefox 113 (май 2023)

Определение доступности скриптов.

**Практическое применение**:

```css
@media (scripting: none) {
    /* JavaScript недоступен */
    .interactive {
        display: none;
    }

    .fallback {
        display: block;
    }
}

@media (scripting: enabled) {
    /* JavaScript доступен */
    .progressive-enhancement {
        /* ... */
    }
}
```

**Значения**:

- `none` — скрипты недоступны
- `initial-only` — только при загрузке
- `enabled` — полностью доступны

**Кейсы использования**:

- Прогрессивное улучшение
- Graceful degradation
- NoScript оптимизация

**Источники**:

- [Firefox 113 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/113)

### 11.4. `prefers-reduced-transparency`

**Статус**: Chrome 118 (октябрь 2023)

Определение предпочтения пользователя по уменьшению прозрачности.

**Практическое применение**:

```css
@media (prefers-reduced-transparency: reduce) {
    .glass-effect {
        backdrop-filter: none;
        opacity: 1;
        background: solid white;
    }
}

@media (prefers-reduced-transparency: no-preference) {
    .glass-effect {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.7);
    }
}
```

**Кейсы использования**:

- Accessibility
- Адаптация к системным настройкам
- Glassmorphism с fallback

**Источники**:

- [Chrome 118 Release Notes](https://developer.chrome.com/blog/new-in-chrome-118/)

## 12. Изображения и визуальные эффекты

### 12.1. `image-set()` (unprefixed)

**Статус**: Chrome 113 (май 2023)

Нативная версия без префикса `-webkit-`.

**Практическое применение**:

```css
.element {
    background-image: image-set(
        url('image-1x.png') 1x,
        url('image-2x.png') 2x,
        url('image-3x.png') 3x
    );
}

/* С type */
.element {
    background-image: image-set(
        url('image.avif') type('image/avif'),
        url('image.webp') type('image/webp'),
        url('image.jpg') type('image/jpeg')
    );
}
```

**Кейсы использования**:

- Retina/HiDPI изображения
- Прогрессивные форматы
- Art direction

**Источники**:

- [Chrome 113 Release Notes](https://developer.chrome.com/blog/new-in-chrome-113/)

### 12.2. `clip-path` расширения

**Статус**: Chrome 119 (ноябрь 2023)

Новые значения и функции для `clip-path`.

**`<geometry-box>` значения**:

```css
.element {
    /* Reference box для clipping */
    clip-path: circle(50%) margin-box;
    clip-path: ellipse(60% 40%) border-box;
    clip-path: polygon(...) padding-box;

    /* Standalone */
    clip-path: content-box;
}
```

**Новые функции**:

```css
/* xywh() — x, y, width, height, border-radius */
.rect {
    clip-path: xywh(10px 10px 100px 50px round 10px);
}

/* rect() — top, right, bottom, left */
.rect2 {
    clip-path: rect(10px 110px 60px 10px round 10px);
}
```

**Кейсы использования**:

- Упрощённый синтаксис для прямоугольников
- Контроль reference box
- Сложные clipping shapes

**Источники**:

- [Chrome 119 Release Notes](https://developer.chrome.com/blog/new-in-chrome-119/)

### 12.3. `content` property с градиентами и изображениями

**Статус**: Firefox 113 (май 2023)

Расширенная поддержка типов изображений в `content`.

**Практическое применение**:

```css
.element::before {
    content: url('icon.svg');
}

.element::after {
    content: linear-gradient(blue, red);
}

.element::marker {
    content: image-set(url('marker-1x.png') 1x, url('marker-2x.png') 2x);
}
```

**Кейсы использования**:

- Динамические декоративные элементы
- Градиенты как content
- Responsive иконки

**Источники**:

- [Firefox 113 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/113)

### 12.4. `outline` следует `border-radius`

**Статус**: Safari 16.4 (март 2023)

`outline` теперь повторяет кривые `border-radius`.

**Практическое применение**:

```css
.button {
    border-radius: 8px;
    outline: 2px solid blue;
    /* Outline теперь скруглённый */
}
```

**Кейсы использования**:

- Accessibility focus indicators
- Визуально согласованные границы
- Округлые кнопки с focus

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 12.5. Masking (Interop 2023)

**Статус**: Interop 2023 focus area

Стандартизация CSS маскирования между браузерами.

**Свойства**:

- `mask-image`
- `mask-mode`
- `mask-repeat`
- `mask-position`
- `mask-clip`
- `mask-origin`
- `mask-size`
- `mask-composite`

**Кейсы использования**:

- Сложные формы
- Декоративные эффекты
- Image masking

**Источники**:

- [web.dev: Interop 2023](https://web.dev/blog/interop-2023/)

### 12.6. Border Image (Interop 2023)

**Статус**: Interop 2023 focus area

Улучшение кросс-браузерной поддержки `border-image`.

**Кейсы использования**:

- Декоративные рамки
- Слайсинг изображений для borders
- Сложные border паттерны

**Источники**:

- [web.dev: Interop 2023](https://web.dev/blog/interop-2023/)

## 13. Другие важные изменения

### 13.1. `display` с multiple keywords

**Статус**: Chrome 115 (июль 2023)

Поддержка множественных ключевых слов для `display`.

**Практическое применение**:

```css
.element {
    /* Вместо display: inline-flex */
    display: inline flex;

    /* Вместо display: inline-grid */
    display: inline grid;

    /* Вместо display: block flow-root */
    display: block flow-root;
}
```

**Кейсы использования**:

- Более явный синтаксис
- Комбинации inner/outer display
- Лучшая семантика

**Источники**:

- [Chrome 115 Release Notes](https://developer.chrome.com/blog/new-in-chrome-115/)

### 13.2. `transform-box` расширения

**Статус**: Firefox 118 (сентябрь 2023)

Новые reference boxes для трансформаций.

**Практическое применение**:

```css
.element {
    /* Content box как reference */
    transform-box: content-box;

    /* Stroke bounding box (SVG) */
    transform-box: stroke-box;

    /* Также: border-box, fill-box, view-box */
}
```

**Кейсы использования**:

- Точный контроль origin для SVG
- Трансформации relative to specific box
- SVG анимации

**Источники**:

- [Firefox 118 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/118)

### 13.3. Font-face дескрипторы с `auto`

**Статус**: Chrome 109 (январь 2023)

`font-weight`, `font-style`, `font-stretch` поддерживают значение `auto` в `@font-face`.

**Практическое применение**:

```css
@font-face {
    font-family: 'Variable Font';
    src: url('font.woff2') format('woff2');
    font-weight: auto;
    font-style: auto;
    font-stretch: auto;
}
```

**Кейсы использования**:

- Variable fonts
- Автоматическое определение диапазонов
- Упрощённые font-face правила

**Источники**:

- [Chrome 109 Release Notes](https://developer.chrome.com/blog/new-in-chrome-109/)

### 13.4. CSS Typed OM

**Статус**: Safari 16.4 (март 2023)

JavaScript API для работы с CSS значениями как типизированными объектами.

**Кейсы использования**:

- Программная манипуляция стилями
- Type-safe CSS в JS
- Производительные вычисления

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 13.5. Constructible CSSStyleSheet

**Статус**: Safari 16.4 (март 2023)

Программное создание и переиспользование stylesheet объектов.

**Кейсы использования**:

- Shadow DOM стилизация
- Динамические темы
- Компонентные библиотеки

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

## Interop 2023 — CSS Focus Areas

Interop 2023 имел беспрецедентный фокус на CSS — 15 из 26 focus areas были связаны с CSS.

**Ключевые области**:

1. **Container Queries** — стали Baseline в феврале
2. **`:has()`** — стабилизация в Firefox
3. **CSS Nesting** — реализация во всех браузерах
4. **Subgrid** — реализация в Chromium
5. **Color Spaces and Functions** — стандартизация
6. **Custom Properties** (`@property`)
7. **Flexbox** — улучшение согласованности
8. **Grid** — исправление edge cases
9. **Masking**
10. **Border Image**
11. **Math Functions**
12. **Media Queries** (range syntax)
13. **Motion Path**
14. **Font feature detection**
15. **Pseudo-classes**

**Результат**: значительное улучшение межбраузерной совместимости ключевых CSS-технологий.

**Источники**:

- [web.dev: Interop 2023](https://web.dev/blog/interop-2023/)

## Baseline-статусы 2023

| Функция                  | Baseline Status  | Дата достижения                 |
| ------------------------ | ---------------- | ------------------------------- |
| Container Queries        | Newly Available  | Февраль 2023                    |
| `:has()`                 | Widely Available | Декабрь 2023                    |
| Subgrid                  | Newly Available  | 15 сентября 2023                |
| CSS Nesting              | —                | Широко доступен с середины 2023 |
| CSS Color Level 4        | —                | Март–май 2023                   |
| Scroll-driven Animations | —                | Chromium only (июль 2023)       |
| `@scope`                 | —                | Chromium only (октябрь 2023)    |
| View Transitions         | —                | Chromium only (март 2023)       |

## Ключевые тренды и выводы

### Революционные изменения

1. **Container Queries** — фундаментальный сдвиг от page-based к component-based адаптивности
2. **`:has()`** — решение проблемы родительского селектора, одна из самых мощных возможностей
3. **CSS Nesting** — устранение необходимости в препроцессорах для организации кода
4. **Subgrid** — точное выравнивание вложенных grid-элементов
5. **Scroll-driven Animations** — новая парадигма анимаций на основе скролла

### Цветовая революция

- **CSS Color Level 4**: `oklch`, `color-mix()`, relative color syntax
- Переход к перцептивно-единообразным цветовым пространствам
- HDR и широкая гамма (Display P3, Rec. 2020)
- Программное создание палитр

### Типографические улучшения

- `lh` и `rlh` единицы для вертикального ритма
- `text-wrap: balance` для улучшенной типографики
- `initial-letter` для drop caps
- Улучшенный контроль шрифтов

### Анимации нового поколения

- Scroll-driven animations
- View Transitions API
- Entry/exit animations (`@starting-style`)
- Motion path расширения

### Interop 2023

- 15 из 26 focus areas связаны с CSS
- Беспрецедентная кооперация браузеров
- Быстрое достижение межбраузерной совместимости

## Рекомендации по использованию в production

### Безопасно использовать (Baseline Widely Available)

✅ **`:has()`** — декабрь 2023
✅ **Container Queries** — февраль 2023
✅ **Subgrid** — сентябрь 2023
✅ **CSS Nesting** — сентябрь 2023
✅ **CSS Color Level 4** — март–май 2023
✅ **`@layer`** — март 2022 (Baseline)
✅ **Range syntax media queries** — март 2023

### Использовать с осторожностью (Partial support)

⚠️ **Scroll-driven Animations** — только Chromium (июль 2023)
⚠️ **`@scope`** — только Chromium (октябрь 2023)
⚠️ **View Transitions** — только Chromium (март 2023)
⚠️ **`@property`** — нет Firefox
⚠️ **Relative color syntax** — ограниченная поддержка

### Требуют polyfills

🔧 **Popover API** — Firefox поддержка с 2024
🔧 **`name` для `<details>`** — нет Firefox
🔧 **Math functions** — ограниченная поддержка

## Источники

### Официальные ресурсы

- [Chrome Platform Status](https://chromestatus.com)
- [Chrome for Developers Blog](https://developer.chrome.com/blog)
- [Firefox Release Notes (MDN)](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases)
- [WebKit Blog](https://webkit.org/blog)
- [web.dev](https://web.dev)
- [MDN Web Docs](https://developer.mozilla.org)

### Interop 2023

- [web.dev: Interop 2023](https://web.dev/blog/interop-2023/)
- [Interop Dashboard](https://wpt.fyi/interop-2023)

### Baseline

- [web.dev: Baseline](https://web.dev/baseline)
- [Baseline Status](https://web.dev/baseline/status)

### Спецификации

- [CSS Containment Module Level 3](https://drafts.csswg.org/css-contain-3/)
- [CSS Nesting Module](https://drafts.csswg.org/css-nesting/)
- [CSS Color Module Level 4](https://drafts.csswg.org/css-color-4/)
- [CSS Scroll-driven Animations](https://drafts.csswg.org/scroll-animations/)
- [CSS View Transitions](https://drafts.csswg.org/css-view-transitions/)

### Релиз-ноты браузеров

**Chrome**:

- [Chrome 109](https://developer.chrome.com/blog/new-in-chrome-109/)
- [Chrome 110](https://developer.chrome.com/blog/new-in-chrome-110/)
- [Chrome 111](https://developer.chrome.com/blog/new-in-chrome-111/)
- [Chrome 112](https://developer.chrome.com/blog/new-in-chrome-112/)
- [Chrome 113](https://developer.chrome.com/blog/new-in-chrome-113/)
- [Chrome 114](https://developer.chrome.com/blog/new-in-chrome-114/)
- [Chrome 115](https://developer.chrome.com/blog/new-in-chrome-115/)
- [Chrome 116](https://developer.chrome.com/blog/new-in-chrome-116/)
- [Chrome 117](https://developer.chrome.com/blog/new-in-chrome-117/)
- [Chrome 118](https://developer.chrome.com/blog/new-in-chrome-118/)
- [Chrome 119](https://developer.chrome.com/blog/new-in-chrome-119/)
- [Chrome 120](https://developer.chrome.com/blog/new-in-chrome-120/)

**Firefox**:

- [Firefox 109-121 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases)

**Safari/WebKit**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)
- [WebKit Features in Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)
- [News from WWDC23: WebKit Features in Safari 17 beta](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)
- [Try CSS Nesting today in Safari Technology Preview](https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/)

- **Дата создания отчёта**: 2025-11-18
