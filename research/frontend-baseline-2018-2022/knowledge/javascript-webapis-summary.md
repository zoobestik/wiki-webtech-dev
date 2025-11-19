---
title: JavaScript и Web APIs 2018-2022
description: ECMAScript релизы ES2018-ES2022 и ключевые Web APIs изменения
outline: deep
lastUpdated: true
---

# JavaScript и Web APIs: ключевые изменения 2018–2022

## Обзор

Период 2018–2022 характеризуется ежегодными ECMAScript релизами (ES2018–ES2022) и значительным
расширением Web APIs. Основные тренды:

- **ECMAScript:** стабильные ежегодные релизы с incremental улучшениями
- **Async/Performance APIs:** Core Web Vitals measurement, Observers расширение
- **Storage & State:** IndexedDB улучшения, Cookie Store API начало
- **Security:** Permissions API расширение, Feature Policy / Permissions Policy
- **Developer Experience:** Optional chaining, nullish coalescing, top-level await

## ECMAScript (Language Features)

### ES2018

**Async iteration:**

```javascript
for await (const item of asyncIterable) {
    console.log(item);
}
```

**Rest/Spread properties для объектов:**

```javascript
const { x, y, ...rest } = { x: 1, y: 2, a: 3, b: 4 };
// rest = { a: 3, b: 4 }

const merged = { ...obj1, ...obj2 };
```

**Promise.finally():**

```javascript
fetch(url)
    .then(handleResponse)
    .catch(handleError)
    .finally(() => hideLoader());
```

### ES2019

**Array.flat() и Array.flatMap():**

```javascript
[1, [2, [3, 4]]].flat(2); // [1, 2, 3, 4]

[1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
```

**Object.fromEntries():**

```javascript
const entries = [
    ['a', 1],
    ['b', 2],
];
const obj = Object.fromEntries(entries); // { a: 1, b: 2 }
```

**String.trimStart() / trimEnd():**

```javascript
'  hello  '.trimStart(); // 'hello  '
'  hello  '.trimEnd(); // '  hello'
```

### ES2020 — самый значимый релиз периода

**Optional Chaining (?.):**

```javascript
const street = user?.address?.street;
// Вместо: user && user.address && user.address.street
```

**Nullish Coalescing (??):**

```javascript
const value = config.timeout ?? 3000;
// Отличие от || : 0 и '' считаются валидными
```

**BigInt — arbitrary precision integers:**

```javascript
const huge = 9007199254740991n + 1n;
typeof huge; // 'bigint'
```

**Promise.allSettled():**

```javascript
const results = await Promise.allSettled([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments'),
]);
// Ждёт завершения всех промисов, игнорируя ошибки
```

**globalThis:**

```javascript
// Универсальный доступ к global объекту
globalThis.fetch; // Работает везде: браузер, Node.js, workers
```

**Dynamic import():**

```javascript
const module = await import('./module.js');
```

### ES2021

**Logical Assignment Operators:**

```javascript
x ||= y; // x || (x = y)
x &&= y; // x && (x = y)
x ??= y; // x ?? (x = y)
```

**Numeric Separators:**

```javascript
const billion = 1_000_000_000;
const hex = 0xff_ff_ff_ff;
```

**String.replaceAll():**

```javascript
'hello world'.replaceAll('l', 'L'); // 'heLLo worLd'
```

**Promise.any():**

```javascript
const first = await Promise.any([
    fetch('/api/cdn1/data'),
    fetch('/api/cdn2/data'),
    fetch('/api/cdn3/data'),
]);
// Resolves с первым успешным промисом
```

### ES2022

**Top-level await:**

```javascript
// В модулях, без async function wrapper
const data = await fetch('/api/config').then((r) => r.json());
export const config = data;
```

**Array.at():**

```javascript
const arr = [1, 2, 3];
arr.at(-1); // 3 (последний элемент)
arr.at(-2); // 2 (предпоследний)
```

**Object.hasOwn():**

```javascript
Object.hasOwn(obj, 'prop'); // Лучше чем obj.hasOwnProperty('prop')
```

