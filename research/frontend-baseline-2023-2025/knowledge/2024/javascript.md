---
title: JavaScript и Web APIs — изменения 2024 года
description:
    Комплексный обзор изменений в JavaScript и Web APIs за 2024 год - ECMAScript 2024, новые DOM и
    Web APIs, WebGPU, Set Methods, Baseline статусы и практические рекомендации
outline: deep
lastUpdated: true
---

# JavaScript и Web APIs — изменения 2024 года

- **Период**: 1 января 2024 — 31 декабря 2024
- **Версии браузеров**: Chrome/Edge 121–132, Firefox 121–133, Safari 17.2–18.2

## Обзор года

2024 год стал переломным для веб-платформы с мощным прогрессом в области JavaScript и Web APIs.
Ключевые темы года:

- **ECMAScript 2024**: шесть новых возможностей достигли Stage 4 в TC39, включая
  `Promise.withResolvers()`, `Object.groupBy()`, ArrayBuffer Transfer
- **Set Methods**: семь математических операций над множествами достигли Baseline 2024
- **Iterator Helpers**: ленивые операции над итераторами для эффективной обработки данных
- **WebGPU API**: революционный API для высокопроизводительной графики и вычислений на GPU
- **Popover API**: нативные всплывающие элементы с автоматическим управлением фокусом и доступностью
- **View Transitions API**: плавные анимированные переходы между состояниями в SPA и MPA
- **Baseline-достижения**: более 20 возможностей достигли статуса Baseline в 2024 году
- **Float16Array**: поддержка 16-битных чисел с плавающей точкой для работы с GPU

## 1. ECMAScript 2024 (ES2024)

ECMAScript 2024 включает шесть основных возможностей, достигших Stage 4 в TC39 в период 2023–2024
годов.

### 1.1 Promise.withResolvers()

**Статус**: Baseline 2024 (март 2024)

Статический метод для создания Promise с доступом к функциям `resolve` и `reject` извне конструктора
Promise, что упрощает паттерны управления промисами.

**Поддержка браузерами**:

- Chrome 119+ — ноябрь 2023
- Firefox 121+ — январь 2024
- Safari 17.4+ — март 2024
- Edge 119+ — ноябрь 2023

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-promise-with-resolvers)

```javascript
// Создание промиса с внешним управлением
const { promise, resolve, reject } = Promise.withResolvers();

// Использование resolve/reject независимо от конструктора
setTimeout(() => resolve('Успех!'), 1000);

promise.then((value) => console.log(value)); // 'Успех!'

// Практический пример: интеграция с callback-based API
function readFileAsync(path) {
    const { promise, resolve, reject } = Promise.withResolvers();

    fs.readFile(path, (error, data) => {
        if (error) reject(error);
        else resolve(data);
    });

    return promise;
}

// Управление промисом из обработчика событий
class DataLoader {
    constructor() {
        this.dataPromise = null;
    }

    startLoading() {
        const { promise, resolve, reject } = Promise.withResolvers();
        this.dataPromise = promise;

        this.element.addEventListener('load', () => resolve(this.data));
        this.element.addEventListener('error', () => reject(new Error('Ошибка загрузки')));
    }

    async getData() {
        return await this.dataPromise;
    }
}
```

**Практическое применение**:

- Создание промисов вне конструктора
- Интеграция с callback-based APIs
- Управление разрешением промисов в обработчиках событий
- Паттерны отложенной инициализации (Deferred pattern)
- Управление асинхронным состоянием в классах

**Источники**:

- [TC39 Proposal: Promise.withResolvers()](https://github.com/tc39/proposal-promise-with-resolvers)
- [MDN: Promise.withResolvers()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers)

### 1.2 Object.groupBy() и Map.groupBy()

**Статус**: Baseline 2024 (март 2024)

Методы для группировки элементов массива по результату вызова функции. `Object.groupBy()` возвращает
обычный объект, а `Map.groupBy()` возвращает Map.

**Поддержка браузерами**:

- Chrome 117+ — сентябрь 2023
- Firefox — не поддерживается (на конец 2024)
- Safari 17.4+ — март 2024
- Edge 117+ — сентябрь 2023

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-array-grouping)

**Примечание**: Изначально предлагались как `Array.prototype.group()` и
`Array.prototype.groupToMap()`, но были переименованы в статические методы из-за проблем
веб-совместимости.

```javascript
const inventory = [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
    { name: 'bananas', type: 'fruit', quantity: 0 },
    { name: 'cherries', type: 'fruit', quantity: 5 },
];

// Группировка по типу с помощью Object.groupBy
const result = Object.groupBy(inventory, ({ type }) => type);
// {
//   vegetables: [{ name: 'asparagus', type: 'vegetables', quantity: 5 }],
//   fruit: [
//     { name: 'bananas', type: 'fruit', quantity: 0 },
//     { name: 'cherries', type: 'fruit', quantity: 5 }
//   ]
// }

// Группировка по доступности с помощью Map.groupBy
const restock = Map.groupBy(inventory, ({ quantity }) => (quantity < 5 ? 'restock' : 'ok'));
console.log(restock.get('restock'));
// [{ name: "bananas", type: "fruit", quantity: 0 }]

// Практический пример: группировка транзакций по датам
const transactions = [
    { id: 1, date: '2024-01-15', amount: 100 },
    { id: 2, date: '2024-01-15', amount: 200 },
    { id: 3, date: '2024-01-16', amount: 150 },
    { id: 4, date: '2024-01-16', amount: 300 },
];

const byDate = Object.groupBy(transactions, ({ date }) => date);
// {
//   '2024-01-15': [...],
//   '2024-01-16': [...]
// }

// Группировка пользователей по ролям
const users = [
    { name: 'Alice', role: 'admin' },
    { name: 'Bob', role: 'user' },
    { name: 'Charlie', role: 'admin' },
];

const usersByRole = Object.groupBy(users, ({ role }) => role);
```

**Практическое применение**:

- Агрегация и категоризация данных
- Организация коллекций по свойствам
- Построение сгруппированных UI-компонентов
- Трансформация данных в pipeline обработки
- Аналитика и статистика

**Источники**:

