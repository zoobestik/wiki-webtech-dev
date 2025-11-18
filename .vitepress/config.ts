import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

export default withMermaid(
    defineConfig({
        srcDir: 'research/',
        outDir: './dist',
        base: '/wiki-webtech-dev/',

        srcExclude: ['**/tmp/**'],

        title: 'Research Hub',
        description: 'Коллекция глубоких исследований по frontend-разработке и веб-технологиям',

        themeConfig: {
            nav: [
                { text: 'Research Hub', link: '/' },
                {
                    text: 'Результаты',
                    items: [
                        {
                            text: 'Frontend Baseline 2018-2022',
                            link: '/frontend-baseline-2018-2022/',
                        },
                    ],
                },
            ],

            sidebar: {
                '/': [
                    {
                        text: 'Фундаментальный Web',
                        items: [
                            {
                                text: 'Frontend Baseline 2018-2022',
                                link: '/frontend-baseline-2018-2022/',
                            },
                        ],
                    },
                ],
                '/frontend-baseline-2018-2022/': [
                    {
                        text: 'Frontend Baseline 2018-2022',
                        link: '/frontend-baseline-2018-2022/',
                        items: [
                            {
                                text: 'Final Report',
                                link: '/frontend-baseline-2018-2022/knowledge/final-report',
                            },
                        ],
                    },
                    {
                        text: 'Технологии',
                        items: [
                            {
                                text: 'HTML изменения',
                                link: '/frontend-baseline-2018-2022/knowledge/html-changes',
                            },
                            {
                                text: 'CSS изменения',
                                link: '/frontend-baseline-2018-2022/knowledge/css-changes',
                            },
                            {
                                text: 'JavaScript & Web APIs',
                                link: '/frontend-baseline-2018-2022/knowledge/javascript-webapis-summary',
                            },
                        ],
                    },
                    {
                        text: 'Методология',
                        items: [
                            {
                                text: 'Scope исследования',
                                link: '/frontend-baseline-2018-2022/knowledge/scope',
                            },
                            {
                                text: 'Timeline браузеров',
                                link: '/frontend-baseline-2018-2022/knowledge/browser-timeline',
                            },
                            {
                                text: 'План исследования',
                                link: '/frontend-baseline-2018-2022/plan',
                            },
                        ],
                    },
                ],
            },

            socialLinks: [
                { icon: 'github', link: 'https://github.com/zoobestik/wiki-webtech-dev' },
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
