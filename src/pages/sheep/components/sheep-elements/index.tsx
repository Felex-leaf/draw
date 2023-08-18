import classNames from 'classnames';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { mixinClassPrefix } from '@/utils';

import './index.less';

const classPrefix = 'sheep-elements';
const addPrefix = mixinClassPrefix(classPrefix);

interface SheepElementsProps {
  onFail: () => void;
  onSuccess: () => void;
}

export interface SheepElementsRef {
  add: (type: number) => void;
  clear: () => void;
}

const removeAdjacentTriples = (arr: number[]): number[] => {
  const newArr = [...arr];
  for (let i = 0; i < newArr.length - 2; i++) {
    if (newArr[i] === newArr[i + 1] && newArr[i] === newArr[i + 2]) {
      newArr.splice(i, 3);
      i = -1; // 重置 i 以重新检查数组
    }
  }
  return newArr;
};

function SheepElements({ onFail, onSuccess }: SheepElementsProps, ref: ForwardedRef<SheepElementsRef>) {
  const [elements, setElements] = useState<number[]>([]);

  const add: SheepElementsRef['add'] = (type) => {
    const newElements = [...elements, type];
    const updatedElements = removeAdjacentTriples(newElements);
    setElements(updatedElements);
    if (updatedElements?.length === 9) {
      onFail?.();
    }
    setTimeout(() => {
      if (!document.querySelector('.sheep-grid-full')) onSuccess?.();
    });
  };

  const clear = () => setElements([]);

  useImperativeHandle(
    ref,
    () => ({
      add,
      clear,
    }),
  );

  return (
    <div className={classPrefix}>
      {elements.map((type, i) => (
        <div
          key={i}
          className={classNames(['sheep-grid-col'], addPrefix('item'))}
        >
          {type}
        </div>
      ))}
    </div>
  );
}

export default forwardRef(SheepElements);
