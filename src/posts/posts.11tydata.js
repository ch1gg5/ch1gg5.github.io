// Directory data for src/posts/*.md
//
// Add `draft: true` to a post's front matter to keep it off the site: it gets no
// page and stays out of collections.posts, so it's absent from /blog/ and from
// the homepage feed. Remove the flag to publish it.
//
// Drafts still render while running `npm start`, so they can be previewed
// locally; the production build (`npm run build`, and the GitHub Pages deploy)
// drops them.
const showDrafts = process.env.ELEVENTY_RUN_MODE !== "build";

module.exports = {
  layout: "layouts/post.njk",
  tags: ["posts"],
  eleventyComputed: {
    permalink: (data) =>
      data.draft && !showDrafts ? false : `/blog/${data.page.fileSlug}/`,
    eleventyExcludeFromCollections: (data) => Boolean(data.draft) && !showDrafts,
  },
};