- [TC39 Proposal: Array Grouping](https://github.com/tc39/proposal-array-grouping)
- [MDN: Object.groupBy()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
- [WebKit Blog: Safari 17.4](https://webkit.org/blog/14787/webkit-features-in-safari-17-4/)

### 1.3 ArrayBuffer Transfer

**Статус**: Baseline 2024 (март 2024)

Возможность передачи владения ArrayBuffer между контекстами без копирования данных. Включает методы
`ArrayBuffer.prototype.transfer()` и `ArrayBuffer.prototype.transferToFixedLength()`.

**Поддержка браузерами**:

- Chrome 114+ — май 2023
- Firefox 122+ — февраль 2024
- Safari 17.4+ — март 2024
- Edge 114+ — май 2023

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-arraybuffer-transfer)

```javascript
const buffer = new ArrayBuffer(8);
const view = new Uint8Array(buffer);
view[0] = 42;

// Передача буфера (оригинал становится detached)
const newBuffer = buffer.transfer();
console.log(buffer.byteLength); // 0 (отсоединён)
console.log(newBuffer.byteLength); // 8

// Проверка статуса буфера
console.log(buffer.detached); // true
console.log(newBuffer.detached); // false

// Передача с изменением размера
const resizedBuffer = newBuffer.transfer(16); // Новый размер: 16 байт

// Передача в фиксированный размер
const fixedBuffer = resizedBuffer.transferToFixedLength(8);
console.log(fixedBuffer.resizable); // false

// Практический пример: отправка данных в Worker без копирования
const dataBuffer = new ArrayBuffer(1024 * 1024); // 1 MB
const worker = new Worker('worker.js');

// До transfer: необходимо копирование
// worker.postMessage(dataBuffer); // Копирует 1 MB

// С transfer: нулевое копирование
worker.postMessage(dataBuffer, [dataBuffer]);
console.log(dataBuffer.detached); // true — владение передано
```

**Новые свойства**:

- `ArrayBuffer.prototype.transfer(newByteLength)` — передача с опциональным изменением размера
- `ArrayBuffer.prototype.transferToFixedLength(newByteLength)` — передача в нерасширяемый буфер
- `ArrayBuffer.prototype.detached` — флаг статуса передачи

**Практическое применение**:

- Нулевое копирование при передаче данных между Workers
- Эффективное управление памятью в WebAssembly
- Высокопроизводительная обработка данных
- Предотвращение дублирования данных в многопоточных приложениях
- Оптимизация работы с большими бинарными данными

**Источники**:

- [TC39 Proposal: ArrayBuffer Transfer](https://github.com/tc39/proposal-arraybuffer-transfer)
- [Firefox 122 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/122)

### 1.4 Resizable ArrayBuffer и Growable SharedArrayBuffer

**Статус**: Baseline 2024 (июль 2024)

Возможность динамического изменения размера ArrayBuffer и SharedArrayBuffer без выделения новых
буферов и копирования данных. Улучшает эффективность управления памятью для приложений с переменным
размером данных.

**Поддержка браузерами**:

- Chrome 111+ — март 2023
- Firefox 128+ — июль 2024
- Safari 17.4+ — март 2024
- Edge 111+ — март 2023

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-resizablearraybuffer)

```javascript
// Создание расширяемого ArrayBuffer
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
console.log(buffer.resizable); // true
console.log(buffer.maxByteLength); // 16
console.log(buffer.byteLength); // 8

// Изменение размера
buffer.resize(12);
console.log(buffer.byteLength); // 12

// Попытка превысить максимальный размер вызовет ошибку
// buffer.resize(20); // RangeError

// Создание расширяемого SharedArrayBuffer
const sharedBuffer = new SharedArrayBuffer(8, { maxByteLength: 16 });
console.log(sharedBuffer.growable); // true
console.log(sharedBuffer.maxByteLength); // 16

// Расширение (только увеличение, монотонная операция)
sharedBuffer.grow(12);
console.log(sharedBuffer.byteLength); // 12

// Практический пример: динамический буфер для стриминга
class StreamBuffer {
    constructor(initialSize = 1024, maxSize = 1024 * 1024) {
        this.buffer = new ArrayBuffer(initialSize, { maxByteLength: maxSize });
        this.view = new Uint8Array(this.buffer);
        this.position = 0;
    }

    append(data) {
        const requiredSize = this.position + data.length;

        if (requiredSize > this.buffer.byteLength) {
            // Расширение буфера при необходимости
            const newSize = Math.min(
                Math.max(requiredSize, this.buffer.byteLength * 2),
                this.buffer.maxByteLength,
            );
            this.buffer.resize(newSize);
            this.view = new Uint8Array(this.buffer);
        }

        this.view.set(data, this.position);
        this.position += data.length;
    }
}
```

**Новые свойства и методы**:

- `ArrayBuffer.prototype.resize(newByteLength)` — изменение размера на месте
- `SharedArrayBuffer.prototype.grow(newByteLength)` — расширение разделяемого буфера (только
  увеличение)
- `ArrayBuffer.prototype.resizable` — флаг возможности изменения размера
- `SharedArrayBuffer.prototype.growable` — флаг возможности расширения
- `maxByteLength` — максимальный размер буфера

**Практическое применение**:

- Динамическое выделение памяти без повторного копирования
- Эффективное управление буферами в WebAssembly
- Обработка потоковых данных
- Паттерны разделяемой памяти в многопоточных приложениях
- Оптимизация использования памяти в долгоживущих приложениях

**Источники**:

- [TC39 Proposal: Resizable ArrayBuffer](https://github.com/tc39/proposal-resizablearraybuffer)
- [Firefox 128 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/128)
- [Firefox 124 Experimental Features](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/124)

### 1.5 RegExp Modifiers

**Статус**: Частичная поддержка (2024)

Синтаксис `(?ims-ims:...)` для локального изменения модификаторов внутри регулярных выражений,
позволяющий применять модификации только к конкретным секциям, а не ко всему выражению.

**Поддержка браузерами**:

- Chrome 125+ — май 2024
- Firefox 132+ — октябрь 2024
- Safari — не поддерживается (на конец 2024)
- Edge 125+ — май 2024

**Спецификация**: ECMAScript 2024

```javascript
// Включение нечувствительности к регистру в части шаблона
const regex = /hello(?i:world)/;
regex.test('helloWORLD'); // true
regex.test('HELLOWORLD'); // false (только 'world' нечувствителен к регистру)

// Отключение многострочного режима в секции
const regex2 = /(?-m:^)test/m;

// Множественные модификаторы
const regex3 = /(?ims:section1)(?-i:section2)/;

// Практический пример: парсинг смешанного контента
const htmlRegex = /(?i:<div>)content(?i:<\/div>)/;
htmlRegex.test('<DIV>content</DIV>'); // true

// Нечувствительное к регистру совпадение в части email
const emailRegex = /^[a-z0-9._%+-]+@(?i:[a-z0-9.-]+\.[a-z]{2,})$/;
emailRegex.test('user@EXAMPLE.COM'); // true
```

**Доступные модификаторы**:

- `i` — нечувствительность к регистру (case-insensitive)
- `m` — многострочный режим (^ и $ соответствуют границам строк)
- `s` — dotall режим (. соответствует переносам строк)

**Практическое применение**:

- Частичное нечувствительное к регистру совпадение
- Сложный парсинг со смешанными правилами соответствия
- Детальный контроль над регулярными выражениями
- Модернизация устаревших шаблонов
- Упрощение сложных regex без дублирования

**Источники**:

- [Firefox 131 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131)
- [Firefox 132 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132)

### 1.6 RegExp `v` Flag

**Статус**: Baseline 2024 (сентябрь 2024)

Расширенная поддержка Unicode для регулярных выражений, предоставляющая более мощные способы
соответствия Unicode-символам. Включает операции над множествами в символьных классах.

**Поддержка браузерами**:

- Chrome 112+ — апрель 2023
- Firefox 116+ — август 2023
- Safari 18.0+ — сентябрь 2024
- Edge 112+ — апрель 2023

**Спецификация**: ECMAScript 2024

```javascript
// Нотация множеств Unicode
const regex = /[\p{Script=Latin}&&\p{Letter}]/v;

// Операции над символьными классами
const latinOrGreek = /[\p{Script=Latin}\p{Script=Greek}]/v;

// Разность множеств (исключение)
const nonAscii = /[\p{Letter}--[a-zA-Z]]/v;

// Соответствие последовательностям emoji
const emojiRegex = /\p{RGI_Emoji}/v;

// Практический пример: валидация интернационализированных имён
const nameRegex = /^[\p{Script=Latin}\p{Script=Cyrillic}]+$/v;
nameRegex.test('Иван'); // true
nameRegex.test('John'); // true
nameRegex.test('李明'); // false

// Фильтрация символов конкретного скрипта
const cyrillicOnly = /[\p{Script=Cyrillic}]/v;
const text = 'Hello Привет 你好';
text.match(new RegExp(cyrillicOnly, 'gv')); // ['П', 'р', 'и', 'в', 'е', 'т']

// Сложные операции над множествами
const lettersExceptVowels = /[\p{Letter}--[aeiouAEIOU]]/v;
lettersExceptVowels.test('b'); // true
lettersExceptVowels.test('a'); // false
```

**Возможности**:

- Операции над множествами в символьных классах (`&&`, `--`)
- Соответствие Unicode-скриптам
- Улучшенная поддержка emoji
- Свойства строк (properties of strings)

**Практическое применение**:

- Валидация текста конкретных скриптов
- Сложные шаблоны соответствия Unicode
- Интернационализированная валидация ввода
- Обработка emoji и специальных символов
- Фильтрация контента по языковым характеристикам

**Источники**:

- [WebKit Blog: Safari 18.0](https://webkit.org/blog/15359/webkit-features-in-safari-18-0/)
- [MDN: RegExp v flag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets)

## 2. Set Methods (Baseline 2024)

**Статус**: Baseline 2024 (июнь 2024)

Семь новых методов Set для выполнения математических операций над множествами: объединение,
пересечение, разность, симметричная разность и проверки отношений множеств.

**Поддержка браузерами**:

- Chrome 122+ — февраль 2024
- Firefox 127+ — июнь 2024
- Safari 17.0+ — сентябрь 2023
- Edge 122+ — февраль 2024

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-set-methods)

### Методы

1. **`Set.prototype.union(other)`** — возвращает новое множество со всеми элементами обоих множеств
2. **`Set.prototype.intersection(other)`** — возвращает новое множество с элементами,
   присутствующими в обоих множествах
3. **`Set.prototype.difference(other)`** — возвращает новое множество с элементами текущего
   множества, отсутствующими в другом
4. **`Set.prototype.symmetricDifference(other)`** — возвращает новое множество с элементами,
   присутствующими в одном из множеств, но не в обоих
5. **`Set.prototype.isSubsetOf(other)`** — проверка, являются ли все элементы текущего множества
   элементами данного множества
6. **`Set.prototype.isSupersetOf(other)`** — проверка, являются ли все элементы данного множества
   элементами текущего множества
7. **`Set.prototype.isDisjointFrom(other)`** — проверка на отсутствие общих элементов

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Объединение (union)
const union = setA.union(setB);
// Set(6) { 1, 2, 3, 4, 5, 6 }

// Пересечение (intersection)
const intersection = setA.intersection(setB);
// Set(2) { 3, 4 }

// Разность (difference)
const difference = setA.difference(setB);
// Set(2) { 1, 2 }

// Симметричная разность (symmetric difference)
const symDiff = setA.symmetricDifference(setB);
// Set(4) { 1, 2, 5, 6 }

// Проверки отношений
setA.isSubsetOf(new Set([1, 2, 3, 4, 5])); // true
setA.isSupersetOf(new Set([2, 3])); // true
setA.isDisjointFrom(new Set([7, 8])); // true

// Практический пример: управление разрешениями
const userPermissions = new Set(['read', 'write', 'delete']);
const requiredPermissions = new Set(['read', 'write']);
const adminPermissions = new Set(['read', 'write', 'delete', 'admin']);

// Проверка наличия всех необходимых разрешений
const hasAllRequired = requiredPermissions.isSubsetOf(userPermissions); // true

// Дополнительные разрешения пользователя
const extraPermissions = userPermissions.difference(requiredPermissions);
// Set(1) { 'delete' }

// Объединённые разрешения
const allPermissions = userPermissions.union(adminPermissions);
// Set(4) { 'read', 'write', 'delete', 'admin' }

// Практический пример: работа с тегами
class TagManager {
    constructor() {
        this.tags = new Set();
    }

    addTags(newTags) {
        this.tags = this.tags.union(new Set(newTags));
    }

    removeTags(tagsToRemove) {
        this.tags = this.tags.difference(new Set(tagsToRemove));
    }

    hasAllTags(requiredTags) {
        return new Set(requiredTags).isSubsetOf(this.tags);
    }

    getCommonTags(otherTags) {
        return this.tags.intersection(new Set(otherTags));
    }
}
```

**Практическое применение**:

- Дедупликация и сравнение данных
- Фильтрация и запросы на основе множеств
- Математические операции над коллекциями
- Управление разрешениями и ролями
- Системы тегов и категорий
- Анализ пересечений данных

**Источники**:

- [TC39 Proposal: Set Methods](https://github.com/tc39/proposal-set-methods)
- [Firefox 127 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/127)

## 3. Iterator Helper Methods (Baseline 2024)

**Статус**: Baseline 2024 (сентябрь 2024)

Методы-помощники для синхронных итераторов, позволяющие выполнять Array-подобные операции над
итераторами без создания промежуточных массивов. Улучшает производительность и эффективность памяти
для больших наборов данных.

**Поддержка браузерами**:

- Chrome 117+ — сентябрь 2023
- Firefox 131+ — сентябрь 2024
- Safari 17.0+ — сентябрь 2023
- Edge 117+ — сентябрь 2023

**Спецификация**: [TC39 Proposal](https://github.com/tc39/proposal-iterator-helpers)

### Методы

- `Iterator.prototype.drop(limit)` — пропускает первые n элементов
- `Iterator.prototype.every(predicate)` — проверяет, соответствуют ли все элементы предикату
- `Iterator.prototype.filter(predicate)` — фильтрует элементы
- `Iterator.prototype.find(predicate)` — находит первый соответствующий элемент
- `Iterator.prototype.flatMap(callback)` — отображает и разворачивает результаты
- `Iterator.prototype.forEach(callback)` — выполняет callback для каждого элемента
- `Iterator.prototype.map(callback)` — отображает элементы
- `Iterator.prototype.reduce(reducer, initialValue)` — сворачивает в одно значение
- `Iterator.prototype.some(predicate)` — проверяет, соответствует ли хотя бы один элемент
- `Iterator.prototype.take(limit)` — берёт первые n элементов

```javascript
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Взять первые 10 чётных чисел Фибоначчи
const result = fibonacci()
    .filter((n) => n % 2 === 0)
    .take(10)
    .map((n) => n * 2);

for (const value of result) {
    console.log(value); // 0, 4, 16, 68, 272, ...
}

// Практический пример: ленивая обработка больших файлов
function* readLinesFromFile(file) {
    // Генератор, читающий файл построчно
    for (const line of file) {
        yield line;
    }
}

const processedLines = readLinesFromFile(largeFile)
    .filter((line) => line.includes('ERROR'))
    .map((line) => line.trim())
    .take(100); // Только первые 100 ошибок

// Практический пример: бесконечная последовательность
function* naturalNumbers() {
    let n = 1;
    while (true) yield n++;
}

// Первые 5 квадратов чисел больше 10
const squares = naturalNumbers()
    .drop(10) // Пропустить первые 10
    .take(5) // Взять следующие 5
    .map((n) => n * n);

Array.from(squares); // [121, 144, 169, 196, 225]

// Комбинирование операций
function* dataStream() {
    yield* [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

const processed = dataStream()
    .filter((x) => x % 2 === 0) // Только чётные
    .map((x) => x * 10) // Умножить на 10
    .drop(1) // Пропустить первый
    .take(2); // Взять два

Array.from(processed); // [40, 60]
```

**Практическое применение**:

- Ленивая обработка больших наборов данных
- Эффективные pipeline трансформации данных
- Обработка потоков без буферизации
- Фильтрация и отображение с эффективным использованием памяти
- Обработка данных на основе генераторов
- Работа с бесконечными последовательностями

**Источники**:

- [TC39 Proposal: Iterator Helpers](https://github.com/tc39/proposal-iterator-helpers)
- [Firefox 131 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131)

## 4. Popover API (Baseline 2025)

**Статус**: Baseline 2025 (январь 2025) — достиг кросс-браузерной поддержки в 2024

Стандартный механизм для создания всплывающих элементов поверх другого контента с автоматическим
управлением z-index, фокусом и доступностью.

**Поддержка браузерами**:

- Chrome 114+ — май 2023
- Firefox 125+ — апрель 2024
- Safari 17.0+ — сентябрь 2023
- Edge 114+ — май 2023

**Спецификация**: [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/popover.html)

### HTML атрибуты

- `popover` — определяет элемент как popover (`"auto"` или `"manual"`)
- `popovertarget` — связывает кнопку с popover
- `popovertargetaction` — действие (`"show"`, `"hide"`, `"toggle"`)

### JavaScript API

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

// Проверка состояния
console.log(popover.matches(':popover-open')); // CSS псевдокласс
```

### HTML пример

```html
<!-- Базовый popover -->
<button popovertarget="menu">Открыть меню</button>

<div id="menu" popover>
    <ul>
        <li><a href="/profile">Профиль</a></li>
        <li><a href="/settings">Настройки</a></li>
        <li><a href="/logout">Выход</a></li>
    </ul>
    <button popovertarget="menu" popovertargetaction="hide">Закрыть</button>
</div>

<!-- Manual popover (не закрывается автоматически) -->
<div id="manual-popover" popover="manual">
    <p>Этот popover не закроется при клике снаружи</p>
</div>
```

### CSS стилизация

```css
/* Стилизация popover */
[popover] {
    background: white;
    border: 2px solid #333;
    border-radius: 8px;
    padding: 20px;
}

/* Стилизация открытого состояния */
[popover]:popover-open {
    opacity: 1;
    transform: translateY(0);
    animation: slideIn 0.3s ease-out;
}

/* Backdrop */
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

### Практический пример: менеджер уведомлений

```javascript
class NotificationManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notifications';
        container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000;';
        document.body.appendChild(container);
        return container;
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.setAttribute('popover', 'auto');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        this.container.appendChild(notification);
        notification.showPopover();

        if (duration > 0) {
            setTimeout(() => {
                notification.hidePopover();
                setTimeout(() => notification.remove(), 300);
            }, duration);
        }
    }

    success(message) {
        this.showNotification(message, 'success');
    }

    error(message) {
        this.showNotification(message, 'error');
    }
}

// Использование
const notifications = new NotificationManager();
notifications.success('Сохранено успешно!');
notifications.error('Произошла ошибка');
```

**Практическое применение**:

- Action меню и dropdown меню
- Всплывающие подсказки (tooltips)
- Toast-уведомления
- Контекстные меню
- Пикеры для форм (дата, цвет и т.д.)
- Обучающие UI-подсказки
- Модальные и немодальные диалоги

**Источники**:

- [WHATWG HTML Specification](https://html.spec.whatwg.org/multipage/popover.html)
- [Firefox 125 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/125)
- [MDN: Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

## 5. View Transitions API

**Статус**: Limited Availability (2024), приближается к Baseline

API для создания плавных анимированных переходов между различными состояниями DOM в single-page
applications (SPA) и во время кросс-документных навигаций в multi-page applications (MPA).

**Поддержка браузерами**:

- Chrome 111+ для SPA — март 2023, Chrome 126+ для MPA — июнь 2024
- Firefox — не поддерживается (на конец 2024)
- Safari 18.0+ — сентябрь 2024 (только SPA)
- Edge 111+ — март 2023

**Спецификация**:
[CSS View Transitions Module Level 1](https://drafts.csswg.org/css-view-transitions-1/)

### Same-Document Transitions (SPA)

```javascript
// Базовый переход представлений
document.startViewTransition(() => {
    // Обновить DOM
    document.querySelector('#content').innerHTML = newContent;
});

// С обработкой промисов
const transition = document.startViewTransition(async () => {
    await updateDOM();
});

transition.ready.then(() => {
    console.log('Переход начинается');
});

transition.finished.then(() => {
    console.log('Переход завершён');
});

// Условный переход
function conditionalTransition(shouldAnimate) {
    if (!shouldAnimate || !document.startViewTransition) {
        updateDOM();
        return;
    }

    document.startViewTransition(() => updateDOM());
}
```

### Cross-Document Transitions (MPA)

```css
/* Активация кросс-документных переходов */
@view-transition {
    navigation: auto;
}
```

### CSS кастомизация

```css
/* Настройка анимации перехода */
::view-transition-old(root) {
    animation: fade-out 0.3s ease-in;
}

::view-transition-new(root) {
    animation: fade-in 0.3s ease-out;
}

/* Именованные переходы представлений */
.hero {
    view-transition-name: hero-image;
}

::view-transition-old(hero-image),
::view-transition-new(hero-image) {
    animation-duration: 0.5s;
}

/* Кастомные анимации */
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
```

### Практический пример: SPA router с переходами

```javascript
class ViewTransitionRouter {
    constructor() {
        this.routes = new Map();
        this.setupNavigation();
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    setupNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/"]')) {
                e.preventDefault();
                this.navigate(e.target.href);
            }
        });
    }

    async navigate(url) {
        const path = new URL(url).pathname;
        const handler = this.routes.get(path);

        if (!handler) return;

        if (!document.startViewTransition) {
            await handler();
            window.history.pushState({}, '', url);
            return;
        }

        const transition = document.startViewTransition(async () => {
            await handler();
            window.history.pushState({}, '', url);
        });

        await transition.finished;
    }
}

