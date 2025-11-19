---
title: HTTP и безопасность — изменения 2025 года
description:
    Комплексный обзор изменений в HTTP-протоколах и веб-безопасности за 2025 год — постквантовая
    криптография, passkeys, эволюция cookies, Privacy Sandbox и практические рекомендации
outline: deep
lastUpdated: true
---

# HTTP и безопасность — изменения 2025 года

- **Период**: 1 января 2025 — 30 ноября 2025
- **Версии браузеров**: Chrome/Edge 133–142+, Firefox 134–136+, Safari 18.2–18.4+

## Обзор года

2025 год стал переломным в области веб-безопасности и сетевых протоколов. Ключевые события года:

- **Постквантовая криптография**: переход на `ML-KEM` в Chrome 131+ и массовое внедрение (38%
  HTTPS-трафика)
- **Аутентификация без паролей**: 3+ миллиарда активных `passkeys`, 48% топ-100 сайтов внедрили
  поддержку
- **HTTP/3**: достижение критической массы внедрения (30-60% веб-трафика)
- **Cookies после reversal**: отказ Google от депрекации `third-party cookies`, новая модель выбора
  пользователя
- **Privacy Sandbox**: эволюция FedCM, развитие альтернатив cookies
- **Certificate management**: внедрение `Certificate Transparency` и `CRLite` в Firefox
- **Bounce tracking protection**: активные меры против обхода блокировки cookies

## 1. HTTP-протоколы

### 1.1. HTTP/3 и QUIC: массовое внедрение

**Статус**: критическая масса внедрения достигнута в 2025 году

Протокол `HTTP/3`, построенный на `QUIC` (UDP-based transport), достиг зрелости в 2025 году.

**Статистика внедрения**:

- 30-60% глобального веб-трафика использует `HTTP/3`
- 30% HTTP-запросов через Cloudflare используют `QUIC`
- 95%+ основных браузеров поддерживают `HTTP/3`
- 34% из топ-10 млн сайтов используют `HTTP/3`

**Поддержка браузерами**:

- Chrome/Edge: полная поддержка с версии 97+
- Firefox: полная поддержка с версии 115+
- Safari: полная поддержка с версии 14+

**Технические основы QUIC**:

В отличие от `HTTP/2`, базирующегося на `TCP`, протокол `HTTP/3` использует `QUIC` —
мультиплексированный транспортный протокол на основе `UDP`. Ключевые преимущества:

- Интеграция `TLS 1.3` непосредственно в протокол
- Устранение необходимости отдельного TLS handshake
- Более быстрое установление соединений (0-RTT возможность)
- Решение проблемы head-of-line blocking
- Улучшенная миграция соединений при смене сети

**Базовые RFC**:

- `RFC 9000`: QUIC: A UDP-Based Multiplexed and Secure Transport
- `RFC 9001`: Using TLS to Secure QUIC
- `RFC 9002`: QUIC Loss Detection and Congestion Control
- `RFC 9114`: HTTP/3
- `RFC 9221`: Unreliable Datagram Extension to QUIC

**Новые разработки 2025 года**:

**Extended Key Update for QUIC** (7 июля 2025):

- Статус: Internet-Draft `draft-ietf-quic-extended-key-update-01`
- Истекает: 8 января 2026
- Назначение: механизм расширенного обновления ключей для повышения безопасности
- Позволяет частое обновление ключей без полного пересогласования handshake

**Преимущества для веб-приложений**:

```javascript
// Детектирование HTTP/3 на клиенте
if (performance && performance.getEntriesByType) {
    const resources = performance.getEntriesByType('resource');
    const http3Resources = resources.filter((entry) => entry.nextHopProtocol === 'h3');
    console.log(`HTTP/3 ресурсов: ${http3Resources.length}`);
}
```

**Производительность**:

- Снижение latency на 20-30% по сравнению с `HTTP/2`
- Улучшенная производительность на нестабильных соединениях
- Быстрое восстановление после потери пакетов

### 1.2. Новые Internet-Drafts IETF HTTPbis

Рабочая группа HTTP (HTTPbis) была перечартерована 13 октября 2025 года под руководством Tommy Pauly
и Mark Nottingham.

#### 1.2.1. HTTP QUERY Method

**Спецификация**: `draft-ietf-httpbis-safe-method-w-body-11`

Новый HTTP-метод `QUERY` позволяет передавать безопасные запросы с телом сообщения.

**Преимущества**:

- Безопасный метод (аналогично `GET`)
- Поддержка сложных запросов с телом
- Возможность кэширования
- Решение проблемы ограничений длины URL

**Пример использования**:

```http
QUERY /api/search HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "filters": {
    "category": ["electronics", "computers"],
    "priceRange": { "min": 100, "max": 1000 },
    "brands": ["Apple", "Samsung", "Sony"]
  },
  "sort": { "field": "price", "order": "asc" },
  "pagination": { "page": 1, "limit": 50 }
}
```

**Сравнение с GET**:

```javascript
// GET с ограничениями длины URL
fetch('/api/search?filters=' + encodeURIComponent(JSON.stringify(complexFilters)));

// QUERY без ограничений
fetch('/api/search', {
    method: 'QUERY',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filters: complexFilters }),
});
```

#### 1.2.2. No-Vary-Search Header

**Спецификация**: `draft-ietf-httpbis-no-vary-search-03` (29 сентября 2025)

Определяет HTTP-заголовок ответа для изменения влияния параметров URL на кэширование.

**Функциональность**:

Позволяет серверам указывать, какие параметры запроса URL должны игнорироваться при принятии решения
о кэшировании.

**Пример**:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Cache-Control: public, max-age=3600
No-Vary-Search: params=("utm_source" "utm_campaign" "utm_medium" "fbclid")

