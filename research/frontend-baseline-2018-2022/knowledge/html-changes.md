---
title: HTML изменения 2018-2022
description: Детальный обзор новых HTML элементов, атрибутов и стандартов с примерами кода
outline: deep
lastUpdated: true
---

# HTML изменения 2018–2022

## Обзор

Период 2018–2022 характеризуется переходом от дискретных версий HTML (HTML5, HTML 5.1, 5.2, 5.3) к модели **Living Standard** под управлением WHATWG. Ключевые события:

- **28 мая 2019:** W3C передал управление HTML и DOM стандартами WHATWG
- **28 января 2021:** HTML 5.1, 5.2 и 5.3 официально retired в пользу HTML Living Standard
- **Март 2022:** Множество фич достигли cross-browser baseline статуса

## Ключевые институциональные изменения

### WHATWG становится единственным стандартизатором

**До мая 2019:** параллельная разработка W3C HTML5.x и WHATWG HTML Living Standard создавала путаницу и фрагментацию.

**После мая 2019:** WHATWG HTML Living Standard — единственный авторитетный источник HTML спецификации.

**Практическое влияние:**

- Ускорение внедрения новых фич
- Единая точка референса для разработчиков
- Более быстрая эволюция стандарта

## Новые HTML элементы

### `<dialog>` — модальные и немодальные диалоги

**Описание:** Нативный элемент для создания диалоговых окон (модальных и немодальных) без использования JavaScript библиотек.

#### Браузерная поддержка

| Браузер | Первая версия | Дата          |
| ------- | ------------- | ------------- |
| Chrome  | 37            | Сентябрь 2014 |
| Edge    | 79            | Январь 2020   |
| Firefox | 98            | **Март 2022** |
| Safari  | 15.4          | **Март 2022** |

**Baseline статус:** Март 2022 (широко доступно)

#### Ключевые возможности

**Два режима работы:**

1. **Модальный режим** (через `.showModal()`):
    - Блокирует взаимодействие с остальной страницей
    - Автоматически устанавливает `aria-modal="true"`
    - Контент вне диалога становится `inert`
    - Закрывается по `Esc`

2. **Немодальный режим** (через `.show()`):
    - Не блокирует взаимодействие со страницей
    - Может использоваться для persistent UI элементов

**Закрытие диалога:**

- Клавиша `Esc` (для модальных)
- Форма с `method="dialog"`
- JavaScript метод `.close()`
- Атрибут `closedby` (новая фича) — определяет способ закрытия

#### Пример кода

```html
<dialog id="myDialog">
    <form method="dialog">
        <h2>Подтверждение действия</h2>
        <p>Вы уверены, что хотите продолжить?</p>
        <button value="cancel">Отмена</button>
        <button value="confirm">Подтвердить</button>
    </form>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">Открыть диалог</button>

<script>
    const dialog = document.getElementById('myDialog');
    dialog.addEventListener('close', () => {
        console.log('Диалог закрыт со значением:', dialog.returnValue);
    });
</script>
```

#### Стилизация и анимация

**Псевдо-селекторы:**

```css
dialog {
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}
```

**CSS анимации (с 2022):**

```css
dialog {
    opacity: 0;
    transition:
        opacity 0.3s,
        display 0.3s allow-discrete;
}

dialog[open] {
    opacity: 1;
}
```

**Начиная с 2022, поддерживается discrete animation для свойства `display`**, что позволяет анимировать появление/исчезновение диалога.

#### Accessibility

- Автоматически получает корректную ARIA роль
- Управляет фокусом (переход в диалог при открытии)
- `aria-modal="true"` для модальных диалогов
- Поддержка клавиатурной навигации из коробки

#### Историческая справка

До марта 2022 элемент `<dialog>` поддерживался только в Chrome/Edge (Chromium). Разработчикам приходилось использовать:

- Polyfills (например, `dialog-polyfill`)
- Библиотеки (Modal компоненты)