// Использование
const router = new ViewTransitionRouter();

router.addRoute('/home', async () => {
    document.querySelector('main').innerHTML = await loadHome();
});

router.addRoute('/about', async () => {
    document.querySelector('main').innerHTML = await loadAbout();
});
```

**Практическое применение**:

- Плавные переходы между страницами/видами в SPA
- Анимации навигации в MPA
- Морфинг элементов между состояниями (shared element transitions)
- Эффекты перехода роутера
- Прогрессивное улучшение навигации
- Hero animations (расширение миниатюры в полный размер)

**Источники**:

- [CSS View Transitions Specification](https://drafts.csswg.org/css-view-transitions-1/)
- [WebKit Blog: Safari 18.0](https://webkit.org/blog/15359/webkit-features-in-safari-18-0/)
- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

## 6. WebGPU API (Baseline: Limited Availability)

**Статус**: Limited Availability (2024)

Современный GPU API, предоставляющий низкоуровневый высокопроизводительный доступ к графическим и
вычислительным возможностям. Преемник WebGL с улучшенной производительностью и поддержкой compute
shaders.

**Поддержка браузерами**:

- Chrome 113+ — май 2023
- Firefox — не поддерживается (в разработке)
- Safari 18.0+ — сентябрь 2024 (экспериментально)
- Edge 113+ — май 2023

**Спецификация**: [W3C WebGPU](https://www.w3.org/TR/webgpu/)

### Базовый пример

```javascript
// Запрос адаптера и устройства
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();

