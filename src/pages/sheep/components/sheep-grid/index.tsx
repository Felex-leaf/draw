import { ForwardedRef, forwardRef, MouseEvent, useEffect, useImperativeHandle, useState } from 'react';
import classNames from 'classnames';
import { isEvenNumber, mixinClassPrefix } from '@/utils';
import { TEMPLATE_EVEN, TEMPLATE_ODD } from '../../consts';
import { calculateTemplateElementsTotal, elementsMergeTemplate, TEMPLATE } from '../../utils';

import './index.less';

const classPrefix = 'sheep-grid';
const addPrefix = mixinClassPrefix(classPrefix);

interface Element {
  type: number;
  disable: boolean;
}

interface Grids<T = Element> {
  height?: number;
  width?: number;
  elements: T[][];
}

export interface SheepGridProps {
  onEvent?: (type?: number) => void;
}

export interface SheepGridRef {
  init: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const generateRandomMultipleOfThreeInRange = (count: number, sum: number, min: number, max: number): number[] => {
  const result = [];
  let currentSum = 0;
  for (let i = 0; i < count - 1; i++) {
    let num = Math.floor(Math.random() * (max - min + 1) + min); // 生成指定范围内的随机整数
    num = Math.floor(num / 3) * 3; // 将随机整数转换为3的倍数
    result.push(num);
    currentSum += num;
  }
  result.push(sum - currentSum);
  return result;
};

const generateTpl = (length: number) => {
  const result: TEMPLATE[] = [];
  for (let i = 0; i < length; i++) {
    // 根据 odd 调整 num 为奇数或偶数
    const tpl = Math.floor(Math.random() * (Math.min(TEMPLATE_EVEN.length - 1, TEMPLATE_ODD.length - 1) - 0 + 1)) + 0;
    result.push(isEvenNumber(i) ? TEMPLATE_EVEN[tpl] : TEMPLATE_ODD[tpl]);
  }
  return result;
};

/**
 * 获取指定位置的元素
 * @param d 元素数据
 * @param storey 层数
 * @param row 行数
 * @param col 列数
 * @param isUp 是否向上获取元素，默认为 true
 * @returns 返回一个包含元素位置信息的数组
 */
const getElement = (d: Omit<Grids, 'elements'>[], storey: number, row: number, col: number, isUp = true) => {
  const up = isUp ? d[storey - 1] : d[storey];
  const down = isUp ? d[storey] : d[storey + 1];
  if (!down || !up) return [];
  const { width: upW, height: upH } = up;
  const { width: downW, height: downH } = down;
  const differW = upW - downW;
  const differH = upH - downH;
  const absDifferW = Math.abs(differW);
  const absDifferH = Math.abs(differH);
  let r = row;
  let c = col;
  // 根据高度差调整行数
  if (differH > 0) {
    r = isUp ? r + Math.floor(differH / 2) : r - Math.ceil(absDifferH / 2);
  } else {
    r = isUp ? r - Math.ceil(absDifferH / 2) : r + Math.floor(absDifferH / 2);
  }
  // 根据宽度差调整列数
  if (differW > 0) {
    c = isUp ? c + Math.floor(differW / 2) : c - Math.ceil(absDifferW / 2);
  } else {
    c = isUp ? c - Math.ceil(absDifferH / 2) : c + Math.floor(absDifferW / 2);
  }

  // 上下两层奇偶性一致
  if ((isEvenNumber(upW) && isEvenNumber(downW)) || (!isEvenNumber(upW) && !isEvenNumber(downW))) {
    return [{
      row: r,
      col: c,
    }];
  }

  // 返回包含元素位置信息的数组
  return [{
    row: r,
    col: c,
  }, {
    row: r,
    col: c + 1,
  }, {
    row: r + 1,
    col: c,
  }, {
    row: r + 1,
    col: c + 1,
  }];
};

/** 计算当前的元素是否是禁用
 * @param d 网格数据
 * @param storey 层数
 * @param row 行数
 * @param col 列数
 * @returns 返回布尔值，表示当前元素是否禁用
 */
const calculateDisable = (d: Grids<any>[], storey: number, row: number, col: number) => {
  // 上层元素和区块宽度
  const { elements: upE } = d[storey - 1] || {};
  // 上层覆盖当前元素的元素
  return getElement(d, storey, row, col)?.some(({ row: r, col: c }) => {
    const ele = upE?.[r]?.[c];
    return typeof ele === 'object' ? ele?.type : ele;
  });
};

function SheepGrid({ onEvent }: SheepGridProps, ref: ForwardedRef<SheepGridRef>) {
  const [grids, setGrids] = useState<Grids[]>();
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    // 获取点击的元素
    const element = e?.target as HTMLDivElement;
    // 获取点击元素的行、列和层数信息
    const row = Number(element.dataset.row);
    const col = Number(element.dataset.col);
    const story = Number(element.dataset.story);
    const { elements } = grids?.[story] || {};
    const { type, disable } = elements?.[row]?.[col] || {};
    // 如果元素禁用或类型为0，直接返回
    if (disable || !type) return;
    // 更新当前点击元素的状态
    const newElements = [...elements];
    newElements[row][col] = {
      disable,
      type: 0,
    };
    const newGrids = [...grids];
    newGrids[story].elements = newElements;
    // 获取下层覆盖当前元素的元素
    const downE = getElement(newGrids, story, row, col, false);
    // 更新下层元素的禁用状态
    downE.forEach(({ row: r, col: c }) => {
      if (newGrids?.[story + 1]?.elements?.[r]?.[c]) newGrids[story + 1].elements[r][c].disable = calculateDisable(newGrids, story + 1, r, c);
    });
    setGrids(newGrids);
    onEvent?.(type);
  };

