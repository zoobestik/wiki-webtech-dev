---
title: HTML — изменения 2025 года
description:
    Комплексный обзор изменений в HTML за период январь-ноябрь 2025 года - Popover API Baseline,
    кастомизируемый select, Invoker Commands, улучшения dialog и details
outline: deep
lastUpdated: true
---

# HTML — изменения 2025 года

- **Период**: 1 января 2025 — 30 ноября 2025
- **Версии браузеров**: Chrome 133–141+, Firefox 134–142+, Safari 18.2–18.6

## Обзор года

Период с января по ноябрь 2025 года ознаменовался значительным прогрессом в развитии HTML и
веб-платформы. Ключевые темы года:

- **Достижение зрелости Popover API**: официальный статус Baseline 27 января 2025
- **Кастомизация элементов форм**: `appearance: base-select` для `<select>` в Chrome 134
- **Декларативные команды**: Invoker Commands API (`command` и `commandfor`)
- **Улучшения диалогов**: атрибут `closedby` для `<dialog>`
- **Развитие Declarative Shadow DOM**: достижение зрелости и улучшение качества
- **Interop 2025**: фокус на `<details>`, кастомизируемом `<select>` и декларативных возможностях

## 1. Popover API достигает статуса Baseline

### 1.1 Официальное достижение Baseline

**Дата**: 27 января 2025 года **Статус**: Baseline Newly Available

`Popover API` официально получил статус `Baseline Newly available`, что означает полную поддержку во
всех трёх основных браузерных движках.

**Поддержка браузерами**:

- Chrome 114+ — май 2023
- Safari 17.0+ — сентябрь 2023 (исправление критических багов в январе 2025)
- Firefox 125+ — апрель 2024

### 1.2 Предыстория и проблема с первоначальным анонсом

Первоначально `Popover API` был объявлен достигшим статуса Baseline в апреле 2024 года после
внедрения в Firefox. Однако была обнаружена критическая проблема на платформах iOS и iPadOS: функция
`light dismiss` (закрытие поповера кликом или касанием вне его области) не работала на мобильных
браузерах Safari.

После исправления бага в Safari статус `Baseline Newly available` был обновлён на 27 января 2025
года, что стало корректной датой достижения полной межбраузерной совместимости.

### 1.3 Основная функциональность

`Popover API` предоставляет встроенный механизм создания различных типов всплывающих элементов. До
появления этого API разработчикам требовалось использовать JavaScript и тщательно реализовывать
доступность вручную.

**Базовый поповер**:

```html
<button popovertarget="my-popover">Открыть поповер</button>
<div id="my-popover" popover>
    <p>Содержимое поповера</p>
</div>
```

**Ключевые возможности**:

- ✅ Рендеринг в верхнем слое (`top layer`) без управления `z-index`
- ✅ Автоматическое управление фокусом
- ✅ Light dismiss: закрытие кликом вне области или нажатием `Escape`
- ✅ Встроенная поддержка ARIA-атрибутов

**Источники**:

- https://web.dev/blog/popover-baseline
- https://developer.chrome.com/blog/introducing-popover-api
- https://web.dev/blog/web-platform-01-2025

### 1.4 Новое значение `popover="hint"` в Chrome 133

**Дата выпуска**: февраль 2025 года — Chrome 133

Chrome 133 добавил третье значение для атрибута `popover` — `hint`, которое наиболее часто
используется для создания поведения всплывающих подсказок (tooltips).

**Ключевое отличие от `popover="auto"`**:

Поповеры с типом `hint` являются подчинёнными по отношению к `auto` при открытии вложенных стеков
поповеров. Это означает, что можно открыть несвязанный `hint`-поповер, в то время как существующий
стек `auto`-поповеров остаётся открытым.

**Практический пример**:

```html
<button id="menu-button" popovertarget="menu">Меню</button>
<div id="menu" popover="auto">
    <button popovertarget="tooltip" popovertargetaction="show">Элемент с подсказкой</button>
</div>

<div id="tooltip" popover="hint">Дополнительная информация</div>
```

До появления `hint` меню и всплывающая подсказка, оба использующие `popover="auto"`, конфликтовали:
открытие всплывающей подсказки закрывало меню. Значение `hint` позволяет всплывающим подсказкам
сосуществовать с другими поповерами без их закрытия.

**Сценарии применения**:

- Всплывающие подсказки с дополнительной информацией
- Превью ссылок
- Карточки предпросмотра профилей на социальных платформах
- Контекстные справочные элементы

**Поддержка браузерами**:

- Chrome 133+ — февраль 2025
- Другие браузеры: в разработке

**Источники**:

- https://developer.chrome.com/blog/popover-hint
- https://developer.chrome.com/release-notes/133
- https://open-ui.org/components/popover-hint.research.explainer/

### 1.5 Неявная привязка якоря в Chrome 133

**Дата выпуска**: февраль 2025 года — Chrome 133

Chrome 133 создаёт неявную привязку якоря между поповером и его вызывающей кнопкой, что значительно
упрощает код позиционирования. Теперь поповер можно позиционировать относительно кнопки с помощью
одной строки CSS.

**До Chrome 133**:

```html
<button id="my-button" popovertarget="my-popover" anchor="my-button">Открыть</button>
<div id="my-popover" popover>Содержимое</div>

<style>
    #my-popover {
        position-anchor: --my-button;
        position: fixed;
        bottom: anchor(top);
    }
</style>
```

**После Chrome 133**:

```html
<button popovertarget="my-popover">Открыть</button>
<div id="my-popover" popover>Содержимое</div>

<style>
    #my-popover {
        bottom: anchor(top);
    }
</style>
```

Браузер автоматически связывает поповер с вызывающей его кнопкой без необходимости явного указания
якоря.

**Поддержка браузерами**:

- Chrome 133+ — февраль 2025

**Источники**:

- https://developer.chrome.com/release-notes/133
- https://web.dev/blog/web-platform-02-2025

## 2. Кастомизируемый элемент `<select>`

### 2.1 Общее описание

**Дата выпуска**: март 2025 года — Chrome 134 (beta: 5 февраля 2025, stable: март 2025)