<!DOCTYPE html>
<html>...
```

**Применение**:

```javascript
// Эти URL будут считаться идентичными для кэширования:
// https://example.com/article?id=123&utm_source=twitter
// https://example.com/article?id=123&utm_source=facebook
// https://example.com/article?id=123

// Кэш будет использован для всех вариантов
```

**Сценарии использования**:

- Игнорирование аналитических параметров (`utm_*`, `fbclid`)
- Улучшение cache hit rate
- Снижение нагрузки на сервер

#### 1.2.3. Incremental HTTP Messages

**Спецификация**: `draft-ietf-httpbis-incremental-00` (30 апреля 2025)

Специфицирует поле HTTP-заголовка `Incremental` для инкрементальной пересылки HTTP-сообщений.

**Назначение**:

Позволяет промежуточным узлам передавать данные по мере их получения, не дожидаясь полной загрузки
ресурса.

```http
GET /large-video.mp4 HTTP/1.1
Host: cdn.example.com
Incremental: 1

HTTP/1.1 200 OK
Content-Type: video/mp4
Incremental: 1
Transfer-Encoding: chunked
```

**Преимущества**:

- Улучшение воспринимаемой производительности
- Быстрое отображение первого контента
- Оптимизация для стриминга

#### 1.2.4. HTTP Cookies: обновление RFC 6265

**Спецификация**: `draft-ietf-httpbis-rfc6265bis-20` (17 марта 2025)

Обновление определения HTTP-заголовков `Cookie` и `Set-Cookie`. Документ сделает устаревшим
`RFC 6265`.

**Основные изменения**:

- Уточнение механизмов работы cookies
- Улучшение безопасности cookies
- Обновление правил обработки атрибутов
- Формализация современных практик (`SameSite`, `Partitioned`)

### 1.3. HTTP/1.1: защита от Request Smuggling

**IETF Draft**: `draft-nygren-httpbis-http11-request-binding-00` (16 октября 2025)

Добавление hop-by-hop полей заголовков, криптографически привязанных к запросам и ответам для
обнаружения и предотвращения атак десинхронизации.

**Механизм защиты**:

```http
GET /api/data HTTP/1.1
Host: example.com
X-Request-Signature: Ed25519=base64signature
Content-Length: 0

```

**Принцип работы**:

- Использование пар ключей `Ed25519`
- Криптографическая привязка сообщений
- Верификация подписей с помощью публичных ключей
- Обнаружение десинхронизации запросов между прокси и сервером

### 1.4. Fetch API: универсальный стандарт

**Статус в 2025 году**: стабилизация в Node.js и полная кросс-платформенность

`Fetch API` стал универсальным стандартом для HTTP-запросов в 2025 году благодаря нативной поддержке
в Node.js 21+.

**Поддержка браузерами**:

- Chrome: 42+
- Firefox: 39+
- Edge: 14+
- Safari: 10.1+
- Node.js: 21+ (стабильный)

**Интеграция в Node.js**:

```javascript
// Node.js 21+ — нативная поддержка без import
const response = await fetch('https://api.example.com/data');
const data = await response.json();

// Основа реализации: библиотека Undici
```

**Современные возможности**:

```javascript
// Отмена запросов
const controller = new AbortController();
const signal = controller.signal;

const fetchPromise = fetch('https://api.example.com/data', { signal })
    .then((response) => response.json())
    .catch((err) => {
        if (err.name === 'AbortError') {
            console.log('Запрос отменён пользователем');
        }
    });

// Отмена через 5 секунд
setTimeout(() => controller.abort(), 5000);
```

**Работа со streams**:

```javascript
// Обработка больших файлов по частям
const response = await fetch('https://example.com/large-file');
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    console.log('Получен фрагмент:', chunk.length, 'символов');
    // Обработка chunk
}
```

**Альтернативные библиотеки 2025**:

- `ky`: лёгкий wrapper над Fetch API с расширениями
- `ofetch`: используется Nuxt 3, унифицированный API для браузера и Node.js

### 1.5. WebTransport API

**Статус в 2025 году**: стабильная поддержка в Chrome/Firefox, отсутствует в Safari

`WebTransport` — современный API для двунаправленной коммуникации с низкой задержкой, построенный на
`HTTP/3`.

**Поддержка браузерами**:

- Chrome/Edge: 97+ (полная поддержка)
- Firefox: 115+ (полная поддержка)
- Safari: не поддерживается
- Mobile Chrome: 108+

**Совместимость**: 63/100

#### Chrome 143: Application Protocol Negotiation

**Новая возможность**: согласование протокола приложения в рамках WebTransport handshake.

```javascript
// Согласование протокола приложения
const transport = new WebTransport('https://example.com/chat', {
    protocols: ['chat-v2', 'chat-v1'],
});

await transport.ready;

// Проверка выбранного протокола
console.log('Согласованный протокол:', transport.protocol);

// Использование bidirectional streams
const stream = await transport.createBidirectionalStream();
const writer = stream.writable.getWriter();
const reader = stream.readable.getReader();

// Отправка данных
await writer.write(new TextEncoder().encode('Hello, server!'));

