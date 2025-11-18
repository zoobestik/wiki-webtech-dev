---
title: 'HTTP, Protocols & Security — изменения 2024 года'
description: 'Комплексный обзор изменений в HTTP, сетевых протоколах и веб-безопасности за 2024 год - отмена third-party cookies, постквантовая криптография, HTTP/3, passkeys, bounce tracking protection и практические рекомендации'
outline: deep
lastUpdated: true
---

# HTTP, Protocols & Security — изменения 2024 года

- **Период**: 1 января 2024 — 31 декабря 2024
- **Версии браузеров**: Chrome/Edge 121–132, Firefox 121–133, Safari 17.2–18.2

## Обзор года

2024 год стал годом кардинальных изменений в веб-экосистеме. Ключевым событием стала отмена планов по deprecation third-party cookies в Chrome (июль 2024), что радикально изменило направление индустрии. Параллельно произошло массовое внедрение постквантовой криптографии, достижение Baseline-статуса для критически важных API, и усиление защиты от tracking.

### Ключевые темы года

- **Великий разворот cookies**: Google отменил deprecation third-party cookies (22 июля 2024)
- **Постквантовая эра**: ML-KEM в Chrome 124, финальный стандарт в Chrome 131
- **HTTP/3 adoption**: рост до 30%+ трафика, стабилизация экосистемы
- **Baseline-достижения**: Fetch Priority, Priority header, `bytes()` method, `keepalive` (октябрь-ноябрь 2024)
- **Passkeys mainstream**: 1+ миллиард аутентификаций, WebAuthn Level 3
- **Bounce tracking protection**: Firefox 133 присоединился к Safari и Chrome
- **Service Worker innovations**: Static Routing API (Chrome 123)

### Взаимосвязь HTTP и Security

HTTP-протоколы и безопасность остаются неразделимыми в современном вебе:

- **Security headers** (CSP, COEP, COOP, Permissions-Policy) определяют поведение через HTTP
- **Privacy-focused protocols** (CHIPS, FedCM, Storage Access API) работают на уровне HTTP
- **HTTP/3 и QUIC** интегрируют TLS 1.3 и постквантовую криптографию на уровне протокола
- **Cookies** — центральный элемент как для HTTP state management, так и для privacy debates

Этот отчёт объединяет обе области для целостного понимания трансформаций 2024 года.

## Часть 1: HTTP и сетевые протоколы

### 1. HTTP/3 — массовая адаптация

**HTTP/3** базируется на протоколе QUIC (UDP вместо TCP) и включает встроенную поддержку TLS 1.3. 2024 год стал переломным для адаптации протокола в production.

#### 1.1 Статус браузерной поддержки

**Chrome/Edge**:

- Полная поддержка HTTP/3 с Chrome 87 (ноябрь 2020)
- Chrome 121-132 (весь 2024): стабильная production-поддержка
- Составляет ~80% HTTP/3 трафика по данным 2024 года
- Поддержка HTTP/3 по умолчанию, без необходимости включения flags

**Firefox**:

- Полная поддержка с Firefox 88 (апрель 2021)
- Firefox 121-133 (весь 2024): стабильная поддержка
- Составляет ~10% HTTP/3 трафика
- HTTP/3 включён по умолчанию во всех релизах 2024 года

**Safari**:

- До 2024: экспериментальная поддержка (Safari 14-15.6 disabled по умолчанию)
- **Safari 16.0+**: полная production-поддержка ⭐
- **Сентябрь 2024**: HTTP/3 поддерживается для всех пользователей Safari 16+
- Apple удалил опцию "HTTP/3" из Experimental Features (стандарт ратифицирован как RFC 9114)
- Составляет оставшуюся долю HTTP/3 трафика

**Specification**: RFC 9114 (ратифицирован)

#### 1.2 Статистика адаптации 2024

**Browser Coverage**:

- **95%+ браузеров** поддерживают HTTP/3 (сентябрь 2024)
- **91.55% global usage coverage** через поддерживаемые браузеры
- Практически универсальная browser compatibility

**Website Adoption**:

- **34% из топ-10 миллионов сайтов** поддерживают HTTP/3 (сентябрь 2024)
- По данным Web Almanac 2024: реальная поддержка ближе к **30%**
- Другие источники: **29.8% сайтов** используют HTTP/3 (mid-2024)

**Traffic Distribution**:

- Chrome: ~80% HTTP/3 requests
- Edge: ~10%
- Firefox: чуть менее 10%
- Safari: оставшаяся доля

**Сравнение с 2023**:

- 2023: ~40% трафика использовало HTTP/3, 26% топ-сайтов
- 2024: ~30% трафика (стабилизация после initial hype), 30-34% топ-сайтов
- Рост adoption среди сайтов при нормализации traffic patterns

#### 1.3 Технические характеристики

**Преимущества QUIC/HTTP/3**:

- ✅ **0-RTT / 1-RTT connection establishment** — быстрое установление соединения
- ✅ **Multiplexing без head-of-line blocking** — решение ключевой проблемы HTTP/2
- ✅ **Connection migration** — сохранение соединения при смене сети (Wi-Fi → мобильная сеть)
- ✅ **Improved loss recovery** — лучшая производительность при плохом качестве сети
- ✅ **Встроенная поддержка TLS 1.3** — криптография на уровне протокола
- ✅ **Reduced latency** — особенно критично для mobile networks

**Challenges**:

- ⚠️ UDP blocking в некоторых корпоративных сетях
- ⚠️ Необходимость server-side поддержки и настройки
- ⚠️ Increased CPU usage на сервере (криптография в userspace)
- ⚠️ Debugging сложнее, чем для TCP-based protocols

**Источники**:

- https://caniuse.com/http3
- https://almanac.httparchive.org/en/2024/http
- https://nitewall.com/2024/09/browser-support-for-http-3-an-overview/
- https://w3techs.com/technologies/details/ce-http3

### 2. HTTP Headers — новые возможности и Baseline-достижения

#### 2.1 Priority HTTP Request Header (RFC 9218)

**Статус**: **Baseline Newly Available** (29 октября 2024) ⭐

**Expected Widely Available**: 29 апреля 2027

**Назначение**: HTTP header для коммуникации начального приоритета запроса HTTP version-independent способом, часть "Extensible Prioritization Scheme for HTTP" (RFC 9218).

**Browser Support**:

- **Chrome/Chrome Android**: версия 103 (21 июня 2022)
- **Edge**: версия 103 (23 июня 2022)
- **Safari/Safari on iOS**: версия 17.2 (11 декабря 2023)
- **Firefox/Firefox for Android**: версия 132 (29 октября 2024) — достигнут Baseline ⭐

**Syntax**:

```http
Priority: u=<priority>
Priority: i
Priority: u=<priority>, i
```

**Key Directives**:

- `u=<priority>`: Urgency parameter (0-7, где 0 = highest urgency, default = 3)
- `i`: Incremental directive (указывает, что response может обрабатываться инкрементально)

**Implementation Details**:

- Firefox и Safari используют HTTP header
- Chromium использует только PRIORITY_UPDATE frame вместо HTTP header для initial priority signaling
- Работает через HTTP/1.1, HTTP/2, и HTTP/3
- HTTP/2 и HTTP/3 также поддерживают PRIORITY_UPDATE frames для re-prioritization после initial request transmission

**Практический пример**:

```http
# Критически важный API endpoint
GET /api/critical-data HTTP/1.1
Host: api.example.com
Priority: u=0

# Обычный ресурс
GET /assets/image.jpg HTTP/1.1
Host: cdn.example.com
Priority: u=3

# Low priority analytics
GET /track/analytics HTTP/1.1
Host: analytics.example.com
Priority: u=7
```

**Связь с fetchpriority**: HTML attribute `fetchpriority` (см. ниже) комплементарен Priority header — первый задаётся на client-side, второй передаётся в request.

**Specification**: RFC 9218 — Extensible Prioritization Scheme for HTTP

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Priority
- https://chromestatus.com/feature/5109106573049856
- https://web-platform-dx.github.io/web-features-explorer/features/fetch-priority/
- https://datatracker.ietf.org/doc/html/rfc9218

#### 2.2 Fetch Priority (fetchpriority attribute)

**Статус**: **Baseline Newly Available** (29 октября 2024) ⭐

**Expected Widely Available**: 29 апреля 2027

**Назначение**: HTML атрибут `fetchpriority` и fetch() priority опция предоставляют hints браузеру о том, какие запросы выполнить раньше других запросов того же типа.

**Browser Support**:

- **Chrome/Chrome Android**: версия 103 (июнь 2022)
- **Edge**: версия 103 (июнь 2022)
- **Safari/Safari on iOS**: версия 17.2 (декабрь 2023)
- **Firefox/Firefox for Android**: версия 132 (29 октября 2024) — достигнут Baseline ⭐

**Values**: `high`, `low`, `auto` (default)

**Supported Elements**: `<img>`, `<script>`, `<link>`, `<iframe>`, и JavaScript Fetch API

**Use Cases**:

- Load LCP (Largest Contentful Paint) hero images раньше с `fetchpriority="high"`
- Defer non-critical ресурсов с `fetchpriority="low"`
- Оптимизация загрузки critical CSS/JS

**Практические примеры**:

```html
<!-- Критически важное hero image для LCP -->
<img src="/images/hero-banner.jpg" fetchpriority="high" alt="Hero banner" />

<!-- Preload критического шрифта -->
<link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" fetchpriority="high" crossorigin />

<!-- Low priority аналитика -->
<script src="/analytics/tracker.js" fetchpriority="low" async></script>

<!-- Below-the-fold изображения -->
<img src="/images/section-2.jpg" fetchpriority="low" loading="lazy" alt="Secondary content" />

<!-- Critical CSS -->
<link rel="stylesheet" href="/css/critical.css" fetchpriority="high" />
```

**Fetch API usage**:

```javascript
// High priority API call
fetch('/api/critical-user-data', {
    priority: 'high',
})
    .then((response) => response.json())
    .then((data) => renderCriticalUI(data));

// Low priority prefetch
fetch('/api/secondary-data', {
    priority: 'low',
})
    .then((response) => response.json())
    .then((data) => cacheForLater(data));
```

**Performance impact**:

Правильное использование `fetchpriority` может значительно улучшить Core Web Vitals:

- ✅ Reduced LCP (приоритизация hero images)
- ✅ Improved FCP (приоритизация critical CSS)
- ✅ Better resource utilization (deprioritization некритичных ресурсов)

