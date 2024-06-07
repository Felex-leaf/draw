import classNames from 'classnames';
import { differenceWith, isEqual } from 'lodash';

import { mixinClassPrefix } from '@/utils';
import { generateAllCombinations } from '../../utils';
import { directions } from '../../consts';
import './index.less';

const classPrefix = 'chinese-chess-piece';
const addPrefix = mixinClassPrefix(classPrefix);

export interface Position {
  x: number;
  y: number;
}

export interface Pieces extends Position {
  type?: number;
  color?: string;
  boardColor?: string;
}

export interface PieceMapItem {
  name: string;
  actions?: Position[];
  movable: (position: Pieces, board?: Pieces[][]) => Position[];
}

export interface ChineseChessPieceProps {
  type: number;
  color: string;
  className: string;
  select: boolean;
}

export enum PieceValueMap {
  車 = 0,
  马 = 1,
  相 = 2,
  士 = 3,
  将 = 4,
  炮 = 5,
  兵 = 6,
}

export const {
  車,
  马,
  相,
  士,
  将,
  炮,
  兵,
} = PieceValueMap;

const redHome = Array(3).fill(0).reduce((pre, item, i) => {
  Array(3).fill(0).forEach((it, idx) => {
    pre[JSON.stringify(({ x: idx + 3, y: i }))] = true;
  });
  return pre;
}, {});
// const blackHome = Array(3).fill(0).reduce((pre, item, i) => {
//   Array(3).fill(0).forEach((it, idx) => {
//     pre[JSON.stringify(({ x: idx + 3, y: i }))] = true;
//   });
//   return pre;
// }, {});

export const pieceMap: Record<string, PieceMapItem> = ({
  [車]: {
    name: '車',
    movable: ({ x, y }, board) => {
      const movable = [];
      // 记录方向是否有棋子
      const hasPiece = {
        '-10': false,
        10: false,
        '0-1': false,
        '01': false,
      };
      for (let j = 1; j < 10; j++) {
        directions.forEach((item) => {
          const { x: dx, y: dy } = item;
          // 方向上有棋子直接忽视
          if (hasPiece[`${dx}${dy}`]) return;
          const position = {
            // eslint-disable-next-line no-nested-ternary
            x: dx === 0 ? x : dx < 0 ? x - j : x + j,
            // eslint-disable-next-line no-nested-ternary
            y: dy === 0 ? y : dy < 0 ? y - j : y + j,
          };
          const { type } = board?.[position.y]?.[position.x] || {};
          if (typeof type === 'number') hasPiece[`${dx}${dy}`] = true;
          movable.push(position);
        });
      }
      return movable;
    },
  },
  [马]: {
    name: '马',
    actions: generateAllCombinations([1, 2]),
    movable: function horse({ x, y }, board) {
      const immovable = [];
      directions.forEach((item) => {
        const { type, x: pieceX, y: pieceY } = board?.[item.y + y]?.[item.x + x] || {};
        if (typeof type === 'number') {
          const newX = pieceX + item.x;
          const newY = pieceY + item.y;
          immovable.push(!item.x ? {
            x: pieceX + 1,
            y: newY,
          } : {
            x: newX,
            y: pieceY + 1,
          }, !item.x ? {
            x: pieceX - 1,
            y: newY,
          } : {
            x: newX,
            y: pieceY - 1,
          });
        }
      });
      return differenceWith(pieceMap[马].actions.map((item) => ({
        x: item.x + x,
        y: item.y + y,
      })), immovable, isEqual);
    },
  },
  [相]: {
    name: '相',
    actions: generateAllCombinations([2, 2]),
    movable: ({ x, y, color }, board) => {
      const movable = [];
      pieceMap[相].actions.forEach((item) => {
        const position = {
          x: item.x + x,
          y: item.y + y,
        };
        if (board[position?.y]?.[position.x]?.boardColor === color) movable.push(position);
      });
      return movable;
    },
  },
  [士]: {
    name: '士',
    actions: generateAllCombinations([1, 1]),
    movable: (position) => {
      return pieceMap[士].actions.map((item) => ({
        x: item.x + position.x,
        y: item.y + position.y,
      })).filter((item) => redHome[JSON.stringify(item)]);
    },
  },
  [将]: {
    name: '将',
    actions: generateAllCombinations([0, 1]),
    movable: (position) => {
      return pieceMap[将].actions.map((item) => ({
        x: item.x + position.x,
        y: item.y + position.y,
      })).filter((item) => redHome[JSON.stringify(item)]);
    },
  },
  [炮]: {
    name: '炮',
    movable: ({ x, y, color }, board) => {
      const movable = [];
      const hasPiece: Record<string, { first?: Pieces; last?: Pieces }> = {
        '-10': {},
        10: {},
        '0-1': {},
        '01': {},
      };
      for (let j = 1; j < 10; j++) {
        directions.forEach((item) => {
          const { x: dx, y: dy } = item;
          const chess: Partial<Pieces> = board?.[y]?.[x] || {};
          const { first, last } = hasPiece[`${dx}${dy}`] || {};
          const { type } = chess;
          const position = {
            // eslint-disable-next-line no-nested-ternary
            x: dx === 0 ? x : dx < 0 ? x - j : x + j,
            // eslint-disable-next-line no-nested-ternary
            y: dy === 0 ? y : dy < 0 ? y - j : y + j,
          };
          // 方向上有棋子直接忽视
          if (!first) {
            if (typeof type === 'number') hasPiece[`${dx}${dy}`].first = chess as Pieces;
            movable.push(position);
          } else if (!last) {
            if (typeof type === 'number') {
              hasPiece[`${dx}${dy}`].last = chess as Pieces;
              if (color !== chess.color) movable.push(position);
            }
          }
        });
      }
      return movable;
    },
  },
  [兵]: {
    name: '兵',
    actions: generateAllCombinations([0, 1]),
    movable: ({ x, y, color }, board) => {
      return pieceMap[兵].actions.map((item) => ({
        x: item.x + x,
        y: item.y + y,
      })).filter(({ x: ix, y: iy }) => {
        const { boardColor } = board?.[iy]?.[ix] || {};
        if (color !== boardColor && iy >= y) return true;
        if (x === ix && y + 1 === iy) return true;
        return false;
      });
    },
  },
});

export default function ChineseChessPiece({ className, select, color, type }: ChineseChessPieceProps) {
  const pieceColor = color === 'red' ? addPrefix('red') : addPrefix('black');
  const { name } = pieceMap[type] || {};
  return (
    <div className={classNames([classPrefix, pieceColor, className, select && addPrefix('select')])}>
      {name}
    </div>
  );
}