Firefox и Safari **догнали** только в марте 2022, что сделало элемент практически применимым для production без polyfills.

## Новые HTML атрибуты

### Атрибут `loading` — нативная ленивая загрузка

**Применяется к:** `<img>`, `<iframe>`

**Описание:** Позволяет браузеру отложить загрузку off-screen изображений и iframe до момента, когда пользователь прокручивает страницу к ним.

#### Браузерная поддержка

| Браузер | Первая версия     | Дата        |
| ------- | ----------------- | ----------- |
| Chrome  | 76 (за флагом 74) | Июль 2019   |
| Edge    | 79                | Январь 2020 |
| Firefox | 75                | Апрель 2020 |
| Safari  | 15.4              | Март 2022   |

**Baseline статус:** Март 2022

#### Значения атрибута

```html
<img src="image.jpg" loading="lazy" alt="Описание" />
<img src="hero.jpg" loading="eager" alt="Главное изображение" />
<img src="auto.jpg" loading="auto" alt="По умолчанию" />
```

- `lazy` — отложенная загрузка (для off-screen контента)
- `eager` — немедленная загрузка (по умолчанию для критичного контента)
- `auto` — браузер решает сам (default)

#### Производительность

**Исследование Chrome на Android (4G сеть):**

- 97.5% lazy-loaded изображений ниже fold загружаются полностью в течение 10ms после появления в viewport
- 97.6% для non-lazy-loaded изображений
- **Вывод:** практически нет задержки для пользователя, но значительная экономия трафика

#### Пример кода

```html
<!-- Критичное изображение above-the-fold -->
<img src="/hero.jpg" alt="Hero image" loading="eager" />

<!-- Изображения ниже fold -->
<img src="/gallery-1.jpg" alt="Фото 1" loading="lazy" width="400" height="300" />
<img src="/gallery-2.jpg" alt="Фото 2" loading="lazy" width="400" height="300" />

<!-- Lazy-loading для iframe (например, встроенное видео) -->
<iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    loading="lazy"
    width="560"
    height="315"
    title="Видео"
></iframe>
```

**Важно:** Указывайте `width` и `height` для избежания layout shift.

#### Практическое влияние

До нативного `loading="lazy"` разработчики использовали:

- JavaScript библиотеки (Intersection Observer)
- `<noscript>` fallbacks
- Data attributes трюки

Нативный `loading="lazy"` упростил реализацию и улучшил производительность.

### Атрибут `enterkeyhint` — кастомизация Enter клавиши

**Применяется к:** `<input>`, `<textarea>`, и элементы с `contenteditable`

**Описание:** Позволяет указать браузеру, какую иконку/текст отображать на клавише Enter виртуальной клавиатуры.

#### Браузерная поддержка

| Браузер | Первая версия | Дата          |
| ------- | ------------- | ------------- |
| Chrome  | 77            | Сентябрь 2019 |
| Edge    | 79            | Январь 2020   |
| Safari  | 13.1          | Март 2020     |
| Firefox | 94            | Ноябрь 2021   |

**Baseline статус:** Ноябрь 2021

#### Значения атрибута

```html
<input type="text" enterkeyhint="search" />
<input type="text" enterkeyhint="go" />
<input type="text" enterkeyhint="next" />
<input type="text" enterkeyhint="previous" />
<input type="text" enterkeyhint="send" />
<input type="text" enterkeyhint="done" />
<input type="text" enterkeyhint="enter" />
```

#### Пример использования

```html
<form>
    <label>
        Поиск:
        <input type="search" name="query" enterkeyhint="search" placeholder="Введите запрос" />
    </label>
</form>

<form>
    <label>
        Имя:
        <input type="text" name="name" enterkeyhint="next" />
    </label>
    <label>
        Email:
        <input type="email" name="email" enterkeyhint="done" />
    </label>
</form>
```

#### Практическое влияние

Улучшает UX на мобильных устройствах, давая пользователю визуальную подсказку о действии при нажатии Enter.

