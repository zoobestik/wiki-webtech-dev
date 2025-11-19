---
title: JavaScript и Web APIs — изменения 2023 года
description:
    Комплексный обзор изменений в JavaScript и Web APIs за 2023 год - ECMAScript 2023, новые DOM и
    Web APIs, Baseline статусы и практические рекомендации
outline: deep
lastUpdated: true
---

# JavaScript и Web APIs — изменения 2023 года

- **Период**: 1 января 2023 — 31 декабря 2023
- **Версии браузеров**: Chrome/Edge 109–120, Firefox 109–120, Safari 16.3–17.2

## Обзор года

2023 год ознаменовался значительным прогрессом в области JavaScript и Web APIs. Ключевые темы года:

- **ECMAScript 2023**: четыре новые возможности достигли Stage 4 в TC39
- **Иммутабельность**: методы массивов без мутации оригинальных данных
- **Декларативный UI**: Popover API, Declarative Shadow DOM
- **Производительность**: Compression Streams API, Origin Private File System
- **Плавные переходы**: View Transitions API для SPA и MPA
- **Модернизация навигации**: Navigation API как замена History API
- **Baseline-достижения**: множество Web APIs достигли статуса Baseline

## 1. ECMAScript 2023 (ES2023)

ECMAScript 2023 включает четыре основные возможности, достигшие Stage 4 в TC39 в 2023 году.

### 1.1 Change Array by Copy

**Статус**: Baseline 2023 (июль 2023)

Набор методов для создания изменённых копий массивов без мутации оригинала, способствующий
функциональному программированию и иммутабельным паттернам.

**Поддержка браузерами**:

- Chrome 110+ — февраль 2023
- Firefox 115+ — июль 2023
- Safari 16.4+ — март 2023
- Edge 110+ — февраль 2023

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-change-array-by-copy)

#### `Array.prototype.toReversed()`

Создаёт новый массив с элементами в обратном порядке.

```javascript
const items = [1, 2, 3, 4, 5];
console.log(items.toReversed()); // [5, 4, 3, 2, 1]
console.log(items); // [1, 2, 3, 4, 5] — оригинал не изменён
```

**Особенности**:

- Преобразует пустые слоты разреженных массивов в `undefined`
- Работает с array-like объектами через свойство `length`
- Не изменяет исходный массив, в отличие от `Array.prototype.reverse()`

**Практическое применение**: Реверсирование данных при построении UI (список комментариев от новых к
старым) без мутации исходного состояния в React, Vue, Angular.

#### `Array.prototype.toSorted(compareFn?)`

Создаёт новый отсортированный массив.

```javascript
const months = ['Mar', 'Jan', 'Feb', 'Dec'];
const sortedMonths = months.toSorted();
console.log(sortedMonths); // ["Dec", "Feb", "Jan", "Mar"]
console.log(months); // ["Mar", "Jan", "Feb", "Dec"] — оригинал не изменён

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]
```

**Практическое применение**: Сортировка данных в таблицах и списках без изменения исходного порядка,
упрощающая управление состоянием в современных фреймворках.

#### `Array.prototype.toSpliced(start, deleteCount, ...items)`

Создаёт новый массив с удалёнными и/или вставленными элементами.

```javascript
const months = ['Jan', 'Mar', 'Apr', 'May'];

// Вставка элемента
const months2 = months.toSpliced(1, 0, 'Feb');
console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]

// Удаление элементов
const months3 = months2.toSpliced(2, 2);
console.log(months3); // ["Jan", "Feb", "May"]

// Замена элемента
const months4 = months3.toSpliced(1, 1, 'Feb', 'Mar');
console.log(months4); // ["Jan", "Feb", "Mar", "May"]
```

**Практическое применение**: Иммутабельное добавление/удаление элементов в Redux reducers, Zustand
stores и других state management решениях.

#### `Array.prototype.with(index, value)`

Создаёт новый массив с изменённым элементом по указанному индексу.

```javascript
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5] — оригинал не изменён

// Поддержка отрицательных индексов
console.log(arr.with(-1, 10)); // [1, 2, 3, 4, 10]

// Цепочки вызовов
console.log(arr.with(2, 6).map((x) => x ** 2)); // [1, 4, 36, 16, 25]
```

**Практическое применение**: Обновление отдельных элементов в иммутабельных структурах данных,
особенно полезно при работе с формами и состоянием компонентов.

**Источники**:

- [TC39 Proposal: Change Array by Copy](https://github.com/tc39/proposal-change-array-by-copy)
- [MDN: Array.prototype.toReversed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)

### 1.2 Array find from last

**Статус**: Baseline Widely Available (доступно с августа 2022)

Методы для поиска элементов массива с конца, дополняющие существующие методы поиска с начала.

**Поддержка браузерами**:

- Chrome 97+ — январь 2022
- Firefox 104+ — август 2022
- Safari 15.4+ — март 2022
- Edge 97+ — январь 2022

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-array-find-from-last)

#### `Array.prototype.findLast(callback)`

Итерирует массив в обратном порядке и возвращает первый найденный элемент, удовлетворяющий условию.

```javascript
const array = [5, 12, 50, 130, 44];
const found = array.findLast((element) => element > 45);
console.log(found); // 130

// Практический пример: поиск последней успешной транзакции
const transactions = [
    { id: 1, status: 'pending', amount: 100 },
    { id: 2, status: 'completed', amount: 200 },
    { id: 3, status: 'failed', amount: 150 },
    { id: 4, status: 'completed', amount: 300 },
];

const lastCompleted = transactions.findLast((t) => t.status === 'completed');
console.log(lastCompleted); // { id: 4, status: 'completed', amount: 300 }
```

#### `Array.prototype.findLastIndex(callback)`

Возвращает индекс последнего элемента, удовлетворяющего условию.

```javascript
const array = [5, 12, 50, 130, 44];
const foundIndex = array.findLastIndex((element) => element > 45);
console.log(foundIndex); // 3
```

**Практическое применение**: Поиск последних совпадений в логах, истории операций, временных рядах
данных, реверсивная фильтрация коллекций.

**Источники**:

- [TC39 Proposal: Array find from last](https://github.com/tc39/proposal-array-find-from-last)
- [MDN: Array.prototype.findLast()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)

### 1.3 Symbols as WeakMap Keys

**Статус**: Baseline 2023

Расширяет возможности `WeakMap` и `WeakSet`, позволяя использовать символы в качестве ключей наравне
с объектами.

**Поддержка браузерами**:

- Chrome 108+ — ноябрь 2022
- Firefox 111+ — март 2023
- Safari 16.4+ — март 2023
- Edge 108+ — ноябрь 2022

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-symbols-as-weakmap-keys)

```javascript
const weak = new WeakMap();
const key = Symbol('myKey');
const obj = {};

weak.set(key, 'значение для символа');
weak.set(obj, 'значение для объекта');

console.log(weak.get(key)); // 'значение для символа'
console.log(weak.has(key)); // true

// Практический пример: приватные метаданные
const metadata = new WeakMap();
const privateKey = Symbol('private');

class User {
    constructor(name) {
        this.name = name;
        metadata.set(privateKey, { createdAt: Date.now() });
    }

    getMetadata() {
        return metadata.get(privateKey);
    }
}
```

**Практическое применение**:

- Создание приватных метаданных для объектов без риска утечки в публичный API
- Улучшенная инкапсуляция в классах и модулях
- Предотвращение коллизий ключей в библиотеках третьих сторон
- Паттерны для приватных полей до широкой поддержки `#privateField`

**Источники**:

