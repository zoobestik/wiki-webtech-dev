# Browser Rendering Pipeline Deep Dive — Research Plan

**Research ID:** `browser-rendering-pipeline-2025` **Created:** 2025-12-06 **Status:** In Progress

## Overview

Цель исследования — создать глубокую техническую статью о внутренних механизмах browser rendering
pipeline с фокусом на свойство `will-change`, предназначенную для senior frontend разработчиков (40
y.o., experienced).

## Key Constraints

- **NO ANALOGIES:** Только threads, bitmaps, textures, draw calls, GPU operations — никаких
  сравнений с painters, factories, etc.
- **RUSSIAN LANGUAGE:** Профессиональный технический русский с правильной типографикой
- **TECHNICAL DEPTH:** W3C spec author level, browser engine internals
- **FORMAT:** Comprehensive tech blog article для Obsidian

## Assumptions

1. Читатель знаком с базовыми концепциями DOM, CSS, JavaScript
2. Читатель имеет опыт работы с DevTools
3. Фокус на современных движках (2024-2025), legacy подходы упоминаются только для контекста

---

## Execution Plan

### Phase 1: Scoping & Context Definition

- [x] Зафиксировать scope статьи
    - Целевая аудитория: Senior Frontend Developer (40 y.o.)
    - Технический уровень: глубокие внутренние механизмы браузерных движков
    - Язык: Русский, профессиональная техническая терминология
    - Формат: Comprehensive tech blog article
    - Completed: scope зафиксирован в `./research/browser-rendering-pipeline-2025/scope.md`

### Phase 2: Background Research — Rendering Pipeline Fundamentals

- [x] Исследовать современный Pixel Pipeline (2025)
    - Собрать информацию о стадиях: JavaScript → Style → Layout → Paint → Composite
    - Изучить актуальные W3C спецификации (CSS, DOM, Rendering)
    - Completed: изучены RenderingNG (Blink), WebRender (Gecko), WebKit architectures

- [x] Собрать документацию Chrome DevTools, Firefox DevTools, Safari Web Inspector
    - Performance Panel
    - Layers Panel
    - Rendering tab
    - Completed: собраны ссылки и основная информация по DevTools

- [x] Глубокий анализ каждой стадии pipeline
    - Parse: HTML → DOM, CSS → CSSOM
    - Style calculation: selector matching, computed styles, inheritance, cascade
    - Layout (Reflow): Box model, positioning, geometry calculation, layout trees
    - Paint: Rasterization, draw calls, paint layers, display lists
    - Composite: Layer trees, GPU textures, compositor thread, tile management
    - Completed: детальный анализ в
      `./research/browser-rendering-pipeline-2025/knowledge/01-rendering-pipeline-fundamentals.md`
    - Raw notes: `./research/browser-rendering-pipeline-2025/tmp/chrome-blink-raw-notes.md`,
      `firefox-webrender-raw-notes.md`, `webkit-safari-raw-notes.md`, `css-triggers-raw-notes.md`

### Phase 3: Deep Dive — `will-change` Property

- [x] Изучить официальную спецификацию CSS `will-change`
    - W3C CSS Will Change Module Level 1
    - Browser implementation status
    - Completed: полный анализ W3C spec (syntax, values, conformance)

- [x] Исследовать механизм работы `will-change`
    - Создание Stacking Context
    - Layer promotion mechanism (когда и почему элемент выносится в отдельный Compositor Layer)
    - Memory allocation (VRAM usage, texture allocation)
    - Взаимодействие с Compositor Thread
    - Timing: когда браузер создает layer (immediately vs deferred)
    - Completed: детальный анализ layer promotion, VRAM calculations, implicit compositing

- [x] Сравнение с legacy техниками
    - `transform: translateZ(0)` hack — история и почему это работало
    - `transform: translate3d(0,0,0)` hack
    - Современные best practices
    - Когда legacy hacks все еще могут быть нужны
    - Completed: comprehensive knowledge document в
      `./research/browser-rendering-pipeline-2025/knowledge/02-will-change-deep-dive.md`