Chrome 134 добавил возможность кастомизации HTML-элемента `<select>` путём активации нового
поведения через значение `base-select` свойства `appearance`. После активации можно добавлять
богатый контент, включая изображения, и стилизовать опции.

### 2.2 Активация кастомизации

Для активации нового режима необходимо применить `appearance: base-select` к элементу `<select>` и к
псевдоэлементу `::picker(select)`:

```css
select,
::picker(select) {
    appearance: base-select;
}
```

**Изменения в режиме `base-select`**:

- Изменяет HTML-парсер браузера для содержимого внутри `<select>`
- Изменяет внутреннюю структуру рендеринга `<select>`
- Предоставляет новые внутренние части и состояния для `<select>`

### 2.3 Новые элементы и псевдоэлементы

**`<selectedcontent>`**:

Представляет содержимое выбранной опции, отображаемое в кнопке:

```html
<select>
    <button>
        <selectedcontent></selectedcontent>
    </button>
    <option>Вариант 1</option>
    <option>Вариант 2</option>
</select>
```

**`::picker(select)`**:

Псевдоэлемент-обёртка, содержащий элементы `<option>` и `<optgroup>`:

```css
::picker(select) {
    background-color: white;
    border: 1px solid gray;
}
```

**`select::picker-icon`**:

Стрелка выпадающего списка:

```css
select::picker-icon {
    content: url('custom-arrow.svg');
}
```

**`option::checkmark`**:

Галочка, указывающая на выбранную опцию:

```css
option::checkmark {
    color: green;
}
```

### 2.4 Пример с изображениями

```html
<select>
    <button>
        <selectedcontent></selectedcontent>
        <span class="arrow">▼</span>
    </button>
    <option value="cat">
        <img src="cat.jpg" alt="Кот" />
        Кот
    </option>
    <option value="dog">
        <img src="dog.jpg" alt="Собака" />
        Собака
    </option>
</select>

<style>
    select,
    ::picker(select) {
        appearance: base-select;
    }

    option {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    option img {
        width: 24px;
        height: 24px;
    }
</style>
```

### 2.5 Преимущества

- ✅ Сохранение встроенной доступности
- ✅ Встроенная навигация с клавиатуры
- ✅ Интеграция с формами без дополнительной работы
- ✅ Возможность создания визуально богатых интерфейсов

### 2.6 Связь с Open UI и Interop 2025

Эта возможность разработана в рамках инициативы `Open UI Community Group` и является частью
`Interop 2025`, что означает ожидаемую поддержку во всех основных браузерах к концу 2025 года.

**Поддержка браузерами**:

- Chrome 134+ — март 2025
- Chrome 135+ — полная стабилизация, апрель 2025
- Safari: в разработке (Interop 2025)
- Firefox: в разработке (Interop 2025)

**Источники**:

- https://developer.chrome.com/blog/a-customizable-select
- https://developer.chrome.com/blog/chrome-134-beta
- https://developer.chrome.com/release-notes/134
- https://open-ui.org/components/customizableselect/
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select

## 3. Улучшения элемента `<dialog>`

### 3.1 Атрибут `closedby` — Light dismiss для `<dialog>`

**Дата выпуска**: март 2025 года — Chrome 134 (beta: 5 февраля 2025, stable: март 2025)

Chrome 134 принёс одну из приятных возможностей `Popover API` — поведение `light dismiss` — в
элемент `<dialog>`. Новый атрибут `closedby` управляет поведением закрытия диалога.

### 3.2 Значения атрибута `closedby`

**`closedby="none"`**:

Отсутствие пользовательского закрытия диалога:

```html
<dialog closedby="none">
    <p>Этот диалог можно закрыть только программно</p>
    <button onclick="this.closest('dialog').close()">OK</button>
</dialog>
```

**`closedby="closerequest"`**:

Нажатие `Escape` (или другой триггер закрытия) закрывает диалог:

```html
<dialog closedby="closerequest">
    <p>Нажмите Escape для закрытия</p>
</dialog>
```

**`closedby="any"`**:

Клик вне диалога или нажатие `Escape` закрывают диалог (аналогично поведению `popover="auto"`):

```html
<dialog closedby="any">
    <p>Кликните вне диалога или нажмите Escape для закрытия</p>
</dialog>
```

### 3.3 Пример использования

```html
<button onclick="document.querySelector('#my-dialog').showModal()">Открыть диалог</button>

<dialog id="my-dialog" closedby="any">
    <h2>Заголовок диалога</h2>
    <p>Содержимое диалога с автоматическим закрытием</p>
    <button onclick="this.closest('dialog').close()">Закрыть</button>
</dialog>
```

### 3.4 Значение для разработчиков

Это значительное улучшение для веб-разработчиков, поскольку предоставляет нативную поддержку
распространённого UX-паттерна, который ранее требовал пользовательских JavaScript-реализаций.

**Поддержка браузерами**:

- Chrome 134+ — март 2025
- Firefox 141+ — июль 2025
- Safari: в разработке

На момент написания `closedby` поддерживается только в Chrome 134+ и Firefox 141+, поэтому
разработчикам может потребоваться использовать кастомные решения для кросс-браузерной совместимости.

**Источники**:

- https://developer.chrome.com/blog/chrome-134-beta
- https://developer.chrome.com/blog/new-in-chrome-134
- https://chromestatus.com/feature/5097714453577728
- https://github.com/whatwg/html/pull/10737

## 4. Invoker Commands API

### 4.1 Общее описание

**Статус спецификации**: 2025 год — спецификация недавно объединена в стандарт HTML

`Invoker Commands API` представляет новый способ декларативного управления интерактивными элементами
через атрибуты `commandfor` и `command`. Атрибут `commandfor` превращает элемент `<button>` в кнопку
управления для заданного интерактивного элемента, принимая ID управляемого элемента в качестве
значения. Атрибут `command` указывает действие, которое должно быть выполнено над управляемым
элементом.

### 4.2 Базовый синтаксис

```html
<button type="button" commandfor="targetElement" command="show-modal">Триггер</button>
<dialog id="targetElement">Содержимое диалога</dialog>
```

### 4.3 Встроенные значения команд

**Для поповеров**:

```html
<!-- show-popover -->
<button commandfor="my-popover" command="show-popover">Показать поповер</button>
<div id="my-popover" popover>Содержимое</div>

<!-- hide-popover -->
<button commandfor="my-popover" command="hide-popover">Скрыть поповер</button>

<!-- toggle-popover -->
<button commandfor="my-popover" command="toggle-popover">Переключить поповер</button>
```

**Для диалогов**:

```html
<!-- show-modal -->
<button commandfor="my-dialog" command="show-modal">Открыть диалог</button>
<dialog id="my-dialog">
    <h2>Модальный диалог</h2>
    <p>Содержимое</p>
    <button commandfor="my-dialog" command="close">Закрыть</button>
</dialog>

<!-- close -->
<button commandfor="my-dialog" command="close">Закрыть диалог</button>

<!-- request-close -->
<button commandfor="my-dialog" command="request-close">Попытаться закрыть</button>
```

### 4.4 Пользовательские команды

Пользовательские команды могут быть созданы с использованием префикса из двух дефисов:

```html
<button type="button" commandfor="targetElement" command="--flip">Триггер</button>

<script>
    document.querySelector('#targetElement').addEventListener('command', (e) => {
        if (e.command === '--flip') {
            e.target.classList.toggle('flipped');
        }
    });
</script>
```

### 4.5 Событие CommandEvent

API включает событие `CommandEvent`, которое представляет уведомление пользователя о том, что
команда была выдана:

```javascript
element.addEventListener('command', (event) => {
    console.log('Команда выдана:', event.command);
    console.log('Источник команды:', event.source);
});
```

### 4.6 Преимущества

- ✅ Декларативность: управление без JavaScript для стандартных действий
- ✅ Доступность: встроенная семантическая связь между кнопкой и целевым элементом
- ✅ Расширяемость: возможность создания пользовательских команд
- ✅ Упрощение кода: сокращение необходимости написания обработчиков событий

### 4.7 Эквивалентность с предыдущими API

`command` и `commandfor` заменяют и обобщают предыдущие специфичные атрибуты:

- `popovertarget` / `popovertargetaction` (для поповеров)
- Ручные вызовы `showModal()` / `close()` (для диалогов)

**Поддержка браузерами**:

На момент написания (2025) спецификация недавно интегрирована в стандарт HTML. Ожидается постепенное
внедрение в браузеры в течение 2025 года.

**Источники**:

- https://open-ui.org/components/invokers.explainer/
- https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API
- https://github.com/whatwg/html/pull/9841
- https://css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more/

## 5. Declarative Shadow DOM: достижение зрелости

### 5.1 Статус Baseline

**Дата**: 5 августа 2024 года — `Declarative Shadow DOM` стал `Baseline Newly available`

### 5.2 Актуальность в 2025 году

В 2025 году `Declarative Shadow DOM` продолжает укрепляться как основная технология для создания
веб-компонентов. Спецификация изменилась в 2023 году (включая переименование `shadowroot` в
`shadowrootmode`), и наиболее актуальные стандартизированные версии всех частей функции были
реализованы в Chrome 124.

**Поддержка браузерами**:

- Chrome 90+ — стабильно с версии 90-136+
- Firefox 125+ — стабильно с версии 125-138+
- Safari 16.6+ — стабильно с версии 16.6-18.4+
- Edge 90+ — стабильно с версии 90-133+

### 5.3 Основная функциональность

`Declarative Shadow DOM` позволяет создавать теневые корни (`shadow roots`) непосредственно в HTML,
используя элемент `<template>`:

```html
<host-element>
    <template shadowrootmode="open">
        <style>
            p {
                color: blue;
            }
        </style>
        <p>Содержимое в shadow DOM</p>
        <slot></slot>
    </template>
    <p>Содержимое в light DOM</p>
</host-element>
```

### 5.4 Значение атрибута `shadowrootmode`

**`shadowrootmode="open"`**:

Создаёт открытый теневой корень, доступный через `element.shadowRoot`:

```html
<my-component>
    <template shadowrootmode="open">
        <style>
            h1 {
                color: blue;
            }
        </style>
        <h1>Заголовок компонента</h1>
    </template>
</my-component>
```

**`shadowrootmode="closed"`**:

Создаёт закрытый теневой корень, недоступный извне:

```html
<my-component>
    <template shadowrootmode="closed">
        <p>Инкапсулированное содержимое</p>
    </template>
</my-component>
```

### 5.5 Сценарии использования

- **Server-Side Rendering (SSR)**: рендеринг веб-компонентов на сервере с инкапсуляцией стилей
- **Статические сайты**: создание компонентов без необходимости JavaScript для инициализации
- **Прогрессивное улучшение**: базовая функциональность работает до загрузки JavaScript

### 5.6 Преимущества

- ✅ Инкапсуляция стилей: стили внутри shadow DOM не влияют на внешний документ
- ✅ Семантическая изоляция: структура компонента скрыта от основного DOM
- ✅ Производительность: отсутствие необходимости в JavaScript для создания shadow root
- ✅ SEO-дружественность: контент доступен при первоначальной загрузке страницы

**Оценка совместимости**:

По состоянию на 2025 год `Declarative Shadow DOM` демонстрирует оценку совместимости браузеров `85`,
что указывает на сильную кросс-браузерную поддержку.

**Источники**:

- https://web.dev/articles/declarative-shadow-dom
- https://caniuse.com/declarative-shadow-dom
- https://webkit.org/blog/13851/declarative-shadow-dom/
- https://chromestatus.com/feature/5191745052606464

## 6. Улучшения элемента `<details>`

### 6.1 Псевдоэлемент `::details-content` в Safari 18.4

**Дата выпуска**: 31 марта 2025 года — Safari 18.4

Safari 18.4 добавил улучшения для элементов `<details>` и `<summary>`, включая поддержку
псевдоэлемента `::details-content`, который позволяет стилизовать только контент, появляющийся при
открытии элемента `details`.

**Ключевая возможность**:

Псевдоэлемент `::details-content` впервые позволяет анимировать высоту контейнера, что решает давнюю
проблему разработчиков.

**Пример использования**:

```html
<details>
    <summary>Кликните для раскрытия</summary>
    <p>Этот контент будет анимирован</p>
</details>

<style>
    ::details-content {
        transition: height 0.3s ease;
        overflow: hidden;
    }

    details[open] ::details-content {
        height: auto;
    }
</style>
```

### 6.2 Анимация открытия/закрытия

```css
details {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5em;
}

summary {
    cursor: pointer;
    font-weight: bold;
}

::details-content {
    padding: 0.5em;
    transition:
        height 0.3s ease,
        opacity 0.3s ease;
    height: 0;
    opacity: 0;
}

details[open] ::details-content {
    height: auto;
    opacity: 1;
}
```

### 6.3 Псевдокласс `:open`

Firefox 136 (март 2025) добавил поддержку псевдокласса `:open`, который позволяет выбирать любой
элемент, находящийся в открытом состоянии. Псевдокласс применяется к элементам `details`, `dialog`,
элементам `input` с пикером и элементам `select`, когда выпадающий список открыт.

```css
details:open {
    border-color: blue;
}

dialog:open {
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
```

### 6.4 Связь с Interop 2025

Элементы `<details>` и `<summary>` включены в `Interop 2025` с целью улучшения поддержки и
взаимодействия с другими возможностями веб-платформы.

**Поддержка браузерами**:

**`::details-content`**:

- Safari 18.4+ — март 2025
- Другие браузеры: в разработке (Interop 2025)

**`:open`**:

- Firefox 136+ — март 2025
- Chrome: в разработке
- Safari: в разработке

**Источники**:

- https://webkit.org/blog/16574/webkit-features-in-safari-18-4/
- https://web.dev/blog/interop-2025

## 7. Атрибут `hidden="until-found"` и событие `beforematch`

### 7.1 Связь с Interop 2025

`hidden="until-found"` является частью `Interop 2025` с акцентом на функциональность поиска по
странице. В частности, возможность поиска скрытого контента в элементах `<details>` входит в эту
инициативу.

### 7.2 Описание

Атрибут `hidden="until-found"` позволяет любому скрытому контенту внутри элемента быть
обнаруживаемым при поиске по странице в браузере. Работает точно так же, как
`content-visibility: hidden`, но с сохранением возможности поиска.

### 7.3 Базовое использование

```html
<section hidden="until-found">
    <h2>Скрытый раздел</h2>
    <p>Этот контент скрыт, но может быть найден через поиск по странице (Ctrl+F)</p>
</section>
```

### 7.4 Сравнение с обычным `hidden`

**Обычный `hidden`**:

```html
<div hidden>Этот контент полностью скрыт и не обнаруживается при поиске</div>
```

**`hidden="until-found"`**:

```html
<div hidden="until-found">Этот контент скрыт, но может быть найден через поиск по странице</div>
```

При нахождении совпадения браузер автоматически раскрывает секцию.

### 7.5 Событие `beforematch`

Событие `beforematch` срабатывает на элементе с `hidden="until-found"` непосредственно перед тем,
как элемент будет раскрыт:

```html
<article id="content" hidden="until-found">
    <h2>Статья</h2>
    <p>Содержание статьи...</p>
</article>

<script>
    document.querySelector('#content').addEventListener('beforematch', (e) => {
        console.log('Контент будет раскрыт');
        // Можно выполнить дополнительные действия, например, логирование
        e.target.classList.add('found');
    });
</script>
```

### 7.6 Практический пример: аккордеон

```html
<div class="accordion">
    <button onclick="toggleSection('section1')">Раздел 1</button>
    <div id="section1" hidden="until-found">
        <p>Контент раздела 1 с возможностью поиска</p>
    </div>

    <button onclick="toggleSection('section2')">Раздел 2</button>
    <div id="section2" hidden="until-found">
        <p>Контент раздела 2 с возможностью поиска</p>
    </div>
</div>

<script>
    function toggleSection(id) {
        const section = document.getElementById(id);
        if (section.hasAttribute('hidden')) {
            section.removeAttribute('hidden');
        } else {
            section.setAttribute('hidden', 'until-found');
        }
    }

    // Обработка события beforematch
    document.querySelectorAll('[hidden="until-found"]').forEach((el) => {
        el.addEventListener('beforematch', () => {
            console.log('Найдено совпадение в:', el.id);
        });
    });
</script>
```

### 7.7 Использование Wikipedia

Wikipedia теперь использует этот атрибут, что означает, что поиск по странице работает значительно
лучше в Chrome на Android, чем в Firefox (который пока не поддерживает эту возможность).

**Поддержка браузерами**:

- Chrome 102+ — май 2022
- Safari Technology Preview 125+
- Firefox: в разработке (в рамках Interop 2025, bug #1761043)

**Источники**:

- https://developer.chrome.com/articles/hidden-until-found
- https://css-tricks.com/covering-hiddenuntil-found/
- https://bugzilla.mozilla.org/show_bug.cgi?id=1761043
- https://github.com/mozilla/standards-positions/issues/612

## 8. Улучшения форм

### 8.1 Атрибут `autocorrect` в Firefox 134

**Дата выпуска**: январь 2025 года — Firefox 134 (экспериментальная поддержка, отключена по
умолчанию)

Атрибут `autocorrect` является перечислимым глобальным атрибутом, который управляет включением
автокоррекции редактируемого текста для орфографических и/или пунктуационных ошибок.

**Применимые элементы**:

Автокоррекция релевантна для редактируемых текстовых элементов:

- Элементы `<input>`, за исключением `password`, `email` и `url`
- Любой элемент с установленным атрибутом `contenteditable`
- Элементы `<textarea>`

**Значения атрибута**:

```html
<!-- Включает автокоррекцию -->
<textarea autocorrect="on">
  Введите текст с автокоррекцией
</textarea>

<!-- Отключает автокоррекцию -->
<input type="text" autocorrect="off" placeholder="Без автокоррекции" />
```

**Пример использования**:

```html
<!-- Форма регистрации: имя пользователя без автокоррекции -->
<label>
    Имя пользователя:
    <input type="text" name="username" autocorrect="off" />
</label>

<!-- Комментарий: с автокоррекцией -->
<label>
    Ваш комментарий:
    <textarea name="comment" autocorrect="on"></textarea>
</label>

<!-- Редактируемый контент -->
<div contenteditable autocorrect="on">Редактируемый текст с автокоррекцией</div>
```

**Программный доступ через JavaScript**:

```javascript
const input = document.querySelector('input');

// Проверка поддержки
if ('autocorrect' in HTMLElement.prototype) {
    console.log('Атрибут autocorrect поддерживается');

    // Установка значения
    input.autocorrect = 'off';

    // Чтение значения
    console.log(input.autocorrect); // 'off'
}
```

**Поддержка браузерами**:

- Firefox 134+ — январь 2025 (экспериментально, отключено по умолчанию)
- Мобильные браузеры (Safari, Chrome для мобильных устройств) имеют лучшую поддержку
- Десктопные браузеры: поддержка ограничена

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autocorrect
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/autocorrect
- https://www.phoronix.com/news/Mozilla-Firefox-134-Available
- https://caniuse.com/mdn-html_global_attributes_autocorrect

### 8.2 Поддержка `input type="week"` в Safari 18.2

**Дата выпуска**: декабрь 2024 года (актуально для начала 2025) — Safari 18.2

Safari 18.2 добавил поддержку `input type="week"` на iOS, iPadOS и visionOS. Это был значительный
шаг, поскольку HTML-элемент `input type="week"` ранее не поддерживался на этих мобильных платформах
Apple.

**Функциональность**:

Элемент `input type="week"` позволяет пользователям выбирать конкретный номер недели и год с помощью
нативного интерфейса выбора.

**Использование**:

```html
<label>
    Выберите неделю:
    <input type="week" name="week" id="week" />
</label>
```

**Формат значения**:

Значение всегда имеет формат: `YYYY-Www`, например:

```html
<input type="week" value="2025-W15" />
```

**Ограничения с `min` и `max`**:

```html
<label>
    Выберите неделю в Q2 2025:
    <input type="week" name="quarter" min="2025-W14" max="2025-W26" />
</label>
```

**Пример с JavaScript**:

```html
<form>
    <label>
        Неделя доставки:
        <input type="week" id="delivery-week" name="delivery" required />
    </label>
    <button type="submit">Отправить</button>
</form>

<script>
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const weekInput = document.querySelector('#delivery-week');
        console.log('Выбранная неделя:', weekInput.value);
        // Например: "2025-W20"
    });
</script>
```

**Доступность платформ Safari 18.2**:

- iOS 18.2
- iPadOS 18.2
- visionOS 2.2
- macOS Sequoia 15.2
- macOS Sonoma
- macOS Ventura

**Источники**:

- https://webkit.org/blog/16301/webkit-features-in-safari-18-2/
- https://html.spec.whatwg.org/multipage/input.html

### 8.3 Атрибут `webkitdirectory` для iOS в Safari 18.4

**Дата выпуска**: 31 марта 2025 года — Safari 18.4

WebKit для Safari 18.4 добавляет поддержку iOS для атрибута `webkitdirectory` на элементах
`<input type="file" />`. Это значительное улучшение, поскольку ранее эта возможность была доступна
только на десктопной версии Safari.

**Функциональность**:

Атрибут `webkitdirectory` — это булевый атрибут, который указывает, может ли пользователь выбрать
директорию вместо файла или файлов.

**Базовое использование**:

```html
<label>
    Загрузить папку:
    <input type="file" webkitdirectory />
</label>
```

**Пример с обработкой файлов**:

```html
<input type="file" id="dir-input" webkitdirectory />

<script>
    document.querySelector('#dir-input').addEventListener('change', (e) => {
        const files = e.target.files;
        console.log(`Выбрано файлов: ${files.length}`);

        for (let file of files) {
            console.log(`Путь: ${file.webkitRelativePath}`);
            console.log(`Имя: ${file.name}`);
            console.log(`Размер: ${file.size} bytes`);
        }
    });
</script>
```

**Пример загрузки и отображения структуры**:

```html
<input type="file" id="folder-input" webkitdirectory />
<div id="file-list"></div>

<script>
    document.querySelector('#folder-input').addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        const listElement = document.querySelector('#file-list');

        listElement.innerHTML = '<h3>Структура папки:</h3>';

        const ul = document.createElement('ul');
        files.forEach((file) => {
            const li = document.createElement('li');
            li.textContent = file.webkitRelativePath;
            ul.appendChild(li);
        });

        listElement.appendChild(ul);
    });
</script>
```

**Поддержка браузерами**:

- Chrome 6+
- Firefox 50+
- Edge 13+
- Safari 11.1+ (десктоп)
- Safari 18.4+ (iOS, март 2025)

**Источники**:

- https://webkit.org/blog/16574/webkit-features-in-safari-18-4/
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory
- https://wicg.github.io/entries-api/

### 8.4 Улучшения цветового пикера в Safari 18.4

**Дата выпуска**: 31 марта 2025 года — Safari 18.4

Safari 18.4 улучшил HTML-пикер цвета с поддержкой атрибутов `alpha` и `colorspace`, позволяя
пользователям выбирать цвета из цветового пространства `Display P3` и регулировать прозрачность.

**Атрибут `colorspace`**:

Позволяет указать цветовое пространство для выбора цвета:

```html
<!-- Цветовое пространство sRGB (по умолчанию) -->
<input type="color" value="#ff0000" />

<!-- Цветовое пространство Display P3 (расширенная гамма) -->
<input type="color" colorspace="display-p3" value="color(display-p3 1 0 0)" />
```

**Атрибут `alpha`**:

Включает поддержку альфа-канала (прозрачности):

```html
<!-- Без прозрачности -->
<input type="color" value="#ff0000" />

<!-- С прозрачностью -->
<input type="color" alpha value="#ff000080" />
```

**Комбинированное использование**:

```html
<label>
    Выберите цвет с прозрачностью в Display P3:
    <input type="color" colorspace="display-p3" alpha value="color(display-p3 0.8 0.2 0.5 / 0.7)" />
</label>
```

**Пример с обработкой значения**:

```html
<input type="color" id="color-picker" colorspace="display-p3" alpha />
<div id="preview"></div>

<script>
    const picker = document.querySelector('#color-picker');
    const preview = document.querySelector('#preview');

    picker.addEventListener('input', (e) => {
        const color = e.target.value;
        preview.style.backgroundColor = color;
        preview.textContent = `Выбранный цвет: ${color}`;
    });
</script>
```

**Практический пример: выбор цвета фона**:

```html
<form>
    <fieldset>
        <legend>Настройки цвета</legend>

        <label>
            Основной цвет:
            <input type="color" name="primary" colorspace="display-p3" />
        </label>

        <label>
            Цвет наложения с прозрачностью:
            <input
                type="color"
                name="overlay"
                colorspace="display-p3"
                alpha
                value="color(display-p3 0 0 0 / 0.3)"
            />
        </label>
    </fieldset>
</form>
```

**Значение Display P3**:

`Display P3` — это цветовое пространство с расширенной гаммой, которое поддерживает более яркие и
насыщенные цвета по сравнению с традиционным sRGB. Это особенно важно для современных дисплеев
(iPhone, iPad, Mac), которые поддерживают широкую цветовую гамму.

**Поддержка браузерами**:

- Safari 18.4+ — март 2025
- Другие браузеры: в разработке

**Источники**:

- https://webkit.org/blog/16574/webkit-features-in-safari-18-4/

### 8.5 HTML-валидация: тренды 2025 года

В 2025 году браузеры предлагают улучшенные паттерны нативной валидации, потенциально более богатые и
контекстно-зависимые типы ввода, а также улучшенную поддержку на уровне браузера для сложных
пользовательских сценариев ввода.

**Ключевые атрибуты валидации**:

```html
<!-- required -->
<input type="text" name="username" required />

<!-- min и max -->
<input type="number" name="age" min="18" max="100" />
<input type="date" name="date" min="2025-01-01" max="2025-12-31" />

<!-- minlength и maxlength -->
<input type="text" name="code" minlength="4" maxlength="8" />

<!-- pattern -->
<input type="text" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Формат: 123-456-7890" />
```

**Пользовательские сообщения об ошибках**:

```html
<form>
    <input type="email" id="email" required />
    <button type="submit">Отправить</button>
</form>

<script>
    const emailInput = document.querySelector('#email');

    emailInput.addEventListener('invalid', (e) => {
        if (emailInput.validity.valueMissing) {
            emailInput.setCustomValidity('Пожалуйста, введите адрес электронной почты');
        } else if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity('Пожалуйста, введите корректный адрес электронной почты');
        }
    });

    emailInput.addEventListener('input', () => {
        emailInput.setCustomValidity('');
    });
</script>
```

**Стилизация с псевдоклассами**:

```css
input:valid {
    border-color: green;
}

input:invalid {
    border-color: red;
}

input:user-invalid {
    border-color: orange;
    background-color: #fff3cd;
}
```

**Важное предупреждение о безопасности**:

Никогда не доверяйте данным, передаваемым на сервер от клиента. Даже если форма валидируется
корректно и предотвращает некорректный ввод на стороне клиента, злонамеренный пользователь всё ещё
может изменить сетевой запрос. Клиентская валидация — это улучшение пользовательского опыта, но НЕ
замена серверной валидации.

**Источники**:

- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
- https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation
- https://blog.yaamwebsolutions.com/html-css-javascript-updates-2025/

## 9. ARIA и доступность: тренды 2025 года

### 9.1 Общий контекст

В 2025 году правильная реализация ARIA стала более критичной в связи с новыми европейскими
регуляциями и обновлёнными стандартами WCAG. `WCAG 2.2` теперь является юридическим стандартом, на
который ссылаются 4,605 исков ADA в 2024 году, а спецификация `ARIA 1.3` предоставляет расширенные
возможности.

### 9.2 Европейское законодательство о доступности

`European Accessibility Act (EAA) 2025` распространяет обязательства по обеспечению доступности на
частный сектор. С 28 июня 2025 года компании с более чем 10 сотрудниками или доходом свыше 2
миллионов евро должны соответствовать стандартам доступности.

### 9.3 Рекомендации по использованию ARIA

**Предпочтение семантического HTML**:

Разработчикам следует предпочитать использование правильного семантического HTML-элемента вместо
ARIA, если такой элемент существует. Статистика показывает: домашние страницы с присутствующим ARIA
в среднем имели на 70% больше обнаружённых ошибок, чем страницы без ARIA, в основном из-за
неправильной реализации атрибутов ARIA.

**Избыточность ARIA с HTML5**:

С 2014 года, когда W3C официально опубликовала рекомендацию HTML5 с landmark-элементами, такими как
`<main>`, `<header>`, `<footer>`, `<aside>`, `<nav>`, и атрибутами, такими как `hidden` и
`required`, вместе с увеличенной поддержкой браузеров, определённые части ARIA стали менее
критичными.

### 9.4 Примеры правильного использования

**Предпочтительно (семантический HTML)**:

```html
<nav>
    <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/about">О нас</a></li>
    </ul>
</nav>
```

**Вместо (избыточный ARIA)**:

```html
<div role="navigation">
    <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/about">О нас</a></li>
    </ul>
</div>
```

**Правильное использование ARIA (когда нет семантического HTML)**:

```html
<div role="tablist">
    <button role="tab" aria-selected="true" aria-controls="panel1">Вкладка 1</button>
    <button role="tab" aria-selected="false" aria-controls="panel2">Вкладка 2</button>
</div>
<div role="tabpanel" id="panel1">Содержимое 1</div>
<div role="tabpanel" id="panel2" hidden>Содержимое 2</div>
```

### 9.5 Новые элементы HTML5 с неявными ролями ARIA

- `<main>` → `role="main"`
- `<header>` → `role="banner"` (когда является прямым потомком `<body>`)
- `<footer>` → `role="contentinfo"` (когда является прямым потомком `<body>`)
- `<nav>` → `role="navigation"`
- `<aside>` → `role="complementary"`
- `<section>` → `role="region"` (при наличии доступного имени)
- `<article>` → `role="article"`

### 9.6 Ключевые выводы для 2025 года

1. **Минимизировать использование ARIA**: использовать только когда семантический HTML недостаточен
2. **Тестирование со скринридерами**: обязательное тестирование с реальными вспомогательными
   технологиями
3. **Соответствие WCAG 2.2**: следовать последним рекомендациям по доступности
4. **Законодательная осведомлённость**: учитывать юридические требования (EAA 2025, ADA)

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- https://www.digidop.com/blog/aria-label
- https://www.allaccessible.org/blog/implementing-aria-labels-for-web-accessibility
- https://web.dev/learn/accessibility/aria-html

## 10. Interop 2025: HTML-ориентированные области

### 10.1 Общий обзор

`Interop 2025` имеет 19 фокусных областей: 17 новых и 2 из предыдущих лет. Команда WebKit завершила
`Interop 2024` с 98% пройденных тестов в Safari 18.2 и 99% пройденных в Safari Technology Preview,
при этом все четыре участвующих preview-браузера достигли 99%.

### 10.2 HTML-специфичные области Interop 2025

**Элемент `<details>`**:

Элементы `<details>` и `<summary>` включены в 2025 год с целью улучшения поддержки и взаимодействия
с другими возможностями веб-платформы.

**Declarative Shadow DOM**:

Declarative shadow DOM, который позволяет создавать теневые корни непосредственно в HTML с
использованием элемента `<template>`, теперь полностью поддерживается, и качество реализации в
браузерах было улучшено.

**Кастомизируемый `<select>`**:

Часть Interop 2025, что означает ожидаемую поддержку во всех основных браузерах к концу 2025 года.

### 10.3 Прогресс и мониторинг

Работа над фокусными областями продолжается, с улучшениями, видимыми на панели управления
Interop 2025. Панель управления на `wpt.fyi/interop-2025` отслеживает прогресс в реальном времени по
браузерам.

**Источники**:

- https://web.dev/blog/interop-2025
- https://webkit.org/blog/16458/announcing-interop-2025/
- https://hacks.mozilla.org/2025/02/interop-2025/
- https://github.com/web-platform-tests/interop/blob/main/2025/README.md

## 11. Прочие HTML-изменения и обновления браузеров

### 11.1 Chrome 135–141+

**Chrome 135 (апрель 2025)**:

- Атрибуты `command` и `commandfor`: декларативный способ управления элементами
- Метод `userScripts.execute()`: однократное внедрение пользовательского скрипта

**Chrome 136 (апрель 2025)**:

- IDL-атрибут `lang` для `CanvasTextDrawingStyles`: прямой контроль над языком для рисования текста
- Удаление `HTMLFencedFrameElement.canLoadOpaqueURL()`

**Chrome 137 (май 2025)**:

- Autofill с AI: новая функция для облегчения заполнения онлайн-форм

**Chrome 138–141+ (июнь–ноябрь 2025)**:

- Нет значительных HTML-специфичных изменений, фокус на CSS и API

### 11.2 Firefox 136–142+

**Firefox 136 (март 2025)**:

- Псевдокласс `:has-slotted`: стилизация элементов в шаблоне с контентом в slot
- Псевдокласс `:open`: выбор элементов в открытом состоянии
- Улучшенная модель временной активации пользователя

**Firefox 140 (июнь 2025)**:

- Изменения для предотвращения эксплойтов при HTML-сериализации

**Firefox 141 (июль 2025)**:

- Атрибут `closedby` для `<dialog>`
- Аргумент `options.source` для методов поповера

### 11.3 Safari 18.2–18.6

**Safari 18.3 (январь 2025)**:

- Незначительный поддерживающий релиз с 23 исправлениями ошибок

**Safari 18.5 (май 2025)**:

- `Declarative Web Push` на macOS
- Фокус на исправлении ошибок

**Safari 18.6 (июль 2025)**:

- Фокус на исправлении ошибок, без значительных HTML-функций

**Источники**:

- https://developer.chrome.com/release-notes/135
- https://developer.chrome.com/release-notes/136
- https://www.ghacks.net/2025/03/04/firefox-136-launches-with-vertical-tabs-but-one-requested-feature-is-still-missing/
- https://developer.apple.com/documentation/safari-release-notes/safari-18_6-release-notes

## 12. Deprecations и removals

### 12.1 Удаление атрибута `composite` в Safari 18.4

**Дата выпуска**: 31 марта 2025 года — Safari 18.4

Safari 18.4 удалил поддержку атрибута `composite` на элементе `<img>`, который был первоначально
добавлен в апреле 2004 года для несуществующей функции Dashboard macOS и больше не является
необходимым.

**История**:

Атрибут `composite` был добавлен в WebKit 21 год назад для поддержки виджетов `Dashboard` — функции
macOS, которая была прекращена. Атрибут никогда не был частью веб-стандартов и не использовался в
современной веб-разработке.

**Альтернативы для композитинга изображений**:

**CSS `mix-blend-mode`**:

```css
img {
    mix-blend-mode: multiply;
}
```

**CSS `background-blend-mode`**:

```css
.element {
    background-image: url(image1.jpg), url(image2.jpg);
    background-blend-mode: screen;
}
```

**Canvas API**:

```javascript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'multiply';
ctx.drawImage(img1, 0, 0);
ctx.drawImage(img2, 0, 0);
```

**Источники**:

- https://webkit.org/blog/16574/webkit-features-in-safari-18-4/

## 13. Baseline Newly Available: сводка 2025 года

### 13.1 Определение Baseline Newly Available

`Baseline Newly available` означает, что функция поддерживается всеми основными браузерами и,
следовательно, является интероперабельной.

### 13.2 HTML-функции, ставшие Baseline в 2025 году

**Popover API (январь 2025)**:

Стал `Baseline Newly available` 27 января 2025 года после исправления критических багов в Safari на
iOS/iPadOS.

**Атрибут `hidden` со значением `until-found` (2025)**:

Приносит значение `until-found` HTML-атрибута `hidden` в статус `Baseline Newly available`. Это
скрывает элемент до тех пор, пока он не будет найден с использованием поиска по странице браузера
или при прямой навигации по URL-фрагменту.

### 13.3 Интеграция с VS Code и IDE

В сборке Insiders теперь есть поддержка функций CSS и HTML Baseline в виде всплывающих подсказок при
наведении курсора на CSS-правила и HTML-элементы. Поддерживаемые функции включают CSS-свойства,
HTML-элементы и HTML-атрибуты.

**Источники**:

- https://web.dev/baseline/2025
- https://web.dev/series/baseline-newly-available
- https://web.dev/blog/baseline-digest-apr-2025

## 14. Сводная таблица поддержки браузерами

| Возможность                       | Chrome | Firefox | Safari | Baseline статус               |
| --------------------------------- | ------ | ------- | ------ | ----------------------------- |
| **Popover API**                   | 114    | 125     | 17.0   | ✅ Newly Available (янв 2025) |
| **`popover="hint"`**              | 133    | ❌      | ❌     | ❌ Не достигнут               |
| **Кастомизируемый `<select>`**    | 134    | ❌      | ❌     | ⏳ Interop 2025               |
| **Атрибут `closedby` для dialog** | 134    | 141     | ❌     | ❌ Не достигнут               |
| **Invoker Commands API**          | 135    | ❌      | ❌     | ⏳ В разработке               |
| **Declarative Shadow DOM**        | 90     | 125     | 16.6   | ✅ Newly Available (авг 2024) |
| **`::details-content`**           | ❌     | ❌      | 18.4   | ⏳ Interop 2025               |
| **`:open`**                       | ❌     | 136     | ❌     | ❌ Не достигнут               |
| **`hidden="until-found"`**        | 102    | ❌      | TP 125 | ⏳ Interop 2025               |
| **`input type="week"` (iOS)**     | ✅     | ✅      | 18.2   | ✅ Widely Available           |
| **`webkitdirectory` (iOS)**       | ✅     | ✅      | 18.4   | ✅ Widely Available           |
| **Color picker (`alpha`)**        | ❌     | ❌      | 18.4   | ❌ Не достигнут               |
| **Color picker (`colorspace`)**   | ❌     | ❌      | 18.4   | ❌ Не достигнут               |

## 15. Ключевые выводы

### 15.1 Основные тренды 2025 года

1. **Декларативность**: Создание интерактивных интерфейсов без JavaScript (Popover API Baseline,
   Invoker Commands, `closedby`)
2. **Кастомизация форм**: Нативная поддержка визуально богатых элементов форм (`<select>`, color
   picker)
3. **Интероперабельность**: Активная работа в рамках Interop 2025 для достижения единообразия
4. **Доступность**: Встроенная поддержка accessibility features, соответствие EAA 2025 и WCAG 2.2
5. **Мобильный UX**: Улучшения для iOS/iPadOS (`input type="week"`, `webkitdirectory`)
6. **Зрелость Shadow DOM**: Declarative Shadow DOM достиг статуса Baseline

### 15.2 Технологии, готовые к production

**Безопасно использовать**:

- ✅ Popover API (Baseline с января 2025)
- ✅ Declarative Shadow DOM (Baseline с августа 2024)
- ✅ `input type="week"` на iOS (Safari 18.2+)
- ✅ `webkitdirectory` на iOS (Safari 18.4+)
- ✅ `<dialog>` (Baseline Widely Available)
- ✅ `inert` (Baseline Newly Available)

**Требуют progressive enhancement**:

- ⚠️ `popover="hint"` — только Chrome 133+
- ⚠️ Кастомизируемый `<select>` — Chrome 134+, ожидается в других браузерах (Interop 2025)
- ⚠️ Атрибут `closedby` — Chrome 134+, Firefox 141+
- ⚠️ Invoker Commands API — Chrome 135+, в разработке в других браузерах
- ⚠️ `::details-content` — только Safari 18.4+
- ⚠️ `:open` — только Firefox 136+
- ⚠️ `hidden="until-found"` — Chrome 102+, в разработке в Firefox/Safari
- ⚠️ Color picker с `alpha`/`colorspace` — только Safari 18.4+

### 15.3 Рекомендации по adoption

**Немедленно внедрять**:

- Popover API для модальных окон, меню, тултипов
- Declarative Shadow DOM для SSR веб-компонентов
- `input type="week"` для iOS-приложений
- `webkitdirectory` для загрузки папок на iOS

**Использовать с осторожностью**:

- Кастомизируемый `<select>` с feature detection и fallback
- Атрибут `closedby` с проверкой поддержки
- `popover="hint"` только для Chrome-специфичных решений

**Следить за развитием**:

- Invoker Commands API (Chrome 135+, ожидается кросс-браузерность)
- `::details-content` и `:open` (Interop 2025)
- `hidden="until-found"` (Interop 2025)

## 16. Источники и ссылки

### Официальные блоги браузеров

- Chrome for Developers: https://developer.chrome.com/blog
- Chrome Releases: https://chromereleases.googleblog.com/2025/
- WebKit Blog: https://webkit.org/blog/
- Mozilla Firefox Releases: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases

### Web.dev и Baseline

- Web Platform Updates: https://web.dev/blog/
- Baseline 2025: https://web.dev/baseline/2025
- Baseline Newly Available Series: https://web.dev/series/baseline-newly-available

### Спецификации и сообщества

- Open UI: https://open-ui.org/
- WHATWG HTML: https://html.spec.whatwg.org/
- Interop 2025: https://github.com/web-platform-tests/interop

### Инструменты и справочники

- Can I Use: https://caniuse.com/
- MDN Web Docs: https://developer.mozilla.org/
- Chrome Platform Status: https://chromestatus.com/
- WebKit Features:
    - Safari 18.2: https://webkit.org/blog/16301/webkit-features-in-safari-18-2/
    - Safari 18.4: https://webkit.org/blog/16574/webkit-features-in-safari-18-4/

---

- **Дата создания отчёта**: 19 ноября 2025 года
- **Охватываемый период**: Январь — ноябрь 2025 года (11 месяцев)
- **Research ID**: `frontend-baseline-2023-2025`
- **Автор**: DeepResearch Agent
- **Связанные отчёты**: [HTML 2023](../2023/html.md), [CSS 2023](../2023/css.md)
