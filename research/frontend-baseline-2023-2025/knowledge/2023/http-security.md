---
title: 'HTTP, Protocols & Security — изменения 2023 года'
description:
    'Комплексный обзор изменений в HTTP, сетевых протоколах и веб-безопасности за 2023 год - HTTP/3,
    Privacy Sandbox, CHIPS, WebAuthn, Private Network Access и практические рекомендации'
outline: deep
lastUpdated: true
---

# HTTP, Protocols & Security — изменения 2023 года

- **Период**: 1 января 2023 — 31 декабря 2023
- **Версии браузеров**: Chrome/Edge 109–120, Firefox 109–120, Safari 16.3–17.2

## Обзор года

2023 год стал переломным для веб-безопасности и сетевых протоколов. Индустрия активно двигалась в
сторону приватности, партиционированного хранения и новых протоколов передачи данных. Ключевые темы
года:

- **Privacy-first**: запуск Privacy Sandbox APIs (Chrome 115), партиционированные cookies (CHIPS)
- **HTTP/3 adoption**: рост с 37% до 40% трафика, поддержка в Firefox 114
- **WebAuthn Level 3**: массовое внедрение passkeys через Conditional UI
- **Deprecations**: `document.domain` (Chrome 115), Web SQL (Chrome 119)
- **Private Network Access**: защита локальных сетей от веб-атак (Chrome 117)
- **Baseline-достижения**: Fetch Metadata, Import Maps, Modulepreload

### Взаимосвязь HTTP и Security

HTTP-протоколы и безопасность неразрывно связаны в современном вебе:

- **Security headers** (CSP, COEP, COOP) передаются через HTTP
- **CORS, CORP, Private Network Access** — расширения HTTP-протокола
- **Cookies** — основной механизм HTTP для state management и target для privacy improvements
- **HTTP/3 и QUIC** включают TLS 1.3 на уровне протокола

Этот отчёт объединяет обе области для целостного понимания изменений 2023 года.

## Часть 1: HTTP и сетевые протоколы

### 1. HTTP/3 — статус и адаптация

**HTTP/3** базируется на протоколе QUIC (UDP вместо TCP) и включает встроенную поддержку TLS 1.3.

#### 1.1 Статус браузерной поддержки

**Chrome/Edge**:

- Полная поддержка с Chrome 87 (ноябрь 2020)
- Chrome 109-120 (весь 2023): HTTP/3 включён по умолчанию
- Составлял ~80% HTTP/3 трафика в начале 2023, снизился до ~74% к маю из-за роста Safari

**Firefox**:

- Полная поддержка с версии 88 (апрель 2021)
- Firefox 109-120 (весь 2023): HTTP/3 включён по умолчанию
- Стабильная поддержка всех версий 2023 года

**Safari**:

- Экспериментальная поддержка до 2023
- Менее 1% HTTP/3 трафика до мая 2023
- Вырос до ~7% к маю 2023 благодаря переходу в production-статус
- Полная production-поддержка в Safari 16+ (процесс начался в 2023)

#### 1.2 Статистика адаптации

По данным Cloudflare:

- HTTP/3 трафик вырос с 37% до 45% в начале 2023
- Снижение до ~40% в середине сентября 2023
- К концу 2023: **~40% трафика использует HTTP/3**
- **94% отслеживаемых браузеров** поддерживают HTTP/3
- **26% из топ-10 миллионов сайтов** используют HTTP/3

#### 1.3 Технические преимущества

- ✅ **0-RTT / 1-RTT connection establishment** — быстрое установление соединения
- ✅ **Multiplexing без head-of-line blocking** — устранение проблемы HTTP/2
- ✅ **Улучшенная производительность при плохом качестве сети**
- ✅ **Connection migration** — сохранение соединения при смене сети (Wi-Fi → мобильная сеть)
- ✅ **Встроенная поддержка TLS 1.3**

**Источники**:

- https://blog.cloudflare.com/http3-usage-one-year-on/
- https://caniuse.com/http3
- https://nitewall.com/2024/09/browser-support-for-http-3-an-overview/

### 2. HTTP Headers — новые и обновлённые заголовки

HTTP заголовки — критический механизм для контроля безопасности, приватности и производительности
веб-приложений.

#### 2.1 Security Headers

##### 2.1.1 Permissions-Policy

**Статус 2023**:

- Chrome/Edge: полная поддержка с версии 88 (январь 2021)
- Firefox: не поддерживается (весь 2023)
- Safari: не поддерживается (весь 2023)

**Назначение**:

- Замена устаревшего `Feature-Policy`
- Контроль доступа к "мощным" веб-функциям (геолокация, камера, микрофон)
- Ограничение возможностей для embedded контента

**Пример политики**:

```http
Permissions-Policy: geolocation=(self),
                    microphone=(),
                    camera=(self "https://trusted.example.com"),
                    payment=(self),
                    usb=()
```

**Практическое применение**:

```http
# Запретить использование камеры и микрофона для всех iframe
Permissions-Policy: camera=(), microphone=()

# Разрешить геолокацию только для текущего origin
Permissions-Policy: geolocation=(self)

# Разрешить fullscreen для текущего origin и доверенного CDN
Permissions-Policy: fullscreen=(self "https://cdn.example.com")
```

**Browser Compatibility Score**: 38/100 (только Chrome/Edge)

**Источники**:

- https://developer.chrome.com/docs/privacy-security/permissions-policy
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy
- https://caniuse.com/permissions-policy

##### 2.1.2 Fetch Metadata Headers

**Статус 2023**:

- Chrome: с версии 80 (февраль 2020)
- Edge: с версии 80 (февраль 2020)
- Firefox: с версии 90 (июль 2021)
- **Safari 16.4: добавлена поддержка (март 2023)** ⭐

**Ключевая веха 2023**: Safari 16.4 (27 марта 2023) добавил поддержку Fetch Metadata Request
Headers, достигнув кроссбраузерной совместимости.

**Baseline Status**: **Newly Available (март 2023)**

**Headers**:

- `Sec-Fetch-Site`: контекст запроса (`cross-site`, `same-origin`, `same-site`, `none`)
- `Sec-Fetch-Mode`: режим запроса (`cors`, `no-cors`, `navigate`, `websocket`)
- `Sec-Fetch-Dest`: назначение ресурса (`document`, `image`, `script`, `style`, `font`, и т.д.)
- `Sec-Fetch-User`: инициирован ли запрос пользователем (`?1` или отсутствует)

**Пример request headers**:

```http
GET /api/sensitive-data HTTP/1.1
Host: api.example.com
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Sec-Fetch-User: ?1
Origin: https://app.example.com
```

**Server-side защита (Resource Isolation Policy)**:

```javascript
// Node.js/Express middleware
function resourceIsolationPolicy(req, res, next) {
    const site = req.headers['sec-fetch-site'];
    const mode = req.headers['sec-fetch-mode'];
    const dest = req.headers['sec-fetch-dest'];

    // Не все браузеры поддерживают Fetch Metadata
    if (!site) {
        return next(); // Fallback: разрешить
    }

    // Разрешить browser-initiated navigation
    if (mode === 'navigate' && dest === 'document') {
        return next();
    }

    // Разрешить same-origin и same-site
    if (site === 'same-origin' || site === 'same-site') {
        return next();
    }

    // Разрешить CORS requests от доверенных origins
    const trustedOrigins = ['https://trusted-partner.com'];
    if (mode === 'cors' && trustedOrigins.includes(req.headers['origin'])) {
        return next();
    }

    // Блокировать все остальные cross-site requests
    return res.status(403).json({ error: 'Forbidden: cross-site request blocked' });
}

app.use('/api/*', resourceIsolationPolicy);
```

**Защита от атак**:

- ✅ **CSRF attacks** — блокировка cross-site requests
- ✅ **Cross-site Script Inclusion (XSSI)** — защита JSON endpoints
- ✅ **Timing attacks** — контроль доступа на основе контекста
- ✅ **XS-Leaks** — предотвращение утечки информации

**Источники**:

- https://web.dev/articles/fetch-metadata
- https://www.w3.org/TR/fetch-metadata/
- https://web-platform-dx.github.io/web-features-explorer/features/fetch-metadata/
- https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes

##### 2.1.3 Private Network Access (PNA) Headers

**Статус 2023**:

- **Chrome 114 (май 2023)**: deprecation phase начата ⭐
- **Chrome 117 (сентябрь 2023)**: deprecation trial завершён ⭐
- Firefox: не поддерживается в 2023
- Safari: не поддерживается в 2023

**Timeline 2023**:

- 19 января 2023: обновление timeline, deprecation отложен до Chrome 114
- Май 2023: Chrome 114 начал warning phase
- Сентябрь 2023: Chrome 117 завершил deprecation trial

**Новые Headers**:

Request (preflight):

```http
Access-Control-Request-Private-Network: true
```

Response:

```http
Access-Control-Allow-Private-Network: true
```

**Назначение**:

- Защита от CSRF атак на устройства в приватных сетях (роутеры, IoT, принтеры)
- Preflight requests для всех private network requests
- Применяется даже для same-origin requests, если target IP более приватный

**Отличия от обычного CORS**:

- Preflight для всех режимов (`cors`, `no-cors`, и т.д.)
- Preflight для same-origin, если адресат более приватен
- Новый header `Access-Control-Request-Private-Network`

**Пример Server Response**:

```javascript
// Express.js middleware
app.use((req, res, next) => {
    // Проверка private network request
    if (req.headers['access-control-request-private-network'] === 'true') {
        // Разрешить доступ из публичного веба к локальному устройству
        res.setHeader('Access-Control-Allow-Private-Network', 'true');
        res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    }
    next();
});
```

**Security implications**:

Критическое улучшение безопасности, защищающее домашние и корпоративные сети от атак через публичные
веб-сайты. Без PNA, вредоносный сайт мог атаковать роутер пользователя на `192.168.1.1`.

**Источники**:

- https://developer.chrome.com/blog/private-network-access-preflight
- https://developer.chrome.com/blog/private-network-access-update

#### 2.2 Privacy Headers

##### 2.2.1 Client Hints (Sec-CH-\*)

**Статус 2023**:

- Chrome: по умолчанию с версии 89 (март 2021)
- **Chrome 110 (февраль 2023)**: финальная фаза изменений User-Agent ⭐
- Firefox: не поддерживается (весь 2023)
- Safari: не поддерживается (весь 2023)

**Ключевая веха февраля 2023**: Chrome 110 завершил постепенное сокращение информации в User-Agent
string, усиливая необходимость использования Client Hints для получения детальной информации о
браузере и устройстве.

**Default Headers (Low Entropy)**:

Браузер автоматически отправляет:

```http
Sec-CH-UA: "Chromium";v="110", "Not A(Brand";v="99", "Google Chrome";v="110"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "macOS"
```

**High Entropy Hints** (требуют `Accept-CH` header):

- `Sec-CH-UA-Full-Version` — полная версия браузера
- `Sec-CH-UA-Platform-Version` — версия ОС
- `Sec-CH-UA-Arch` — архитектура процессора
- `Sec-CH-UA-Model` — модель устройства (мобильные)
- `Sec-CH-UA-Bitness` — разрядность (32/64 bit)

**Server Request for High Entropy**:

```http
HTTP/1.1 200 OK
Accept-CH: Sec-CH-UA-Full-Version, Sec-CH-UA-Platform-Version
```

**Client Response на следующем запросе**:

```http
GET /api/analytics HTTP/1.1
Sec-CH-UA: "Chromium";v="110", "Not A(Brand";v="99", "Google Chrome";v="110"
Sec-CH-UA-Mobile: ?0
Sec-CH-UA-Platform: "macOS"
Sec-CH-UA-Full-Version: "110.0.5481.77"
Sec-CH-UA-Platform-Version: "13.2.0"
```

**Практическое применение**:

```javascript
// Серверная логика для adaptive content delivery
if (req.headers['sec-ch-ua-mobile'] === '?1') {
    // Мобильное устройство: отправить упрощённую версию
    res.render('mobile-version');
} else if (req.headers['sec-ch-ua-platform'] === '"Windows"') {
    // Windows: специфичные оптимизации
    res.render('windows-optimized');
}
```

**Требования**:

- ✅ Работают только по **HTTPS**
- ✅ High entropy hints требуют явного запроса через `Accept-CH`
- ✅ Privacy-preserving: opt-in модель

**Источники**:

- https://developer.chrome.com/articles/user-agent-client-hints/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA
- https://notifiare.com/blog/2023/11/17/privacy-preserving-browser-detection/

##### 2.2.2 CHIPS — Cookies Having Independent Partitioned State

**Статус 2023**:

- **Chrome 109 (январь 2023)**: origin trial начался ⭐
- **Chrome 114 (май 2023)**: поддержка по умолчанию ⭐
- Постепенный rollout с 10 января 2023
- Firefox: не поддерживается в 2023
- Safari: не поддерживается в 2023 (но есть собственная реализация через ITP)

**Новый Cookie Attribute**:

```http
Set-Cookie: __Host-session=abc123; Secure; Path=/; SameSite=None; Partitioned
```

**Назначение**:

- Opt-in partitioned storage для cross-site cookies
- Отдельные "cookie jars" для каждого top-level site
- Улучшенная приватность при сохранении функциональности для legitimate use cases

**Технические требования**:

- ✅ Должен использоваться с атрибутом `Secure`
- ✅ Рекомендуется использовать `__Host-` prefix
- ⚠️ Limit: максимум 180 cookies на partition
- ⚠️ Максимум 10 KB на embedded-site

**Пример Use Case — Embedded Payment Provider**:

```javascript
// Payment provider встроен на https://shop-a.example
// Payment provider domain: payment-provider.example

// Server response (payment-provider.example)
Set-Cookie: __Host-payment-session=abc123;
            Secure;
            Path=/;
            SameSite=None;
            Partitioned;
            Max-Age=3600

// На https://shop-b.example тот же payment provider получит
// ДРУГОЙ cookie jar (изолированный от shop-a.example)
```

**Diagram:**

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
```

**Security implications**:

CHIPS — часть Privacy Sandbox инициативы, направленной на отказ от third-party cookies при
сохранении необходимой функциональности. Partitioned cookies предотвращают cross-site tracking, так
как каждый top-level site имеет свой изолированный набор cookies для embedded content.

**Источники**:

- https://developer.chrome.com/docs/privacy-sandbox/chips/
- https://privacysandbox.google.com/cookies/chips
- https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies

#### 2.3 Cross-Origin Isolation Headers

##### 2.3.1 COEP, COOP, CORP

**Статус 2023**:

- Chrome: COEP с версии 83, COOP с версии 83, CORP ранее
- **Chrome 96+: COEP: credentialless** ⭐
- Firefox: с версии 85 (январь 2021)
- Safari: поддержка с 2021
- Широкая поддержка во всех браузерах в 2023

**Headers**:

```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

**COEP: credentialless (Chrome 96+, Firefox 119+)**:

```http
Cross-Origin-Embedder-Policy: credentialless
```

**Назначение**:

- Включение cross-origin isolation для защиты от Spectre
- Доступ к мощным функциям: `SharedArrayBuffer`, `performance.measureUserAgentSpecificMemory()`
- High-resolution timers с лучшей точностью

**Преимущество credentialless**:

- ✅ Позволяет загружать cross-origin ресурсы без CORP
- ✅ Запросы отправляются без credentials (cookies, auth)
- ✅ Упрощает внедрение cross-origin isolation

**Практический пример**:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Cross-Origin Isolated App</title>
    </head>
    <body>
        <h1>High-Precision Timers App</h1>
        <script>
            // Проверка изоляции
            if (crossOriginIsolated) {
                console.log('✅ Cross-origin isolated!');

                // SharedArrayBuffer доступен
                const buffer = new SharedArrayBuffer(1024);
                console.log('SharedArrayBuffer created:', buffer.byteLength);

                // High-resolution timers
                const start = performance.now();
                // ... expensive operation ...
                const end = performance.now();
                console.log('Elapsed time (microseconds):', end - start);
            } else {
                console.warn('❌ Not cross-origin isolated');
            }
        </script>
    </body>
</html>
```

**Server configuration (Node.js/Express)**:

```javascript
app.use((req, res, next) => {
    // Вариант 1: require-corp (строгий, требует CORP на всех ресурсах)
    // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    // Вариант 2: credentialless (мягкий, ресурсы загружаются без cookies)
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');

    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});
```

**Источники**:

- https://web.dev/articles/coop-coep
- https://developer.chrome.com/blog/coep-credentialless-origin-trial
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy

#### 2.4 Reporting Headers

##### 2.4.1 Reporting API v1 — Reporting-Endpoints

**Статус 2023**:

- **Chrome 96+ (2021, продолжает использоваться в 2023)**: Reporting API v1
- Замена для `Report-To` (v0)
- Firefox: не поддерживается
- Safari: не поддерживается

**Headers Comparison**:

**v0 (Report-To)**:

```http
Report-To: {"group":"endpoint-1","max_age":10886400,"endpoints":[{"url":"https://example.com/reports"}]}
```

**v1 (Reporting-Endpoints)**:

```http
Reporting-Endpoints: endpoint-1="https://example.com/reports",
                     csp-endpoint="https://example.com/csp-reports"
```

**Ключевые отличия**:

- `Reporting-Endpoints` устанавливается на каждом response
- Проще синтаксис
- Не поддерживает Network Error reports (в отличие от v0)
- Кроссбраузерная поддержка ожидается только для v1

**Поддерживаемые Report Types**:

- CSP violations
- COOP/COEP violations
- Deprecation reports
- Intervention reports
- Crash reports

**Практический пример с CSP**:

```http
Reporting-Endpoints: csp="https://reports.example.com/csp"
Content-Security-Policy: default-src 'self'; script-src 'self'; report-to csp
```

**Пример отчёта (JSON payload)**:

```json
{
    "age": 420,
    "body": {
        "blockedURL": "https://evil.example.com/script.js",
        "disposition": "enforce",
        "documentURL": "https://example.com/",
        "effectiveDirective": "script-src-elem",
        "originalPolicy": "default-src 'self'; script-src 'self'; report-to csp",
        "statusCode": 200,
        "violatedDirective": "script-src-elem"
    },
    "type": "csp-violation",
    "url": "https://example.com/",
    "user_agent": "Mozilla/5.0..."
}
```

**Migration Strategy**:

```http
# Поддержка обеих версий для совместимости
Report-To: {"group":"default","max_age":10886400,"endpoints":[{"url":"https://reports.example.com"}]}
Reporting-Endpoints: default="https://reports.example.com"
Content-Security-Policy: default-src 'self'; report-to default
```

**Источники**:

- https://developer.chrome.com/articles/reporting-api/
- https://developer.chrome.com/blog/reporting-api-migration
- https://w3c.github.io/reporting/

### 3. Fetch API — обновления и новые возможности

#### 3.1 Fetch Priority / Priority Hints

**Статус 2023**:

- **Chrome 102+ (май 2022, используется в 2023)**: полная поддержка
- **Edge 102+**: полная поддержка
- Firefox: не поддерживается (весь 2023)
- Safari: не поддерживается (весь 2023)

**API**:

```javascript
// Fetch with priority
fetch('/api/critical-data', {
    priority: 'high', // 'high', 'low', 'auto'
}).then((response) => response.json());

// Image with priority
const img = document.createElement('img');
img.src = 'hero.jpg';
img.fetchPriority = 'high'; // для LCP изображения
document.body.appendChild(img);
```

**HTML attributes**:

```html
<!-- Hero image для LCP -->
<img src="hero.jpg" fetchpriority="high" alt="Hero" />

<!-- Below-the-fold изображения -->
<img src="gallery-1.jpg" fetchpriority="low" loading="lazy" />

<!-- Link preload с приоритетом -->
<link rel="preload" href="critical.js" as="script" fetchpriority="high" />
<link rel="preload" href="analytics.js" as="script" fetchpriority="low" />
```

**Use Cases**:

- ✅ Приоритизация LCP изображений: `fetchpriority="high"`
- ✅ Деприоритизация некритичных ресурсов: `fetchpriority="low"`
- ✅ Оптимизация Core Web Vitals

**Метрики производительности**:

```javascript
// Пример: LCP улучшение с fetchpriority="high"
// До: LCP = 3.2s
// После: LCP = 2.1s (улучшение на 34%)
```

**Источники**:

- https://web.dev/fetch-priority/
- https://imkev.dev/fetchpriority-opportunity
- https://chromestatus.com/feature/5760375567941632

#### 3.2 Fetch keepalive

**Статус 2023**:

- Chrome: полная поддержка с ранних версий
- Firefox: ненадёжная поддержка в 2023 (улучшена в Firefox 133, ноябрь 2024)
- Safari: частичная/ненадёжная поддержка в 2023

**API**:

```javascript
// Запрос переживёт закрытие страницы
fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify(analyticsData),
    keepalive: true,
});