- [TC39 Proposal: Symbols as WeakMap Keys](https://github.com/tc39/proposal-symbols-as-weakmap-keys)
- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

### 1.4 Hashbang Grammar

**Статус**: Baseline Widely Available

Стандартизирует поддержку hashbang (`#!`) в начале скриптов, традиционно используемого в Unix/Linux
для указания интерпретатора.

**Поддержка браузерами**:

- Chrome 74+ — апрель 2019
- Firefox 67+ — май 2019
- Safari 13.1+ — март 2020
- Edge 79+ — январь 2020

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-hashbang)

```javascript
#!/usr/bin/env node
// Остальной код скрипта

console.log('Этот скрипт можно выполнить напрямую в Unix-системах');
```

**Практическое применение**:

- CLI-инструменты на Node.js (`npm` scripts, build tools)
- Исполняемые JavaScript-файлы в Unix-окружениях
- Улучшенная переносимость скриптов между платформами
- Стандартизация существующей практики

**Источники**:

- [TC39 Proposal: Hashbang Grammar](https://github.com/tc39/proposal-hashbang)
- [MDN: Hashbang comments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#hashbang_comments)

## 2. DOM APIs

### 2.1 Popover API

**Статус**: Limited Availability (2023) → Baseline Newly Available (январь 2025)

Стандартный механизм для отображения popover-контента поверх другого контента страницы без
необходимости вручную управлять позиционированием и фокусом.

**Поддержка браузерами**:

- Chrome 114+ — май 2023
- Safari 17.0+ — сентябрь 2023
- Firefox 125+ — апрель 2024
- Edge 114+ — май 2023

**Спецификация**: [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/popover.html)

**Основные возможности**:

- Автоматическое управление z-index (top layer)
- Light dismiss поведение (закрытие при клике вне popover)
- Управление фокусом и accessibility
- События жизненного цикла (`toggle`, `beforetoggle`)
- Только non-modal режим (для modal используйте `<dialog>`)

**HTML атрибуты**:

- `popover`: определяет элемент как popover (`"auto"`, `"manual"`)
- `popovertarget`: связывает кнопку с popover
- `popovertargetaction`: действие (`"show"`, `"hide"`, `"toggle"`)

**JavaScript API**:

```javascript
const popover = document.getElementById('menu');

// Методы управления
popover.showPopover();
popover.hidePopover();
popover.togglePopover();

// События жизненного цикла
popover.addEventListener('beforetoggle', (event) => {
    console.log('Popover меняет состояние:', event.newState);
    // Можно отменить через event.preventDefault()
});

popover.addEventListener('toggle', (event) => {
    console.log('Popover изменил состояние:', event.newState);
    // 'open' или 'closed'
});
```

**HTML пример**:

```html
<button popovertarget="menu">Открыть меню</button>

<div id="menu" popover>
    <ul>
        <li><a href="/profile">Профиль</a></li>
        <li><a href="/settings">Настройки</a></li>
        <li><a href="/logout">Выход</a></li>
    </ul>
</div>
```

**CSS стилизация**:

```css
[popover] {
    border: 2px solid #333;
    border-radius: 8px;
    padding: 20px;
    background: white;
}

[popover]:popover-open {
    animation: slideIn 0.3s ease-out;
}

[popover]::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Практическое применение**:

- Action menus и dropdown меню
- Tooltips и hints
- Toast notifications
- Контекстные меню
- Picker'ы для форм (date, color, etc.)
- Образовательные UI-подсказки

**Источники**:

- [WHATWG Specification](https://html.spec.whatwg.org/multipage/popover.html)
- [Chrome for Developers: Introducing Popover API](https://developer.chrome.com/blog/introducing-popover-api)
- [MDN: Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

### 2.2 Declarative Shadow DOM (JavaScript поддержка)

**Статус**: НЕ достиг Baseline в 2023 (отсутствует поддержка Firefox)

Декларативная Shadow DOM позволяет создавать Shadow DOM через HTML без JavaScript, включая
JavaScript API для работы с такими элементами.

**Поддержка браузерами**:

- Chrome 90+ — апрель 2021 (декларативный)
- Chrome 111+ — март 2023 (императивный API)
- Safari 16.4+ — март 2023
- Firefox — в разработке (на конец 2023)
- Edge 90+ — апрель 2021

**Спецификация**:
[WHATWG HTML](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)

**HTML синтаксис**:

```html
<host-element>
    <template shadowrootmode="open">
        <style>
            :host {
                display: block;
                border: 1px solid black;
                padding: 10px;
            }
        </style>
        <slot></slot>
    </template>
    <p>Контент света DOM</p>
</host-element>
```

**JavaScript API**:

```javascript
// Проверка поддержки
if (HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode')) {
    console.log('Declarative Shadow DOM поддерживается');
}

// Получение существующего shadow root
const host = document.querySelector('host-element');
const shadowRoot = host.shadowRoot;

// Императивное создание
const container = document.createElement('div');
const shadow = container.attachShadow({
    mode: 'open',
    delegatesFocus: true,
    slotAssignment: 'manual',
});

shadow.innerHTML = `
  <style>
    :host { display: block; }
  </style>
  <slot></slot>
`;

document.body.appendChild(container);
```

**Практическое применение**:

- Server-Side Rendering (SSR) с веб-компонентами
- Улучшенная производительность загрузки страницы
- SEO-дружественные веб-компоненты
- Прогрессивное улучшение без FOUC
- Изоляция стилей для компонентов

**Источники**:

- [WHATWG Specification](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
- [MDN: Using Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM)
- [WebKit Blog: Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 2.3 Событие `scrollend`

**Статус**: Baseline 2023

Событие, указывающее на завершение прокрутки пользователем в `Element` и `Document`.

**Поддержка браузерами**:

- Chrome 114+ — май 2023
- Firefox 109+ — январь 2023
- Safari 17.0+ — сентябрь 2023
- Edge 114+ — май 2023

**Спецификация**:
[CSSOM View Module](https://drafts.csswg.org/cssom-view/#eventdef-document-scrollend)

```javascript
// Слушатель на элементе
const scrollableDiv = document.querySelector('.scrollable');

scrollableDiv.addEventListener('scrollend', () => {
    console.log('Прокрутка завершена');
});

// Слушатель на документе
document.addEventListener('scrollend', () => {
    console.log('Прокрутка страницы завершена');
});

// Практический пример: бесконечная прокрутка
let page = 1;
const container = document.querySelector('.infinite-scroll-container');

container.addEventListener('scrollend', async () => {
    const scrollPercentage =
        (container.scrollTop + container.clientHeight) / container.scrollHeight;

    if (scrollPercentage > 0.9) {
        const newData = await loadMoreData(++page);
        renderData(newData);
    }
});
```

**Практическое применение**:

- Lazy loading контента при достижении конца прокрутки
- Бесконечная прокрутка (infinite scroll)
- Аналитика поведения пользователей
- Синхронизация UI после прокрутки
- Сохранение позиции прокрутки

**Источники**:

- [CSSOM View Specification](https://drafts.csswg.org/cssom-view/#eventdef-document-scrollend)
- [MDN: Element scrollend event](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event)

## 3. Web APIs

### 3.1 View Transitions API

**Статус**: Limited Availability (2023)

Механизм для создания анимированных переходов между различными видами сайта, поддерживающий как
single-page applications (SPA), так и multi-page applications (MPA).

**Поддержка браузерами**:

- Chrome 111+ — март 2023 (same-document)
- Chrome 126+ — май 2024 (cross-document, экспериментально)
- Safari — в разработке (на конец 2023)
- Firefox — в разработке (на конец 2023)
- Edge 111+ — март 2023

**Спецификация**:
[CSS View Transitions Module Level 1](https://drafts.csswg.org/css-view-transitions-1/)

**Основные возможности**:

- Автоматическая анимация между состояниями DOM
- Упрощённое управление переходами
- Переходы между документами (MPA, экспериментально)
- Настраиваемые анимации через CSS
- Promises для контроля жизненного цикла

**JavaScript API**:

```javascript
// Same-document переход (SPA)
function updateView(newContent) {
    document.startViewTransition(() => {
        // Обновить DOM
        document.querySelector('.content').innerHTML = newContent;
    });
}

// С обработкой завершения
async function animatedUpdate() {
    const transition = document.startViewTransition(() => {
        updateDOM();
    });

    // Ожидание готовности анимации
    await transition.ready;
    console.log('Анимация начата');

    // Ожидание завершения
    await transition.finished;
    console.log('Анимация завершена');

    // Обработка ошибок
    transition.finished.catch((error) => {
        console.error('Анимация прервана:', error);
    });
}

// Пропуск анимации при условии
function conditionalTransition(shouldAnimate) {
    if (!shouldAnimate || !document.startViewTransition) {
        updateDOM();
        return;
    }

    document.startViewTransition(() => updateDOM());
}
```

**CSS конфигурация**:

```css
/* Именование элементов для индивидуальной анимации */
.gallery-image {
    view-transition-name: gallery-image;
}

.page-title {
    view-transition-name: page-title;
}

/* Настройка анимации переходов */
::view-transition-old(gallery-image) {
    animation: fadeOut 0.3s ease-out;
}

::view-transition-new(gallery-image) {
    animation: fadeIn 0.3s ease-in;
}

/* Группирование элементов */
::view-transition-group(page-title) {
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
}

@keyframes fadeOut {
    to {
        opacity: 0;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
}

/* Cross-document переходы (MPA, экспериментально) */
@view-transition {
    navigation: auto;
}
```

**Практическое применение**:

- Плавные переходы между страницами/видами в SPA
- Анимации навигации без сложного JavaScript
- Морфинг элементов между состояниями
- Галереи с плавным раскрытием изображений
- Улучшение UX при переходах между разделами
- Hero animations (расширение миниатюры в полный размер)

**Источники**:

- [CSS View Transitions Specification](https://drafts.csswg.org/css-view-transitions-1/)
- [Chrome for Developers: View Transitions API](https://developer.chrome.com/blog/new-in-chrome-111)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

### 3.2 Navigation API

**Статус**: Experimental (2023)

Современная замена History API и `window.location`, специально разработанная для нужд single-page
applications (SPA).

**Поддержка браузерами**:

- Chrome 102+ — май 2022
- Safari — не поддерживается (на конец 2023)
- Firefox — не поддерживается (на конец 2023)
- Edge 102+ — май 2022

**Спецификация**: [Navigation API](https://wicg.github.io/navigation-api/)

**Основные возможности**:

- Единое событие `navigate` для всех типов навигации
- Улучшенное управление историей браузера
- Хранение состояния для каждой записи истории
- Безопасный доступ к истории (только same-origin)
- Promises для контроля навигации

**JavaScript API**:

```javascript
// Централизованная обработка навигации
navigation.addEventListener('navigate', (event) => {
    const url = new URL(event.destination.url);

    // Перехват навигации для SPA
    if (url.pathname.startsWith('/articles/')) {
        event.intercept({
            async handler() {
                // Показать loading state
                showLoadingIndicator();

                // Загрузить контент
                const content = await fetchArticle(url.pathname);

                // Обновить UI
                renderArticle(content);

                // Скрыть loading state
                hideLoadingIndicator();
            },
        });
    }
});

// Программная навигация
async function navigateToArticle(id) {
    const result = await navigation.navigate(`/articles/${id}`, {
        state: { articleId: id, timestamp: Date.now() },
    });

    await result.committed;
    console.log('Навигация зафиксирована');

    await result.finished;
    console.log('Навигация завершена');
}

// Работа с историей
navigation.back();
navigation.forward();
navigation.reload();

// Переход к конкретной записи
const entries = navigation.entries();
const targetEntry = entries.find((e) => e.url.includes('/home'));
if (targetEntry) {
    navigation.traverseTo(targetEntry.key);
}

// Обновление состояния без навигации
navigation.updateCurrentEntry({
    state: { scrollPosition: window.scrollY },
});

// Получение текущего состояния
const currentState = navigation.currentEntry.getState();
console.log('Текущее состояние:', currentState);
```

**Практическое применение**:

- Улучшенная маршрутизация в SPA фреймворках
- Единый обработчик всех типов навигации (клик, back/forward, URL change)
- Сохранение состояния UI между переходами
- Отмена навигации при несохранённых изменениях
- Прогресс-индикаторы для длительных переходов
- Замена сложных роутеров на более простой API

**Источники**:

- [Navigation API Specification](https://wicg.github.io/navigation-api/)
- [Chrome for Developers: Navigation API](https://developer.chrome.com/docs/web-platform/navigation-api)
- [MDN: Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)

### 3.3 Compression Streams API

**Статус**: Baseline 2023 (май 2023)

JavaScript API для сжатия и декомпрессии потоков данных с использованием форматов gzip, deflate и
deflate-raw.

**Поддержка браузерами**:

- Chrome 80+ — февраль 2020
- Firefox 113+ — май 2023
- Safari 16.4+ — март 2023
- Edge 80+ — февраль 2020

**Спецификация**: [Compression Streams](https://streams.spec.whatwg.org/#compression-stream)

**Основные интерфейсы**:

- `CompressionStream` — сжимает данные
- `DecompressionStream` — распаковывает данные

**Поддерживаемые форматы**:

- `"gzip"` — формат gzip
- `"deflate"` — формат deflate
- `"deflate-raw"` — raw deflate без обёртки

```javascript
// Сжатие с помощью gzip
async function compressData(data) {
    const stream = new Blob([data]).stream().pipeThrough(new CompressionStream('gzip'));

    return await new Response(stream).blob();
}

// Декомпрессия blob
async function decompressBlob(blob) {
    const decompressedStream = blob.stream().pipeThrough(new DecompressionStream('gzip'));

    return await new Response(decompressedStream).blob();
}

// Сжатие текста
async function compressText(text) {
    const textStream = new Blob([text]).stream();
    const compressedStream = textStream.pipeThrough(new CompressionStream('deflate'));

    const compressedBlob = await new Response(compressedStream).blob();
    return compressedBlob;
}

// Практический пример: сжатие перед отправкой на сервер
async function uploadCompressedData(data) {
    const compressed = await compressData(JSON.stringify(data));

    const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/gzip',
            'Content-Encoding': 'gzip',
        },
        body: compressed,
    });

    return response.json();
}

