import { SelectBtnList, SelectBtnListProps } from '@/components';
import { Button, ColorPicker } from 'antd';
import { Color } from 'antd/es/color-picker';
import { ColorFactory } from 'antd/es/color-picker/color';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DrawContainer, {
  DRAW,
  DrawContainerProps,
  DrawContainerRef,
  DrawContainerStatus,
} from './components/draw-container';
import PenSize from './components/pen-size';

import Socket, {
  ACTION,
  DrawSocketStatus,
  EMIT_IMG,
  JOIN_ROOM,
  LEAVE_ROOM,
  LISTEN_ACTION,
  LISTEN_CONNECT,
  LISTEN_DISCONNECT,
  LISTEN_EMIT_IMG,
  LISTEN_JOIN_ROOM,
  LISTEN_LEAVE_ROOM,
  LISTEN_REQUEST_IMG,
  REQUEST_IMG,
} from '../../socket';

const DEFAULT: DrawSocketStatus = {
  status: DRAW,
  penSize: 6,
  color: 'rgba(0,0,0,1)',
};

export default function Draw() {
  const [status, setStatus] = useState<DrawContainerStatus>(DEFAULT.status as DrawContainerStatus);
  const [penSize, setPenSize] = useState(DEFAULT.penSize);
  const [color, setColor] = useState<DrawSocketStatus['color']>(DEFAULT.color);
  const [searchParams] = useSearchParams();
  const n = useNavigate();
  const isView = searchParams.get('type') === 'view';
  const room = searchParams.get('room') as string;
  const ref = useRef<DrawContainerRef>(null);
  const socket = useRef(Socket);
  const sId = useRef<string>();

  if (!room) n('/');

  // 改变鼠标操作类型
  const changeStatus: SelectBtnListProps['onChange'] = (s) => {
    if (s) {
      setStatus(s as DrawContainerStatus);
    }
  };

  // 清空画布
  const clear = () => {
    ref.current?.clear();
  };

  // 请求画布数据加载在页面上
  const canvasDataRequest = () => {
    socket.current?.[REQUEST_IMG]?.({ room, id: socket.current?.instance?.id });
  };

  // 重连后重绘画布
  const redraw = (data: string) => {
    const { ctx } = ref.current || {};
    if (data) {
      const img = new Image();
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
      img.src = data?.split('?')[0];
    }
  };

  // 获取图片信息
  const getCanvasData = () => {
    const { canvas } = ref.current || {};
    socket.current?.[EMIT_IMG]?.({
      room,
      id: sId.current,
      data: `${canvas?.toDataURL('image/png')}?${Date.now()}`,
    });
  };

  // 状态同步
  const stateSynchronization = (e: DrawSocketStatus) => {
    let s = e;
    if (isView) {
      const { status: action, type: t, id: socketId } = e || {};
      if (socketId === socket.current?.instance?.id) return;
      if (t === 'clear') {
        clear();
        return;
      }
      if (action) {
        setStatus(action);
        setPenSize(e?.penSize);
        setColor(e?.color);
        setTimeout(() => {
          ref.current?.action(s);
        });
      }
    } else {
      s = {
        ...((e as DrawSocketStatus) || {}),
        room,
        status,
        penSize,
        color,
        id: socket.current?.instance?.id,
      };
      socket.current?.[ACTION]?.(s);
    }
  };

  // 画布清空时同步
  const onClear = () => {
    stateSynchronization({ type: 'clear' });
  };

  const checkId = (d?: DrawSocketStatus) => {
    return d?.id === socket.current?.instance?.id;
  }

  const leave = () => {
    socket.current?.[LEAVE_ROOM]?.({
      room,
      id: socket.current?.instance?.id,
    });
    n('/');
  };

  const join = () => {
    socket.current?.[JOIN_ROOM]?.({
      room,
      id: socket.current?.instance?.id,
    });
  };

  const initSocket = () => {
    const s = socket.current;
    // 加入房间
    join();
    // 画布同步
    if (isView) s[LISTEN_ACTION]?.(stateSynchronization);
    // 成功加入房间
    s[LISTEN_JOIN_ROOM]?.((d: DrawSocketStatus) => {
      if (!checkId(d)) {
        canvasDataRequest();
      }
    });
    // 离开房间时，清空监听
    s[LISTEN_LEAVE_ROOM]?.((d: DrawSocketStatus) => {
      if (checkId(d)) {
        s.removeAllListeners();
      }
    });
    // 获取画布信息
    s[LISTEN_REQUEST_IMG]?.((d: DrawSocketStatus) => {
      if (checkId(d)) return;
      sId.current = d?.id;
      getCanvasData();
    });
    // 接受画布信息并绘制在画布上
    s[LISTEN_EMIT_IMG]?.((d: DrawSocketStatus) => {
      const { data } = d || {};
      if (checkId(d)) {
        redraw(data as string);
      }
    });
  };

  useEffect(() => {
    const s = socket.current;
    const { instance } = s || {};
    if (instance.connected) initSocket();
    s[LISTEN_CONNECT]?.(initSocket);
    s[LISTEN_DISCONNECT]?.(() => {
      instance.removeAllListeners();
    });
  }, []);

  const options: SelectBtnListProps['options'] = [
    {
      text: '画笔',
      value: DrawContainerStatus.DRAW,
    },
    {
      text: '橡皮擦',
      value: DrawContainerStatus.ERASER,
    },
    {
      text: '清空',
      onClick: clear,
    },
  ];

  const c = useMemo(() => {
    if (color instanceof ColorFactory) {
      const { r, g, b, a } = (color as Color)?.toRgb() || {};
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return color as string;
  }, [color]);

  const p = typeof penSize === 'number' ? penSize / 2 : 6;

  const commonProps = {
    status,
    penSize: p,
    color: c,
  };

  const props: DrawContainerProps = !isView
    ? {
        onClear,
        onAction: isView ? undefined : stateSynchronization,
      }
    : {
        mode: 'view',
      };

  return (
    <div>
      {!isView && (
        <SelectBtnList
          onChange={changeStatus}
          options={options}
          value={status}
        />)
      }
      {!isView && <PenSize value={penSize} onChange={setPenSize} />}
      {!isView && <ColorPicker value={color} format="rgb" onChange={setColor} />}
      <Button onClick={leave}>离开</Button>
      <DrawContainer ref={ref} {...commonProps} {...props} />
    </div>
  );
}
