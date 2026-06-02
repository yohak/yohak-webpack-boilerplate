module.exports = {
  plugins: ["@prettier/plugin-pug", "@prettier/plugin-php"],

  semi: true,
  trailingComma: "all",
  singleQuote: false,
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: "ignore",
  tabWidth: 2,
  pugPrintWidth: 9999,
  printWidth: 100,
  phpVersion: "7.4",
  braceStyle: "1tbs",
};
