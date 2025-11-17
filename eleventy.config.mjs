import {IdAttributePlugin, } from "@11ty/eleventy";
import {eleventyImageTransformPlugin} from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

// import esbuild from "esbuild";
import {createHighlighter} from 'shiki';

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
    eleventyConfig.setInputDirectory("research");
    eleventyConfig.setLayoutsDirectory("../.eleventy/_layouts");
    eleventyConfig.setTemplateFormats(["md", "njk"]);
    eleventyConfig.setDataFileBaseName("config");

    eleventyConfig.addGlobalData("layout", "base");


    eleventyConfig.addPassthroughCopy({
        "../.eleventy/_public/": "/",
        "node_modules/prismjs/themes/prism.css": "/prism.css",
    });

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(IdAttributePlugin);
    eleventyConfig.addPlugin(shikiPlugin);

    addReadmeAsIndex(eleventyConfig);
    addImagePlugin(eleventyConfig);

    // addEsbuildBundler(eleventyConfig);
    // addJsBundlePlugin(eleventyConfig);
};
//
// /** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
// function addEsbuildBundler(eleventyConfig) {
//     const assetsPath = '.eleventy/_assets';
//     const outputPath = '_site';
//
//     eleventyConfig.addNunjucksAsyncShortcode("prismjs", async function () {
//         await esbuild.build({
//             entryPoints: [`${assetsPath}/prismjs/index.mjs`],
//             bundle: true,
//             minify: true,
//             sourcemap: false,
//             outfile: `${outputPath}/prism.js`,
//             external: [],
//             treeShaking: true,
//             target: ["es2020"]
//         });
//         return '/prism.js';
//     });
//     eleventyConfig.addWatchTarget("../.eleventy/_assets/");
// }
//
// /** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
// function addJsBundlePlugin(eleventyConfig) {
//     eleventyConfig.addBundle("js");
//     eleventyConfig.addWatchTarget("../.eleventy/_js/**/*.js");
// }

const SHIKI_OPTIONS = Object.freeze({
    themes: ["min-light", "min-dark"],
    langs: ["html", "js", "css", "mermaid", "http"],
});

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
async function shikiPlugin(eleventyConfig) {
    const highlighter = await createHighlighter(SHIKI_OPTIONS);

    eleventyConfig.amendLibrary("md", (library) => {
        library.set({
            highlight: (code, language) => highlighter.codeToHtml(code, {
                lang: language,
                themes: {
                    light: SHIKI_OPTIONS.themes[0],
                    dark: SHIKI_OPTIONS.themes[1],
                },
                defaultColor: 'light-dark()',
            }),
        });
    });
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
function addReadmeAsIndex(eleventyConfig) {
    eleventyConfig.addGlobalData("eleventyComputed", {
        permalink(data) {
            const page = data.page;

            if (!page) return data.permalink;

            const isMarkdown = /\.md$/i.test(page.inputPath || "");
            const isReadme = (page.fileSlug || "").toLowerCase() === "readme";

            if (isMarkdown && isReadme) {
                const stem = (page.filePathStem || "").replace(/\/readme$/i, "");
                return stem ? `${stem}/index.html` : "index.html";
            }

            return data.permalink;
        }
    });
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
function addImagePlugin(eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        formats: ["png", "webp", "jpeg", "svg"],
        sharpOptions: {animated: true},
        htmlOptions: {
            pictureAttributes: {},
            imgAttributes: {loading: "lazy", decoding: "async"},
        },
        widths: ["auto"],
    });
}