// Создание render pipeline
const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
        module: device.createShaderModule({
            code: vertexShaderCode,
        }),
        entryPoint: 'main',
    },
    fragment: {
        module: device.createShaderModule({
            code: fragmentShaderCode,
        }),
        entryPoint: 'main',
        targets: [{ format: 'bgra8unorm' }],
    },
});

// Рендеринг
const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
passEncoder.setPipeline(pipeline);
passEncoder.draw(3);
passEncoder.end();
device.queue.submit([commandEncoder.finish()]);
```

### Compute Shader пример

```javascript
// WGSL compute shader
const computeShaderCode = `
@group(0) @binding(0) var<storage, read> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let index = global_id.x;
    output[index] = input[index] * 2.0;
}
`;

// Создание compute pipeline
const computePipeline = device.createComputePipeline({
    layout: 'auto',
    compute: {
        module: device.createShaderModule({ code: computeShaderCode }),
        entryPoint: 'main',
    },
});

// Создание буферов
const inputBuffer = device.createBuffer({
    size: data.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});

const outputBuffer = device.createBuffer({
    size: data.byteLength,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC,
});

// Выполнение вычислений
const commandEncoder = device.createCommandEncoder();
const passEncoder = commandEncoder.beginComputePass();
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatchWorkgroups(Math.ceil(data.length / 64));
passEncoder.end();

device.queue.submit([commandEncoder.finish()]);
```

### Chrome 130 Enhancement: Dual Source Blending

```javascript
// Dual source blending для продвинутого рендеринга
const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
        /* ... */
    },
    fragment: {
        module: device.createShaderModule({ code: fragmentShader }),
        entryPoint: 'main',
        targets: [
            {
                format: 'bgra8unorm',
                blend: {
                    color: {
                        srcFactor: 'src',
                        dstFactor: 'one-minus-src1',
                        operation: 'add',
                    },
                    alpha: {
                        srcFactor: 'one',
                        dstFactor: 'one-minus-src1-alpha',
                        operation: 'add',
                    },
                },
            },
        ],
    },
});
```

**Практическое применение**:

- Высокопроизводительная 3D графика
- GPU вычисления (ML инференс, симуляции)
- Игровые движки
- CAD приложения
- Научная визуализация
- Обработка видео
- Физические симуляции
- Криптографические вычисления

**Источники**:

- [W3C WebGPU Specification](https://www.w3.org/TR/webgpu/)
- [Chrome 130 Features](https://developer.chrome.com/blog/new-in-chrome-130)
- [WebKit Blog: Safari 18.0](https://webkit.org/blog/15359/webkit-features-in-safari-18-0/)

## 7. Navigation API (Experimental)

**Статус**: Experimental (Chrome-only в 2024)

Современная замена History API, специально разработанная для нужд single-page applications (SPA).
Предоставляет улучшенный контроль над событиями навигации, управлением состоянием и восстановлением
прокрутки.

**Поддержка браузерами**:

- Chrome 102+ — май 2022
- Firefox — не поддерживается
- Safari — не поддерживается
- Edge 102+ — май 2022

**Спецификация**: [WICG Navigation API](https://github.com/WICG/navigation-api)

```javascript
// Слушатель событий навигации
navigation.addEventListener('navigate', (event) => {
    // Перехват и обработка навигации
    event.intercept({
        async handler() {
            // Загрузка нового контента
            await loadPage(event.destination.url);
        },
        scroll: 'after-transition',
        focusReset: 'manual',
    });
});

// Программная навигация
await navigation.navigate('/new-page', {
    state: { data: 'value' },
    history: 'push',
});

// Навигация назад/вперёд
navigation.back();
navigation.forward();

// Доступ к записям навигации
console.log(navigation.currentEntry);
console.log(navigation.entries());

// Переход к конкретной записи
navigation.traverseTo(entryId);

// NavigationActivation Interface (Chrome 123+)
if (navigation.activation) {
    console.log('Откуда:', navigation.activation.from?.url);
    console.log('Тип:', navigation.activation.navigationType); // 'push', 'replace', 'reload', 'traverse'
    console.log('Запись:', navigation.activation.entry);
}
```

### Практический пример: современный SPA роутер

```javascript
class ModernRouter {
    constructor() {
        this.routes = new Map();
        this.setupNavigation();
    }

    setupNavigation() {
        navigation.addEventListener('navigate', (event) => {
            const url = new URL(event.destination.url);
            const handler = this.routes.get(url.pathname);

            if (!handler) return;

            event.intercept({
                async handler() {
                    // Показать индикатор загрузки
                    showLoadingIndicator();

                    try {
                        await handler(url);
                    } finally {
                        hideLoadingIndicator();
                    }
                },
                scroll: 'after-transition',
            });
        });
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    async navigateTo(path, state = {}) {
        const result = await navigation.navigate(path, { state });
        await result.committed;
        return result.finished;
    }
}
```

**Практическое применение**:

- Улучшенная маршрутизация в SPA фреймворках
- Единый обработчик всех типов навигации (клик, back/forward, изменение URL)
- Сохранение состояния UI между переходами
- Отмена навигации при несохранённых изменениях
- Индикаторы прогресса для длительных переходов
- Замена сложных роутеров на более простой API

**Источники**:

- [WICG Navigation API Specification](https://github.com/WICG/navigation-api)
- [Chrome for Developers: Navigation API](https://developer.chrome.com/docs/web-platform/navigation-api)
- [Chrome 123 Features](https://developer.chrome.com/blog/new-in-chrome-123)

## 8. Storage и Performance APIs

### 8.1 Storage API (Baseline 2024)

**Статус**: Baseline 2024 (сентябрь 2023) — полная поддержка достигнута в Safari 17.0

API для управления постоянством хранилища и оценки доступного пространства.

**Поддержка браузерами**:

- Chrome 48+ (estimate), 52+ (persist/persisted)
- Firefox 51+ (estimate), 55+ (persist/persisted)
- Safari 17.0+ — сентябрь 2023 (полная поддержка)
- Edge 79+

**Спецификация**: [Storage Standard](https://storage.spec.whatwg.org/)

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

// Практический пример: управление офлайн-данными PWA
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

**Изменения в Safari 17.0** (2023):

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

### 8.2 Screen Wake Lock API (Baseline 2024)

**Статус**: Baseline 2024 (май 2024)

API для предотвращения затемнения экрана устройства во время активности приложения.

**Поддержка браузерами**:

- Chrome 84+ — июль 2020
- Firefox 126+ — май 2024
- Safari 16.4+ — март 2023
- Edge 84+ — июль 2020

**Спецификация**: [W3C Screen Wake Lock API](https://w3c.github.io/screen-wake-lock/)

```javascript
let wakeLock = null;

// Запрос wake lock
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

// Повторная активация при возврате на страницу
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        requestWakeLock();
    }
});