### Атрибут `inputmode` — тип виртуальной клавиатуры

**Применяется к:** `<input>`, `<textarea>`, и элементы с `contenteditable`

**Описание:** Контролирует, какая виртуальная клавиатура будет показана на мобильных устройствах.

#### Браузерная поддержка

| Браузер | Первая версия | Дата         |
| ------- | ------------- | ------------ |
| Chrome  | 66            | Апрель 2018  |
| Edge    | 79            | Январь 2020  |
| Safari  | 12.2          | Март 2019    |
| Firefox | 95            | Декабрь 2021 |

**Baseline статус:** Декабрь 2021

#### Значения атрибута

```html
<input type="text" inputmode="none" />
<!-- Без клавиатуры -->
<input type="text" inputmode="text" />
<!-- Стандартная клавиатура -->
<input type="text" inputmode="decimal" />
<!-- Числа с десятичной точкой -->
<input type="text" inputmode="numeric" />
<!-- Только цифры -->
<input type="text" inputmode="tel" />
<!-- Телефонная клавиатура -->
<input type="text" inputmode="email" />
<!-- Email клавиатура (с @) -->
<input type="text" inputmode="url" />
<!-- URL клавиатура (с .com, /) -->
<input type="text" inputmode="search" />
<!-- Поисковая клавиатура -->
```

#### Пример кода

```html
<!-- Кастомный числовой input с валидацией -->
<label>
    Введите сумму (USD):
    <input type="text" inputmode="decimal" pattern="[0-9]*\.?[0-9]{0,2}" placeholder="0.00" />
</label>

<!-- Телефонный номер с маской -->
<label>
    Телефон:
    <input type="text" inputmode="tel" placeholder="+7 (___) ___-__-__" />
</label>

<!-- Кастомный datetime picker (без нативной клавиатуры) -->
<label>
    Выберите дату:
    <input type="text" inputmode="none" readonly onclick="openDatePicker()" />
</label>
```

#### Практическое влияние

До `inputmode` разработчикам приходилось использовать `type="number"` для числовых полей, что имело недостатки:

- Спиннеры (стрелки вверх/вниз)
- Нежелательная валидация
- Проблемы с форматированием (маски, разделители)

`inputmode` позволяет отделить **тип клавиатуры** от **типа валидации**.

### Атрибут `inert` — отключение интерактивности

**Применяется к:** любым элементам

**Описание:** Делает элемент и всех его потомков неинтерактивными: они не могут получить фокус, недоступны для assistive technologies, игнорируются при поиске по странице.

#### Браузерная поддержка

| Браузер | Первая версия | Дата                      |
| ------- | ------------- | ------------------------- |
| Chrome  | 102           | Май 2022                  |
| Edge    | 102           | Май 2022                  |
| Firefox | 112           | Апрель 2023 (вне периода) |
| Safari  | 15.5          | Май 2022                  |

**Baseline статус:** За пределами baseline в период 2018–2022 (достиг baseline в 2023)

#### Пример кода

```html
<div inert>
    <p>Этот контент недоступен для взаимодействия</p>
    <button>Эта кнопка не кликабельна</button>
    <a href="/link">Эта ссылка не работает</a>
</div>
```

#### Практическое применение

**Модальные диалоги:** контент под диалогом становится `inert`:

```html
<main id="mainContent">
    <!-- Основной контент страницы -->
</main>

<dialog id="modal">
    <h2>Модальное окно</h2>
    <button onclick="closeModal()">Закрыть</button>
</dialog>

<script>
    function openModal() {
        document.getElementById('mainContent').inert = true;
        document.getElementById('modal').showModal();
    }

    function closeModal() {
        document.getElementById('modal').close();
        document.getElementById('mainContent').inert = false;
    }
</script>
```

**Note:** Нативный `<dialog>` с `.showModal()` автоматически делает внешний контент inert.

#### Историческая справка

До появления `inert` разработчики использовали:

- `aria-hidden="true"` (только для screen readers)
- `tabindex="-1"` на всех интерактивных элементах (сложно)
- JavaScript библиотеки (например, `inert` polyfill от WICG)

### Атрибут `decoding` — контроль декодирования изображений

**Применяется к:** `<img>`

**Описание:** Подсказывает браузеру, как декодировать изображение: синхронно или асинхронно.

#### Браузерная поддержка

| Браузер | Первая версия | Дата         |
| ------- | ------------- | ------------ |
| Chrome  | 65            | Март 2018    |
| Edge    | 79            | Январь 2020  |
| Firefox | 63            | Октябрь 2018 |
| Safari  | 11.1          | Март 2018    |

**Baseline статус:** Март 2018 (с начала исследуемого периода)

#### Значения атрибута

```html
<img src="image.jpg" decoding="sync" alt="Синхронное декодирование" />
<img src="image.jpg" decoding="async" alt="Асинхронное декодирование" />
<img src="image.jpg" decoding="auto" alt="По решению браузера" />
```

- `sync` — декодирование блокирует рендеринг (для критичных изображений)
- `async` — декодирование не блокирует рендеринг (default для большинства)
- `auto` — браузер решает сам

#### Пример использования

```html
<!-- Критичное изображение выше fold -->
<img src="/hero.jpg" decoding="sync" alt="Hero image" fetchpriority="high" />

<!-- Изображения ниже fold -->
<img src="/gallery.jpg" decoding="async" loading="lazy" alt="Галерея" />
```

#### Практическое влияние

В сочетании с `loading` и `fetchpriority` позволяет тонко контролировать загрузку и декодирование изображений для оптимизации Core Web Vitals (LCP, CLS).

### Атрибут `fetchpriority` — приоритет загрузки ресурсов

**Применяется к:** `<img>`, `<link>`, `<script>`

**Описание:** Указывает браузеру приоритет загрузки ресурса относительно других ресурсов того же типа.

#### Браузерная поддержка

| Браузер | Первая версия | Дата                                 |
| ------- | ------------- | ------------------------------------ |
| Chrome  | 101           | Апрель 2022                          |
| Edge    | 101           | Апрель 2022                          |
| Safari  | 17.2          | Декабрь 2023 (вне периода)           |
| Firefox | —             | Не поддерживается в период 2018–2022 |

**Baseline статус:** Вне baseline в период 2018–2022

#### Значения атрибута

```html
<img src="hero.jpg" fetchpriority="high" alt="Важное изображение" />
<img src="icon.jpg" fetchpriority="low" alt="Иконка" />
<img src="default.jpg" fetchpriority="auto" alt="Обычное изображение" />
```

#### Пример использования

```html
<!-- LCP изображение — высокий приоритет -->
<img src="/hero.jpg" fetchpriority="high" decoding="sync" alt="Hero" />

<!-- Предзагрузка критичного CSS -->
<link rel="preload" href="/critical.css" as="style" fetchpriority="high" />

<!-- Некритичный скрипт аналитики -->
<script src="/analytics.js" fetchpriority="low" defer></script>
```

## Улучшения существующих элементов и атрибутов

### Атрибут `autocomplete` — расширенные значения

**Статус в 2018–2022:** Значительное расширение списка токенов для автозаполнения.

#### Новые токены автозаполнения

```html
<!-- Имя -->
<input name="name" autocomplete="name" />
<input name="fname" autocomplete="given-name" />
<input name="lname" autocomplete="family-name" />

<!-- Адрес -->
<input name="street" autocomplete="street-address" />
<input name="city" autocomplete="address-level2" />
<input name="state" autocomplete="address-level1" />
<input name="zip" autocomplete="postal-code" />
<input name="country" autocomplete="country-name" />

<!-- Платёжная информация -->
<input name="cc-number" autocomplete="cc-number" />
<input name="cc-exp" autocomplete="cc-exp" />
<input name="cc-csc" autocomplete="cc-csc" />

<!-- Логин -->
<input name="username" autocomplete="username" />
<input name="password" type="password" autocomplete="current-password" />
<input name="new-password" type="password" autocomplete="new-password" />

<!-- OTP коды -->
<input name="otp" autocomplete="one-time-code" />

<!-- Телефон -->
<input name="phone" type="tel" autocomplete="tel" />

<!-- Email -->
<input name="email" type="email" autocomplete="email" />

<!-- WebAuthn -->
<input name="webauthn" autocomplete="webauthn" />
```