// Чтение ответа
const { value, done } = await reader.read();
console.log('Ответ:', new TextDecoder().decode(value));
```

**Применение**:

- Игры в реальном времени
- Видеоконференции
- Совместное редактирование документов
- Финансовые приложения реального времени

## 2. Постквантовая криптография

### 2.1. ML-KEM: переход от Kyber

**Статус**: массовое внедрение в 2025 году

В ноябре 2024 года Chrome 131 осуществил переход от экспериментального алгоритма `Kyber` к
стандартизированному NIST алгоритму `ML-KEM` (Module-Lattice-based Key-Encapsulation Mechanism).

**Версии браузеров**:

- Chrome/Edge: 131+ (ноябрь 2024)
- Firefox: поддержка `X25519MLKEM768` по умолчанию
- Safari: поддержка гибридных схем в Safari 18+

**Технические детали**:

Гибридная схема комбинирует классическую эллиптическую криптографию (`X25519`) с постквантовым
алгоритмом на основе решеток (`ML-KEM-768`).

```
shared_secret = KDF(kem_shared_secret || ecdh_shared_secret)
```

где:

- `kem_shared_secret` получен через `ML-KEM-768`
- `ecdh_shared_secret` получен через `X25519`
- `KDF` — функция деривации ключа

**Изменения в TLS 1.3**:

```
// Codepoint изменён:
// Старый (Kyber):  0x6399 (Kyber768+X25519)
// Новый (ML-KEM):  0x11EC (ML-KEM768+X25519)
```

**Статистика внедрения**:

По данным Cloudflare (март 2025): **38% HTTPS-трафика** использует гибридные постквантовые
рукопожатия.

**Проблемы совместимости**:

Внедрение постквантовой криптографии выявило проблемы с устаревшими сетевыми устройствами:

- Fortinet FortiGate
- SonicWall security appliances
- Palo Alto Networks firewalls
- Некоторые конфигурации AWS

**Причина**: увеличенные размеры сообщений `ClientHello` в TLS-рукопожатии (~1200 байт вместо ~200
байт).

**Решение**: обновление firmware устройств или временное отключение постквантовой криптографии.

### 2.2. Постквантовая защита для Passkeys

**Дата**: 24 апреля 2025 года — IANA обновила кодовый список
`CBOR Object Signing and Encryption (COSE)`

Технология `passkeys` (FIDO2) теперь готова противостоять угрозам квантовых компьютеров.

**Гибридная схема**:

Комбинирование `ECDSA` с постквантовым алгоритмом `Dilithium`.

```javascript
// Создание passkey с постквантовой защитой
const credential = await navigator.credentials.create({
    publicKey: {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: { name: 'Example Corp', id: 'example.com' },
        user: {
            id: crypto.getRandomValues(new Uint8Array(16)),
            name: 'user@example.com',
            displayName: 'User Name',
        },
        pubKeyCredParams: [
            // Классический ECDSA
            { alg: -7, type: 'public-key' }, // ES256
            // Постквантовые алгоритмы
            { alg: -8, type: 'public-key' }, // EdDSA (с Dilithium)
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            requireResidentKey: true,
            userVerification: 'required',
        },
        timeout: 60000,
        attestation: 'none',
    },
});
```

**Защита от "store now, decrypt later"**:

Постквантовая защита passkeys обеспечивает защиту от атак, когда злоумышленник записывает
зашифрованные данные аутентификации сейчас и расшифровывает их в будущем с помощью квантового
компьютера.

### 2.3. Постквантовая защита WebRTC

**Chrome 142**: активация постквантовой криптографии для WebRTC-соединений

**Цель**: обновление медиа-трафика WebRTC до последних криптографических протоколов и предотвращение
сценариев «Harvest Now, Crack Later».

**Firefox 135**: поддержка `mlkem768x25519` для `HTTP/3`

```javascript
// Постквантовая защита WebRTC (Chrome 142+)
const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.example.com' }],
});

// Автоматическое использование постквантовой криптографии
// для DTLS-соединений WebRTC
```

## 3. Аутентификация без паролей: Passkeys и WebAuthn

### 3.1. Глобальное внедрение Passkeys

**Статус**: критическая масса достигнута в 2025 году

По данным FIDO Alliance (World Passkey Day 2025):

- **3+ миллиарда passkeys** в активном использовании
- **48% из топ-100 сайтов** внедрили поддержку passkeys
- **75% глобальных потребителей** знают о существовании passkeys
- **54% пользователей** считают passkeys удобнее паролей
- **53% считают passkeys** более безопасными
- **35% пользователей** имели скомпрометированные аккаунты из-за паролей за последний год

**Поддержка браузерами**:

- Chrome/Edge: 108+ (полная поддержка с декабря 2022)
- Firefox: 122+ (улучшенная поддержка)
- Safari: 16+ (macOS Ventura, iOS 16+)

**Поддержка платформами**:

- Windows: Windows 10 (версия 1903+) и Windows 11
- macOS: macOS Ventura (13.0+)
- iOS/iPadOS: iOS 16+
- Android: Android 9+

### 3.2. WebAuthn Level 3

**Статус**: First Public Working Draft (FPWD) в W3C

Спецификация `WebAuthn Level 3` активно развивается. Основные браузеры начали внедрение ключевых
возможностей.

#### 3.2.1. Client Capabilities API

**Chrome 136+, Firefox 135+, Safari 18+**

Проверка возможностей клиента перед инициацией регистрации или аутентификации.

```javascript
// Проверка возможностей WebAuthn клиента
const capabilities = await PublicKeyCredential.getClientCapabilities();

console.log('Capabilities:', capabilities);
// {
//   conditionalCreate: true,
//   conditionalGet: true,
//   hybridTransport: true,
//   passkeyPlatformAuthenticator: true,
//   userVerifyingPlatformAuthenticator: true,
//   relatedOrigins: true,
//   signalAllAcceptedCredentials: true,
//   signalCurrentUserDetails: true,
//   signalUnknownCredential: true
// }

