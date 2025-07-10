import markdownIt from "markdown-it";
import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { DateTime } from "luxon";
import pluginFilters from "./_config/filters.js";

// 🔧 Wikilink + image support
const wikilinkPlugin = (md) => {
  const wikiPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const imagePattern = /^!\[\[(.*?)\]\]$/;

  md.core.ruler.push("wikilinks_and_images", (state) => {
    state.tokens.forEach((block) => {
      if (block.type === "inline" && block.children) {
        block.children.forEach((token) => {
          if (token.type === "text") {
            // Image: ![[file.jpg]]
            const match = token.content.match(imagePattern);
            if (match) {
            const img = match[1].trim().replace(/\s+/g, '%20');
            token.type = "html_inline";
            token.content = `<img src="${img}" alt="${img}" />`;
            return;

            }

            // Link: [[Page]] or [[Page|Label]]
            if (wikiPattern.test(token.content)) {
              token.type = "html_inline";
              token.content = token.content.replace(wikiPattern, (_, target, label) => {
                  const slug = target.trim().replace(/\s+/g, '%20');
                  const currentFolder = (state.env.page?.filePathStem || '')
                    .replace(/^.*\/articles\//, '')
                    .replace(/\/[^\/]*$/, '');

                  const url = `/articles/${currentFolder}/${slug}/`;
                  const text = label || target;
                  return `<a href="${url}">${text}</a>`;
              });
            }
          }
        });
      }
    });
  });
};

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  const mdLib = markdownIt({
    html: true,
  typography: false
}).use(wikilinkPlugin);
  eleventyConfig.setLibrary("md", mdLib);

  // Reading time
  const readingTime = (await import("eleventy-plugin-reading-time")).default;
  eleventyConfig.addPlugin(readingTime, { wordPerMinute: 200 });

  // AU date formatting
  eleventyConfig.addGlobalData("eleventyComputed", {
    date: data => data?.page?.date,
  });
  eleventyConfig.addFilter("auDate", (value, format = "d LLL yyyy") =>
    DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format)
  );

  // Draft filter
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  // Collections
  eleventyConfig.addCollection("posts", (api) => {
    return api.getFilteredByGlob("content/articles/**/*.md");
  });

  // File watching
  eleventyConfig.addWatchTarget("css/**/*.css");
  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

  // Static passthrough
  eleventyConfig.addPassthroughCopy("content/imgs");
  eleventyConfig.addPassthroughCopy("content/articles/**/*.{jpg,jpeg,png,webp,gif,svg}");


  // CSS/JS bundling
  eleventyConfig.addBundle("css", { toFileDirectory: "dist", bundleHtmlContentFromSelector: "style" });
  eleventyConfig.addBundle("js", { toFileDirectory: "dist", bundleHtmlContentFromSelector: "script" });

  // Plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "auto"],
    failOnError: false,
    htmlOptions: { imgAttributes: { loading: "lazy", decoding: "async" } },
    sharpOptions: { animated: true },
  });
  eleventyConfig.addPlugin(pluginFilters);
  eleventyConfig.addPlugin(IdAttributePlugin);

  // Shortcodes
  eleventyConfig.addShortcode("currentBuildDate", () => new Date().toISOString());
  eleventyConfig.addShortcode("quip", text =>
    `<span class="quip-wrapper" tabindex="0">^<span class="quip-tooltip">${text}</span></span>`.trim()
  );
  eleventyConfig.addShortcode("lucide", name =>
    `<i data-lucide="${name}"></i>`
  );
}

export const config = {
  templateFormats: ["md", "njk", "html", "liquid", "11ty.js"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "content",
    includes: "../_includes",
    data: "../_data",
    output: "_site",
  },
  pathPrefix: "/sandbox",
};