**Источники**:

- https://web-platform-dx.github.io/web-features-explorer/features/fetch-priority/
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority
- https://web.dev/articles/fetch-priority

#### 2.3 Early Hints (103 Status Code)

**Статус**: Поддерживается в major browsers (2024)

**Назначение**: HTTP 103 Early Hints informational response позволяет серверам отправлять preliminary HTTP headers пока готовится full response, давая браузерам возможность preconnect к сайтам или начать preloading ресурсов.

**Browser Support**:

- **Chrome**: версия 103+ (поддержка preload и preconnect в Early Hints для top-level frame navigation)
- **Edge**: версия 103+
- **Firefox**: limited support
- **Safari**: support status varies

**Server/CDN Support (2024)**:

- **Cloudflare**: полная поддержка с partnership с browser teams
- **NGINX**: версия 1.29.0 mainline включает поддержку 103 Early Hints
- **Akamai**: поддерживает отправку HTTP 103 status code с preliminary headers

**Technical Requirements**:

- Большинство браузеров ограничивает поддержку HTTP/2 или HTTP/3
- Рекомендуется отправлять только через HTTP/2 или HTTP/3 connections

**Use Cases**:

- Preload критических ресурсов пока сервер готовит response
- Preconnect к внешним domains
- Улучшение page load performance во время server think-time

**Практический пример**:

```http
HTTP/1.1 103 Early Hints
Link: </css/critical.css>; rel=preload; as=style
Link: </js/main.js>; rel=preload; as=script
Link: <https://cdn.example.com>; rel=preconnect

HTTP/1.1 200 OK
Content-Type: text/html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/css/critical.css">
    <script src="/js/main.js"></script>
  </head>
  ...
</html>
```

**Server-side реализация (Node.js/Express)**:

```javascript
app.get('/', async (req, res) => {
    // Отправить Early Hints
    res.writeEarlyHints({
        link: [
            '</css/critical.css>; rel=preload; as=style',
            '</js/main.js>; rel=preload; as=script',
            '<https://fonts.googleapis.com>; rel=preconnect',
        ],
    });

    // Подготовить полный response (долгая операция)
    const data = await fetchDataFromDatabase();
    const html = renderTemplate(data);

    // Отправить финальный response
    res.send(html);
});
```

**Performance Impact**: По данным Cloudflare, может улучшить website load times до 30%.

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103
- https://developer.chrome.com/docs/web-platform/early-hints
- https://blog.cloudflare.com/early-hints/
- https://blog.nginx.org/blog/nginx-introduces-support-103-early-hints

#### 2.4 Server-Timing Header

**Статус**: **Baseline Widely Available** (март 2023)

**Назначение**: HTTP Server-Timing response header коммуницирует одну или несколько performance метрик о request-response cycle к user agent, отображая backend server timing metrics в developer tools.

**Browser Support**: Доступен во всех браузерах с марта 2023

- Chrome: полная поддержка
- Firefox: полная поддержка
- Safari: полная поддержка
- Edge: полная поддержка

**Syntax**:

```http
Server-Timing: db;dur=53, app;dur=47.2
Server-Timing: cache;desc="Cache Read";dur=23.2
Server-Timing: api;dur=123.4;desc="API call"
```

**Key Features**:

- Метрики observable из "navigation" и "resource" performance entries
- Доступны через `PerformanceResourceTiming.serverTiming` property
- Возвращает array of `PerformanceServerTiming` objects
- Доступны только в secure contexts (HTTPS) в некоторых браузерах

**Security Considerations**:

- Restricted to same origin по умолчанию
- Используйте `Timing-Allow-Origin` header для указания domains, которым разрешён доступ к server metrics

**Практический пример**:

```javascript
// Server-side (Node.js/Express)
app.get('/api/data', async (req, res) => {
    const startTime = Date.now();

    // Database query
    const dbStart = Date.now();
    const data = await db.query('SELECT * FROM products');
    const dbDuration = Date.now() - dbStart;

    // External API call
    const apiStart = Date.now();
    const enrichedData = await externalAPI.enrich(data);
    const apiDuration = Date.now() - apiStart;

    // Cache operation
    const cacheStart = Date.now();
    await cache.set(cacheKey, enrichedData);
    const cacheDuration = Date.now() - cacheStart;

    const totalDuration = Date.now() - startTime;

    // Отправить Server-Timing header
    res.set(
        'Server-Timing',
        `db;desc="Database Query";dur=${dbDuration}, ` +
            `api;desc="External API";dur=${apiDuration}, ` +
            `cache;desc="Cache Write";dur=${cacheDuration}, ` +
            `total;desc="Total";dur=${totalDuration}`
    );

    res.json(enrichedData);
});
```

**Client-side usage**:

```javascript
// Получить server timing из Navigation Timing API
const navTiming = performance.getEntriesByType('navigation')[0];
if (navTiming.serverTiming) {
    navTiming.serverTiming.forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}ms - ${entry.description}`);
    });
}

// Получить server timing из Resource Timing API
const resourceTiming = performance.getEntriesByType('resource').find((r) => r.name.includes('/api/data'));

if (resourceTiming && resourceTiming.serverTiming) {
    resourceTiming.serverTiming.forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
}
```

**HTTP Trailers Support**:

- Только browser DevTools может использовать Server-Timing как HTTP trailer
- Fetch API не может получить доступ к HTTP trailers

**Use Cases**:

- Database read/write timing measurement
- CPU time measurement
- File system access metrics
- Cache hit/miss timing analysis
- External API call duration tracking
- Real User Monitoring (RUM) backend performance

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server-Timing
- https://caniuse.com/server-timing
- https://w3c.github.io/server-timing/

#### 2.5 Sec-Fetch Headers

**Статус**: **Baseline Newly Available** (март 2023)

**Expected Widely Available**: сентябрь 2025

**Headers in This Family**:

- `Sec-Fetch-Site`
- `Sec-Fetch-Mode`
- `Sec-Fetch-Dest`
- `Sec-Fetch-User`

**Browser Support** (все headers):

- **Chrome**: версия 76+
- **Edge**: версия 79+
- **Firefox**: версия 90+
- **Opera**: версия 63+
- **Chrome Android**: версия 76+
- **Firefox Android**: версия 90+
- **Opera Android**: версия 54+
- **Samsung Internet**: версия 12+
- **Safari/iOS Safari**: **не поддерживается** по состоянию на 2024

**Sec-Fetch-Site**: Указывает relationship между initiator's origin и origin запрашиваемого ресурса

**Values**: `cross-site`, `same-origin`, `same-site`, `none`

**Sec-Fetch-Mode**: Указывает mode запроса

**Values**: `cors`, `navigate`, `no-cors`, `same-origin`, `websocket`

**Sec-Fetch-Dest**: Указывает destination запроса

**Values**: `audio`, `audioworklet`, `document`, `embed`, `empty`, `font`, `frame`, `iframe`, `image`, `manifest`, `object`, `paintworklet`, `report`, `script`, `serviceworker`, `sharedworker`, `style`, `track`, `video`, `worker`, `xslt`

**Sec-Fetch-User**: Указывает, был ли navigation request инициирован user activation

**Value**: `?1` (присутствует) или отсутствует

**Security Use Cases**:

- ✅ Защита от **Cross-Site Request Forgery (CSRF)**
- ✅ Предотвращение **Cross-Site Script Inclusion (XSSI)**
- ✅ Mitigation **resource timing attacks**
- ✅ Защита от **XS-Leaks**

**Практический пример — Resource Isolation Policy**:

```javascript
// Express.js middleware
function fetchMetadataPolicy(req, res, next) {
    const site = req.headers['sec-fetch-site'];
    const mode = req.headers['sec-fetch-mode'];
    const dest = req.headers['sec-fetch-dest'];

    // Если headers не присутствуют (старые браузеры), разрешить
    if (!site) {
        return next();
    }

    // Разрешить navigation requests
    if (mode === 'navigate' && dest === 'document') {
        return next();
    }

    // Разрешить same-origin и same-site
    if (site === 'same-origin' || site === 'same-site') {
        return next();
    }

    // Разрешить specific CORS requests от trusted origins
    const trustedOrigins = ['https://trusted-partner.com', 'https://cdn.example.com'];

    if (mode === 'cors' && trustedOrigins.includes(req.headers.origin)) {
        return next();
    }

    // Блокировать все остальные cross-site requests
    console.warn(`Blocked cross-site request: ${req.method} ${req.url}`, {
        site,
        mode,
        dest,
        origin: req.headers.origin,
    });

    return res.status(403).json({
        error: 'Forbidden',
        message: 'Cross-site requests are not allowed',
    });
}

// Применить к API endpoints
app.use('/api/*', fetchMetadataPolicy);
app.use('/admin/*', fetchMetadataPolicy);
```

**Important Note**: Это Fetch Metadata Request Headers, предложенные Google. Они автоматически отправляются браузерами — разработчики не могут устанавливать их вручную.

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Site
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Mode
- https://www.appsecmonkey.com/blog/fetch-metadata

### 3. Fetch API — новые методы и Baseline-достижения

#### 3.1 Fetch API keepalive

**Статус**: **Baseline Newly Available** (ноябрь 2024) — Firefox 133 ⭐

**Назначение**: Свойство `keepalive` интерфейса Request указывает, будет ли браузер поддерживать associated request alive, если страница, инициировавшая его, выгружается до завершения request.

**Browser Support**:

- **Chrome**: long-standing support
- **Firefox**: версия 133+ (ноябрь 2024) — достигнут baseline status ⭐
- **Safari**: поддерживается в recent versions
- **Edge**: Chromium-based support

**Syntax**:

```javascript
fetch(url, {
    method: 'POST',
    body: data,
    keepalive: true,
});
```

**Key Features**:

- Same not-cancelable характеристики как sendBeacon
- Может использовать HTTP методы кроме POST
- Может кастомизировать request properties
- Доступ к server response через Promise
- Работает с page unload events

**Advantages Over sendBeacon()**:

- ✅ Более гибкие HTTP методы
- ✅ Полная поддержка fetch options
- ✅ Response handling capability
- ✅ Лучше для complex use cases

**Use Cases**:

- Analytics data transmission
- Session end reporting
- User activity tracking
- Error logging на page exit

**Практический пример**:

```javascript
// Analytics beacon при page unload
window.addEventListener('unload', () => {
    const analyticsData = {
        sessionId: getCurrentSessionId(),
        timestamp: Date.now(),
        pageViews: getPageViews(),
        events: getTrackedEvents(),
    };

    fetch('/api/analytics/session-end', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsData),
        keepalive: true, // ✅ Гарантирует отправку даже после unload
    }).catch((err) => {
        // Errors могут не попасть в logs из-за page unload
        console.error('Analytics beacon failed:', err);
    });
});

