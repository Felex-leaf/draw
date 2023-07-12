import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';

import './index.less';

export interface BtnProps extends ButtonProps {
  text: string;
}

export interface ButtonListProps {
  btnList: BtnProps[];
  className?: string;
  direction?: 'left' | 'right';
}

export function ButtonList({ btnList, className, direction = 'left' }: ButtonListProps) {
  const { length } = btnList || [];
  if (!length) return <></>;

  const classPrefix = 'button-list';

  return (
    <div className={classNames([classPrefix, className, direction === 'right' && `${classPrefix}-right`])}>
      {btnList?.map(({ text, ...props }, i) => (
        <Button key={i} {...props}>
          {text}
        </Button>
      ))}
    </div>
  );
}
