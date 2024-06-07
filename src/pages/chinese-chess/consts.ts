import { Pieces } from './components/chess-piece';

export const directions = [
  { x: -1, y: 0 }, // 左
  { x: 1, y: 0 }, // 右
  { x: 0, y: -1 }, // 上
  { x: 0, y: 1 }, // 下
];

export const directio = [
  { x: -1, y: 1 }, // 左下
  { x: -1, y: -1 }, // 左上
  { x: 1, y: 1 }, // 右下
  { x: 1, y: -1 }, // 右上
];

export const defaultChess: Pieces[] = [
  {
    x: 0,
    y: 0,
    type: 0,
    color: 'red',
  },
  {
    x: 1,
    y: 0,
    type: 1,
    color: 'red',
  },
  {
    x: 2,
    y: 0,
    type: 2,
    color: 'red',
  },
  {
    x: 3,
    y: 0,
    type: 3,
    color: 'red',
  },
  {
    x: 4,
    y: 0,
    type: 4,
    color: 'red',
  },
  {
    x: 5,
    y: 0,
    type: 3,
    color: 'red',
  },
  {
    x: 6,
    y: 0,
    type: 2,
    color: 'red',
  },
  {
    x: 7,
    y: 0,
    type: 1,
    color: 'red',
  },
  {
    x: 8,
    y: 0,
    type: 0,
    color: 'red',
  },
  {
    x: 1,
    y: 2,
    type: 5,
    color: 'red',
  },
  {
    x: 7,
    y: 2,
    type: 5,
    color: 'red',
  },
  {
    x: 0,
    y: 3,
    type: 6,
    color: 'red',
  },
  {
    x: 2,
    y: 3,
    type: 6,
    color: 'red',
  },
  {
    x: 4,
    y: 3,
    type: 6,
    color: 'red',
  },
  {
    x: 6,
    y: 3,
    type: 6,
    color: 'red',
  },
  {
    x: 8,
    y: 3,
    type: 6,
    color: 'red',
  },
];
