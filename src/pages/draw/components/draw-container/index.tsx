import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  useImperativeHandle,
  useRef,
} from 'react';

import './index.less';

export const classPrefix = 'draw-container';

type MH = MouseEventHandler<HTMLCanvasElement>;

type ME = MouseEvent<HTMLCanvasElement>;

export interface DrawContainerEvent extends Partial<ME> {
  x?: number;
  y?: number;
  mX?: number;
  mY?: number;
}

export interface DrawContainerRef {
  action: (e: DrawContainerEvent) => void;
  clear: () => void;
  ctx?: CanvasRenderingContext2D;
  canvas?: HTMLCanvasElement | null;
}

export enum DrawContainerStatus {
  DRAW = 'draw',
  ERASER = 'eraser',
}

export const { DRAW, ERASER } = DrawContainerStatus;

export interface DrawContainerProps {
  status?: DrawContainerStatus;
  penSize?: number;
  mode?: 'edit' | 'view';
  color?: CSSProperties['color'];
  onAction?: (e: DrawContainerEvent) => void;
  onClear?: () => void;
}

type EventMap = Record<
  DrawContainerStatus,
  {
    onMouseDown?: MH;
    onMouseMove: (e: DrawContainerEvent, draw?: boolean) => void;
    onMouseUp?: MH;
  }
>;

type E = DrawContainerEvent;

function DrawContainer(
  { penSize = 6, status = DRAW, mode = 'edit', color, onAction, onClear }: DrawContainerProps,
  r: ForwardedRef<DrawContainerRef>,
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null | undefined>();
  const action = useRef(false);
  const lastX = useRef<number>();
  const lastY = useRef<number>();

  // 获取 context
  const getCtx = () => {
    if (ctx.current) return ctx.current;
    ctx.current = ref.current?.getContext('2d');
    return ctx.current as CanvasRenderingContext2D;
  };

  // 获取位置信息
  const getPosition = (e: E, a?: boolean) => {
    // 获取 context
    const c = getCtx();
    // 是否对画布进行操作
    if ((!action.current && !a) || !c) return { action: false };
    // 非事件直接获取位置信息
    const { mX, mY } = e || {};
    let { x, y } = e || {};
    // 事件实例计算x，y
    if (e?.target) {
      const { clientX, clientY } = e || {};
      if (typeof clientX !== 'number' || typeof clientY !== 'number') return { action: false };
      const rect = (e.target as HTMLCanvasElement)?.getBoundingClientRect();
      x = clientX - rect.left;
      y = clientY - rect.top;
    }
    return { ctx: c, action: true, x, y, mX: mX || lastX.current, mY: mY || lastY.current };
  };

  // 保存位置
  const setPosition = (x?: number, y?: number) => {
    lastX.current = x;
    lastY.current = y;
  };

  // 默认启用画布操作并设置开始点
  const DefaultOnMouseDown: MH = (e) => {
    action.current = true;
    const { x, y } = getPosition(e);
    // 设置开始点
    setPosition(x, y);
  };

  // 默认禁止操作
  const defaultOnMouseUp = () => {
    action.current = false;
  };

  // 清空操作
  const clear = () => {
    onClear?.();
    ctx.current?.clearRect(0, 0, ref.current?.width || 0, ref.current?.height || 0);
  };

  function stopFn<T extends Function>(fn: T) {
    if (mode === 'edit') return fn;
    return () => {};
  }

  // 事件处理
  const eventMap: EventMap = {
    // 笔刷绘制
    draw: {
      onMouseMove: (e, draw) => {
        const { ctx: c, action: a, mX, mY, x, y } = getPosition(e, draw);
        if (!a || !c || !x || !y || !mX || !mY) return;
        c.lineWidth = penSize;
        c.fillStyle = color as string;
        const dist = Math.sqrt(Math.pow(x - mX, 2) + Math.pow(y - mY, 2));
        const angle = Math.atan2(y - mY, x - mX);
        for (let i = 0; i < dist; i += 1) {
          const tx = mX + Math.cos(angle) * i;
          const ty = mY + Math.sin(angle) * i;
          c.beginPath();
          c.arc(tx, ty, penSize / 2, 0, 2 * Math.PI);
          c.fill();
          onAction?.({ x, y, mX, mY });
          setPosition(tx, ty);
        }
      },
    },
    // 橡皮擦
    eraser: {
      onMouseMove: (e, draw) => {
        const { ctx: c, action: a, x, y } = getPosition(e, draw);
        if (!a || !c || !x || !y) return;
        const halfPenSize = penSize / 2;
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            c.clearRect(x - halfPenSize + i, y - halfPenSize + j, penSize, penSize);
            onAction?.({ x, y });
          }
        }
      },
    },
  };

  const { onMouseDown: oMD = DefaultOnMouseDown, onMouseMove, onMouseUp: oMU = defaultOnMouseUp } = eventMap[status];

  const onMouseDown = stopFn(oMD);
  const onMouseUp = stopFn(oMU);

  useImperativeHandle(r, () => ({
    action: (e) => {
      onMouseMove(e, true);
    },
    clear,
    ctx: getCtx(),
    canvas: ref.current,
  }));

  return (
    <div className={classPrefix}>
      <canvas
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseUp}
        onMouseMove={stopFn(onMouseMove)}
        onMouseUp={onMouseUp}
      />
    </div>
  );
}

export default forwardRef(DrawContainer);
