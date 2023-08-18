// 确保所有模版中1的总和为3的倍数

import { calculateTemplateElements } from './utils';

/**
 * 奇数模版
 * template 行列需为奇数
 */
export const TEMPLATE_ODD = calculateTemplateElements([
  {
    template: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
  },
  {
    template: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
    ],
  },
]);

/**
 * 偶数模版
 * template 行列需为偶数
 */
export const TEMPLATE_EVEN = calculateTemplateElements([
  {
    template: [
      [0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 0, 0],
    ],
  },
  {
    template: [
      [0, 1, 0, 0, 1, 0],
      [1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1],
      [0, 1, 0, 0, 1, 0],
    ],
  },
]);
