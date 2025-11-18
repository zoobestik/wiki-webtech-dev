---
title: HTML — изменения 2023 года
description: Комплексный обзор изменений в HTML за 2023 год - новые элементы, атрибуты, Baseline статусы и практические рекомендации
outline: deep
lastUpdated: true
---

# HTML — изменения 2023 года

- **Период**: 1 января 2023 — 31 декабря 2023
- **Версии браузеров**: Chrome/Edge 109–120, Firefox 109–120, Safari 16.3–17.2

## Обзор года

2023 год стал периодом консолидации и достижения межбраузерной совместимости для множества HTML-технологий. Ключевые темы года:

- **Семантический HTML**: появление элемента `<search>`
- **Декларативный UI**: Popover API и атрибут `name` для `<details>`
- **Baseline-достижения**: `<dialog>`, `inert`, `loading="lazy"` для iframe
- **Accessibility**: фокус Interop 2023 на доступности (1300+ новых тестов)
- **Декларативный Shadow DOM**: поддержка в Safari 16.4

## 1. Новые элементы

### 1.1 Элемент `<search>`

**Статус**: Baseline Widely Available (октябрь 2023)

Семантический контейнер для группировки элементов, связанных с поиском или фильтрацией контента.

**Поддержка браузерами**:

- Safari 17.0 — сентябрь 2023 (первая реализация)
- Firefox 118 — 26 сентября 2023
- Chrome 118 — октябрь 2023

