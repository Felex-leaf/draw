module.exports = {
  plugins: ['babel'],
  rules: {
    'linebreak-style': ['error', 'unix'], // 换行方式 unix为 \n  windows为 \r\n
    'func-names': ['error', 'as-needed'], // 除了极个别场景下 非箭头函数都需要增加函数名称来提升代码可读性
    'prefer-arrow-callback': 'warn', // 推荐回调函数使用箭头函数 否则显示警告
    'no-param-reassign': 'off', // 不禁止对函数的参数重新赋值
    'max-len': 'off', // 不检测行最大位置 由项目自行决定
    'no-unused-vars': [
      // 未使用的变量报错
      'error',
      {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'global-require': 'off', // 允许在函数体和条件语句中使用require，所以禁用这条规则
    'no-console': [
      'warn',
      {
        allow: ['debug', 'info', 'warn', 'error'],
      },
    ],
    'no-bitwise': [
      'error',
      {
        allow: ['~'],
      },
    ],
    'no-underscore-dangle': 'off', // 允许 __variable__ 变量形式的存在  故关闭
    'arrow-body-style': 'off', // 不对箭头函数返回体的形式做过多的限制 允许return格式和小括号形式的存在
    'default-case': ['warn'], // 当 switch case语句不存在default判断时，警告提示
    // 函数也需要多行尾逗号
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    eqeqeq: [
      // 强制使用全等 防止隐士类型转换
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
      },
    ],
    'no-trailing-spaces': ['error'], // 语句后需要存在空格 不能连续
    'object-curly-newline': [
      'error',
      {
        multiline: true,
        consistent: true,
      },
    ],
    // 使用 babel/semi，实例属性需要加分号
    semi: 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    camelcase: [
      'error',
      {
        ignoreDestructuring: true,
        allow: ['^UNSAFE_'],
      },
    ],
    'no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }], // 允许三元运算和短路运算符
    'babel/semi': ['error', 'always'],
    // 强制三元运算符格式
    // 'multiline-ternary': ['error', 'always-multiline'],
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 0,
    'eol-last': ['error', 'always'], // 尾空行
    'class-methods-use-this': 'off', // 类的实例方法可以不用 this
    'function-paren-newline': 'off',
    'no-restricted-syntax': 'off', // 禁止使用指定的语法
    // 和 airbnb-base 相比，关闭对 Math.pow 的使用限制
    'no-restricted-properties': [
      'error',
      {
        object: 'arguments',
        property: 'callee',
        message: 'arguments.callee is deprecated',
      },
      {
        object: 'global',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'self',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'window',
        property: 'isFinite',
        message: 'Please use Number.isFinite instead',
      },
      {
        object: 'global',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'self',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        object: 'window',
        property: 'isNaN',
        message: 'Please use Number.isNaN instead',
      },
      {
        property: '__defineGetter__',
        message: 'Please use Object.defineProperty instead.',
      },
      {
        property: '__defineSetter__',
        message: 'Please use Object.defineProperty instead.',
      },
    ],
    // 'multiline-ternary': 'off', // prettier控制
    // 'newline-per-chained-call': 'off', // prettier控制
    // 'no-arrow-condition': 'off', // prettier控制
    'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }], // 增加?.安全检查
  },
};
