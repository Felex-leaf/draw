module.exports = {
  rules: {
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off', // Non-interactive元素不应分配鼠标或键盘事件侦听器
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'off', // 点击事件必须有对应的键盘快捷键
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/accessible-emoji': 'off', // ©️ 被判定为 emoji ，强制要求写成 <span role="img" aria-label="xxx"></span> 形式成本较高
  },
};