### Phase 4: Engine Architecture Comparison

- [ ] Blink (Chromium) architecture
    - Compositing model (LayoutObject → PaintLayer → GraphicsLayer → CompositingLayer)
    - Layer creation criteria (what triggers layer promotion)
    - GPU acceleration triggers
    - Latest changes (2024-2025): CompositeAfterPaint, Viz service

- [ ] Gecko (Firefox) architecture
    - WebRender specifics (GPU-based scene builder)
    - Display list architecture
    - Отличия от Blink
    - Memory management approaches
    - Frame construction vs Blink's layout

- [ ] WebKit (Safari) architecture
    - RenderLayer vs GraphicsLayer
    - iOS vs macOS constraints (memory pressure, battery optimization)
    - Layer count limitations
    - Tiling strategies

### Phase 5: Performance Patterns & Anti-patterns

- [ ] CSS triggers analysis
    - Layout-triggering properties (width, height, left, top, margin, padding, border, etc.)
    - Paint-triggering properties (color, background, box-shadow, etc.)
    - Composite-only properties (transform, opacity, filter в некоторых случаях)
    - Ссылка на CSS Triggers database

- [ ] "Layer Explosion" phenomenon
    - Что это и как возникает
    - Memory overhead analysis (VRAM consumption per layer)
    - Battery impact (GPU wakeups, power consumption)
    - When NOT to use `will-change`
    - Debugging layer count in DevTools

- [ ] Optimization strategies
    - Chrome DevTools: Layers panel, Performance timeline, Rendering tab
    - Firefox: Performance Tools, about:support graphics info
    - Safari: Web Inspector Timeline, Layers sidebar
    - Best practices: animations на transform/opacity, избегание layout thrashing

- [ ] Modern alternatives
    - CSS Containment (`contain: layout`, `contain: paint`, `contain: size`, `contain: strict`)
    - `content-visibility` (2021+) для virtualization
    - CSS Houdini APIs: Paint API (custom paint), Animation Worklet (off-main-thread animations)

### Phase 6: Current State Research (2025)

- [ ] Проверить актуальность browser support
    - caniuse.com: `will-change`, `contain`, `content-visibility`
    - MDN browser compatibility tables
    - Baseline status

- [ ] Собрать актуальные benchmarks и case studies
    - Performance metrics (FPS, frame time, memory usage)
    - Real-world case studies из blog posts ведущих компаний

- [ ] Изучить latest developments
    - Chrome/Chromium release notes (v120-v131+, 2024-2025)
    - Firefox release notes (v120-v133+)
    - WebKit blog posts (2024-2025)
    - W3C CSS Working Group discussions (github.com/w3c/csswg-drafts)

### Phase 7: Technical Sources Collection

- [ ] Официальные спецификации
    - CSS Will Change Module Level 1 (W3C Candidate Recommendation)
    - CSS Containment Module Level 1, Level 2
    - CSS Painting API Level 1
    - Compositing and Blending Level 1

- [ ] Browser engine documentation
    - Chromium: docs/design/graphics, docs/how_blink_works.md
    - Gecko: Firefox Source Docs (graphics, layout, style)
    - WebKit: webkit.org/blog, trac.webkit.org documentation

- [ ] Authoritative blog posts & articles
    - Paul Lewis (ex-Google Chrome team): aerotwist.com
    - Paul Irish (Chrome DevRel): paulirish.com
    - Chromium Blog: blog.chromium.org
    - Mozilla Hacks: hacks.mozilla.org
    - WebKit Blog: webkit.org/blog
    - Lin Clark: code-cartoons.com, Firefox graphics articles

### Phase 8: Article Structure & Writing