// Практический пример: видеоплеер
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
```

**Практическое применение**:

- E-reader приложения
- Навигация и карты
- Презентационное ПО
- Приложения рецептов при готовке
- Фитнес и тренировочные приложения
- Видеоконференции

**Источники**:

- [W3C Screen Wake Lock Specification](https://w3c.github.io/screen-wake-lock/)
- [Firefox 126 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/126)

## 9. Медиа и графика

### 9.1 WebCodecs API (Baseline 2024)

**Статус**: Baseline 2024 (сентябрь 2024, desktop)

Низкоуровневый доступ к отдельным видеокадрам и аудиочанкам для эффективной медиа-обработки без
полных циклов декодирования/кодирования.

**Поддержка браузерами**:

- Chrome 94+ — сентябрь 2021
- Firefox 130+ — сентябрь 2024 (только desktop)
- Safari 16.4+ — март 2023
- Edge 94+ — сентябрь 2021

**Спецификация**: [W3C WebCodecs](https://www.w3.org/TR/webcodecs/)

**Интерфейсы**:

- `VideoEncoder` / `VideoDecoder` — кодирование/декодирование видео
- `AudioEncoder` / `AudioDecoder` — кодирование/декодирование аудио
- `VideoFrame` — представление видеокадра
- `AudioData` — представление аудиоданных
- `EncodedVideoChunk` / `EncodedAudioChunk` — закодированные данные
- `VideoColorSpace` — информация о цветовом пространстве

```javascript
// Инициализация видео энкодера
const encoder = new VideoEncoder({
    output(chunk, metadata) {
        console.log('Закодирован чанк:', chunk);
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
    bitrate: 2000000,
    framerate: 30,
});

// Кодирование кадра
const frame = new VideoFrame(canvas, { timestamp: 0 });
encoder.encode(frame, { keyFrame: true });
frame.close();

// Декодирование видео
const decoder = new VideoDecoder({
    output(frame) {
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

// Аудио кодирование
const audioEncoder = new AudioEncoder({
    output: (chunk, metadata) => {
        // Обработка закодированного аудио
    },
    error: (err) => console.error(err),
});

audioEncoder.configure({
    codec: 'opus',
    sampleRate: 48000,
    numberOfChannels: 2,
    bitrate: 128000,
});

const audioData = new AudioData({
    format: 'f32-planar',
    sampleRate: 48000,
    numberOfFrames: 4800,
    numberOfChannels: 2,
    timestamp: 0,
    data: audioBuffer,
});

audioEncoder.encode(audioData);
audioData.close();
```

**Практическое применение**:

- Видеоредакторы в браузере
- Обработка видео в реальном времени
- Кастомные медиаплееры
- Видеоконференции
- Запись экрана
- Конвертация медиаформатов

**Источники**:

- [W3C WebCodecs Specification](https://www.w3.org/TR/webcodecs/)
- [Firefox 130 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/130)

### 9.2 Canvas Context Enhancements

**Firefox 125 — Events для восстановления контекста**:

```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('contextlost', (event) => {
    event.preventDefault(); // Предотвратить дефолтное удаление
    console.log('Контекст потерян!');
});

canvas.addEventListener('contextrestored', () => {
    console.log('Контекст восстановлен!');
    // Перерисовать canvas
});

// Проверка статуса контекста
if (ctx.isContextLost()) {
    console.log('Контекст в данный момент потерян');
}
```

**Safari 17.2 — Метод reset()**:

```javascript
const ctx = canvas.getContext('2d');

// Нарисовать что-то
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 100);

// Сбросить к дефолтному состоянию
ctx.reset(); // Очищает canvas и сбрасывает всё состояние контекста
```

**Safari 18.0 — Атрибут willReadFrequently**:

```javascript
// Оптимизация для частых вызовов getImageData()
const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
});

// Теперь getImageData() оптимизирован
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
```

**Safari 18.0 — Поддержка currentcolor**:

```css
.canvas-container {
    color: blue;
}
```

```javascript
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'currentcolor'; // Использует унаследованный цвет
ctx.fillStyle = 'color-mix(in srgb, currentcolor 50%, white)';
```

**Практическое применение**:

- Робастные canvas-приложения с восстановлением
- Оптимизация производительности при манипуляциях с пикселями
- Цветосогласованный рендеринг canvas
- Graceful degradation

**Источники**:

- [Firefox 125 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/125)
- [WebKit Blog: Safari 17.2](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/)
- [WebKit Blog: Safari 18.0](https://webkit.org/blog/15359/webkit-features-in-safari-18-0/)

### 9.3 Video Frame Callbacks (Baseline 2024)

**Статус**: Baseline 2024 (октябрь 2024)

`requestVideoFrameCallback()` позволяет выполнять покадровые операции на видео элементах для
эффективной обработки кадр за кадром.

**Поддержка браузерами**:

- Chrome 83+ — июнь 2020
- Firefox 132+ — октябрь 2024
- Safari 17.4+ — март 2024
- Edge 83+ — июнь 2020

```javascript
const video = document.querySelector('video');

function processFrame(now, metadata) {
    console.log('Кадр в', metadata.presentationTime);
    console.log('Ожидаемое время отображения:', metadata.expectedDisplayTime);
    console.log('Ширина:', metadata.width, 'Высота:', metadata.height);

    // Обработка кадра (например, отрисовка на canvas)
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Запрос следующего кадра
    video.requestVideoFrameCallback(processFrame);
}

// Запуск обработки
video.requestVideoFrameCallback(processFrame);

// Отмена при необходимости
const handle = video.requestVideoFrameCallback(processFrame);
video.cancelVideoFrameCallback(handle);
```

**Объект Metadata**:

- `presentationTime` — временная метка презентации кадра
- `expectedDisplayTime` — когда кадр будет отображён
- `width` — ширина кадра
- `height` — высота кадра
- `mediaTime` — позиция на медиа-шкале времени
- `presentedFrames` — всего представленных кадров
- `processingDuration` — время обработки кадра

**Практическое применение**:

- Видеоэффекты в реальном времени
- Покадровый анализ видео
- Синхронизированные графические наложения
- Видео-игры
- Приложения компьютерного зрения
- Мониторинг производительности

**Источники**:

- [Firefox 132 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132)
- [Safari 17.4 Support](https://webkit.org/blog/14787/webkit-features-in-safari-17-4/)

## 10. Устройства и периферия

### 10.1 Clipboard API (Baseline 2024)

**Статус**: Baseline 2024 (середина 2024)

Полная асинхронная поддержка Clipboard API включая `read()`, `write()`, `readText()` и интерфейс
`ClipboardItem`. Firefox добавил опцию `unsanitized` для чтения сырого HTML.

**Поддержка браузерами**:

- Chrome 66+ с улучшениями в 122+ (2024)
- Firefox 125+ для `readText()`, 127+ для полного API (2024)
- Safari 13.1+ (стабильно в 2024)
- Edge 79+

**Спецификация**: [W3C Clipboard API and Events](https://w3c.github.io/clipboard-apis/)

```javascript
// Чтение текста из буфера обмена
const text = await navigator.clipboard.readText();
console.log('Вставлено:', text);

// Запись текста в буфер обмена
await navigator.clipboard.writeText('Привет, буфер обмена!');

// Чтение полного буфера обмена (изображения, HTML и т.д.)
const clipboardItems = await navigator.clipboard.read();
for (const item of clipboardItems) {
    for (const type of item.types) {
        const blob = await item.getType(type);
        console.log('Тип:', type, 'Данные:', blob);
    }
}

// Запись множественных типов
const item = new ClipboardItem({
    'text/plain': new Blob(['Обычный текст'], { type: 'text/plain' }),
    'text/html': new Blob(['<b>HTML</b>'], { type: 'text/html' }),
});
await navigator.clipboard.write([item]);

// Чтение несанитизированного HTML (Chrome 122+)
const items = await navigator.clipboard.read({ unsanitized: ['text/html'] });

// Практический пример: копирование изображения
async function copyImageToClipboard(imageSrc) {
    const response = await fetch(imageSrc);
    const blob = await response.blob();

    const item = new ClipboardItem({
        [blob.type]: blob,
    });

    await navigator.clipboard.write([item]);
    console.log('Изображение скопировано в буфер обмена');
}
```

**Практическое применение**:

- Операции с буфером обмена в rich text редакторах
- Кнопки копирования в буфер обмена
- Обработка вставки изображений
- Кросс-форматная поддержка буфера обмена
- Кастомный UI буфера обмена

**Источники**:

- [Chrome 122 Features](https://developer.chrome.com/blog/new-in-chrome-122)
- [Firefox 125 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/125)
- [Firefox 127 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/127)
- [W3C Specification](https://w3c.github.io/clipboard-apis/)

### 10.2 Custom Element States (Baseline 2024)

**Статус**: Baseline 2024 (май 2024)

Позволяет кастомным элементам раскрывать внутренние состояния через `CustomStateSet` с CSS
псевдоклассом `:state()`. Даёт кастомным элементам собственные псевдоклассы, как у нативных
элементов.

**Поддержка браузерами**:

- Chrome 90+ — апрель 2021
- Firefox 126+ — май 2024
- Safari 17.4+ — март 2024
- Edge 90+ — апрель 2021

**Спецификация**: WHATWG HTML Living Standard

```javascript
class MyCheckbox extends HTMLElement {
    constructor() {
        super();
        this._internals = this.attachInternals();

        // Добавление кастомного состояния
        this._internals.states.add('checked');
    }

    toggle() {
        if (this._internals.states.has('checked')) {
            this._internals.states.delete('checked');
        } else {
            this._internals.states.add('checked');
        }
    }
}

customElements.define('my-checkbox', MyCheckbox);
```

**CSS**:

```css
/* Стилизация кастомных состояний */
my-checkbox:state(checked) {
    background: blue;
    color: white;
}

my-checkbox:state(indeterminate) {
    background: gray;
}
```

**API**:

- `ElementInternals.states` — возвращает `CustomStateSet`
- `CustomStateSet.add(state)` — добавляет кастомное состояние
- `CustomStateSet.delete(state)` — удаляет состояние
- `CustomStateSet.has(state)` — проверяет наличие состояния
- `:state(stateName)` — CSS псевдокласс

**Практическое применение**:

- Состояния кастомных checkbox/radio
- Состояния загрузки/ошибки для кастомных компонентов
- Управление состоянием сложных UI компонентов
- Компоненты дизайн-системы с согласованной стилизацией состояний

**Источники**:

- [Firefox 126 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/126)
- [MDN: Custom State Pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:state)

## 11. Дополнительные Core APIs

### 11.1 Float16Array

**Статус**: Частичная поддержка (2024)

Typed array для 16-битных чисел с плавающей точкой (half-precision floats). Полезен для обмена
данными с GPU, графических приложений и сценариев, где можно пожертвовать точностью ради памяти.

**Поддержка браузерами**:

- Chrome 129+ — сентябрь 2024
- Firefox 129+ — июль 2024 (экспериментально в 127)
- Safari — не поддерживается (на конец 2024)
- Edge 129+ — сентябрь 2024

```javascript
// Создание Float16Array
const float16 = new Float16Array([1.5, 2.7, 3.14]);

// Поддержка DataView
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);
view.setFloat16(0, 3.14, true); // little-endian
const value = view.getFloat16(0, true); // 3.14