#### Практическое влияние

- Улучшение UX на мобильных устройствах
- Интеграция с менеджерами паролей
- Автозаполнение платёжных данных (Apple Pay, Google Pay)
- Упрощение регистрации и логина

### Responsive изображения — `<picture>`, `srcset`, `sizes`

**Статус в 2018:** Уже baseline (поддержка с 2016–2017)

В период 2018–2022 эти фичи **уже были широко доступны** и активно использовались:

#### Элемент `<picture>`

```html
<picture>
    <source media="(min-width: 1200px)" srcset="large.jpg" />
    <source media="(min-width: 768px)" srcset="medium.jpg" />
    <img src="small.jpg" alt="Responsive image" />
</picture>
```

**Использование:** Art direction — разные кропы/композиции для разных размеров экрана.

#### Атрибуты `srcset` и `sizes`

```html
<img
    src="default.jpg"
    srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w, xlarge.jpg 1600w"
    sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
    alt="Адаптивное изображение"
/>
```

**Использование:** Resolution switching — один и тот же crop, но разные разрешения.

### Валидация форм — атрибуты `minlength`, `maxlength`, `pattern`, `required`

**Статус в 2018–2022:** Все эти атрибуты уже были baseline к началу периода, но активно использовались и улучшались.

#### Браузерная поддержка `minlength`

| Браузер | Первая версия | Дата        |
| ------- | ------------- | ----------- |
| Chrome  | 40            | Январь 2015 |
| Edge    | 17            | Апрель 2018 |
| Firefox | 51            | Январь 2017 |
| Safari  | 10.1          | Март 2017   |

**Baseline статус:** Апрель 2018 (широко доступно с начала периода)

#### Примеры использования

```html
<!-- Минимальная длина пароля -->
<input type="password" name="password" minlength="8" required autocomplete="new-password" />

<!-- Максимальная длина твита -->
<textarea name="tweet" maxlength="280" placeholder="Что происходит?"></textarea>

<!-- Валидация email паттерном -->
<input
    type="email"
    name="email"
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    required
    title="Введите корректный email"
/>

<!-- Валидация телефона -->
<input
    type="tel"
    name="phone"
    pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"
    placeholder="+7 (___) ___-__-__"
    title="Формат: +7 (123) 456-78-90"
/>
```

#### Важные детали

**`minlength` != `required`:**

```html
<!-- Это поле опционально, но если заполнено, то минимум 3 символа -->
<input type="text" name="nickname" minlength="3" />

<!-- Это поле обязательно И минимум 3 символа -->
<input type="text" name="username" minlength="3" required />
```

**Валидация в UTF-16 code units:**

```html
<!-- Emoji = 2 code units -->
<input type="text" name="bio" minlength="10" maxlength="100" />
```

## Депрекации и удаления

### Application Cache (AppCache) — полное удаление

**Статус:** Депрекирован и удалён в период 2018–2022

#### Timeline удаления

| Браузер | Действие                       | Дата                     |
| ------- | ------------------------------ | ------------------------ |
| Chrome  | Депрекация (DevTools warnings) | Январь 2018              |
| Chrome  | Удаление из insecure origins   | Октябрь 2018 (Chrome 70) |
| Chrome  | Disabled by default            | Август 2020 (Chrome 84)  |
| Chrome  | Полное удаление                | Октябрь 2021 (Chrome 95) |
| Firefox | Полное удаление                | Январь 2021 (Firefox 85) |
| Safari  | Депрекация                     | 2018–2020                |