// Core Web Vitals reporting
const reportWebVitals = (metric) => {
    const body = JSON.stringify(metric);

    // Используем keepalive для надёжной отправки метрик
    if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/web-vitals', body);
    } else {
        fetch('/api/web-vitals', {
            method: 'POST',
            body,
            keepalive: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};

// Интеграция с web-vitals library
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(reportWebVitals);
onFID(reportWebVitals);
onLCP(reportWebVitals);
```

**Сравнение keepalive vs sendBeacon**:

| Feature | fetch + keepalive | sendBeacon |
| --- | --- | --- |
| HTTP methods | GET, POST, PUT, DELETE, etc. | Только POST |
| Custom headers | ✅ Да | ❌ Ограничено |
| Response access | ✅ Да (Promise) | ❌ Нет |
| Browser support | Широкая (2024) | Универсальная |
| Size limit | ~64KB | ~64KB |
| Guaranteed delivery | ✅ Да | ✅ Да |

**Firefox 133 Implementation** (ноябрь 2024):

- Экспериментальная feature за флагом `dom.fetchKeepalive.enabled`
- Alternative к `Navigator.sendBeacon()` с дополнительной гибкостью
- Часть broader Fetch API alignment

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/API/Request/keepalive
- https://www.stefanjudis.com/today-i-learned/fetch-supports-a-keepalive-option-to-make-it-outlive-page-navigations/
- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132

#### 3.2 Request and Response bytes() Method

**Статус**: **Baseline Newly Available** (ноябрь 2024) — Chrome 132 ⭐

**Назначение**: Новый метод `bytes()`, добавленный к Request и Response интерфейсам, возвращает promise, resolving с Uint8Array, улучшая ergonomics получения binary body data.

**Browser Support**:

- **Chrome**: версия 132 (Beta 13 ноября 2024) ⭐
- **Firefox**: доступно в recent versions
- **Safari**: доступно в Safari 18.0+
- **Edge**: Chromium версия 132+

**Why It Was Added**: Хотя Request и Response имеют метод `arrayBuffer()`, вы не можете читать напрямую из buffer — необходимо создать view, такой как Uint8Array. Метод `bytes()` устраняет этот extra step.

**Syntax**:

```javascript
// Старый способ
const buffer = await response.arrayBuffer();
const bytes = new Uint8Array(buffer);

// Новый способ
const bytes = await response.bytes();
```

**Также добавлен к**:

- `Request` interface
- `Response` interface
- `Blob` interface
- `PushMessageData` interface

**Практические примеры**:

```javascript
// Обработка binary image data
async function processImage(imageUrl) {
    const response = await fetch(imageUrl);
    const bytes = await response.bytes();

    // Прямая работа с binary data
    console.log('Image size:', bytes.length, 'bytes');

    // Проверка image signature (JPEG)
    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
        console.log('Valid JPEG image');
    }

    return bytes;
}

// Криптографические операции
async function hashData(url) {
    const response = await fetch(url);
    const bytes = await response.bytes();

    // Используем Web Crypto API
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

// Protocol parsing
async function parseCustomProtocol(url) {
    const response = await fetch(url);
    const bytes = await response.bytes();

    // Парсинг custom binary protocol
    const header = {
        magic: (bytes[0] << 8) | bytes[1],
        version: bytes[2],
        flags: bytes[3],
    };

    const payload = bytes.slice(4);

    return { header, payload };
}

// WebAssembly module loading
async function loadWasmModule(url) {
    const response = await fetch(url);
    const bytes = await response.bytes();

    // Компиляция WebAssembly module
    const module = await WebAssembly.compile(bytes);
    return module;
}
```

**Use Cases**:

- Binary data processing
- Image manipulation
- File handling
- Protocol parsing
- Cryptographic operations
- WebAssembly module loading

**Specification**: Следует принципу, что APIs должны generally предоставлять byte buffers как Uint8Arrays.

**Источники**:

- https://developer.chrome.com/blog/chrome-132-beta
- https://developer.chrome.com/release-notes/132
- https://developer.mozilla.org/en-US/docs/Web/API/Response/bytes
- https://webkit.org/blog/15865/webkit-features-in-safari-18-0/

#### 3.3 fetchLater API (Origin Trial)

**Статус**: Chrome Origin Trial (январь - сентябрь 2024)

**Назначение**: Proposal для замены сложности поддержания requests alive во время page unload single API call. Просит браузер гарантировать, что request будет сделан в какой-то момент в будущем, даже если страница закрыта.

**Browser Support**:

- **Chrome**: версия 121+ (Origin Trial до 3 сентября 2024)
- **Firefox**: не поддерживается
- **Safari**: не поддерживается
- **Edge**: Chromium-based origin trial support

**Syntax**:

```javascript
fetchLater(url, {
    method: 'POST',
    body: analyticsData,
    activateAfter: 60000, // milliseconds
});
```

**Key Features**:

- `activateAfter` опция: Fire request после timeout или когда page unloads, whichever приходит первым
- Нет необходимости использовать `keepalive` flag explicitly
- Браузер гарантирует delivery даже если page закрыта

**Advantages Over sendBeacon()**:

- ✅ Поддерживает HTTP методы кроме POST
- ✅ Может кастомизировать request properties
- ✅ Доступ к server response через fetch Promise fulfillment
- ✅ Более гибкий, чем Navigator.sendBeacon()

**Current Limitations**:

- ⚠️ Ещё не доступен в service workers
- ⚠️ Не будет beacon после browser crash
- ⚠️ Всё ещё в experimental/origin trial phase

**Use Cases**:

- Analytics beacons
- Core Web Vitals reporting
- Error logging
- Session data transmission на page unload

**Практический пример**:

```javascript
// Long-running session tracking
function startSessionTracking() {
    const sessionId = generateSessionId();
    const startTime = Date.now();

    // Beacon будет отправлен через 5 минут или при page unload
    fetchLater('/api/session-tracking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sessionId,
            startTime,
            events: captureEvents(),
        }),
        activateAfter: 5 * 60 * 1000, // 5 minutes
    });
}

// A/B test completion tracking
function trackABTestCompletion(variantId) {
    fetchLater('/api/ab-test/complete', {
        method: 'POST',
        body: JSON.stringify({
            variantId,
            timestamp: Date.now(),
            metrics: collectMetrics(),
        }),
        activateAfter: 0, // Send immediately on unload
    });
}
```

**Источники**:

- https://developer.chrome.com/blog/fetch-later-api-origin-trial
- https://www.rumvision.com/blog/introducing-fetchlater-api-a-new-way-to-collect-core-web-vitals/

### 4. Service Workers — Static Routing API

#### 4.1 Service Worker Static Routing API

**Статус**: Shipped в Chrome 123 (март 2024), после origin trial с Chrome 116 ⭐

**Назначение**: Declarative API для спецификации того, как определённые resource paths должны быть fetched, bypassing service worker execution для specific routes для улучшения performance.

**Browser Support**:

- **Chrome**: версия 123+ (март 2024) ⭐
- **Edge**: Chromium версия 123+
- **Firefox**: не поддерживается
- **Safari**: Interest expressed, WPT testing в процессе (сентябрь 2024)

**API Syntax**:

```javascript
addEventListener('install', (event) => {
    event.addRoutes({
        condition: {
            urlPattern: '/api/*',
            requestMethod: 'GET',
        },
        source: 'network',
    });
});
```

**Condition Properties**:

- `urlPattern`: URLPattern instance или string
- `requestMethod`: HTTP method (GET, POST, и т.д.)
- `requestMode`: Request mode type
- `requestDestination`: Resource destination type
- `runningStatus`: "running" или "not-running"

**Source Options**:

- `"network"`: Bypass cache, fetch from network
- `"cache"`: Use cached responses (optional cacheName)
- `"fetch-event"`: Run through service worker handlers
- `"race-network-and-fetch-handler"`: Race network против handlers

**Performance Benefits**:

- ✅ Избегает запуска ServiceWorker для static assets
- ✅ Устраняет JavaScript execution overhead
- ✅ Reduces navigation delays
- ✅ Improves battery life (less CPU usage)

**Практические примеры**:

```javascript
// 1. Network bypass для POST requests
addEventListener('install', (event) => {
    event.addRoutes([
        {
            condition: {
                urlPattern: '/api/write/*',
                requestMethod: 'POST',
            },
            source: 'network',
        },
    ]);
});

// 2. Cache-specific images
addEventListener('install', (event) => {
    event.addRoutes([
        {
            condition: {
                or: [{ urlPattern: '*.png' }, { urlPattern: '*.jpg' }, { urlPattern: '*.webp' }],
            },
            source: {
                cacheName: 'images-cache',
            },
        },
    ]);
});

// 3. Race network vs service worker
addEventListener('install', (event) => {
    event.addRoutes([
        {
            condition: {
                urlPattern: '/api/data/*',
                requestMethod: 'GET',
            },
            source: 'race-network-and-fetch-handler',
        },
    ]);
});

// 4. Complex routing logic
addEventListener('install', (event) => {
    event.addRoutes([
        // Static assets всегда из cache
        {
            condition: {
                or: [{ urlPattern: '/static/*' }, { urlPattern: '/assets/*' }],
            },
            source: 'cache',
        },
        // API calls всегда из network
        {
            condition: {
                urlPattern: '/api/*',
            },
            source: 'network',
        },
        // HTML pages через service worker (для offline support)
        {
            condition: {
                urlPattern: '/*.html',
            },
            source: 'fetch-event',
        },
    ]);
});
```

**DevTools Integration**:

- Registered rules видимы в `chrome://serviceworker-internals`
- Rules показаны в DevTools Application panel
- Matched rules указаны в Network panel size field

**Deprecation Note**: Старый метод `registerRouter()` deprecated и удалён в Chrome 125.

**Safari Status** (сентябрь 2024):

- Apple выразил support в 2023
- Ближе к implementing feature
- Интерес к Web Platform Tests (WPTs) и live website testing

