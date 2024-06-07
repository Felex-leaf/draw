import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useCreation } from 'ahooks';
import { mixinClassPrefix } from '@/utils';
import ChineseChessPiece, { pieceMap, Pieces, Position } from '../chess-piece';
import { defaultChess } from '../../consts';

import './index.less';

const classPrefix = 'checkerboard';
const addPrefix = mixinClassPrefix(classPrefix);

interface CheckerboardProps {
  pieces: Pieces[];
}

const defaultCheckerboard = Array(10).fill(0).map((item, i) => Array(9).fill(0).map((it, idx) => ({ x: idx, y: i, boardColor: i <= 4 ? 'red' : 'black' })));

export default function Checkerboard({ pieces }: CheckerboardProps) {
  const [select, setSelect] = useState<Pieces>();
  const [currentActions, setCurrentActions] = useState<Position[]>();
  const board: Pieces[][] = useCreation(() => {
    const b: Position[][] = cloneDeep(defaultCheckerboard);
    defaultChess.forEach((item) => {
      b[item.y][item.x] = {
        ...b[item.y][item.x],
        ...item,
      };
    });
    return b;
  }, []);
  const { x: sx, y: sy, type: sType, color: sColor } = select || {};

  const clearSelect = () => {
    setSelect(undefined);
    setCurrentActions(undefined);
  };

  const onClick = (it: Pieces, moveable: boolean, hasPiece: boolean) => {
    const { type, x, y } = it || {};
    if (select && moveable && !hasPiece) {
      board[sy][sx] = {
        ...select,
        x: sx,
        y: sy,
        color: undefined,
        type: undefined,
      };
      board[y][x] = {
        ...it,
        type: sType,
        color: sColor,
      };
    }
    if (typeof type === 'number') {
      setSelect(it);
      setCurrentActions(pieceMap?.[type]?.movable(it, board));
    } else clearSelect();
  };

  const renderBoard = () => {
    const b = [];
    board.forEach((item, i) => {
      const row = [];
      item.forEach((it, j) => {
        const { type, color } = it || {};
        const hasPiece = typeof type === 'number';
        const moveable = currentActions?.some(({ x, y }) => it.x === x && it.y === y);
        row.push(
          <div
            className={j === 8 || i === 9 ? addPrefix('hide') : addPrefix('show')}
            key={`${i}-${j}`}
            onClick={() => onClick(it, moveable, hasPiece)}
          >
            {!hasPiece && moveable && <div>moveable</div>}
            {hasPiece && <ChineseChessPiece className={addPrefix('trigger')} select={sx === i && sy === j} type={type} color={color} />}
            <div data-x={i} data-y={j} className={addPrefix('trigger')} />
          </div>,
        );
      });
      b.push(
        <div key={i} className={addPrefix('row')}>
          {row}
        </div>,
      );
    });
    return b;
  };

  return <div className={classPrefix}>{renderBoard()}</div>;
}
