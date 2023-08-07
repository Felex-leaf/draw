module.exports = {
  extends: [
    './rules/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-airbnb',
    './rules/es',
    './rules/import',
    './rules/jsx-a11y',
    './rules/react',
    './rules/typescript',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'error', // console禁止提交
    'react-hooks/exhaustive-deps': 'off', // 不检查useEffect的依赖
    'react/require-default-props': 'off', // 非必传的参数不强制给默认值
    'react/no-unused-prop-types': 'off', // 可以出现未使用的props
    'prettier/prettier': 'off', // 关闭prettier，在commit阶段最后会执行 prettier:fix
    'react/react-in-jsx-scope': 'off', // 忽略引入react
  },
};