**Источники**:

- https://developer.chrome.com/blog/service-worker-static-routing
- https://developer.chrome.com/blog/service-worker-static-routing-api-origin-trial
- https://web.dev/blog/web-platform-03-2024
- https://github.com/WICG/service-worker-static-routing-api

### 5. WebTransport — низколатентные соединения

#### 5.1 WebTransport API Status

**Статус**: Доступен в Chrome и Firefox (limited Safari support)

**Назначение**: Low-latency, bidirectional communication через HTTP/3, intended как modern alternative к WebSockets для real-time приложений.

**Browser Support** (2024):

- **Chrome/Chromium**: полная поддержка (версия 97+)
- **Edge**: Chromium-based support
- **Firefox**: версия 115+ (полная поддержка)
- **Safari**: **не поддерживается** ни в одной версии
  - Может быть включён в developer menu для experimental features
  - Work in progress
- **Opera**: поддерживается в recent versions

**Overall Compatibility Score**: 63 (отражает отсутствие поддержки Safari)

**Key Features**:

- ✅ Built на HTTP/3 (QUIC protocol)
- ✅ Multiple streams в single connection
- ✅ Unordered delivery опция
- ✅ Ниже latency, чем WebSockets
- ✅ Both reliable и unreliable transport modes

**Use Cases**:

- Gaming (low-latency multiplayer)
- Live streaming
- Real-time collaboration tools
- IoT приложения
- Cloud gaming

**API Example**:

```javascript
// Установление WebTransport соединения
const transport = new WebTransport('https://example.com/webtransport');
await transport.ready;

console.log('WebTransport connection established');

// Bidirectional stream
const stream = await transport.createBidirectionalStream();
const writer = stream.writable.getWriter();
const reader = stream.readable.getReader();

// Отправка данных
await writer.write(new Uint8Array([1, 2, 3]));

// Получение данных
const { value, done } = await reader.read();
console.log('Received:', value);

// Datagram для unreliable delivery
const datagramWriter = transport.datagrams.writable.getWriter();
await datagramWriter.write(new Uint8Array([42]));
```

**Практический пример — Real-time Gaming**:

```javascript
class GameClient {
    constructor(serverUrl) {
        this.serverUrl = serverUrl;
        this.transport = null;
        this.reliableStream = null;
        this.datagramWriter = null;
    }

    async connect() {
        // Установить соединение
        this.transport = new WebTransport(this.serverUrl);
        await this.transport.ready;

        // Reliable stream для critical game state
        this.reliableStream = await this.transport.createBidirectionalStream();

        // Unreliable datagrams для position updates
        this.datagramWriter = this.transport.datagrams.writable.getWriter();

        // Слушать server messages
        this.listenToServer();
    }

    async listenToServer() {
        const reader = this.reliableStream.readable.getReader();

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const message = JSON.parse(new TextDecoder().decode(value));
            this.handleServerMessage(message);
        }
    }

    // Критическое game state через reliable stream
    async sendGameAction(action) {
        const writer = this.reliableStream.writable.getWriter();
        const data = JSON.stringify(action);
        await writer.write(new TextEncoder().encode(data));
        writer.releaseLock();
    }

    // Position updates через unreliable datagrams
    async sendPositionUpdate(x, y, z) {
        const buffer = new ArrayBuffer(12);
        const view = new Float32Array(buffer);
        view[0] = x;
        view[1] = y;
        view[2] = z;

        await this.datagramWriter.write(new Uint8Array(buffer));
    }

    handleServerMessage(message) {
        switch (message.type) {
            case 'gameState':
                this.updateGameState(message.data);
                break;
            case 'playerJoined':
                this.addPlayer(message.data);
                break;
            case 'playerLeft':
                this.removePlayer(message.data);
                break;
        }
    }
}

// Usage
const gameClient = new GameClient('https://game-server.example.com/transport');
await gameClient.connect();

// Отправить game action (reliable)
await gameClient.sendGameAction({
    type: 'attack',
    target: 'enemy-123',
});

// Отправить position update (unreliable)
setInterval(() => {
    const position = getPlayerPosition();
    gameClient.sendPositionUpdate(position.x, position.y, position.z);
}, 50); // 20 updates per second
```

**Technical Details**:

- Требует HTTP/3 support на сервере
- Использует QUIC transport protocol
- Multiplexed streams избегают head-of-line blocking
- Может отправлять datagrams для unreliable delivery

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/API/WebTransport_API
- https://caniuse.com/webtransport
- https://developer.chrome.com/articles/webtransport/
- https://www.lambdatest.com/web-technologies/webtransport

### 6. WebSockets — улучшения API

#### 6.1 WebSocketStream API

**Статус**: Shipped в Chrome 124 (16 апреля 2024) ⭐

**Назначение**: Интеграция WHATWG Streams с WebSocket API, resolving недостатки путём добавления backpressure support через streams integration.

**Browser Support**:

- **Chrome**: версия 124+ (16 апреля 2024) ⭐
- **Edge**: Chromium версия 124+
- **Firefox**: не поддерживается
- **Safari**: не поддерживается

**Problem Solved**: Traditional WebSocket API lacks ergonomic backpressure handling, означая, что приложения не могут легко handle ситуации, когда incoming data превышает processing capacity.

**Key Advantage**: Backpressure можно применить "for free" без extra cost, enabling приложениям naturally throttle data flow.

**API Example**:

```javascript
const wss = new WebSocketStream(WSS_URL);
const { readable, writable } = await wss.opened;

const reader = readable.getReader();
const writer = writable.getWriter();

while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const result = await process(value);
    await writer.write(result);
}
```

**Key Features**:

- **ReadableStream**: Доступ через `readable.getReader()` для consuming messages
- **WritableStream**: Доступ через `writable.getWriter()` для sending messages
- **Automatic backpressure**: Built-in flow control
- **Promise-based**: Modern async/await patterns

**Практический пример — Real-time Data Processing**:

```javascript
class StreamingDataProcessor {
    constructor(url) {
        this.url = url;
        this.wss = null;
    }

    async connect() {
        console.log('Connecting to', this.url);
        this.wss = new WebSocketStream(this.url);

        const { readable, writable, extensions, protocol } = await this.wss.opened;

        console.log('Connected!', { extensions, protocol });

        // Start processing incoming data
        this.processIncoming(readable);

        // Start sending outgoing data
        this.processSendQueue(writable);
    }

    async processIncoming(readable) {
        const reader = readable.getReader();

        try {
            while (true) {
                const { value, done } = await reader.read();

                if (done) {
                    console.log('Stream closed by server');
                    break;
                }

                // Backpressure автоматически applied here
                // Если processing медленный, reader.read() не вернётся
                // пока не освободится buffer space
                await this.handleIncomingMessage(value);
            }
        } catch (error) {
            console.error('Error processing stream:', error);
        } finally {
            reader.releaseLock();
        }
    }

    async handleIncomingMessage(message) {
        // Simulate expensive processing
        const data = JSON.parse(message);

        if (data.type === 'heavy-computation') {
            // Это может занять время
            await this.performHeavyComputation(data.payload);
        }

        // Automatic backpressure:
        // Пока эта async function выполняется, reader.read() выше
        // не получит следующее message, предотвращая memory overflow
    }

    async processSendQueue(writable) {
        const writer = writable.getWriter();

        try {
            while (this.hasMessagesToSend()) {
                const message = await this.getNextMessage();

                // Backpressure для outgoing messages
                await writer.write(message);
            }
        } catch (error) {
            console.error('Error writing to stream:', error);
        } finally {
            writer.releaseLock();
        }
    }

    async close(code = 1000, reason = 'Normal closure') {
        this.wss.close({ code, reason });
        await this.wss.closed;
        console.log('Connection closed');
    }
}

// Usage
const processor = new StreamingDataProcessor('wss://api.example.com/stream');
await processor.connect();
```

**Closing Connection**:

```javascript
wss.close({
    code: 1000,
    reason: 'Normal closure',
});
await wss.closed; // Wait для closure confirmation
```

**Use Cases**:

- High-throughput data streaming
- Real-time data processing с flow control
- Приложения чувствительные к memory pressure
- Scenarios требующие precise control над data flow

**Baseline Status**: Не ещё Baseline (Chrome-only по состоянию на 2024)

**Источники**:

- https://developer.chrome.com/release-notes/124
- https://developer.chrome.com/docs/capabilities/web-apis/websocketstream
- https://developer.mozilla.org/en-US/docs/Web/API/WebSocketStream
- https://web.dev/blog/web-platform-04-2024

#### 6.2 WebSocket Constructor Enhancement (Chrome 125 Beta)

**Статус**: Chrome 125 Beta (май 2024)

**Что изменилось**: WebSocket constructor теперь принимает HTTP(S) URLs в дополнение к WS/WSS URLs, enabling использование relative URLs.

**Implementation**: HTTP(s) schemes нормализуются к `ws:` и `wss:` internal schemes.

**Example**:

```javascript
// Теперь поддерживается
const ws = new WebSocket('https://example.com/socket');
const ws2 = new WebSocket('/socket'); // Relative URL

// Internally нормализовано к
// wss://example.com/socket
// ws(s)://current-origin/socket
```

**Impact**: Упрощает WebSocket URL construction, позволяет relative URLs, better developer experience.

**Источник**:

- https://developer.chrome.com/blog/chrome-125-beta

### 7. Resource Loading и Performance APIs

#### 7.1 Speculation Rules API

**Статус**: Chrome/Edge only (не ещё Baseline)

**Назначение**: Declarative API для спецификации prefetch и prerender rules, позволяя браузерам speculate, какие страницы пользователи могут navigate к next.

**Browser Support** (2024):

- **Chrome**: полная поддержка (Desktop и Android)
- **Edge**: Chromium-based support
- **Opera**: Chromium-based support
- **Firefox**: не поддерживается
- **Safari**: не поддерживается

**Ключевые обновления 2024**:

**Chrome 121 (январь 2024)**:

- Добавлена поддержка **document rules** — расширение, позволяющее браузеру получать URLs для speculative loading из page elements ⭐
- Может быть указано используя `Speculation-Rules` HTTP header
- **Automatic link finding**: Браузер может автоматически discover links для prerender
- **Eagerness field**: Контроль когда speculation происходит

**Chrome 122 (февраль 2024)**:

- Добавлена **eagerness опция** с уровнями:
  - `eager`: Speculate сразу
  - `moderate`: Speculate на hover (200ms)
  - `conservative`: Speculate на mouse/touch down

**Desktop Rollout (сентябрь 2024)**:

- Prefetching используя Speculation Rules rolled out к desktop
- Previously enabled на Android с октября 2022

**Syntax Examples**:

```html
<!-- List rules (specific URLs) -->
<script type="speculationrules">
    {
        "prerender": [
            {
                "urls": ["/product/123", "/product/456"],
                "eagerness": "eager"
            }
        ],
        "prefetch": [
            {
                "urls": ["/api/recommendations"],
                "eagerness": "moderate"
            }
        ]
    }
</script>

<!-- Document rules (automatic link finding) -->
<script type="speculationrules">
    {
        "prerender": [
            {
                "where": {
                    "href_matches": "/products/*"
                },
                "eagerness": "moderate"
            }
        ],
        "prefetch": [
            {
                "where": {
                    "and": [
                        { "href_matches": "/articles/*" },
                        { "selector_matches": ".high-priority" }
                    ]
                },
                "eagerness": "eager"
            }
        ]
    }
</script>
```

**HTTP Header**:

```http
Speculation-Rules: "/speculation-rules.json"
```

**Eagerness Levels**:

- `immediate`/`eager`: Prefetch/prerender immediately
- `moderate`: На pointer hover (200ms delay)
- `conservative`: На pointer down (click/tap)

**Prerender vs Prefetch**:

| Feature | Prerender | Prefetch |
| --- | --- | --- |
| Downloads resources | ✅ Да | ✅ Да |
| Renders page | ✅ Да | ❌ Нет |
| JavaScript execution | ✅ Да | ❌ Нет |
| Navigation speed | Instant | Fast |
| Resource usage | High | Low |

**Практический пример — E-commerce Site**:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Product Listing</title>

        <!-- Speculation Rules для product pages -->
        <script type="speculationrules">
            {
                "prerender": [
                    {
                        "where": {
                            "and": [
                                { "href_matches": "/product/*" },
                                { "selector_matches": ".product-card a" }
                            ]
                        },
                        "eagerness": "moderate"
                    }
                ],
                "prefetch": [
                    {
                        "urls": ["/api/cart", "/api/user/preferences"],
                        "eagerness": "eager"
                    }
                ]
            }
        </script>
    </head>
    <body>
        <div class="product-grid">
            <div class="product-card">
                <a href="/product/laptop-123">
                    <img src="/images/laptop.jpg" alt="Laptop" />
                    <h3>Premium Laptop</h3>
                </a>
            </div>
            <!-- Когда пользователь hovers 200ms над ссылкой,
            браузер prerender /product/laptop-123 -->
        </div>
    </body>
</html>
```

**DevTools Support**:

- Debug speculation rules с Chrome DevTools
- View registered rules в Application panel
- Network panel показывает speculative requests

**Use Cases**:

- ✅ E-commerce product pages
- ✅ Article websites (news, blogs)
- ✅ Multi-step forms
- ✅ Search result pages
- ✅ Documentation sites

**Google Search Usage**: Google Search использует speculation rules для instant page loads.

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API
- https://developer.chrome.com/docs/web-platform/prerender-pages
- https://developer.chrome.com/blog/speculation-rules-improvements
- https://web.dev/blog/web-platform-01-2024

#### 7.2 Largest Contentful Paint API (Firefox 122)

**Статус**: Добавлен в Firefox 122 (январь 2024) ⭐

**Назначение**: Performance timing tool предоставляющий timing информацию о largest image или text paint до того, как users взаимодействуют с web page.

**Browser Support**:

- **Chrome**: поддерживается
- **Firefox**: версия 122+ (январь 2024) ⭐
- **Safari**: support status varies
- **Edge**: Chromium-based support

**Use Cases**:

- Core Web Vitals measurement
- Page load performance optimization
- User experience monitoring
- Performance budgeting

**LCP Threshold**:

- **Good**: 2.5 seconds или менее
- **Needs Improvement**: 2.5-4.0 seconds
- **Poor**: Более 4.0 seconds

**Практический пример**:

```javascript
// Monitoring LCP с PerformanceObserver
const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    console.log('LCP element:', lastEntry.element);

    // Отправить LCP metric к analytics
    sendToAnalytics({
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        element: lastEntry.element.tagName,
        url: lastEntry.url,
    });
});

observer.observe({ type: 'largest-contentful-paint', buffered: true });

// Используя web-vitals library
import { onLCP } from 'web-vitals';

onLCP((metric) => {
    console.log('LCP metric:', metric);
    // metric.value содержит LCP в milliseconds

    // Классифицировать performance
    if (metric.value <= 2500) {
        console.log('✅ Good LCP');
    } else if (metric.value <= 4000) {
        console.log('⚠️ Needs improvement');
    } else {
        console.log('❌ Poor LCP');
    }
});
```

**Источник**:

- https://web.dev/blog/web-platform-01-2024

### 8. HTTPS Upgrade — автоматическое поведение

#### 8.1 HTTPS Upgrade Automatic Behavior (2024)

**Статус**: Implemented во всех major browsers к 2024

**Chrome**:

- Автоматически upgrades к HTTPS connections даже для `http://` links
- Использует 307 internal redirect (visible в DevTools Network panel)
- Rolled out universally ко всем Chrome users в 2024
- Falls back к HTTP если HTTPS unavailable

**Safari 18.2** (11 декабря 2024) ⭐:

- Введена automatic HTTPS upgrade functionality
- Safari пытается HTTPS первым (HTTPS by default)
- Falls back к HTTP если secure page load fails
- **НЕ применяется** к URLs entered в address bar
- Всё behaviour происходит automatically
- Optional "Not Secure Connection Warning" может быть enabled

**Firefox**:

- HTTPS-only mode доступен в private browsing по умолчанию
- Similar HTTPS upgrade с HTTP fallback механизмом
- Может быть enabled для normal browsing

**General Status**: Major browsers теперь offer native support для HTTPS-only mode, устраняя необходимость расширений как HTTPS Everywhere.

**Практические implications**:

```javascript
// Старый подход (не нужен больше)
if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

// Новый подход — браузер handles автоматически
// Просто убедитесь, что ваш сервер поддерживает HTTPS
```

**Источники**:

- https://www.bleepingcomputer.com/news/google/google-chrome-now-auto-upgrades-to-secure-connections-for-all-users/
- https://lapcatsoftware.com/articles/2024/12/1.html
- https://chromestatus.com/feature/6056181032812544

#### 8.2 Mixed Content Auto-Upgrade (Safari 18.0)

**Статус**: Shipped в Safari 18.0 (16 сентября 2024) ⭐

**Что изменилось**: Safari 18.0 теперь automatically upgrades passive subresource requests к HTTPS. Все images и media теперь auto-upgraded к HTTPS, в adherence с Mixed Content Level 2.

**Impact**: Images, video, и audio files served через HTTP на HTTPS pages transparently upgraded к secure connections, improving security без breaking existing sites.

**Related Fixes в Safari 18.0**:

- Fixed upgrading inactive или passive subresource requests в would-be mixed security contexts
- Fixed incorrect Sec-Fetch-Site value для navigation nested document
- Fixed Timing-Allow-Origin не применяться к HTTP 302 response

**Specification**: Mixed Content Level 2

**Источник**:

- https://webkit.org/blog/15865/webkit-features-in-safari-18-0/

## Часть 2: Security и Privacy

### 1. Third-Party Cookies — великий разворот 2024 года

#### 1.1 Timeline событий

**4 января 2024**: Chrome ограничил third-party cookies для 1% пользователей как часть Privacy Sandbox testing.

**Original Plan**: Chrome планировал ramp up third-party cookie restrictions к 100% пользователей с Q3 2024, subject к addressing competition concerns от UK's Competition and Markets Authority (CMA).

**22 июля 2024**: **Google официально объявил, что НЕ будет phase out third-party cookies на Chrome как originally planned.** Это представляет major policy reversal. ⭐⭐⭐

**Новый подход**: Вместо deprecating third-party cookies, Google ввёл new experience в Chrome, позволяющее людям сделать informed choice, применяемый across их web browsing.

#### 1.2 Причины разворота

- **CMA Review**: UK's Competition and Markets Authority needed sufficient time для review evidence, включая industry test results к концу июня
- **Advertising Industry Pushback**: Significant pushback от advertising industry
- **Economic Disruption Concerns**: Publishers могли потерять average 60% их revenue от Google Chrome
- **Industry Readiness Issues**: Индустрия не была готова к transition

#### 1.3 Current Status (2025)

Third-party cookies остаются **enabled by default** в Chrome. Privacy Sandbox initiative остаётся в place, но shifted от being cookie replacement к being privacy enhancement option, coexisting с traditional cookies.

**Implications для индустрии**:

- ✅ Third-party cookies продолжат работать indefinitely
- ✅ Privacy Sandbox APIs остаются available (Topics, Protected Audience, Attribution Reporting)
- ⚠️ Developers должны всё ещё prepare для eventual privacy-first future
- ⚠️ Other browsers (Firefox, Safari) продолжают блокировать third-party cookies

**Источники**:

- https://developers.google.com/privacy-sandbox/blog/grace-period-update
- https://privacysandbox.com/news/update-on-the-plan-for-phase-out-of-third-party-cookies-on-chrome/
- https://blog.google/products/chrome/privacy-sandbox-tracking-protection/
- https://www.digitalcommerce360.com/2024/07/24/third-party-cookies-deprecation-google-chrome/

### 2. Постквантовая криптография — новая эра безопасности

#### 2.1 Chrome 124: X25519Kyber768 (апрель 2024)

**Статус**: **Enabled by default** на всех desktop platforms ⭐

**Назначение**: Защита network traffic от Chrome с серверами, также supporting ML-KEM от decryption future quantum computers. Defends против "store now decrypt later" attacks, где future quantum computers могли decrypt encrypted traffic recorded today.

**Technical Details**:

- Implements **X25519Kyber768** key encapsulation mechanism
- Based на NIST standard (ML-KEM)
- Hybrid approach: Combines classical и post-quantum algorithms
- Backwards compatible с servers не supporting post-quantum crypto

**Browser Support**: Chrome 124+ на всех desktop platforms

**Источники**:

- https://www.androidpolice.com/google-chrome-releases-guide/
- Chrome Platform Status