**Class Fields:**

```javascript
class Counter {
    // Public fields
    count = 0;

    // Private fields
    #secret = 'private';

    // Static fields
    static instances = 0;

    constructor() {
        Counter.instances++;
    }
}
```

**Error.cause:**

```javascript
try {
    await fetch('/api');
} catch (err) {
    throw new Error('Failed to load data', { cause: err });
}
```

## Web APIs — Observers

### Intersection Observer v2

**Baseline:** ~2019-2020

**Новое:** отслеживание actual visibility (не только intersection)

```javascript
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Элемент в viewport
                console.log('Видим элемент');
            }
        });
    },
    {
        threshold: [0, 0.5, 1],
        rootMargin: '50px',
    },
);

observer.observe(element);
```

**Практическое применение:**

- Lazy loading изображений
- Infinite scroll
- Отслеживание видимости для аналитики
- Анимации при появлении

### Resize Observer

**Baseline:** Март 2020

```javascript
const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
        console.log('Размер изменился:', entry.contentRect);

        // Адаптивная логика
        if (entry.contentRect.width < 400) {
            entry.target.classList.add('compact');
        }
    }
});

observer.observe(element);
```

**Заменяет:** window.resize listeners с лучшей производительностью

## Performance APIs — Core Web Vitals

### Paint Timing API

**Baseline:** ~2019

```javascript
const paintEntries = performance.getEntriesByType('paint');

paintEntries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.startTime}ms`);
});

// first-paint: 123ms
// first-contentful-paint: 456ms
```

### Element Timing API

**Baseline:** 2020

```html
<img src="hero.jpg" elementtiming="hero-image" />
```

```javascript
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log('LCP candidate:', entry.renderTime);
    }
});

observer.observe({ type: 'element', buffered: true });
```

### Layout Instability API (CLS)

**Baseline:** 2020

```javascript
let cls = 0;

const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
            cls += entry.value;
        }
    }
});

observer.observe({ type: 'layout-shift', buffered: true });
```

## Async & Control Flow

### AbortController / AbortSignal

**Baseline:** 2020-2021

```javascript
const controller = new AbortController();
const signal = controller.signal;

// Fetch с отменой
fetch('/api/data', { signal })
    .then(handleData)
    .catch((err) => {
        if (err.name === 'AbortError') {
            console.log('Запрос отменён');
        }
    });

// Отмена через 5 секунд
setTimeout(() => controller.abort(), 5000);

// Также работает с addEventListener
element.addEventListener('click', handler, { signal });
controller.abort(); // Автоматически removeEventListener
```

## Storage & State

### IndexedDB v3

**Baseline:** 2018-2020

Улучшения:

- Binary keys support
- Getters для key paths
- Лучшая производительность

```javascript
const request = indexedDB.open('MyDatabase', 3);

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains('users')) {
        const store = db.createObjectStore('users', { keyPath: 'id' });
        store.createIndex('email', 'email', { unique: true });
    }
};

request.onsuccess = (event) => {
    const db = event.target.result;
    const tx = db.transaction('users', 'readwrite');
    const store = tx.objectStore('users');

    store.add({ id: 1, name: 'John', email: 'john@example.com' });
};
```

## Media APIs

### Picture-in-Picture API

**Baseline:** Safari 13.1 (март 2020), Chrome 70 (октябрь 2018)

```javascript
const video = document.querySelector('video');

// Включить PiP
video.requestPictureInPicture().then((pipWindow) => {
    console.log('PiP width:', pipWindow.width);
});

// Обработчики событий
video.addEventListener('enterpictureinpicture', () => {
    console.log('Вошли в PiP режим');
});

video.addEventListener('leavepictureinpicture', () => {
    console.log('Вышли из PiP режима');
});

// Выйти из PiP
document.exitPictureInPicture();
```

## Network APIs

### Fetch API improvements

**Keepalive requests (2018):**

```javascript
// Запрос не прервётся при закрытии страницы
fetch('/analytics', {
    method: 'POST',
    body: data,
    keepalive: true,
});
```

**Streams API baseline (2020-2021):**

```javascript
const response = await fetch('/large-file');
const reader = response.body.getReader();

