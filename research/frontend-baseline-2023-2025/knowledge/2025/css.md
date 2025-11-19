---
title: CSS — изменения 2025 года
description:
    Комплексный обзор изменений в CSS за 2025 год - Anchor Positioning, @property, Container Queries
    Baseline High, View Transitions, типографические инновации и кросс-браузерная совместимость
outline: deep
lastUpdated: true
---

# CSS — изменения 2025 года

- **Период**: 1 января 2025 — 18 ноября 2025 (11 месяцев)
- **Версии браузеров**: Chrome/Edge 133–142+, Firefox 134–144+, Safari 18.2–26.2+

## Обзор года

2025 год стал периодом зрелости и консолидации CSS функций, введённых в 2023–2024 годах. Ключевой
прорыв — достижение универсальной поддержки CSS Anchor Positioning после реализации в Safari 26, что
завершило многолетнее ожидание этой критически важной функции. Год характеризовался переходом
экспериментальных возможностей в статус production-ready и интенсивной работой в рамках
Interop 2025.

**Ключевые достижения 2025 года**:

- **Anchor Positioning**: универсальная поддержка после релиза Safari 26.0 (сентябрь 2025)
- **Container Queries**: достижение статуса Baseline High (август 2025)
- **`@property`**: зрелость после достижения Baseline в сентябре 2024 (93.02% покрытие)
- **View Transitions API**: универсальная поддержка same-document transitions с Firefox 144
- **Типографика**: стабилизация `text-box`, `text-wrap: balance/pretty`, улучшения вертикального
  выравнивания
- **Цвет**: полная поддержка relative color syntax, `contrast-color()` в Safari, широкие цветовые
  пространства
- **Формы**: революция с customizable `<select>`, `field-sizing`, dialog light dismiss
- **Scroll-driven Animations**: расширение поддержки с Safari 26, хотя Firefox остаётся за флагом
- **Enhanced `attr()`**: типизированные атрибуты открывают новые паттерны data-driven стилизации

## 1. Селекторы и псевдо-классы

### 1.1 `:has()` — зрелость и оптимизация

**Статус**: Baseline Low (декабрь 2023), широкая поддержка в 2025

Псевдо-класс `:has()` позволяет выбирать элементы на основе их потомков или следующих соседних
элементов. В 2025 году продолжилась оптимизация производительности, особенно в Safari 26.1, который
включил улучшения для работы со сложными деревьями DOM.

**Поддержка браузерами**:

- Chrome 105+ — август 2022
- Firefox 121+ — декабрь 2023
- Safari 15.4+ — март 2022
- Edge 105+

**Покрытие**: 92.62% глобальных браузеров (октябрь 2025)

