const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy({ "src/Daniel_Chigbu_CV.pdf": "Daniel_Chigbu_CV.pdf" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  eleventyConfig.addWatchTarget("src/assets/css");
  eleventyConfig.addWatchTarget("src/assets/js");

  eleventyConfig.addFilter("postDate", (d) =>
    DateTime.fromJSDate(d, { zone: "utc" }).toFormat("dd LLL yyyy").toUpperCase()
  );

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} MIN READ`;
  });

  eleventyConfig.addFilter("logNumber", (allPosts, post) => {
    const chron = [...allPosts].sort((a, b) => a.date - b.date);
    const idx = chron.findIndex((p) => p.url === post.url) + 1;
    return String(idx).padStart(3, "0");
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