  const init = () => {
    const storey = 10;
    const differ = 1;
    const storeyTypes = generateTpl(storey);
    const elementsTotal = calculateTemplateElementsTotal(storeyTypes);
    const elementsNums = generateRandomMultipleOfThreeInRange(8, elementsTotal, Math.ceil(elementsTotal / 8 - differ), Math.ceil(elementsTotal / 8 + differ));
    const elementsList = shuffleArray(elementsNums.reduce((pre, item, i) => {
      return [...pre, ...Array(item).fill(i + 1)];
    }, []));
    const map = {};
    elementsList.forEach((item) => {
      if (map[item]) map[item] += 1;
      else map[item] = 1;
    });
    const d = storeyTypes.map(({ template }) => {
      return {
        height: template?.length,
        width: template?.[0]?.length,
        elements: elementsMergeTemplate(elementsList, template),
      };
    });
    setGrids(d.map((item, idx) => {
      return {
        ...item,
        elements: item.elements?.map((it, i) => {
          let disable: boolean;
          return it?.map((type, index) => {
            if (idx > 1) disable = true;
            else disable = !idx ? false : calculateDisable(d, idx, i, index);
            return {
              type,
              disable,
            };
          });
        }),
      };
    }));
  };

  useEffect(() => {
    init();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      init,
    }),
  );

  return (
    <div className={classPrefix}>
      <div className={addPrefix('wrap')} onClick={onClick}>
        {grids?.map(({ elements }, index) => (
          // 层
          <div className={addPrefix('storey')} style={{ zIndex: grids.length - index }} key={index}>
            {elements.map((it, idx) => (
              // 行
              <div className={addPrefix('row')} key={idx}>
                {it.map(({ type, disable }, i) => {
                  return (
                    // 列
                    <div
                      key={i}
                      data-row={idx}
                      data-col={i}
                      data-story={index}
                      className={classNames([addPrefix('col'), !type ? addPrefix('empty') : addPrefix('full')], disable && addPrefix('disable'))}
                    >
                      {type || ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default forwardRef(SheepGrid);
