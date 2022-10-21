async function markdown(markdown) {
  const { unified } = await import("unified");
  const { default: parse } = await import("remark-parse");
  const { default: html } = await import("remark-html");
  const { default: directive } = await import("remark-directive");
  const { visit } = await import("unist-util-visit");
  function replaceWithLiquid() {
    return (tree) => {
      visit(tree, (node) => {
        if (node.type === "textDirective") {
          node.type = "text";
          node.value = '{{ "Hello, World." }}';
        }
      });
    };
  }

  const output = await unified()
    .use(parse)
    .use(directive)
    .use(replaceWithLiquid)
    .use(html)
    .process(markdown);

  return String(output);
}
module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", {
    render: (content) => markdown(content),
  });
};
