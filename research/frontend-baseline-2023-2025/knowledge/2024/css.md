---
title: CSS — изменения 2024 года
description:
    Комплексный обзор изменений в CSS за 2024 год — достижения Interop 2024, новые возможности
    анимации, типографики, цветов и практические рекомендации
outline: deep
lastUpdated: true
---

# CSS — изменения 2024 года

- **Период**: 1 января 2024 — 31 декабря 2024
- **Версии браузеров**: Chrome/Edge 121–132, Firefox 121–133, Safari 17.2–18.2

## Обзор года

2024 год стал знаковым для CSS с беспрецедентным прогрессом в межбраузерной совместимости через
Interop 2024, достигший 95% прохождения тестов во всех основных браузерах к декабрю. Год
ознаменовался достижением статуса Baseline множеством ключевых функций, включая `@property`,
`@starting-style`, CSS Nesting, anchor positioning и многочисленными улучшениями анимаций,
типографики, цветов и систем раскладки.

Ключевые темы года:

- **Interoperability**: Interop 2024 поднял показатели с 46% до 95%
- **Анимации**: scroll-driven анимации, view transitions, переходы дискретных свойств
- **Типографика**: балансировка текста, box trimming, интернационализация
- **Цвета**: относительный синтаксис цветов, широкий цветовой охват, функция `light-dark()`
- **Layout**: anchor positioning, зрелость container queries, дебаты о masonry
- **Developer Experience**: нативный nesting, `@property` для анимации custom properties

## 1. Селекторы и псевдоклассы

### 1.1. Селектор `:has()` — зрелость в 2024

**Статус**: Baseline (достигнут декабрь 2023, зрелая поддержка в 2024)

Псевдокласс `:has()`, часто называемый "родительским селектором", позволяет выбирать элементы на
основе их потомков или следующих соседних элементов. Обеспечивает CSS-only решения для задач, ранее
требовавших JavaScript.

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 105+   | Август 2022  |
| Firefox | 121+   | Декабрь 2023 |
| Safari  | 15.4+  | Март 2022    |
| Edge    | 105+   | Август 2022  |

**Практическое применение**:

```css
/* Стилизация статьи, если содержит изображение */
article:has(img) {
    display: grid;
}

/* Стилизация формы с невалидными полями */
form:has(:invalid) {
    border: 2px solid red;
}

/* Стилизация карточек без изображений */
.card:not(:has(img)) {
    padding: 1rem;
}
```

**Глобальная совместимость**: По состоянию на март 2024, `:has()` поддерживается примерно 92%
браузеров глобально.

**Источники**:

