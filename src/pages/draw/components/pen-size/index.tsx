import { SelectBtnList, SelectBtnListOption, SelectBtnListProps } from '@/components';
import { useEffect, useState } from 'react';

import './index.less';

interface PenSizeProps {
  value?: number | string; // 当前选中的笔画大小
  size?: number[]; // 可选的笔画大小数组
  onChange?: (v?: number) => void; // 选中笔画大小变化时的回调函数
}

const classPrefix = 'pen-size';
 
export default function PenSize({ value: outValue, size = [6, 10, 14, 18, 22], onChange }: PenSizeProps) {
  const [value, setValue] = useState<number | string>();

   // 将 size 数组转换为 SelectBtnListOption 数组
  const options = size.map((item) => {
    const btn: SelectBtnListOption = {
      style: {
        height: item,
        width: item,
      },
      value: item,
    };
    return btn;
  });

  // 定义 handleChange 函数，处理选中值变化
  const handleChange: SelectBtnListProps['onChange'] = (v) => {
    const val = Number(v);
    setValue(val);
    onChange?.(val);
  }

  // 使用 useEffect 监听外部传入的 value 变化，同步更新内部状态 value
  useEffect(() => {
    if (outValue !== value) {
      setValue(outValue);
    }
  }, [outValue]);

  return (
    <div className={classPrefix}>
      <SelectBtnList
        onChange={handleChange}
        options={options}
        btnProps={{
          shape: 'circle',
        }}
        value={value}
      />
    </div>
  );
}