**Спецификация**: [CSS Selectors Level 4](https://drafts.csswg.org/selectors-4/)

**Практическое применение**:

```css
/* Стилизация статьи, содержащей изображение */
article:has(img) {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

/* Стилизация формы с невалидными полями */
form:has(:invalid) {
    border: 2px solid red;
}

/* Стилизация карточек без изображений */
.card:not(:has(img)) {
    padding: 1rem;
    background: var(--card-bg-alt);
}

/* Стилизация контейнера на основе состояния вложенного элемента */
.container:has(.sidebar.collapsed) {
    grid-template-columns: 60px 1fr;
}
```

**Источники**:

- https://caniuse.com/css-has

### 1.2 `:open` — новый псевдо-класс для интерактивных элементов

**Статус**: Newly Available (Chrome 133, январь 2025)

Псевдо-класс `:open` соответствует элементам `<dialog>` и `<details>`, когда они находятся в
открытом состоянии, а также элементам `<select>` и `<input>`, когда отображается их picker.

**Поддержка браузерами**:

- Chrome 133+ — январь 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 133+

**Спецификация**: [HTML Standard](https://html.spec.whatwg.org/)

**Практическое применение**:

```css
/* Стилизация открытого диалога */
dialog:open {
    animation: slide-in 0.3s ease-out;
}

/* Стилизация открытого details элемента */
details:open summary {
    font-weight: bold;
    color: var(--primary-color);
}

/* Стилизация select с открытым picker */
select:open {
    outline: 2px solid var(--focus-color);
}
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-133

### 1.3 `:has-slotted` — псевдо-класс для Web Components

**Статус**: Experimental (Chrome 134 beta, февраль 2025)

Псевдо-класс `:has-slotted` представляет элемент `<slot>` со slotted контентом. Используется для
стилизации элементов на основе того, используется ли fallback контент слота.

**Поддержка браузерами**:

- Chrome 134+ — февраль 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 134+

**Спецификация**: [CSS Scoping Module Level 1](https://drafts.csswg.org/css-scoping/)

**Практическое применение**:

```css
/* В shadow DOM stylesheet */
slot:has-slotted {
    border: 1px solid var(--slot-border);
    padding: 0.5rem;
}

/* Стилизация, если используется fallback контент */
slot:not(:has-slotted) {
    opacity: 0.5;
    font-style: italic;
}
```

**Источники**:

- https://developer.chrome.com/blog/chrome-134-beta

### 1.4 `::highlight()` — улучшенное наследование

**Статус**: Улучшение в Chrome 134 (февраль 2025)

CSS highlight псевдо-классы теперь наследуют свои свойства через pseudo highlight chain, а не через
element chain. Это создаёт более интуитивную модель наследования для стилизации выделений.

**Поддержка браузерами**:

- Chrome 134+ — с улучшенным наследованием
- Firefox — частичная поддержка
- Safari — частичная поддержка
- Edge 134+

**Спецификация**: [CSS Pseudo-Elements Module Level 4](https://drafts.csswg.org/css-pseudo-4/)

**Практическое применение**:

```css
/* Пользовательские стили выделения текста */
::selection {
    background: var(--highlight-bg);
    color: var(--highlight-text);
}

/* Кастомные highlight для поиска */
::highlight(search-result) {
    background-color: yellow;
    color: black;
}

/* Множественные highlights */
::highlight(spelling-error) {
    text-decoration: wavy underline red;
}
```

**Источники**:

- https://developer.chrome.com/blog/chrome-134-beta

## 2. Anchor Positioning — универсальная поддержка

### 2.1 CSS Anchor Positioning API — прорыв 2025 года

**Статус**: Baseline Newly Available (сентябрь 2025)

CSS Anchor Positioning позволяет размещать элементы в любом месте страницы относительно
элемента-якоря без влияния на остальную разметку. Это особенно полезно в сочетании с `popover` для
создания tooltips, dropdown меню и других позиционированных элементов. Реализация в Safari 26.0
завершила кросс-браузерную поддержку, сделав функцию готовой к массовому использованию.

**Поддержка браузерами**:

- Chrome 125+ — апрель 2024
- Firefox 145+ — behind flag, активная разработка
- Safari 26.0+ — сентябрь 2025 ⭐ **ПРОРЫВ**
- Edge 125+

**Покрытие**: 76.84% глобальных браузеров (октябрь 2025)

**Спецификация**: [CSS Anchor Positioning Level 1](https://drafts.csswg.org/css-anchor-position-1/)

**Ключевые свойства**:

- `anchor-name`: определяет имя якоря для элемента
- `position-anchor`: связывает позиционированный элемент с якорем
- `position-area`: задаёт область позиционирования относительно якоря
- `anchor()`: функция для вычисления позиции относительно якоря
- `position-try`: определяет fallback позиции
- `position-visibility`: управляет видимостью на основе якоря

**Практическое применение**:

```css
/* Определение якоря */
.anchor-element {
    anchor-name: --my-anchor;
}

/* Позиционирование относительно якоря */
.positioned-element {
    position: absolute;
    position-anchor: --my-anchor;
    top: anchor(bottom);
    left: anchor(left);
}

/* Использование position-area для упрощённого позиционирования */
.tooltip {
    position: absolute;
    position-anchor: --button;
    position-area: top center;
    margin-bottom: 0.5rem;
}

/* Fallback позиции с position-try */
.dropdown {
    position: absolute;
    position-anchor: --trigger;
    position-area: bottom;
    position-try: top, left, right;
}

/* Управление видимостью */
.popover {
    position: absolute;
    position-anchor: --reference;
    position-visibility: anchors-visible;
}
```

**Улучшения в Safari 26.1 (ноябрь 2025)**:

Safari 26.1 включил 12 улучшений CSS Anchor Positioning:

1. **Память последнего успешного fallback**: сохранение последней успешной позиции `position-try`
   для уменьшения скачков макета при изменении стилей
2. Исправление работы с fragmented multicolumn flow
3. Отзывчивость fallback на поведение прокрутки
4. Совместимость container query с `position-try`
5. Поддержка left-hand scrollbar в right-to-left и `vertical-rl` содержащих блоках
6. Обработка inline containing block
7. Обновление позиции при изменении якоря по умолчанию
8. Переходы `display: none` с `transition-behavior: allow-discrete`
9. Выравнивание `position-area` для initial containing blocks
10. Обнаружение обрезки `position-visibility: anchors-visible`
11. Дополнительные исправления фрагментации
12. Дополнительные исправления макета

**Interop 2025**: Anchor Positioning является ключевой областью фокуса Interop 2025, что гарантирует
дальнейшую работу по улучшению кросс-браузерной совместимости.

**Firefox Implementation Status**: Mozilla активно работает над реализацией (meta bug 1838746).
Тестирование в Firefox Nightly показывает впечатляющий прогресс, ожидается скорый релиз в стабильной
версии.

**Источники**:

- https://developer.chrome.com/blog/anchor-positioning-api
- https://webkit.org/blog/17541/webkit-features-for-safari-26-1/
- https://caniuse.com/css-anchor-positioning
- https://www.oddbird.net/2025/10/13/anchor-position-area-update/
- https://bugzilla.mozilla.org/show_bug.cgi?id=1838746

## 3. Типографика и текст

### 3.1 `text-box`, `text-box-trim`, `text-box-edge` — точный контроль вертикального выравнивания

**Статус**: Chrome 133+ (январь 2025)

Свойства `text-box-trim` и `text-box-edge`, а также сокращение `text-box`, обеспечивают более точный
контроль вертикального выравнивания текста. Свойство `text-box-trim` указывает стороны для обрезки
(сверху или снизу), а `text-box-edge` определяет способ обрезки края.

**Поддержка браузерами**:

- Chrome 133+ — январь 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 133+

**Спецификация**: [CSS Inline Layout Module Level 3](https://drafts.csswg.org/css-inline-3/)

**Практическое применение**:

```css
/* Обрезка с использованием cap height (верх заглавных букв) */
h1 {
    text-box: trim-both cap alphabetic;
    line-height: 1.2;
}

/* Обрезка с использованием x-height (высота строчной 'x') */
h2 {
    text-box: trim-both ex alphabetic;
}

/* Обрезка только сверху */
.title {
    text-box-trim: trim-start;
    text-box-edge: cap alphabetic;
}

/* Обрезка только снизу */
.subtitle {
    text-box-trim: trim-end;
    text-box-edge: text ideographic;
}
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-133
- https://developer.chrome.com/blog/new-in-chrome-video-q1-2025

### 3.2 `text-wrap: balance` — зрелость

**Статус**: Широкая поддержка в 2025

Значение `balance` свойства `text-wrap` улучшает типографику, уменьшая неровные края и предотвращая
проблемные переносы строк. Браузер автоматически балансирует количество символов в строках для более
равномерного вида.

**Поддержка браузерами**:

- Chrome 130+ — полная поддержка (114–129 частичная)
- Firefox 121+ — полная поддержка
- Safari 17.5+ — полная поддержка
- Edge 130+

**Покрытие**: 87.92% глобальных браузеров (74.61% полная + 13.31% частичная)

**Спецификация**: [CSS Text Module Level 4](https://drafts.csswg.org/css-text-4/)

**Практическое применение**:

```css
/* Балансировка заголовков */
h1,
h2,
h3 {
    text-wrap: balance;
    max-inline-size: 50ch;
}

/* Балансировка цитат */
blockquote {
    text-wrap: balance;
}

/* Комбинация с другими свойствами */
.card-title {
    text-wrap: balance;
    overflow-wrap: break-word;
    hyphens: auto;
}
```

**Источники**:

- https://caniuse.com/css-text-wrap-balance

### 3.3 `text-wrap: pretty` — первая поддержка в Safari 26

**Статус**: Safari 26.0+ (сентябрь 2025)

Значение `pretty` свойства `text-wrap` улучшает типографику, предотвращая висячие строки (orphans) и
улучшая общее качество переносов текста. Safari стал первым браузером, реализовавшим эту функцию.

**Поддержка браузерами**:

- Chrome — в разработке
- Firefox — в разработке
- Safari 26.0+ — сентябрь 2025
- Edge — в разработке

**Спецификация**: [CSS Text Module Level 4](https://drafts.csswg.org/css-text-4/)

**Практическое применение**:

```css
/* Улучшенная типографика для абзацев */
p {
    text-wrap: pretty;
}

/* Комбинация с max-width для оптимальной читаемости */
article p {
    text-wrap: pretty;
    max-inline-size: 65ch;
}
```

**Источники**:

- https://web.dev/blog/web-platform-09-2025

### 3.4 `ruby-align` — Baseline Newly Available

**Статус**: Baseline Newly Available (Q1 2025)

Свойство `ruby-align` управляет позиционированием выравнивания для ruby base text и ruby annotation
text.

**Поддержка браузерами**:

- Chrome — широкая поддержка
- Firefox — широкая поддержка
- Safari — широкая поддержка
- Edge — широкая поддержка

**Спецификация**: [CSS Ruby Annotation Layout Module Level 1](https://drafts.csswg.org/css-ruby-1/)

**Практическое применение**:

```css
/* Центрирование ruby аннотаций */
ruby {
    ruby-align: center;
}

/* Выравнивание по началу */
ruby {
    ruby-align: start;
}

/* Распределение пространства */
ruby {
    ruby-align: space-between;
}
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-video-q1-2025

### 3.5 Sideways Writing Modes — расширение поддержки

**Статус**: Chrome 132+ (январь 2025), расширение поддержки

Поддержка значений `sideways-rl` и `sideways-lr` в свойстве `writing-mode`. Полезны для
вертикального отображения не-CJK текста в дизайнерских целях.

**Поддержка браузерами**:

- Chrome 132+ — январь 2025
- Firefox 43+
- Safari 18.4+
- Edge 132+

**Спецификация**: [CSS Writing Modes Level 4](https://drafts.csswg.org/css-writing-modes-4/)

**Практическое применение**:

```css
/* Вертикальный текст справа налево */
.vertical-text {
    writing-mode: sideways-rl;
}

/* Вертикальный текст слева направо */
.vertical-label {
    writing-mode: sideways-lr;
}
```

**Источники**:

- https://web.dev/blog/web-platform-01-2025

## 4. Layout и Grid

### 4.1 Container Queries — Baseline High (август 2025)

**Статус**: Baseline High (достигнут 14 августа 2025)

Container Queries достигли статуса Baseline High в августе 2025, что означает широкую, стабильную
реализацию и готовность к массовому использованию. Переход от экспериментальной функции к
стандартной поддержке занял 3–4 года.

**Поддержка браузерами**:

- Chrome 106+ — сентябрь 2022
- Firefox 110+ — февраль 2023
- Safari 16.0+ — сентябрь 2022
- Edge 106+

**Покрытие**: 92.49% глобальных браузеров

**Спецификация**: [CSS Containment Module Level 3](https://drafts.csswg.org/css-contain-3/)

**Практическое применение**:

```css
/* Определение container */
.card-container {
    container-type: inline-size;
    container-name: card;
}

/* Container query */
@container card (min-width: 400px) {
    .card-title {
        font-size: 1.5rem;
    }
}

/* Множественные условия */
@container (min-width: 300px) and (max-width: 600px) {
    .card {
        display: flex;
        flex-direction: column;
    }
}

/* Container query units */
.responsive-text {
    font-size: clamp(1rem, 5cqi, 2rem);
}
```

**Источники**:

- https://caniuse.com/css-container-queries

### 4.2 Scroll State Container Queries — новая возможность

**Статус**: Chrome 133+ (январь 2025)

Scroll State Container Queries позволяют использовать container queries для стилизации потомков
контейнеров на основе их состояния прокрутки. Запрашиваемые состояния включают: `stuck` (sticky
элемент прилип к краю scroll контейнера), `snapped` (элемент выровнен через scroll snap),
`scrollable` (scrollability контейнера в указанном направлении).

**Поддержка браузерами**:

- Chrome 133+ — январь 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 133+

**Спецификация**: [CSS Containment Module Level 3](https://drafts.csswg.org/css-contain-3/)

**Практическое применение**:

```css
/* Определение scroll-state container */
.sticky-header {
    container-type: scroll-state;
    position: sticky;
    top: 0;
}

/* Стилизация на основе stuck состояния */
.sticky-header > nav {
    @container scroll-state(stuck: top) {
        background: var(--header-stuck-bg);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
}

/* Проверка scrollable состояния */
.scroll-container {
    container-type: scroll-state;
}

.scroll-indicator {
    @container scroll-state(scrollable: right) {
        display: block;
    }
    @container scroll-state(scrollable: none) {
        display: none;
    }
}

/* Snapped состояние для карусели */
.carousel {
    container-type: scroll-state;
    scroll-snap-type: x mandatory;
}

.carousel-item {
    @container scroll-state(snapped) {
        transform: scale(1.05);
        z-index: 1;
    }
}
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-133

### 4.3 CSS Subgrid — широкая поддержка

**Статус**: Широкая поддержка, 88.92% покрытие

CSS Subgrid перешёл от экспериментальной функции к mainstream поддержке в 2023 году. По состоянию на
октябрь 2025 года, CSS Subgrid готов к production использованию для большинства современных
сценариев разработки.

**Поддержка браузерами**:

- Chrome 117+ — сентябрь 2023
- Firefox 71+ — декабрь 2019
- Safari 16.0+ — сентябрь 2022
- Edge 117+

**Покрытие**: 88.92% глобальных браузеров

**Спецификация**: [CSS Grid Layout Module Level 2](https://drafts.csswg.org/css-grid-2/)

**Практическое применение**:

```css
/* Parent grid */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1rem;
}

/* Subgrid item */
.grid-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 3;
}

/* Subgrid в обоих направлениях */
.nested-grid {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    grid-column: span 2;
    grid-row: span 3;
}
```

**Источники**:

- https://caniuse.com/css-subgrid

### 4.4 CSS Nesting — стабилизация

**Статус**: Широкая поддержка, 90.97% покрытие, Baseline Low (декабрь 2023)

CSS Nesting сохраняет статус low baseline по состоянию на декабрь 2023 года, что указывает на
продолжающуюся стабилизацию реализаций. Однако поддержка значительно расширилась среди основных
браузеров в 2024–2025 годах.

**Поддержка браузерами**:

- Chrome 120+ — полная поддержка
- Firefox 117+ — полная поддержка
- Safari 17.2+ — полная поддержка
- Edge 120+

**Покрытие**: 90.97% глобальных браузеров

**Спецификация**: [CSS Nesting Module Level 1](https://drafts.csswg.org/css-nesting-1/)

**Практическое применение**:

```css
/* Базовый nesting с & */
.card {
    background: white;

    & .title {
        font-size: 1.5rem;
        color: var(--primary);
    }

    & .content {
        padding: 1rem;
    }

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}

/* Nesting с медиа запросами */
.responsive-component {
    display: block;

    @media (min-width: 768px) {
        display: flex;
    }

    @media (min-width: 1024px) {
        display: grid;
    }
}

/* Комплексный nesting */
.navigation {
    display: flex;

    & li {
        list-style: none;

        & a {
            color: inherit;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
```

**Источники**:

- https://caniuse.com/css-nesting

### 4.5 Alignment для абсолютно позиционированных элементов

**Статус**: Универсальная поддержка (январь 2025)

Свойства `align-self`, `justify-self` и `place-self` теперь работают с абсолютно позиционированными
элементами, расширяя возможности выравнивания за пределы static positioning контекстов.

**Поддержка браузерами**:

- Chrome 122+ — февраль 2024
- Firefox 134+ — январь 2025
- Safari 18.4+ — январь 2025
- Edge 122+

**Спецификация**: [CSS Box Alignment Module Level 3](https://drafts.csswg.org/css-align-3/)

**Практическое применение**:

```css
/* Центрирование абсолютно позиционированного элемента */
.positioned {
    position: absolute;
    inset: 0;
    align-self: center;
    justify-self: center;
}

/* Выравнивание к концу */
.dialog {
    position: absolute;
    inset: 1rem;
    place-self: end;
}

/* Комбинация с margin для spacing */
.modal {
    position: absolute;
    inset: 0;
    align-self: center;
    justify-self: center;
    margin: auto;
}
```

**Источники**:

- https://web.dev/blog/web-platform-01-2025
- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/134

## 5. Цвета и графика

### 5.1 Relative Color Syntax — полная поддержка

**Статус**: Полная поддержка во всех основных браузерах

Relative Color Syntax позволяет создавать новые цвета на основе существующих цветов путём
модификации их компонентов. Все основные браузеры достигли полной поддержки в 2025 году.

**Поддержка браузерами**:

- Chrome 131+ — полная (119–130 частичная)
- Firefox 133+ — полная (128–132 частичная)
- Safari 18.0+ — полная (16.4–17.6 частичная)
- Edge 131+

**Покрытие**: 88.2% глобальных браузеров (72.68% полная + 15.52% частичная)

**Спецификация**: [CSS Color Module Level 5](https://drafts.csswg.org/css-color-5/)

**Практическое применение**:

```css
/* Создание более светлой версии цвета */
:root {
    --primary: oklch(50% 0.2 250);
    --primary-light: oklch(from var(--primary) calc(l + 20%) c h);
}

/* Создание полупрозрачной версии */
.overlay {
    background: rgb(from var(--accent) r g b / 0.5);
}

/* Модификация hue */
.complementary {
    color: hsl(from var(--brand-color) calc(h + 180) s l);
}

/* Создание цветовой палитры */
:root {
    --base: oklch(60% 0.15 180);
    --shade-1: oklch(from var(--base) calc(l - 10%) c h);
    --shade-2: oklch(from var(--base) calc(l - 20%) c h);
    --tint-1: oklch(from var(--base) calc(l + 10%) c h);
    --tint-2: oklch(from var(--base) calc(l + 20%) c h);
}

/* Изменение только alpha канала */
.button {
    background: hsl(from var(--button-bg) h s l);

    &:hover {
        background: hsl(from var(--button-bg) h s l / 0.9);
    }
}
```

**Источники**:

- https://caniuse.com/css-relative-colors

### 5.2 `color()` — широкие цветовые пространства

**Статус**: Широкая поддержка, 92.31% покрытие

Функция `color()` позволяет браузеру отображать цвета в любом цветовом пространстве, таком как P3
color space, которое может отображать цвета за пределами стандартного sRGB цветового пространства.

**Поддержка браузерами**:

- Chrome 111+ — март 2023
- Firefox 113+ — май 2023
- Safari 15+ — сентябрь 2021
- Edge 111+

**Покрытие**: 92.31% глобальных браузеров (октябрь 2025)

**Спецификация**: [CSS Color Module Level 4](https://drafts.csswg.org/css-color-4/)

**Практическое применение**:

```css
/* Display P3 цветовое пространство */
.vibrant {
    color: color(display-p3 1 0.5 0);
}

/* Rec2020 цветовое пространство */
.wide-gamut {
    background: color(rec2020 0.42 0.79 0.98);
}

/* ProPhoto RGB */
.photo-element {
    border-color: color(prophoto-rgb 0.8 0.2 0.3);
}

/* A98 RGB */
.print-color {
    color: color(a98-rgb 0.6 0.7 0.2);
}

/* Fallback для несовместимых дисплеев */
.modern-color {
    background: rgb(255 0 0); /* fallback */
    background: color(display-p3 1 0 0);
}
```

**Источники**:

- https://caniuse.com/css-color-function

### 5.3 `contrast-color()` — Safari 26 эксклюзив

**Статус**: Safari 26.0+ (сентябрь 2025)

Функция `contrast-color()` позволяет программно выбирать цвета с оптимальным контрастом относительно
референсного цвета. Safari стал первым браузером, реализовавшим эту функцию.

**Поддержка браузерами**:

- Chrome — в разработке
- Firefox — в разработке
- Safari 26.0+ — сентябрь 2025
- Edge — в разработке

**Спецификация**: [CSS Color Module Level 6](https://drafts.csswg.org/css-color-6/) (draft)

**Практическое применение**:

```css
/* Автоматический выбор цвета текста для контраста */
.dynamic-button {
    background: var(--user-color);
    color: contrast-color(var(--user-color));
}

/* Выбор между несколькими вариантами */
.card {
    background: var(--theme-bg);
    color: contrast-color(var(--theme-bg) vs white, black, gray);
}

/* С минимальным контрастным соотношением */
.accessible-text {
    background: var(--bg);
    color: contrast-color(var(--bg) to AA);
}
```

**Источники**:

- https://web.dev/blog/web-platform-09-2025

### 5.4 `dynamic-range-limit` — HDR контроль

**Статус**: Chrome 134+ (февраль 2025)

Свойство `dynamic-range-limit` позволяет странице ограничивать максимальную яркость HDR контента.
Обеспечивает контроль над уровнями яркости HDR на веб-страницах.

**Поддержка браузерами**:

- Chrome 134+ — февраль 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 134+

**Спецификация**: [CSS Color HDR Module Level 1](https://drafts.csswg.org/css-color-hdr/) (draft)

**Практическое применение**:

```css
/* Ограничение HDR яркости */
video {
    dynamic-range-limit: standard;
}

/* Разрешение высокой яркости */
.hdr-content {
    dynamic-range-limit: high;
}

/* Адаптивное управление */
@media (dynamic-range: high) {
    .video-player {
        dynamic-range-limit: high;
    }
}
```

**Источники**:

- https://developer.chrome.com/blog/chrome-134-beta

### 5.5 `mix-blend-mode` — зрелая поддержка

**Статус**: Широкая поддержка, 94.87% покрытие

Свойство `mix-blend-mode`, позволяющее смешивание между произвольными SVG и HTML элементами,
достигло сильной глобальной поддержки.

**Поддержка браузерами**:

- Chrome 41+ — март 2015
- Firefox 32+ — сентябрь 2014
- Safari 7.1+ — частичная (lacks `hue`, `saturation`, `color`, `luminosity`)
- Edge 79+

**Покрытие**: 94.87% глобальных браузеров

**Спецификация**: [Compositing and Blending Level 1](https://drafts.fxtf.org/compositing-1/)

**Практическое применение**:

```css
/* Overlay blending */
.overlay {
    mix-blend-mode: overlay;
}

/* Multiply для затемнения */
.darken {
    mix-blend-mode: multiply;
}

/* Screen для осветления */
.lighten {
    mix-blend-mode: screen;
}

/* Difference для инверсии */
.invert {
    mix-blend-mode: difference;
}
```

**Источники**:

- https://caniuse.com/css-mixblendmode

## 6. Анимации и переходы

### 6.1 Scroll-driven Animations — расширение поддержки

**Статус**: Safari 26.0+ (сентябрь 2025), расширение поддержки

Scroll-driven animations привязывают анимации непосредственно к позиции прокрутки. С добавлением
поддержки Safari в сентябре 2025 года, функция работает в Chrome, Edge и Safari.

**Поддержка браузерами**:

- Chrome 115+ — июль 2023
- Firefox 110+ — behind flag
- Safari 26.0+ — сентябрь 2025
- Edge 115+

**Ключевое свойство**: `animation-timeline`

**Покрытие**: 78.52% глобальных браузеров

**Спецификация**:
[CSS Scroll-driven Animations Level 1](https://drafts.csswg.org/scroll-animations-1/)

**Практическое применение**:

```css
/* Анимация на основе прокрутки */
.parallax {
    animation: parallax-move linear;
    animation-timeline: scroll(root);
}

@keyframes parallax-move {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100px);
    }
}

/* View timeline */
.fade-in {
    animation: fade linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
}

@keyframes fade {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Named scroll timeline */
.scroll-container {
    scroll-timeline: --my-scroller block;
}

.animated-element {
    animation: slide linear;
    animation-timeline: --my-scroller;
}

@keyframes slide {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}
```

**Источники**:

- https://web.dev/blog/web-platform-09-2025
- https://caniuse.com/mdn-css_properties_animation-timeline

### 6.2 `progress()` — новая математическая функция

**Статус**: Chrome 138+ (2025)

Функция `progress()` вычисляет продвижение между двумя значениями. Полезна для создания сложных
анимационных последовательностей.

**Поддержка браузерами**:

- Chrome 138+ — 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 138+

**Спецификация**: [CSS Values and Units Module Level 5](https://drafts.csswg.org/css-values-5/)

**Практическое применение**:

```css
/* Использование progress() для вычислений */
.element {
    --scroll-progress: progress(var(--scroll-position) from 0 to 100);
    opacity: var(--scroll-progress);
}
```

**Источники**:

- https://web.dev/blog/web-platform-09-2025

### 6.3 View Transitions API — универсальная поддержка single-document

**Статус**: Широкая поддержка для same-document transitions

View Transitions API для single-document переходов получил широкую поддержку с реализацией Firefox в
версии 144. API позволяет создавать плавные анимированные переходы между различными состояниями DOM.

**Поддержка браузерами**:

- Chrome 111+ — март 2023
- Firefox 144+ — 2025
- Safari 18.0+ — сентябрь 2024
- Edge 111+

**Покрытие**: 88.69% глобальных браузеров

**Спецификация**:
[CSS View Transitions Module Level 1](https://drafts.csswg.org/css-view-transitions-1/)

**Практическое применение**:

```css
/* Определение view transition */
::view-transition-old(root),
::view-transition-new(root) {
    animation-duration: 0.5s;
}

/* Кастомизация перехода для конкретного элемента */
.card {
    view-transition-name: card-transition;
}

::view-transition-old(card-transition) {
    animation: slide-out 0.3s ease-out;
}

::view-transition-new(card-transition) {
    animation: slide-in 0.3s ease-out;
}

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

```javascript
// Базовый переход
document.startViewTransition(() => {
    // Изменения DOM
    updateDOM();
});

// С обработкой ошибок
async function transition() {
    const transition = document.startViewTransition(() => {
        return updateDOM();
    });

    try {
        await transition.finished;
    } catch (error) {
        console.error('Transition failed:', error);
    }
}
```

**Источники**:

- https://caniuse.com/view-transitions

### 6.4 `transition-behavior: allow-discrete` — поддержка дискретных переходов

**Статус**: Широкая поддержка (2024–2025)

Значение `allow-discrete` свойства `transition-behavior` позволяет анимировать дискретные свойства,
такие как `display`, что ранее было невозможно.

**Поддержка браузерами**:

- Chrome 117+ — сентябрь 2023
- Firefox 129+ — август 2024
- Safari 17.4+ — март 2024
- Edge 117+

**Спецификация**: [CSS Transitions Level 2](https://drafts.csswg.org/css-transitions-2/)

**Практическое применение**:

```css
/* Анимация display */
.modal {
    display: none;
    opacity: 0;
    transition:
        opacity 0.3s,
        display 0.3s;
    transition-behavior: allow-discrete;
}

.modal.open {
    display: block;
    opacity: 1;
}

/* Комбинация с @starting-style */
@starting-style {
    .modal {
        opacity: 0;
    }
}
```

### 6.5 `Animation.overallProgress` — отслеживание прогресса анимации

**Статус**: Chrome 133+ (январь 2025)

Свойство `Animation.overallProgress` отслеживает продвижение анимации через итерации.

**Поддержка браузерами**:

- Chrome 133+ — январь 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 133+

**Спецификация**: [Web Animations Level 2](https://drafts.csswg.org/web-animations-2/)

**Практическое применение**:

```javascript
// Получение прогресса анимации
const animation = element.animate(
    { transform: ['translateX(0)', 'translateX(100px)'] },
    { duration: 1000, iterations: 3 },
);

console.log(animation.overallProgress); // 0 to 3
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-133

## 7. Формы и интерактивность

### 7.1 Customizable `<select>` — революция в формах

**Статус**: Chrome 134+ (февраль 2025)

Новая возможность кастомизации HTML `<select>` элементов с opt-in через значение `base-select`
свойства `appearance`. После активации можно добавлять rich контент, включая изображения, и
стилизовать опции.

**Поддержка браузерами**:

- Chrome 134+ — февраль 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 134+

**Спецификация**: [HTML Standard](https://html.spec.whatwg.org/) (extending)

**Практическое применение**:

```css
/* Opt-in к кастомизации */
select {
    appearance: base-select;
}

/* Стилизация опций */
select option {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Стилизация dropdown */
select::picker {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Добавление иконок в опции через HTML */
/* <option><img src="icon.png" alt=""> Option text</option> */
select option img {
    width: 20px;
    height: 20px;
}
```

**Источники**:

- https://developer.chrome.com/blog/chrome-134-beta

### 7.2 `field-sizing` — автоматический размер полей

**Статус**: Chrome 123+ (начало 2024), расширение в 2025

Свойство `field-sizing` позволяет полям формы автоматически изменять размер в соответствии с
содержимым.

**Поддержка браузерами**:

- Chrome 123+ — 2024
- Firefox — в разработке
- Safari — Technology Preview
- Edge 123+

**Покрытие**: 75.86% глобальных браузеров

**Спецификация**: [CSS Basic User Interface Module Level 4](https://drafts.csswg.org/css-ui-4/)

**Практическое применение**:

```css
/* Автоматический размер textarea */
textarea {
    field-sizing: content;
    max-height: 300px;
}

/* Автоматический размер input */
input[type='text'] {
    field-sizing: content;
    min-width: 100px;
}

/* Для select элементов */
select {
    field-sizing: content;
}
```

**Источники**:

- https://caniuse.com/mdn-css_properties_field-sizing

### 7.3 Dialog Light Dismiss — улучшенный UX диалогов

**Статус**: Chrome 134+ (февраль 2025)

Новый атрибут `closedby` для элемента `<dialog>` управляет поведением закрытия, привнося возможности
Popover API в диалоги.

**Поддержка браузерами**:

- Chrome 134+ — февраль 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 134+

**Значения атрибута**:

- `closedby=none`: запрет закрытия пользователем
- `closedby=closerequest`: закрытие по ESC
- `closedby=any`: закрытие по клику вне или ESC

**Практическое применение**:

```html
<!-- Диалог без light dismiss -->
<dialog closedby="none">
    <p>Необходимо явное действие</p>
    <button onclick="this.closest('dialog').close()">Закрыть</button>
</dialog>

<!-- Закрытие только по ESC -->
<dialog closedby="closerequest">
    <p>Нажмите ESC для закрытия</p>
</dialog>

<!-- Полный light dismiss -->
<dialog closedby="any">
    <p>Клик вне или ESC закроет диалог</p>
</dialog>
```

**Источники**:

- https://developer.chrome.com/blog/chrome-134-beta

### 7.4 `popover=hint` — новое значение для подсказок

**Статус**: Chrome 133+ (январь 2025)

Третье значение атрибута `popover` — `hint`. Hints чаще всего ассоциируются с tooltip поведением и
имеют немного отличающееся поведение.

**Поддержка браузерами**:

- Chrome 133+ — январь 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 133+

**Практическое применение**:

```html
<!-- Tooltip-like поведение -->
<button popovertarget="hint-id">Наведите для информации</button>
<div id="hint-id" popover="hint">Это подсказка</div>
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-133

## 8. `@property` — зрелость и широкое принятие

### 8.1 `@property` at-rule — Baseline и широкая поддержка

**Статус**: Широкая поддержка, 93.02% покрытие

`@property` at-rule достиг зрелости в 2025 году после достижения Baseline статуса в сентябре 2024
года. Firefox был последним основным браузером, добавившим поддержку в версии 128 (июль 2024), что
завершило универсальную поддержку.

**Поддержка браузерами**:

- Chrome 85+ — август 2020
- Firefox 128+ — июль 2024
- Safari 16.4+ — март 2023
- Edge 85+

**Покрытие**: 93.02% глобальных браузеров (октябрь 2025)

**Спецификация**:
[CSS Properties and Values API Level 1](https://drafts.css-houdini.org/css-properties-values-api-1/)

**Дескрипторы**:

- `syntax`: определяет синтаксис custom property
- `initial-value`: устанавливает начальное значение
- `inherits`: определяет, наследуется ли свойство

**Практическое применение**:

```css
/* Определение анимируемого градиента */
@property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}

.animated-gradient {
    background: linear-gradient(var(--gradient-angle), red, blue);
    animation: rotate-gradient 3s linear infinite;
}

@keyframes rotate-gradient {
    to {
        --gradient-angle: 360deg;
    }
}

/* Определение цветового свойства */
@property --theme-color {
    syntax: '<color>';
    initial-value: #000;
    inherits: true;
}

/* Анимация цвета */
.color-transition {
    --theme-color: blue;
    background: var(--theme-color);
    transition: --theme-color 0.5s;
}

.color-transition:hover {
    --theme-color: red;
}

/* Численное свойство для анимации */
@property --progress {
    syntax: '<number>';
    initial-value: 0;
    inherits: false;
}

.progress-bar {
    --progress: 0;
    width: calc(var(--progress) * 100%);
    transition: --progress 1s ease-out;
}

.progress-bar.complete {
    --progress: 1;
}
```

**Источники**:

- https://caniuse.com/mdn-css_at-rules_property

## 9. Enhanced `attr()` — типизированные атрибуты

### 9.1 CSS Level 5 `attr()` функция

**Статус**: Chrome 133+ (январь 2025)

Улучшенная функция `attr()` уровня CSS 5 позволяет использовать типы помимо `<string>` и применять
во всех CSS свойствах (в дополнение к существующей поддержке для pseudo-element content).

**Поддержка браузерами**:

- Chrome 133+ — январь 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 133+

**Спецификация**: [CSS Values and Units Module Level 5](https://drafts.csswg.org/css-values-5/)

**Синтаксис**: `attr(attribute-name type(<type>), fallback-value)`

**Практическое применение**:

```css
/* Цвет из атрибута */
div {
    color: attr(data-color type(<color>), red);
}

/* Численные значения */
.element {
    width: attr(data-width type(<length>), 100px);
    opacity: attr(data-opacity type(<number>), 1);
}

/* URL из атрибута */
.icon {
    background-image: attr(data-icon type(<url>), url('default.png'));
}

/* Угол для трансформации */
.rotated {
    transform: rotate(attr(data-angle type(<angle>), 0deg));
}

/* Время для анимации */
.animated {
    animation-duration: attr(data-duration type(<time>), 1s);
}
```

```html
<div data-color="oklch(60% 0.2 180)" data-width="200px">Typed attributes</div>
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-133

## 10. Scrollbar Styling — стандартизация

### 10.1 `scrollbar-width` — Baseline Newly Available

**Статус**: Baseline Newly Available (2025)

Свойство `scrollbar-width` позволяет использовать более узкие scrollbars или полностью скрывать их
при сохранении scrollability.

**Поддержка браузерами**:

- Chrome 121+ — январь 2024
- Firefox 64+ — декабрь 2018
- Safari 18.2+ — 2024
- Edge 121+

**Покрытие**: 85.44% глобальных браузеров

**Спецификация**: [CSS Scrollbars Module Level 1](https://drafts.csswg.org/css-scrollbars-1/)

**Практическое применение**:

```css
/* Тонкие scrollbars */
.container {
    scrollbar-width: thin;
}

/* Скрытие scrollbars */
.hidden-scrollbar {
    scrollbar-width: none;
    overflow: auto;
}

/* Автоматический размер (по умолчанию) */
.default-scrollbar {
    scrollbar-width: auto;
}

/* Комбинация с scrollbar-color */
.styled-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: var(--thumb-color) var(--track-color);
}
```

**Источники**:

- https://caniuse.com/mdn-css_properties_scrollbar-width
- https://developer.chrome.com/blog/new-in-chrome-video-q1-2025

### 10.2 `scrollbar-gutter` — Baseline Newly Available

**Статус**: Baseline Newly Available (Q1 2025)

Свойство `scrollbar-gutter` резервирует пространство для scrollbar для предотвращения layout shifts
при появлении или исчезновении scrollbars.

**Поддержка браузерами**:

- Chrome — широкая поддержка
- Firefox — широкая поддержка
- Safari — широкая поддержка
- Edge — широкая поддержка

**Спецификация**: [CSS Overflow Module Level 3](https://drafts.csswg.org/css-overflow-3/)

**Практическое применение**:

```css
/* Резервирование пространства */
.container {
    scrollbar-gutter: stable;
}

/* С обеих сторон */
.centered-content {
    scrollbar-gutter: stable both-edges;
}

/* Только если есть overflow */
.conditional {
    scrollbar-gutter: auto;
}
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-video-q1-2025

## 11. Pseudo-elements для Carousel

### 11.1 `::scroll-button()` и `::scroll-marker()` — CSS Carousels

**Статус**: Chrome 135+ (2025)

Новые pseudo-elements `::scroll-button()` и `::scroll-marker()` позволяют превратить scrollable
область в carousel, предоставляя встроенные стилизационные hooks для carousel controls и indicators.

**Поддержка браузерами**:

- Chrome 135+ — 2025
- Firefox — в разработке
- Safari — в разработке
- Edge 135+

**Спецификация**: [CSS Overflow Module Level 4](https://drafts.csswg.org/css-overflow-4/) (draft)

**Практическое применение**:

```css
/* Стилизация scroll buttons */
.carousel::scroll-button(left) {
    background: white;
    border: 1px solid gray;
    border-radius: 50%;
}

.carousel::scroll-button(right) {
    background: white;
    border: 1px solid gray;
    border-radius: 50%;
}

/* Стилизация scroll markers (indicators) */
.carousel::scroll-marker() {
    width: 10px;
    height: 10px;
    background: gray;
    border-radius: 50%;
}

.carousel::scroll-marker(:active) {
    background: black;
}

/* Позиционирование controls */
.carousel {
    position: relative;
}

.carousel::scroll-button(left) {
    position: absolute;
    left: 10px;
}

.carousel::scroll-button(right) {
    position: absolute;
    right: 10px;
}
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-135

## 12. `shape()` — новая функция для path

### 12.1 CSS `shape()` функция

**Статус**: Chrome 135+ (2025), Firefox Nightly, Safari 18.4 beta

Функция `shape()` для использования с `clip-path` и `offset-path` свойствами предоставляет набор
команд, примерно эквивалентных используемым в `path()`, но с улучшенной интеграцией CSS.

**Поддержка браузерами**:

- Chrome 135+ — 2025
- Firefox — Nightly
- Safari — 18.4 beta
- Edge 135+

**Спецификация**: [CSS Shapes Module Level 2](https://drafts.csswg.org/css-shapes-2/)

**Практическое применение**:

```css
/* Clip path с shape() */
.clipped {
    clip-path: shape(move to 0 0, line to 100% 0, line to 100% 100%, line to 0 100%, close);
}

/* С CSS единицами и calc() */
.dynamic-shape {
    clip-path: shape(
        move to 0 0,
        line to calc(100% - 20px) 0,
        curve to 100% 50% via 100% 0,
        line to 100% 100%,
        close
    );
}

/* Offset path для анимации */
.animated-path {
    offset-path: shape(move to 0 0, line to 100px 0, curve to 200px 100px via 150px 50px);
    offset-distance: 0%;
    animation: follow-path 3s linear infinite;
}

@keyframes follow-path {
    to {
        offset-distance: 100%;
    }
}
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-135

## 13. Relative Units в SVG

### 13.1 CSS Relative Units в SVG — Safari 26.1

**Статус**: Safari 26.1+ (ноябрь 2025)

WebKit добавил поддержку relative CSS units внутри SVG файлов, включая `rem`, viewport units (`vh`,
`vw`, `vmin`, `vmax`), typography-relative units (`rlh`, `ic`, `cap`), и container query units
(`cqw`, `cqi`, `cqmin`, `cqmax`).

**Поддержка браузерами**:

- Chrome — поддержка варьируется
- Firefox — поддержка варьируется
- Safari 26.1+ — полная поддержка
- Edge — поддержка варьируется

**Практическое применение**:

```svg
<svg viewBox="0 0 200 200">
    <!-- Использование rem -->
    <circle cx="50%" cy="50%" r="2rem" fill="blue" />

    <!-- Использование viewport units -->
    <rect width="10vw" height="10vh" fill="red" />

    <!-- Использование container query units -->
    <text font-size="5cqi">Responsive text</text>
</svg>
```

**Источники**:

- https://webkit.org/blog/17541/webkit-features-for-safari-26-1/

## 14. Дополнительные улучшения

### 14.1 `@media print` Nested Rules — Safari 26.1

**Статус**: Safari 26.1+ (ноябрь 2025)

Исправлена поддержка вложенных правил для `@media print` в Safari 26.1.

**Практическое применение**:

```css
.document {
    color: black;

    @media print {
        font-size: 12pt;

        & .header {
            display: none;
        }

        & .content {
            margin: 0;
        }
    }
}
```

**Источники**:

- https://webkit.org/blog/17541/webkit-features-for-safari-26-1/

### 14.2 `Node.prototype.moveBefore` — Chrome 133

**Статус**: Chrome 133+ (январь 2025)

Метод `moveBefore` позволяет переупорядочивать DOM без сброса состояния, включая CSS анимации и
переходы.

**Практическое применение**:

```javascript
// Перемещение элемента без прерывания анимаций
const element = document.querySelector('.animated');
const target = document.querySelector('.target');
element.moveBefore(target);
```

**Источники**:

- https://developer.chrome.com/blog/new-in-chrome-133

## Заключение

2025 год стал годом зрелости многих CSS функций, введённых в 2023–2024 годах. Ключевые достижения:

**Основные достижения**:

1. **Универсальная поддержка Anchor Positioning**: Safari 26 завершил кросс-браузерную поддержку,
   сделав эту функцию готовой к production использованию
2. **Зрелость `@property`**: после достижения Baseline статуса в сентябре 2024, `@property` стал
   стандартным инструментом для анимации custom properties
3. **Container Queries Baseline High**: достижение статуса Baseline High в августе 2025 подтвердило
   готовность для массового использования
4. **Типографические инновации**: `text-box`, `text-wrap: balance/pretty`, улучшения вертикального
   выравнивания стали доступны
5. **Продвинутая стилизация форм**: customizable `<select>`, `field-sizing`, dialog light dismiss
   открывают новые возможности
6. **Scroll-driven Animations**: расширение поддержки с Safari 26
7. **Цветовые возможности**: полная поддержка relative color syntax, `contrast-color()` в Safari,
   широкие цветовые пространства
8. **View Transitions API**: достижение универсальной поддержки для same-document transitions
9. **Enhanced `attr()`**: типизированные атрибуты открывают новые паттерны data-driven стилизации
10. **Carousel Pseudo-elements**: нативная поддержка carousel UI без JavaScript

**Области для наблюдения**:

- Cross-document View Transitions — активная разработка в Chrome
- CSS Masonry — продолжающиеся дебаты в CSSWG о синтаксисе и модели
- Anchor Positioning в Firefox — ожидается релиз в стабильной версии
- Interop 2025 — продолжение работы по обеспечению кросс-браузерной совместимости

## Сводная таблица браузерной поддержки

| Возможность                       | Chrome | Firefox | Safari | Baseline статус               |
| --------------------------------- | ------ | ------- | ------ | ----------------------------- |
| **Anchor Positioning**            | 125+   | 145+    | 26.0+  | ✅ Newly Available (сен 2025) |
| **Container Queries**             | 106+   | 110+    | 16.0+  | ✅ Baseline High (авг 2025)   |
| **`@property`**                   | 85+    | 128+    | 16.4+  | ✅ Baseline (сен 2024)        |
| **View Transitions**              | 111+   | 144+    | 18.0+  | ✅ Widely Available           |
| **`text-box`**                    | 133+   | ❌      | ❌     | ⏳ Chrome only                |
| **`text-wrap: balance`**          | 130+   | 121+    | 17.5+  | ✅ Widely Available           |
| **`text-wrap: pretty`**           | ❌     | ❌      | 26.0+  | ⏳ Safari only                |
| **Relative Color Syntax**         | 131+   | 133+    | 18.0+  | ✅ Widely Available           |
| **`contrast-color()`**            | ❌     | ❌      | 26.0+  | ⏳ Safari only                |
| **Scroll-driven Animations**      | 115+   | 110+\*  | 26.0+  | ⚠️ 78.52%                     |
| **Customizable `<select>`**       | 134+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **`field-sizing`**                | 123+   | ❌      | TP     | ⏳ 75.86%                     |
| **Enhanced `attr()`**             | 133+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **`scrollbar-width`**             | 121+   | 64+     | 18.2+  | ✅ Newly Available            |
| **Scroll State Queries**          | 133+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **CSS Nesting**                   | 120+   | 117+    | 17.2+  | ✅ Baseline Low               |
| **CSS Subgrid**                   | 117+   | 71+     | 16.0+  | ✅ Widely Available (88.92%)  |
| **`::scroll-button()`**           | 135+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **`shape()`**                     | 135+   | Nightly | 18.4 b | ⏳ Скоро Baseline             |
| **`:open`**                       | 133+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **`:has-slotted`**                | 134+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **Dialog `closedby`**             | 134+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **`popover=hint`**                | 133+   | ❌      | ❌     | ⏳ Chrome/Edge only           |
| **Alignment для `position: abs`** | 122+   | 134+    | 18.4+  | ✅ Универсальная (янв 2025)   |

_\* Firefox 110+ за флагом `layout.css.scroll-driven-animations.enabled`_

## Рекомендации по adoption

**Немедленно внедрять (Baseline/широкая поддержка)**:

- ✅ Container Queries — Baseline High, готовы к массовому использованию
- ✅ `@property` — 93.02% покрытие, стабильная поддержка
- ✅ View Transitions API — same-document transitions
- ✅ Relative Color Syntax — полная поддержка основных браузеров
- ✅ `text-wrap: balance` — 87.92% покрытие
- ✅ `color()` для широких цветовых пространств — 92.31% покрытие
- ✅ CSS Nesting — 90.97% покрытие
- ✅ CSS Subgrid — 88.92% покрытие
- ✅ `scrollbar-width` — Baseline Newly Available
- ✅ `:has()` — 92.62% покрытие, оптимизирован

**Использовать с progressive enhancement**:

- ⚠️ Anchor Positioning — 76.84% покрытие, требуется fallback для Firefox
- ⚠️ Scroll-driven Animations — 78.52%, Firefox за флагом
- ⚠️ Enhanced `attr()` — только Chrome/Edge, требуется fallback
- ⚠️ Customizable `<select>` — только Chrome/Edge, polyfill для других
- ⚠️ `field-sizing` — 75.86%, отсутствует Firefox/iOS Safari
- ⚠️ Scroll State Container Queries — только Chrome/Edge

**Следить за развитием**:

- 🔍 `contrast-color()` — Safari эксклюзив, ожидать Chrome/Firefox
- 🔍 `text-wrap: pretty` — Safari эксклюзив
- 🔍 `text-box` — Chrome only, ожидать других браузеров
- 🔍 `shape()` — скоро Baseline после стабилизации
- 🔍 Cross-document View Transitions — в разработке
- 🔍 CSS Masonry — дебаты в CSSWG

## Источники

### Официальные блоги и документация

- Chrome for Developers Blog: https://developer.chrome.com/blog
- Chrome Releases Blog: https://chromereleases.googleblog.com/2025/
- WebKit Blog: https://webkit.org/blog/
- Mozilla Firefox Release Notes: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- Web.dev: https://web.dev/
- MDN Web Docs: https://developer.mozilla.org/

### Спецификации и стандарты

- CSSWG Drafts: https://drafts.csswg.org/
- CSS Selectors Level 4: https://drafts.csswg.org/selectors-4/
- CSS Anchor Positioning Level 1: https://drafts.csswg.org/css-anchor-position-1/
- CSS Properties and Values API Level 1: https://drafts.css-houdini.org/css-properties-values-api-1/
- CSS Containment Module Level 3: https://drafts.csswg.org/css-contain-3/
- CSS Text Module Level 4: https://drafts.csswg.org/css-text-4/
- CSS Inline Layout Module Level 3: https://drafts.csswg.org/css-inline-3/
- CSS Color Module Level 5: https://drafts.csswg.org/css-color-5/
- CSS Color Module Level 6: https://drafts.csswg.org/css-color-6/
- CSS Scroll-driven Animations Level 1: https://drafts.csswg.org/scroll-animations-1/
- CSS View Transitions Module Level 1: https://drafts.csswg.org/css-view-transitions-1/
- CSS Values and Units Module Level 5: https://drafts.csswg.org/css-values-5/
- CSS Scrollbars Module Level 1: https://drafts.csswg.org/css-scrollbars-1/
- CSS Grid Layout Module Level 2: https://drafts.csswg.org/css-grid-2/
- CSS Nesting Module Level 1: https://drafts.csswg.org/css-nesting-1/

### Инструменты совместимости

- Can I Use: https://caniuse.com/
- Web Platform Tests: https://wpt.fyi/
- Baseline: https://web.dev/baseline

### Interop 2025

- Interop Dashboard: https://wpt.fyi/interop-2025
- Web Standards Project: https://github.com/web-platform-tests/interop

### Специализированные ресурсы

- OddBird Anchor Positioning Updates:
  https://www.oddbird.net/2025/10/13/anchor-position-area-update/
- Mozilla Bugzilla (CSS Anchor Positioning): https://bugzilla.mozilla.org/show_bug.cgi?id=1838746
- Chrome Platform Status: https://chromestatus.com/

---

- **Дата завершения исследования**: 19 ноября 2025
- **Охваченных функций**: 45+
- **Версии браузеров**: Chrome 133–142+, Firefox 134–144+, Safari 18.2–26.2+, Edge 133–142+
- **Research ID**: `frontend-baseline-2023-2025`
- **Связанные отчёты**: [HTML 2023](../2023/html.md), [CSS 2023](../2023/css.md)
