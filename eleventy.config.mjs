import {IdAttributePlugin} from "@11ty/eleventy";
import {eleventyImageTransformPlugin} from "@11ty/eleventy-img";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

import esbuild from "esbuild";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
    eleventyConfig.setInputDirectory("research");
    eleventyConfig.setLayoutsDirectory("../.eleventy/_layouts");
    eleventyConfig.setTemplateFormats(["md", "html", "njk"]);
    eleventyConfig.setDataFileBaseName("config");

    eleventyConfig.addGlobalData("layout", "base");


    eleventyConfig.addPassthroughCopy({
        "../.eleventy/_public/": "/",
        "node_modules/prismjs/themes/prism.css": "/prism.css",
    });

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(IdAttributePlugin);

    addEsbuildBundler(eleventyConfig);
    addReadmeAsIndex(eleventyConfig);
    addImagePlugin(eleventyConfig);
    addJsBundlePlugin(eleventyConfig);

};


/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
function addEsbuildBundler(eleventyConfig) {
    const assetsPath = '.eleventy/_assets';
    const outputPath = '_site';

    eleventyConfig.addNunjucksAsyncShortcode("prismjs", async function () {
        await esbuild.build({
            entryPoints: [`${assetsPath}/prismjs/index.mjs`],
            bundle: true,
            minify: true,
            sourcemap: false,
            outfile: `${outputPath}/prism.js`,
            external: [],
            treeShaking: true,
            target: ["es2020"]
        });
        return '/prism.js';
    });
    eleventyConfig.addWatchTarget("../.eleventy/_assets/");
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
        formats: ["png", "webp", "jpeg", "svg"], widths: ["auto"], htmlOptions: {
            imgAttributes: {
                loading: "lazy", decoding: "async",
            }, pictureAttributes: {}
        }, sharpOptions: {
            animated: true,
        },
    });
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
function addJsBundlePlugin(eleventyConfig) {
    eleventyConfig.addWatchTarget("../.eleventy/_js/**/*.js");
    eleventyConfig.addBundle("js");
}
