import { BtnProps, ButtonList } from '@/components';
import { useState } from 'react';

import './index.less';

interface PenSizeProps {
  value?: number;
  onChange?: (v?: number) => void;
}

const classPrefix = 'pen-size';
 
export default function PenSize({ value: outValue, onChange }: PenSizeProps) {
  const [value, setValue] = useState(outValue);

  const v = outValue ?? value;

  const btnList = [6, 10, 14, 18, 22].map((item) => {
    const btn: BtnProps = {
      text: '',
      shape: 'circle',
      type: v === item ? 'primary' : undefined,
      style: {
        height: item,
        width: item,
      },
      onClick: () => {
        setValue(item);
        onChange?.(item);
      },
    };
    return btn;
  });

  return (
    <div className={classPrefix}>
      <ButtonList btnList={btnList} />
    </div>
  );
}