#### 2.2 Chrome 131: Финальный ML-KEM Standard (ноябрь 2024)

**Статус**: **Upgraded к final ML-KEM standard** ⭐⭐

**Что изменилось**: Switched от X25519Kyber768 к final standard version ML-KEM, NIST-standardized версии post-quantum cryptography.

**Timeline**:

- Chrome 124 (апрель 2024): Interim standard (X25519Kyber768)
- Chrome 131 (ноябрь 2024): Final NIST standard (ML-KEM)

**Enterprise Policy**:

- `PostQuantumKeyAgreementEnabled` policy available через конец 2024
- Long term: Post-quantum secure ciphers будут required в TLS

**Impact**:

- ✅ Защита от **quantum computer attacks** на encrypted communications
- ✅ **Future-proof security** для sensitive data
- ✅ Seamless для end users (no configuration needed)
- ⚠️ Increased CPU usage на servers (криптография в userspace)

**Практический пример — Server Configuration**:

```nginx
# Nginx configuration для post-quantum support
# (Requires BoringSSL или OpenSSL 3.3+ с ML-KEM support)

ssl_protocols TLSv1.3;
ssl_ciphers TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;

# Enable post-quantum key exchange
ssl_conf_command Options KTLS;

# Prefer server cipher suite order
ssl_prefer_server_ciphers on;
```

**Источники**:

- https://linuxsecurity.com/news/security-vulnerabilities/chrome-131-released-12-bug-fixes
- https://cybersecuritynews.com/chrome-131-security-update/

### 3. Authentication и Credentials — passkeys mainstream

#### 3.1 WebAuthn и Passkeys — массовое внедрение

**Major 2024 Updates**:

**Microsoft WebAuthn API Updates** (24 ноября 2024) ⭐:

- Enhanced support для passwordless authentication
- **Third-party passkey plugin support** (1Password, Bitwarden)
- Available в Windows 11 Preview Build 22635.4515 для Windows Insiders

**Microsoft Authenticator Revamp** (октябрь 2024):

- Simplified passkey setup process (responding к feedback о complexity)

**Enterprise Changes** (январь 2025):

- Microsoft requiring enterprises using FIDO2 policies без key restrictions adopt passkeys
- Challenges для organizations dependent на traditional authentication

**WebAuthn Level 3**:

- Currently в editor's draft
- Expected around конец 2024

**Browser/Platform Support**:

- Chrome/Android: Continuous FIDO2 и WebAuthn advancements
- Apple iCloud Keychain: Integrated passkey support
- Android: FIDO2 support added к brokered apps (e.g., Microsoft Teams)

**Adoption Statistics** ⭐:

- **20%** из world's top 100 websites support passkeys
- **12%** из top 250 websites support passkeys
- **13 billion accounts** able к leverage passkeys
- **Over 1 billion authentications** через 400 million Google Accounts (по состоянию на май 2024)

**Key Relationship**:

- FIDO2 это standard; passkeys это implementation
- FIDO2 components: WebAuthn и CTAP
- WebAuthn covers browser API managing passkeys

**Практический пример**:

```javascript
// Регистрация passkey
async function registerPasskey() {
    // Получить challenge от сервера
    const challengeResponse = await fetch('/api/auth/register/begin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'user@example.com' }),
    });

    const options = await challengeResponse.json();

    // Создать credential
    const credential = await navigator.credentials.create({
        publicKey: {
            challenge: base64ToArrayBuffer(options.challenge),
            rp: {
                name: 'Example Corp',
                id: 'example.com',
            },
            user: {
                id: base64ToArrayBuffer(options.user.id),
                name: options.user.name,
                displayName: options.user.displayName,
            },
            pubKeyCredParams: [
                { type: 'public-key', alg: -7 }, // ES256
                { type: 'public-key', alg: -257 }, // RS256
            ],
            authenticatorSelection: {
                authenticatorAttachment: 'platform', // platform authenticator (device)
                requireResidentKey: true,
                userVerification: 'required',
            },
            timeout: 60000,
        },
    });

    // Отправить credential к серверу
    await fetch('/api/auth/register/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            credential: {
                id: credential.id,
                rawId: arrayBufferToBase64(credential.rawId),
                response: {
                    clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
                    attestationObject: arrayBufferToBase64(credential.response.attestationObject),
                },
                type: credential.type,
            },
        }),
    });
}

// Аутентификация с passkey
async function authenticateWithPasskey() {
    // Получить challenge от сервера
    const challengeResponse = await fetch('/api/auth/login/begin', {
        method: 'POST',
    });

    const options = await challengeResponse.json();

    // Get credential
    const credential = await navigator.credentials.get({
        publicKey: {
            challenge: base64ToArrayBuffer(options.challenge),
            rpId: 'example.com',
            allowCredentials: [], // Empty для autofill
            userVerification: 'required',
            timeout: 60000,
        },
        mediation: 'conditional', // Enables autofill UI
    });

    // Отправить credential к серверу
    const loginResponse = await fetch('/api/auth/login/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            credential: {
                id: credential.id,
                rawId: arrayBufferToBase64(credential.rawId),
                response: {
                    clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
                    authenticatorData: arrayBufferToBase64(credential.response.authenticatorData),
                    signature: arrayBufferToBase64(credential.response.signature),
                    userHandle: arrayBufferToBase64(credential.response.userHandle),
                },
                type: credential.type,
            },
        }),
    });

    const result = await loginResponse.json();
    if (result.success) {
        console.log('✅ Authenticated successfully');
    }
}
```

**Источники**:

- https://winbuzzer.com/2024/11/24/microsoft-updates-windows-11-webauthn-apis-to-enable-third-party-passkeys-xcxwbn/
- https://fidoalliance.org/passkeys/
- https://www.corbado.com/faq/what-is-difference-fido2-passkeys

#### 3.2 FedCM (Federated Credential Management)

**2024 Migration** ⭐:

- **Апрель 2024**: GIS developers automatically migrated к FedCM API
- GIS began migrating websites без cross-origin iframe/CSP issues к FedCM на Chrome
- **Июль 2024**: Migration websites с cross-origin iframe/CSP issues
- **Октябрь 2024**: Все One Tap traffic migration к FedCM

**Key Features Added**:

- **Auto-reauthentication**: Users могут reauthenticate automatically на return
- **Cross-origin iframe support**: Теперь available (embedder должен specify `Permissions-Policy: identity-credentials-get`)
- **Login Status API**: Mechanism для websites (especially IdPs) inform browser user's login status (required для FedCM)

**Browser Support**:

- **Chrome**: Shipped в Chrome 108
- **Firefox**: Prototype implementation, initial prototype added late 2022
- **Safari/Apple**: Expressed general support и interest

**Status Post-Cookie Reversal**:

- Google continues FedCM investment independent от third-party cookie changes
- Migration continues as scheduled

**Практический пример**:

```javascript
// Federated sign-in с FedCM
async function federatedSignIn() {
    try {
        // Request identity credential
        const credential = await navigator.credentials.get({
            identity: {
                providers: [
                    {
                        configURL: 'https://idp.example.com/fedcm.json',
                        clientId: 'client_id_from_idp',
                        nonce: generateNonce(),
                    },
                ],
            },
        });

        // Отправить token к backend
        const response = await fetch('/api/auth/fedcm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: credential.token,
            }),
        });

        const result = await response.json();
        console.log('✅ Signed in:', result.user);
    } catch (error) {
        console.error('FedCM sign-in failed:', error);
    }
}

// Auto-reauthentication
async function autoReauth() {
    // FedCM может automatically reauthenticate
    // если user previously signed in
    const credential = await navigator.credentials.get({
        identity: {
            providers: [
                {
                    configURL: 'https://idp.example.com/fedcm.json',
                    clientId: 'client_id_from_idp',
                },
            ],
        },
        mediation: 'optional', // Allows auto-signin
    });

    if (credential) {
        console.log('✅ Auto-reauthenticated');
    }
}
```

**Источники**:

- https://developers.googleblog.com/2024/02/federated-credential-management-migration-for-google-identity-services.html
- https://developer.chrome.com/docs/privacy-sandbox/fedcm-updates/
- https://developer.mozilla.org/en-US/docs/Web/API/FedCM_API

### 4. Cookies и Storage — партиционирование и изоляция

#### 4.1 CHIPS (Cookies Having Independent Partitioned State)

**Статус 2024**: Широкая поддержка в Chrome, постепенное внедрение в других браузерах

**Chrome**:

- Supported by default в Chrome 114+ (май 2023)
- Widely available Chrome 115+
- Стабильная поддержка весь 2024

**Firefox**:

- Все third-party cookies partitioned by default в ETP Strict mode и private browsing
- Intent к prototype announced май 2024
- **Firefox 131**: поддержка `Partitioned` attribute introduced ⭐

**Safari**:

- Не implemented по состоянию на май 2024
- Использует algorithmic approach через Intelligent Tracking Prevention (ITP)
- Classifies cookies и limits/blocks third-party cookies automatically

**Chromium-based Browsers**:

- Edge, Opera, Brave gained support around same time как Chrome
- Specifics default activation и Dev Tools UI могут vary

**Technical Details**:

- Cookies marked `Partitioned` double-keyed: by origin устанавливающим их И origin top-level page
- Могут быть read только в контексте top-level site где they were set
- Должны быть set с `Secure` attribute
- Recommended: Use `__Host-` prefix

**Syntax**:

```http
Set-Cookie: __Host-session=abc123; Secure; Path=/; SameSite=None; Partitioned
```

**Практический пример — Embedded Service**:

```javascript
// Server-side (Node.js/Express)
// Embedded chat widget на multiple sites

app.post('/api/chat/init', (req, res) => {
    const sessionId = generateSessionId();
    const topLevelSite = req.headers.origin;

    // Set partitioned cookie
    res.cookie('__Host-chat-session', sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        partitioned: true, // ✅ Partitioned by top-level site
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.json({
        sessionId,
        message: 'Chat session initialized',
    });
});

// Каждый top-level site получит изолированный chat session
// Site A: __Host-chat-session=abc123 (partition A)
// Site B: __Host-chat-session=xyz789 (partition B)
```

**Security Implications**:

CHIPS — часть Privacy Sandbox initiative, направленной на отказ от third-party cookies при сохранении необходимой functionality. Partitioned cookies предотвращают cross-site tracking, так как каждый top-level site имеет свой isolated набор cookies для embedded content.