// Декомпрессия ответа сервера
async function fetchCompressedData(url) {
    const response = await fetch(url);
    const compressedBlob = await response.blob();
    const decompressed = await decompressBlob(compressedBlob);
    const text = await decompressed.text();

    return JSON.parse(text);
}
```

**Практическое применение**:

- Уменьшение размера данных перед отправкой на сервер
- Сжатие локально хранимых данных в IndexedDB
- Обработка архивов на клиенте
- Экономия трафика пользователей
- Ускорение загрузки больших данных
- Обработка compressed responses без сервера

**Источники**:

- [WHATWG Streams Specification](https://streams.spec.whatwg.org/#compression-stream)
- [MDN: Compression Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API)
- [WebKit Blog: Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

## 4. Storage и Performance APIs

### 4.1 Storage API

**Статус**: Baseline Widely Available (декабрь 2021)

API для управления постоянством хранилища и оценки доступного пространства.

**Поддержка браузерами**:

- Chrome 48+ — январь 2016 (`estimate`)
- Chrome 52+ — июль 2016 (`persist`/`persisted`)
- Firefox 51+ — январь 2017 (`estimate`)
- Firefox 55+ — август 2017 (`persist`/`persisted`)
- Safari 17.0+ — сентябрь 2023 (полная поддержка)
- Edge 79+ — январь 2020

**Спецификация**: [Storage Standard](https://storage.spec.whatwg.org/)

**Методы**:

```javascript
// Проверка доступного пространства
async function checkStorage() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();

        const percentUsed = (estimate.usage / estimate.quota) * 100;

        console.log(`Использовано: ${estimate.usage} байт`);
        console.log(`Квота: ${estimate.quota} байт`);
        console.log(`Процент использования: ${percentUsed.toFixed(2)}%`);

        return estimate;
    }
}

