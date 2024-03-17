const hljs = require("highlight.js/lib/common");

languages = {
  py: "python",
  js: "javascript",
  cs: "csharp",
  css: "css",
  java: "java",
  sql: "sql",
  scss: "scss",
  cpp: "cpp",
};

function syntaxHighlight(code, fileExtension) {
  return languages.hasOwnProperty(fileExtension)
    ? hljs.highlight(code, { language: languages[fileExtension] }).value
    : hljs.highlightAuto(code).value;
}

module.exports = syntaxHighlight;