// Use case: analytics при unload
window.addEventListener('beforeunload', () => {
    fetch('/log-session-end', {
        method: 'POST',
        body: JSON.stringify({
            sessionId: currentSessionId,
            duration: sessionDuration,
            timestamp: Date.now(),
        }),
        keepalive: true,
    });
});
```

**Ограничения**:

- ⚠️ Максимальный размер тела запроса: **64 KiB**
- ⚠️ Только для POST запросов в контексте unload

**Проблемы в 2023**:

- Firefox: запросы часто не доходили до сервера
- Safari: ненадёжное поведение на `beforeUnload` event

**Рекомендация**: использовать `navigator.sendBeacon()` как fallback:

```javascript
function sendAnalytics(data) {
    const payload = JSON.stringify(data);

    // Попытка 1: fetch с keepalive
    if ('fetch' in window && payload.length <= 65536) {
        fetch('/analytics', {
            method: 'POST',
            body: payload,
            keepalive: true,
            headers: { 'Content-Type': 'application/json' },
        }).catch(() => {
            // Fallback на sendBeacon
            navigator.sendBeacon('/analytics', payload);
        });
    } else {
        // Fallback для устаревших браузеров
        navigator.sendBeacon('/analytics', payload);
    }
}

window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        sendAnalytics(collectAnalyticsData());
    }
});
```

**Baseline Status**: Newly available (ожидается в Firefox 133, ноябрь 2024)

**Источники**:

- https://bugzilla.mozilla.org/show_bug.cgi?id=1342484
- https://www.stefanjudis.com/today-i-learned/fetch-supports-a-keepalive-option-to-make-it-outlive-page-navigations/
- https://developer.mozilla.org/en-US/docs/Web/API/fetch

### 4. Service Workers — новые API и улучшения

#### 4.1 Service Worker Static Routing API

**Статус 2023**:

- **Chrome 116 (август 2023)**: origin trial ⭐
- **Chrome 123 (март 2024)**: полный запуск (но процесс начался в 2023)
- Firefox: положительная standards position, но нет реализации в 2023
- Safari: неофициальные положительные сигналы, но нет реализации в 2023

**API**:

```javascript
// В Service Worker install event
self.addEventListener('install', (event) => {
    event.addRoutes([
        {
            condition: {
                urlPattern: '/static/*',
            },
            source: 'network', // Всегда загружать из сети
        },
        {
            condition: {
                urlPattern: '/api/*',
            },
            source: 'network',
        },
        {
            condition: {
                urlPattern: '/images/*',
                requestMethod: 'GET',
            },
            source: 'cache',
            cacheName: 'images-cache', // Загружать из кеша
        },
        {
            condition: {
                urlPattern: '/',
                requestMethod: 'GET',
            },
            source: 'fetch-event', // Обработать через fetch event handler
        },
    ]);
});
```

**Назначение**:

- ✅ Декларативный routing без запуска Service Worker
- ✅ Избежание overhead на startup Service Worker для простых случаев
- ✅ Улучшение производительности для cache-first или network-first стратегий

**Performance Benefits**:

- Снижение времени запуска Service Worker
- Прямой fetch из кеша или сети без JavaScript execution
- Особенно полезно для статических ресурсов

**Сравнение: Traditional vs Static Routing**:

```javascript
// Traditional approach (requires SW startup)
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.pathname.startsWith('/static/')) {
        event.respondWith(fetch(event.request)); // Network
    } else if (url.pathname.startsWith('/images/')) {
        event.respondWith(
            caches.match(event.request).then((cached) => cached || fetch(event.request)),
        );
    }
});

// Static Routing approach (no SW startup for matched routes)
self.addEventListener('install', (event) => {
    event.addRoutes([
        { condition: { urlPattern: '/static/*' }, source: 'network' },
        { condition: { urlPattern: '/images/*' }, source: 'cache', cacheName: 'images' },
    ]);
});
```

**Источники**:

- https://developer.chrome.com/blog/service-worker-static-routing-api-origin-trial
- https://developer.chrome.com/blog/service-worker-static-routing
- https://github.com/WICG/service-worker-static-routing-api

#### 4.2 Navigation Preload

**Статус (стабильный с 2018, используется в 2023)**:

- Chrome: с версии 59
- Firefox: с версии 99 (май 2022)
- Safari: не поддерживается в 2023

**API**:

```javascript
// Включение navigation preload
self.addEventListener('activate', (event) => {
    event.waitUntil(self.registration.navigationPreload.enable());
});

// Использование в fetch event
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            (async function () {
                try {
                    // Получить preloaded response
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }
                } catch (error) {
                    console.error('Preload failed:', error);
                }

                // Fallback: обычный fetch
                return fetch(event.request);
            })(),
        );
    }
});
```

**Назначение**:

- Параллельный запрос к сети во время startup Service Worker
- Уменьшение латентности для навигационных запросов
- Особенно полезно для медленных устройств

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager

### 5. WebTransport — новый протокол

#### 5.1 Browser Support (2023)

**Статус**:

- **Chrome 97+ (январь 2022, стабильно в 2023)**: полная поддержка ⭐
- **Firefox 114 (июнь 2023)**: полная поддержка ⭐
- Safari: не поддерживается в 2023
- Edge: синхронизирован с Chrome (версия 97+)

**Ключевая веха 2023**: Firefox 114 добавил поддержку WebTransport в июне 2023.

#### 5.2 Технические характеристики

**WebTransport**:

- Базируется на HTTP/3 и QUIC
- Bidirectional streaming
- **Unreliable datagram transport** (как UDP)
- Multiplexing без head-of-line blocking
- Подходит для real-time приложений: игры, видео-стриминг, WebRTC замена

**API**:

```javascript
// Создание WebTransport соединения
const url = 'https://example.com:4433/webtransport';
const transport = new WebTransport(url);

// Ожидание готовности
await transport.ready;
console.log('WebTransport connected');

// === Datagrams (unreliable, как UDP) ===
const datagramWriter = transport.datagrams.writable.getWriter();
const datagramReader = transport.datagrams.readable.getReader();

// Отправка datagrams
await datagramWriter.write(new Uint8Array([1, 2, 3, 4]));

// Получение datagrams
while (true) {
    const { value, done } = await datagramReader.read();
    if (done) break;
    console.log('Received datagram:', value);
}

// === Bidirectional Streams (reliable, как TCP) ===
const stream = await transport.createBidirectionalStream();
const streamWriter = stream.writable.getWriter();
const streamReader = stream.readable.getReader();

// Запись в stream
const encoder = new TextEncoder();
await streamWriter.write(encoder.encode('Hello from client!'));

// Чтение из stream
const { value, done } = await streamReader.read();
const decoder = new TextDecoder();
console.log('Received:', decoder.decode(value));

// === Unidirectional Streams ===
// Отправка (send-only)
const sendStream = await transport.createUnidirectionalStream();
const sendWriter = sendStream.getWriter();
await sendWriter.write(encoder.encode('One-way message'));
await sendWriter.close();

// Получение (receive-only)
const receiveStreams = transport.incomingUnidirectionalStreams;
const receiveReader = receiveStreams.getReader();
const { value: receiveStream } = await receiveReader.read();
const receiveStreamReader = receiveStream.getReader();
const { value: data } = await receiveStreamReader.read();

// Закрытие соединения
transport.close({ closeCode: 0, reason: 'Done' });
```

**Сравнение с WebSocket**:

| Функция               | WebSocket   | WebTransport                   |
| --------------------- | ----------- | ------------------------------ |
| Протокол              | TCP         | QUIC (UDP)                     |
| Reliable              | Да (всегда) | Да (streams) + Нет (datagrams) |
| Unreliable            | Нет         | Да (datagrams)                 |
| Multiplexing          | Один поток  | Множество streams              |
| Latency               | Выше        | Ниже                           |
| Head-of-line blocking | Да          | Нет                            |
| Connection migration  | Нет         | Да                             |

**Use Cases**:

- 🎮 **Онлайн игры**: низкая латентность, datagrams для позиционных данных
- 📹 **Видео-стриминг**: множество streams для видео/аудио/метаданных
- 💬 **Real-time чаты**: быстрая доставка сообщений
- 📊 **Live данные**: финансовые тикеры, мониторинг

**Пример: Real-time игра**:

```javascript
// Клиент (браузер)
const transport = new WebTransport('https://game-server.example/webtransport');
await transport.ready;

const datagramWriter = transport.datagrams.writable.getWriter();
const datagramReader = transport.datagrams.readable.getReader();

// Отправка позиции игрока (unreliable, низкая латентность)
function sendPlayerPosition(x, y, z) {
    const buffer = new ArrayBuffer(12);
    const view = new DataView(buffer);
    view.setFloat32(0, x, true);
    view.setFloat32(4, y, true);
    view.setFloat32(8, z, true);
    datagramWriter.write(new Uint8Array(buffer));
}

setInterval(() => {
    sendPlayerPosition(player.x, player.y, player.z);
}, 50); // 20 updates/sec

// Получение позиций других игроков
(async () => {
    while (true) {
        const { value, done } = await datagramReader.read();
        if (done) break;

        const view = new DataView(value.buffer);
        const otherPlayerX = view.getFloat32(0, true);
        const otherPlayerY = view.getFloat32(4, true);
        const otherPlayerZ = view.getFloat32(8, true);

        updateOtherPlayer(otherPlayerX, otherPlayerY, otherPlayerZ);
    }
})();