// Адаптивная логика на основе capabilities
if (capabilities.passkeyPlatformAuthenticator) {
    // Устройство поддерживает platform passkeys
    showPasskeyRegistration();
} else if (capabilities.hybridTransport) {
    // Можно использовать hybrid flow (QR-код)
    showHybridFlow();
} else {
    // Fallback на security keys
    showSecurityKeyFlow();
}
```

**Применение**:

- Оптимизация UX на основе возможностей устройства
- Избежание ошибок при попытке использовать неподдерживаемые функции
- Прогрессивное улучшение аутентификации

#### 3.2.2. PRF Extension (Pseudo-Random Function)

**Safari 18+ на macOS 15+, Chrome/Edge (через iCloud Keychain)**

Расширение `prf` обеспечивает псевдослучайные функции для сценариев сквозного шифрования.

```javascript
// Регистрация с PRF для E2E шифрования
const credential = await navigator.credentials.create({
    publicKey: {
        challenge: challenge,
        rp: { name: 'SecureApp', id: 'app.example.com' },
        user: {
            id: userId,
            name: email,
            displayName: name,
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            requireResidentKey: true,
            userVerification: 'required',
        },
        extensions: {
            prf: {
                eval: {
                    first: saltValue, // Salt для PRF (32 байта)
                },
            },
        },
    },
});

// При аутентификации получаем симметричный ключ
const assertion = await navigator.credentials.get({
    publicKey: {
        challenge: challenge,
        rpId: 'app.example.com',
        extensions: {
            prf: {
                eval: {
                    first: saltValue, // Тот же salt
                },
            },
        },
    },
});

// Результат PRF можно использовать для шифрования
const prfResult = assertion.getClientExtensionResults().prf;
if (prfResult && prfResult.results) {
    const encryptionKey = prfResult.results.first; // 32 байта

    // Использование ключа для AES-GCM шифрования
    const key = await crypto.subtle.importKey(
        'raw',
        encryptionKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt'],
    );

    // Шифрование данных
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, userData);
}
```

**Применение**:

- End-to-end шифрование без хранения ключей
- Password managers
- Защищённое хранилище
- Биометрическая защита данных

**Ограничения (2025)**:

- iOS 18: поддержка с известными ошибками
- Фрагментированная поддержка между платформами

#### 3.2.3. Автоматическое обновление до Passkey

**Safari 18, iOS 18**

Автоматическое обновление паролей до passkeys через расширение `WebAuthn Conditional Registration`.

```javascript
// Условная регистрация passkey
const credential = await navigator.credentials.create({
    publicKey: {
        challenge: challenge,
        rp: { name: 'Example', id: 'example.com' },
        user: { id: userId, name: email, displayName: name },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
        authenticatorSelection: {
            requireResidentKey: true,
            userVerification: 'preferred',
        },
        extensions: {
            conditionalCreate: true, // Условная регистрация
        },
    },
    mediation: 'conditional',
});
```

**UX flow**:

1. Пользователь заполняет форму входа
2. Автозаполнение предлагает существующий пароль
3. После автозаполнения появляется prompt Face ID/Touch ID
4. Пароль автоматически обновляется до passkey
5. Следующий вход использует passkey

#### 3.2.4. Related Origins

**Safari 18+**

Использование passkeys на связанных доменах (related origins).

**Конфигурация** (файл `/.well-known/web-identity`):

```json
{
    "webcredentials": {
        "apps": ["TEAMID.com.example.app"],
        "related_origins": [
            "https://example.com",
            "https://www.example.com",
            "https://m.example.com",
            "https://shop.example.com"
        ]
    }
}
```

**Применение**:

- Единый passkey для поддоменов
- Общий бэкенд аутентификации
- Упрощение UX для пользователей

**Безопасность**:

- Требуется публикация well-known URL
- Прозрачность авторизованных доменов
- Предотвращение злоупотреблений

### 3.3. Вызовы и направления развития

**Проблемы syncable passkeys**:

Синхронизируемые passkeys имеют пробелы в безопасности по сравнению с device-bound passkeys:

- Меньшая защита от компрометации облачного хранилища
- Сложность корпоративного контроля
- Проблемы с применением политик

**FIDO Alliance работает над**:

1. **Trust signals** — сигналы доверия для оценки уровня безопасности аутентификатора
2. **Relational public key (RPK)** — механизмы связи публичных ключей

**Угрозы, связанные с AI**:

Социальная инженерия, генерируемая искусственным интеллектом, определена как крупнейшая угроза.
FIDO-безопасность должна адаптироваться к фишингу, управляемому AI.

## 4. Экосистема Cookies после reversal

### 4.1. Решение Google об отказе от deprecation

**Дата**: июль 2024 года

Google объявил о кардинальном изменении стратегии: **отказ от планов по унилатеральному удалению
`third-party cookies`** в Chrome.

**Новая модель**: интерфейс выбора пользователя (user choice interface), позволяющий индивидам
принимать решение о блокировке или разрешении third-party cookies.

**Текущий статус (2025)**:

`Third-party cookies` остаются **включёнными по умолчанию** во всех версиях Chrome 133-142+.

**Требования безопасности** (сохраняются с Chrome 80, февраль 2020):

```http
Set-Cookie: session=abc123; SameSite=None; Secure; HttpOnly; Path=/
```

Third-party cookies **должны** быть явно помечены атрибутами `SameSite=None; Secure`, иначе они
будут отклонены.

**Настройки по умолчанию (2025)**:

- Chrome/Edge: `SameSite=Lax` по умолчанию
- Firefox: `SameSite=Lax` по умолчанию
- Safari: блокировка большинства third-party cookies по умолчанию

### 4.2. CHIPS (Cookies Having Independent Partitioned State)

**Статус**: включено по умолчанию в Chrome 114+ (май 2023)

`CHIPS` позволяет разработчикам явно выбрать cookie в партиционированное хранилище с отдельным
cookie jar на каждый top-level сайт.

**Поддержка браузерами**:

- Chrome/Edge: 114+ (стабильная поддержка)
- Safari: 18.4+ (macOS Sequoia 15.4, iOS 18.4, visionOS 2.4)
- Firefox: в разработке

**Принцип работы**:

Партиционированная third-party cookie привязана к top-level сайту, где она была изначально
установлена, и не может быть доступна из других контекстов.

```http
Set-Cookie: __Host-session=value;
            SameSite=None;
            Secure;
            Path=/;
            Partitioned
