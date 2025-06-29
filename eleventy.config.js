import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { DateTime } from "luxon";
import pluginFilters from "./_config/filters.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
  // ✅ Reading time plugin (load early, before computed merge)
  const readingTime = (await import("eleventy-plugin-reading-time")).default;
  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addPlugin(readingTime, {
    wordPerMinute: 200
  });

  eleventyConfig.addGlobalData("eleventyComputed", {
    date: data => data?.page?.date,
  });

  // ✅ Custom filter to format dates in AU style
  eleventyConfig.addFilter("auDate", (value, format = "d LLL yyyy") => {
    return DateTime.fromJSDate(value, { zone: "utc" }).toFormat(format);
  });

  // Draft filtering
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // Articles collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("content/articles/**/*.md");
    console.log("Posts found:", posts.map(p => p.inputPath));
    return posts;
  });

  // Watch CSS and image content
  eleventyConfig.addWatchTarget("css/**/*.css");
  eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

  // Copy static image assets to output
  eleventyConfig.addPassthroughCopy("content/imgs");

  // CSS bundle
  eleventyConfig.addBundle("css", {
    toFileDirectory: "dist",
    bundleHtmlContentFromSelector: "style",
  });

  // JS bundle
  eleventyConfig.addBundle("js", {
    toFileDirectory: "dist",
    bundleHtmlContentFromSelector: "script",
  });

  // Plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "auto"],
    failOnError: false,
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    },
    sharpOptions: {
      animated: true,
    },
  });

  // Custom filters plugin
  eleventyConfig.addPlugin(pluginFilters);

  // Anchor ID plugin
  eleventyConfig.addPlugin(IdAttributePlugin);

  // Shortcodes
  eleventyConfig.addShortcode("currentBuildDate", () => {
    return new Date().toISOString();
  });

  eleventyConfig.addShortcode("quip", function(text) {
  return `<span class="quip-wrapper" tabindex="0">
  ^<span class="quip-tooltip">${text}</span></span>`
  .trim();
  });
  eleventyConfig.addShortcode("lucide", function(name) {
  return `<i data-lucide="${name}"></i>`;
  });


}

export const config = {
  templateFormats: [
    "md",
    "njk",
    "html",
    "liquid",
    "11ty.js",
  ],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: "content",
    includes: "../_includes",
    data: "../_data",
    output: "_site",
  },
  pathPrefix: "/sandbox", // 
};