// Запрос постоянного хранилища
async function requestPersistentStorage() {
    if ('storage' in navigator && 'persist' in navigator.storage) {
        const isPersisted = await navigator.storage.persist();

        if (isPersisted) {
            console.log('Хранилище теперь постоянное');
        } else {
            console.log('Хранилище может быть очищено браузером');
        }

        return isPersisted;
    }
}

// Проверка статуса постоянства
async function checkPersistence() {
    if ('storage' in navigator && 'persisted' in navigator.storage) {
        const isPersisted = await navigator.storage.persisted();
        console.log('Хранилище постоянное:', isPersisted);
        return isPersisted;
    }
}

// Практический пример: управление офлайн-данными
async function manageOfflineData() {
    const estimate = await checkStorage();
    const availableSpace = estimate.quota - estimate.usage;
    const requiredSpace = 50 * 1024 * 1024; // 50 MB

    if (availableSpace < requiredSpace) {
        console.warn('Недостаточно места для офлайн-данных');
        return false;
    }

    // Запросить постоянное хранилище для важных данных
    const isPersisted = await requestPersistentStorage();

    if (isPersisted) {
        await cacheOfflineContent();
        return true;
    }

    return false;
}
```

**Изменения в Safari 17** (2023):

- Новый алгоритм расчёта квоты на основе свободного места на диске
- Отказ от фиксированного лимита в 1 GB
- Улучшенная поддержка `navigator.storage.estimate()`
- Полная реализация `persist()` и `persisted()`

**Практическое применение**:

- Управление кешем Progressive Web Apps
- Предупреждения о недостатке места для офлайн-данных
- Запрос на сохранение критичных данных
- Мониторинг использования хранилища
- Оптимизация размера кеша

**Источники**:

- [Storage Standard](https://storage.spec.whatwg.org/)
- [MDN: Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)
- [WebKit Blog: Safari 17 Beta](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

### 4.2 Performance Observer API

**Статус**: Baseline Widely Available (январь 2020)

Интерфейс для наблюдения за событиями измерения производительности в режиме реального времени.

**Поддержка браузерами**:

- Chrome 52+ — июль 2016
- Firefox 57+ — ноябрь 2017
- Safari 11+ — сентябрь 2017
- Edge 79+ — январь 2020

**Спецификация**: [Performance Timeline](https://w3c.github.io/performance-timeline/)

```javascript
// Базовый observer
function performanceCallback(list, observer) {
    for (const entry of list.getEntries()) {
        console.log(`${entry.name}: ${entry.duration}ms`);
    }
}

const observer = new PerformanceObserver(performanceCallback);
observer.observe({ entryTypes: ['measure', 'mark', 'navigation'] });

// Создание marks и measures
performance.mark('startTask');
// ... выполнение задачи
performance.mark('endTask');
performance.measure('taskDuration', 'startTask', 'endTask');

// Наблюдение за ресурсами
const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.duration > 1000) {
            console.warn(`Медленный ресурс: ${entry.name} (${entry.duration}ms)`);
        }
    }
});

resourceObserver.observe({ entryTypes: ['resource'] });

// Наблюдение за Long Tasks (Chrome 58+)
const longTaskObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.warn(`Long task обнаружен: ${entry.duration}ms`);
        // Отправить в аналитику
    }
});

if ('PerformanceObserver' in window) {
    try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
        // Не все браузеры поддерживают longtask
    }
}

// Практический пример: мониторинг LCP
const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    console.log('Largest Contentful Paint:', lastEntry.renderTime || lastEntry.loadTime);

    // Отправить в аналитику
    sendToAnalytics({
        metric: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        timestamp: Date.now(),
    });
});

lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
```

**Поддерживаемые типы записей** (2023):

- `navigation` — навигация страницы
- `resource` — загрузка ресурсов
- `mark` — пользовательские метки
- `measure` — пользовательские измерения
- `paint` — First Paint, First Contentful Paint
- `largest-contentful-paint` — LCP (Core Web Vital)
- `layout-shift` — CLS (Core Web Vital)
- `longtask` — длительные задачи > 50ms
- `element` — Element Timing API

**Практическое применение**:

- Мониторинг Core Web Vitals (LCP, FID, CLS)
- Детектирование проблем производительности
- Аналитика реального пользовательского опыта (RUM)
- Автоматическое логирование медленных операций
- Performance budgets и алерты

**Источники**:

- [W3C Performance Timeline](https://w3c.github.io/performance-timeline/)
- [MDN: PerformanceObserver](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)

## 5. Медиа и графика

### 5.1 WebCodecs API

**Статус**: Limited Availability (2023)

Низкоуровневый доступ к отдельным кадрам видео и чанкам аудио для детального контроля над
медиа-обработкой.

**Поддержка браузерами**:

- Chrome 94+ — сентябрь 2021
- Safari 16.4+ — март 2023
- Firefox — не поддерживается (на конец 2023)
- Edge 94+ — сентябрь 2021

**Спецификация**: [WebCodecs](https://w3c.github.io/webcodecs/)

**Основные интерфейсы**:

- `VideoEncoder` / `VideoDecoder` — кодирование/декодирование видео
- `AudioEncoder` / `AudioDecoder` — кодирование/декодирование аудио
- `VideoFrame` — представление видеокадра
- `AudioData` — представление аудиоданных
- `EncodedVideoChunk` / `EncodedAudioChunk` — закодированные данные
- `ImageDecoder` — декодирование изображений

```javascript
// Инициализация видео энкодера
const encoder = new VideoEncoder({
    output(chunk, metadata) {
        // Обработка закодированного чанка
        console.log('Закодирован чанк:', chunk.byteLength, 'байт');
        saveEncodedChunk(chunk, metadata);
    },
    error(e) {
        console.error('Ошибка кодирования:', e);
    },
});

encoder.configure({
    codec: 'vp8',
    width: 1920,
    height: 1080,
    bitrate: 2_000_000,
    framerate: 30,
});

// Кодирование кадра
function encodeFrame(videoFrame) {
    if (encoder.encodeQueueSize > 2) {
        // Пропустить кадр если очередь переполнена
        videoFrame.close();
    } else {
        const keyFrame = needsKeyFrame();
        encoder.encode(videoFrame, { keyFrame });
        videoFrame.close();
    }
}

// Декодирование видео
const decoder = new VideoDecoder({
    output(frame) {
        // Отобразить декодированный кадр
        displayFrame(frame);
        frame.close();
    },
    error(e) {
        console.error('Ошибка декодирования:', e);
    },
});

decoder.configure({
    codec: 'vp8',
    codedWidth: 1920,
    codedHeight: 1080,
});

// Практический пример: обработка видео из canvas
async function captureAndEncodeCanvas() {
    const canvas = document.querySelector('canvas');
    const stream = canvas.captureStream(30); // 30 FPS
    const [track] = stream.getVideoTracks();
    const processor = new MediaStreamTrackProcessor({ track });

    const reader = processor.readable.getReader();

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // value это VideoFrame
        encodeFrame(value);
    }
}