```

**Требования**:

- **Обязательно**: атрибут `Secure`
- **Рекомендуется**: префикс `__Host-` для дополнительной безопасности
- **Ограничения**: максимум 180 cookies на партицию, 10 КБ на встроенный сайт

**Примеры использования**:

```javascript
// Установка партиционированной cookie
document.cookie = '__Host-3pc=value; SameSite=None; Secure; Path=/; Partitioned';

// Чтение cookies (видны только для текущей партиции)
const cookies = document.cookie;
console.log(cookies);
```

**Сценарии применения**:

1. **Встроенные карты**: сохранение состояния карт на поддоменах
2. **Виджеты чата**: персистентность настроек между доменами организации
3. **Встроенный контент**: сохранение пользовательских предпочтений
4. **Балансировка нагрузки**: sticky sessions для встроенных сервисов

**Safari 18.4**: Clear-Site-Data для партиционированных cookies

```http
Clear-Site-Data: "cache", "cookies", "storage"
```

При получении first-party сайтами очищает неразделённые cookies; cross-site iframe очищает только
партиционированные cookies для конкретного сайта.

**Безопасность**:

Партиционирование предотвращает cross-site tracking, блокируя возможность отслеживания пользователя
между разными top-level сайтами.

### 4.3. Атрибут SameSite

**Настройки по умолчанию (2025)**:

```http
# Безопасная конфигурация для third-party cookies
Set-Cookie: session=value;
            SameSite=None;
            Secure;
            HttpOnly;
            Path=/;
            Max-Age=3600

# First-party cookies с защитой от CSRF
Set-Cookie: auth=token;
            SameSite=Strict;
            Secure;
            HttpOnly;
            Path=/;
            Max-Age=86400

# Баланс безопасности и совместимости
Set-Cookie: tracking=id;
            SameSite=Lax;
            Secure;
            Path=/;
            Max-Age=31536000
```

**Значения атрибута**:

- `Strict`: cookie отправляется только в first-party контексте
- `Lax`: cookie отправляется в first-party контексте и при top-level navigation
- `None`: cookie отправляется в любом контексте (требует `Secure`)

**Рекомендации на 2025 год**:

1. Всегда использовать `Secure` и `HttpOnly` с SameSite cookies
2. Cookies должны передаваться только через HTTPS
3. Использовать `SameSite=Strict` для максимальной защиты от CSRF
4. Использовать `SameSite=Lax` для баланса безопасности и совместимости
5. Использовать `SameSite=None; Secure` только для легитимных cross-site сценариев

### 4.4. Bounce Tracking Protection

**Firefox 135+, Safari 18+**

Защита от bounce tracking — техники обхода блокировки third-party cookies.

**Принцип bounce tracking**:

```
example.com → tracker.com (redirect) → destination.com
              ↑ устанавливает first-party cookie
```

**Механизм защиты**:

- Детектирование bounce-паттернов
- Автоматическое удаление cookies от tracker
- Ограничение времени жизни storage

**Firefox 135**: блокировка сайтов от flooding browser history через History API

```javascript
// Защита от history flooding (Firefox 135+)
let count = 0;
const limit = 100; // Firefox ограничивает количество записей

function attemptHistoryFlood() {
    if (count < limit) {
        history.pushState({}, '', `/page${count}`);
        count++;
    } else {
        console.warn('History flood prevented by Firefox');
    }
}
```

## 5. Privacy Sandbox: эволюция после reversal

### 5.1. Federated Credential Management API (FedCM)

**Статус**: зрелая реализация в Chrome 141+

FedCM обеспечивает федеративную аутентификацию без использования third-party cookies.

**Версии браузеров**:

- Chrome/Edge: 108+ (базовая поддержка)
- Chrome 122+: Disconnect API
- Chrome 126+: Continuation API bundle
- Chrome 141+: улучшения Fields API

#### 5.1.1. Chrome 141: Fields API Updates

**Изменения**: поля `email` и `name` сделаны опциональными, добавлено поле `username`.

```javascript
// Новая структура account в FedCM (Chrome 141+)
{
  "accounts": [{
    "id": "1234",
    "username": "user123",        // Новое опциональное поле
    "email": "user@example.com",  // Теперь опциональное
    "name": "User Name",          // Теперь опциональное
    "given_name": "User",
    "picture": "https://example.com/avatar.jpg",
    "approved_clients": ["client1", "client2"]
  }]
}
```

**Обоснование**: некоторые Identity Providers позволяют регистрацию с номером телефона или именем
пользователя вместо email.

#### 5.1.2. Chrome 126: Continuation API

```javascript
// Multi-step authentication flows
const token = await navigator.credentials.get({
    identity: {
        providers: [
            {
                configURL: 'https://idp.example/config.json',
                clientId: 'client123',
                continuation: {
                    url: 'https://idp.example/continue',
                    parameters: {
                        step: 'additional-consent',
                    },
                },
            },
        ],
    },
});
```

**Storage Access API auto-grant**:

FedCM может автоматически предоставлять доступ к unpartitioned storage после успешной
аутентификации.

```javascript
// После успешного FedCM flow
document.hasStorageAccess().then((hasAccess) => {
    console.log('Storage access:', hasAccess); // true
});
```

#### 5.1.3. Chrome 122: Disconnect API

```javascript
// Отключение федеративной учетной записи
IdentityCredential.disconnect({
    configURL: 'https://idp.example/config.json',
    clientId: 'client123',
    accountHint: 'user@example.com',
});

