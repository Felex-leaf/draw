module.exports = {
  rules: {
    'import/no-extraneous-dependencies': 'off', // 禁止未列举在package.json中的无关依赖导入 (off 微前端场景下十分常见)
    'import/no-unresolved': 'off', // 忽略掉用到 alias 的检查
    'import/extensions': 'off', // 扩展名称必须强制加上 (off 代码书写习惯)
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'import/no-unused-modules': 'off',
  },
};
