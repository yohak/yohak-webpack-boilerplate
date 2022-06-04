module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss",
    "stylelint-config-recess-order",
  ],
  ignoreFiles: [".git/**", "dist/**", "**/node_modules/**"],
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "rule-empty-line-before": ["always", { except: ["first-nested"] }],
    "no-descending-specificity": false,
    "color-hex-length": "long",
    "at-rule-empty-line-before": ["always", { except: ["after-same-name", "first-nested"] }],
    "scss/at-use-no-unnamespaced": true,
  },
};
