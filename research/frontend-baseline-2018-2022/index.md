---
title: Frontend Baseline 2018-2022
description: Комплексный исследование изменений в HTML, CSS и JavaScript за период 2018-2022
outline: deep
lastUpdated: true
---

# Frontend Development: Изменения 2018–2022

## 🎯 Начните отсюда

Для быстрого старта откройте **[final-report.md](./knowledge/final-report.md)** — комплексный обзор
всего периода с executive summary, timeline, insights и roadmap для изучения.

## 📚 Структура исследования

### Основные документы (knowledge/)

| Файл                                                                       | Описание                                                             | Размер |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------ |
| **[final-report.md](./knowledge/final-report.md)**                         | 🌟 **НАЧАТЬ ЗДЕСЬ** — Executive summary, timeline, insights, roadmap | ~30 KB |
| [browser-timeline.md](./knowledge/browser-timeline.md)                     | Timeline релизов браузеров 2018–2022, baseline методология           | 20 KB  |
| [html-changes.md](./knowledge/html-changes.md)                             | Детальный обзор HTML изменений с примерами кода                      | 36 KB  |
| [css-changes.md](./knowledge/css-changes.md)                               | Comprehensive CSS изменения с практическими примерами                | 28 KB  |
| [javascript-webapis-summary.md](./knowledge/javascript-webapis-summary.md) | Ключевые JavaScript (ES2018–ES2022) и Web APIs изменения             | ~20 KB |
| [scope.md](./knowledge/scope.md)                                           | Границы исследования, критерии, методология                          | 12 KB  |

**Всего:** ~146 KB детальных материалов

## 🔍 Quick Reference

### Ключевые baseline достижения по годам

**2018:**

- CSS Flexbox `gap` в Firefox
- Overscroll-behavior

**2019:**

- Optional chaining в TC39 Stage 3
- `prefers-color-scheme`

**2020:**

- ES2020: optional chaining (`?.`), nullish coalescing (`??`)
- `clamp()`, `min()`, `max()`
- `prefers-reduced-motion`
- Resize Observer

**2021:**

- Flexbox `gap` baseline (апрель)
- `aspect-ratio` baseline (сентябрь)
- `:is()`, `:where()` baseline

**2022:**

- `<dialog>` baseline (март)
- `:focus-visible` baseline (март)
- `:has()` появился (baseline 2023)
- Container Queries появились (baseline 2023)

### Браузерные релизы

- **Chrome:** 45 релизов (64 → 108)
- **Firefox:** 50 релизов (58 → 107)
- **Safari:** 10 мажорных релизов (11.1 → 16)
- **Edge:** 32 Chromium релиза (79 → 108)

## 📖 Рекомендованный порядок чтения

1. **[final-report.md](./knowledge/final-report.md)** — начните здесь для полной картины
2. **[scope.md](./knowledge/scope.md)** — поймите границы и методологию
3. **[browser-timeline.md](./knowledge/browser-timeline.md)** — контекст релизов и baseline
4. Затем углубляйтесь в интересующие технологии:
    - **[html-changes.md](./knowledge/html-changes.md)** — если интересует HTML
    - **[css-changes.md](./knowledge/css-changes.md)** — если интересует CSS
    - **[javascript-webapis-summary.md](./knowledge/javascript-webapis-summary.md)** — если
      интересует JS/APIs

## 💡 Ключевые insights

### Технологические прорывы

- **HTML:** `<dialog>`, native lazy loading, улучшенные формы
- **CSS:** Layout революция (Flexbox gap, aspect-ratio), математические функции, modern селекторы
- **JavaScript:** ES2020 (optional chaining, nullish coalescing), ES2022 (top-level await)

### Институциональные изменения

- **Май 2019:** W3C передал HTML/DOM управление WHATWG
- **Январь 2020:** Edge мигрировал на Chromium
- **2021:** Chrome и Firefox перешли на 4-недельные релизные циклы

### Safari как bottleneck

Множество фич достигло baseline только после поддержки Safari: Flexbox gap (2021), aspect-ratio
(2021), `<dialog>` (2022), :focus-visible (2022).

## 🛠 Практическое применение

### Что использовать сегодня (100% safe)

```html
<dialog id="modal">...</dialog>
<img src="image.jpg" loading="lazy" />
<input type="text" inputmode="decimal" enterkeyhint="next" />
```

```css
.container {
    display: flex;
    gap: 1rem;
}

.item {
    aspect-ratio: 16 / 9;
}

h1 {
    font-size: clamp(2rem, 5vw, 4rem);
}

:focus-visible {
    outline: 2px solid blue;
}
```

```javascript
const value = data?.deeply?.nested ?? 'default';

const controller = new AbortController();
fetch('/api', { signal: controller.signal });
```

### Progressive enhancement для новых фич

```css
@supports (container-type: inline-size) {
    .container {
        container-type: inline-size;
    }
}

@supports selector(:has(*)) {
    .card:has(img) {
        grid-template-columns: 200px 1fr;
    }
}
```

## 📊 Статистика исследования

- **Источников проанализировано:** 50+
- **Web searches выполнено:** 20+
- **Браузерных релизов изучено:** 145+
- **Baseline фич задокументировано:** ~60
- **Примеров кода:** 100+
- **Диаграмм Mermaid:** 2

## 🔗 Внешние ресурсы

### Первичные источники

- [WHATWG HTML Living Standard](https://html.spec.whatwg.org)
- [W3C CSS Working Group](https://www.w3.org/Style/CSS/)
- [TC39 ECMAScript Proposals](https://github.com/tc39/proposals)

### Compatibility данные

- [MDN Browser Compatibility Data](https://github.com/mdn/browser-compat-data)
- [Can I Use](https://caniuse.com)
- [web.dev Baseline](https://web.dev/baseline)

### Обучающие ресурсы

- [MDN Web Docs](https://developer.mozilla.org)
- [web.dev](https://web.dev)
- [CSS-Tricks](https://css-tricks.com)

## 📝 Feedback и вопросы

Если у вас есть вопросы по материалам исследования или вы нашли неточности, обратитесь к автору
исследования.

- **Research ID:** `frontend-baseline-2018-2022`
- **Дата создания:** 17.11.2025
- **Методология:** DeepResearch Agent
- **Версия:** 1.0
