module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier-scss",
    "stylelint-config-recess-order",
  ],
  ignoreFiles: [".git/**", "dist/**", "**/node_modules/**"],
  plugins: ["stylelint-scss", "stylelint-order"],
  rules: {
    "comment-no-empty": null,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "rule-empty-line-before": ["always", { except: ["first-nested"] }],
    "no-descending-specificity": null,
    "color-hex-length": "long",
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["after-same-name", "first-nested"],
        ignore: ["after-comment", "before-comment"],
        ignoreAtRules: ["mixin", "function"],
      },
    ],
    "scss/at-use-no-unnamespaced": true,
    "scss/double-slash-comment-whitespace-inside": null,
    "scss/double-slash-comment-empty-line-before": null,
    "scss/comment-no-empty": null,
  },
};
