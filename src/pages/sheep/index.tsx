import { Modal } from 'antd';
import { useRef } from 'react';
import SheepElements, { SheepElementsRef } from './components/sheep-elements';
import SheepGrid, { SheepGridRef } from './components/sheep-grid';
import './index.less';

const classPrefix = 'sheep';

export default function Sheep() {
  const sheepElementsRef = useRef<SheepElementsRef>();
  const sheepGridRef = useRef<SheepGridRef>();

  const onFail = () => {
    Modal.error({
      title: '失败',
      okText: '重新尝试',
      onOk() {
        sheepElementsRef.current?.clear();
        sheepGridRef.current?.init();
      },
    });
  };

  const onSuccess = () => {
    Modal.success({
      title: '成功',
      okText: '重新开始',
      onOk() {
        sheepElementsRef.current?.clear();
        sheepGridRef.current?.init();
      },
    });
  };

  const onClickElement = (type: number) => {
    sheepElementsRef.current?.add(type);
  };

  return (
    <div className={classPrefix}>
      <SheepGrid onEvent={onClickElement} ref={sheepGridRef} />
      <SheepElements onFail={onFail} onSuccess={onSuccess} ref={sheepElementsRef} />
    </div>
  );
}