// Округление до точности float16
const rounded = Math.f16round(3.141592653589793); // 3.140625

// Практический пример: обмен данными с WebGPU
async function uploadFloat16DataToGPU(data) {
    const float16Data = new Float16Array(data.length);

    for (let i = 0; i < data.length; i++) {
        float16Data[i] = data[i];
    }

    const buffer = device.createBuffer({
        size: float16Data.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(buffer, 0, float16Data);
    return buffer;
}
```

**Новые API**:

- `Float16Array` — конструктор typed array
- `DataView.prototype.getFloat16(byteOffset, littleEndian)` — чтение float16
- `DataView.prototype.setFloat16(byteOffset, value, littleEndian)` — запись float16
- `Math.f16round(value)` — округление до 16-битной точности с плавающей точкой

**Практическое применение**:

- Обмен данными с WebGPU
- Графические и 3D приложения
- Инференс нейронных сетей
- Среды с ограниченной памятью
- Обработка аудио

**Источники**:

- [Firefox 127 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/127)
- [Firefox 129 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/129)

### 11.2 AbortSignal.any() (Baseline 2024)

**Статус**: Baseline 2024 (март 2024)

Создаёт композитные сигналы отмены из множественных источников, позволяя операциям быть отменёнными
от любого из нескольких источников сигналов.

**Поддержка браузерами**:

- Chrome 116+ — август 2023
- Firefox 124+ — март 2024
- Safari 17.4+ — март 2024
- Edge 116+ — август 2023

```javascript
const userAbortController = new AbortController();
const timeoutSignal = AbortSignal.timeout(5000);

// Композитный сигнал: отмена по действию пользователя ИЛИ таймауту
const compositeSignal = AbortSignal.any([userAbortController.signal, timeoutSignal]);

try {
    const response = await fetch('/api/data', {
        signal: compositeSignal,
    });
    // Обработка ответа
} catch (err) {
    if (err.name === 'AbortError') {
        console.log('Запрос отменён пользователем или таймаутом');
    }
}

// Пользователь может вручную отменить
document.querySelector('#cancel').addEventListener('click', () => {
    userAbortController.abort();
});

// Практический пример: множественные условия отмены
async function fetchWithMultipleAbortConditions(url) {
    const userController = new AbortController();
    const timeoutSignal = AbortSignal.timeout(10000);
    const pageUnloadSignal = AbortSignal.any([
        AbortSignal.timeout(0), // TODO: реализовать сигнал unload
    ]);

    const signal = AbortSignal.any([userController.signal, timeoutSignal, pageUnloadSignal]);

    return fetch(url, { signal });
}
```

**Практическое применение**:

- Таймаут с ручной отменой
- Множественные источники отмены
- Race conditions с возможностью отмены
- Координация сложных асинхронных операций

**Источники**:

- [Firefox 124 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/124)

### 11.3 URL.parse() (Baseline 2024)

**Статус**: Baseline 2024 (сентябрь 2024)

Статический метод, предоставляющий не выбрасывающую исключения альтернативу конструктору URL.
Возвращает `null` при неудачном парсинге вместо выброса исключения.

**Поддержка браузерами**:

- Chrome 126+ — июнь 2024
- Firefox 126+ — май 2024
- Safari 18.0+ — сентябрь 2024
- Edge 126+ — июнь 2024

```javascript
// Конструктор URL выбрасывает исключение при невалидном URL
try {
    const url = new URL('not a url');
} catch (err) {
    console.error('Невалидный URL'); // Исключение выброшено
}

// URL.parse возвращает null
const url = URL.parse('not a url');
if (url === null) {
    console.error('Невалидный URL'); // Без исключения
} else {
    console.log(url.hostname);
}

// Валидный URL
const validUrl = URL.parse('https://example.com/path');
console.log(validUrl.hostname); // 'example.com'

// С базовым URL
const resolved = URL.parse('/path', 'https://example.com');
console.log(resolved?.href); // 'https://example.com/path'

// Практический пример: безопасная валидация
function isValidUrl(string) {
    return URL.parse(string) !== null;
}

function extractDomain(urlString) {
    const url = URL.parse(urlString);
    return url?.hostname ?? null;
}
```

**Практическое применение**:

- Валидация URL без try-catch
- Более безопасный парсинг URL в pipeline
- Условная обработка URL
- Валидация форм

**Источники**:

- [Firefox 126 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/126)
- [WebKit Blog: Safari 18.0](https://webkit.org/blog/15359/webkit-features-in-safari-18-0/)

### 11.4 Text Fragments (Baseline 2024)

**Статус**: Baseline 2024 (сентябрь 2024)

Позволяет создавать ссылки на конкретные текстовые фрагменты и подсвечивать их с использованием
специализированного синтаксиса URL fragment. Пользователи могут делать deep-links на текст без
требования ID элементов.

**Поддержка браузерами**:

- Chrome 80+ — февраль 2020
- Firefox 131+ — сентябрь 2024
- Safari 17.0+ — сентябрь 2023
- Edge 80+ — февраль 2020

**Спецификация**: [WICG Specification](https://wicg.github.io/scroll-to-text-fragment/)

**Синтаксис URL**:

```
https://example.com/page#:~:text=exact%20match
https://example.com/page#:~:text=prefix-,text,-suffix
https://example.com/page#:~:text=start,end
```

**JavaScript детекция**:

```javascript
// Детекция поддержки возможности
if ('fragmentDirective' in document) {
    console.log('Text fragments поддерживаются');
}

// Доступ к fragment directive
console.log(document.fragmentDirective);
```

**CSS стилизация**:

```css
/* Стилизация подсвеченного текста */
::target-text {
    background-color: yellow;
    color: black;
}
```

**Практическое применение**:

- Deep linking к конкретному контенту
- Ссылки на цитаты и цитирование
- Подсветка результатов поиска
- Шеринг контента с точными ссылками
- Перекрёстные ссылки в документации

**Источники**:

- [Firefox 131 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/131)
- [WebKit Blog: Safari 18.0](https://webkit.org/blog/15359/webkit-features-in-safari-18-0/)
- [WICG Specification](https://wicg.github.io/scroll-to-text-fragment/)

## 12. WebAssembly

### 12.1 WebAssembly Tail Call Extension

**Статус**: Частичная поддержка (2024)

Поддержка tail call оптимизации в WebAssembly, позволяющая более эффективную реализацию рекурсивных
алгоритмов без переполнения стека.

**Поддержка браузерами**:

- Chrome 112+ — апрель 2023
- Firefox 121+ — январь 2024
- Safari 18.0+ — сентябрь 2024
- Edge 112+ — апрель 2023

**Практическое применение**:

- Функциональные языки программирования, компилируемые в WebAssembly
- Оптимизация рекурсивных алгоритмов
- Улучшенная производительность WASM модулей

**Источники**:

- [Firefox 121 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/121)
- [WebKit Blog: Safari 18.0](https://webkit.org/blog/15359/webkit-features-in-safari-18-0/)

## 13. Internationalization (Intl)

### 13.1 Intl.Segmenter (Baseline: Widely Available)

**Статус**: Baseline Widely Available (доступно с апреля 2022)

API для локале-зависимой сегментации текста на графемы, слова или предложения.

**Поддержка браузерами**:

- Chrome 87+ — ноябрь 2020
- Firefox 125+ — апрель 2024
- Safari 14.1+ — апрель 2021
- Edge 87+ — ноябрь 2020

```javascript
// Сегментация по словам
const segmenter = new Intl.Segmenter('ru', { granularity: 'word' });
const text = 'Привет, как дела?';

for (const segment of segmenter.segment(text)) {
    console.log(segment.segment, segment.isWordLike);
}

// Сегментация по предложениям
const sentenceSegmenter = new Intl.Segmenter('en', { granularity: 'sentence' });
const sentences = [...sentenceSegmenter.segment('Hello world. How are you?')];

// Сегментация по графемам (для эмодзи и сложных символов)
const graphemeSegmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
const emoji = '👨‍👩‍👧‍👦';
const graphemes = [...graphemeSegmenter.segment(emoji)];
```

**Источники**:

- [Firefox 125 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/125)

### 13.2 Intl.DurationFormat

**Статус**: Частичная поддержка (2024)

Форматирование длительностей времени с учётом локали.

**Поддержка браузерами**:

- Chrome 129+ — сентябрь 2024
- Firefox — не поддерживается
- Safari 16.4+ — март 2023
- Edge 129+ — сентябрь 2024

```javascript
const duration = new Intl.DurationFormat('ru', { style: 'long' });
console.log(
    duration.format({
        hours: 2,
        minutes: 30,
        seconds: 15,
    }),
);
// "2 часа, 30 минут, 15 секунд"
```

## 14. Безопасность и приватность

### 14.1 Fetch Priority (Baseline 2024)

**Статус**: Baseline 2024 (октябрь 2024)

Позволяет разработчикам подсказывать относительный приоритет загрузки ресурсов с использованием
атрибута `fetchpriority` или опции Fetch API.

**Поддержка браузерами**:

- Chrome 101+ — апрель 2022
- Firefox 132+ — октябрь 2024
- Safari 17.2+ — декабрь 2023
- Edge 101+ — апрель 2022

**Спецификация**: WHATWG HTML Living Standard

**HTML синтаксис**:

```html
<!-- Высокий приоритет (загрузить первым) -->
<img src="hero.jpg" fetchpriority="high" alt="Hero" />
<link rel="stylesheet" href="critical.css" fetchpriority="high" />

<!-- Низкий приоритет (загрузить позже) -->
<img src="thumbnail.jpg" fetchpriority="low" alt="Thumbnail" />
<script src="analytics.js" fetchpriority="low"></script>

<!-- Auto (дефолтное поведение браузера) -->
<img src="regular.jpg" fetchpriority="auto" alt="Regular" />
```

**JavaScript синтаксис**:

```javascript
// Fetch API
const response = await fetch('/api/data', {
    priority: 'high',
});

// Preload с приоритетом
const link = document.createElement('link');
link.rel = 'preload';
link.as = 'script';
link.href = 'important.js';
link.fetchPriority = 'high';
document.head.appendChild(link);
```

**Значения**:

- `high` — загрузка с более высоким приоритетом, чем по умолчанию
- `low` — загрузка с более низким приоритетом, чем по умолчанию
- `auto` — дефолтная приоритизация браузера

**Практическое применение**:

- Приоритизация критичных изображений (LCP)
- Депрайоритизация контента ниже fold
- Оптимизация порядка загрузки ресурсов
- Стратегии оптимизации производительности

**Источники**:

- [Firefox 132 Release Notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132)

### 14.2 Speculation Rules API

**Статус**: Chrome-only (2024)

Позволяет браузерам предварительно загружать или предрендерить страницы на основе правил, улучшая
производительность навигации.

**Поддержка браузерами**:

- Chrome 121+ — январь 2024
- Firefox — не поддерживается
- Safari — не поддерживается
- Edge 121+ — январь 2024

**Спецификация**: [WICG Speculation Rules](https://wicg.github.io/nav-speculation/)

```html
<script type="speculationrules">
    {
        "prefetch": [
            {
                "source": "document",
                "where": {
                    "href_matches": "/articles/*"
                },
                "eagerness": "moderate"
            }
        ],
        "prerender": [
            {
                "source": "list",
                "urls": ["/next-page"],
                "eagerness": "immediate"
            }
        ]
    }
</script>
```

**HTTP заголовок**:

```http
Speculation-Rules: "/speculation-rules.json"
```

**Уровни Eagerness**:

- `immediate` — prefetch/prerender немедленно при загрузке страницы
- `eager` — prefetch/prerender при загрузке страницы с небольшой задержкой
- `moderate` — prefetch/prerender при наведении
- `conservative` — prefetch/prerender при pointer down

**Практическое применение**:

- Мгновенная навигация по страницам
- Предзагрузка вероятных пунктов назначения пользователя
- Оптимизация многостраничных приложений
- E-commerce просмотр продуктов
- Контент-тяжёлые веб-сайты

**Источники**:

- [Chrome 121 Features](https://developer.chrome.com/blog/new-in-chrome-121)

## 15. Baseline достижения 2024 года

### Возможности, достигшие Baseline в 2024

**Newly Available (2024)**:

1. **Promise.withResolvers()** (март 2024)
2. **Object.groupBy() / Map.groupBy()** (март 2024)
3. **ArrayBuffer Transfer** (март 2024)
4. **Resizable ArrayBuffer / Growable SharedArrayBuffer** (июль 2024)
5. **Set Methods** (июнь 2024) — `union()`, `intersection()`, `difference()`,
   `symmetricDifference()`, `isSubsetOf()`, `isSupersetOf()`, `isDisjointFrom()`
6. **Iterator Helpers** (сентябрь 2024)
7. **RegExp `v` flag** (сентябрь 2024)
8. **HTMLSelectElement.showPicker()** (март 2024)
9. **Custom Element States** (май 2024)
10. **Screen Wake Lock API** (май 2024)
11. **WebCodecs API** (сентябрь 2024, desktop)
12. **Clipboard API** (середина 2024)
13. **AbortSignal.any()** (март 2024)
14. **URL.parse()** (сентябрь 2024)
15. **Text Fragments** (сентябрь 2024)
16. **Video Frame Callbacks** (октябрь 2024)
17. **Fetch Priority** (октябрь 2024)

**Approaching Baseline (кросс-браузерная поддержка достигнута в 2024)**:

- **Popover API** — Baseline 2025 (январь)
- **View Transitions API** (SPA) — приближается
- **Float16Array** — частичная поддержка

**Limited Availability (2024)**:

- **WebGPU API**
- **Navigation API** (Chrome-only)
- **Speculation Rules API** (Chrome-only)

## 16. Депрекации и удаления

### 16.1 Chrome (2024)

**Удалено**:

- **Mutation Events** — рекомендуется использовать `MutationObserver`
- Продолжение удаления устаревших prefixed APIs

**Задепрекировано**:

- **`unload` event** — рекомендация переходить на `visibilitychange` и `pagehide` для более надёжной
  обработки
- Некоторые WebRTC legacy методы

**Источники**:

- [Chrome Platform Status: Deprecated](https://chromestatus.com/features#deprecated)

### 16.2 Firefox (2024)

**Изменения**:

- Удаление некоторых устаревших WebRTC методов
- Очистка старых экспериментальных API

**Источники**:

- [Firefox Releases (MDN)](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases)

### 16.3 Safari (2024)

**Задепрекировано**:

- Webkit-префиксированные свойства (рекомендация использовать стандартные версии)

**Источники**:

- [WebKit Blog](https://webkit.org/blog/)

## 17. Сводная таблица Baseline статусов

| Возможность                          | Chrome | Firefox | Safari | Baseline статус                      |
| ------------------------------------ | ------ | ------- | ------ | ------------------------------------ |
| **Promise.withResolvers()**          | 119    | 121     | 17.4   | ✅ Baseline 2024 (март)              |
| **Object.groupBy() / Map.groupBy()** | 117    | ❌      | 17.4   | ✅ Baseline 2024 (март)              |
| **ArrayBuffer Transfer**             | 114    | 122     | 17.4   | ✅ Baseline 2024 (март)              |
| **Resizable ArrayBuffer**            | 111    | 128     | 17.4   | ✅ Baseline 2024 (июль)              |
| **Set Methods**                      | 122    | 127     | 17.0   | ✅ Baseline 2024 (июнь)              |
| **Iterator Helpers**                 | 117    | 131     | 17.0   | ✅ Baseline 2024 (сентябрь)          |
| **RegExp `v` flag**                  | 112    | 116     | 18.0   | ✅ Baseline 2024 (сентябрь)          |
| **RegExp Modifiers**                 | 125    | 132     | ❌     | ⏳ Частичная поддержка               |
| **Float16Array**                     | 129    | 129     | ❌     | ⏳ Частичная поддержка               |
| **Popover API**                      | 114    | 125     | 17.0   | ✅ Baseline 2025 (январь)            |
| **View Transitions API (SPA)**       | 111    | ❌      | 18.0   | ⏳ Limited Availability              |
| **View Transitions API (MPA)**       | 126    | ❌      | ❌     | ⏳ Экспериментально                  |
| **Navigation API**                   | 102    | ❌      | ❌     | ⏳ Experimental (Chrome-only)        |
| **WebGPU API**                       | 113    | ❌      | 18.0\* | ⏳ Limited Availability              |
| **WebCodecs API**                    | 94     | 130     | 16.4   | ✅ Baseline 2024 (сентябрь, desktop) |
| **Screen Wake Lock API**             | 84     | 126     | 16.4   | ✅ Baseline 2024 (май)               |
| **Clipboard API (full)**             | 66     | 127     | 13.1   | ✅ Baseline 2024 (середина)          |
| **Custom Element States**            | 90     | 126     | 17.4   | ✅ Baseline 2024 (май)               |
| **AbortSignal.any()**                | 116    | 124     | 17.4   | ✅ Baseline 2024 (март)              |
| **URL.parse()**                      | 126    | 126     | 18.0   | ✅ Baseline 2024 (сентябрь)          |
| **Text Fragments**                   | 80     | 131     | 17.0   | ✅ Baseline 2024 (сентябрь)          |
| **Video Frame Callbacks**            | 83     | 132     | 17.4   | ✅ Baseline 2024 (октябрь)           |
| **Fetch Priority**                   | 101    | 132     | 17.2   | ✅ Baseline 2024 (октябрь)           |
| **HTMLSelectElement.showPicker()**   | 121    | 122     | 17.4   | ✅ Baseline 2024 (март)              |
| **Speculation Rules API**            | 121    | ❌      | ❌     | ⏳ Chrome-only                       |

_\* Safari 18.0 — экспериментальная поддержка_

## 18. Ключевые выводы

### 18.1 Основные тренды 2024 года

1. **Математические операции над коллекциями**: Set Methods предоставляют нативные операции над
   множествами
2. **GPU вычисления**: WebGPU открывает новую эру высокопроизводительных графических и
   вычислительных приложений
3. **Эффективность памяти**: Float16Array, Resizable ArrayBuffer, ArrayBuffer Transfer для
   оптимизации работы с памятью
4. **Ленивые вычисления**: Iterator Helpers для эффективной обработки больших наборов данных
5. **Улучшенная асинхронность**: Promise.withResolvers(), AbortSignal.any() для более гибкого
   управления асинхронными операциями
6. **Нативные UI паттерны**: Popover API стандартизирует всплывающие элементы
7. **Медиа обработка**: WebCodecs и Video Frame Callbacks для продвинутой работы с видео
8. **Unicode и интернационализация**: RegExp `v` flag, улучшенная поддержка сложных скриптов

### 18.2 Технологии, готовые к production

**Безопасно использовать** (Baseline 2024):

- ✅ Promise.withResolvers()
- ✅ Object.groupBy() / Map.groupBy() (за исключением Firefox)
- ✅ ArrayBuffer Transfer
- ✅ Resizable ArrayBuffer / Growable SharedArrayBuffer
- ✅ Set Methods
- ✅ Iterator Helpers
- ✅ RegExp `v` flag
- ✅ Screen Wake Lock API
- ✅ Custom Element States
- ✅ AbortSignal.any()
- ✅ URL.parse()
- ✅ Text Fragments
- ✅ Video Frame Callbacks
- ✅ Fetch Priority
- ✅ Clipboard API
- ✅ HTMLSelectElement.showPicker()

**Требуют progressive enhancement**:

- ⚠️ Popover API — Baseline 2025 (январь), безопасно с fallback
- ⚠️ View Transitions API — feature detection, только Chrome/Safari
- ⚠️ WebCodecs API — Baseline 2024, desktop only
- ⚠️ WebGPU API — только Chrome/Edge и Safari (экспериментально)
- ⚠️ Float16Array — только Chrome/Firefox
- ⚠️ RegExp Modifiers — только Chrome/Firefox

**Экспериментальные** (не рекомендуется для production):

- ⚠️ Navigation API (Chrome-only)
- ⚠️ Speculation Rules API (Chrome-only)
- ⚠️ Cross-document View Transitions

### 18.3 Рекомендации по adoption

1. **Немедленно внедрять**:
    - Set Methods для работы с коллекциями
    - Iterator Helpers для оптимизации обработки данных
    - Promise.withResolvers() для улучшения управления промисами
    - ArrayBuffer Transfer для эффективной работы с бинарными данными
    - URL.parse() для безопасного парсинга URL
    - AbortSignal.any() для сложных сценариев отмены

2. **Использовать с feature detection**:
    - Popover API для стандартных всплывающих элементов
    - View Transitions API для плавных переходов в современных браузерах
    - WebCodecs API для продвинутой медиа-обработки
    - WebGPU API для высокопроизводительной графики (с fallback на WebGL)

3. **Следить за развитием**:
    - Navigation API (ожидается расширение поддержки)
    - Float16Array (Safari implementation pending)
    - RegExp Modifiers (Safari implementation pending)
    - View Transitions MPA (расширение поддержки)

4. **Полифиллы и транспиляция**:
    - Set Methods — доступны полифиллы для старых браузеров
    - Iterator Helpers — транспиляция через Babel
    - Object.groupBy() — простой полифилл

## 19. Источники

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

### Версии браузеров (2024)

- **Chrome**: 121 (январь) — 132 (декабрь)
- **Firefox**: 121 (январь) — 133 (декабрь)
- **Safari**: 17.2 (декабрь 2023) — 18.2 (декабрь 2024)
- **Edge**: 121 (январь) — 132 (декабрь)

### Ключевые релизы 2024

**Chrome**:

- Chrome 121: Speculation Rules API
- Chrome 122: WebGL drawingBufferStorage
- Chrome 123: NavigationActivation Interface
- Chrome 125: RegExp Modifiers, Declarative Shadow DOM enhancements
- Chrome 126: URL.parse(), MPA View Transitions
- Chrome 128: Promise.try()
- Chrome 129: Float16Array
- Chrome 130: WebGPU dual source blending

**Firefox**:

- Firefox 121: Promise.withResolvers(), WebAssembly Tail Calls
- Firefox 122: ArrayBuffer Transfer, Popover API (experimental)
- Firefox 124: AbortSignal.any(), WebSocket enhancements
- Firefox 125: Popover API, Intl.Segmenter
- Firefox 126: Custom Element States, Screen Wake Lock, URL.parse()
- Firefox 127: Set Methods, Clipboard API, Float16Array (experimental)
- Firefox 128: Resizable ArrayBuffer
- Firefox 129: Float16Array
- Firefox 130: WebCodecs API
- Firefox 131: Iterator Helpers, Text Fragments
- Firefox 132: RegExp Modifiers, Video Frame Callbacks, Fetch Priority

**Safari**:

- Safari 17.4: Promise.withResolvers(), Object.groupBy(), ArrayBuffer Transfer, Custom Element
  States
- Safari 18.0: RegExp `v` flag, View Transitions API (SPA), WebGPU (experimental), URL.parse()

---

- **Дата создания отчёта**: 18.11.2025
- **Research ID**: `frontend-baseline-2023-2025`
- **Автор**: DeepResearch Agent
- **Связанные отчёты**: [JavaScript 2023](../2023/javascript.md), [HTML 2024](./html.md),
  [CSS 2024](./css.md), [HTTP/Security 2024](./http-security.md)