- [ ] Создать структуру статьи
    - **Введение:** Зачем понимать rendering pipeline (performance, user experience, debugging)
    - **Section 1: Pixel Pipeline Breakdown**
        - Parse → Style → Layout → Paint → Composite
        - Main Thread vs Compositor Thread vs Raster Threads
    - **Section 2: `will-change` Deep Dive**
        - Спецификация и семантика
        - Механизм layer promotion
        - Memory implications
        - Best practices и когда НЕ использовать
    - **Section 3: Engine Architectures Comparison**
        - Blink, Gecko, WebKit — ключевые различия
        - Как одни и те же техники работают по-разному
    - **Section 4: Practical Optimization Patterns**
        - CSS triggers
        - DevTools usage
        - Common anti-patterns
    - **Section 5: Future Outlook**
        - CSS Containment
        - `content-visibility`
        - Houdini APIs
    - **Заключение:** Систематический подход к performance optimization

- [ ] Написать каждую секцию
    - Использовать строгую техническую терминологию
    - NO ANALOGIES (критически важно!)
    - Включить code examples с детальными комментариями
    - Добавить mermaid диаграммы (rendering pipeline flow, layer tree structure)
    - Ссылки на источники inline

- [ ] Форматирование для Obsidian
    - Все технические термины, имена функций, CSS properties в backticks
    - Code blocks с правильными language tags (css, javascript, bash, mermaid)
    - Правильная русская типографика:
        - Тире: дефис `-` vs короткое тире `–` vs длинное тире `—`
        - Кавычки: «ёлочки» для прямой речи, „лапки" для вложенных цитат
    - Tables для сравнения engines, CSS properties

### Phase 9: Validation & Cross-checking

- [ ] Проверить технические утверждения
    - Cross-validate все ключевые claim'ы с официальными источниками
    - Проверить актуальность информации (не устарела ли с 2023?)
    - Идентифицировать deprecated практики и явно пометить их

- [ ] Проверить примеры кода
    - Валидность CSS/JS синтаксиса
    - Современность подходов (не используются ли устаревшие API)

- [ ] Review conflicting opinions
    - Если в индустрии есть разные мнения по optimization strategies — документировать обе стороны
    - Указать свою reasoned position с обоснованием

### Phase 10: Final Output & Retrospective

- [ ] Создать финальный файл статьи
    - `./research/browser-rendering-pipeline-2025/knowledge/final-article.md`
    - Полная статья с intro, все секции, заключение, references

- [ ] Создать summary document
    - `./research/browser-rendering-pipeline-2025/knowledge/summary.md`
    - Key findings
    - Key decisions and rationale
    - Limitations (что не вошло в scope)
    - Open questions (что требует дальнейшего исследования)

- [ ] Создать references document
    - `./research/browser-rendering-pipeline-2025/knowledge/references.md`
    - Все источники с URLs и датами доступа
    - Structured: спецификации, browser docs, articles, tools

---

## Success Criteria

1. ✅ Статья написана полностью на русском языке с профессиональной терминологией
2. ✅ NO ANALOGIES — только технические термины (threads, textures, layers, draw calls,
   rasterization)
3. ✅ Глубина анализа соответствует уровню W3C spec author / browser engine contributor
4. ✅ Все технические утверждения подтверждены источниками
5. ✅ Статья содержит actionable optimization patterns с примерами кода
6. ✅ Предупреждения о memory/battery implications явно указаны
7. ✅ Статья оптимизирована для Obsidian (backticks, code fences, правильная типографика)
8. ✅ Длина: comprehensive article (не менее 5000 слов)

---

## Notes

- **Internet access:** Все фазы требуют активного использования curl/puppeteer для проверки
  актуальности
- **Source quality:** Приоритет на официальные спецификации, browser vendor blogs, recognized
  experts
- **Version tracking:** Указывать версии браузеров для конкретных примеров (Chrome 131, Firefox 133,
  Safari 17.x)
