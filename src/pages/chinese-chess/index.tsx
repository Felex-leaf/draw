import Checkerboard from './components/checkerboard';
import './index.less';

const classPrefix = 'chinese-chess';

const pieces = [
  {
    type: 1,
    color: 'red',
    x: 0,
    y: 0,
  },
];
export default function ChineseChess() {
  return (
    <div className={classPrefix} style={{ opacity: 0.1 }}><Checkerboard pieces={pieces} /></div>
  );
}