// Предотвращение silent access
navigator.credentials.preventSilentAccess();
```

**Безопасность**: приватный механизм отзыва доступа без коммуникации через third-party контекст.

### 5.2. Topics API

**Статус**: активное развитие в Chrome

Topics API — механизм interest-based advertising без cross-site tracking.

**Принцип работы**:

1. Браузер определяет интересы пользователя на основе истории
2. Интересы хранятся локально (350+ топиков)
3. Сайты запрашивают топики через API
4. Браузер предоставляет 3 топика (текущая неделя + 2 предыдущие)

```javascript
// Запрос топиков (Chrome 115+)
if (document.featurePolicy.allowsFeature('browsing-topics')) {
    fetch('https://ad-network.example/ads', {
        browsingTopics: true,
    }).then((response) => {
        // Сервер получает топики в заголовке Sec-Browsing-Topics
        const topics = response.headers.get('Observe-Browsing-Topics');
        console.log('Topics:', topics);
    });
}
```

**Приватность**:

- Топики хранятся локально
- Обновление каждую неделю
- Случайный топик в 5% случаев (noise)
- Максимум 3 топика на запрос

## 6. Content Security Policy

### 6.1. Trusted Types

**Статус**: полная поддержка в Chrome/Edge 83+

Trusted Types — API для предотвращения DOM-based XSS.

**Поддержка браузерами**:

- Chrome/Edge: 83+
- Firefox: не поддерживается (polyfill доступен)
- Safari: не поддерживается (polyfill доступен)

**Включение через CSP**:

```http
Content-Security-Policy:
  require-trusted-types-for 'script';
  trusted-types default myPolicy;
```

**Создание политики**:

```javascript
// Определение политики санитизации
const policy = trustedTypes.createPolicy('myPolicy', {
    createHTML: (string) => {
        // Санитизация HTML
        return DOMPurify.sanitize(string, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
            ALLOWED_ATTR: ['href'],
        });
    },

    createScript: (string) => {
        if (string === 'safe-inline-script') {
            return string;
        }
        throw new TypeError('Script blocked by Trusted Types');
    },

    createScriptURL: (string) => {
        const url = new URL(string, document.baseURI);
        if (url.origin === location.origin || url.origin === 'https://trusted-cdn.example.com') {
            return string;
        }
        throw new TypeError('Script URL blocked');
    },
});

// Использование политики
element.innerHTML = policy.createHTML(userInput); // ✅ Безопасно
script.src = policy.createScriptURL('/trusted.js'); // ✅ Безопасно
```

**Default policy**:

```javascript
trustedTypes.createPolicy('default', {
    createHTML: (string) => {
        console.warn('Unsafe HTML assignment detected');
        return ''; // Блокируем небезопасный контент
    },
    createScriptURL: (string) => {
        console.error('Unsafe script URL:', string);
        throw new TypeError('Script URL blocked');
    },
});
```

**Защищенные sinks**:

```javascript
// Все следующие операции требуют Trusted Types:
element.innerHTML = trustedHTML;
element.outerHTML = trustedHTML;
script.src = trustedScriptURL;
script.text = trustedScript;
eval(trustedScript);
new Function(trustedScript);
location.href = trustedURL;
```

### 6.2. CSP Level 3

**Firefox 135**: строгий CSP для Firefox UI

```
default-src 'none';
script-src 'self' 'wasm-unsafe-eval';
style-src 'self';
img-src 'self' data: https:;
```

**Предотвращение XSS-подобных sandbox escapes** в браузерном интерфейсе.

**Рекомендации для веб-приложений**:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'nonce-{random}';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
  block-all-mixed-content;
  require-trusted-types-for 'script';
```

## 7. Управление сертификатами

### 7.1. Certificate Transparency

**Firefox 136**: обязательное применение Certificate Transparency

Certificate Transparency обеспечивает публичную, проверяемую запись всех выпущенных сертификатов.

**Принцип работы**:

1. Certificate Authority логирует сертификат в CT log
2. Получает Signed Certificate Timestamp (SCT)
3. Сертификат предоставляется с SCT
4. Браузер проверяет наличие SCT

**Требования**:

- Минимум 2 SCT от разных CT logs
- SCT должны быть от доверенных logs
- Проверка timestamp и подписи

**Обнаружение**:

- Неправильно выпущенные сертификаты
- Вредоносные сертификаты
- Компрометированные CA

### 7.2. CRLite

**Firefox 135**: внедрение CRLite

CRLite — быстрый, надёжный и сохраняющий конфиденциальность механизм проверки отзыва сертификатов.

**Преимущества**:

- **Приватность**: отсутствие раскрытия информации о посещаемых сайтах
- **Скорость**: быстрая проверка отзыва без сетевых запросов
- **Надёжность**: работает без зависимости от внешних сервисов в реальном времени
- **Компактность**: эффективное хранилище статусов отзыва

**Сравнение с OCSP**:

| Характеристика | OCSP                     | CRLite                    |
| -------------- | ------------------------ | ------------------------- |
| Приватность    | ❌ Раскрывает сайты      | ✅ Локальная проверка     |
| Скорость       | ⚠️ Сетевой запрос        | ✅ Мгновенная             |
| Надёжность     | ❌ Зависит от респондера | ✅ Независима             |
| Размер данных  | Малый                    | ~1-2 МБ обновлений в день |

### 7.3. Сертификаты и индикаторы

**Safari 18.4**: удаление значка замка

Safari 18.4 удалил значок замка из поля Smart Search для HTTPS-соединений, признавая, что безопасные
соединения теперь повсеместны (87% всех соединений).

**Новый интерфейс Connection Security Details**:

- Информация о сертификате
- Издатель CA
- Дата истечения
- Доступно на iOS, iPadOS, visionOS

**EU QWAC сертификаты**:

В регионах ЕС интерфейс указывает соединения, использующие сертификаты EU Qualified Web
Authentication.

**Предупреждение о 3DES**:

Triple-DES отображается с предупреждением как устаревшая TLS-технология.