**WHATWG HTML Living Standard:** Вся документация по AppCache **удалена в декабре 2020**.

#### Замена: Service Workers

```html
<!-- УСТАРЕЛО: AppCache manifest -->
<html manifest="app.appcache"></html>
```

```html
<!-- СОВРЕМЕННО: Service Worker -->
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .then((reg) => console.log('SW registered', reg))
            .catch((err) => console.log('SW error', err));
    }
</script>
```

#### Практическое влияние

До удаления AppCache:

- Использовался для offline-first приложений
- Простой API (declarative manifest file)
- Множество проблем: трудности с отладкой, непредсказуемое поведение кеша

После удаления:

- **Service Workers** — единственный путь для offline functionality
- Больше контроля, но сложнее в реализации
- Улучшенная security model (HTTPS only)

### Другие депрекации

#### `<keygen>` — полностью удалён

**Timeline:**

- Chrome удалил в версии 57 (март 2017, до периода исследования)
- Firefox удалил в версии 69 (сентябрь 2019)
- Safari удалил в версии 13 (сентябрь 2019)

**Замена:** Web Crypto API

#### Flash Player — конец эпохи

**Хотя Flash Player не является частью HTML стандарта**, его удаление значительно повлияло на веб:

**Timeline:**

- Декабрь 2020: Adobe прекратил поддержку Flash Player
- Январь 2021: Chrome 88 полностью удалил Flash Player

**Замена:**

- HTML5 `<video>` и `<audio>`
- Canvas API и WebGL для интерактивной графики
- WebAssembly для сложных приложений

## Улучшения семантики и accessibility

### ARIA атрибуты — расширение и улучшение

В период 2018–2022 ARIA (Accessible Rich Internet Applications) атрибуты получили значительное развитие:

#### Новые ARIA атрибуты

```html
<!-- aria-current (уже baseline в 2018) -->
<nav>
    <a href="/" aria-current="page">Главная</a>
    <a href="/about">О нас</a>
</nav>

<!-- aria-describedby и aria-labelledby — улучшенная поддержка -->
<input type="email" id="email" aria-labelledby="email-label" aria-describedby="email-help" />
<label id="email-label">Email</label>
<span id="email-help">Мы не передаём ваш email третьим лицам</span>

<!-- aria-modal (автоматически для <dialog>) -->
<div role="dialog" aria-modal="true">
    <h2 id="dialog-title">Диалог</h2>
    <p>Контент</p>
</div>
```

## Web Components — Template, Slot, Shadow DOM

**Статус в 2018–2022:** Все три технологии **уже были baseline** к началу периода, но активно развивались.

### Элемент `<template>`

**Baseline с:** ~2016 (Chrome 26, Firefox 22, Safari 8)

```html
<template id="card-template">
    <div class="card">
        <h3 class="card-title"></h3>
        <p class="card-content"></p>
    </div>
</template>

<script>
    const template = document.getElementById('card-template');
    const clone = template.content.cloneNode(true);
    clone.querySelector('.card-title').textContent = 'Заголовок';
    clone.querySelector('.card-content').textContent = 'Контент';
    document.body.appendChild(clone);
</script>
```

### Элемент `<slot>`

**Baseline с:** ~2018 (Chrome 53, Firefox 63, Safari 10)

```html
<template id="user-card">
    <style>
        .card {
            border: 1px solid #ccc;
            padding: 16px;
        }
    </style>
    <div class="card">
        <slot name="name">Имя не указано</slot>
        <slot name="bio"></slot>
    </div>
</template>

<user-card>
    <span slot="name">Иван Иванов</span>
    <p slot="bio">Frontend разработчик</p>
</user-card>
```

### Shadow DOM

**Baseline с:** ~2018 (Chrome 53, Firefox 63, Safari 10)

```javascript
class UserCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.getElementById('user-card');
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('user-card', UserCard);
```

#### Декларативный Shadow DOM (Declarative Shadow DOM)