// ImageDecoder для декодирования изображений
async function decodeImage(imageBlob) {
    const decoder = new ImageDecoder({ data: imageBlob, type: 'image/png' });

    const { image } = await decoder.decode({ frameIndex: 0 });

    // image это VideoFrame, можно отрисовать на canvas
    const canvas = document.createElement('canvas');
    canvas.width = image.displayWidth;
    canvas.height = image.displayHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    image.close();

    return canvas;
}
```

**Практическое применение**:

- Видео редакторы в браузере
- Видео конференции с обработкой кадров в реальном времени
- Транскодирование видео на клиенте
- Применение фильтров и эффектов к видео
- Захват и кодирование canvas анимаций
- Оптимизация видео перед загрузкой

**Источники**:

- [W3C WebCodecs Specification](https://w3c.github.io/webcodecs/)
- [MDN: WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API)
- [WebKit Blog: Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 5.2 Offscreen Canvas

**Статус**: Baseline 2023

Canvas, который может рендериться вне экрана (off screen), отделяя DOM от Canvas API и позволяя
рендеринг в Web Workers.

**Поддержка браузерами**:

- Chrome 69+ — сентябрь 2018
- Firefox 105+ — сентябрь 2022
- Safari 16.4+ — март 2023 (2D context)
- Safari 17.0+ — сентябрь 2023 (WebGL context)
- Edge 79+ — январь 2020

**Спецификация**:
[HTML Living Standard](https://html.spec.whatwg.org/multipage/canvas.html#the-offscreencanvas-interface)

```javascript
// Создание offscreen canvas
const offscreen = new OffscreenCanvas(800, 600);
const ctx = offscreen.getContext('2d');

// Рендеринг
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 800, 600);
ctx.fillStyle = 'white';
ctx.font = '48px serif';
ctx.fillText('Offscreen Canvas', 50, 100);

// Конвертация в Blob
const blob = await offscreen.convertToBlob({ type: 'image/png' });

// Использование в Worker
// main.js
const canvas = document.querySelector('canvas');
const offscreen = canvas.transferControlToOffscreen();
const worker = new Worker('worker.js');
worker.postMessage({ canvas: offscreen }, [offscreen]);

