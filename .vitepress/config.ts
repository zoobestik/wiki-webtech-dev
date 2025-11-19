import { DefaultTheme, defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

const nav: DefaultTheme.NavItem[] = [
    { text: 'Research Hub', link: '/' },
    {
        text: 'Результаты',
        items: [
            {
                text: 'Frontend 2018-2022',
                link: '/frontend-baseline-2018-2022/',
            },
            {
                text: 'Frontend 2023-2025',
                link: '/frontend-baseline-2023-2025/knowledge/2023/',
            },
        ],
    },
];

const MAIN_SIDEBAR: DefaultTheme.SidebarItem[] = [
    {
        text: 'Фундаментальный Web',
        items: [
            {
                text: 'Frontend 2018-2022',
                link: '/frontend-baseline-2018-2022/',
            },
            {
                text: 'Frontend 2023-2025',
                link: '/frontend-baseline-2023-2025/knowledge/2023/',
            },
        ],
    },
] as const;

const FRONTEND_BASELINE_2018_2022_SIDEBAR: DefaultTheme.SidebarItem[] = [
    {
        text: 'Frontend 2018-2022',
        link: '/frontend-baseline-2018-2022/',
        items: [
            {
                text: 'Final Report',
                link: '/frontend-baseline-2018-2022/knowledge/final-report.html',
            },
        ],
    },
    {
        text: 'Технологии',
        items: [
            {
                text: 'HTML изменения',
                link: '/frontend-baseline-2018-2022/knowledge/html-changes.html',
            },
            {
                text: 'CSS изменения',
                link: '/frontend-baseline-2018-2022/knowledge/css-changes.html',
            },
            {
                text: 'JavaScript & Web APIs',
                link: '/frontend-baseline-2018-2022/knowledge/javascript-webapis-summary.html',
            },
        ],
    },
    {
        text: 'Методология',
        items: [
            {
                text: 'Scope исследования',
                link: '/frontend-baseline-2018-2022/knowledge/scope.html',
            },
            {
                text: 'Timeline браузеров',
                link: '/frontend-baseline-2018-2022/knowledge/browser-timeline.html',
            },
            {
                text: 'План исследования',
                link: '/frontend-baseline-2018-2022/plan.html',
            },
        ],
    },
] as const;

const FRONTEND_BASELINE_2023_2025_SIDEBAR: DefaultTheme.SidebarItem[] = [
    {
        text: '2023',
        link: '/frontend-baseline-2023-2025/knowledge/2023/',
        items: [
            { text: 'HTML', link: '/frontend-baseline-2023-2025/knowledge/2023/html.html' },
            { text: 'CSS', link: '/frontend-baseline-2023-2025/knowledge/2023/css.html' },
            {
                text: 'JavaScript & Web APIs',
                link: '/frontend-baseline-2023-2025/knowledge/2023/javascript.html',
            },
            {
                text: 'HTTP и Безопасность',
                link: '/frontend-baseline-2023-2025/knowledge/2023/http-security.html',
            },
        ],
    },
    {
        text: '2024',
        link: '/frontend-baseline-2023-2025/knowledge/2024/',
        items: [
            { text: 'HTML', link: '/frontend-baseline-2023-2025/knowledge/2024/html.html' },
            { text: 'CSS', link: '/frontend-baseline-2023-2025/knowledge/2024/css.html' },
            {
                text: 'JavaScript & Web APIs',
                link: '/frontend-baseline-2023-2025/knowledge/2024/javascript.html',
            },
            {
                text: 'HTTP и Безопасность',
                link: '/frontend-baseline-2023-2025/knowledge/2024/http-security.html',
            },
        ],
    },
    {
        text: '2025',
        link: '/frontend-baseline-2023-2025/knowledge/2025/',
        items: [
            { text: 'HTML', link: '/frontend-baseline-2023-2025/knowledge/2025/html.html' },
            { text: 'CSS', link: '/frontend-baseline-2023-2025/knowledge/2025/css.html' },
            {
                text: 'JavaScript & Web APIs',
                link: '/frontend-baseline-2023-2025/knowledge/2025/javascript.html',
            },
            {
                text: 'HTTP и Безопасность',
                link: '/frontend-baseline-2023-2025/knowledge/2025/http-security.html',
            },
        ],
    },
    {
        text: 'Методология',
        items: [
            {
                text: 'Scope исследования',
                link: '/frontend-baseline-2023-2025/scope.html',
            },
            {
                text: 'Источники данных',
                link: '/frontend-baseline-2023-2025/data-sources.html',
            },
            {
                text: 'Timeline браузеров',
                link: '/frontend-baseline-2023-2025/browser-timeline.html',
            },
            { text: 'План исследования', link: '/frontend-baseline-2023-2025/plan.html' },
        ],
    },
] as const;

export default withMermaid(
    defineConfig({
        srcDir: 'research/',
        outDir: './dist',
        base: '/wiki-webtech-dev/',

        srcExclude: ['**/tmp/**'],

        title: 'Research Hub',
        description: 'Коллекция глубоких исследований по frontend-разработке и веб-технологиям',

        themeConfig: {
            nav,
            sidebar: {
                '/': MAIN_SIDEBAR,
                '/frontend-baseline-2018-2022/': FRONTEND_BASELINE_2018_2022_SIDEBAR,
                '/frontend-baseline-2023-2025/': FRONTEND_BASELINE_2023_2025_SIDEBAR,
            },
            socialLinks: [
                { icon: 'github', link: 'https://github.com/zoobestik/wiki-webtech-dev/' },
            ],
            search: {
                provider: 'local',
            },
            outline: {
                level: [2, 3],
                label: 'На этой странице',
            },
        },
    }),
);
