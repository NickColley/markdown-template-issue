module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", {
    render: (content) => `<p>${content.trim()}</p>\n{{ "Hello, world" }}`,
  });
};