// Важные события (reliable stream)
const eventStream = await transport.createBidirectionalStream();
const eventWriter = eventStream.writable.getWriter();
await eventWriter.write(
    new TextEncoder().encode(
        JSON.stringify({
            type: 'player_action',
            action: 'shoot',
        }),
    ),
);
```

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
- https://web.dev/webtransport/
- https://caniuse.com/webtransport

### 6. WebRTC — улучшения протокола

#### 6.1 Per-Session Permissions (Chrome 116)

**Chrome 116 (август 2023)**: одноразовые разрешения камеры/микрофона ⭐

**Изменение**:

- До Chrome 116: разрешения сохранялись навсегда или до явной отмены
- С Chrome 116: опция для per-session permissions (как в Firefox и Safari)
- Улучшенная приватность: разрешение действует только для текущей сессии

**API (без изменений)**:

```javascript
try {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
    });

    console.log('✅ Camera and microphone access granted');
    videoElement.srcObject = stream;
} catch (error) {
    console.error('❌ Permission denied:', error);
}
```

Браузер теперь предлагает пользователю выбор:

- **Allow once** (per-session) — новая опция
- **Allow always** (persistent)
- **Block**

#### 6.2 WebCodecs API

**Статус 2023**:

- **Chrome 94+ (2021, стабильно в 2023)**: полная поддержка
- **Firefox: Desktop H1 2024** (процесс начался в 2023)
- **Safari: VideoDecoder only в 2023**, AudioDecoder в Safari Technology Preview

**API**:

```javascript
// === Video Encoding ===
const encoder = new VideoEncoder({
    output: (chunk, metadata) => {
        // Обработка encoded chunk
        console.log('Encoded chunk:', chunk.byteLength, 'bytes');
        // Отправить на сервер или сохранить
        sendToServer(chunk);
    },
    error: (e) => {
        console.error('Encoding error:', e);
    },
});

encoder.configure({
    codec: 'vp8',
    width: 1920,
    height: 1080,
    bitrate: 2_000_000, // 2 Mbps
    framerate: 30,
});

// Encode a frame (из canvas или video)
const videoFrame = new VideoFrame(canvas, { timestamp: 0 });
encoder.encode(videoFrame, { keyFrame: true });
videoFrame.close();

// === Video Decoding ===
const decoder = new VideoDecoder({
    output: (frame) => {
        // Render frame
        ctx.drawImage(frame, 0, 0);
        frame.close();
    },
    error: (e) => {
        console.error('Decoding error:', e);
    },
});

decoder.configure({
    codec: 'vp8',
    codedWidth: 1920,
    codedHeight: 1080,
});

// Decode encoded chunk
decoder.decode(encodedChunk);
```

**Use Cases**:

- 🎥 **Video editing приложения** в браузере
- 📹 **Кастомные streaming решения**
- 🎬 **Кодирование/декодирование** без WebRTC
- 🖼️ **Обработка видео** перед загрузкой на сервер

**Codec Support** (зависит от браузера и платформы):

- VP8, VP9, H.264, H.265, AV1

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API
- https://caniuse.com/webcodecs
- https://developer.chrome.com/docs/web-platform/best-practices/webcodecs

### 7. Resource Loading — priority hints, preload, prefetch

#### 7.1 Import Maps

**Статус 2023**:

- **Chrome 89+ (март 2021, стабильно в 2023)**: полная поддержка
- **Firefox 109 (январь 2023)**: полная поддержка ⭐
- **Safari 16.4 (март 2023)**: полная поддержка ⭐
- Edge 89+: полная поддержка

**Baseline Status**: **Newly Available (март 2023)** ⭐

**Ключевая веха 2023**: Safari 16.4 и Firefox 109 добавили поддержку, достигнув полной
кроссбраузерной совместимости.

**API**:

```html
<script type="importmap">
    {
        "imports": {
            "lodash": "/node_modules/lodash-es/lodash.js",
            "react": "https://cdn.skypack.dev/react@18",
            "react-dom": "https://cdn.skypack.dev/react-dom@18",
            "utils/": "/js/utils/",
            "components/": "/js/components/"
        },
        "scopes": {
            "/admin/": {
                "lodash": "/js/lodash-custom.js"
            }
        }
    }
</script>

<script type="module">
    // Bare specifiers разрешаются через import map
    import _ from 'lodash';
    import React from 'react';
    import { helper } from 'utils/helper.js';
    import { Button } from 'components/button.js';

    console.log('All imports resolved via Import Maps!');
</script>
```

**Назначение**:

- ✅ Контроль разрешения module specifiers
- ✅ Замена bare specifiers на URLs
- ✅ Упрощение использования npm packages в браузере без бандлера
- ✅ Версионирование и A/B тестирование библиотек

**Практические применения**:

```html
<!-- Production vs Development -->
<script type="importmap">
    {
        "imports": {
            "react": "https://cdn.skypack.dev/react@18.2.0?min",
            "react-dom": "https://cdn.skypack.dev/react-dom@18.2.0?min"
        }
    }
</script>

<!-- A/B Testing -->
<script type="importmap">
    {
        "imports": {
            "analytics": "/js/analytics-v2.js"
        }
    }
</script>

<!-- Polyfills -->
<script type="importmap">
    {
        "imports": {
            "web-animations": "/polyfills/web-animations.js"
        },
        "scopes": {
            "/legacy-browser/": {
                "lodash": "/js/lodash-es5.js"
            }
        }
    }
</script>
```

**Источники**:

- https://caniuse.com/import-maps
- https://blog.logrocket.com/es-modules-in-browsers-with-import-maps/
- https://www.infoq.com/news/2023/04/import-maps-generally-available/

#### 7.2 Modulepreload

**Статус 2023**:

- Chrome: с версии 66 (апрель 2018)
- Edge: с версии 79 (январь 2020)
- **Firefox 115 (июль 2023)**: добавлена поддержка ⭐
- **Safari 17 (сентябрь 2023)**: добавлена поддержка ⭐

**Baseline Status**: **Newly Available (сентябрь 2023)** ⭐

**API**:

```html
<!-- Предзагрузка основного модуля -->
<link rel="modulepreload" href="/js/app.js" />

<!-- Предзагрузка зависимостей -->
<link rel="modulepreload" href="/js/utils.js" />
<link rel="modulepreload" href="/js/components.js" />

<!-- Использование модулей -->
<script type="module">
    import { init } from '/js/app.js'; // уже preloaded
    init();
</script>
```

**Назначение**:

- ✅ Preload ES modules и их dependencies
- ✅ Парсинг и компиляция модуля заранее
- ✅ Хранение в document's module map

**Преимущества**:

- Более быстрая загрузка модулей
- Reduced latency для module initialization
- Лучшая производительность для module-based приложений

**Сравнение с `rel="preload"`**:

```html
<!-- preload (для любых ресурсов) -->
<link rel="preload" href="/script.js" as="script" />

<!-- modulepreload (специально для ES modules) -->
<link rel="modulepreload" href="/module.js" />
```

**Источники**:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/modulepreload
- https://web.dev/articles/modulepreload
- https://caniuse.com/link-rel-modulepreload

#### 7.3 Speculation Rules API

**Статус 2023**:

- **Chrome 109+ (январь 2023)**: полная поддержка для prefetch ⭐
- **Chrome 121+ (январь 2024)**: prerender support (но процесс начался в 2023)
- Firefox: не поддерживается в 2023
- Safari: не поддерживается в 2023
- Edge: синхронизирован с Chrome

**API**:

```html
<script type="speculationrules">
    {
        "prefetch": [
            {
                "source": "list",
                "urls": ["/next-page", "/article/123"]
            }
        ],
        "prerender": [
            {
                "source": "list",
                "urls": ["/dashboard"]
            }
        ]
    }
</script>

<!-- Document rules: автоматически для всех ссылок -->
<script type="speculationrules">
    {
        "prefetch": [
            {
                "source": "document",
                "where": {
                    "selector_matches": "a.prefetch-link"
                },
                "eagerness": "moderate"
            }
        ]
    }
</script>
```

**HTTP Header Alternative**:

```http
Speculation-Rules: "/speculation-rules.json"
```

**Назначение**:

- ✅ Декларативное prefetching и prerendering
- ✅ Инструкции браузеру для anticipatory loading
- ✅ Улучшение perceived performance для навигации

**Prefetch vs Prerender**:

- **Prefetch**: загружает ключевые ресурсы, но не рендерит
- **Prerender**: загружает И рендерит страницу в invisible tab

**Performance Impact**:

- Instant или near-instant page loads
- Значительное улучшение Core Web Vitals для последующих навигаций
- Потенциальный overhead на bandwidth и CPU

**Практический пример**:

```html
<script type="speculationrules">
    {
        "prefetch": [
            {
                "source": "document",
                "where": {
                    "and": [
                        { "selector_matches": "a[href^='/articles/']" },
                        { "not": { "selector_matches": ".no-prefetch" } }
                    ]
                },
                "eagerness": "moderate"
            }
        ]
    }
</script>

<nav>
    <a href="/articles/one">Article One</a>
    <!-- Будет prefetched -->
    <a href="/articles/two">Article Two</a>
    <!-- Будет prefetched -->
    <a href="/external" class="no-prefetch">External</a>
    <!-- НЕ будет prefetched -->