while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    console.log('Получено байт:', value.length);
    processChunk(value);
}
```

## Security & Permissions

### Permissions API

**Baseline:** ~2019-2020

```javascript
const result = await navigator.permissions.query({ name: 'geolocation' });

if (result.state === 'granted') {
    // Разрешение уже дано
} else if (result.state === 'prompt') {
    // Будет показан prompt
} else {
    // Отказано
}

// Отслеживание изменений
result.addEventListener('change', () => {
    console.log('Статус изменился:', result.state);
});
```

### Feature Policy / Permissions Policy

**Baseline:** 2020-2021

```html
<!-- Старое название: Feature-Policy -->
<iframe src="https://example.com" allow="camera; microphone; geolocation"> </iframe>
```

```http
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
```

## Module Systems

### ES Modules в браузерах (baseline 2018)

```html
<script type="module">
    import { utility } from './utils.js';
    utility();
</script>

<script type="module" src="app.js"></script>
```

**Dynamic import:**

```javascript
button.addEventListener('click', async () => {
    const module = await import('./heavy-feature.js');
    module.init();
});
```

### Import Maps (конец периода)

**Baseline:** 2023 (НЕ baseline в 2018-2022)

**Safari:** 16.4 (март 2023), **Chrome:** 89 (март 2021)

```html
<script type="importmap">
    {
        "imports": {
            "lodash": "/node_modules/lodash-es/lodash.js",
            "react": "https://esm.sh/react@18"
        }
    }
</script>

<script type="module">
    import _ from 'lodash';
    import React from 'react';
</script>
```

№# Депрекации и удаления

### AppCache (см. HTML changes)

**Timeline:** Полное удаление 2020-2021

**Замена:** Service Workers

### Flash Player EOL

**Timeline:** Декабрь 2020 — январь 2021

### Синхронные XMLHttpRequest deprecated

**Status:** Deprecated на main thread, всё ещё работает

```javascript
// ⚠️ Deprecated
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api', false); // Синхронный режим
xhr.send();

// ✅ Используйте fetch или async XMLHttpRequest
```

## Выводы и практические рекомендации

### Что можно использовать сегодня (baseline к концу 2022):

**ECMAScript:**

- ES2018–ES2022 фичи во всех современных браузерах
- Optional chaining, nullish coalescing (ES2020) — must-use
- Top-level await (ES2022) — в модулях
- Private class fields (ES2022)

**Web APIs:**

- Intersection Observer, Resize Observer
- Performance APIs (Paint Timing, Element Timing, Layout Shift)
- AbortController / AbortSignal
- Picture-in-Picture API
- Permissions API

### Что требует полифиллов или feature detection:

- Import Maps — не baseline до 2023
- Cookie Store API — только Chromium
- File System Access API — только Chromium

### Best Practices 2018-2022:

**1. Используйте современный JavaScript:**

```javascript
// ✅ Modern
const value = obj?.deeply?.nested?.property ?? 'default';

// ❌ Old
const value = (obj && obj.deeply && obj.deeply.nested && obj.deeply.nested.property) || 'default';
```

**2. Отменяемые операции:**

```javascript
const controller = new AbortController();

fetch('/api', { signal: controller.signal });
element.addEventListener('click', handler, { signal: controller.signal });

// Одна отмена для всех
cleanup = () => controller.abort();
```

**3. Performance measurement:**

```javascript
// Core Web Vitals tracking
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        // Send to analytics
        analytics.track(entry.name, entry.value);
    }
});

observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
```

**Источники:**

- TC39 Proposals: https://github.com/tc39/proposals
- MDN Web Docs: https://developer.mozilla.org
- web.dev: https://web.dev
- Can I Use: https://caniuse.com

- **Research ID:** `frontend-baseline-2018-2022`
- **Дата создания:** 17.11.2025
- **Методология:** DeepResearch Agent
