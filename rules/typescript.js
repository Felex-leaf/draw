module.exports = {
  plugins: ['@typescript-eslint'],
  rules: {
    'no-undef': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    semi: 'off',
    'babel/semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],

    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',

    // 禁止使用超出 js 精度范围的数字
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',

    '@typescript-eslint/prefer-for-of': 'off',

    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],

    // 重载必须是连贯的, 重写第三方库函数时，可以行内忽略
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    // 数组类型定义语法约束为 T[] 或 Array<T>  (off 两种并没有绝对性的优劣，暂时保持关闭)
    '@typescript-eslint/array-type': 'off',
    // 禁止使用 // @ts-ignore // @ts-nocheck // @ts-check （off 允许项目中行业忽略ts）
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'variable',
        format: null,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public',
      },
    ],
    '@typescript-eslint/member-delimiter-style': 'error', // 接口和类型字面量中每一行都必须以分号结尾
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // 禁止将 class 仅当作 namespace 使用 （off 使用其他的语法实现对应的功能）
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-inferrable-types': 'error',
    // 禁止不合理的使用 new （error 有利于发现new 使用不合理的方式错误）
    '@typescript-eslint/no-misused-new': 'error',
    // 禁止使用namespace (off 在ts声明文件d.ts 和 declare语句中允许使用)
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowTernary: true, allowShortCircuit: true },
    ],

    indent: ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/indent': 'off', // 改为由 prettier接管
    // 禁止使用 non-null 断言 （off 虽然违背了开启严格的 null-checking 的初衷，但是部分情况下确实会需要这样处理）
    // example foo.bar!.includes('baz');  -> foo.bar?.includes('baz');
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 禁止在给构造函数的参数添加修饰符 (off 没必要限制)
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-require-imports': 'off',
    // 禁止将 this 赋值给其他变量  (off 使用 箭头函数 或 bind 方法实现上下文的绑定)
    '@typescript-eslint/no-this-alias': 'error',
    // 限制 type 的使用  (off 没必要限制)
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off', // 在仍然存在这种模块引用语法习惯，尤其是 node 场景下，没必要过于限制
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/promise-function-async': 'off', // 统一为async函数，关闭，过于严格
    // 要求 + 运算符的运算元素必须同为 number 或 同为 string 类型
    // @error string 拼装目前要求使用字符串模板，因此 + 运算两侧同时要求是 number 类型是合理的，可以避免出错
    '@typescript-eslint/restrict-plus-operands': 'off',
    // 类型定义的冒号前后是否需要空格
    // 默认冒号前必须没有空格，冒号后必须有空格
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unified-signatures': 'error', // ts类型重载可以合并使用 联合操作符
    '@typescript-eslint/no-empty-function': 'off', // 存在部分场景需要使用空函数的情况

    // lint ignore
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-for-in-array': 'off',
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 不允许使用显示的any 关闭, 开启后可以配合 strict 模式进展双重约束
    '@typescript-eslint/no-unsafe-argument': 'off', // 对参数类型开启严格校验
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error', // ?.后不能使用非空断言
    '@typescript-eslint/prefer-optional-chain': 'warn', // 建议使用?.而不是链式逻辑判断
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'no-undef': 'error',
        '@typescript-eslint/no-unsafe-argument': 'off',
      },
    },
  ],
};