</nav>
```

**Источники**:

- https://developer.chrome.com/docs/web-platform/prerender-pages
- https://developer.chrome.com/blog/speculation-rules-improvements
- https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API

## Часть 2: Security & Privacy

### 1. Privacy Sandbox — общая доступность

**7 сентября 2023**: Google объявил о general availability Privacy Sandbox APIs — Topics, Protected
Audience, Attribution Reporting, Private Aggregation, Shared Storage и Fenced Frames. Эти функции
были включены для более чем половины пользователей Google Chrome.

**Chrome Stable 115** (июль 2023): ключевые relevance и measurement APIs введены в Chrome Stable.

#### 1.1 Topics API

**Описание**:

Topics API генерирует signals для interest-based advertising без third-party cookies или других user
identifiers, которые отслеживают пользователей across sites.

**Механизм работы**:

1. Браузер определяет "topics of interest" на основе browsing history пользователя за последние 3
   недели
2. Topics выбираются из taxonomy примерно 350 категорий (например, "Travel", "Fitness", "News")
3. API предоставляет до 3 topics для каждого caller (ad tech)
4. Topics обновляются еженедельно
5. Topics хранятся локально в браузере, не отправляются на серверы Google

**Browser support (2023)**:

- **Chrome**: 115+ (сентябрь 2023, general availability)
- **Firefox**: нет поддержки
- **Safari**: нет поддержки

**API пример**:

```javascript
// Проверка доступности
if ('browsingTopics' in document) {
    try {
        const topics = await document.browsingTopics();
        console.log('User topics:', topics);

        // topics: Array of topic objects
        // [
        //   { configVersion: "1", modelVersion: "1", taxonomyVersion: "1", topic: 123, version: "1:1:1" },
        //   { configVersion: "1", modelVersion: "1", taxonomyVersion: "1", topic: 456, version: "1:1:1" }
        // ]

        // Использовать topics для подбора рекламы
        const relevantAd = selectAdBasedOnTopics(topics);
        displayAd(relevantAd);
    } catch (error) {
        console.error('Topics API error:', error);
    }
} else {
    console.warn('Topics API not supported');
}
```

**Fetch integration**:

```javascript
fetch('https://ad-server.example/get-topics', {
    browsingTopics: true,
}).then((response) => response.json());
```

**Permissions Policy**:

```http
Permissions-Policy: browsing-topics=(self)
```

**Security и Privacy implications**:

- ✅ Значительное улучшение приватности по сравнению с third-party cookies
- ✅ Topics ограничены по количеству (до 3 на caller) и обновляются еженедельно
- ✅ Пользователи могут видеть и удалять свои topics в Chrome settings
  (`chrome://settings/adPrivacy`)
- ✅ Topics доступны только для sites, которые пользователь действительно посещал

**Источники**:

- https://privacysandbox.google.com/
- https://developers.google.com/privacy-sandbox/overview/feedback/report-2023-q2

#### 1.2 Protected Audience API (ранее FLEDGE)

**Описание**:

Protected Audience API выбирает рекламу для remarketing и custom audience use cases, предназначен
для смягчения third-party tracking across sites.

**Переименование**: ранее назывался FLEDGE (First Locally-Executed Decision over Groups Experiment).

**Механизм работы**:

1. **Interest Group Creation**: сайты добавляют пользователей в "interest groups"

```javascript
await navigator.joinAdInterestGroup(
    {
        owner: 'https://advertiser.example',
        name: 'running-shoes-2023',
        biddingLogicUrl: 'https://advertiser.example/bid.js',
        trustedBiddingSignalsUrl: 'https://advertiser.example/signals',
        trustedBiddingSignalsKeys: ['key1', 'key2'],
        userBiddingSignals: { interestedInRunning: true },
        ads: [
            {
                renderUrl: 'https://advertiser.example/ads/shoe1.html',
                metadata: { price: 99.99, size: '42' },
            },
            {
                renderUrl: 'https://advertiser.example/ads/shoe2.html',
                metadata: { price: 129.99, size: '44' },
            },
        ],
    },
    30 * 24 * 60 * 60 * 1000,
); // 30 дней
```

2. **On-device Auction**: браузер проводит аукцион локально

```javascript
const auctionConfig = {
    seller: 'https://ssp.example',
    decisionLogicUrl: 'https://ssp.example/auction.js',
    interestGroupBuyers: ['https://advertiser.example', 'https://another-advertiser.example'],
    auctionSignals: { contextualSignals: { page: 'product-page' } },
    sellerSignals: { publisherId: '12345' },
    perBuyerSignals: {
        'https://advertiser.example': { budget: 1000 },
    },
    perBuyerTimeouts: {
        'https://advertiser.example': 100, // ms
    },
};

const adUrl = await navigator.runAdAuction(auctionConfig);

if (adUrl) {
    console.log('Auction won, ad URL:', adUrl);
    // Рендерить в Fenced Frame
    const fencedFrame = document.createElement('fencedframe');
    fencedFrame.config = adUrl;
    document.getElementById('ad-slot').appendChild(fencedFrame);
} else {
    console.log('No ad won the auction');
}
```

3. **Fenced Frame Rendering**: реклама отображается в Fenced Frame для изоляции

**Browser support (2023)**:

- **Chrome**: 115+ (general availability)
- **Firefox**: нет поддержки
- **Safari**: нет поддержки

**Permissions Policy**:

```http
Permissions-Policy: join-ad-interest-group=(self), run-ad-auction=(self)
```

**Security implications**:

- ✅ Interest groups хранятся локально, не передаются серверам
- ✅ Аукционы проводятся on-device, bidding logic не может access browsing history
- ✅ Fenced Frames изолируют ad content от publisher page
- ✅ Reporting ограничен и aggregated

**Источники**:

- https://developers.google.com/privacy-sandbox/relevance/protected-audience

#### 1.3 Attribution Reporting API

**Описание**:

Attribution Reporting API позволяет коррелировать ad clicks или ad views с conversions. Ad techs
могут генерировать event-level или summary reports.

**Два типа отчётов**:

1. **Event-level reports**: ограниченные данные о conversion (64 бита)
2. **Summary (aggregate) reports**: детальные данные с differential privacy noise

**Механизм работы**:

1. **Attribution Source Registration** (click или view):

```html
<!-- Image ad -->
<img
    src="https://ad-server.example/ad.jpg"
    attributionsrc="https://ad-server.example/register-source"
/>

<!-- Link ad -->
<a
    href="https://advertiser.example/product"
    attributionsrc="https://ad-server.example/register-source"
>
    Buy Now
</a>
```

Server response:

```http
Attribution-Reporting-Register-Source: {
  "source_event_id": "123456789",
  "destination": "https://advertiser.example",
  "expiry": "604800",
  "priority": "100",
  "debug_key": "987654321"
}
```

2. **Attribution Trigger Registration** (conversion):

```javascript
// На странице conversion (advertiser.example)
fetch('https://ad-server.example/register-trigger', {
    attributionReporting: {
        eventSourceEligible: true,
        triggerEligible: true,
    },
});
```

Server response:

```http
Attribution-Reporting-Register-Trigger: {
  "event_trigger_data": [{
    "trigger_data": "2",
    "priority": "100"
  }],
  "debug_key": "123456789"
}
```

3. **Report Generation**: браузер генерирует и отправляет reports с delay

**Event-level report example** (JSON payload):

```json
{
    "attribution_destination": "https://advertiser.example",
    "source_event_id": "123456789",
    "trigger_data": "2",
    "source_type": "navigation",
    "report_id": "abc-def-ghi",
    "randomized_trigger_rate": 0.0001
}
```

**Browser support (2023)**:

- **Chrome**: 115+ (general availability)
- **Firefox**: нет поддержки
- **Safari**: собственная реализация — Private Click Measurement (PCM)

**Security и Privacy implications**:

- ✅ Event-level reports: limited data + noise для защиты privacy
- ✅ Aggregate reports: detailed data с differential privacy
- ✅ Reports отправляются с delay для предотвращения timing attacks
- ✅ No access к user identifiers

**Источники**:

- https://developers.google.com/privacy-sandbox/relevance/attribution-reporting

#### 1.4 Shared Storage API

**Описание**:

Shared Storage API позволяет sites хранить и access unpartitioned cross-site data в secure
environment.

**Use cases**:

- Frequency capping across sites
- A/B testing across sites
- Creative selection based on cross-site data

**Ключевые особенности**:

1. **Данные пишутся открыто, читаются в изолированном окружении**
2. **Output gates ограничивают утечку информации**:
    - Select URL (выбор из заранее определённых URLs)
    - Private Aggregation (aggregated reports с noise)

**Пример использования — Frequency Capping**:

```javascript
// === Запись в Shared Storage ===
await window.sharedStorage.set('frequency-cap-count', '3');
await window.sharedStorage.set('last-impression', Date.now().toString());

// === Worklet module (frequency-cap-worklet.js) ===
class FrequencyCapOperation {
    async run(urls, data) {
        const count = parseInt((await this.sharedStorage.get('frequency-cap-count')) || '0');
        const maxImpressions = data.maxImpressions || 5;

        if (count >= maxImpressions) {
            return 1; // default ad URL (index 1)
        }

        // Увеличить счётчик
        await this.sharedStorage.set('frequency-cap-count', String(count + 1));
        return 0; // targeted ad URL (index 0)
    }
}

register('frequency-cap-operation', FrequencyCapOperation);

// === Использование на странице ===
// Загрузить worklet
await window.sharedStorage.worklet.addModule('frequency-cap-worklet.js');

// Выбрать URL на основе frequency cap
const opaqueURL = await window.sharedStorage.selectURL(
    'frequency-cap-operation',
    [
        { url: 'https://advertiser.example/targeted-ad.html' },
        { url: 'https://advertiser.example/default-ad.html' },
    ],
    { data: { maxImpressions: 5 } },
);

// Рендерить в Fenced Frame
const fencedFrame = document.createElement('fencedframe');
fencedFrame.config = opaqueURL;
document.getElementById('ad-slot').appendChild(fencedFrame);
```

**Browser support (2023)**:

- **Chrome**: 115+ (general availability)
- **Firefox**: нет поддержки
- **Safari**: нет поддержки

**Permissions Policy**:

```http
Permissions-Policy: shared-storage=(self)
```

**Security implications**:

Output gates критически важны для предотвращения утечки cross-site information. Worklet environment
изолирован и не имеет доступа к network или DOM.

**Источники**:

- https://developers.google.com/privacy-sandbox/relevance/shared-storage

#### 1.5 Fenced Frames

**Описание**:

Fenced Frames — это HTML element для embedded content, которое изолирует content от embedding page,
предотвращая communication и data sharing.

**Отличия от iframe**:

| Feature                | iframe                           | Fenced Frame                       |
| ---------------------- | -------------------------------- | ---------------------------------- |
| Communication с parent | `postMessage`, shared DOM access | Запрещено                          |
| Network access         | Полный                           | Ограниченный                       |
| Storage access         | Shared с top-level               | Partitioned                        |
| Use case               | Любой embedded content           | Рекламный content, Privacy Sandbox |

**Синтаксис**:

```html
<fencedframe src="https://advertiser.example/ad.html" width="300" height="250"> </fencedframe>
```

**С Protected Audience API**:

```javascript
const adUrl = await navigator.runAdAuction(auctionConfig);

const fencedFrame = document.createElement('fencedframe');
fencedFrame.config = adUrl; // opaque URL
fencedFrame.width = 300;
fencedFrame.height = 250;
document.getElementById('ad-slot').appendChild(fencedFrame);
```