**Diagram**:

```
┌─────────────────────────────────────────┐
│  Top-level site: shop-a.example         │
│  ┌──────────────────────────────────┐   │
│  │ Embedded: payment-provider.com   │   │
│  │ Cookie: session=ABC (partition A)│   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Top-level site: shop-b.example         │
│  ┌──────────────────────────────────┐   │
│  │ Embedded: payment-provider.com   │   │
│  │ Cookie: session=XYZ (partition B)│   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘

Cookies изолированы между partitions — tracking невозможен
```

**Источники**:

- https://developer.chrome.com/docs/privacy-sandbox/chips/
- https://privacysandbox.google.com/cookies/chips
- https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies

#### 4.2 Storage Access API

**Назначение**: Позволяет embedded content запросить доступ к third-party cookies privacy-preserving способом.

**Browser Support и Различия (2024)**:

**Chrome**:

- Shows prompts для всех embedded content без prior storage access
- Automatically grants access если embedded content и embedding site часть same Related Website Set
- Subsequent visits могут resolve без prompt/user interaction
- Cookies должны use `SameSite=None` и `Secure`

**Firefox**:

- Prompts только после threshold number site requests
- Prompts skipped для known websites (interacted with на top level) для первых 5 attempts
- Cookies defaulted к `SameSite=None`, не restricted к Secure cookies

**Safari**:

- Shows prompts для всех embedded content без prior storage access
- Always requires user interaction
- Cookies defaulted к `SameSite=None`, не restricted к Secure cookies
- Нет support для storage-access permission

**Access Duration**:

- Grants phased out после 30 days browser usage без user interaction
- Interaction extends limit другими 30 days

**Практический пример**:

```javascript
// Embedded iframe requesting storage access
async function requestStorageAccess() {
    try {
        // Проверить, есть ли уже доступ
        const hasAccess = await document.hasStorageAccess();

        if (!hasAccess) {
            console.log('Requesting storage access...');

            // Request access (может показать prompt user)
            await document.requestStorageAccess();

            console.log('✅ Storage access granted');
        } else {
            console.log('✅ Already have storage access');
        }

        // Теперь можем использовать cookies
        fetch('/api/user-data', {
            credentials: 'include', // Включить cookies
        });
    } catch (error) {
        console.error('❌ Storage access denied:', error);
        // Handle fallback behavior
    }
}

// Request storage access на user interaction
document.getElementById('login-button').addEventListener('click', async () => {
    await requestStorageAccess();
    // Proceed с login flow
});
```

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API
- https://developers.google.com/privacy-sandbox/3pcd/storage-access-api

### 5. Tracking Prevention — браузерные защиты

#### 5.1 Bounce Tracking Protection

**Назначение**: Предотвратить tracking через redirect bounces, briefly navigating через tracking domain.

**Browser Implementations (2024)**:

**Safari**:

- First shipped в ITP 2.0
- Expires/deletes storage на sites после client-detected bounce tracking
- Нет interaction в течение 1-7 days triggers deletion
- Использует algorithmic approach

**Chrome**:

- **Launched by default октябрь 2023** для users с third-party cookies blocked
- Monitors navigations и flags sites часть "stateful bounce"
- **45-day interaction window**: Если нет user interaction и third-party cookies blocked, state deleted
- Periodically examines flagged sites

**Firefox**:

- **Firefox 133 (26 ноября 2024)**: Added Bounce Tracking Protection ⭐
- **Только enabled для strict protection users**
- Closely follows Bounce Tracking Mitigations spec draft
- Detects bounce trackers based на heuristics
- **45-day interaction window**

**Key Differences**:

| Browser | Interaction Window | Detection Method | Availability |
| --- | --- | --- | --- |
| Safari | 1-7 days | Proprietary ITP | Все users |
| Chrome | 45 days | Web standard | Cookie blockers |
| Firefox | 45 days | Web standard | Strict mode |

**Как работает Bounce Tracking**:

```
Пользователь кликает ссылку на site-a.example
    ↓
Redirect через tracker.example (sets cookies, runs scripts)
    ↓
Final destination: site-b.example

Bounce Tracking Protection:
1. Detects tracker.example как bounce tracker
2. Если нет interaction с tracker.example в течение 45 days
3. Deletes все storage для tracker.example
```

**Источники**:

- https://privacycg.github.io/nav-tracking-mitigations/
- https://www.ghacks.net/2024/11/26/firefox-133-comes-with-bounce-tracking-protection-and-other-enhancements/
- https://developer.chrome.com/blog/bounce-tracking-mitigations-dev-trial
- https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Bounce_tracking_mitigations

#### 5.2 Firefox Enhanced Tracking Protection (ETP)

**2024 Update** ⭐:

- **Август 2024**: Firefox plans блокировать even more third-party cookies starting 2024
- New cookie partitioning и clearing mechanisms
- Cookies won't stick around as long

**Total Cookie Protection**:

- Rolled out by default ко всем Firefox users worldwide к 2024
- Confines cookies к site где created
- Prevents tracking companies от using cookies across sites
- Avoids limitations list-based blocking путём restricting functionality для всех cookies

**Global Privacy Control (GPC)**:

- Built into Firefox
- Sends clear signal: User не wish быть tracked или have data sold

**Источники**:

- https://blog.mozilla.org/en/mozilla/firefox-rolls-out-total-cookie-protection-by-default-to-all-users-worldwide/
- https://piwik.pro/glossary/enhanced-tracking-protection/
- https://clearcode.cc/blog/firefox-privacy-changes-timeline/

### 6. Privacy Sandbox APIs — статус после разворота cookies

#### 6.1 Privacy Sandbox Status в 2024

**Major Update**: Несмотря на cookie deprecation reversal, Privacy Sandbox APIs продолжили mature и generally available.

**Official Statement**: "The change в Privacy Sandbox direction does not impact Google Identity Service's investment в FedCM, seeing it как valuable для improving privacy, security и user experience federated sign-in experiences independently от any changes к third-party cookies."

#### 6.2 Topics API

**Статус**: Generally available в Chrome Stable 115 (май 2023), continued maturity в 2024

**Implementation Details**:

- Topics refreshed once per epoch (1 week в Chrome's implementation)
- Manually curated для 50,000 top sites
- Использует classifier model для topic assignment
- Topics unique к каждому device (нет cross-device sharing)
- Local storage only

**2024 Feedback**:

- Topics API has low coverage (identified в Q4 2024 reporting period)
- Questions и feedback received regarding Topics, Protected Audience, и Attribution Reporting APIs

**Browser Support**: Chrome only

**Практический пример**:

```javascript
// Получить topics для user
async function getUserTopics() {
    if (!document.featurePolicy.allowsFeature('browsing-topics')) {
        console.log('Topics API не доступен');
        return [];
    }

    try {
        const topics = await document.browsingTopics();

        console.log('User topics:', topics);
        // topics это array объектов:
        // [
        //   { value: 123, taxonomyVersion: "1", modelVersion: "2" },
        //   { value: 456, taxonomyVersion: "1", modelVersion: "2" }
        // ]

        return topics;
    } catch (error) {
        console.error('Topics API error:', error);
        return [];
    }
}

// Использовать topics для ad targeting
async function showRelevantAds() {
    const topics = await getUserTopics();

    if (topics.length > 0) {
        // Fetch ads based на topics
        const response = await fetch('/api/ads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topics }),
        });

        const ads = await response.json();
        displayAds(ads);
    } else {
        // Fallback к contextual ads
        showContextualAds();
    }
}
```

**Источники**:

- https://developer.chrome.com/en/docs/privacy-sandbox/topics/latest/
- https://privacysandbox.google.com/private-advertising/topics
- Privacy Sandbox Q4 2024 Progress Report

#### 6.3 Protected Audience API (formerly FLEDGE)

**2024 Enhancements**:

- Updates к interest group fields accommodate deal information (deal ID и seat ID) для private marketplaces
- Transition away от event-level reporting announced (no sooner than 2026)
- Requirement использовать Fenced Frames (effective no sooner than 2026)

**Industry Feedback**:

- Criteo's 2024 tests criticized functionality
- IAB Tech Lab report claimed industry "isn't ready" для shift

**Источники**:

- https://privacysandbox.google.com/overview/feedback/report-2024-q1
- https://quickcreator.io/blog/privacy-sandbox-topics-protected-audience-api-explained/

### 7. Browser-Specific Security Updates

#### 7.1 Chrome Security Highlights 2024

**Chrome 124 (апрель 2024)**:

- **Post-Quantum Cryptography enabled by default** ⭐⭐

**Chrome 126 (июнь 2024)**:

- Fixed 4 significant vulnerabilities
- **High-severity type confusion в V8** (CVE-2024-6100) — reported during TyphoonPWN 2024

**Chrome 128 (август 2024)**:

- 38 security vulnerabilities fixed
- **CVE-2024-7971**: Being actively exploited в wild (Critical) ⭐
- **BREAKING CHANGE**: Removed chrome://flag allowing users disable third-party storage partitioning

**Chrome 129 (сентябрь 2024)**:

- **Upgraded Safety Check** (runs automatically в background)
- Easier opt-out unwanted website notifications
- One-time website permissions
- Automatic revocation permissions от sites flagged by Safe Browsing

**Chrome 131 (ноябрь 2024)**:

- **Upgraded к final ML-KEM standard** для post-quantum crypto ⭐⭐

**Источники**:

- https://www.securityweek.com/chrome-126-update-patches-vulnerability-exploited-at-hacking-competition/
- https://www.secpod.com/blog/google-chrome-128-update-resolves-critical-security-vulnerabilities/
- https://cybersecuritynews.com/chrome-129-released/
- https://cybersecuritynews.com/chrome-131-security-update/

#### 7.2 Firefox Security Highlights 2024

**Firefox 122 (январь 2024)**:

- 15 vulnerabilities patched
- 5 high-severity bugs
- **CVE-2024-0742**: Failure update user input timestamp

**Firefox 124 (март 2024)**:

- 12 security defects patched
- **Critical-severity memory safety bugs** (CVE-2024-2615) ⭐

**Firefox 125 (апрель 2024)**:

- **CVE-2024-3302**: Denial-of-service using HTTP/2 CONTINUATION frames (HTTP/2 Continuation Flood attack) ⭐

**Firefox 127 (июнь 2024)**:

- **Mixed Content Upgrade**: Starting Firefox 127, automatically upgrades audio, video, и image subresources от HTTP к HTTPS ⭐
- 93% Firefox requests already HTTPS

**Firefox 128 (июль 2024)**:

- **DTLS 1.3 Support**: Firefox became first browser support DTLS 1.3, providing robust end-to-end encryption для real-time audio и video data ⭐

**Firefox 133 (ноябрь 2024)**:

- **Bounce Tracking Protection** added ⭐

**Pwn2Own Response**:

- Mozilla achieved **21-hour fix time** на Pwn2Own 2024
- Earned industry award для fastest к patch

**Источники**:

- https://www.securityweek.com/firefox-122-patches-15-vulnerabilities/
- https://www.mozilla.org/en-US/security/advisories/mfsa2024-12/
- https://www.securityweek.com/chrome-124-firefox-125-patch-high-severity-vulnerabilities/
- https://blog.mozilla.org/security/2024/06/05/firefox-will-upgrade-more-mixed-content-in-version-127/
- https://blog.mozilla.org/security/2024/04/04/rapidly-leveling-up-firefox-security/

#### 7.3 Safari Security Highlights 2024

**Safari 17.3 (январь 2024)**:

- 3 WebKit vulnerabilities patched
- **CVE-2024-23213**: Processing malicious web content could lead к arbitrary code execution (may have been exploited) ⭐
- **CVE-2024-23211**: Malicious webpage could fingerprint users

**Safari 17.4 (март 2024)**:

- **CVE-2024-23254**: Logic issue — malicious web content could prevent CSP enforcement
- **CVE-2024-23273**: Processing web content could lead к denial-of-service

**Safari 18.0 (сентябрь 2024)**:

- **Mixed Content Auto-Upgrade**: HTTPS для всех images, video, audio ⭐
- **Distraction Control**: Hide intrusive elements (popups, newsletter overlays)
- AI-powered "Highlights": Automatically detect и highlight relevant page information
- **AV1 hardware decoding support**
- **WasmGC**: Enabled by default

**WebKit Private Browsing 2.0** (июль 2024):

- Advanced tracking и fingerprinting protection
- Available во всех browsing modes на iOS, iPadOS, visionOS

**Источники**:

- https://support.apple.com/en-us/120339
- https://support.apple.com/en-us/120894
- https://webkit.org/blog/15443/news-from-wwdc24-webkit-in-safari-18-beta/
- https://webkit.org/blog/15697/private-browsing-2-0/

### 8. Deprecations и Removals

#### 8.1 HTTP/2 Server Push Removal

**Статус**: Removed от major browsers

**Firefox 132** (октябрь 2024) ⭐:

- HTTP/2 Server Push deactivated by default
- Preference `network.http.http2.allow-push` теперь set к `false`
- Feature больше не maintained by major browsers
- Implementation может быть completely removed в future release

**Chrome**: Removed HTTP/2 Push в Chrome 106 (2022)

**Reason**: Compatibility issues с various sites, limited adoption, нет support в других major browsers

**Alternative Technologies**:

- ✅ 103 Early Hints
- ✅ `<link rel="preload">`
- ✅ `<link rel="prefetch">`
- ✅ Speculation Rules API

**Источники**:

- https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/132
- https://developer.chrome.com/blog/deps-rems-106

#### 8.2 Third-Party Storage Partitioning Flag (Chrome 128)

**Статус**: **Removed** ⭐

**Что изменилось**: Chrome://flag для disable third-party storage partitioning removed.

**Impact**: **Breaking change** — enforces privacy через storage partitioning. Не может быть disabled пользователями.

**Источник**:

- https://www.secpod.com/blog/google-chrome-128-update-resolves-critical-security-vulnerabilities/

## Browser Support Tables

### HTTP/3 Support

| Browser | Версия | Статус | Дата |
| --- | --- | --- | --- |
| Chrome | 87+ | ✅ Полная поддержка | Ноябрь 2020 |
| Edge | 87+ | ✅ Полная поддержка | Ноябрь 2020 |
| Firefox | 88+ | ✅ Полная поддержка | Апрель 2021 |
| Safari | 16.0+ | ✅ Production | 2023-2024 |
| Opera | 73+ | ✅ Полная поддержка | Ноябрь 2020 |

### Baseline-достижения 2024

| Feature | Baseline Date | Triggered By | Widely Available |
| --- | --- | --- | --- |
| Priority Header | 29 октября 2024 | Firefox 132 | Апрель 2027 |
| Fetch Priority | 29 октября 2024 | Firefox 132 | Апрель 2027 |
| bytes() Method | Ноябрь 2024 | Chrome 132 | Апрель 2027 |
| keepalive | Ноябрь 2024 | Firefox 133 | Апрель 2027 |

### Постквантовая Криптография

| Browser | Версия | Algorithm | Дата |
| --- | --- | --- | --- |
| Chrome | 124 | X25519Kyber768 | Апрель 2024 |
| Chrome | 131 | ML-KEM (final) | Ноябрь 2024 |
| Edge | 124+ | X25519Kyber768 | Апрель 2024 |
| Firefox | ❌ | Не поддерживается | — |
| Safari | ❌ | Не поддерживается | — |

### Passkeys Support

| Platform | Browser/OS | Support Level | Дата |
| --- | --- | --- | --- |
| Windows | Chrome | ✅ Полная | — |
| Windows 11 | Windows Hello | ✅ + Third-party | Ноябрь 2024 |
| macOS | Safari/Chrome | ✅ iCloud Keychain | — |
| iOS/iPadOS | Safari | ✅ Полная | — |
| Android | Chrome | ✅ Полная | — |

## Практические рекомендации

### HTTP/3 Migration

**Когда внедрять**:

- ✅ Если ваш CDN поддерживает (Cloudflare, Fastly, Akamai)
- ✅ Для mobile-first приложений (connection migration)
- ✅ Для real-time приложений (lower latency)

**Checklist**:

```bash
# 1. Verify server support
curl -I --http3 https://your-site.com

# 2. Check HTTP/3 via DevTools
# Network tab → Protocol column → h3

# 3. Test fallback
# Ensure HTTP/2 fallback works если HTTP/3 unavailable

# 4. Monitor metrics
# Track connection success rate, latency improvements
```

### Security Headers Configuration 2024

**Recommended Headers**:

```http
# Обязательные security headers
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin

# CSP (кастомизировать под ваше приложение)
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted-cdn.com; style-src 'self' 'unsafe-inline'

# Cross-origin isolation (если нужны SharedArrayBuffer, high-res timers)
Cross-Origin-Embedder-Policy: credentialless
Cross-Origin-Opener-Policy: same-origin

# Permissions policy
Permissions-Policy: geolocation=(self), microphone=(), camera=()
```

### Third-Party Cookies Alternatives

**Для Authentication**:

1. **FedCM** (Federated Credential Management)
2. **Storage Access API**
3. **Related Website Sets**

**Для Advertising**:

1. **Topics API** (interest-based)
2. **Protected Audience API** (remarketing)
3. **Attribution Reporting API** (conversion measurement)

**Для Cross-Site Storage**:

1. **CHIPS** (Partitioned cookies)
2. **Shared Storage API** (Chrome only)

### Passkeys Implementation

**Step-by-step**:

1. **Backend Setup**: Implement FIDO2 server (libraries: fido2-lib, webauthn-lib)
2. **Registration Flow**: Create credential при signup
3. **Authentication Flow**: Get credential при login
4. **Autofill UI**: Use `mediation: 'conditional'` для autofill UX
5. **Fallback**: Keep password option для backwards compatibility

### Performance Optimization

**Fetch Priority**:

```html
<!-- LCP hero image -->
<img src="/hero.jpg" fetchpriority="high" alt="Hero" />

<!-- Critical CSS -->
<link rel="stylesheet" href="/critical.css" fetchpriority="high" />

<!-- Below-fold images -->
<img src="/section2.jpg" fetchpriority="low" loading="lazy" alt="Section 2" />

<!-- Analytics -->
<script src="/analytics.js" fetchpriority="low" async></script>
```

**Speculation Rules**:

```html
<script type="speculationrules">
    {
        "prerender": [
            {
                "where": {
                    "href_matches": "/products/*"
                },
                "eagerness": "moderate"
            }
        ]
    }
</script>
```

## Заключение

2024 год стал переломным для веб-индустрии. Отмена планов по deprecation third-party cookies изменила trajectory, но не остановила движение к более приватному вебу. Privacy Sandbox APIs продолжили развитие, passkeys стали mainstream, и постквантовая криптография integrated в production browsers.

HTTP/3 достиг ~30% adoption, Baseline-статуса добились критически важные APIs (Priority, Fetch Priority, keepalive, bytes()), а bounce tracking protection теперь доступна во всех major browsers.

### Ключевые выводы

1. **Privacy-first подход сохранился** несмотря на cookie reversal
2. **Постквантовая криптография** стала реальностью в production
3. **Passkeys** adoption растёт экспоненциально (1B+ authentications)
4. **HTTP/3** стабилизировался на ~30% трафика
5. **Browser vendors** продолжают инновации в tracking prevention

### Что ожидать в 2025

- WebAuthn Level 3 finalization
- Continued Privacy Sandbox maturation
- Expanded HTTP/3 adoption
- More tracking prevention mechanisms
- Further Baseline achievements

## Источники

Этот отчёт основан на следующих официальных источниках:

**Browser Release Notes**:

- Chrome Platform Status: https://chromestatus.com/
- Firefox Release Notes: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases
- WebKit Blog: https://webkit.org/blog/

**Specifications**:

- RFC 9114 (HTTP/3): https://datatracker.ietf.org/doc/html/rfc9114
- RFC 9218 (Priority): https://datatracker.ietf.org/doc/html/rfc9218
- W3C Specifications: https://www.w3.org/
- WHATWG Standards: https://whatwg.org/

**Industry Resources**:

- Privacy Sandbox: https://privacysandbox.com/
- MDN Web Docs: https://developer.mozilla.org/
- Can I Use: https://caniuse.com/
- Web Platform Features Explorer: https://web-platform-dx.github.io/web-features-explorer/

**Research Data**:

- HTTP Archive 2024 Web Almanac: https://almanac.httparchive.org/en/2024/http
- Cloudflare Radar: https://radar.cloudflare.com/
- Security advisories: CVE, Mozilla Security Advisories, Apple Security Updates

**Дата исследования**: 18 ноября 2024
