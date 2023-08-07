module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-less', 'stylelint-config-prettier'],
  rules: {
    // https://github.com/stylelint/stylelint/issues/4114
    'function-url-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null, // iconfont
    // webcomponent
    'selector-type-no-unknown': null,
    // 'scss/at-rule-no-unknown': true,
    // 'at-rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'number-leading-zero': null,
    'selector-pseudo-element-colon-notation': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export'],
      },
    ],
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