**Browser support (2023)**:

- **Chrome**: 115+ (general availability)
- **Firefox**: нет поддержки
- **Safari**: нет поддержки

**Security implications**:

Строгая изоляция предотвращает tracking через embedded content. Fenced Frames essential для Privacy
Sandbox, обеспечивая возможность показа персонализированной рекламы без утечки user data.

**Источники**:

- https://developers.google.com/privacy-sandbox/relevance/fenced-frame

### 2. Content Security Policy (CSP)

#### 2.1 CSP Level 3 — статус спецификации

**Спецификация**: [W3C Content Security Policy Level 3](https://www.w3.org/TR/CSP3/)

**Статус по состоянию на 2023**: Working Draft (WD), работа над спецификацией продолжается

CSP Level 3 находится в статусе Working Draft в рамках W3C Web Application Security Working Group.

#### 2.2 CSP Level 3 директивы — `script-src-elem` и `script-src-attr`

Эти директивы являются дополнениями CSP Level 3, обеспечивающими более гранулярный контроль над
выполнением JavaScript.

**Описание**:

- `script-src-elem` — указывает допустимые источники для элементов `<script>`
- `script-src-attr` — указывает допустимые источники для inline обработчиков событий JavaScript
  (например, `onclick`, `onerror`)
- `style-src-elem` — указывает допустимые источники для элементов `<style>` и
  `<link rel="stylesheet">`
- `style-src-attr` — указывает допустимые источники для inline стилей

**Browser support (2023)**:

- **Chrome**: реализовано в версии 79 (декабрь 2019), полностью доступно в 2023
- **Safari**: реализовано в Safari Technology Preview, доступность в продакшн-версиях в 2023
- **Firefox**: работа над реализацией продолжалась в 2023

**Механизм работы**:

Если сайт указывает новые директивы, CSP3-совместимый браузер игнорирует любую директиву
`script-src` в этой политике. Браузер без такой поддержки игнорирует неизвестные директивы и вместо
этого использует `script-src`.

`script-src` служит fallback для `script-src-elem` и `script-src-attr`.

**Пример использования**:

```http
Content-Security-Policy:
  default-src 'self';
  script-src-elem 'self' https://cdn.example.com;
  script-src-attr 'none';
  style-src-elem 'self';
  style-src-attr 'unsafe-inline'
```

Эта политика разрешает:

- ✅ Загрузку скриптов только с того же origin и с `cdn.example.com`
- ❌ Полностью запрещает inline обработчики событий (`onclick` и т.д.)
- ✅ Разрешает стили только с того же origin
- ✅ Разрешает inline стили в атрибутах `style`

**Security implications**:

Более гранулярный контроль позволяет создавать более строгие политики безопасности, разделяя правила
для элементов и атрибутов. Это особенно полезно для предотвращения XSS через inline обработчики
событий при сохранении возможности использования внешних скриптов.

**Baseline статус**: Не входит в Baseline (ограниченная поддержка браузерами)

**Источники**:

- https://www.w3.org/TR/CSP3/
- https://groups.google.com/a/mozilla.org/g/dev-platform/c/LlxUr3vIBWc
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

### 3. Authentication — WebAuthn Level 3 и Passkeys

#### 3.1 WebAuthn Level 3

**Спецификация**: [W3C Web Authentication Level 3](https://www.w3.org/TR/webauthn-3/)

**First Public Working Draft**: 27 апреля 2021 **Активная разработка в 2023**: да

**Добавления в Level 3**:

1. **Conditional Mediation (Conditional UI)** — динамическое отображение passkeys в autofill
2. **Cross-Origin Authentication within an iFrame** — возможность WebAuthn в iframe
3. **Credential Backup State** — информация о том, backed up ли credential
4. **isPasskeyPlatformAuthenticatorAvailable** method
5. **Pseudo-Random Function (PRF) extension** — для end-to-end encryption
6. **Hybrid Transport** — использование телефона как authenticator
7. **Third-Party Payment Authentication**

**Источники**:

- https://www.w3.org/TR/webauthn-3/
- https://github.com/w3c/webauthn/wiki/Explainer:-WebAuthn-Conditional-UI

#### 3.2 Conditional UI (Autofill UI)

**Описание**:

Conditional UI — это feature в WebAuthn, который динамически отображает passkeys или традиционные
password options на основе того, есть ли у пользователя зарегистрированный credential (resident key)
с веб-сайтом или приложением.

Credential selection UI отображается только если пользователь имеет discoverable credential,
зарегистрированный с Relying Party на их authenticator, при этом credential отображается вместе с
autofilled passwords.

**Browser support (2023)**:

- **Chrome**: 108+ (поддержка passkeys с autofill suggestions)
- **Safari**: с октября 2023
- **Firefox**: progressive support в 2023
- **Edge**: синхронизировано с Chrome

**Статус**: С октября 2023 эта функция работает across the latest devices and browser versions.

**API пример**:

```javascript
// Проверка доступности Conditional UI
const available = await PublicKeyCredential.isConditionalMediationAvailable();
console.log('Conditional UI available:', available);

if (available) {
    // Запрос credential с conditional UI
    const credential = await navigator.credentials.get({
        publicKey: {
            challenge: new Uint8Array([
                /* random challenge */
            ]),
            rpId: 'example.com',
            userVerification: 'preferred',
            // НЕ указываем allowCredentials для discoverable credentials
        },
        mediation: 'conditional', // Ключевой параметр
    });

    if (credential) {
        console.log('User authenticated with passkey:', credential);
        // Отправить credential на сервер для verification
        await verifyCredential(credential);
    }
}
```

**HTML integration**:

```html
<form id="login-form">
    <label for="username">Email:</label>
    <input
        type="text"
        id="username"
        name="username"
        autocomplete="username webauthn"
        placeholder="Email or passkey"
    />

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" autocomplete="current-password" />

    <button type="submit">Sign In</button>
</form>
```

Браузер автоматически отобразит passkeys в autofill UI при фокусе на поле `username`.

**Security implications**:

Conditional UI значительно улучшает UX для passwordless authentication, делая passkeys более
accessible и convenient, что ведёт к большему adoption.

**Baseline статус**: Approaching Baseline (с октября 2023)

**Источники**:

- https://github.com/w3c/webauthn/wiki/Explainer:-WebAuthn-Conditional-UI
- https://www.corbado.com/glossary/conditional-ui
- https://developer.chrome.com/docs/identity/webauthn-conditional-ui

#### 3.3 Passkeys

**Описание**:

Passkeys — это marketing term, популяризированный Google и Apple, относится к Multi-Device FIDO
Credentials, реализованным с WebAuthn specification.

Passkeys более безопасны, чем passwords, потому что они позволяют пользователям sign in с biometric
sensor (отпечаток пальца, facial recognition), PIN или pattern, освобождая от необходимости
запоминать и управлять passwords.

**Security features**:

1. **Phishing Resistance**: attackers не могут использовать passkey на фальшивом сайте, так как
   signature меняется с origin сайта
2. **Data Breach Protection**: при утечке данных attacker получает только public key, который
   бесполезен
3. **Credential Isolation**: passkey уникален для каждого сервиса

**Browser support (2023)**:

- **Chrome**: 108+ (конец 2022/начало 2023)
- **Safari**: iOS 16+, macOS Ventura+ (2022/2023)
- **Firefox**: progressive support в 2023
- **Edge**: синхронизировано с Chrome

**Platform support**:

- **Android**: 2023
- **iOS/iPadOS**: iOS 16+ (2022/2023)
- **Windows**: Windows 11 (2023)
- **macOS**: macOS Ventura+ (2022/2023)

**iCloud Keychain sync**: passkeys синхронизируются across Apple devices

**Google Password Manager**: passkeys синхронизируются across Android devices и Chrome

**Пример создания passkey**:

```javascript
// === Registration ===
async function registerPasskey(username, displayName) {
    try {
        // Запрос challenge с сервера
        const challengeResponse = await fetch('/api/webauthn/register/begin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        const challengeData = await challengeResponse.json();

        // Создать passkey
        const credential = await navigator.credentials.create({
            publicKey: {
                challenge: base64ToArrayBuffer(challengeData.challenge),
                rp: {
                    name: 'Example Corp',
                    id: 'example.com',
                },
                user: {
                    id: base64ToArrayBuffer(challengeData.userId),
                    name: username,
                    displayName: displayName,
                },
                pubKeyCredParams: [
                    { type: 'public-key', alg: -7 }, // ES256
                    { type: 'public-key', alg: -257 }, // RS256
                ],
                authenticatorSelection: {
                    authenticatorAttachment: 'platform', // Встроенный authenticator (Touch ID, Face ID, Windows Hello)
                    residentKey: 'required', // Критично для passkeys
                    userVerification: 'required',
                },
                timeout: 60000,
                attestation: 'none',
            },
        });

        // Отправить credential на сервер
        const registrationResponse = await fetch('/api/webauthn/register/finish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: credential.id,
                rawId: arrayBufferToBase64(credential.rawId),
                response: {
                    clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
                    attestationObject: arrayBufferToBase64(credential.response.attestationObject),
                },
                type: credential.type,
            }),
        });

        console.log('✅ Passkey registered successfully');
    } catch (error) {
        console.error('❌ Passkey registration failed:', error);
    }
}

// === Authentication ===
async function authenticateWithPasskey(username) {
    try {
        // Запрос challenge с сервера
        const challengeResponse = await fetch('/api/webauthn/authenticate/begin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        const challengeData = await challengeResponse.json();

        // Получить credential
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: base64ToArrayBuffer(challengeData.challenge),
                rpId: 'example.com',
                allowCredentials: challengeData.allowCredentials.map((cred) => ({
                    type: 'public-key',
                    id: base64ToArrayBuffer(cred.id),
                })),
                userVerification: 'required',
                timeout: 60000,
            },
        });

        // Отправить credential на сервер для verification
        const authResponse = await fetch('/api/webauthn/authenticate/finish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: credential.id,
                rawId: arrayBufferToBase64(credential.rawId),
                response: {
                    clientDataJSON: arrayBufferToBase64(credential.response.clientDataJSON),
                    authenticatorData: arrayBufferToBase64(credential.response.authenticatorData),
                    signature: arrayBufferToBase64(credential.response.signature),
                    userHandle: arrayBufferToBase64(credential.response.userHandle),
                },
                type: credential.type,
            }),
        });

        const authResult = await authResponse.json();
        if (authResult.success) {
            console.log('✅ Authenticated successfully');
            // Redirect to dashboard
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error('❌ Authentication failed:', error);
    }
}

// Utility functions
function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
```

**Security implications**:

Passkeys представляют major shift от passwords к phishing-resistant, user-friendly authentication.
2023 год — критический год для adoption passkeys across major platforms.

**Baseline статус**: Rapidly approaching Baseline (2023-2024)

**Источники**:

- https://www.passkeys.com/what-is-webauthn
- https://www.aboutchromebooks.com/passkeys-on-chromebooks-2023

### 4. Cookies и Privacy

#### 4.1 SameSite cookies — Lax default (статус 2023)

**Описание**:

`SameSite` cookie attribute защищает от CSRF атак, ограничивая отправку cookies в cross-site
контексте.

**Значения**:

- `SameSite=Strict` — cookie отправляется только для same-site requests
- `SameSite=Lax` — cookie отправляется для top-level navigations и same-site requests
- `SameSite=None` — cookie отправляется для всех requests (требует `Secure` attribute)

**Browser defaults (2023)**:

Если cookie устанавливается без явного `SameSite` attribute:

- **Chrome, Edge, Opera**: по умолчанию `SameSite=Lax` (с 2021, Chrome 80+)
- **Firefox**: по умолчанию `SameSite=Lax`
- **Safari и WebKit-based browsers**: по умолчанию `SameSite=None` (менее ограничительно)

**Security implications**:

Lax default значительно повышает защиту от CSRF атак без необходимости явных действий со стороны
разработчиков.

Однако inconsistency между браузерами означает, что разработчики должны явно устанавливать
`SameSite` attribute для предсказуемого поведения.

**Migration guidance**:

```http
# До (устаревший подход)
Set-Cookie: session=abc123; Secure; HttpOnly

# После (явное указание для cross-browser consistency)
Set-Cookie: session=abc123; Secure; HttpOnly; SameSite=Lax

# Для cookies, которым нужна cross-site functionality
Set-Cookie: tracking=xyz; Secure; SameSite=None
```

**Baseline статус**: Widely available (но с различиями в defaults между браузерами)

**Источники**:

- https://web.dev/articles/samesite-cookies-explained
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
- https://stackoverflow.com/questions/59990864/what-is-the-difference-between-samesite-lax-and-samesite-strict

#### 4.2 Third-party cookies deprecation timeline

**Chrome announcement (май 2023)**: Privacy Sandbox готов, Chrome планирует отказаться от
third-party cookies в 2024 году.

**Firefox (2023)**: Total Cookie Protection в Enhanced Tracking Protection's Strict Mode (добавлено
в Firefox 111, март 2023).

Total Cookie Protection изолирует cookies по first-party context, эффективно партиционируя их
аналогично CHIPS.

**Safari**: продолжение Intelligent Tracking Prevention (ITP), блокирующего third-party tracking
cookies по умолчанию с предыдущих лет.

**Security implications**:

2023 год — критический год для перехода веб-индустрии от third-party cookies к privacy-preserving
альтернативам.

**Baseline статус**: Процесс в стадии перехода

**Источники**:

- https://www.ghacks.net/2023/05/18/googles-privacy-sandbox-is-ready-chrome-to-drop-third-party-cookies-in-2024/
- https://developer.mozilla.org/en-US/blog/goodbye-third-party-cookies/

### 5. Deprecations и Removals (2023)

#### 5.1 document.domain setter (Chrome 115)

**Статус**: deprecated и made immutable в Chrome 115 (июль 2023)

**Что изменилось**:

Начиная с Chrome 115, веб-сайты не могут устанавливать `document.domain`. Chrome сделал
`document.domain` immutable.

Deprecation отключил возможность relaxing same-origin policy путём установки `document.domain` по
умолчанию в Chrome 115.

**Impact**:

Использование `document.domain` setter не бросает exception, но перестаёт иметь эффект. Изменение
было rolled out прогрессивно, начиная с Chrome 115.

**Migration guidance**:

Для cross-origin communication использовать:

- `postMessage()`
- `Channel Messaging API`

**Пример миграции**:

```javascript
// === Старый подход (deprecated) ===
// На https://app.example.com
document.domain = 'example.com';
// На https://api.example.com
document.domain = 'example.com';
// Теперь могут взаимодействовать напрямую

// === Новый подход (postMessage) ===
// На https://app.example.com
const iframe = document.getElementById('api-iframe');
iframe.contentWindow.postMessage({ action: 'getData', id: 123 }, 'https://api.example.com');

window.addEventListener('message', (event) => {
    if (event.origin !== 'https://api.example.com') return;

    console.log('Received data:', event.data);
});

// На https://api.example.com (в iframe)
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://app.example.com') return;

    if (event.data.action === 'getData') {
        const data = fetchData(event.data.id);
        event.source.postMessage({ data }, event.origin);
    }
});
```

Для продолжения использования старого поведения (временно):

```http
Origin-Agent-Cluster: ?0
```

Этот заголовок позволяет opt out из origin-keyed agent clusters.

**Security implications**:

Критическое security improvement. `document.domain` setter позволял обходить same-origin policy, что
создавало security risks.

**Browser support (2023)**:

- **Chrome**: 115+ (июль 2023)
- **Firefox**: не deprecated в 2023
- **Safari**: не deprecated в 2023

**Источники**:

- https://developer.chrome.com/blog/immutable-document-domain
- https://developer.chrome.com/blog/document-domain-setter-deprecation
- https://chromestatus.com/feature/5428079583297536

#### 5.2 Web SQL Database (Chrome 119)

**Статус**: полностью удалён в Chrome 119 (30 октября 2023)

**Timeline**:

- **Chromium 97**: удалён для third-party contexts
- **Chromium 105**: deprecated в insecure contexts, показывалось предупреждение в DevTools Issue
  panel
- **Chromium 110**: удалён в insecure contexts
- **Chrome 119**: полностью удалён во всех контекстах ⭐

**Deprecation trial**: reverse origin trial позволяет разработчикам продолжать использовать WebSQL
до Chrome 123, давая дополнительное время для миграции.

**Background**:

Web SQL Database API, позволяющий хранить данные в structured manner на компьютере пользователя
(внутренне основан на SQLite database engine), был введён в апреле 2009 и abandoned в ноябре 2010.

**Migration guidance**:

W3C рекомендует тем, кто нуждается в web databases, принять Web Storage API технологии:

- `localStorage` и `sessionStorage`
- **IndexedDB** (основная рекомендация)

**Пример миграции**:

```javascript
// === Старый код (Web SQL) ===
const db = openDatabase('mydb', '1.0', 'My Database', 2 * 1024 * 1024);

db.transaction((tx) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)',
    );
    tx.executeSql('INSERT INTO users (name, email) VALUES (?, ?)', [
        'John Doe',
        'john@example.com',
    ]);
    tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i));
        }
    });
});

// === Новый код (IndexedDB) ===
const request = indexedDB.open('mydb', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains('users')) {
        const objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
    }
};

request.onsuccess = (event) => {
    const db = event.target.result;

    // Добавление данных
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');

    objectStore.add({ name: 'John Doe', email: 'john@example.com' });

    // Чтение данных
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = () => {
        const users = getAllRequest.result;
        users.forEach((user) => console.log(user));
    };
};
```

**Security implications**:

Web SQL удалён частично из-за security concerns и отсутствия standardization. IndexedDB
предоставляет более безопасную и стандартизированную альтернативу.

**Browser support (2023)**:

- **Chrome**: удалён в 119
- **Firefox**: никогда не поддерживал
- **Safari**: всё ещё поддерживает в 2023 (deprecated)
- **Edge**: удалён в 119 (синхронизировано с Chrome)

**Источники**:

- https://developer.chrome.com/blog/deprecating-web-sql
- https://groups.google.com/a/chromium.org/g/blink-dev/c/fWYb6evVA-w/m/pziWcvboAgAJ
- https://developer.chrome.com/en/blog/web-sql-deprecation-timeline-updated

### 6. Browser-specific Security Features (2023)

#### 6.1 Firefox

##### Total Cookie Protection в Strict Mode (Firefox 111)

**Описание**: добавление Total Cookie Protection к Enhanced Tracking Protection's Strict Mode.

Total Cookie Protection изолирует cookies по first-party context, эффективно партиционируя их.

**Browser support**: Firefox 111+ (март 2023)

**Security implications**: значительное улучшение privacy, предотвращающее cross-site tracking через
cookies.

**Источники**:

- https://www.ghacks.net/2023/03/14/find-out-what-is-new-in-firefox-111/

##### GPU Sandboxing на Windows (Firefox 110)

**Описание**: поддержка GPU "sandboxing" на Windows.

**Browser support**: Firefox 110+ (февраль 2023)

**Security implications**: изоляция GPU процессов для предотвращения privilege escalation и других
attacks через GPU drivers.

#### 6.2 Safari

##### Enhanced Private Browsing (Safari 17)

**Описание**: Safari 17 вводит Face ID–locked Private Browsing, default blocking tracking в private
mode, link-tracking removal и separate private-mode search engine settings.

**Функции**:

- **Face ID/Touch ID Lock**: Private Browsing windows блокируются, когда не используются
- **Default Tracker Blocking**: known trackers полностью блокируются от загрузки на страницы
- **Link Tracking Protection**: удаление tracking parameters из URLs

**Пример Link Tracking Protection**:

```
Исходный URL:
https://example.com/page?utm_source=newsletter&utm_campaign=2023&fbclid=abc123

После обработки Safari:
https://example.com/page
```

**Browser support**: Safari 17+ (сентябрь 2023)

**Security implications**: значительное улучшение privacy в Private Browsing mode.

**Источники**:

- https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/
- https://www.loophorizon.com/blog/will-safari-17-impact-your-marketing

##### WebKit Architecture Improvements (Safari 17)

**Описание**: новая архитектура позволяет WebKit изолировать powerful graphics hardware и driver
access от WebContent process (который взаимодействует с untrusted content из Internet).

Новый дизайн также позволяет WebContent process sandbox полностью блокировать IOKit access.

**Security implications**: критическое улучшение security через process isolation. Graphics exploits
— распространённый attack vector, изоляция снижает risk.

**Browser support**: Safari 17+ (сентябрь 2023)

**Источники**:

- https://webkit.org/blog/14445/webkit-features-in-safari-17-0/

## Baseline 2023 — HTTP/Networking/Security Features

### Baseline Newly Available в 2023

Следующие features достигли **Baseline Newly available** статуса в 2023:

#### Fetch Metadata Headers (март 2023)

- Safari 16.4 добавил поддержку 27 марта 2023
- Кроссбраузерная совместимость достигнута
- **Статус**: Newly Available (март 2023)

#### Import Maps (март 2023)

- Safari 16.4 и Firefox 109 завершили кроссбраузерную поддержку
- **Статус**: Newly Available (март 2023)

#### Modulepreload (сентябрь 2023)

- Safari 17 и Firefox 115 завершили поддержку
- **Статус**: Newly Available (сентябрь 2023)

#### iframe loading="lazy" (декабрь 2023)

- Firefox 121 добавил поддержку
- **Статус**: Newly Available (декабрь 2023)

### Features В Процессе (не Baseline в 2023)

- **Speculation Rules API**: только Chrome
- **Service Worker Static Routing**: origin trial
- **WebTransport**: Chrome и Firefox, но не Safari
- **CHIPS**: только Chrome
- **Priority Hints**: только Chrome/Edge
- **Private Network Access**: только Chrome
- **Privacy Sandbox APIs**: только Chrome

## Browser Support Summary 2023

| Feature                       | Chrome  | Firefox        | Safari        | Baseline                       |
| ----------------------------- | ------- | -------------- | ------------- | ------------------------------ |
| **HTTP/3**                    | ✅ 109+ | ✅ 109+        | ⚠️ 16+        | ✅ Widely Available            |
| **CHIPS**                     | ✅ 114+ | ❌             | ❌            | ❌                             |
| **Privacy Sandbox APIs**      | ✅ 115+ | ❌             | ❌            | ❌                             |
| **Fetch Metadata**            | ✅ 80+  | ✅ 90+         | ✅ 16.4+      | ✅ Newly Available (март 2023) |
| **Import Maps**               | ✅ 89+  | ✅ 109+        | ✅ 16.4+      | ✅ Newly Available (март 2023) |
| **Modulepreload**             | ✅ 66+  | ✅ 115+        | ✅ 17.0+      | ✅ Newly Available (сент 2023) |
| **WebTransport**              | ✅ 97+  | ✅ 114+        | ❌            | ❌                             |
| **COEP credentialless**       | ✅ 96+  | ✅ 119+        | ❌            | ❌                             |
| **Private Network Access**    | ✅ 117+ | ❌             | ❌            | ❌                             |
| **document.domain immutable** | ✅ 115+ | ❌             | ❌            | ❌                             |
| **Web SQL removed**           | ✅ 119+ | N/A            | ⚠️ Deprecated | ❌                             |
| **WebAuthn Conditional UI**   | ✅ 108+ | ✅             | ✅ Oct 2023   | ⚠️ Approaching                 |
| **Passkeys**                  | ✅ 108+ | ✅             | ✅ iOS 16+    | ⚠️ Approaching                 |
| **CSP script-src-elem**       | ✅ 79+  | ⚠️ In progress | ✅ TP         | ❌                             |
| **Speculation Rules**         | ✅ 109+ | ❌             | ❌            | ❌                             |
| **Priority Hints**            | ✅ 102+ | ❌             | ❌            | ❌                             |

## Ключевые выводы

### Основные тренды 2023 года

1. **Privacy-first подход**: Privacy Sandbox, CHIPS, партиционированные cookies
2. **Passwordless authentication**: массовое внедрение WebAuthn Level 3 и passkeys
3. **HTTP/3 adoption**: рост до 40% трафика, поддержка Firefox 114
4. **Deprecations**: удаление `document.domain`, Web SQL для повышения безопасности
5. **Cross-origin isolation**: улучшенная поддержка COEP credentialless
6. **Network security**: Private Network Access для защиты локальных сетей
7. **Baseline achievements**: Fetch Metadata, Import Maps, Modulepreload

### Технологии, готовые к production

**Безопасно использовать**:

- ✅ HTTP/3 (40% трафика, широкая поддержка)
- ✅ Fetch Metadata headers (Baseline март 2023)
- ✅ Import Maps (Baseline март 2023)
- ✅ Modulepreload (Baseline сентябрь 2023)
- ✅ COEP/COOP/CORP для cross-origin isolation
- ✅ WebAuthn Conditional UI + Passkeys (approaching Baseline)
- ✅ SameSite=Lax cookies (default в Chrome/Firefox)

**Требуют progressive enhancement**:

- ⚠️ CHIPS — только Chrome (feature detection обязательна)
- ⚠️ Privacy Sandbox APIs — только Chrome
- ⚠️ WebTransport — Chrome и Firefox, но не Safari
- ⚠️ Priority Hints — только Chrome/Edge
- ⚠️ Speculation Rules — только Chrome

**Избегать**:

- ❌ `document.domain` (deprecated в Chrome 115)
- ❌ Web SQL (removed в Chrome 119)
- ❌ HTTP/2 Server Push (deprecated)

### Рекомендации по adoption

**Immediate Actions**:

1. **Внедрить Fetch Metadata защиту на backend**:

```javascript
// Resource Isolation Policy
app.use((req, res, next) => {
    const site = req.headers['sec-fetch-site'];
    if (site === 'cross-site' && req.path.startsWith('/api/')) {
        return res.status(403).send('Forbidden');
    }
    next();
});
```

2. **Использовать Import Maps для module resolution**:

```html
<script type="importmap">
    {
        "imports": {
            "react": "https://cdn.skypack.dev/react@18",
            "lodash": "/node_modules/lodash-es/lodash.js"
        }
    }
</script>
```

3. **Добавить Modulepreload для критических модулей**:

```html
<link rel="modulepreload" href="/js/app.js" /> <link rel="modulepreload" href="/js/utils.js" />
```

4. **Настроить COEP/COOP для powerful features**:

```http
Cross-Origin-Embedder-Policy: credentialless
Cross-Origin-Opener-Policy: same-origin
```

5. **Внедрить WebAuthn + Passkeys для passwordless auth**:

```javascript
const credential = await navigator.credentials.get({
    publicKey: {
        /* ... */
    },
    mediation: 'conditional',
});
```

**Plan for Future**:

1. **Подготовиться к third-party cookie deprecation** (2024)
    - Рассмотреть CHIPS для cross-site cookies
    - Оценить использование Privacy Sandbox APIs

2. **Мониторить WebTransport** для real-time приложений
    - Альтернатива WebSocket с lower latency

3. **Тестировать Private Network Access requirements**
    - Если приложение взаимодействует с локальными устройствами

4. **Следить за Speculation Rules API**
    - Значительное улучшение page load performance

**Security Best Practices**:

1. **CSP с script-src-elem/script-src-attr** (когда достигнет Baseline)
2. **Reporting API v1** для мониторинга violations
3. **SameSite=Lax** для всех session cookies
4. **HTTPS-only** для всех production сервисов
5. **Regular security audits** с использованием Fetch Metadata

## Источники

### Официальные Browser Sources

**Chrome**:

- Chrome Platform Status: https://chromestatus.com/
- Chrome Releases Blog: https://chromereleases.googleblog.com/2023/
- Chrome for Developers: https://developer.chrome.com/

**Firefox**:

- Firefox Release Notes: https://www.mozilla.org/en-US/firefox/releases/
- MDN Web Docs: https://developer.mozilla.org/
- Firefox for Developers: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases

**Safari**:

- Safari Release Notes: https://developer.apple.com/documentation/safari-release-notes
- WebKit Blog: https://webkit.org/blog/
- Safari Technology Preview: https://developer.apple.com/safari/technology-preview/

### Standards Bodies

- WHATWG: https://whatwg.org/
- W3C: https://www.w3.org/
- IETF HTTP Working Group: https://httpwg.org/
- TC39 (JavaScript): https://tc39.es/

### Privacy Sandbox

- Privacy Sandbox: https://privacysandbox.google.com/
- Google for Developers Privacy Sandbox: https://developers.google.com/privacy-sandbox/
- CHIPS Documentation: https://developers.google.com/privacy-sandbox/3pcd/chips
- Feedback Reports Q1 2023:
  https://developers.google.com/privacy-sandbox/overview/feedback/report-2023-q1
- Feedback Reports Q2 2023:
  https://developers.google.com/privacy-sandbox/overview/feedback/report-2023-q2

### Security Specifications

- W3C Content Security Policy Level 3: https://www.w3.org/TR/CSP3/
- W3C Permissions Policy: https://www.w3.org/TR/permissions-policy/
- W3C WebAuthn Level 3: https://www.w3.org/TR/webauthn-3/
- W3C Secure Contexts: https://www.w3.org/TR/secure-contexts/
- W3C Fetch Metadata: https://www.w3.org/TR/fetch-metadata/

### Community Resources

- Can I Use: https://caniuse.com/
- web.dev Baseline: https://web.dev/baseline
- MDN Browser Compatibility Data: https://github.com/mdn/browser-compat-data
- web-platform-tests: https://github.com/web-platform-tests/wpt

### Technical Articles

- Fetch Metadata: https://web.dev/articles/fetch-metadata
- SameSite Cookies Explained: https://web.dev/articles/samesite-cookies-explained
- COOP and COEP: https://web.dev/articles/coop-coep
- WebTransport: https://web.dev/webtransport/
- Priority Hints: https://web.dev/fetch-priority/
- Import Maps: https://blog.logrocket.com/es-modules-in-browsers-with-import-maps/

### Cloudflare Research

- HTTP/3 Usage: https://blog.cloudflare.com/http3-usage-one-year-on/

- **Дата создания отчёта**: 18.11.2025
- **Research ID**: `frontend-baseline-2023-2025`
- **Автор**: DeepResearch Agent
- **Связанные отчёты**: [HTML 2023](./html.md), [CSS 2023](./css.md),
  [JavaScript 2023](./javascript.md)