**Спецификация**: [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element) (добавлен 24 марта 2023, [PR #7320](https://github.com/whatwg/html/pull/7320))

**Практическое применение**:

Элемент `<search>` автоматически создаёт `search` landmark для вспомогательных технологий, устраняя необходимость использования `role="search"` на `<div>` или `<form>`.

```html
<!-- Старый подход -->
<div class="search-box" role="search">
    <form>
        <input type="search" name="q" placeholder="Поиск..." />
        <button>Найти</button>
    </form>
</div>

<!-- Новый подход с <search> -->
<search>
    <form>
        <input type="search" name="q" placeholder="Поиск..." />
        <button>Найти</button>
    </form>
</search>
```

**Рекомендации**:

- Безопасно использовать в production с октября 2023
- Для обратной совместимости с устаревшими браузерами можно временно сохранять `role="search"` (progressive enhancement)

**Источники**:

- [The search element — Scott O'Hara](https://www.scottohara.me/blog/2023/03/24/search-element.html)
- [MDN: `<search>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search)
- [WebKit Features in Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)

## 2. Новые атрибуты

### 2.1 Атрибут `name` для `<details>`

**Статус**: НЕ достиг Baseline в 2023 (отсутствует поддержка Firefox)

Группирует несколько элементов `<details>` в эксклюзивный аккордеон, где открытие одного элемента автоматически закрывает другие.

**Поддержка браузерами**:

- Safari 17.0 — сентябрь 2023
- Chrome 120 — декабрь 2023
- Firefox — не поддерживается (на конец 2023)

**Спецификация**: [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element) ([PR #9400](https://github.com/whatwg/html/pull/9400))

**Практическое применение**:

```html
<!-- Эксклюзивный аккордеон: только один элемент открыт одновременно -->
<details name="faq">
    <summary>Как создать аккаунт?</summary>
    <p>Нажмите кнопку «Регистрация» в верхнем правом углу...</p>
</details>

<details name="faq">
    <summary>Как восстановить пароль?</summary>
    <p>Используйте ссылку «Забыли пароль?» на странице входа...</p>
</details>

<details name="faq">
    <summary>Как удалить аккаунт?</summary>
    <p>Перейдите в раздел настроек аккаунта...</p>
</details>
```

**Рекомендации**:

- Требуется polyfill для Firefox в production
- Подходит для FAQ, настроек, навигационных меню
- Альтернатива: использовать JavaScript для эксклюзивности до достижения Baseline

**Источники**:

- [GitHub PR #9400: Add name attribute for grouping details](https://github.com/whatwg/html/pull/9400)
- [WebKit Features in Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)

### 2.2 Атрибут `loading="lazy"` для `<iframe>`

**Статус**: Baseline Widely Available (декабрь 2023)

Отложенная загрузка iframe-элементов, аналогично существующей функциональности для изображений.

**Поддержка браузерами**:

- Chrome 77 — август 2019
- Safari 16.4 — 27 марта 2023 ⭐
- Firefox 121 — декабрь 2023 ⭐

**Практическое применение**:

Откладывает загрузку iframe-элементов до момента приближения к видимой области. Критично для страниц с множественными встраиваниями (YouTube, карты, виджеты соцсетей).

```html
<!-- Iframe загружается только при приближении к viewport -->
<iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    loading="lazy"
    width="560"
    height="315"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
>
</iframe>

<!-- Карта Google Maps с lazy loading -->
<iframe
    src="https://www.google.com/maps/embed?pb=..."
    loading="lazy"
    width="600"
    height="450"
    style="border:0;"
    allowfullscreen=""
    referrerpolicy="no-referrer-when-downgrade"
>
</iframe>
```

**Метрики производительности**:

- Уменьшение initial payload на 20–50% для страниц с множественными iframe
- Снижение Time to Interactive (TTI)
- Экономия трафика для пользователей

**Рекомендации**:

- Использовать для всех below-the-fold iframe
- Критичные iframe (above-the-fold) должны загружаться немедленно: `loading="eager"` (по умолчанию)
- Комбинировать с `<img loading="lazy">` для комплексной оптимизации

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)
- [MDN: Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)

### 2.3 Popover API — атрибуты `popover`, `popovertarget`, `popovertargetaction`

**Статус**: НЕ достиг Baseline в 2023 → Baseline Newly Available (январь 2025)

Декларативный способ создания всплывающих элементов с встроенным управлением фокусом, закрытием по Escape и backdrop-слоем.

**Поддержка браузерами**:

- Chrome 114 — май 2023
- Safari 17.0 — сентябрь 2023
- Firefox 125 — апрель 2024 (полная поддержка)

**Спецификация**: [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/popover.html)

**Варианты использования**:

```html
<!-- Auto popover: автоматическое закрытие при клике вне -->
<button popovertarget="menu">Открыть меню</button>

<div id="menu" popover="auto">
    <nav>
        <a href="/profile">Профиль</a>
        <a href="/settings">Настройки</a>
        <a href="/logout">Выход</a>
    </nav>
</div>

<!-- Manual popover: требует явного закрытия -->
<button popovertarget="settings" popovertargetaction="toggle">⚙️ Настройки</button>

<div id="settings" popover="manual">
    <h3>Настройки</h3>
    <label> <input type="checkbox" /> Тёмная тема </label>
    <button popovertarget="settings" popovertargetaction="hide">Закрыть</button>
</div>
```

**Встроенная функциональность**:

- ✅ Управление фокусом (focus trap для `auto`)
- ✅ Закрытие по клавише Escape
- ✅ Backdrop (для `popover="auto"`)
- ✅ Top layer positioning (всегда поверх остального контента)
- ✅ Автоматические ARIA-атрибуты

**JavaScript API**:

```javascript
const popover = document.getElementById('menu');

// Методы
popover.showPopover();
popover.hidePopover();
popover.togglePopover();

// События
popover.addEventListener('toggle', (event) => {
    console.log(event.newState); // 'open' или 'closed'
});

popover.addEventListener('beforetoggle', (event) => {
    // Можно отменить через event.preventDefault()
    if (event.newState === 'open') {
        console.log('Popover открывается');
    }
});
```

**CSS стилизация**:

```css
/* Стили для открытого popover */
[popover]:popover-open {
    opacity: 1;
    transform: translateY(0);
}

/* Стили для закрытого popover (опционально) */
[popover]:not(:popover-open) {
    opacity: 0;
    transform: translateY(-10px);
}

/* Стилизация backdrop для auto popover */
[popover='auto']::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
}

/* Анимация появления/исчезновения (требует @starting-style) */
[popover] {
    transition:
        opacity 0.3s,
        transform 0.3s,
        overlay 0.3s allow-discrete,
        display 0.3s allow-discrete;
}
```

**Рекомендации**:

- В 2023 требовался fallback для Firefox (проверка `'popover' in HTMLElement.prototype`)
- С января 2025 (Baseline) безопасно использовать без fallback
- Предпочтительнее custom решений на базе JavaScript (меньше кода, лучше accessibility)
- Использовать для: меню, тултипов, модальных окон, уведомлений

**Источники**:

- [Introducing the Popover API — Chrome for Developers](https://developer.chrome.com/blog/introducing-popover-api)
- [Popover API lands in Baseline](https://web.dev/blog/popover-api)
- [MDN: Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

### 2.4 Declarative Shadow DOM — атрибут `shadowrootmode`

**Статус**: НЕ достиг Baseline в 2023 (отсутствует поддержка Firefox)

Позволяет декларативно создавать Shadow DOM в HTML без JavaScript.

**Поддержка браузерами**:

- Chrome 90 — апрель 2021
- Safari 16.4 — 27 марта 2023 ⭐
- Firefox — в разработке (на конец 2023)

**Спецификация**: [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)

**Практическое применение**:

Устраняет "вспышку нестилизованного контента" (FOUC) для веб-компонентов, позволяя серверу отправлять полностью сформированную разметку с инкапсулированными стилями.

```html
<custom-card>
    <template shadowrootmode="open">
        <style>
            :host {
                display: block;
                padding: 1.5rem;
                border: 1px solid #ddd;
                border-radius: 8px;
                background: white;
            }
            h2 {
                margin: 0 0 1rem;
                color: #333;
            }
            ::slotted(p) {
                color: #666;
                line-height: 1.6;
            }
        </style>
        <h2><slot name="title">Заголовок по умолчанию</slot></h2>
        <slot></slot>
    </template>

    <!-- Light DOM content -->
    <span slot="title">Пользовательский заголовок</span>
    <p>Содержимое карточки, которое попадёт в default slot.</p>
</custom-card>
```

**Server-Side Rendering (SSR)**:

```html
<!-- HTML, отправленный сервером (Next.js, Remix, и т.д.) -->
<!DOCTYPE html>
<html>
    <head>
        <title>SSR with Declarative Shadow DOM</title>
    </head>
    <body>
        <my-component>
            <template shadowrootmode="open">
                <style>
                    /* Стили инкапсулированы */
                </style>
                <h1>Контент отрендерен на сервере</h1>
                <slot></slot>
            </template>
            <p>Light DOM content</p>
        </my-component>
    </body>
</html>
```

**Преимущества**:

- ✅ Мгновенный рендеринг без JavaScript
- ✅ Стиль инкапсулирован (не утекает наружу)
- ✅ SEO-friendly (контент виден поисковым системам)
- ✅ Улучшенная производительность (нет FOUC)

**Рекомендации**:

- Требуется polyfill для Firefox в production
- Идеально для SSR-фреймворков с веб-компонентами
- Проверка поддержки: `HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode')`

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)
- [Declarative Shadow DOM — web.dev](https://web.dev/declarative-shadow-dom/)

### 2.5 Событие `cancel` для `<input type="file">`

**Статус**: Широко поддерживается (Safari 16.4+, Chrome 113+)

Срабатывает, когда пользователь закрывает диалог выбора файла без выбора.

**Поддержка браузерами**:

- Chrome 113 — май 2023
- Safari 16.4 — 27 марта 2023
- Firefox — требует уточнения

**Практическое применение**:

```html
<label for="avatar">Загрузить аватар:</label>
<input type="file" id="avatar" accept="image/*" />
<div id="loading" style="display:none;">Загрузка...</div>

<script>
    const input = document.getElementById('avatar');
    const loader = document.getElementById('loading');

    input.addEventListener('click', () => {
        // Показываем loader при открытии диалога
        loader.style.display = 'block';
    });

    input.addEventListener('change', () => {
        if (input.files.length > 0) {
            console.log('Файл выбран:', input.files[0].name);
            // Продолжаем загрузку...
        }
    });

    input.addEventListener('cancel', () => {
        // Пользователь закрыл диалог без выбора
        loader.style.display = 'none';
        console.log('Выбор файла отменён');
    });
</script>
```

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

## 3. Baseline-достижения 2023

### 3.1 Элемент `<dialog>` — Baseline Widely Available

**Статус**: Достиг Widely Available в мае–июне 2023

Нативный элемент для создания модальных и немодальных диалогов.

**Поддержка браузерами**:

- Chrome 37 — август 2014
- Firefox 98 — март 2022
- Safari 15.4 — март 2022 (последний недостающий браузер)

**Ключевые методы**:

```javascript
const dialog = document.getElementById('my-dialog');

// Модальный диалог (с backdrop, фокус заблокирован внутри)
dialog.showModal();

// Немодальный диалог (без backdrop, фокус не заблокирован)
dialog.show();

// Закрытие диалога
dialog.close('returnValue'); // Опционально передать значение
```

**Пример использования**:

```html
<dialog id="confirm-dialog">
    <form method="dialog">
        <h2>Подтвердите действие</h2>
        <p>Вы действительно хотите удалить этот элемент?</p>
        <menu>
            <button value="cancel">Отмена</button>
            <button value="confirm" autofocus>Удалить</button>
        </menu>
    </form>
</dialog>

<button onclick="showConfirmDialog()">Удалить элемент</button>

<script>
    const dialog = document.getElementById('confirm-dialog');

    function showConfirmDialog() {
        dialog.showModal();
    }

    dialog.addEventListener('close', () => {
        if (dialog.returnValue === 'confirm') {
            console.log('Пользователь подтвердил удаление');
            // Выполнить удаление...
        }
    });
</script>

<style>
    dialog {
        border: none;
        border-radius: 8px;
        padding: 0;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
    }

    dialog form {
        padding: 1.5rem;
    }

    dialog menu {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        padding: 0;
        margin: 1rem 0 0;
    }
</style>
```

**Встроенная функциональность**:

- ✅ Управление фокусом (focus trap в модальном режиме)
- ✅ Закрытие по Escape (в модальном режиме)
- ✅ Backdrop с псевдоэлементом `::backdrop`
- ✅ Top layer positioning
- ✅ Форма с `method="dialog"` автоматически закрывает диалог

**Источники**:

- [MDN: `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [WebKit: Introducing the Dialog Element](https://webkit.org/blog/12209/introducing-the-dialog-element/)

### 3.2 Атрибут `inert` — Baseline Newly Available (апрель 2023)

**Статус**: Baseline Newly Available (апрель 2023)

Глобальный булевый атрибут, делающий элемент и все его потомки инертными (недоступными для взаимодействия).

**Поддержка браузерами**:

- Chrome 102 — май 2022
- Edge 102 — май 2022
- Safari 15.5 — май 2022
- Firefox 112 — апрель 2023 ⭐ (последний)

**Эффекты `inert`**:

- ❌ События клика не срабатывают
- ❌ Элемент не может получить фокус (`Tab`, `Shift+Tab` пропускают)
- ❌ Исключается из accessibility tree (невидим для скринридеров)
- ❌ Не индексируется поиском по странице (`Ctrl+F` / `Cmd+F`)

**Практическое применение**:

```html
<!-- Блокировка фонового контента при открытом модальном окне -->
<div id="app" inert>
    <header>
        <h1>Мой сайт</h1>
        <nav>
            <a href="/home">Главная</a>
            <a href="/about">О нас</a>
        </nav>
    </header>
    <main>
        <p>Основной контент страницы...</p>
    </main>
</div>

<dialog id="modal">
    <h2>Модальное окно</h2>
    <p>Фоновый контент заблокирован атрибутом inert.</p>
    <button onclick="closeModal()">Закрыть</button>
</dialog>

<script>
    const app = document.getElementById('app');
    const modal = document.getElementById('modal');

    function openModal() {
        app.inert = true; // Блокируем взаимодействие с фоном
        modal.showModal();
    }

    function closeModal() {
        modal.close();
        app.inert = false; // Разблокируем фон
    }
</script>
```

**Use cases**:

1. **Модальные окна**: блокировка фонового контента
2. **Временно недоступные разделы**: disabled разделы UI
3. **Пошаговые формы**: неактивные шаги wizard
4. **Drawer/sidebar**: блокировка основного контента

**Источники**:

- [MDN: `inert` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert)
- [Chrome Platform Status: inert](https://chromestatus.com/feature/5703266176335872)

## 4. Формы и валидация

### 4.1 CSS псевдоклассы `:user-valid` и `:user-invalid`

**Статус**: Частичная поддержка (Safari 16.5+, Firefox 88+)

Альтернатива `:valid` и `:invalid`, срабатывающая только после взаимодействия пользователя с полем.

**Поддержка браузерами**:

- Firefox 88 — апрель 2021
- Safari 16.5 — май 2023 ⭐
- Chrome — не поддерживается (на конец 2023)

**Проблема с `:invalid`**:

```css
/* Проблема: ошибка показывается сразу при загрузке страницы */
input:invalid {
    border-color: red;
}
```

**Решение с `:user-invalid`**:

```css
/* Ошибка показывается только после взаимодействия */
input:user-invalid {
    border-color: red;
}

input:user-valid {
    border-color: green;
}
```

**Пример формы**:

```html
<form>
    <label for="email">Email:</label>
    <input type="email" id="email" required placeholder="example@domain.com" />
    <span class="error">Введите корректный email</span>

    <button type="submit">Отправить</button>
</form>

<style>
    /* Скрываем сообщение об ошибке по умолчанию */
    .error {
        display: none;
        color: red;
        font-size: 0.875rem;
    }

    /* Показываем после некорректного ввода */
    input:user-invalid + .error {
        display: block;
    }

    /* Стилизация поля */
    input:user-invalid {
        border: 2px solid red;
    }

    input:user-valid {
        border: 2px solid green;
    }

    /* Fallback для браузеров без поддержки :user-* */
    @supports not selector(:user-invalid) {
        input:invalid:not(:focus):not(:placeholder-shown) {
            border-color: red;
        }
        input:invalid:not(:focus):not(:placeholder-shown) + .error {
            display: block;
        }
    }
</style>
```

**Рекомендации**:

- Использовать с fallback на `:invalid` + классы состояния
- Значительно улучшает UX форм (без раздражающих ошибок при загрузке)
- Следить за поддержкой в Chrome (ожидается в будущих версиях)

**Источники**:

- [MDN: `:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-invalid)
- [MDN: `:user-valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:user-valid)

### 4.2 Атрибут `list` для `<input type="range">`

**Статус**: Поддержка в Chrome/Edge, Safari; Firefox частично

Связывает range input с `<datalist>` для отображения визуальных маркеров на шкале.

**Пример**:

```html
<label for="volume">Громкость:</label>
<input type="range" id="volume" min="0" max="100" step="10" value="50" list="volume-markers" />
<datalist id="volume-markers">
    <option value="0" label="Тихо"></option>
    <option value="50" label="Средне"></option>
    <option value="100" label="Громко"></option>
</datalist>
```

**Источники**:

- [WebKit Features in Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

### 4.3 Элемент `<hr>` внутри `<select>` (Safari 17.0)

**Статус**: Только Safari (на конец 2023)

Позволяет добавлять визуальные разделители между группами опций.

**Пример**:

```html
<label for="country">Выберите страну:</label>
<select id="country">
    <option>Россия</option>
    <option>Казахстан</option>
    <hr />
    <option>США</option>
    <option>Канада</option>
    <hr />
    <option>Франция</option>
    <option>Германия</option>
</select>
```

**Источники**:

- [WebKit Features in Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)

## 5. Мобильная оптимизация

### 5.1 Атрибут `enterkeyhint`

**Статус**: Широко поддерживается (Chrome, Safari, Firefox)

Определяет надпись/иконку на клавише Enter виртуальной клавиатуры.

**Значения**:

- `enter` — "Enter" (по умолчанию)
- `done` — "Готово" / "Done"
- `go` — "Перейти" / "Go"
- `next` — "Далее" / "Next"
- `previous` — "Назад" / "Previous"
- `search` — "Поиск" / иконка лупы
- `send` — "Отправить" / "Send"

**Пример**:

```html
<!-- Поле поиска -->
<input type="search" enterkeyhint="search" placeholder="Поиск товаров..." />

<!-- Многошаговая форма -->
<input type="text" enterkeyhint="next" placeholder="Имя" />

<!-- Чат -->
<input type="text" enterkeyhint="send" placeholder="Введите сообщение..." />

<!-- Email (последнее поле) -->
<input type="email" enterkeyhint="done" placeholder="Email" />
```

**Рекомендации**:

- Использовать для улучшения UX на мобильных устройствах
- Особенно важно для форм с несколькими полями

**Источники**:

- [MDN: `enterkeyhint`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint)

### 5.2 Атрибут `inputmode`

**Статус**: Широко поддерживается

Указывает оптимальный тип виртуальной клавиатуры для поля ввода.

**Значения**:

- `none` — без клавиатуры
- `text` — стандартная текстовая клавиатура
- `decimal` — цифровая клавиатура с десятичной точкой
- `numeric` — цифровая клавиатура (0-9)
- `tel` — телефонная клавиатура
- `search` — клавиатура для поиска (с кнопкой "Go")
- `email` — email клавиатура (с `@` и `.`)
- `url` — URL клавиатура (с `/`, `.com`)

**Пример**:

```html
<!-- Ввод кредитной карты (только цифры) -->
<input type="text" inputmode="numeric" pattern="[0-9]*" placeholder="1234 5678 9012 3456" />

<!-- Цена (с десятичной точкой) -->
<input type="text" inputmode="decimal" placeholder="19.99" />

<!-- Телефон -->
<input type="tel" inputmode="tel" placeholder="+7 (999) 123-45-67" />
```

**Источники**:

- [MDN: `inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode)

## 6. Ресурсы и производительность

### 6.1 Resource Hint: `rel="modulepreload"`

**Статус**: Baseline (широкая поддержка после Safari 17.0)

Предзагрузка JavaScript-модулей (ES modules).

**Поддержка браузерами**:

- Chrome 66 — апрель 2018
- Edge 79 — январь 2020
- Safari 17.0 — сентябрь 2023 ⭐
- Firefox 115 — июль 2023 ⭐

**Пример**:

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- Предзагрузка основного модуля -->
        <link rel="modulepreload" href="/js/app.js" />

        <!-- Предзагрузка зависимостей -->
        <link rel="modulepreload" href="/js/utils.js" />
        <link rel="modulepreload" href="/js/components.js" />
    </head>
    <body>
        <script type="module" src="/js/app.js"></script>
    </body>
</html>
```

**Рекомендации**:

- Использовать для критических модулей
- Не злоупотреблять (снижает приоритет других ресурсов)
- Комбинировать с `preconnect` для внешних модулей

**Источники**:

- [MDN: `rel="modulepreload"`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload)
- [WebKit Features in Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)

## 7. Web Application Manifest

### 7.1 Поле `id` в манифесте

**Статус**: Поддержка в Chrome, Edge

Уникальный идентификатор веб-приложения для различения multiple installations одного origin.

**Пример `manifest.json`**:

```json
{
    "id": "/my-app/",
    "name": "My Progressive Web App",
    "short_name": "MyApp",
    "start_url": "/my-app/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [
        {
            "src": "/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
}
```

**Источники**:

- [MDN: Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)

## 8. Interop 2023 и Accessibility

### 8.1 Interop 2023: Forms

Фокусная область Interop 2023 для улучшения поддержки форм:

- Стандартизация стилизации элементов форм
- Улучшение поддержки псевдоклассов (`:checked`, `:disabled`, `:focus`, и др.)
- Консистентность валидации

**Источники**:

- [Interop 2023 Dashboard](https://wpt.fyi/interop-2023)

### 8.2 Interop 2023: Accessibility Investigation

Расследование состояния поддержки accessibility features:

- **1300+ новых тестов** добавлено в web-platform-tests
- Тестирование HTML-AAM (Accessibility API Mappings)
- Проверка WAI-ARIA implementation

**Результаты**:

- Выявлены несоответствия между браузерами
- План по улучшению accessibility поддержки
- Фундамент для будущих Interop фокусов

**Источники**:

- [Interop 2023: Accessibility](https://webkit.org/blog/13987/webkit-features-in-safari-16-4/#accessibility)
- [web-platform-tests GitHub](https://github.com/web-platform-tests/wpt)

## 9. Deprecations и removals

### 9.1 Значимые deprecations

**На конец 2023 года не зафиксировано критических HTML deprecations.**

Большинство deprecations касаются JavaScript APIs и безопасности (см. отчёты по JavaScript и Security за 2023).

## 10. Сводная таблица Baseline статусов

| Возможность                         | Chrome | Firefox | Safari | Baseline статус                |
| ----------------------------------- | ------ | ------- | ------ | ------------------------------ |
| **`<search>`**                      | 118    | 118     | 17.0   | ✅ Widely Available (окт 2023) |
| **`<details name>`**                | 120    | ❌      | 17.0   | ❌ Не достигнут                |
| **`loading="lazy"` (iframe)**       | 77     | 121     | 16.4   | ✅ Widely Available (дек 2023) |
| **Popover API**                     | 114    | 125\*   | 17.0   | ⏳ Newly Available (янв 2025)  |
| **Declarative Shadow DOM**          | 90     | ❌      | 16.4   | ❌ Не достигнут                |
| **`<dialog>`**                      | 37     | 98      | 15.4   | ✅ Widely Available (май 2023) |
| **`inert`**                         | 102    | 112     | 15.5   | ✅ Newly Available (апр 2023)  |
| **`:user-valid` / `:user-invalid`** | ❌     | 88      | 16.5   | ❌ Не достигнут                |
| **`rel="modulepreload"`**           | 66     | 115     | 17.0   | ✅ Widely Available (сен 2023) |

_\* Firefox 125 (апрель 2024)_

## 11. Ключевые выводы

### 11.1 Основные тренды 2023 года

1. **Семантический HTML**: Продолжение развития семантической разметки (`<search>`)
2. **Декларативный подход**: Создание интерактивных интерфейсов без JavaScript (Popover, `<details name>`)
3. **Accessibility First**: Фокус на встроенной доступности (Interop 2023 Accessibility Investigation)
4. **Интероперабельность**: Множество возможностей достигли Baseline (`<dialog>`, `inert`, `loading="lazy"`)
5. **Мобильный UX**: Улучшения для виртуальных клавиатур (`enterkeyhint`, `inputmode`)
6. **Производительность**: Native lazy loading для iframe, `modulepreload`

### 11.2 Технологии, готовые к production

**Безопасно использовать**:

- ✅ `<search>` (с fallback `role="search"`)
- ✅ `<dialog>` (Baseline Widely Available)
- ✅ `inert` (Baseline Newly Available)
- ✅ `loading="lazy"` для `<img>` и `<iframe>`
- ✅ `enterkeyhint`, `inputmode` (мобильная оптимизация)
- ✅ `rel="modulepreload"` (после Safari 17.0)

**Требуют progressive enhancement**:

- ⚠️ Popover API — fallback для старых браузеров (Baseline с янв 2025)
- ⚠️ `<details name>` — polyfill для Firefox
- ⚠️ Declarative Shadow DOM — polyfill для Firefox
- ⚠️ `:user-valid` / `:user-invalid` — fallback на классы состояния

### 11.3 Рекомендации по adoption

1. **Немедленно внедрять**:
    - `<dialog>` вместо custom modal solutions
    - `inert` для блокировки фонового контента
    - `loading="lazy"` для всех below-the-fold медиа
    - `<search>` для поисковых интерфейсов

2. **Использовать с осторожностью**:
    - Popover API с feature detection
    - `<details name>` с JavaScript fallback для Firefox

3. **Следить за развитием**:
    - Declarative Shadow DOM (Firefox implementation)
    - `:user-valid` / `:user-invalid` (Chrome support)

## 12. Источники

### Официальные релиз-ноуты

- [Chrome Platform Status](https://chromestatus.com/)
- [Firefox Release Notes (MDN)](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases)
- [WebKit Blog](https://webkit.org/blog/)
    - [Safari 16.4](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)
    - [Safari 16.5](https://webkit.org/blog/14154/webkit-features-in-safari-16-5/)
    - [Safari 17.0](https://webkit.org/blog/14445/webkit-features-in-safari-17-0/)

### Спецификации

- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)
- [W3C HTML Accessibility API Mappings (HTML-AAM)](https://www.w3.org/TR/html-aam-1.0/)

### Baseline и совместимость

- [Web Platform Baseline](https://web.dev/baseline)
- [MDN Browser Compatibility Data](https://github.com/mdn/browser-compat-data)
- [Can I Use](https://caniuse.com/)

### Interop 2023

- [Interop 2023 Dashboard](https://wpt.fyi/interop-2023)
- [Interop 2023 on GitHub](https://github.com/web-platform-tests/interop)

### Технические статьи

- [Introducing the Popover API — Chrome for Developers](https://developer.chrome.com/blog/introducing-popover-api)
- [The search element — Scott O'Hara](https://www.scottohara.me/blog/2023/03/24/search-element.html)
- [Declarative Shadow DOM — web.dev](https://web.dev/declarative-shadow-dom/)

- **Дата создания отчёта**: 18.11.2025
- **Research ID**: `frontend-baseline-2023-2025`
- **Автор**: DeepResearch-Claude
- **Связанные отчёты**: [CSS 2023](./css.md), [JavaScript 2023](./javascript.md), [HTTP/Security 2023](./http-security.md)
