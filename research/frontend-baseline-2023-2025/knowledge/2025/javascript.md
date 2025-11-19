---
title: JavaScript и Web APIs — изменения 2025 года
description:
    Комплексный обзор изменений в JavaScript за 2025 год - ECMAScript 2025, новые Web APIs, Baseline
    статусы и практические рекомендации по внедрению
outline: deep
lastUpdated: true
---

# JavaScript и Web APIs — изменения 2025 года

- **Период**: 1 января 2025 — 18 ноября 2025
- **Версии браузеров**: Chrome 130–136, Firefox 131–134, Safari 18.0–18.2

## Обзор года

2025 год стал периодом консолидации возможностей JavaScript, достигших production-готовности.
Ключевые темы года:

- **ECMAScript 2025**: `RegExp.escape()`, `Float16Array`, `Promise.try()`
- **Iterator Helpers**: достижение полной браузерной поддержки
- **Типизированные массивы**: встроенные методы Base64/Hex для `Uint8Array`
- **Temporal API**: первая браузерная реализация (Firefox 139)
- **Set Methods**: достижение статуса Baseline Widely Available
- **WebGPU**: production maturity и активное развитие
- **Производительность**: оптимизации V8 (JSON.stringify, mutable heap numbers)

## 1. ECMAScript 2025 — завершённые предложения

### 1.1 `RegExp.escape()`

**Статус TC39**: Stage 4 (февраль 2025) **Baseline**: Не достиг (ожидается в 2027)

Статический метод для экранирования специальных символов в регулярных выражениях, устраняющий
необходимость в сторонних решениях.

**Поддержка браузерами**:

- Chrome 136+ — 2025
- Firefox 134+ — ноябрь 2025
- Safari 18.2+ — декабрь 2024 / январь 2025

**Практическое применение**:

До появления `RegExp.escape()` разработчикам приходилось использовать собственные реализации для
безопасного экранирования пользовательского ввода в регулярных выражениях.

```javascript
// Старый подход с ручным экранированием
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const userInput = 'Hello. How are you?';
const pattern = escapeRegExp(userInput);
const regex = new RegExp(pattern);

// Новый подход с RegExp.escape()
const userInput = 'Hello. How are you?';
const pattern = RegExp.escape(userInput);
const regex = new RegExp(pattern);
console.log(regex.test('Hello. How are you?')); // true

// Использование в динамических паттернах
const searchTerm = RegExp.escape('[Important]');
const searchRegex = new RegExp(`\\b${searchTerm}\\b`, 'i');
console.log(searchRegex.test('This is [Important] text')); // true
```

**Применение**:

- Поиск по пользовательскому вводу
- Построение динамических регулярных выражений
- Защита от инъекций через regex patterns
- Безопасное использование строк в replace patterns

**Источники**:

- [TC39 Proposal: RegExp escaping](https://github.com/tc39/proposal-regex-escaping)
- [Can I Use: RegExp.escape()](https://caniuse.com/mdn-javascript_builtins_regexp_escape) — ~69%
  coverage

### 1.2 `Float16Array` и `Math.f16round()`

**Статус TC39**: Stage 4 (февраль 2025) **Baseline**: Не достиг

Поддержка 16-битных чисел с плавающей запятой (half-precision floating-point) в типизированных
массивах, критичная для WebGPU и машинного обучения.

**Поддержка браузерами**:

- Chrome 134+ — октябрь 2024 / январь 2025
- Firefox — в разработке (на конец 2025)
- Safari 18.2+ — декабрь 2024 / январь 2025

**Мотивация**:

- GPU-вычисления и WebGPU активно используют `float16` формат
- Машинное обучение требует компактного представления данных
- Экономия памяти для больших массивов чисел (50% по сравнению с `float32`)
- Совместимость с текстурами и shader computations

**API**:

```javascript
// Создание Float16Array
const f16Array = new Float16Array([1.5, 2.7, 3.14]);
console.log(f16Array); // Float16Array(3) [1.5, 2.7, 3.140625]

// Округление до float16
const rounded = Math.f16round(3.141592653589793);
console.log(rounded); // ~3.140625 (точность float16)

// Создание из существующего буфера
const buffer = new ArrayBuffer(8);
const f16View = new Float16Array(buffer);
f16View[0] = 1.5;
f16View[1] = 2.7;

// Использование с DataView
const dataView = new DataView(buffer);
dataView.setFloat16(0, 3.14);
console.log(dataView.getFloat16(0)); // ~3.140625

// Конвертация между типами
const f32Array = new Float32Array([1.1, 2.2, 3.3]);
const f16Array = new Float16Array(f32Array);
```

**Интеграция с WebGPU**:

```javascript
// Создание float16 texture data для WebGPU
const f16Data = new Float16Array([1.0, 0.5, 0.25, 0.125]);

// Использование в WebGPU texture
const texture = device.createTexture({
    size: [2, 2],
    format: 'rgba16float',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
});

device.queue.writeTexture({ texture }, f16Data, { bytesPerRow: 16 }, { width: 2, height: 2 });
```

**Применение**:

- WebGPU texture data и shader computations
- Машинное обучение (inference на клиенте)
- Аудио DSP с меньшим потреблением памяти
- Графические приложения с высокой плотностью данных

**Источники**:

- [TC39 Proposal: Float16Array](https://github.com/tc39/proposal-float16array)
- [WebKit Blog: Safari 18.2 features](https://webkit.org/blog/16092/webkit-features-in-safari-18-2/)

### 1.3 `Promise.try()`

**Статус TC39**: Stage 4 (октябрь 2024) **Baseline**: Ожидается в 2027 году

Метод для унифицированной обработки синхронных и асинхронных операций, оборачивающий любое значение
или результат функции в промис.

**Поддержка браузерами**:

- Chrome 128+ — август 2024 (широко используется в 2025)
- Firefox 134+ — ноябрь 2025
- Safari 18.2+ — декабрь 2024 / январь 2025

**Проблема до `Promise.try()`**:

```javascript
// До Promise.try(): сложно обрабатывать синхронные и асинхронные ошибки
async function process(fn) {
    try {
        const result = await fn();
        return result;
    } catch (err) {
        handleError(err);
    }
}

// Если fn() синхронная и выбрасывает исключение — не поймаем до await
process(() => {
    throw new Error('Sync error');
}); // Unhandled rejection
```

**Решение с `Promise.try()`**:

```javascript
// Унифицированная обработка синхронных и асинхронных операций
Promise.try(() => {
    // Может быть синхронной или асинхронной
    return someFunction();
})
    .then((result) => console.log(result))
    .catch((error) => handleError(error));

// Пример с синхронной функцией
Promise.try(() => {
    if (Math.random() < 0.5) {
        throw new Error('Random error');
    }
    return 'Success';
}).catch((err) => console.error(err));

// Замена громоздкой конструкции
// Старый подход
new Promise((resolve, reject) => {
    try {
        resolve(syncOrAsyncFn());
    } catch (e) {
        reject(e);
    }
});

// Новый подход
Promise.try(() => syncOrAsyncFn());
```

**Практическое применение**:

```javascript
// Валидация и обработка данных
async function processUserData(data) {
    return Promise.try(() => validateData(data)) // Может выбросить синхронно
        .then((validData) => saveToDatabase(validData)) // Асинхронная операция
        .then((result) => sendConfirmationEmail(result.email))
        .catch((error) => logError(error));
}

// Унификация callback-функций
function executeHandler(handler, data) {
    return Promise.try(() => handler(data)).then((result) => {
        console.log('Handler executed successfully');
        return result;
    });
}
```

**Применение**:

- Унификация синхронного и асинхронного кода
- Обработка ошибок в callback-функциях
- Middleware-цепочки в фреймворках
- Безопасное выполнение пользовательских функций

**Источники**:

- [TC39 Proposal: Promise.try](https://github.com/tc39/proposal-promise-try)
- [Can I Use: Promise.try()](https://caniuse.com/mdn-javascript_builtins_promise_try) — 75.54%
  coverage

## 2. Iterator Helpers — Production Ready

**Статус TC39**: Stage 4 (архив репозитория — октябрь 2024) **Baseline**: Ожидается «Newly
Available» в 2025, «Widely Available» — в 2027

Набор методов для работы с итераторами, обеспечивающих ленивую обработку (lazy evaluation) без
создания промежуточных массивов.

**Поддержка браузерами**:

- Chrome 122+ — февраль 2024 (широко используется в 2025)
- Firefox 131+ — сентябрь 2025
- Safari 18.0+ — сентябрь 2024

### 2.1 Методы Iterator.prototype

**Полный список методов**:

- `.map(mapperFn)` — трансформация значений
- `.filter(filtererFn)` — фильтрация по предикату
- `.take(limit)` — взять первые N элементов
- `.drop(limit)` — пропустить первые N элементы
- `.flatMap(mapperFn)` — трансформация и разворачивание вложенных итераторов
- `.reduce(reducer, initialValue)` — аккумуляция значения
- `.toArray()` — преобразование в массив
- `.forEach(fn)` — выполнение побочных эффектов
- `.some(fn)` — проверка наличия элемента
- `.every(fn)` — проверка всех элементов
- `.find(fn)` — поиск первого элемента

**Примеры использования**:

```javascript
// Ленивая обработка бесконечной последовательности
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Взять первые 10 чётных чисел Фибоначчи
const evenFibs = fibonacci()
    .filter((n) => n % 2 === 0)
    .take(10)
    .toArray();

console.log(evenFibs);
// [0, 2, 8, 34, 144, 610, 2584, 10946, 46368, 196418]

// Обработка больших файлов построчно (без загрузки всего в память)
async function* readLines(file) {
    const decoder = new TextDecoder();
    const reader = file.stream().getReader();
    let buffer = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
            yield line;
        }
    }
    if (buffer) yield buffer;
}

// Обработка только первых 100 непустых строк
const lines = readLines(file)
    .filter((line) => line.trim().length > 0)
    .take(100)
    .map((line) => line.toUpperCase());

for await (const line of lines) {
    console.log(line);
}

// Преобразование без промежуточных массивов
function* range(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

const result = range(1, 1000000)
    .filter((n) => n % 2 === 0)
    .map((n) => n * n)
    .take(5)
    .toArray();

console.log(result); // [4, 16, 36, 64, 100]
```

**Производительность**:

```javascript
// Сравнение с Array методами
const arr = Array.from({ length: 1000000 }, (_, i) => i);

// Array методы (создают промежуточные массивы)
console.time('Array');
const arrResult = arr
    .filter((n) => n % 2 === 0)
    .map((n) => n * n)
    .slice(0, 5);
console.timeEnd('Array'); // ~150ms

// Iterator Helpers (ленивые, без промежуточных массивов)
console.time('Iterator');
const iterResult = arr
    .values()
    .filter((n) => n % 2 === 0)
    .map((n) => n * n)
    .take(5)
    .toArray();
console.timeEnd('Iterator'); // ~0.1ms
```

**Применение**:

- Обработка больших датасетов без создания промежуточных массивов
- Ленивая обработка бесконечных последовательностей (генераторов)
- Функциональное программирование с итераторами
- Производительность: избегание лишних аллокаций памяти
- Stream-обработка данных (файлы, сеть)

### 2.2 `Iterator.from()` (Safari 18.2)

Safari 18.2 добавил `Iterator.from()` для создания итераторов из итерируемых объектов.

```javascript
// Создание итератора из массива
const iter = Iterator.from([1, 2, 3]);
console.log(iter.next()); // { value: 1, done: false }

// Создание из строки
const strIter = Iterator.from('hello');
console.log([...strIter]); // ['h', 'e', 'l', 'l', 'o']

// Iterator.prototype.constructor
console.log(Iterator.prototype.constructor); // [Function: Iterator]

// Iterator.prototype[@@toStringTag]
console.log(Object.prototype.toString.call(iter)); // [object Iterator]
```

**Источники**:

- [TC39 Proposal: Iterator Helpers](https://github.com/tc39/proposal-iterator-helpers)
- [Firefox 131 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131)
- [Safari 18.2: Iterator enhancements](https://webkit.org/blog/16092/webkit-features-in-safari-18-2/)

## 3. `Uint8Array` — методы для Base64 и Hex

**Статус**: Production Ready (2025) **Baseline**: Ожидается «Newly Available» в начале 2025, «Widely
Available» — в 2027

Встроенные методы для конвертации между base64/hex-кодированными строками и байтовыми массивами,
устраняющие необходимость в сторонних библиотеках.

**Поддержка браузерами**:

- Chrome 133+ — ноябрь 2025
- Firefox 133+ — октябрь 2025
- Safari 18.2+ — декабрь 2024 / январь 2025

### 3.1 API

**Статические методы**:

- `Uint8Array.fromBase64(string, options?)` — создание массива из base64-строки
- `Uint8Array.fromHex(string)` — создание массива из hex-строки

**Методы экземпляра**:

- `Uint8Array.prototype.toBase64(options?)` — конвертация в base64-строку
- `Uint8Array.prototype.toHex()` — конвертация в hex-строку
- `Uint8Array.prototype.setFromBase64(string, options?)` — заполнение массива из base64
- `Uint8Array.prototype.setFromHex(string)` — заполнение массива из hex

**Примеры использования**:

```javascript
// Base64 encoding/decoding
const bytes1 = Uint8Array.fromBase64('SGVsbG8gV29ybGQh');
console.log(new TextDecoder().decode(bytes1)); // "Hello World!"

const bytes2 = new TextEncoder().encode('Hello');
console.log(bytes2.toBase64()); // "SGVsbG8="

// Hex encoding/decoding
const bytes3 = Uint8Array.fromHex('48656c6c6f');
console.log(new TextDecoder().decode(bytes3)); // "Hello"

const bytes4 = new Uint8Array([72, 101, 108, 108, 111]);
console.log(bytes4.toHex()); // "48656c6c6f"

// setFromBase64 — заполнение существующего массива
const buffer = new Uint8Array(20);
const { read, written } = buffer.setFromBase64('SGVsbG8gV29ybGQh');
console.log(read); // 16 (bytes read from base64 string)
console.log(written); // 12 (bytes written to buffer)
console.log(new TextDecoder().decode(buffer.slice(0, written))); // "Hello World!"

// Опции для Base64
const data = new Uint8Array([255, 254, 253]);
console.log(data.toBase64({ alphabet: 'base64url' })); // URL-safe base64
console.log(data.toBase64({ omitPadding: true })); // Без символов =
```

**Работа с Web Crypto API**:

```javascript
// Хеширование и кодирование
async function hashAndEncode(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = new Uint8Array(hashBuffer);
    return hashArray.toBase64();
}

const hash = await hashAndEncode('Hello World');
console.log(hash); // "pZGm1Av0IEBKARczz7exkNYsZb8LzaMrV7J32a2fFG4="
```

**Применение**:

- Работа с binary data в веб-приложениях
- Криптография и работа с Web Crypto API
- Обработка файлов и изображений
- API интеграции (base64-encoded data)
- Замена сторонних библиотек и ограниченных `atob`/`btoa`

**Источники**:

- [Firefox 133 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/133)
- [WebKit Blog: Safari 18.2 features](https://webkit.org/blog/16092/webkit-features-in-safari-18-2/)
- [MDN: Uint8Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

## 4. Set Methods — Widely Available

**Статус**: Baseline Widely Available (декабрь 2024)

Методы для операций с множествами достигли статуса Baseline Widely Available в декабре 2024 года и
активно используются в 2025.

**Поддержка браузерами**:

- Chrome 122+ — февраль 2024
- Firefox 127+ — июнь 2024
- Safari 17.0+ — сентябрь 2023

### 4.1 Методы

**Операции создания новых множеств**:

- `set.union(other)` — объединение множеств (A ∪ B)
- `set.intersection(other)` — пересечение множеств (A ∩ B)
- `set.difference(other)` — разность множеств (A \ B)
- `set.symmetricDifference(other)` — симметрическая разность (A △ B)

**Методы проверки**:

- `set.isSubsetOf(other)` — проверка, является ли `set` подмножеством `other`
- `set.isSupersetOf(other)` — проверка, является ли `set` надмножеством `other`
- `set.isDisjointFrom(other)` — проверка, не пересекаются ли множества

**Примеры использования**:

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Объединение
const union = setA.union(setB);
console.log(union); // Set(6) { 1, 2, 3, 4, 5, 6 }

// Пересечение
const intersection = setA.intersection(setB);
console.log(intersection); // Set(2) { 3, 4 }

// Разность
const difference = setA.difference(setB);
console.log(difference); // Set(2) { 1, 2 }

// Симметрическая разность (элементы, которые есть только в одном из множеств)
const symDiff = setA.symmetricDifference(setB);
console.log(symDiff); // Set(4) { 1, 2, 5, 6 }

// Проверки
console.log(new Set([1, 2]).isSubsetOf(setA)); // true
console.log(setA.isSupersetOf(new Set([2, 3]))); // true
console.log(setA.isDisjointFrom(new Set([7, 8]))); // true
console.log(setA.isDisjointFrom(setB)); // false (есть общие элементы)
```

**Практическое применение**:

```javascript
// Фильтрация массивов по категориям
const activeUsers = new Set(['user1', 'user2', 'user3']);
const premiumUsers = new Set(['user2', 'user4', 'user5']);

// Активные премиум пользователи
const activePremium = activeUsers.intersection(premiumUsers);
console.log([...activePremium]); // ['user2']

// Бесплатные активные пользователи
const activeFreemium = activeUsers.difference(premiumUsers);
console.log([...activeFreemium]); // ['user1', 'user3']

// Все уникальные пользователи
const allUsers = activeUsers.union(premiumUsers);
console.log([...allUsers]); // ['user1', 'user2', 'user3', 'user4', 'user5']

// Работа с тегами
const postTags = new Set(['javascript', 'webdev', 'tutorial']);
const searchTags = new Set(['javascript', 'react']);

if (!postTags.isDisjointFrom(searchTags)) {
    console.log('Post matches search criteria');
}
```

**Применение**:

- Фильтрация и обработка коллекций
- Алгоритмы на графах
- Работа с категориями и тегами
- Математические операции над множествами
- Управление правами доступа (permission checks)

**Источники**:

- [MDN: Set methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Baseline: Widely Available (декабрь 2024)](https://web.dev/baseline)

## 5. Temporal API — Progress Report

**Статус TC39**: Stage 3 (в руках имплементаторов браузеров)

Temporal API — современная замена встроенного объекта `Date`, предоставляющая надёжные и точные
операции с датой и временем.

### 5.1 Текущая имплементация (2025)

**Firefox**: Shipping в Firefox 139 (запланирован на 2025) — первый браузер с полной поддержкой
**Chrome/V8**: В разработке — [crbug.com/42201538](https://crbug.com/42201538)
**Safari/JavaScriptCore**: В разработке — [bugs.webkit.org](https://bugs.webkit.org)

**Статус**: Temporal API пока не доступен ни в одном стабильном браузере (по состоянию на ноябрь
2025), но Firefox 139 станет первым браузером с полной поддержкой.

### 5.2 API Overview

**Основные типы**:

- `Temporal.Instant` — точный момент времени (timestamp)
- `Temporal.PlainDate` — дата без времени и часового пояса
- `Temporal.PlainTime` — время без даты и часового пояса
- `Temporal.PlainDateTime` — дата и время без часового пояса
- `Temporal.ZonedDateTime` — дата и время с часовым поясом
- `Temporal.Duration` — временной интервал
- `Temporal.Calendar` — календарная система
- `Temporal.TimeZone` — часовой пояс

**Примеры (когда станет доступно)**:

```javascript
// Создание точной даты
const date = Temporal.PlainDate.from('2025-11-19');
console.log(date.toString()); // "2025-11-19"

// Операции с датами (иммутабельные)
const nextWeek = date.add({ days: 7 });
console.log(nextWeek.toString()); // "2025-11-26"

const lastMonth = date.subtract({ months: 1 });
console.log(lastMonth.toString()); // "2025-10-19"

// Работа с часовыми поясами
const now = Temporal.Now.zonedDateTimeISO('America/New_York');
console.log(now.toString());

// Конвертация между часовыми поясами
const tokyo = now.withTimeZone('Asia/Tokyo');
console.log(tokyo.toString());

// Duration
const duration = Temporal.Duration.from({ hours: 2, minutes: 30 });
console.log(duration.toString()); // "PT2H30M"

// Добавление duration к дате
const future = date.add(duration);

// Сравнение дат
const date1 = Temporal.PlainDate.from('2025-01-01');
const date2 = Temporal.PlainDate.from('2025-12-31');
console.log(Temporal.PlainDate.compare(date1, date2)); // -1

// Разница между датами
const diff = date2.since(date1);
console.log(diff.days); // 364

// Календарные системы
const hebrewDate = Temporal.PlainDate.from({ year: 5786, month: 1, day: 1, calendar: 'hebrew' });
console.log(hebrewDate.toString()); // "5786-01-01[u-ca=hebrew]"
```

### 5.3 Преимущества над Date

1. **Иммутабельность**: Все операции возвращают новые объекты
2. **Точность**: Наносекундная точность
3. **Часовые пояса**: Полная поддержка IANA time zones
4. **Календари**: Поддержка различных календарных систем
5. **API**: Интуитивный и предсказуемый API
6. **Нет legacy проблем**: Месяцы начинаются с 1, а не с 0

**Сравнение с Date**:

```javascript
// Date (legacy проблемы)
const oldDate = new Date('2025-01-15');
console.log(oldDate.getMonth()); // 0 (январь — это 0!)
oldDate.setMonth(5); // Мутирует существующий объект
console.log(oldDate.toISOString()); // Всегда UTC

// Temporal (современный подход)
const newDate = Temporal.PlainDate.from('2025-01-15');
console.log(newDate.month); // 1 (январь — это 1)
const june = newDate.with({ month: 6 }); // Иммутабельно
console.log(newDate.toString()); // Исходный объект не изменился
```

**Статус внедрения**: Ожидается широкая поддержка в 2025–2026 годах.

**Источники**:

- [TC39 Proposal: Temporal](https://github.com/tc39/proposal-temporal)
- [Temporal Documentation](https://tc39.es/proposal-temporal/docs/)
- [Firefox Implementation Status: Firefox 139](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/139)

## 6. WebGPU API — Production Ready

**Статус**: Production Ready (2025) **Baseline**: Not Baseline (Limited availability)

WebGPU — современный GPU API, предоставляющий прямой доступ к графическому процессору для вычислений
и рендеринга. В 2025 году API достиг production maturity.

### 6.1 Статус поддержки (2025)

**Chrome**: 113+ (стабильная поддержка с мая 2023, активные улучшения в 2025) **Safari**: Limited
support (в разработке) **Firefox**: В разработке

### 6.2 Chrome Updates (2025)

**Chrome 130**:

- **Dual Source Blending**: Комбинирование двух выходов фрагментного шейдера в один framebuffer

**Chrome 131**:

- **Clip Distances**: Поддержка clip distances для vertex shader outputs
- **`GPUCanvasContext.getConfiguration()`**: Метод для инспекции конфигурации canvas, включая HDR
  детекцию

**Chrome 132**:

- **32-bit Float Texture Blending** (`float32-blendable`): Поддержка блендинга для 32-битных float
  текстур
- **`GPUAdapterInfo` из `GPUDevice`**: Доступ к информации об адаптере напрямую из device

### 6.3 API Overview

**Основные интерфейсы**:

```javascript
// Инициализация WebGPU
if (!navigator.gpu) {
    throw new Error('WebGPU not supported');
}

const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
    throw new Error('No appropriate GPUAdapter found');
}

const device = await adapter.requestDevice();

// Создание compute pipeline
const shaderModule = device.createShaderModule({
    code: `
    @group(0) @binding(0) var<storage, read_write> data: array<f32>;

    @compute @workgroup_size(64)
    fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
      let index = global_id.x;
      data[index] = data[index] * 2.0;
    }
  `,
});

const pipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
        module: shaderModule,
        entryPoint: 'main',
    },
});

// Создание буфера
const buffer = device.createBuffer({
    size: 256,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
});

// Заполнение буфера данными
const data = new Float32Array(64);
for (let i = 0; i < data.length; i++) {
    data[i] = i;
}
device.queue.writeBuffer(buffer, 0, data);

// Создание bind group
const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
        {
            binding: 0,
            resource: { buffer },
        },
    ],
});

// Выполнение compute pass
const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginComputePass();
passEncoder.setPipeline(pipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatchWorkgroups(4);
passEncoder.end();
device.queue.submit([commandEncoder.finish()]);

// Чтение результатов
const resultBuffer = device.createBuffer({
    size: 256,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
});

const copyEncoder = device.createCommandEncoder();
copyEncoder.copyBufferToBuffer(buffer, 0, resultBuffer, 0, 256);
device.queue.submit([copyEncoder.finish()]);

await resultBuffer.mapAsync(GPUMapMode.READ);
const resultData = new Float32Array(resultBuffer.getMappedRange());
console.log(resultData); // [0, 2, 4, 6, 8, ...]
resultBuffer.unmap();
```

**Применение WebGPU**:

- Машинное обучение на GPU (inference, training)
- Физические симуляции (particle systems, fluid dynamics)
- Графический рендеринг (3D, ray tracing)
- Обработка изображений и видео
- Криптографические вычисления

**Источники**:

- [Chrome 130 Beta: WebGPU Dual Source Blending](https://developer.chrome.com/blog/chrome-130-beta)
- [Chrome 131 Beta: WebGPU Clip Distances](https://developer.chrome.com/blog/chrome-131-beta)
- [Chrome 132 Beta: float32-blendable](https://developer.chrome.com/blog/chrome-132-beta)
- [MDN: WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)

## 7. Navigation API — Progress

**Статус**: Experimental (ноябрь 2025) **Baseline**: Not Baseline

Navigation API — современная замена History API, предоставляющая более удобный и предсказуемый
способ управления навигацией в SPA.

### 7.1 Поддержка браузерами

**Chrome**: 102+ (май 2022, стабильная поддержка в 2025) **Safari**: Частичная поддержка (в
разработке) **Firefox**: В разработке

### 7.2 Safari 18.2 — NavigationActivation.finished

Safari 18.2 добавил поддержку `NavigationActivation.finished` для обработки завершения навигации.

**API**:

```javascript
// Базовое использование Navigation API
navigation.addEventListener('navigate', (event) => {
    // Можно изменить URL без полной перезагрузки страницы
    if (shouldHandleInternally(event.destination.url)) {
        event.intercept({
            async handler() {
                // Загрузка контента
                await loadPageContent(event.destination.url);

                // Ожидание завершения навигации (Safari 18.2+)
                await event.finished;
                console.log('Navigation finished');
            },
        });
    }
});

// Программная навигация
navigation.navigate('/products/123');

// Навигация с state
navigation.navigate('/products/123', {
    state: { productId: 123, category: 'electronics' },
});

// Получение текущей записи
console.log(navigation.currentEntry);

// События навигации
navigation.addEventListener('navigatesuccess', () => {
    console.log('Navigation completed successfully');
});

navigation.addEventListener('navigateerror', (error) => {
    console.error('Navigation failed:', error);
});
```

**Источники**:

- [WebKit Blog: Safari 18.2 features](https://webkit.org/blog/16092/webkit-features-in-safari-18-2/)
- [MDN: Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)

## 8. View Transitions API — Maturity

**Статус**: Production-ready для same-document transitions, expanding для cross-document
**Baseline**: Not Baseline (Limited availability)

View Transitions API позволяет создавать плавные анимированные переходы между состояниями DOM.

### 8.1 Поддержка браузерами

**Chrome**: 111+ (same-document), 126+ (cross-document с флагом) **Safari**: В разработке
**Firefox**: В разработке

### 8.2 API Overview

**Same-document transitions**:

```javascript
// Простой переход между состояниями
function updateView() {
    document.startViewTransition(() => {
        // Обновление DOM
        document.querySelector('#content').innerHTML = newContent;
    });
}

// С обработкой промиса
async function animatedUpdate() {
    const transition = document.startViewTransition(() => {
        updateDOM();
    });

    await transition.ready; // Переход готов к анимации
    console.log('Transition started');

    await transition.finished; // Переход завершён
    console.log('Transition completed');
}
```

**CSS для view transitions**:

```css
/* Анимация старого состояния */
::view-transition-old(root) {
    animation: fade-out 0.3s ease-out;
}

/* Анимация нового состояния */
::view-transition-new(root) {
    animation: fade-in 0.3s ease-in;
}

@keyframes fade-out {
    to {
        opacity: 0;
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
}

/* Кастомные переходы для конкретных элементов */
.card {
    view-transition-name: card-transition;
}

::view-transition-old(card-transition) {
    animation: slide-out-left 0.4s ease;
}

::view-transition-new(card-transition) {
    animation: slide-in-right 0.4s ease;
}
```

**Применение**:

- SPA navigation transitions
- Плавные переходы между состояниями UI
- Image gallery transitions
- Page-to-page animations

**Источники**:

- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [Chrome for Developers: View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/)

## 9. V8 Engine — JavaScript Performance

### 9.1 V8 Blog Posts (2025)

**«How we made JSON.stringify more than twice as fast»** (август 2025):

- Оптимизация сериализации JSON
- Производительность увеличена в 2+ раза
- Улучшения в обработке больших объектов

**«Speculative Optimizations for WebAssembly»** (июнь 2025):

- WebAssembly compilation techniques
- Спекулятивная оптимизация и инлайнинг
- Deopts для WebAssembly

**«Giving V8 a Heads-Up: Faster JavaScript Startup»** (апрель 2025):

- Ускорение запуска JavaScript приложений через compile hints
- Предварительная компиляция критических функций

**«Land ahoy: leaving the Sea of Nodes»** (март 2025):

- Внутренние улучшения компилятора
- Новая архитектура intermediate representation

**«Turbocharging V8 with mutable heap numbers»** (февраль 2025):

- Оптимизация числовых типов
- Уменьшение аллокаций для числовых операций

**Источники**:

- [V8 Blog](https://v8.dev/blog)

## 10. Chrome 133-134 — JavaScript Updates

### 10.1 Chrome 133 (ноябрь 2025)

**`Animation.overallProgress`**:

```javascript
const animation = element.animate(/* ... */);
console.log(animation.overallProgress); // 0 to 1
```

Удобное представление прогресса анимации независимо от количества итераций.

**`Node.prototype.moveBefore()`**:

```javascript
// Перемещение элемента без сброса состояния
parentNode.moveBefore(nodeToMove, referenceNode);
```

Позволяет перемещать элементы в DOM без сброса состояния (focus, scroll position, form data).

**`PublicKeyCredential.getClientCapabilities()`**:

```javascript
const capabilities = await PublicKeyCredential.getClientCapabilities();
console.log(capabilities);
// { conditionalCreate: true, conditionalGet: true, ... }
```

Определение поддерживаемых возможностей WebAuthn на клиенте.

**FileSystemObserver Interface**:

```javascript
const observer = new FileSystemObserver((records) => {
    for (const record of records) {
        console.log(`Changed: ${record.root.name}`);
    }
});

await observer.observe(directoryHandle);
```

Уведомления об изменениях в файловой системе.

### 10.2 Chrome 134 (декабрь 2025)

**`<dialog>` — `closedby` attribute**:

```html
<!-- Закрытие по ESC и клику снаружи -->
<dialog closedby="any">
    <p>Dialog content</p>
</dialog>

<!-- Только ESC -->
<dialog closedby="closerequest">
    <p>Dialog content</p>
</dialog>

<!-- Нельзя закрыть -->
<dialog closedby="none">
    <p>Dialog content</p>
</dialog>
```

**`imageSmoothingQuality` Canvas Attribute**:

```javascript
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high'; // 'low', 'medium', 'high'
ctx.drawImage(image, 0, 0, 100, 100);
```

**Источники**:

- [Chrome 133 Release Notes](https://developer.chrome.com/blog/new-in-chrome-133)
- [Chrome 134 Release Notes](https://developer.chrome.com/blog/new-in-chrome-134)

## 11. Firefox 131-134 — JavaScript Updates

### 11.1 Firefox 131 (сентябрь 2025)

**Iterator Helper Methods** (полная поддержка) **PointerEvent** — `altitudeAngle` и `azimuthAngle`:

```javascript
element.addEventListener('pointermove', (event) => {
    console.log(event.altitudeAngle); // Угол между стилусом и экраном
    console.log(event.azimuthAngle); // Вращение стилуса над экраном
});
```

**Text Fragments**:

```javascript
if (document.fragmentDirective) {
    console.log('Text Fragments supported');
}
```

### 11.2 Firefox 132 (октябрь 2025)

**Regular Expression Modifiers**:

```javascript
// Локальное изменение флагов
const regex = /(?i:hello) world/; // "hello" case-insensitive, "world" case-sensitive
console.log(regex.test('HELLO world')); // true
console.log(regex.test('HELLO WORLD')); // false

// Отключение флага
const regex2 = /(?-i:CASE)/i; // Внутри группы case-sensitive
```

**`requestVideoFrameCallback()`**:

```javascript
video.requestVideoFrameCallback((now, metadata) => {
    console.log('Frame at', metadata.presentationTime);
    // Обработка кадра
    video.requestVideoFrameCallback(callback);
});
```

### 11.3 Firefox 133 (октябрь 2025)

**Uint8Array Base64/Hex Methods** (полная поддержка) **Permissions API в Workers**:

```javascript
// Inside worker
const status = await navigator.permissions.query({ name: 'geolocation' });
console.log(status.state);
```

### 11.4 Firefox 134 (ноябрь 2025)

**`RegExp.escape()`** (Stage 4) **`Promise.try()`** (Stage 4)

**Источники**:

- [Firefox 131 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131)
- [Firefox 132 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132)
- [Firefox 133 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/133)
- [Firefox 134 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/134)

## 12. Safari 18.0-18.2 — JavaScript Updates

### 12.1 Safari 18.2 (декабрь 2024 / январь 2025)

**JavaScript Enhancements**:

- `Float16Array` (TC39 Stage 4)
- Uint8Array Base64/Hex Methods
- `Promise.try()` (TC39 Stage 4)
- `RegExp.escape()` (TC39 Stage 4)
- Iterator Enhancements: `Iterator.prototype.constructor`, `Iterator.from()`

**`Intl.Locale.prototype.firstDayOfWeek`**:

```javascript
const locale = new Intl.Locale('en-US');
console.log(locale.firstDayOfWeek); // 7 (Sunday)

const localeFR = new Intl.Locale('fr-FR');
console.log(localeFR.firstDayOfWeek); // 1 (Monday)
```

**WebAssembly — Type Reflection**:

```javascript
const module = await WebAssembly.compile(wasmBytes);
const imports = WebAssembly.Module.imports(module);
const exports = WebAssembly.Module.exports(module);
```

**PointerEvent Improvements**:

- `click`, `contextmenu` теперь используют `PointerEvent` с `pointerType`
- `getPredictedEvents()` и `getCoalescedEvents()` methods
- `altitudeAngle` и `azimuthAngle` для stylus positioning

**Источники**:

- [WebKit Blog: Safari 18.2 features](https://webkit.org/blog/16092/webkit-features-in-safari-18-2/)

## 13. Baseline Status — 2025

**Newly Available (2025)**:

1. Popover API — январь 2025
2. Uint8Array Base64/Hex методы — начало 2025

**Widely Available (2024, активно используется в 2025)**:

1. Set Methods — декабрь 2024
2. Declarative Shadow DOM — август 2024
3. `Promise.withResolvers` — март 2024

**Ожидается Baseline в 2025-2027**:

1. Iterator Helpers — 2025–2027
2. `RegExp.escape()` — 2027+
3. `Promise.try()` — 2027+
4. `Float16Array` — 2027+

## 14. Сводная таблица поддержки браузерами

| Возможность               | Chrome  | Firefox   | Safari  | Baseline статус               |
| ------------------------- | ------- | --------- | ------- | ----------------------------- |
| **`RegExp.escape()`**     | 136+    | 134+      | 18.2+   | ❌ Не достигнут (ожид. 2027)  |
| **`Float16Array`**        | 134+    | ❌        | 18.2+   | ❌ Не достигнут               |
| **`Promise.try()`**       | 128+    | 134+      | 18.2+   | ❌ Не достигнут (ожид. 2027)  |
| **Iterator Helpers**      | 122+    | 131+      | 18.0+   | ⏳ Newly Available (2025)     |
| **Uint8Array Base64/Hex** | 133+    | 133+      | 18.2+   | ⏳ Newly Available (нач 2025) |
| **Set Methods**           | 122+    | 127+      | 17.0+   | ✅ Widely Available (дек 24)  |
| **Popover API**           | 114+    | 125+ (24) | 17.0+   | ✅ Newly Available (янв 25)   |
| **Temporal API**          | В разр. | 139+ (25) | В разр  | ❌ Не достигнут               |
| **WebGPU**                | 113+    | В разр.   | Limited | ❌ Limited availability       |
| **Navigation API**        | 102+    | В разр.   | Partial | ❌ Не достигнут               |
| **View Transitions API**  | 111+    | В разр.   | В разр  | ❌ Не достигнут               |

## 15. Ключевые выводы

### 15.1 Основные тренды 2025 года

1. **ECMAScript maturity**: Завершение Stage 4 для критичных возможностей (`RegExp.escape()`,
   `Float16Array`, `Promise.try()`)
2. **Ленивая обработка данных**: Iterator Helpers достигли полной браузерной поддержки
3. **Работа с binary data**: Встроенные методы Base64/Hex для `Uint8Array`
4. **Базовые структуры данных**: Set Methods достигли Baseline Widely Available
5. **WebGPU production ready**: Активное развитие и использование в production
6. **Производительность**: Значительные оптимизации V8 (JSON.stringify, startup, числовые типы)
7. **Temporal API coming**: Первая браузерная реализация в Firefox 139

### 15.2 Технологии, готовые к production

**Безопасно использовать**:

- ✅ Set Methods (Baseline Widely Available с декабря 2024)
- ✅ Popover API (Baseline Newly Available с января 2025)
- ✅ WebGPU (Chrome 113+, для Chrome-first приложений)

**С осторожностью (требуется полифилл или feature detection)**:

- ⚠️ Iterator Helpers (Chrome 122+, Firefox 131+, Safari 18.0+) — ~85% coverage
- ⚠️ `Promise.try()` (Chrome 128+, Firefox 134+, Safari 18.2+) — ~75% coverage
- ⚠️ `RegExp.escape()` (Chrome 136+, Firefox 134+, Safari 18.2+) — ~69% coverage
- ⚠️ Uint8Array Base64/Hex (Chrome 133+, Firefox 133+, Safari 18.2+) — с полифиллом
- ⚠️ `Float16Array` (Chrome 134+, Safari 18.2+) — для WebGPU приложений

**Следить за развитием**:

- 🔮 Temporal API — Firefox 139, Chrome/Safari в разработке
- 🔮 View Transitions API — Chrome only, cross-document transitions экспериментальны
- 🔮 Navigation API — Chrome 102+, Safari/Firefox в разработке

### 15.3 Рекомендации по adoption

1. **Немедленно внедрять**:
    - Set Methods для операций с множествами
    - Popover API для UI компонентов
    - Uint8Array Base64/Hex с полифиллом для старых браузеров

2. **Использовать с feature detection**:
    - Iterator Helpers для обработки больших датасетов
    - `Promise.try()` для унификации синхронного и асинхронного кода
    - `RegExp.escape()` для безопасной работы с пользовательским вводом

3. **Оценить для специфических use cases**:
    - WebGPU для GPU-вычислений (Chrome-first приложения)
    - `Float16Array` для WebGPU и ML приложений
    - Navigation API для SPA (Chrome only)

4. **Следить за развитием**:
    - Temporal API (Firefox 139 — первая имплементация)
    - View Transitions API для плавных переходов
    - Experimental APIs (Cookie Store, JSON.parse with Source)

## 16. Источники

### TC39 и ECMAScript

- [TC39 Finished Proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md)
- [TC39: RegExp escaping](https://github.com/tc39/proposal-regex-escaping)
- [TC39: Float16Array](https://github.com/tc39/proposal-float16array)
- [TC39: Promise.try](https://github.com/tc39/proposal-promise-try)
- [TC39: Iterator Helpers](https://github.com/tc39/proposal-iterator-helpers)
- [TC39: Temporal](https://github.com/tc39/proposal-temporal)

### Chrome Platform Status и Blog

- [Chrome 130 Beta](https://developer.chrome.com/blog/chrome-130-beta)
- [Chrome 131 Beta](https://developer.chrome.com/blog/chrome-131-beta)
- [Chrome 132 Beta](https://developer.chrome.com/blog/chrome-132-beta)
- [Chrome 133 Release Notes](https://developer.chrome.com/blog/new-in-chrome-133)
- [Chrome 134 Release Notes](https://developer.chrome.com/blog/new-in-chrome-134)
- [Chrome Platform Status](https://chromestatus.com/)

### Firefox Release Notes

- [Firefox 131 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131)
- [Firefox 132 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132)
- [Firefox 133 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/133)
- [Firefox 134 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/134)

### Safari/WebKit Blog

- [WebKit Features in Safari 18.0](https://webkit.org/blog/16026/webkit-features-in-safari-18-0/)
- [WebKit Features in Safari 18.2](https://webkit.org/blog/16092/webkit-features-in-safari-18-2/)

### V8 Blog

- [V8 Blog](https://v8.dev/blog)
- [How we made JSON.stringify more than twice as fast](https://v8.dev/blog/json-stringify)
- [Speculative Optimizations for WebAssembly](https://v8.dev/blog/wasm-deopt)
- [Giving V8 a Heads-Up: Faster JavaScript Startup](https://v8.dev/blog/compile-hints)
- [Land ahoy: leaving the Sea of Nodes](https://v8.dev/blog/turboshaft)
- [Turbocharging V8 with mutable heap numbers](https://v8.dev/blog/mutable-heap-numbers)

### MDN Web Docs

- [MDN: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN: Iterator](https://developer.mozilla.org/en-US/docs/Web/API/Iterator)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN: Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- [MDN: WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [MDN: Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

### Can I Use

- [Can I Use: Iterator Helpers](https://caniuse.com/mdn-javascript_builtins_iterator)
- [Can I Use: Promise.try()](https://caniuse.com/mdn-javascript_builtins_promise_try)
- [Can I Use: RegExp.escape()](https://caniuse.com/mdn-javascript_builtins_regexp_escape)

### Baseline

- [Web Platform Baseline](https://web.dev/baseline)

---

- **Дата создания отчёта**: 19.11.2025
- **Research ID**: `frontend-baseline-2023-2025`
- **Автор**: DeepResearch Agent
- **Связанные отчёты**: HTML 2023, CSS 2023, HTTP/Security 2023
