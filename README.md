# Research Hub по веб‑технологиям

Читать онлайн: https://zoobestik.github.io/wiki-webtech-dev/

Публикация исследовательских материалов по frontend‑разработке и базовым веб‑технологиям.

## Быстрые ссылки

- Frontend 2018–2022
    - [Онлайн](https://zoobestik.github.io/wiki-webtech-dev/frontend-baseline-2018-2022/)
    - [GitHub (Markdown)](https://github.com/zoobestik/wiki-webtech-dev/tree/main/research/frontend-baseline-2018-2022/index.md)
- Список исследований
  ([GitHub](https://github.com/zoobestik/wiki-webtech-dev/blob/main/research/index.md))

## Немного технички: как собирать

### Веб‑сайт (VitePress)

1. Локальная разработка:
    ```bash
    bun docs:dev
    ```
2. Продакшен‑сборка в `./dist`:
    ```bash
    bun docs:build
    ```
3. Предпросмотр билда:
    ```bash
    bun docs:preview
    ```

CI/CD: деплой на GitHub Pages настроен через GitHub Actions (`.github/workflows/deploy.yml`).
Базовый путь сайта: `/wiki-webtech-dev/`.