// worker.js
self.onmessage = function (e) {
    const canvas = e.data.canvas;
    const ctx = canvas.getContext('2d');

    // Анимация в worker
    function draw() {
        ctx.fillStyle = `hsl(${(Date.now() / 10) % 360}, 100%, 50%)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
    }

    draw();
};

// Практический пример: генерация миниатюр
async function generateThumbnail(imageBlob, width, height) {
    const imageBitmap = await createImageBitmap(imageBlob);
    const offscreen = new OffscreenCanvas(width, height);
    const ctx = offscreen.getContext('2d');

    ctx.drawImage(imageBitmap, 0, 0, width, height);

    return await offscreen.convertToBlob({ type: 'image/jpeg', quality: 0.8 });
}
```

**Практическое применение**:

- Рендеринг сложной графики без блокировки UI
- Генерация изображений в фоне
- Игры с высокой нагрузкой на рендеринг
- Обработка изображений в worker'ах
- Параллельный рендеринг нескольких canvas
- Офлайн-генерация визуализаций

**Источники**:

- [HTML Living Standard: OffscreenCanvas](https://html.spec.whatwg.org/multipage/canvas.html#the-offscreencanvas-interface)
- [MDN: OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [WebKit Blog: Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

## 6. Устройства и периферия

### 6.1 File System Access API

**Статус**: Limited Availability (2023)

API для чтения, записи и управления файлами на локальной файловой системе пользователя. Включает
Origin Private File System (OPFS) для высокопроизводительного приватного хранилища.

**Поддержка браузерами**:

- Chrome 86+ — октябрь 2020 (базовый API)
- Chrome 102+ — май 2022 (OPFS на desktop)
- Chrome 109+ — январь 2023 (OPFS на Android)
- Safari — не поддерживается (на конец 2023)
- Firefox — не поддерживается (на конец 2023)
- Edge 86+ — октябрь 2020

**Спецификация**: [File System Access](https://wicg.github.io/file-system-access/)

**Основные методы**:

```javascript
// Открытие файла
async function openFile() {
    try {
        const [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'Текстовые файлы',
                    accept: {
                        'text/plain': ['.txt', '.md'],
                    },
                },
            ],
            multiple: false,
        });

        const file = await fileHandle.getFile();
        const contents = await file.text();

        console.log('Содержимое файла:', contents);
        return { fileHandle, contents };
    } catch (err) {
        console.error('Пользователь отменил выбор файла');
    }
}

// Сохранение файла
async function saveFile(content) {
    try {
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'document.txt',
            types: [
                {
                    description: 'Текстовый файл',
                    accept: { 'text/plain': ['.txt'] },
                },
            ],
        });

        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();

        console.log('Файл сохранён');
    } catch (err) {
        console.error('Ошибка сохранения файла:', err);
    }
}

// Выбор директории
async function openDirectory() {
    try {
        const dirHandle = await window.showDirectoryPicker();

        for await (const entry of dirHandle.values()) {
            console.log(entry.kind, entry.name);
        }

        return dirHandle;
    } catch (err) {
        console.error('Ошибка при выборе директории');
    }
}

// Origin Private File System (OPFS)
async function useOPFS() {
    // Получение корневой директории OPFS
    const root = await navigator.storage.getDirectory();

    // Создание файла
    const fileHandle = await root.getFileHandle('data.json', { create: true });

    // Запись (обычный способ)
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify({ timestamp: Date.now() }));
    await writable.close();

    // Чтение
    const file = await fileHandle.getFile();
    const data = JSON.parse(await file.text());
    console.log('Данные из OPFS:', data);
}

// Синхронный доступ в Worker (высокая производительность)
// worker.js
async function useSyncOPFS() {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle('large-file.dat', { create: true });

    // Синхронный handle доступен только в Worker
    const syncHandle = await fileHandle.createSyncAccessHandle();

    // Синхронные операции чтения/записи
    const buffer = new ArrayBuffer(1024);
    const bytesRead = syncHandle.read(buffer, { at: 0 });

    const writeBuffer = new TextEncoder().encode('Данные');
    syncHandle.write(writeBuffer, { at: 0 });

    syncHandle.flush();
    syncHandle.close();
}

// Практический пример: текстовый редактор с автосохранением
class FileEditor {
    constructor() {
        this.fileHandle = null;
        this.isDirty = false;
    }

    async open() {
        [this.fileHandle] = await window.showOpenFilePicker();
        const file = await this.fileHandle.getFile();
        const content = await file.text();

        document.querySelector('#editor').value = content;
        this.isDirty = false;
        return content;
    }

    async save() {
        if (!this.fileHandle) {
            this.fileHandle = await window.showSaveFilePicker();
        }

        const content = document.querySelector('#editor').value;
        const writable = await this.fileHandle.createWritable();
        await writable.write(content);
        await writable.close();

        this.isDirty = false;
        console.log('Файл сохранён');
    }

    async autoSave() {
        if (this.isDirty && this.fileHandle) {
            await this.save();
        }
    }

    markDirty() {
        this.isDirty = true;
    }
}
```

**Нововведения 2023**:

- OPFS доступен на Android с Chrome 109 (январь 2023)
- `FileSystemSyncAccessHandle` для синхронных операций в Worker'ах
- Улучшенная производительность для больших файлов

**Практическое применение**:

- Текстовые редакторы и IDE в браузере
- Редакторы изображений с сохранением на диск
- Видео/аудио редакторы
- Локальная обработка больших файлов без загрузки на сервер
- Офлайн-приложения с локальным хранением
- Git клиенты в браузере

**Источники**:

- [File System Access Specification](https://wicg.github.io/file-system-access/)
- [MDN: File System API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)
- [Chrome for Developers: Chrome 109](https://developer.chrome.com/blog/new-in-chrome-109)

### 6.2 Screen Wake Lock API

**Статус**: Limited Availability (2023)

API для предотвращения затемнения экрана устройства во время продолжительного просмотра контента или
выполнения длительных задач.

**Поддержка браузерами**:

- Chrome 84+ — июль 2020
- Safari 16.4+ — март 2023
- Firefox — не поддерживается (на конец 2023)
- Edge 84+ — июль 2020

**Спецификация**: [Screen Wake Lock API](https://w3c.github.io/screen-wake-lock/)

```javascript
// Запрос wake lock
let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock активирован');

        wakeLock.addEventListener('release', () => {
            console.log('Wake Lock деактивирован');
        });
    } catch (err) {
        console.error('Ошибка активации Wake Lock:', err);
    }
}

// Освобождение wake lock
async function releaseWakeLock() {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
    }
}

// Практический пример: видео плеер
class VideoPlayer {
    constructor(videoElement) {
        this.video = videoElement;
        this.wakeLock = null;

        this.video.addEventListener('play', () => this.onPlay());
        this.video.addEventListener('pause', () => this.onPause());
    }

    async onPlay() {
        try {
            this.wakeLock = await navigator.wakeLock.request('screen');
            console.log('Экран не будет затемняться во время воспроизведения');
        } catch (err) {
            console.error('Wake Lock недоступен:', err);
        }
    }

    async onPause() {
        if (this.wakeLock) {
            await this.wakeLock.release();
            this.wakeLock = null;
        }
    }
}

// Обработка видимости страницы
document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        // Переактивация при возврате на страницу
        await requestWakeLock();
    }
});
```

**Практическое применение**:

- Видео и аудио плееры
- Презентации и слайд-шоу
- Рецепты и инструкции для приготовления
- Фитнес и тренировочные приложения
- Навигационные приложения
- Длительные процессы с визуальным отображением

**Источники**:

- [W3C Screen Wake Lock Specification](https://w3c.github.io/screen-wake-lock/)
- [MDN: Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
- [WebKit Blog: Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 6.3 Gamepad API (haptic feedback)

**Статус**: Частичная поддержка (Safari 17.0+)

Расширение Gamepad API с поддержкой вибрации (haptic feedback) через `vibrationActuator`.

**Поддержка браузерами**:

- Chrome 68+ — июль 2018 (базовый API, частичная поддержка haptics)
- Firefox 29+ — апрель 2014 (базовый API)
- Safari 17.0+ — сентябрь 2023 (полная поддержка haptic feedback)
- Edge 79+ — январь 2020

**Спецификация**: [Gamepad API](https://w3c.github.io/gamepad/)

**Нововведения Safari 17** (2023):

- Полная поддержка `Gamepad.prototype.vibrationActuator`
- Dual-rumble эффекты с контролем длительности и силы

```javascript
// Получение геймпадов
window.addEventListener('gamepadconnected', (e) => {
    console.log('Геймпад подключён:', e.gamepad.id);
    testVibration(e.gamepad);
});

// Тестирование вибрации
async function testVibration(gamepad) {
    if (gamepad.vibrationActuator) {
        await gamepad.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: 200,
            weakMagnitude: 0.5,
            strongMagnitude: 1.0,
        });
    }
}

// Практический пример: игровая механика
class GameController {
    constructor() {
        this.gamepad = null;
        this.animationFrame = null;

        window.addEventListener('gamepadconnected', (e) => {
            this.gamepad = e.gamepad;
            this.startPolling();
        });

        window.addEventListener('gamepaddisconnected', () => {
            this.stopPolling();
        });
    }

    async vibrate(duration = 100, strength = 1.0) {
        const gamepads = navigator.getGamepads();
        const gamepad = gamepads[0];

        if (gamepad && gamepad.vibrationActuator) {
            await gamepad.vibrationActuator.playEffect('dual-rumble', {
                duration,
                weakMagnitude: strength * 0.5,
                strongMagnitude: strength,
            });
        }
    }

    async onPlayerHit() {
        // Короткая интенсивная вибрация при попадании
        await this.vibrate(150, 1.0);
    }

    async onWeaponFire() {
        // Слабая вибрация при выстреле
        await this.vibrate(50, 0.3);
    }

    startPolling() {
        const poll = () => {
            const gamepads = navigator.getGamepads();
            const gamepad = gamepads[0];

            if (gamepad) {
                this.handleInput(gamepad);
            }

            this.animationFrame = requestAnimationFrame(poll);
        };

        poll();
    }

    stopPolling() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    handleInput(gamepad) {
        // Обработка кнопок и стиков
        const [stick] = gamepad.axes;
        const [button] = gamepad.buttons;

        if (button.pressed) {
            this.onWeaponFire();
        }
    }
}
```

**Практическое применение**:

- Тактильная обратная связь в играх
- Симуляторы вождения
- VR/AR приложения
- Обучающие приложения с физической обратной связью
- Accessibility features для слабовидящих пользователей

**Источники**:

- [W3C Gamepad Specification](https://w3c.github.io/gamepad/)
- [MDN: Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API)
- [WebKit Blog: Safari 17 Beta](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

## 7. Безопасность и приватность

### 7.1 CHIPS (Cookies Having Independent Partitioned State)

**Статус**: Начальная поддержка (Chrome 109+, 2023)

Механизм для создания партиционированных cookies третьих сторон с использованием атрибута
`Partitioned`, изолирующего cookies по top-level сайту.

**Поддержка браузерами**:

- Chrome 109+ — январь 2023 (начальная поддержка)
- Chrome 114+ — май 2023 (полная поддержка)
- Safari — использует собственный подход (Storage Access API)
- Firefox — не поддерживается (на конец 2023)
- Edge 109+ — январь 2023

**Спецификация**: [CHIPS Proposal](https://github.com/WICG/CHIPS)

```javascript
// Установка партиционированного cookie
document.cookie = 'session=abc123; Partitioned; Secure; SameSite=None; Path=/';

// Партиционированные cookies доступны только в контексте того же top-level сайта
// Пример: embed с site-a.com на site-b.com имеет свой набор cookies,
// отличный от embed с site-a.com на site-c.com

// Проверка поддержки через HTTP заголовок
// Set-Cookie: session=abc123; Partitioned; Secure; SameSite=None; Path=/

// Практический пример: iframe с аутентификацией
class PartitionedAuth {
    setCookie(name, value, days = 7) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();

        // Partitioned cookie для изоляции между сайтами
        document.cookie = `${name}=${value}; expires=${expires}; Partitioned; Secure; SameSite=None; Path=/`;
    }

    getCookie(name) {
        return document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1];
    }

    async authenticate(credentials) {
        const response = await fetch('/api/auth', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        if (response.ok) {
            const { token } = await response.json();
            this.setCookie('auth_token', token);
            return true;
        }

        return false;
    }
}
```

**Практическое применение**:

- Безопасная аутентификация в iframe'ах
- Виджеты третьих сторон с состоянием
- Embedded платёжные формы
- Чаты и комментарии третьих сторон
- Аналитика с улучшенной приватностью
- Защита от cross-site tracking

**Источники**:

- [CHIPS Proposal](https://github.com/WICG/CHIPS)
- [Chrome for Developers: Chrome 109](https://developer.chrome.com/blog/new-in-chrome-109)
- [Chrome Platform Status: CHIPS](https://chromestatus.com/feature/5179189105786880)

### 7.2 Fetch Metadata Request Headers

**Статус**: Baseline 2023

HTTP заголовки, предоставляющие серверу контекст о запросе для принятия решений по безопасности на
основе метаданных.

**Поддержка браузерами**:

- Chrome 76+ — июль 2019
- Firefox 90+ — июль 2021
- Safari 16.4+ — март 2023
- Edge 79+ — январь 2020

**Спецификация**: [Fetch Metadata Request Headers](https://w3c.github.io/webappsec-fetch-metadata/)

**Заголовки**:

- `Sec-Fetch-Site`: источник запроса (`same-origin`, `same-site`, `cross-site`, `none`)
- `Sec-Fetch-Mode`: режим запроса (`navigate`, `nested-navigate`, `cors`, `no-cors`, и др.)
- `Sec-Fetch-Dest`: назначение запроса (`document`, `image`, `script`, `style`, и др.)
- `Sec-Fetch-User`: инициирован ли запрос пользователем (`?1` для true)

```javascript
// Примеры заголовков в запросе
// GET /api/data
// Sec-Fetch-Site: same-origin
// Sec-Fetch-Mode: cors
// Sec-Fetch-Dest: empty

// Серверная логика (Node.js/Express пример)
app.use((req, res, next) => {
    const site = req.get('Sec-Fetch-Site');
    const mode = req.get('Sec-Fetch-Mode');
    const dest = req.get('Sec-Fetch-Dest');

    // Блокировать cross-site запросы к чувствительным endpoint'ам
    if (req.path.startsWith('/api/admin')) {
        if (site !== 'same-origin' && site !== 'same-site') {
            return res.status(403).json({ error: 'Forbidden' });
        }
    }

    // Разрешить только navigation requests для HTML страниц
    if (dest === 'document' && mode !== 'navigate') {
        return res.status(403).json({ error: 'Invalid request mode' });
    }

    next();
});

// Клиентский код (автоматически добавляется браузером)
fetch('/api/data', {
    method: 'GET',
    credentials: 'include',
});
// Браузер автоматически добавит Sec-Fetch-* заголовки
```

**Практическое применение**:

- Защита от CSRF атак
- Предотвращение embedding на сторонних сайтах
- Контроль источников запросов к API
- Улучшенная изоляция ресурсов
- Resource Isolation Policy enforcement

**Источники**:

- [W3C Fetch Metadata Specification](https://w3c.github.io/webappsec-fetch-metadata/)
- [MDN: Fetch metadata request header](https://developer.mozilla.org/en-US/docs/Glossary/Fetch_metadata_request_header)
- [WebKit Blog: Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

## 8. Дополнительные Web APIs

### 8.1 URL API enhancements (Safari 17, 2023)

**Статус**: Частичная поддержка (Safari 17.0+)

Расширения URL API для упрощения работы с URL без обработки исключений.

**Поддержка браузерами**:

- Safari 17.0+ — сентябрь 2023
- Chrome — не поддерживается (на конец 2023)
- Firefox — не поддерживается (на конец 2023)

```javascript
// Проверка валидности URL без try/catch
if (URL.canParse('https://example.com')) {
    const url = new URL('https://example.com');
}

// Расширенные методы URLSearchParams
const params = new URLSearchParams('key=value&key=value2');

// Проверка конкретной пары ключ-значение
params.has('key', 'value'); // true
params.has('key', 'value3'); // false

// Удаление конкретной пары
params.delete('key', 'value');
```

**Источники**:

- [WebKit Blog: Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)

### 8.2 RegExp v flag (Safari 17, Chrome 115, 2023)

**Статус**: Baseline 2023

Новый флаг `v` для RegExp с поддержкой Unicode свойств и множественных операций.

**Поддержка браузерами**:

- Chrome 115+ — июль 2023
- Safari 17.0+ — сентябрь 2023
- Firefox — не поддерживается (на конец 2023)
- Edge 115+ — июль 2023

```javascript
// Поддержка Unicode свойств
const regex = /\p{Emoji}/v;
regex.test('😀'); // true

// Set notation
const digitsOnly = /^[\d&&[^0]]+$/v;
digitsOnly.test('123'); // true
digitsOnly.test('0123'); // false

// Разница множеств
const latinNoVowels = /^[\p{Script=Latin}--[aeiou]]+$/iv;
latinNoVowels.test('bcdfg'); // true
latinNoVowels.test('hello'); // false
```

**Источники**:

- [WebKit Blog: Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)
- [Chrome for Developers: Chrome 115](https://developer.chrome.com/blog/new-in-chrome-115)

### 8.3 Array.fromAsync (Safari 16.4, 2023)

**Статус**: Частичная поддержка (Safari 16.4+)

Создание массива из асинхронного итератора или промисов.

**Поддержка браузерами**:

- Safari 16.4+ — март 2023
- Chrome 121+ — январь 2024
- Firefox — не поддерживается (на конец 2023)

```javascript
// Создание массива из асинхронного итератора
async function* generateNumbers() {
    yield 1;
    yield 2;
    yield 3;
}

const numbers = await Array.fromAsync(generateNumbers());
console.log(numbers); // [1, 2, 3]

// С промисами
const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

const values = await Array.fromAsync(promises);
console.log(values); // [1, 2, 3]
```

**Источники**:

- [WebKit Blog: Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 8.4 Object.groupBy / Map.groupBy (Chrome 117, 2023)

**Статус**: Ограниченная поддержка (Chrome 117+)

Группировка элементов массива по ключу функции.

**Поддержка браузерами**:

- Chrome 117+ — сентябрь 2023
- Safari — не поддерживается (на конец 2023)
- Firefox — не поддерживается (на конец 2023)
- Edge 117+ — сентябрь 2023

```javascript
// Группировка массива объектов
const inventory = [
    { name: 'asparagus', type: 'vegetables' },
    { name: 'bananas', type: 'fruit' },
    { name: 'goat', type: 'meat' },
    { name: 'cherries', type: 'fruit' },
];

const grouped = Object.groupBy(inventory, ({ type }) => type);
console.log(grouped);
// {
//   vegetables: [{ name: 'asparagus', type: 'vegetables' }],
//   fruit: [{ name: 'bananas', type: 'fruit' }, { name: 'cherries', type: 'fruit' }],
//   meat: [{ name: 'goat', type: 'meat' }]
// }

// Map.groupBy для использования объектов как ключей
const map = Map.groupBy(inventory, ({ type }) => type);
```

**Источники**:

- [Chrome for Developers: Chrome 117](https://developer.chrome.com/blog/new-in-chrome-117)

## 9. Baseline статус

### 9.1 Что такое Baseline?

**Baseline** — инициатива для прояснения информации о поддержке браузерами возможностей
веб-платформы. Запущена командой Chrome, теперь управляется WebDX Community Group.

**Статусы**:

1. **Limited Availability**: Не поддерживается всеми основными браузерами
2. **Newly Available**: Поддерживается всеми основными браузерами (Chrome, Edge, Firefox, Safari)
3. **Widely Available**: Прошло 30 месяцев с момента достижения Newly Available

### 9.2 Возможности, достигшие Baseline в 2023

**Newly Available (2023)**:

- **Change Array by Copy** (июль 2023): `toReversed()`, `toSorted()`, `toSpliced()`, `with()`
- **Compression Streams API** (май 2023)
- **Offscreen Canvas** (2D context)
- **`scrollend` event** (сентябрь 2023)
- **Fetch Metadata Request Headers** (март 2023)

**Limited Availability (2023)**:

- **Popover API** (май 2023) → Newly Available (январь 2025)
- **View Transitions API** (март 2023)
- **File System Access API** (OPFS на Android — январь 2023)
- **WebCodecs API**
- **Screen Wake Lock API**

**Widely Available (достигнуто ранее, но широко используется в 2023)**:

- **`findLast()` и `findLastIndex()`** (август 2022)
- **Storage API** (декабрь 2021)
- **Performance Observer API** (январь 2020)

**Источники**:

- [Web Platform Baseline](https://web.dev/baseline)
- [Baseline Dashboard](https://web.dev/baseline-dashboard)

## 10. Депрекации и удаления

### 10.1 Chrome (2023)

**Удалено**:

- **Document.domain setter** (Chrome 115, июль 2023): больше нельзя изменять `document.domain` для
  обхода same-origin policy
- **Web SQL Database** (Chrome 119, ноябрь 2023): полное удаление устаревшего API для работы с
  базами данных

**Задепрекировано**:

- **Mutation Events** (продолжение депрекации): рекомендуется использовать `MutationObserver`
- **Unload event** (рекомендация): переход на `visibilitychange` и `pagehide` для более надёжной
  обработки

**Источники**:

- [Chrome Platform Status: Deprecated](https://chromestatus.com/features#deprecated)

### 10.2 Firefox (2023)

**Удалено**:

- Некоторые устаревшие WebRTC методы
- Старые версии Crypto API без стандартизации

**Источники**:

- [Firefox Releases (MDN)](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases)

### 10.3 Safari (2023)

**Задепрекировано**:

- Webkit-префиксированные CSS свойства (рекомендация использовать стандартные)

**Источники**:

- [WebKit Blog](https://webkit.org/blog/)

## 11. Сводная таблица Baseline статусов

| Возможность                 | Chrome | Firefox | Safari | Baseline статус                    |
| --------------------------- | ------ | ------- | ------ | ---------------------------------- |
| **Change Array by Copy**    | 110    | 115     | 16.4   | ✅ Newly Available (июль 2023)     |
| **Array find from last**    | 97     | 104     | 15.4   | ✅ Widely Available (август 2022)  |
| **Symbols as WeakMap Keys** | 108    | 111     | 16.4   | ✅ Baseline 2023                   |
| **Hashbang Grammar**        | 74     | 67      | 13.1   | ✅ Widely Available                |
| **Popover API**             | 114    | 125\*   | 17.0   | ⏳ Newly Available (январь 2025)   |
| **Declarative Shadow DOM**  | 90     | ❌      | 16.4   | ❌ Не достигнут                    |
| **`scrollend` event**       | 114    | 109     | 17.0   | ✅ Baseline 2023                   |
| **View Transitions API**    | 111    | ❌      | ❌     | ⏳ Limited Availability            |
| **Navigation API**          | 102    | ❌      | ❌     | ⏳ Experimental                    |
| **Compression Streams API** | 80     | 113     | 16.4   | ✅ Baseline 2023 (май 2023)        |
| **Storage API**             | 52     | 55      | 17.0   | ✅ Widely Available (декабрь 2021) |
| **WebCodecs API**           | 94     | ❌      | 16.4   | ⏳ Limited Availability            |
| **Offscreen Canvas**        | 69     | 105     | 16.4   | ✅ Baseline 2023                   |
| **File System Access API**  | 86     | ❌      | ❌     | ⏳ Limited Availability            |
| **Screen Wake Lock API**    | 84     | ❌      | 16.4   | ⏳ Limited Availability            |
| **CHIPS**                   | 109    | ❌      | ❌\*\* | ⏳ Limited Availability            |
| **Fetch Metadata Headers**  | 76     | 90      | 16.4   | ✅ Baseline 2023 (март 2023)       |

_\* Firefox 125 (апрель 2024)_ _\*\* Safari использует собственный Storage Access API_

## 12. Ключевые выводы

### 12.1 Основные тренды 2023 года

1. **Иммутабельность**: ECMAScript 2023 продолжает тренд на функциональное программирование с
   иммутабельными методами массивов
2. **Декларативный UI**: Popover API и Declarative Shadow DOM упрощают создание интерактивных
   интерфейсов без сложного JavaScript
3. **Производительность**: Compression Streams, OPFS, WebCodecs открывают новые возможности для
   высокопроизводительных приложений
4. **Плавные переходы**: View Transitions API революционизирует UX в SPA и MPA
5. **Модернизация навигации**: Navigation API как современная альтернатива устаревшему History API
6. **Baseline прогресс**: Множество возможностей достигли статуса Baseline, улучшая предсказуемость
   разработки
7. **Безопасность и приватность**: CHIPS и Fetch Metadata Headers улучшают изоляцию и контроль
   доступа

### 12.2 Технологии, готовые к production

**Безопасно использовать** (Baseline 2023 или Widely Available):

- ✅ Change Array by Copy (`toReversed`, `toSorted`, `toSpliced`, `with`)
- ✅ `findLast()` и `findLastIndex()`
- ✅ Symbols as WeakMap Keys
- ✅ Compression Streams API
- ✅ `scrollend` event
- ✅ Storage API (Safari 17)
- ✅ Offscreen Canvas (2D context)
- ✅ Fetch Metadata Request Headers
- ✅ Performance Observer API

**Требуют progressive enhancement**:

- ⚠️ Popover API — fallback для старых браузеров до января 2025
- ⚠️ Declarative Shadow DOM — polyfill для Firefox
- ⚠️ View Transitions API — feature detection, только Chrome/Edge
- ⚠️ Navigation API — только Chrome/Edge, experimental
- ⚠️ WebCodecs API — только Chrome/Safari/Edge
- ⚠️ File System Access API — только Chrome/Edge
- ⚠️ Screen Wake Lock API — только Chrome/Safari/Edge

**Экспериментальные** (не рекомендуется для production):

- ⚠️ Navigation API
- ⚠️ Cross-document View Transitions
- ⚠️ CHIPS (ограниченная поддержка)

### 12.3 Рекомендации по adoption

1. **Немедленно внедрять**:
    - Иммутабельные методы массивов для улучшения предсказуемости кода
    - Compression Streams для оптимизации трафика
    - Storage API для управления квотами
    - `scrollend` для оптимизации scroll-зависимых операций

2. **Использовать с feature detection**:
    - Popover API с fallback на custom решения
    - View Transitions API для улучшения UX в современных браузерах
    - WebCodecs API для продвинутой медиа-обработки

3. **Следить за развитием**:
    - Navigation API (ожидается расширение поддержки)
    - Declarative Shadow DOM (Firefox implementation)
    - File System Access API (Safari implementation)

4. **Заменить устаревшее**:
    - `document.domain` → CORS и postMessage
    - Web SQL → IndexedDB или OPFS
    - Mutation Events → MutationObserver
    - `unload` event → `visibilitychange` и `pagehide`

## 13. Источники

### Официальные спецификации

- [TC39 Proposals](https://github.com/tc39/proposals)
- [TC39 Finished Proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md)
- [WHATWG Standards](https://spec.whatwg.org/)
- [W3C Specifications](https://www.w3.org/TR/)

### Browser release notes

- [Chrome Releases](https://chromereleases.googleblog.com/)
- [Chrome Platform Status](https://chromestatus.com/)
- [Chrome for Developers](https://developer.chrome.com/blog)
- [Firefox Releases (MDN)](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases)
- [WebKit Blog](https://webkit.org/blog/)
- [Safari Release Notes](https://developer.apple.com/documentation/safari-release-notes)

### Документация и инструменты

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Platform Baseline](https://web.dev/baseline)
- [Can I Use](https://caniuse.com/)
- [Browser Compat Data](https://github.com/mdn/browser-compat-data)

### Версии браузеров (2023)

- **Chrome**: 109 (январь) — 120 (декабрь)
- **Firefox**: 109 (январь) — 120 (декабрь)
- **Safari**: 16.3 (февраль) — 17.2 (декабрь)
- **Edge**: 109 (январь) — 120 (декабрь)

---

- **Дата создания отчёта**: 18.11.2025
- **Research ID**: `frontend-baseline-2023-2025`
- **Автор**: DeepResearch Agent
- **Связанные отчёты**: [HTML 2023](./html.md), [CSS 2023](./css.md),
  [HTTP/Security 2023](./http-security.md)