**Новая фича 2020–2021:**

**Браузерная поддержка:**

- Chrome 90 (апрель 2021)
- Edge 91 (май 2021)
- Safari 16.4 (март 2023, вне периода)
- Firefox: не поддерживается в период 2018–2022

```html
<user-card>
    <template shadowrootmode="open">
        <style>
            :host {
                display: block;
            }
            .card {
                border: 1px solid #ccc;
            }
        </style>
        <div class="card">
            <slot></slot>
        </div>
    </template>
    <p>Контент внутри Shadow DOM</p>
</user-card>
```

**Практическое влияние:** Позволяет серверный рендеринг Web Components без hydration через JavaScript.

## Новые input типы и улучшения форм

### Input type improvements

В период 2018–2022 существующие типы `<input>` получили улучшения, но **новых типов не добавлялось**. Основные улучшения:

#### `type="date"`, `"datetime-local"`, `"time"` — улучшенная поддержка

**Safari** улучшил поддержку date/time inputs в период 2018–2020:

- Safari 12.1 (март 2019): улучшения date pickers
- Safari 14.1 (апрель 2021): улучшения datetime-local

```html
<input type="date" name="birthday" min="1900-01-01" max="2010-12-31" />
<input type="datetime-local" name="appointment" />
<input type="time" name="alarm" step="60" />
```

#### `type="color"` — baseline статус

**Baseline с:** Firefox 29 (апрель 2014), Safari 12.1 (март 2019)

```html
<input type="color" name="theme-color" value="#3b82f6" />
```

## Выводы

### Ключевые тренды HTML 2018–2022

1. **Переход к Living Standard:** Завершение перехода от версионных релизов к непрерывной эволюции.

2. **Нативные решения для частых задач:**
    - `<dialog>` заменяет modal библиотеки
    - `loading="lazy"` заменяет lazy-loading библиотеки
    - `enterkeyhint` / `inputmode` улучшают мобильный UX

3. **Удаление legacy технологий:**
    - AppCache → Service Workers
    - Flash Player → HTML5 media

4. **Safari как сдерживающий фактор:**
    - Многие фичи (`<dialog>`, `loading="lazy"`) достигли baseline только после поддержки в Safari (март 2022)

5. **Accessibility first:**
    - Нативные элементы с встроенной accessibility (`<dialog>`)
    - Расширение ARIA спецификации
    - Атрибут `inert` для управления интерактивностью

6. **Performance-ориентированность:**
    - `loading="lazy"` для экономии трафика
    - `decoding` и `fetchpriority` для оптимизации Core Web Vitals

### Практические рекомендации

**Для разработчика, наверстывающего 2018–2022:**

1. **Приоритетные темы для изучения:**
    - `<dialog>` и его API (`.showModal()`, `.close()`, `::backdrop`)
    - `loading="lazy"` для изображений и iframe
    - `enterkeyhint` и `inputmode` для форм

2. **Что можно использовать сегодня без polyfills:**
    - Все вышеперечисленные фичи (с baseline статусом март 2022 и ранее)
    - Responsive images (`<picture>`, `srcset`, `sizes`)
    - Form validation атрибуты
    - Web Components (template, slot, shadow DOM)

3. **Что требует осторожности:**
    - `inert` — baseline после 2022 (нужен polyfill для Firefox до 112)
    - `fetchpriority` — не поддерживается в Firefox в период 2018–2022
    - Declarative Shadow DOM — не поддерживается в Firefox и Safari до 2023

**Источники:**

- WHATWG HTML Living Standard: https://html.spec.whatwg.org
- MDN Web Docs: https://developer.mozilla.org
- Can I Use: https://caniuse.com
- Chrome Platform Status: https://chromestatus.com
- WebKit Feature Status: https://webkit.org/status/
- W3C Blog: https://w3.org/blog

- **Research ID:** `frontend-baseline-2018-2022`
- **Дата создания:** 17.11.2025
- **Методология:** DeepResearch-Claude
