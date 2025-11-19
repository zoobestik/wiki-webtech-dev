---
title: Web Platform Baseline Initiative
description: Описание инициативы Web Platform Baseline, статусов, критериев и ключевых дат
outline: deep
lastUpdated: true
---

# Web Platform Baseline Initiative

## Что такое Baseline

**Web Platform Baseline** — инициатива, запущенная в **2023 году**, которая предоставляет
разработчикам чёткую информацию о межбраузерной совместимости веб-платформенных функций.

### Управление и участники

- **Инициатор:** Chrome team (Google)
- **Управляется:** WebDX Community Group (W3C)
- **Участвующие браузеры (core browsers):**
    1. Google Chrome (desktop и Android)
    2. Microsoft Edge (desktop и Android)
    3. Mozilla Firefox (desktop и Android)
    4. Apple Safari (macOS и iOS)

## Статусы Baseline

Baseline определяет три фазы доступности функций:

### 1. **Limited Availability** (Ограниченная доступность)

- Функция **не поддерживается** во всех основных браузерах
- Может быть доступна только в некоторых браузерах
- Не рекомендуется для production без fallback

### 2. **Newly Available** (Новая доступность)

- Функция **поддерживается во всех** четырёх основных браузерах (core browsers)
- Указывает на достижение **межбраузерной совместимости (interoperability)**
- Разработчики могут начинать использовать функцию в production
- **Важно:** Поддержка должна быть как на desktop, так и на mobile версиях

### 3. **Widely Available** (Широкая доступность)

- Функция стабильно поддерживается уже **30+ месяцев** после достижения Newly Available
- Считается **полностью безопасной** для использования без опасений
- Покрывает подавляющее большинство пользователей

## Baseline Targets (Годовые цели)

Функции группируются в ежегодные **Baseline targets** в зависимости от года, в котором они достигли
статуса **Newly Available**:

- **Baseline 2023**
- **Baseline 2024**
- **Baseline 2025**

## Примеры ключевых функций по годам

### Baseline 2023 (Newly Available)

| Функция                      | Дата Newly Available | Дата Widely Available |
| ---------------------------- | -------------------- | --------------------- |
| **Container Queries** (size) | Февраль 2023         | Август 2025           |
| **CSS Nesting**              | Август 2023          | Февраль 2026          |
| **Compression Streams API**  | Май 2023             | Ноябрь 2025           |
| **`:has()` selector**        | Декабрь 2023         | Июнь 2026             |

### Baseline 2024 (Newly Available)

| Функция                                     | Дата Newly Available | Дата Widely Available |
| ------------------------------------------- | -------------------- | --------------------- |
| **Declarative Shadow DOM**                  | Февраль 2024         | Август 2026           |
| **AVIF image format**                       | Январь 2024          | Июль 2026             |
| **`@property` (CSS Custom Properties)**     | Июль 2024            | Январь 2027           |
| **Set methods** (intersection, union, etc.) | 2024                 | 2026                  |

### Baseline 2025 (Newly Available)

| Функция         | Дата Newly Available | Дата Widely Available |
| --------------- | -------------------- | --------------------- |
| **Popover API** | Январь 2025          | Июль 2027             |

## Критерии определения Baseline

### Newly Available

Функция считается **Newly Available**, когда она поддерживается:

- В **последних стабильных версиях** всех четырёх основных браузеров
- Как на **desktop**, так и на **mobile** версиях (для Safari — macOS и iOS)

### Widely Available

Функция считается **Widely Available** через:

- **30 месяцев** (2.5 года) после достижения статуса Newly Available

## Интеграция в экосистему (с 2023)

Baseline интегрирован в следующие инструменты:

1. **Chrome DevTools** — отображение статуса Baseline для CSS свойств и APIs
2. **VS Code** — подсказки о Baseline статусе в редакторе
3. **ESLint** — правила для проверки использования Baseline функций
4. **Browserslist** — фильтрация по Baseline статусу
5. **MDN Web Docs** — бейджи Baseline на страницах документации
6. **Can I Use** — отображение Baseline статуса
7. **web.dev** — dashboard для отслеживания Baseline функций

## Источники данных для Baseline

- **web-platform-tests** — автоматизированные тесты совместимости
- **Browser Compatibility Data (BCD)** — структурированные данные о поддержке
- **Релиз-ноуты браузеров** — официальные анонсы новых функций
- **WebDX Community Group** — координация и утверждение статусов

## Связь с Interop

**Interop** (ежегодная инициатива браузеров для улучшения совместимости) и **Baseline** тесно
связаны:

- Interop определяет **focus areas** для улучшения совместимости
- Многие функции из Interop становятся Baseline Newly Available после успешной реализации
- Примеры: Container Queries (Interop 2022 → Baseline 2023), CSS Nesting (Interop 2023 →
  Baseline 2023)

## Значение для разработчиков

### Преимущества:

1. **Ясность:** Чёткое понимание, когда функцию безопасно использовать
2. **Снижение риска:** Уменьшение времени на тестирование кросс-браузерной совместимости
3. **Планирование:** Возможность планировать adoption новых функций
4. **Tooling:** Автоматические проверки и подсказки в инструментах разработки

### Рекомендации по использованию:

- **Newly Available:** Можно использовать в production, но с тщательным тестированием
- **Widely Available:** Безопасно использовать без опасений о совместимости
- **Limited Availability:** Требуется feature detection и fallback стратегии

## Эволюция инициативы (2023–2025)

- **2023:** Запуск Baseline, интеграция в MDN и Can I Use
- **2024:** Расширение tooling support (DevTools, VS Code, ESLint), Baseline Tooling Hackathon
- **2025:** Дальнейшее распространение, ежемесячные digest newsletters, планы по продвижению

---

**Источники:**

- https://web.dev/baseline
- https://github.com/web-platform-dx/web-features
- WebDX Community Group
- MDN Browser Compatibility Data

- **Дата обновления:** 18.11.2025
