module.exports = {
  plugins: ['react-hooks'],
  rules: {
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/no-array-index-key': 'warn',
    'react/sort-comp': 'off', // 要求过于严格，带来负担 不做限制
    'react/destructuring-assignment': [
      // 使用结构的方式获取属性，class实例获取除外
      'error',
      'always',
      {
        ignoreClassFields: true,
      },
    ],
    'react/jsx-one-expression-per-line': 'off', // 每行限制一个jsx表达式，过于严格，关闭
    'react/button-has-type': 'off', // 很少去使用button的原生type，存在大量没有type的情况  关闭规则
    'react/jsx-props-no-spreading': 'off', // 强制jsx {...otherProps} 的使用，规则过于严格 关闭
    'react/state-in-constructor': 'off', // 允许在state中定义state
    // 开启限制react中 [childContextTypes, contextTypes, contextType, defaultProps, displayName, propTypes]属性放置的位置
    'react/static-property-placement': 'off',
    // 不建议使用弃用方法
    'react/no-deprecated': 'warn',
    'react/require-default-props': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/no-unknown-property': 'off',
    // 'react/jsx-curly-newline': 'off', // prettier控制
    // 'react/jsx-indent': 'off', // prettier控制
    // 'react/jsx-indent-props': 'off', // prettier控制
    // 'react/jsx-max-props-per-line': 'off', // prettier控制
    // 'react/jsx-wrap-multilines': 'off', // jsx换行无需限制过于严格 prettier控制
    // 'react/jsx-closing-tag-location': 'off', // prettier控制
    // 'react/jsx-first-prop-new-line': 'off', // prettier控制
  },
};