- [MDN: :has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
- [Chrome for Developers: :has()](https://developer.chrome.com/blog/has-m105/)

### 1.2. Псевдоклассы `:user-valid` и `:user-invalid`

**Статус**: Baseline Newly Available (2024)

Эти псевдоклассы ведут себя аналогично `:valid` и `:invalid`, но срабатывают только после
значительного взаимодействия пользователя с полем, предотвращая преждевременные сообщения валидации.

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 119+   | Октябрь 2023 |
| Firefox | 88+    | Апрель 2021  |
| Safari  | 16.5+  | Май 2023     |
| Edge    | 119+   | Октябрь 2023 |

**Практическое применение**:

```css
/* Показывать ошибку только после взаимодействия */
input:user-invalid {
    border-color: red;
}

input:user-valid {
    border-color: green;
}
```

**Кейсы использования**:

- Улучшенный UX валидации форм
- Уменьшение кода для детекции "грязных" полей
- Прогрессивная обратная связь валидации

**Источники**:

- [Chrome for Developers: New in Web UI I/O 2024](https://developer.chrome.com/blog/new-in-web-ui-io-2024)

### 1.3. Псевдокласс `:has-slotted` (экспериментальный)

**Статус**: Экспериментальный (Firefox 133+)

**Поддержка браузерами**:

| Браузер | Версия   | Статус       |
| ------- | -------- | ------------ |
| Chrome  | Пока нет | В разработке |
| Firefox | 133+     | За флагом    |
| Safari  | Пока нет | В разработке |
| Edge    | Пока нет | В разработке |

Псевдокласс `:has-slotted` срабатывает, когда содержимое элемента `<slot>` не пусто. Работает только
в CSS shadow DOM.

**Практическое применение**:

```css
/* Внутри stylesheet shadow DOM */
slot:has-slotted {
    border: 1px solid blue;
}
```

**Источники**:

- [MDN: :has-slotted](https://developer.mozilla.org/en-US/docs/Web/CSS/:has-slotted)

### 1.4. Псевдоэлемент `::target-text`

**Статус**: Новый в 2024

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска |
| ------- | -------- | ------------ |
| Chrome  | Пока нет | В разработке |
| Firefox | 131+     | Октябрь 2024 |
| Safari  | Пока нет | В разработке |
| Edge    | Пока нет | В разработке |

Позволяет стилизовать текстовые фрагменты, на которые указывают URL text fragments.

**Источники**:

- Firefox 131 release notes

### 1.5. Псевдоэлементы `::grammar-error` и `::spelling-error`

**Статус**: Новый в Safari 17.4 (март 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска |
| ------- | -------- | ------------ |
| Chrome  | Пока нет | -            |
| Firefox | Пока нет | -            |
| Safari  | 17.4+    | Март 2024    |
| Edge    | Пока нет | -            |

Псевдоэлементы для стилизации грамматических и орфографических ошибок в пользовательском вводе.

**Практическое применение**:

```css
::grammar-error {
    text-decoration: blue wavy underline;
}

::spelling-error {
    text-decoration: red wavy underline;
}
```

**Источники**:

- [WebKit Features in Safari 17.4](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/)

### 1.6. Псевдоклассы `:is()` и `:where()` — продолжающаяся зрелость

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2021+)

- `:is()` сопоставляет любой селектор из списка с специфичностью наиболее специфичного селектора
- `:where()` сопоставляет любой селектор из списка с нулевой специфичностью

**Ключевые особенности**:

- Прощающие списки селекторов (невалидные селекторы не инвалидируют всё правило)
- Уменьшение повторения селекторов
- Лучшая поддерживаемость кода

**Практическое применение**:

```css
/* До */
header a:hover,
main a:hover,
footer a:hover {
    color: blue;
}

/* После с :is() */
:is(header, main, footer) a:hover {
    color: blue;
}

/* :where() для low-specificity defaults */
:where(h1, h2, h3) {
    margin-block: 1em;
}
```

**Источники**:

- [web.dev: CSS :is and :where](https://web.dev/articles/css-is-and-where)

## 2. CSS Nesting

### 2.1. Нативный CSS Nesting

**Статус**: Baseline Newly Available (май 2024)

Нативный CSS nesting позволяет вкладывать правила стилей внутрь других правил, аналогично
препроцессорам вроде Sass/SCSS, но с поддержкой на уровне браузера.

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска | Baseline |
| ------- | ------ | ------------ | -------- |
| Safari  | 16.5+  | Май 2023     | ✓        |
| Firefox | 117+   | Август 2023  | ✓        |
| Chrome  | 120+   | Декабрь 2023 | ✓        |
| Edge    | 120+   | Декабрь 2023 | ✓        |

**Ключевые особенности**:

- Relaxed синтаксис (амперсанд опционален во многих случаях)
- `&` nesting selector для явной ссылки на родителя
- Поддержка вложенных at-правил
- Часть focus areas Interop 2024

**Практическое применение**:

```css
/* Базовый nesting */
.card {
    padding: 1rem;

    h2 {
        font-size: 1.5rem;
    }

    p {
        color: gray;
    }
}

/* С селектором & */
.button {
    background: blue;

    &:hover {
        background: darkblue;
    }

    &.primary {
        background: green;
    }
}

/* Вложенные media queries */
.container {
    width: 100%;

    @media (min-width: 768px) {
        width: 750px;
    }
}
```

**Важные замечания**:

- Браузеры автоматически добавляют пробелы между селекторами без `&`
- Составные селекторы требуют `&` nesting selector
- Нативный nesting сохраняет дефолты браузера и доступность

**Источники**:

- [web.dev: Interop 2024](https://web.dev/blog/interop-2024)
- [MDN: CSS Nesting Module](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)

### 2.2. CSS Nested Declarations

**Статус**: Новый в Chrome 130, Firefox 132 (октябрь 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска |
| ------- | -------- | ------------ |
| Chrome  | 130+     | Октябрь 2024 |
| Firefox | 132+     | Октябрь 2024 |
| Safari  | Пока нет | -            |
| Edge    | 130+     | Октябрь 2024 |

Позволяет корректно парсить CSS-декларации внутри вложенных правил, улучшая начальную спецификацию
nesting.

**Влияние**: Это обновление обеспечивает корректный парсинг вложенного CSS во всех браузерах,
улучшая надёжность нативного CSS nesting.

**Источники**:

- [web.dev: Web Platform 10-2024](https://web.dev/blog/web-platform-10-2024)

## 3. Cascade Layers и Scoping

### 3.1. `@layer` Cascade Layers

**Статус**: Baseline Widely Available (с марта 2022)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 99+    | Март 2022    |
| Firefox | 97+    | Февраль 2022 |
| Safari  | 15.4+  | Март 2022    |
| Edge    | 99+    | Март 2022    |

At-правило `@layer` позволяет явный контроль порядка каскада, предоставляя управление приоритетами
независимо от специфичности селекторов.

**Browser Compatibility Score**: 88/100 (LambdaTest)

**Ключевые преимущества**:

- Гарантированный способ писать CSS без проблем специфичности
- Лучшая организация сторонних и framework стилей
- Явное упорядочивание каскада

**Практическое применение**:

```css
/* Определение порядка слоёв */
@layer reset, base, theme, utilities;

/* Наполнение слоёв */
@layer reset {
    * {
        margin: 0;
        padding: 0;
    }
}

@layer base {
    body {
        font-family: system-ui;
    }
}

@layer theme {
    .button {
        background: blue;
    }
}

/* Unlayered стили всегда побеждают */
.button {
    background: red; /* Побеждает несмотря на меньшую специфичность */
}
```

**Источники**:

- [web.dev: Interop 2024](https://web.dev/blog/interop-2024)
- [MDN: @layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

### 3.2. At-правило `@scope`

**Статус**: Экспериментальный (только Chrome на начало 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Статус            |
| ------- | -------- | ----------------- |
| Chrome  | 118+     | Экспериментальный |
| Firefox | Пока нет | -                 |
| Safari  | Пока нет | -                 |
| Edge    | 118+     | Экспериментальный |

`@scope` позволяет изолировать стили внутри конкретных поддеревьев DOM с опциональными нижними
границами.

**Практическое применение**:

```css
/* Ограничение стилей до .card, но не вложенных .card */
@scope (.card) to (.card .card) {
    h2 {
        font-size: 1.5rem;
    }
}

/* Scope без нижней границы */
@scope (.component) {
    button {
        padding: 0.5rem;
    }
}
```

**Интеграция**: `@scope` хорошо работает с `@layer`, `@container` и CSS nesting.

**Источники**:

- [12 Days of Web: CSS Scope](https://12daysofweb.dev/2023/css-scope)

## 4. Container Queries

### 4.1. Container Size Queries

**Статус**: Baseline Widely Available (с сентября 2022)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска  |
| ------- | ------ | ------------- |
| Chrome  | 105+   | Сентябрь 2022 |
| Firefox | 110+   | Февраль 2023  |
| Safari  | 16.0+  | Сентябрь 2022 |
| Edge    | 105+   | Сентябрь 2022 |

Container queries позволяют стилизовать элементы на основе размера их содержащего элемента, а не
viewport.

**Ключевые свойства**:

- `container-type`: устанавливает тип containment (size, inline-size, normal)
- `container-name`: именует контейнер для таргетирования
- `@container`: правило запроса для условных стилей

**Практическое применение**:

```css
/* Установка контейнера */
.card-container {
    container-type: inline-size;
    container-name: card;
}

/* Запрос к размеру контейнера */
@container card (min-width: 400px) {
    .card {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}

/* Container query units */
.card-title {
    font-size: clamp(1rem, 5cqi, 2rem);
}
```

**Container Query Units**:

- `cqw`: 1% ширины контейнера
- `cqh`: 1% высоты контейнера
- `cqi`: 1% inline size контейнера
- `cqb`: 1% block size контейнера
- `cqmin`: меньшее из `cqi` или `cqb`
- `cqmax`: большее из `cqi` или `cqb`

**Источники**:

- [web.dev: Interop 2024](https://web.dev/blog/interop-2024)
- [MDN: Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)

### 4.2. Container Style Queries

**Статус**: Экспериментальный (ограниченная поддержка браузерами, февраль 2024)

**Поддержка браузерами**:

| Браузер | Версия    | Статус |
| ------- | --------- | ------ |
| Chrome  | За флагом | Эксп.  |
| Firefox | За флагом | Эксп.  |
| Safari  | За флагом | Эксп.  |
| Edge    | За флагом | Эксп.  |

Style queries позволяют стилизовать элементы на основе значений custom properties в родительских
контейнерах. В настоящее время работает только с CSS custom properties.

**Текущее ограничение**: Можно запрашивать только CSS custom properties (переменные); обычные
CSS-свойства пока не поддерживаются.

**Практическое применение**:

```css
/* Запрос значения custom property */
@container style(--theme: dark) {
    .card {
        background: black;
        color: white;
    }
}

/* Запрос существования custom property */
@container style(--featured) {
    .card {
        border: 2px solid gold;
    }
}
```

**Источники**:

- [MDN: Container Size and Style Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries)

## 5. Anchor Positioning

### 5.1. CSS Anchor Positioning API

**Статус**: Chrome 125+ (май 2024), coming to Safari, не в Firefox

**Поддержка браузерами**:

| Браузер | Версия         | Дата выпуска              |
| ------- | -------------- | ------------------------- |
| Chrome  | 125+           | Май 2024                  |
| Firefox | Не планируется | -                         |
| Safari  | TP             | Safari Technology Preview |
| Edge    | 125+           | Май 2024                  |

Anchor positioning позволяет привязывать абсолютно позиционированные элементы к другим элементам
(якорям) декларативно, без JavaScript.

**Часть Interop 2025** (не 2024)

**Ключевые свойства**:

- `anchor-name`: определяет идентификатор якоря
- `position-anchor`: связывает позиционированный элемент с якорем
- `anchor()`: функция для позиционирования относительно якоря
- `position-area`: упрощённое позиционирование по сетке
- `anchor-scope`: ограничивает видимость имени якоря (Chrome 131+)

**Практическое применение**:

```css
/* Определение якоря */
.tooltip-trigger {
    anchor-name: --my-tooltip;
}

/* Позиционирование элемента относительно якоря */
.tooltip {
    position: absolute;
    position-anchor: --my-tooltip;
    bottom: anchor(top);
    left: anchor(center);
    translate: -50% 0;
}

/* Использование position-area (проще) */
.tooltip {
    position: absolute;
    position-anchor: --my-tooltip;
    position-area: top center;
}

/* Использование anchor-scope (Chrome 131+) */
.container {
    anchor-scope: --tooltip;
}
```

**Position Area Values**: позиционирование на основе сетки, включая `top`, `bottom`, `left`,
`right`, `center`, `block-start`, `block-end`, `inline-start`, `inline-end` и комбинации.

**Практические кейсы использования**:

- Tooltips
- Popovers
- Dropdown меню
- Кастомные select элементы
- Контекстные меню

**Источники**:

- [Chrome for Developers: Anchor Positioning API](https://developer.chrome.com/blog/anchor-positioning-api)

### 5.2. `inset-area` переименован в `position-area`

**Статус**: Firefox 131+ (октябрь 2024)

Свойство `inset-area` было переименовано в `position-area` в процессе эволюции спецификации anchor
positioning.

**Источники**:

- Firefox 131 release notes

## 6. Анимации и переходы

### 6.1. At-правило `@starting-style`

**Статус**: Baseline Newly Available (август 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 117+   | Август 2023  |
| Firefox | 129+   | Август 2024  |
| Safari  | 17.5+  | Май 2024     |
| Edge    | 117+   | Август 2023  |

`@starting-style` определяет начальные значения для свойств, когда элемент получает первое
обновление стиля, обеспечивая анимации входа.

**Часть Interop 2024**

**Кейсы использования**:

- Анимации входа для элементов
- Анимация из `display: none`
- Эффекты входа popover и dialog
- Анимации первой отрисовки

**Практическое применение**:

```css
/* Анимация входа dialog */
dialog {
    opacity: 1;
    translate: 0 0;
    transition:
        opacity 0.3s,
        translate 0.3s;
}

@starting-style {
    dialog {
        opacity: 0;
        translate: 0 -20px;
    }
}

/* Анимация входа popover */
[popover] {
    opacity: 1;
    transition:
        opacity 0.3s,
        display 0.3s allow-discrete;
}

@starting-style {
    [popover] {
        opacity: 0;
    }
}
```

**Источники**:

- [WebKit Features in Safari 17.5](https://webkit.org/blog/15383/webkit-features-in-safari-17-5/)

### 6.2. `transition-behavior: allow-discrete`

**Статус**: Baseline Newly Available (август 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 117+   | Август 2023  |
| Firefox | 129+   | Август 2024  |
| Safari  | 17.4+  | Март 2024    |
| Edge    | 117+   | Август 2023  |

Обеспечивает переходы для дискретных свойств вроде `display`, `content-visibility` и `overlay`.

**Часть Interop 2024**

**Практическое применение**:

```css
/* Переход свойства display */
.element {
    display: block;
    opacity: 1;
    transition:
        opacity 0.3s,
        display 0.3s allow-discrete;
}

.element.hidden {
    display: none;
    opacity: 0;
}

/* Работает с @starting-style */
dialog {
    display: block;
    transition: display 0.3s allow-discrete;
}

dialog:not([open]) {
    display: none;
}
```

**Safari 18.0 дополнение**: Safari 18.0 добавил поддержку анимации перехода свойства `display` в
сочетании с `@starting-style`.

**Источники**:

- [WebKit Features in Safari 17.4](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/)

### 6.3. Scroll-Driven Animations

**Статус**: Только Chrome (декабрь 2024), Firefox за флагом

**Поддержка браузерами**:

| Браузер | Версия    | Дата выпуска      |
| ------- | --------- | ----------------- |
| Chrome  | 115+      | Июль 2023         |
| Firefox | За флагом | Экспериментальный |
| Safari  | Пока нет  | Polyfill доступен |
| Edge    | 115+      | Июль 2023         |

Scroll-driven анимации связывают прогресс анимации с позицией скролла, обеспечивая эффекты,
реагирующие на скроллинг пользователя без JavaScript.

**Два типа timeline**:

1. **Scroll Progress Timeline**: связан с позицией скролла scroll-контейнера
2. **View Progress Timeline**: связан с позицией элемента в viewport

**Ключевые свойства**:

- `animation-timeline`: связывает анимацию с scroll timeline
- `scroll-timeline`: определяет timeline на основе скролла
- `view-timeline`: определяет view progress timeline
- `animation-range`: управляет точками начала/конца анимации

**Timeline функции**:

- `scroll()`: создаёт scroll progress timeline
- `view()`: создаёт view progress timeline

**Практическое применение**:

```css
/* Scroll progress анимация */
.progress-bar {
    animation: grow-bar linear;
    animation-timeline: scroll(root);
}

@keyframes grow-bar {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}

/* View progress анимация */
.reveal-on-scroll {
    animation: fade-in linear;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Использование функции scroll() */
.element {
    animation: slide linear;
    animation-timeline: scroll(nearest block);
}

/* Использование функции view() */
.element {
    animation: appear linear;
    animation-timeline: view(block);
}
```

**Animation Range Values**:

- `entry`: элемент входит в viewport
- `exit`: элемент покидает viewport
- `contain`: элемент полностью внутри viewport
- `cover`: вся продолжительность анимации

**Замечание**: Хотя спецификация завершена, браузерное внедрение постепенное. Polyfills доступны для
кросс-браузерной поддержки.

**Источники**:

- [Smashing Magazine: Introduction to CSS Scroll-driven Animations](https://www.smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/)

### 6.4. View Transitions API

**Статус**: Same-document (Chrome 111+), Cross-document (Chrome 126+)

**Поддержка браузерами**:

| Браузер | Версия                            | Дата выпуска |
| ------- | --------------------------------- | ------------ |
| Chrome  | 111+ (same-doc), 126+ (cross-doc) | Май 2024     |
| Firefox | Пока нет                          | -            |
| Safari  | Пока нет                          | -            |
| Edge    | 111+ (same-doc), 126+ (cross-doc) | Май 2024     |

View Transitions API обеспечивает плавные анимированные переходы между состояниями страницы, включая
cross-document (MPA) навигацию.

**Крупное обновление 2024**: Cross-document view transitions для Multi-Page Applications (Chrome
126, май 2024)

**Ключевые свойства**:

- `view-transition-name`: идентифицирует элементы для перехода
- `view-transition-class`: группирует элементы с общими стилями анимации (обновление 2024)
- `@view-transition`: at-правило для включения cross-document переходов

**Практическое применение**:

```css
/* Включение cross-document переходов */
@view-transition {
    navigation: auto;
}

/* Идентификация переходных элементов */
.hero-image {
    view-transition-name: hero;
}

/* Shared animation class (2024) */
.card {
    view-transition-name: card-1;
    view-transition-class: card-transition;
}

/* Стилизация transition pseudo-элементов */
::view-transition-old(hero) {
    animation: fade-out 0.3s;
}

::view-transition-new(hero) {
    animation: fade-in 0.3s;
}

/* Использование view-transition-class */
::view-transition-old(card-transition) {
    animation: slide-out 0.4s;
}
```

**JavaScript API**:

```javascript
// Same-document transition
document.startViewTransition(() => {
    // Update DOM
});

// Доступ к transition в pageswap/pagereveal events
window.addEventListener('pageswap', (event) => {
    if (event.viewTransition) {
        // Кастомизация перехода
    }
});
```

**Ключевые преимущества для MPA**:

- Не требуется JavaScript для базовых переходов
- Работает со стандартной навигацией
- Прогрессивное улучшение

**Текущее ограничение**: Cross-document transitions работает только для same-origin навигации.

**Источники**:

- [Chrome for Developers: View Transitions Update I/O 24](https://developer.chrome.com/blog/view-transitions-update-io24)

### 6.5. `interpolate-size` и `calc-size()`

**Статус**: Chrome 129+ (сентябрь 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска  |
| ------- | -------- | ------------- |
| Chrome  | 129+     | Сентябрь 2024 |
| Firefox | Пока нет | -             |
| Safari  | Пока нет | -             |
| Edge    | 129+     | Сентябрь 2024 |

Обеспечивает плавные анимации между длинами и intrinsic sizing keywords вроде `auto`, `min-content`,
`max-content` и `fit-content`.

**Практическое применение**:

```css
/* Глобальное включение size interpolation */
:root {
    interpolate-size: allow-keywords;
}

/* Анимация к auto */
.element {
    height: 0;
    transition: height 0.3s;
}

.element.expanded {
    height: auto;
}

/* Использование calc-size() */
.element {
    height: calc-size(auto, size);
    transition: height 0.3s;
}

.element.expanded {
    height: calc-size(auto, size + 2rem);
}
```

**Влияние**: Решает давнюю проблему анимации to/from `auto` и других intrinsic размеров без
JavaScript.

**Источники**:

- [web.dev: Web Platform 09-2024](https://web.dev/blog/web-platform-09-2024)

## 7. Цвета

### 7.1. Современные цветовые пространства (OKLCH, OKLAB, Display-P3, Rec2020)

**Статус**: Baseline Newly Available (май 2023)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска              |
| ------- | ------ | ------------------------- |
| Chrome  | 111+   | Март 2023                 |
| Firefox | 113+   | Май 2023                  |
| Safari  | 15+    | Сентябрь 2021 (P3 с 2016) |
| Edge    | 111+   | Март 2023                 |

Современные цветовые пространства, обеспечивающие более широкий охват, перцептивную равномерность и
лучшие возможности манипуляции цветом.

**Цветовые пространства**:

1. **OKLCH (Oklab цилиндрический)**:
    - Перцептивно равномерный
    - L (Lightness): 0-1 (чёрный к белому)
    - C (Chroma): 0-∞ (серый к насыщенному)
    - H (Hue): 0-360 градусов

2. **OKLAB**:
    - L (Lightness): 0-1
    - a (green-red ось): -1 до 1
    - b (blue-yellow ось): -1 до 1

3. **Display-P3**:
    - ~50% больший охват чем sRGB
    - Поддерживается на устройствах Apple с 2015
    - Обычен в современных дисплеях

4. **Rec2020**:
    - ~100% больше чем Display-P3
    - Цветовое пространство UHDTV для 4K/8K
    - Менее распространён в потребительских устройствах

**Практическое применение**:

```css
/* OKLCH - рекомендуется для современного CSS */
.element {
    color: oklch(70% 0.15 180);
    background: oklch(95% 0.05 120);
}

/* OKLAB */
.element {
    color: oklab(70% -0.1 0.15);
}

/* Display-P3 */
.vibrant {
    color: color(display-p3 1 0 0); /* Яркий красный */
}

/* Rec2020 */
.ultra-vibrant {
    color: color(rec2020 0 0 1); /* Яркий синий */
}

/* Fallback с color-gamut query */
.element {
    color: rgb(255 0 0); /* sRGB fallback */
}

@media (color-gamut: p3) {
    .element {
        color: color(display-p3 1 0 0);
    }
}

@media (color-gamut: rec2020) {
    .element {
        color: color(rec2020 1 0 0);
    }
}
```

**Преимущества OKLCH**:

- Перцептивно равномерный (равные изменения значений = равные перцептивные изменения)
- Нет неожиданных серых зон в градиентах
- Поддерживает P3 и более широкие охваты
- Интуитивные регулировки chroma и hue

**Источники**:

- [web.dev: Color Spaces and Functions](https://web.dev/blog/color-spaces-and-functions)

### 7.2. Относительный синтаксис цветов

**Статус**: Baseline Newly Available (май 2024), Часть Interop 2024

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 119+   | Октябрь 2023 |
| Firefox | 128+   | Июль 2024    |
| Safari  | 16.4+  | Март 2023    |
| Edge    | 119+   | Октябрь 2023 |

Позволяет создавать цвета относительно других цветов, обеспечивая динамические цветовые отношения
без CSS-переменных для каждой вариации.

**Практическое применение**:

```css
/* Осветление цвета */
.element {
    --base: oklch(60% 0.15 180);
    background: oklch(from var(--base) calc(l + 0.2) c h);
}

/* Регулировка прозрачности */
.element {
    color: oklch(from green l c h / 0.5);
}

/* Создание цветовых вариаций */
.button {
    background: oklch(50% 0.2 240);

    &:hover {
        background: oklch(from oklch(50% 0.2 240) calc(l + 0.1) c h);
    }
}

/* Обесцвечивание цветов */
.muted {
    color: oklch(from var(--primary) l calc(c * 0.5) h);
}

/* Работает с любой цветовой функцией */
.element {
    color: hsl(from #ff0000 h s calc(l + 20%));
    color: rgb(from blue r g b / 50%);
}
```

**Interop 2024 focus**: Полная реализация включая поддержку ключевого слова `currentcolor`.

**Источники**:

- [web.dev: Interop 2024](https://web.dev/blog/interop-2024)

### 7.3. Функция `color-mix()`

**Статус**: Baseline Widely Available

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 111+   | Март 2023    |
| Firefox | 113+   | Май 2023     |
| Safari  | 16.2+  | Декабрь 2022 |
| Edge    | 111+   | Март 2023    |

Смешивает два цвета в указанном цветовом пространстве и пропорции.

**Практическое применение**:

```css
/* Базовое смешивание */
.element {
    background: color-mix(in oklch, red 50%, blue);
}

/* Разные пропорции */
.element {
    color: color-mix(in srgb, red 20%, green 40%);
}

/* Использование longer hue interpolation */
.element {
    background: color-mix(in oklch longer hue, orange, purple);
}

/* С custom properties */
.element {
    --primary: blue;
    --secondary: yellow;
    border-color: color-mix(in oklch, var(--primary), var(--secondary) 30%);
}
```

**Цветовые пространства для смешивания**:

- `srgb`, `srgb-linear`
- `lab`, `oklab`
- `lch`, `oklch`
- `xyz`, `xyz-d50`, `xyz-d65`
- `hsl`, `hwb`

**Методы интерполяции hue**: `shorter`, `longer`, `increasing`, `decreasing`

**Источники**:

- [MDN: color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)

### 7.4. Функция `light-dark()`

**Статус**: Baseline Newly Available (май 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 123+   | Март 2024    |
| Firefox | 120+   | Ноябрь 2023  |
| Safari  | 17.5+  | Май 2024     |
| Edge    | 123+   | Март 2024    |

Возвращает один цвет для светлого режима и другой для тёмного на основе настройки `color-scheme`,
устраняя необходимость в `prefers-color-scheme` media queries.

**Prerequisite**: Требует `color-scheme: light dark` или эквивалентный meta tag.

**Практическое применение**:

```css
/* Установка color scheme */
:root {
    color-scheme: light dark;
}

/* Использование light-dark() */
body {
    background: light-dark(white, black);
    color: light-dark(black, white);
}

.card {
    background: light-dark(#f0f0f0, #1a1a1a);
    border: 1px solid light-dark(#ddd, #333);
}

/* Работает с любым цветовым форматом */
a {
    color: light-dark(DeepPink, HotPink);
    color: light-dark(oklch(60% 0.2 240), oklch(80% 0.15 240));
}
```

**HTML Meta Tag**:

```html
<meta name="color-scheme" content="light dark" />
```

**Преимущества**:

- Однострочные определения цветов
- Автоматическая детекция системных предпочтений
- Нет дублирования media query
- Более чистый, поддерживаемый код

**Источники**:

- [web.dev: light-dark()](https://web.dev/articles/light-dark)

### 7.5. Media Query `color-gamut`

**Статус**: Широко поддерживается

**Поддержка браузерами**: Все современные браузеры

Детектирует, поддерживает ли дисплей пользователя конкретные цветовые охваты (sRGB, P3, Rec2020).

**Практическое применение**:

```css
/* Прогрессивное улучшение */
.element {
    color: red; /* sRGB fallback */
}

@media (color-gamut: p3) {
    .element {
        color: color(display-p3 1 0 0);
    }
}

@media (color-gamut: rec2020) {
    .element {
        color: color(rec2020 1 0 0);
    }
}
```

**Источники**:

- [MDN: color-gamut](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut)

## 8. Типографика и текст

### 8.1. `text-wrap: balance`

**Статус**: Baseline Newly Available (март 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 114+   | Май 2023     |
| Firefox | 121+   | Декабрь 2023 |
| Safari  | 17.5+  | Май 2024     |
| Edge    | 114+   | Май 2023     |

Балансирует текст по строкам для избежания висячих строк и улучшения визуального внешнего вида,
особенно для заголовков.

**Часть Interop 2024**

**Ограничения**:

- Chromium: Максимум 6 строк
- Firefox: Максимум 10 строк
- Вычислительно затратно, поэтому ограничено короткими текстовыми блоками

**Практическое применение**:

```css
/* Балансированные заголовки */
h1,
h2,
h3 {
    text-wrap: balance;
}

/* Балансированные подписи */
figcaption {
    text-wrap: balance;
    max-inline-size: 40ch;
}

/* Полное свойство text-wrap */
.element {
    text-wrap: wrap; /* default */
    text-wrap: nowrap;
    text-wrap: balance;
    text-wrap: pretty;
    text-wrap: stable;
}
```

**Обновление 2024**: Firefox 124 преобразовал `text-wrap` в shorthand свойство, покрывающее
`text-wrap-mode` и `text-wrap-style`.

**Источники**:

- [WebKit Features in Safari 17.5](https://webkit.org/blog/15383/webkit-features-in-safari-17-5/)

### 8.2. `text-box-trim` и `text-box-edge` (экспериментальный)

**Статус**: Экспериментальный (feature flags в Chrome и Safari)

**Поддержка браузерами**:

| Браузер | Версия    | Статус |
| ------- | --------- | ------ |
| Chrome  | За флагом | Эксп.  |
| Firefox | Пока нет  | -      |
| Safari  | За флагом | Эксп.  |
| Edge    | За флагом | Эксп.  |

**Прежние названия**: `leading-trim`, `text-edge`

Обрезает whitespace (half-leading) сверху и снизу текста, обеспечивая pixel-perfect выравнивание и
оптическое центрирование.

**Практическое применение**:

```css
/* Наиболее частое использование */
.button {
    text-box: trim-both cap alphabetic;
    padding: 10px; /* Теперь действительно равные top/bottom */
}

/* Обрезка только начала */
h1 {
    text-box-trim: trim-start;
    text-box-edge: cap alphabetic;
}
```

**Кейсы использования**:

- Оптически центрированные кнопки
- Выровненные заголовки с другими элементами
- Точный вертикальный ритм
- Равные paddings в кнопках и badges

**Замечание**: Спецификация и синтаксис всё ещё эволюционируют. Figma Dev Mode производит устаревшие
имена свойств.

**Источники**:

- [Chrome for Developers: CSS text-box-trim](https://developer.chrome.com/blog/css-text-box-trim)

### 8.3. `text-spacing-trim`

**Статус**: Chrome 123+ (март 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска |
| ------- | -------- | ------------ |
| Chrome  | 123+     | Март 2024    |
| Firefox | Пока нет | -            |
| Safari  | Пока нет | -            |
| Edge    | 123+     | Март 2024    |

Применяет кернинговые регулировки к CJK (китайской, японской, корейской) пунктуации для уменьшения
избыточных пробелов.

**Практическое применение**:

```css
/* Применение к CJK тексту */
:lang(ja),
:lang(zh),
:lang(ko) {
    text-spacing-trim: space-all;
}
```

**Источники**:

- [web.dev: Web Platform 03-2024](https://web.dev/blog/web-platform-03-2024)

### 8.4. `font-size-adjust`

**Статус**: Baseline Newly Available (июль 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска  |
| ------- | ------ | ------------- |
| Chrome  | 127+   | Июль 2024     |
| Firefox | 118+   | Сентябрь 2023 |
| Safari  | 16.4+  | Март 2023     |
| Edge    | 127+   | Июль 2024     |

Сохраняет видимый размер текста путём масштабирования шрифтов для соответствия конкретной метрике,
особенно полезно для fallback шрифтов.

**Часть Interop 2024**

**Практическое применение**:

```css
/* Сохранение x-height между шрифтами */
body {
    font-family: 'Custom Font', Arial, sans-serif;
    font-size-adjust: 0.5; /* Регулировка на основе первичного шрифта */
}

/* Двузначный синтаксис */
body {
    font-size-adjust: ex-height 0.5;
}
```

**Влияние**: Уменьшает layout shifts при загрузке веб-шрифтов, улучшает внешний вид fallback
шрифтов.

**Источники**:

- [web.dev: Baseline Project 2024](https://web.dev/blog/baseline-project-2024)

### 8.5. Улучшения Ruby типографики

**Статус**: Chrome 128+ (август 2024)

**Поддержка браузерами**:

| Браузер | Версия       | Дата выпуска |
| ------- | ------------ | ------------ |
| Chrome  | 128+         | Август 2024  |
| Firefox | Ограниченная | -            |
| Safari  | Ограниченная | -            |
| Edge    | 128+         | Август 2024  |

Line-breakable ruby аннотации с CSS-свойством `ruby-align` для восточноазиатской типографики.

**Значения `ruby-align`**: `space-around`, `space-between`, `start`, `center`

**Практическое применение**:

```css
/* Выравнивание ruby аннотаций */
ruby {
    ruby-align: space-between;
}

rt {
    ruby-align: center;
}
```

**Влияние**: Значительное улучшение для японской, китайской и корейской веб-типографики. Ruby
аннотации теперь могут естественно разрываться по строкам.

**Источники**:

- [Chrome for Developers: Line-breakable Ruby](https://developer.chrome.com/blog/line-breakable-ruby)

### 8.6. `font-variant-emoji`

**Статус**: Chrome 131+ (ноябрь 2024), Firefox 141+

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска   |
| ------- | -------- | -------------- |
| Chrome  | 131+     | Ноябрь 2024    |
| Firefox | 141+     | Ещё не выпущен |
| Safari  | Пока нет | -              |
| Edge    | 131+     | Ноябрь 2024    |

Управляет стилем представления emoji (цветной emoji vs. текстовое представление).

**Значения**: `normal`, `text`, `emoji`, `unicode`

**Практическое применение**:

```css
/* Принудительный текстовый стиль */
.monochrome {
    font-variant-emoji: text;
}

/* Принудительный emoji стиль */
.colorful {
    font-variant-emoji: emoji;
}
```

**Источники**:

- Chrome 131 beta release notes

### 8.7. Альтернативный текст для CSS свойства `content`

**Статус**: Firefox 128+ (июль 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска  |
| ------- | -------- | ------------- |
| Chrome  | 77+      | Сентябрь 2019 |
| Firefox | 128+     | Июль 2024     |
| Safari  | Пока нет | -             |
| Edge    | 77+      | Сентябрь 2019 |

Позволяет предоставлять альтернативный текст для содержимого, генерируемого через CSS свойство
`content`, улучшая доступность.

**Практическое применение**:

```css
.icon::before {
    content: url(icon.png) / 'Описание иконки';
}
```

**Источники**:

- Firefox 128 release notes

## 9. Layout

### 9.1. Subgrid

**Статус**: Baseline Widely Available (сентябрь 2023)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска  |
| ------- | ------ | ------------- |
| Chrome  | 117+   | Сентябрь 2023 |
| Firefox | 71+    | Декабрь 2019  |
| Safari  | 16.0+  | Сентябрь 2022 |
| Edge    | 117+   | Сентябрь 2023 |

Позволяет вложенным grid наследовать треки родительского grid, обеспечивая сложные выровненные
раскладки.

**Практическое применение**:

```css
/* Родительский grid */
.grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1rem;
}

/* Вложенный subgrid */
.grid-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 3;
}
```

**Источники**:

- Часть Interop 2024 Layout focus area

### 9.2. CSS Masonry Layout (продолжающиеся дебаты)

**Статус**: Экспериментальный (Safari Technology Preview, Firefox за флагом)

**Поддержка браузерами**:

| Браузер | Версия                    | Статус       |
| ------- | ------------------------- | ------------ |
| Chrome  | В разработке              | -            |
| Firefox | За флагом                 | about:config |
| Safari  | Safari Technology Preview | Эксп.        |
| Edge    | Пока нет                  | -            |

Создаёт Pinterest-style masonry раскладки нативно в CSS.

**First Public Working Draft**: Сентябрь 2024

**Дебаты синтаксиса**:

- **Позиция WebKit/Apple**: Masonry как часть CSS Grid (`grid-template-rows: masonry`)
- **Позиция Chrome**: Отдельный `masonry` display type

**Текущий экспериментальный синтаксис**:

```css
/* Подход WebKit/Firefox */
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: masonry;
}

/* Предлагаемая альтернатива Chrome */
.container {
    display: masonry;
    masonry-template-columns: repeat(3, 1fr);
}
```

**Статус в 2024**: Продолжается период обратной связи сообщества, пока нет стабильной браузерной
реализации.

**Источники**:

- [WebKit Blog: Help us invent masonry layouts for CSS Grid Level 3](https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/)

### 9.3. Flexbox `align-content` для блочных раскладок

**Статус**: Firefox 125+ (апрель 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска |
| ------- | -------- | ------------ |
| Chrome  | 123+     | Март 2024    |
| Firefox | 125+     | Апрель 2024  |
| Safari  | Пока нет | -            |
| Edge    | 123+     | Март 2024    |

Свойство `align-content` теперь работает с раскладками `display: block`, обеспечивая вертикальное
центрирование без flexbox или grid.

**Практическое применение**:

```css
/* Вертикальное центрирование в блочной раскладке */
.container {
    display: block;
    align-content: center;
    height: 300px;
}
```

**Источники**:

- Firefox 125 release notes

### 9.4. Логические свойства

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2021+)

Flow-relative свойства, адаптирующиеся к writing mode и направлению, заменяющие физические свойства.

**Ключевые свойства**:

- `inline-size` / `block-size` (вместо width/height)
- `inset-block`, `inset-inline` (вместо top/bottom, left/right)
- `margin-block`, `margin-inline`, `padding-block`, `padding-inline`
- `border-block`, `border-inline`

**Практическое применение**:

```css
/* Логический sizing */
.box {
    inline-size: 300px; /* width в горизонтальном письме */
    block-size: 200px; /* height в горизонтальном письме */
}

/* Логический spacing */
.element {
    margin-block-start: 1rem; /* top в горизонтальном письме */
    margin-inline-end: 2rem; /* right в LTR */
    padding-block: 1rem; /* вертикальный padding */
    padding-inline: 2rem; /* горизонтальный padding */
}

/* Логическое позиционирование */
.positioned {
    position: absolute;
    inset-block-start: 0; /* top */
    inset-inline-end: 0; /* right в LTR */
}

/* Shorthand */
.element {
    inset-inline: 1rem 2rem; /* left и right */
    inset-block: 0 auto; /* top и bottom */
    inset: 1rem 2rem 3rem 4rem; /* все стороны */
}
```

**Преимущества**:

- Дружественны к интернационализации
- Работают с RTL и вертикальными writing modes
- Future-proof раскладки

**Источники**:

- [CSSWG Drafts: CSS Logical Properties](https://drafts.csswg.org/css-logical-1/)

## 10. Custom Properties и `@property`

### 10.1. At-правило `@property`

**Статус**: Baseline Newly Available (июль 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 85+    | Август 2020  |
| Firefox | 128+   | Июль 2024    |
| Safari  | 16.4+  | Март 2023    |
| Edge    | 85+    | Август 2020  |

Регистрирует custom properties с определениями типов, начальными значениями и поведением
наследования, обеспечивая анимацию ранее не анимируемых свойств.

**Часть Interop 2024**

**Ключевые особенности**:

- Определения синтаксиса типов
- Требования начальных значений
- Контроль наследования
- Обеспечивает анимации градиентов, компонентов трансформации и других сложных свойств

**Практическое применение**:

```css
/* Регистрация типизированного custom property */
@property --hue {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

/* Теперь можно анимировать */
.element {
    --hue: 0deg;
    background: hsl(var(--hue) 100% 50%);
    transition: --hue 1s;
}

.element:hover {
    --hue: 360deg;
}

/* Анимация цветов градиента */
@property --gradient-start {
    syntax: '<color>';
    initial-value: blue;
    inherits: false;
}

@property --gradient-end {
    syntax: '<color>';
    initial-value: red;
    inherits: false;
}

.gradient-box {
    --gradient-start: blue;
    --gradient-end: red;
    background: linear-gradient(var(--gradient-start), var(--gradient-end));
    transition:
        --gradient-start 0.5s,
        --gradient-end 0.5s;
}

.gradient-box:hover {
    --gradient-start: purple;
    --gradient-end: orange;
}
```

**Поддерживаемые значения Syntax**:

- `<length>`, `<length-percentage>`
- `<number>`, `<integer>`
- `<percentage>`
- `<color>`
- `<angle>`
- `<time>`
- `<resolution>`
- `<image>`, `<url>`
- `<transform-function>`, `<transform-list>`
- `<custom-ident>`
- Комбинации с оператором `|`

**JavaScript API**:

```javascript
CSS.registerProperty({
    name: '--my-prop',
    syntax: '<color>',
    initialValue: 'black',
    inherits: false,
});
```

**Замечание о производительности**: Анимации custom property выполняются на main thread, даже для
GPU-accelerated свойств.

**Источники**:

- [web.dev: @property Baseline](https://web.dev/blog/at-property-baseline)

## 11. Формы и пользовательское взаимодействие

### 11.1. `field-sizing: content`

**Статус**: Chrome 123+ (март 2024)

**Поддержка браузерами**:

| Браузер | Версия   | Дата выпуска |
| ------- | -------- | ------------ |
| Chrome  | 123+     | Март 2024    |
| Firefox | Пока нет | -            |
| Safari  | Пока нет | -            |
| Edge    | 123+     | Март 2024    |

Обеспечивает автоматическое увеличение/уменьшение controls форм (inputs, textareas, selects) для
подгонки под содержимое.

**Практическое применение**:

```css
/* Автоматически растущий textarea */
textarea {
    field-sizing: content;
    max-block-size: 300px; /* Опциональный лимит */
}

/* Автоматический sizing input */
input[type='text'] {
    field-sizing: content;
    min-inline-size: 10ch;
}

/* Select элемент */
select {
    field-sizing: content;
}
```

**Поведение**:

- Элементы растут настолько широко, насколько нужно для содержимого
- Если ограничены по width, textareas растут в height
- При ограничении height появляется scrollbar

**Влияние**: Устраняет необходимость в JavaScript-based решениях для автоматического роста.

**Источники**:

- [MDN: field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing)

### 11.2. `accent-color`

**Статус**: Baseline Widely Available (с 2022)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска  |
| ------- | ------ | ------------- |
| Chrome  | 93+    | Август 2021   |
| Firefox | 92+    | Сентябрь 2021 |
| Safari  | 15.4+  | Март 2022     |
| Edge    | 93+    | Август 2021   |

Устанавливает accent цвет для controls форм вроде checkboxes, radio buttons, range sliders и
progress элементов.

**Затронутые элементы**:

- `<input type="checkbox">`
- `<input type="radio">`
- `<input type="range">`
- `<progress>`

**Практическое применение**:

```css
/* Глобальный accent цвет */
:root {
    accent-color: #0066cc;
}

/* Цвета для отдельных элементов */
.checkbox-primary {
    accent-color: blue;
}

.checkbox-danger {
    accent-color: red;
}

/* С автоматической регулировкой контраста */
input[type='checkbox'] {
    accent-color: #ffcc00; /* Светлый цвет */
    /* Галочка автоматически становится темнее для доступности */
}
```

**Доступность**: Браузеры автоматически регулируют цвет checkmark/indicator для достаточного
контраста.

**Источники**:

- [MDN: accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)

### 11.3. Popover API

**Статус**: Baseline Newly Available (апрель 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска  |
| ------- | ------ | ------------- |
| Chrome  | 114+   | Май 2023      |
| Firefox | 125+   | Апрель 2024   |
| Safari  | 17.0+  | Сентябрь 2023 |
| Edge    | 114+   | Май 2023      |

Нативный функционал popover с атрибутом `popover`, интегрированный со стилизацией CSS включая
`::backdrop`.

**Часть Interop 2024**

**HTML атрибуты**:

- `popover`: отмечает элемент как popover
- `popovertarget`: связывает кнопку с popover
- `popovertargetaction`: `show`, `hide`, `toggle`

**CSS псевдоэлементы**:

- `::backdrop`: стилизует popover backdrop
- Работает с anchor positioning (Chrome 125+)

**Практическое применение**:

```html
<!-- HTML -->
<button popovertarget="my-popover">Открыть Popover</button>
<div id="my-popover" popover>
    <p>Содержимое popover</p>
</div>
```

```css
/* CSS */
[popover] {
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
}

/* Стилизация backdrop */
[popover]::backdrop {
    background: rgb(0 0 0 / 0.5);
    backdrop-filter: blur(4px);
}

/* Анимация входа с @starting-style */
[popover] {
    opacity: 1;
    transition:
        opacity 0.3s,
        display 0.3s allow-discrete;
}

@starting-style {
    [popover] {
        opacity: 0;
    }
}

/* С anchor positioning (Chrome 125+) */
[popover] {
    position: absolute;
    position-anchor: --trigger;
    position-area: bottom;
    margin-top: 0.5rem;
}
```

**Источники**:

- [Chrome for Developers: Popover API](https://developer.chrome.com/blog/introducing-popover-api)

### 11.4. Улучшения `<details>` и `<summary>`

**Статус**: Exclusive accordion (Chrome 120+, Safari 17.2+, Firefox 130+), Advanced styling (Chrome
131+)

**Поддержка браузерами**:

| Браузер | Версия                            | Дата выпуска  |
| ------- | --------------------------------- | ------------- |
| Chrome  | 120+ (exclusive), 131+ (advanced) | 2024          |
| Firefox | 130+ (exclusive)                  | Сентябрь 2024 |
| Safari  | 17.2+ (exclusive)                 | Декабрь 2023  |
| Edge    | 120+ (exclusive), 131+ (advanced) | 2024          |

**Новые возможности**:

- Exclusive accordion через атрибут `name`
- Новый псевдоэлемент `::details-content` (Chrome 131+)
- Расширенная поддержка свойства `display` (Chrome 131+)

**Практическое применение**:

```html
<!-- Exclusive accordion -->
<details name="faq">
    <summary>Вопрос 1</summary>
    <p>Ответ 1</p>
</details>
<details name="faq">
    <summary>Вопрос 2</summary>
    <p>Ответ 2</p>
</details>
```

```css
/* Базовая стилизация */
details[open] {
    background: #f0f0f0;
}

summary {
    cursor: pointer;
    padding: 1rem;
}

/* Chrome 131+: ::details-content псевдоэлемент */
details::details-content {
    padding: 1rem;
    animation: slide-down 0.3s ease-out;
}

@keyframes slide-down {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Chrome 131+: Display свойство на details */
details {
    display: flex; /* Теперь разрешено! */
    flex-direction: column;
}
```

**Дополнение 2024**: Теперь можно анимировать к `height: auto` используя `calc-size()` или
`interpolate-size`.

**Источники**:

- [MDN: HTML details exclusive accordions](https://developer.mozilla.org/en-US/blog/html-details-exclusive-accordions/)

## 12. Скроллинг и overflow

### 12.1. `scrollbar-width` и `scrollbar-color`

**Статус**: Baseline Newly Available (декабрь 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска |
| ------- | ------ | ------------ |
| Chrome  | 121+   | Январь 2024  |
| Firefox | 64+    | Декабрь 2018 |
| Safari  | 15.4+  | Март 2022    |
| Edge    | 121+   | Январь 2024  |

Стандартизированная стилизация scrollbar без vendor prefixes.

**Часть Interop 2024**

**Практическое применение**:

```css
/* Тонкие scrollbars */
.container {
    scrollbar-width: thin;
}

/* Auto (default) или none */
.container {
    scrollbar-width: auto;
    scrollbar-width: none; /* Скрыть scrollbars */
}

/* Кастомные цвета */
.container {
    scrollbar-color: #6969dd #e0e0e0; /* thumb track */
}

/* Dark mode scrollbars */
@media (prefers-color-scheme: dark) {
    .container {
        scrollbar-color: #888 #222;
    }
}
```

**Значения**:

- `scrollbar-width`: `auto`, `thin`, `none`
- `scrollbar-color`: `<color> <color>` (thumb, затем track)

**Источники**:

- [web.dev: Baseline Scrollbar Props](https://web.dev/blog/baseline-scrollbar-props)

### 12.2. `scrollbar-gutter`

**Статус**: Baseline Newly Available (декабрь 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска  |
| ------- | ------ | ------------- |
| Chrome  | 94+    | Сентябрь 2021 |
| Firefox | 97+    | Февраль 2022  |
| Safari  | 17.2+  | Декабрь 2023  |
| Edge    | 94+    | Сентябрь 2021 |

Резервирует пространство для scrollbar, предотвращая layout shifts при появлении/исчезновении
scrollbar.

**Часть Interop 2024**

**Практическое применение**:

```css
/* Всегда резервировать пространство scrollbar */
.container {
    overflow: auto;
    scrollbar-gutter: stable;
}

/* Резервирование пространства с обеих сторон */
.container {
    scrollbar-gutter: stable both-edges;
}

/* Auto (default) - без резервирования */
.container {
    scrollbar-gutter: auto;
}
```

**Значения**: `auto`, `stable`, `stable both-edges`

**Кейс использования**: Defensive CSS для предотвращения content shift при изменяющейся длине
контента.

**Источники**:

- [web.dev: Baseline Scrollbar Props](https://web.dev/blog/baseline-scrollbar-props)

### 12.3. Keyboard-Focusable Scroll Containers

**Статус**: Chrome 127+ (июль 2024)

**Поддержка браузерами**:

| Браузер | Версия           | Дата выпуска |
| ------- | ---------------- | ------------ |
| Chrome  | 127+             | Июль 2024    |
| Firefox | Давняя поддержка | -            |
| Safari  | Давняя поддержка | -            |
| Edge    | 127+             | Июль 2024    |

Scroll containers теперь по умолчанию получают keyboard focus в Chrome, соответствуя другим
браузерам.

**Влияние**: Улучшенная доступность для пользователей клавиатурной навигации.

**Источники**:

- [web.dev: Web Platform 07-2024](https://web.dev/blog/web-platform-07-2024)

### 12.4. `overflow: clip`

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2021+)

Обрезает overflow без создания scrolling контекста.

**Практическое применение**:

```css
.element {
    overflow: clip; /* vs overflow: hidden */
}
```

**Отличие от `hidden`**: Не создаёт scroll container или не разрешает программный скроллинг.

**Источники**:

- [MDN: overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)

## 13. Рендеринг и производительность

### 13.1. `content-visibility`

**Статус**: Baseline Newly Available (сентябрь 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска                  |
| ------- | ------ | ----------------------------- |
| Chrome  | 85+    | Август 2020                   |
| Firefox | 125+   | Апрель 2024 (`auto` значение) |
| Safari  | 18.0+  | Сентябрь 2024                 |
| Edge    | 85+    | Август 2020                   |

Контролирует, рендерит ли элемент своё содержимое, обеспечивая значительные улучшения
производительности рендеринга.

**Значения**:

- `visible` (default)
- `hidden`: пропустить рендеринг, но сохранить структуру
- `auto`: пропустить рендеринг, если off-screen

**Практическое применение**:

```css
/* Автоматический пропуск off-screen контента */
.article-section {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px; /* Предотвращение layout shift */
}

/* Полное скрытие контента */
.hidden-section {
    content-visibility: hidden;
}
```

**Влияние на производительность**:

- В 7 раз быстрее начальный рендеринг в тестах
- Время рендеринга: 232ms → 30ms (пример)

**Best Practice**: Всегда использовать `contain-intrinsic-size` с `auto` для предотвращения layout
shifts.

**Источники**:

- [web.dev: CSS content-visibility Baseline](https://web.dev/blog/css-content-visibility-baseline)

### 13.2. `contain-intrinsic-size`

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2021+)

Предоставляет placeholder размер для элементов с `content-visibility: auto`, предотвращая layout
shifts.

**Практическое применение**:

```css
.section {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px;
}

/* Отдельные размерности */
.section {
    contain-intrinsic-width: auto 300px;
    contain-intrinsic-height: auto 400px;
}
```

**Источники**:

- [MDN: contain-intrinsic-size](https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size)

## 14. Motion Path и трансформации

### 14.1. CSS Motion Path (offset-path, offset-position)

**Статус**: Baseline Newly Available (январь 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска                    |
| ------- | ------ | ------------------------------- |
| Chrome  | 46+    | Октябрь 2015                    |
| Firefox | 122+   | Январь 2024 (`offset-position`) |
| Safari  | 16.0+  | Сентябрь 2022                   |
| Edge    | 79+    | Январь 2020                     |

Обеспечивает анимацию элементов вдоль определённых путей без JavaScript.

**Ключевые свойства**:

- `offset-path`: определяет путь
- `offset-distance`: позиция вдоль пути
- `offset-rotate`: вращение вдоль пути
- `offset-anchor`: точка якоря на элементе
- `offset-position`: начальная позиция (Firefox 122+)

**Практическое применение**:

```css
/* Круговой путь */
.element {
    offset-path: circle(50%);
    offset-distance: 0%;
    animation: move-along-path 3s infinite;
}

@keyframes move-along-path {
    to {
        offset-distance: 100%;
    }
}

/* Кастомный путь */
.element {
    offset-path: path('M 0 0 Q 50 100 100 0');
    offset-rotate: auto; /* Следовать направлению пути */
}

/* Базовые фигуры */
.element {
    offset-path: circle(100px at center);
    offset-path: ellipse(50% 30% at center);
    offset-path: polygon(0 0, 100% 0, 50% 100%);
}

/* SVG URL */
.element {
    offset-path: url(#my-path);
}
```

**Историческая заметка**: Первоначально называлось `motion-path`, переименовано в `offset-path` для
отражения use case статического позиционирования.

**Источники**:

- Firefox 122 release notes

### 14.2. `transform-box: content-box` и `stroke-box`

**Статус**: Firefox 125+ (апрель 2024)

**Поддержка браузерами**:

| Браузер | Версия                     | Дата выпуска |
| ------- | -------------------------- | ------------ |
| Chrome  | Shipped (дата варьируется) | -            |
| Firefox | 125+                       | Апрель 2024  |
| Safari  | Shipped                    | -            |
| Edge    | Shipped                    | -            |

Дополнительные значения `transform-box` для более точного контроля origin трансформации.

**Значения**:

- `content-box`: трансформация относительно content box
- `border-box`: трансформация относительно border box (default)
- `fill-box`: SVG fill bounding box
- `stroke-box`: SVG stroke bounding box
- `view-box`: SVG viewport

**Практическое применение**:

```css
/* Трансформация относительно content */
.element {
    transform-box: content-box;
    transform: rotate(45deg);
}

/* SVG stroke box */
.svg-element {
    transform-box: stroke-box;
    transform: scale(2);
}
```

**Источники**:

- Firefox 125 release notes

## 15. Masking и clipping

### 15.1. Фигуры `clip-path`

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2020+)

Создаёт clipping регионы используя базовые фигуры или SVG пути.

**Практическое применение**:

```css
/* Базовые фигуры */
.element {
    clip-path: circle(50%);
    clip-path: ellipse(40% 30% at center);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    clip-path: inset(10px 20px 30px 40px round 5px);
}

/* SVG путь */
.element {
    clip-path: path('M 0 0 L 100 0 L 100 100 Z');
}

/* URL ссылка */
.element {
    clip-path: url(#my-clip);
}

/* Анимируемый */
.element {
    clip-path: circle(50% at 50% 50%);
    transition: clip-path 0.3s;
}

.element:hover {
    clip-path: circle(70% at 50% 50%);
}
```

**Замечания по анимации**:

- Нельзя смешивать типы фигур (circle к polygon)
- Polygons должны поддерживать одинаковое количество вершин
- Можно анимировать параметры внутри одного типа фигуры

**Источники**:

- [MDN: clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)

### 15.2. `box-decoration-break: clone`

**Статус**: Полная поддержка в Chrome 130+ (октябрь 2024)

**Поддержка браузерами**:

| Браузер | Версия                       | Дата выпуска  |
| ------- | ---------------------------- | ------------- |
| Chrome  | 130+ (полная inline + block) | Октябрь 2024  |
| Firefox | 32+                          | Сентябрь 2014 |
| Safari  | Частичная (webkit-prefixed)  | -             |
| Edge    | 130+                         | Октябрь 2024  |

Контролирует, как рендерятся element decorations при разрыве по строкам, колонкам или страницам.

**Значения**:

- `slice` (default): декорации применяются к элементу целиком
- `clone`: декорации применяются к каждому фрагменту независимо

**Практическое применение**:

```css
/* Эффект выделенного текста */
.highlight {
    background: yellow;
    padding: 0.2em 0.5em;
    border-radius: 4px;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}

/* Многострочный заголовок с рамкой */
h1 {
    border: 2px solid blue;
    padding: 0.5rem;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
}
```

**Обновление Chrome 130**: Теперь поддерживает как inline fragmentation (перенос строк), так и block
fragmentation (печать, multicol).

**Источники**:

- [Chrome for Developers: box-decoration-break](https://developer.chrome.com/blog/box-decoration-break)

## 16. Media Queries и предпочтения

### 16.1. `prefers-color-scheme`

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2020+)

Детектирует системное предпочтение пользователя для светлых или тёмных цветовых схем.

**Практическое применение**:

```css
/* Светлый режим по умолчанию */
:root {
    --bg: white;
    --text: black;
}

/* Тёмный режим */
@media (prefers-color-scheme: dark) {
    :root {
        --bg: black;
        --text: white;
    }
}

/* Современная альтернатива: light-dark() */
:root {
    color-scheme: light dark;
    background: light-dark(white, black);
    color: light-dark(black, white);
}
```

**Источники**:

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

### 16.2. `prefers-reduced-motion`

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2019+)

Детектирует предпочтение пользователя для уменьшенного движения, важно для доступности.

**Значения**: `no-preference`, `reduce`

**Практическое применение**:

```css
/* Анимации по умолчанию */
.element {
  animation: slide 1s ease-out;
}

/* Отключение для предпочтения уменьшенного движения */
@media (prefers-reduced-motion: reduce) {
  .element {
    animation: none;
  }

  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* JavaScript детекция */
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

if (prefersReducedMotion.matches) {
  // Отключение анимаций
}
```

**Источники**:

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

### 16.3. Media Query `scripting`

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2022+)

Детектирует, доступен ли и включён ли scripting (JavaScript).

**Значения**: `none`, `initial-only`, `enabled`

**Практическое применение**:

```css
/* Стили без JavaScript */
@media (scripting: none) {
    .js-only {
        display: none;
    }
}

/* JavaScript доступен */
@media (scripting: enabled) {
    .no-js-fallback {
        display: none;
    }
}
```

**Источники**:

- [MDN: scripting](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting)

## 17. CSS математические функции

### 17.1. Stepped Value функции: `round()`, `mod()`, `rem()`

**Статус**: Baseline 2024 (май 2024)

**Поддержка браузерами**:

| Браузер | Версия | Дата выпуска  |
| ------- | ------ | ------------- |
| Chrome  | 125+   | Май 2024      |
| Firefox | 118+   | Сентябрь 2023 |
| Safari  | 15.4+  | Март 2022     |
| Edge    | 125+   | Май 2024      |

Математические функции для операций округления, modulo и remainder в CSS.

**Browser Support**: Более 86% глобально (май 2024)

### Функция `round()`

**Синтаксис**: `round(<rounding-strategy>, <value>, <interval>)`

**Стратегии округления**:

- `nearest` (default): Как JavaScript `Math.round()`
- `up`: Как JavaScript `Math.ceil()`
- `down`: Как JavaScript `Math.floor()`
- `to-zero`: Как JavaScript `Math.trunc()`

**Практическое применение**:

```css
/* Округление font size к ближайшему rem */
.element {
    font-size: round(var(--my-font-size), 1rem);
}

/* Округление вверх к ближайшим 5px */
.element {
    width: round(up, 127px, 5px); /* Результат: 130px */
}

/* Округление вниз */
.element {
    padding: round(down, 18px, 4px); /* Результат: 16px */
}
```

### Функция `mod()`

Операция modulo, берущая знак делителя.

**Практическое применение**:

```css
/* Цикличность по значениям */
.element {
    --index: 7;
    --items: 3;
    grid-column: mod(var(--index), var(--items)); /* Результат: 1 */
}
```

### Функция `rem()`

Операция remainder, берущая знак делимого.

**Практическое применение**:

```css
/* Вычисление остатка */
.element {
    --value: 17px;
    margin: rem(var(--value), 5px); /* Результат: 2px */
}

/* Отрицательное делимое */
.element {
    --value: -17px;
    margin: rem(var(--value), 5px); /* Результат: -2px */
}
```

**Источники**:

- [web.dev: CSS Stepped Value Functions](https://web.dev/blog/css-stepped-value-functions)

### 17.2. `min()`, `max()`, `clamp()` — продолжающееся использование

**Статус**: Baseline Widely Available

**Поддержка браузерами**: Все современные браузеры (2020+)

Функции сравнения для responsive sizing.

**Практическое применение**:

```css
/* Responsive width */
.element {
    width: min(100%, 800px);
    width: max(300px, 50%);
    width: clamp(300px, 50%, 800px);
}

/* Responsive font size */
.heading {
    font-size: clamp(1.5rem, 5vw, 3rem);
}
```

**Источники**:

- [MDN: CSS Values and Units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units)

### 17.3. Тригонометрические функции: `sin()`, `cos()`, `tan()`

**Статус**: Baseline Widely Available (2023)

**Поддержка браузерами**: Все современные браузеры (2023+)

Тригонометрические функции для продвинутых раскладок и анимаций.

**Практическое применение**:

```css
/* Круговое позиционирование */
.element {
    --angle: 45deg;
    --radius: 100px;
    left: calc(50% + cos(var(--angle)) * var(--radius));
    top: calc(50% + sin(var(--angle)) * var(--radius));
}
```

**Источники**:

- [MDN: CSS Values and Units Module Level 4](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units)

## 18. Interop 2024 — финальные результаты

### Обзор

**Проект**: Interop 2024 — мультибраузерная коллаборация для web platform interoperability

**Участники**: Chrome, Edge, Firefox, Safari

**Начальная позиция** (январь 2024): 46% тестов проходит во всех браузерах

**Финальная позиция** (декабрь 2024): 95% тестов проходит во всех браузерах

**Индивидуальные показатели браузеров** (декабрь 2024):

| Браузер                   | Показатель |
| ------------------------- | ---------- |
| Chrome 131                | 95%        |
| Edge 131                  | 95%        |
| Firefox 133               | 95%        |
| Safari 18.2               | 98%        |
| Safari Technology Preview | 99%        |

**Preview браузеры**: Все четыре достигли 99%

**Историческое сравнение**: Предыдущие Interop годы достигали 83-87% финальных показателей, делая
2024 самым успешным годом.

### 17 Focus Areas

1. **Accessibility**: 1000+ тестов, достигающих 99.7% interoperability
2. **CSS Nesting**: Baseline Newly Available (май 2024)
3. **Custom Properties (@property)**: Baseline Newly Available (июль 2024)
4. **Declarative Shadow DOM**: Улучшенная кросс-браузерная поддержка
5. **font-size-adjust**: Baseline Newly Available (июль 2024)
6. **HTTPS URLs для WebSocket**: Улучшение протокола
7. **IndexedDB**: Улучшения Database API
8. **Layout (Grid, Flexbox, Subgrid)**: Единые улучшения
9. **Pointer and Mouse Events**: 31.9% → 87.2% в preview браузерах
10. **popover**: Baseline Newly Available (апрель 2024)
11. **Relative Color Syntax**: Включая ключевое слово `currentcolor`
12. **requestVideoFrameCallback**: Улучшение Video API
13. **Scrollbar Styling**: `scrollbar-width`, `scrollbar-color`, `scrollbar-gutter`
14. **@starting-style & transition-behavior**: Анимации входа/выхода
15. **text-wrap: balance**: Балансированная текстовая раскладка
16. **Text Directionality**: Улучшенная интернационализация
17. **URL Standard**: Улучшения URL API

### Разбивка CSS-intensive Focus Areas

**CSS Nesting**:

- Relaxed синтаксис
- Нативная браузерная поддержка
- Устранена необходимость в препроцессорах

**@property**:

- Type-safe custom properties
- Анимация градиентов, цветов, трансформаций
- Firefox 128, достигающий кросс-браузерной поддержки

**font-size-adjust**:

- Реализация Chrome 127
- Консистентный font sizing для fallbacks

**Layout**:

- Зрелость Subgrid
- Улучшения Flexbox
- Расширение Container Queries

**Scrollbar Styling**:

- Baseline Newly Available декабрь 2024
- Стандартные свойства без vendor prefixes

**@starting-style & transition-behavior**:

- Анимации входа для элементов
- Переходы дискретных свойств
- Анимация display свойства

**text-wrap: balance**:

- Улучшение типографики
- Балансированные заголовки
- Кросс-браузерная поддержка

**Источники**:

- [WebKit: The Success of Interop 2024](https://webkit.org/blog/16413/the-success-of-interop-2024/)
- [web.dev: Interop 2024](https://web.dev/blog/interop-2024)

## 19. Baseline 2024 — функции, достигшие Baseline

### Newly Available (2024)

Функции, ставшие interoperable во всех основных браузерах в 2024:

**Июль 2024**:

- `@property` правило и `CSS.registerProperty()`
- `font-size-adjust`

**Август 2024**:

- `transition-behavior: allow-discrete`
- `@starting-style`

**Май 2024**:

- CSS Nesting
- Функция `light-dark()`

**Март 2024**:

- `text-wrap: balance`

**Апрель 2024**:

- Popover API

**Сентябрь 2024**:

- `content-visibility: auto` (Firefox 125)

**Декабрь 2024**:

- `scrollbar-width`, `scrollbar-color`, `scrollbar-gutter`

**Январь 2024**:

- CSS Motion Path (offset-position в Firefox)

### Widely Available (До 2024, зрелость в 2024)

Функции, достигшие 30+ месяцев доступности:

- Container Queries (size)
- Псевдокласс `:has()`
- `color-mix()`
- Цвета OKLCH, OKLAB, Display-P3
- Cascade Layers (`@layer`)
- Subgrid
- `accent-color`
- Относительный синтаксис цветов
- Логические свойства

**Источники**:

- [web.dev: Baseline 2024](https://web.dev/baseline/2024)

## 20. Спецификации CSSWG — обновления 2024

### CSS Snapshot 2024

**Документ**: CSS Snapshot 2024

**URL**: https://drafts.csswg.org/css-2024/

**Статус**: W3C Group Note

**Цель**: Собирает все спецификации, формирующие текущее состояние CSS на 2024 год.

### Спецификации Level 4

Активные спецификации Level 4 в 2024:

1. **CSS Conditional Rules Module Level 4**
    - Расширенный `@supports` для тестирования селекторов
    - Функция `selector()`

2. **CSS Box Model Module Level 4**
    - Уточнения `margin` и `padding`

3. **CSS Text Module Level 4**
    - `text-wrap`, `text-spacing-trim`
    - Улучшения переноса строк, выравнивания

4. **CSS Values and Units Module Level 4**
    - Функции `round()`, `mod()`, `rem()`
    - `calc-size()` для intrinsic sizing

5. **CSS Sizing Level 4**
    - Свойство `aspect-ratio`
    - Улучшения intrinsic sizing

### Спецификации Level 5

Возникающие спецификации Level 5 в 2024:

1. **CSS Cascading and Inheritance Level 5**
    - Расширяет Level 4 с `@layer`

2. **CSS Color Level 5**
    - Функция `color-mix()`
    - Относительный синтаксис цветов

3. **CSS Fonts Module Level 5**
    - Опубликован как First Public Working Draft
    - Модификации к Fonts 4

4. **Selectors Level 5**
    - Стадия Editor's Draft
    - Новые псевдоклассы

5. **CSS Overflow Module Level 5**
    - Строится на Level 4
    - Генерация scrolling controls

6. **CSS Values and Units Level 5**
    - First Public Working Draft сентябрь 2024
    - Новые generic value функции
    - Diff spec поверх Level 4

### Другие заметные спецификации

**CSS Grid Layout Module Level 3**:

- First Public Working Draft сентябрь 2024
- Включает masonry layout
- Продолжающиеся дебаты синтаксиса

**CSS Anchor Positioning Module Level 1**:

- Anchor positioning API
- `position-area`, функция `anchor()`
- Реализация Chrome 125+

**CSS View Transitions Module Level 2**:

- Cross-document transitions
- `view-transition-class`
- Поддержка MPA

**CSS Scroll-driven Animations Module Level 1**:

- Timeline `scroll()` и `view()`
- Свойство `animation-range`
- В настоящее время только Chrome

**Источники**:

- [CSSWG Drafts](https://drafts.csswg.org/)
- [CSS Snapshot 2024](https://drafts.csswg.org/css-2024/)

## 21. Browser-specific highlights

### Highlights Chrome/Edge 2024

**Chrome 121** (январь):

- `scrollbar-color`, `scrollbar-width`

**Chrome 122** (февраль):

- Улучшения наследования `::backdrop`

**Chrome 123** (март):

- Функция `light-dark()`
- `field-sizing: content`
- `text-spacing-trim`

**Chrome 125** (май):

- CSS Anchor Positioning API
- `anchor()`, `position-anchor`, `position-area`

**Chrome 126** (май):

- Cross-document View Transitions
- At-правило `@view-transition`

**Chrome 127** (июль):

- `font-size-adjust`
- Keyboard-focusable scroll containers

**Chrome 128** (август):

- Свойство `ruby-align`
- Line-breakable ruby

**Chrome 129** (сентябрь):

- Свойство `interpolate-size`
- Функция `calc-size()`

**Chrome 130** (октябрь):

- `box-decoration-break: clone` (полная поддержка)
- CSS Nested Declarations

**Chrome 131** (ноябрь):

- CSS paged media `@page` margin boxes
- Псевдоэлемент `::details-content`
- Свойство `display` на `<details>`/`<summary>`
- Свойство `anchor-scope`
- `font-variant-emoji`

### Highlights Firefox 2024

**Firefox 122** (январь):

- Свойство `offset-position`
- Улучшения `offset-path` (basic-shape, coord-box, url())

**Firefox 124** (март):

- `text-wrap` преобразован в shorthand
- `text-wrap-mode`, `text-wrap-style`
- `::first-letter`, `::first-line` на SVG `<text>`
- Поддержка `content-visibility`

**Firefox 125** (апрель):

- `align-content` для `display: block`
- `transform-box: content-box` и `stroke-box`
- `content-visibility: auto` включён

**Firefox 128** (июль):

- At-правило `@property`
- Относительный синтаксис цветов
- Альтернативный текст для свойства `content`

**Firefox 129** (август):

- `@starting-style`
- `transition-behavior: allow-discrete`
- Алиас `-webkit-font-feature-settings`

**Firefox 130** (сентябрь):

- Exclusive accordions (атрибут name на `<details>`)

**Firefox 131** (октябрь):

- `inset-area` переименован в `position-area`
- Псевдоэлемент `::target-text`

**Firefox 132** (октябрь):

- CSS Nested Declarations

### Highlights Safari 2024

**Safari 17.2** (декабрь 2023):

- `rect()` и `xywh()` для `clip-path`
- Свойство `counter-set`

**Safari 17.4** (март):

- Свойство `transition-behavior`
- CSS переменные в `::backdrop`
- `::grammar-error`, `::spelling-error`
- Расширенный `:has()` с `:link`, `:any-link`

**Safari 17.5** (май):

- `text-wrap: balance`
- Функция `light-dark()`
- `@starting-style`
- `supports()` для `@import`

**Safari 17.6** (июль):

- Ключевое слово `safe` для Flexbox alignment

**Safari 18.0** (сентябрь):

- Переходы свойства `display`
- Относительный синтаксис цветов
- Улучшения прозрачности `accent-color`

**Источники**:

- [WebKit Blog](https://webkit.org/blog/)
- Серия WebKit Features in Safari

## 22. Deprecations и removals

### Deprecations типов Media

**Источник**: CSS Snapshot 2024

**Статус**: Большинство media types deprecated кроме:

- `all`
- `print`
- `screen`
- `speech`

**Deprecated Types**: `braille`, `embossed`, `handheld`, `projection`, `tty`, `tv`

### Прекращение Vendor Prefix

**Политика**: После стабилизации функций, версии с vendor prefix должны быть удалены.

**Guideline**: Реализации должны поддерживать как префиксные, так и без префикса версии в период
перехода, удаляя префиксную версию при стабилизации.

**Примеры в 2024**:

- `-webkit-box-decoration-break` → `box-decoration-break` (Chrome 130)
- `-webkit-font-feature-settings` только как алиас (Firefox 129)

### Удаления Legacy функций

**CSS Expressions**: IE-специфичная функция, никогда не стандартизировалась, не поддерживается в
современных браузерах.

**Web Select**: Deprecated в Edge 117 (2023).

**Unload Event**: Deprecated для надёжности, часть продолжающейся модернизации.

## 23. Источники и ссылки

### Официальные браузерные источники

**Chrome/Chromium**:

- Chrome Platform Status: https://chromestatus.com/
- Chrome for Developers Blog: https://developer.chrome.com/blog
- Chrome Releases: https://chromereleases.googleblog.com/
- New in Chrome series: https://developer.chrome.com/blog/new-in-chrome-*
- CSS Wrapped 2024: https://chrome.dev/css-wrapped-2024/

**Firefox**:

- Firefox Release Notes: https://www.mozilla.org/en-US/firefox/releases/
- MDN Release Notes: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/*
- Mozilla Hacks: https://hacks.mozilla.org/

**Safari/WebKit**:

- WebKit Blog: https://webkit.org/blog/
- Safari Release Notes: https://developer.apple.com/documentation/safari-release-notes/
- WebKit Features in Safari: https://webkit.org/blog/ (множество постов)

### Ресурсы Web Platform

**MDN Web Docs**:

- https://developer.mozilla.org/
- Основной справочник для CSS свойств, селекторов, at-правил
- Данные браузерной совместимости

**web.dev**:

- https://web.dev/
- Серия New to the web platform (ежемесячно)
- Объявления Baseline
- Руководства по функциям

**Web Platform Baseline**:

- https://web.dev/baseline
- Функции Baseline 2024: https://web.dev/baseline/2024
- Серия Newly Available: https://web.dev/series/baseline-newly-available

**Interop 2024**:

- https://wpt.fyi/interop-2024
- https://web.dev/blog/interop-2024
- Финальные результаты: https://webkit.org/blog/16413/the-success-of-interop-2024/

### Спецификации

**CSSWG Drafts**:

- https://drafts.csswg.org/
- CSS Snapshot 2024: https://drafts.csswg.org/css-2024/
- GitHub: https://github.com/w3c/csswg-drafts

**Ключевые спецификации**:

- CSS Nesting: https://drafts.csswg.org/css-nesting/
- CSS Anchor Positioning: https://drafts.csswg.org/css-anchor-position-1/
- CSS Color 4/5: https://drafts.csswg.org/css-color-4/ и css-color-5/
- CSS Containment: https://drafts.csswg.org/css-contain-2/ и css-contain-3/
- CSS Scroll-driven Animations: https://drafts.csswg.org/scroll-animations-1/
- CSS View Transitions: https://drafts.csswg.org/css-view-transitions-1/ и -2/
- CSS Values and Units 4/5: https://drafts.csswg.org/css-values-4/ и css-values-5/
- CSS Grid 3: https://drafts.csswg.org/css-grid-3/

### Can I Use

- https://caniuse.com/
- Таблицы поддержки браузерами для всех функций
- Статистика глобального использования

## 24. Статистика итогов

**Всего рассмотрено функций**: 100+

**Baseline Newly Available в 2024**: 15+ функций

**Основные релизы браузеров**:

- Chrome: 12 релизов (121-132)
- Firefox: 13 релизов (121-133)
- Safari: 7+ релизов (17.2-18.2)

**Улучшение показателя Interop 2024**: 46% → 95% (49 процентных пунктов)

**Ключевые темы**:

1. Зрелость анимаций и переходов
2. Модернизация цветовых пространств
3. Улучшения типографики для глобальных аудиторий
4. Примитивы оптимизации производительности
5. Нативные функции, заменяющие JavaScript-решения

**Наиболее влиятельные функции**:

1. CSS Nesting (developer experience)
2. Anchor Positioning (сложные UI паттерны)
3. View Transitions (плавная навигация)
4. `@property` (возможности анимации)
5. `@starting-style` (анимации входа)
6. `light-dark()` (упрощение тёмного режима)
7. OKLCH/относительные цвета (манипуляция цветом)
8. Scroll-driven анимации (эффекты скролла)

## 25. Взгляд в будущее (контекст начала 2025)

**Interop 2025** был анонсирован с focus areas, включающими:

- CSS Anchor Positioning (продолжающаяся работа)
- Функции CSS Grid Level 3
- Дополнительные улучшения типографики
- Кросс-браузерная консистентность в существующих функциях

**Всё ещё в разработке**:

- Masonry layout (дебаты синтаксиса)
- Container style queries (за пределами custom properties)
- `@scope` более широкое внедрение
- Продвинутые функции view transitions
- Большее внедрение scroll-driven анимаций

**Возникающие паттерны**:

- Декларативные подходы, заменяющие JavaScript
- Performance-first CSS примитивы
- Поддержка глобальной типографики
- Accessibility-conscious дефолты
- Возможности прогрессивного улучшения

---

**Документ скомпилирован**: Январь 2025

**Охват исследования**: 1 января — 31 декабря 2024

**Общее количество слов**: ~18,000 слов

**Общее количество разделов**: 25 основных разделов, 100+ подразделов

## Выводы

2024 год стал вехой для CSS с беспрецедентным прогрессом в браузерной совместимости и зрелости
ключевых функций. Interop 2024 продемонстрировал силу межбраузерной коллаборации, достигнув 95%
показателя прохождения тестов — самого высокого в истории программы.

Ключевые достижения года включают достижение статуса Baseline множеством долгожданных функций, от
CSS Nesting до `@property`, от scroll-driven анимаций до anchor positioning. Эти возможности
фундаментально расширяют то, что можно достичь с чистым CSS, уменьшая зависимость от JavaScript для
распространённых UI паттернов.

Фокус на типографике, цветах и анимациях обеспечивает разработчиков мощными инструментами для
создания красивых, доступных и производительных веб-приложений. С продолжающимся импульсом через
Interop 2025, будущее CSS выглядит ярче, чем когда-либо.

## Рекомендации

### Для production использования в 2025

**Безопасно использовать сейчас** (Baseline Widely Available):

- Container Queries (size)
- Селектор `:has()`
- CSS Nesting
- `@layer` Cascade Layers
- Современные цветовые пространства (OKLCH, Display-P3)
- Относительный синтаксис цветов
- `color-mix()`
- Функция `light-dark()`
- `text-wrap: balance`
- Subgrid
- Логические свойства
- `@property`
- `scrollbar-width` и `scrollbar-color`
- Popover API
- `@starting-style` и `transition-behavior: allow-discrete`

**Использовать с осторожностью** (Baseline Newly Available, требуется тестирование):

- `font-size-adjust`
- `content-visibility: auto`
- CSS Nested Declarations
- View Transitions API (same-document)

**Экспериментальные** (требуется feature detection и fallbacks):

- Anchor Positioning (Chrome only)
- Scroll-driven Animations (Chrome only)
- `@scope` (Chrome only)
- Container Style Queries
- `interpolate-size` и `calc-size()`
- `field-sizing: content`
- Masonry Layout

### Best practices

1. **Используйте Baseline как ориентир**: Функции Baseline Widely Available безопасны для production
2. **Обеспечивайте graceful degradation**: Используйте `@supports` для экспериментальных функций
3. **Тестируйте кросс-браузерно**: Особенно для Baseline Newly Available функций
4. **Следите за Interop**: Focus areas Interop указывают на скорое улучшение поддержки
5. **Приоритизируйте доступность**: Используйте `prefers-reduced-motion`, обеспечивайте достаточный
   контраст
6. **Оптимизируйте производительность**: Используйте `content-visibility`, container queries вместо
   JS
7. **Embrace логические свойства**: Для лучшей интернационализации

---

**Конец документа**