## 8. Baseline-достижения 2025 года

### 8.1. Широко доступные технологии

**HTTP/3 и QUIC**:

- Поддержка: Chrome 97+, Firefox 115+, Safari 14+
- Внедрение: 30-60% глобального трафика

**Passkeys**:

- Поддержка: Chrome 108+, Firefox 122+, Safari 16+
- Внедрение: 3+ млрд активных, 48% топ-100 сайтов

**Fetch API**:

- Поддержка: все современные браузеры + Node.js 21+
- Статус: универсальный стандарт

**CHIPS**:

- Поддержка: Chrome 114+, Safari 18.4+
- Статус: активное внедрение

### 8.2. Новые технологии

**WebAuthn Level 3 возможности**:

- `getClientCapabilities()`: Chrome 136+, Firefox 135+, Safari 18+
- PRF Extension: Safari 18+ на macOS 15+, Chrome (iCloud Keychain)
- Related Origins: Safari 18+

**Постквантовая криптография**:

- ML-KEM для TLS: Chrome 131+, Firefox (default), Safari 18+
- Passkeys с PQC: IANA COSE registry обновлён (апрель 2025)

**FedCM API**:

- Базовая поддержка: Chrome 108+
- Fields API: Chrome 141+
- Continuation API: Chrome 126+

## 9. Сводная таблица поддержки браузерами

| Возможность                  | Chrome/Edge | Firefox | Safari | Baseline статус     |
| ---------------------------- | ----------- | ------- | ------ | ------------------- |
| **HTTP/3**                   | 97+         | 115+    | 14+    | ✅ Widely Available |
| **ML-KEM (PQC)**             | 131+        | 135+    | 18+    | ✅ Widely Available |
| **Passkeys**                 | 108+        | 122+    | 16+    | ✅ Widely Available |
| **WebAuthn Capabilities**    | 136+        | 135+    | 18+    | ✅ Newly Available  |
| **PRF Extension**            | 136+        | ❌      | 18+    | ⏳ Partial          |
| **CHIPS**                    | 114+        | ❌      | 18.4+  | ⏳ Partial          |
| **FedCM**                    | 108+        | ❌      | ❌     | ⏳ Chrome-only      |
| **WebTransport**             | 97+         | 115+    | ❌     | ⏳ Partial          |
| **Trusted Types**            | 83+         | ❌      | ❌     | ⏳ Chrome-only      |
| **Certificate Transparency** | 90+         | 136+    | ✅     | ✅ Widely Available |
| **CRLite**                   | ❌          | 135+    | ❌     | ⏳ Firefox-only     |
| **Related Origins**          | ❌          | ❌      | 18+    | ⏳ Safari-only      |

## 10. Ключевые выводы

### 10.1. Основные тренды 2025 года

1. **Постквантовая готовность**: массовое внедрение `ML-KEM` (38% HTTPS-трафика), готовность
   passkeys
2. **Passwordless будущее**: 3+ млрд активных passkeys, 48% топ-100 сайтов с поддержкой
3. **HTTP/3 зрелость**: 30-60% глобального трафика, универсальная поддержка браузерами
4. **Privacy Sandbox эволюция**: развитие FedCM, Topics API на фоне сохранения third-party cookies
5. **Certificate transparency**: обязательное применение в Firefox, расширенная поддержка
6. **Bounce tracking protection**: активные меры против обхода блокировки cookies
7. **Zero trust архитектура**: усиление sandbox изоляции, CSP для browser UI

### 10.2. Рекомендации по внедрению

#### Немедленно внедрять

**Passkeys**:

```javascript
// Регистрация passkey с оптимальной конфигурацией
const credential = await navigator.credentials.create({
    publicKey: {
        challenge: challenge,
        rp: { name: 'YourApp', id: 'yourapp.com' },
        user: { id: userId, name: email, displayName: name },
        pubKeyCredParams: [
            { alg: -7, type: 'public-key' }, // ES256
            { alg: -257, type: 'public-key' }, // RS256 (fallback)
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            requireResidentKey: true,
            userVerification: 'preferred',
        },
        timeout: 60000,
        attestation: 'none',
    },
});
```

**HTTPS-only**:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Партиционированные cookies**:

```http
Set-Cookie: __Host-session=value; SameSite=None; Secure; Path=/; Partitioned
```

**CSP с Trusted Types**:

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  require-trusted-types-for 'script';
  trusted-types default myPolicy;
```

#### Подготовка к внедрению

**HTTP/3 оптимизация**:

- Конфигурация серверов для QUIC
- Тестирование производительности
- Мониторинг совместимости

**WebAuthn Level 3**:

```javascript
// Feature detection для новых возможностей
const capabilities = await PublicKeyCredential.getClientCapabilities();

if (capabilities.conditionalCreate) {
    // Поддержка conditional registration
}

