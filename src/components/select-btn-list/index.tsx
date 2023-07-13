import { MouseEvent, useEffect, useMemo, useState } from "react";
import { BtnProps, ButtonList, ButtonListProps } from "../button-list";


export interface SelectBtnListOption extends Partial<BtnProps> {
  value?: string | number;
}

export interface SelectBtnListProps extends Omit<ButtonListProps, 'btnList'> {
  value?: string | number;
  options: SelectBtnListOption[];
  btnProps?: Partial<BtnProps>;
  onChange?: (v?: string | number) => void;
}

export function SelectBtnList({ value: outValue, options, btnProps, onChange, ...props }: SelectBtnListProps) {
  const [value, setValue] = useState<string | number>();

  useEffect(() => {
    if (outValue !== value) {
      setValue(outValue);
    }
  }, [outValue]);

  const bList: ButtonListProps['btnList'] = useMemo(() => {
    return options.map(({ value: v, onClick, ...bProps }) => {
      const val = v?.toString();
      const btn: BtnProps = {
        ...(btnProps || {}),
        ...(bProps || {}),
        type: value === v ? 'primary' : undefined,
        onClick: (e) => {
          onChange?.(val);
          onClick?.(e as MouseEvent<HTMLButtonElement>);
        }
      }
      return btn;
    })
  }, [btnProps, options, value])

  return (
    <ButtonList btnList={bList} {...props} />
  )
}