if (capabilities.relatedOrigins) {
    // Поддержка related origins
}
```

**FedCM для федеративной аутентификации**:

```javascript
// Проверка поддержки
if ('IdentityCredential' in window) {
    // Внедрение FedCM
}
```

#### Мониторинг развития

**Topics API**: альтернатива для interest-based advertising

**Storage Access API**: доступ к unpartitioned storage после FedCM

**WebTransport**: низколатентная коммуникация для real-time приложений

### 10.3. Безопасность в production

**Обязательные практики**:

1. **HTTPS везде**: `Strict-Transport-Security` с `preload`
2. **Строгий CSP**: `default-src 'self'`, `require-trusted-types-for 'script'`
3. **Secure cookies**: `Secure; HttpOnly; SameSite=Strict/Lax`
4. **Subresource Integrity**: для всех внешних ресурсов
5. **Certificate Transparency**: мониторинг логов для домена
6. **Passkeys как primary**: пароли как fallback
7. **Регулярные обновления**: отслеживание security advisories
8. **CORS политики**: строгое ограничение origins
9. **Rate limiting**: защита от brute force
10. **Мониторинг**: логирование security events, CSP violations

## 11. Источники

### 11.1. Спецификации и стандарты

#### IETF RFC

- [RFC 9000: QUIC Transport](https://datatracker.ietf.org/doc/html/rfc9000)
- [RFC 9001: Using TLS to Secure QUIC](https://datatracker.ietf.org/doc/html/rfc9001)
- [RFC 9114: HTTP/3](https://datatracker.ietf.org/doc/html/rfc9114)
- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)
- [RFC 9111: HTTP Caching](https://datatracker.ietf.org/doc/html/rfc9111)

#### Internet-Drafts

- [draft-ietf-quic-extended-key-update-01](https://datatracker.ietf.org/doc/draft-ietf-quic-extended-key-update/)
- [draft-ietf-httpbis-safe-method-w-body-11](https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/)
- [draft-ietf-httpbis-no-vary-search-03](https://datatracker.ietf.org/doc/draft-ietf-httpbis-no-vary-search/)
- [draft-ietf-httpbis-rfc6265bis-20](https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/)
- [draft-nygren-httpbis-http11-request-binding-00](https://datatracker.ietf.org/doc/draft-nygren-httpbis-http11-request-binding/)

#### W3C

- [WebAuthn Level 3 (FPWD)](https://www.w3.org/TR/webauthn-3/)
- [Federated Credential Management API](https://fedidcg.github.io/FedCM/)
- [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/)
- [Trusted Types](https://w3c.github.io/trusted-types/dist/spec/)

#### WHATWG

- [Fetch Living Standard](https://fetch.spec.whatwg.org/)
- [HTML Living Standard](https://html.spec.whatwg.org/)

### 11.2. Браузерные реализации

#### Chrome/Edge

- [Chrome Platform Status](https://chromestatus.com/)
- [Chrome Releases Blog](https://chromereleases.googleblog.com/)
- [Chromium Blog: ML-KEM](https://blog.chromium.org/2024/05/advancing-our-amazing-bet-on-asymmetric.html)
- [Chrome for Developers: FedCM](https://developer.chrome.com/docs/privacy-sandbox/fedcm/)
- [Chrome for Developers: CHIPS](https://developer.chrome.com/docs/privacy-sandbox/chips/)

#### Firefox

- [Mozilla Security Advisories](https://www.mozilla.org/en-US/security/advisories/)
- [Firefox Release Notes](https://www.mozilla.org/en-US/firefox/releases/)
- [Firefox 134 Release Notes](https://www.mozilla.org/en-US/firefox/134.0/releasenotes/)
- [Firefox 135 Release Notes](https://www.mozilla.org/en-US/firefox/135.0/releasenotes/)
- [Firefox 136 Release Notes](https://www.mozilla.org/en-US/firefox/136.0/releasenotes/)

#### Safari/WebKit

- [WebKit Blog](https://webkit.org/blog/)
- [WebKit Features in Safari 18.0](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/)
- [WebKit Features in Safari 18.2](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/)
- [Safari 18.4 Release Notes](https://developer.apple.com/documentation/safari-release-notes/safari-18_4-release-notes)

### 11.3. Организации и сообщества

#### FIDO Alliance

- [FIDO Alliance Homepage](https://fidoalliance.org/)
- [World Passkey Day 2025](https://fidoalliance.org/fido-alliance-champions-widespread-passkey-adoption-and-a-passwordless-future-on-world-passkey-day-2025/)
- [FIDO2 Specifications](https://fidoalliance.org/specifications/)

#### IANA

- [COSE Registry](https://www.iana.org/assignments/cose/cose.xhtml)
- [TLS Parameters](https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml)

### 11.4. Технические статьи и анализ

#### Постквантовая криптография

- [Chrome switching to ML-KEM - BleepingComputer](https://www.bleepingcomputer.com/news/security/chrome-switching-to-nist-approved-ml-kem-quantum-encryption/)
- [Quantum Hybrid TLS in Browsers](https://www.intelligentliving.co/quantum-hybrid-tls-ml-kem-browser/)
- [Passkeys and FIDO2 Quantum-Safe](https://www.wultra.com/blog/passkeys-and-fido2-quietly-became-quantum-safe-heres-what-changed)

#### WebAuthn и Passkeys

- [Corbado: Passkeys PRF](https://www.corbado.com/blog/passkeys-prf-webauthn)
- [Corbado: iOS 18 Passkeys](https://www.corbado.com/blog/ios-18-passkeys-automatic-passkey-upgrades)
- [MDN: Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

#### Privacy и Cookies

- [Google Privacy Sandbox](https://privacysandbox.com/)
- [MDN: Partitioned Cookies](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies)
- [Detecting Third-Party Cookie Blocking 2025](https://www.smashingmagazine.com/2025/05/reliably-detecting-third-party-cookie-blocking-2025/)

#### Security

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [MDN: Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [Trusted Types Overview](https://web.dev/articles/trusted-types)
- [Mixed Content Level 2](https://www.w3.org/TR/mixed-content/)

### 11.5. Инструменты и мониторинг

- [Can I Use](https://caniuse.com/)
- [Web Platform Baseline](https://web.dev/baseline)
- [MDN Browser Compatibility Data](https://github.com/mdn/browser-compat-data)
- [Cloudflare Radar](https://radar.cloudflare.com/)
- [HTTP Archive](https://httparchive.org/)

---

- **Дата создания отчёта**: 19.11.2025
- **Research ID**: `frontend-baseline-2023-2025`
- **Автор**: DeepResearch Agent
- **Связанные отчёты**: [HTML 2023](../2023/html.md), [CSS 2023](../2023/css.md),
  [JavaScript 2023](../2023/javascript.md)
