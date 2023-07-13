import { Color } from 'antd/es/color-picker';
import io, { Socket } from 'socket.io-client';
import { DrawContainerEvent, DrawContainerStatus } from '../pages/draw/components/draw-container';
import { DRAW_EVENT, DRAW_LISTEN, DRAW_LISTEN_MAP } from '../pages/draw/consts';

export const { ACTION, REQUEST_IMG, JOIN_ROOM, LEAVE_ROOM, EMIT_IMG } = DRAW_EVENT;
export const {
  LISTEN_ACTION,
  LISTEN_REQUEST_IMG,
  LISTEN_JOIN_ROOM,
  LISTEN_LEAVE_ROOM,
  LISTEN_EMIT_IMG,
  LISTEN_CONNECT,
  LISTEN_DISCONNECT,
} = DRAW_LISTEN;

const keys = Object.values(DRAW_EVENT);

export interface DrawSocketStatus extends DrawContainerEvent {
  status?: DrawContainerStatus;
  penSize?: number;
  color?: Color | string;
  type?: string;
  data?: string;
  id?: string;
  room?: string;
}

type CallBack = (payload?: any, instance?: Socket, ...arg: any[]) => void;

type Listen = (callBack?: CallBack) => void;

type Emit = (...arg: any[]) => void;

class DrawSocket {
  instance: Socket;

  keys = keys;

  constructor() {
    const s = io('http://localhost:4000', {
      transports: ['websocket'],
    });
    this.instance = s;
    this.listenCreater();
    this.emitCreater();
  }

  private listenCreater() {
    this.keys.forEach((key) => {
      // @ts-ignore
      this[DRAW_LISTEN_MAP[key]] = (callback: CallBack) => {
        if (!this.instance?.connected) return;
        this.instance.on(key, (payload: string, ...arg: any[]) => {
          let p;
          try {
            p = JSON.parse(payload);
          } catch {
            p = payload;
          }
          callback?.(p, this.instance, ...arg);
        });
      };
    });
  }

  private emitCreater() {
    this.keys.forEach((key) => {
      // @ts-ignore
      this[key] = (payload: string, ...arg: any[]) => {
        if (!this.instance?.connected) return;
        let p: string;
        if (typeof payload === 'string') {
          p = payload;
        } else {
          p = JSON.stringify(payload);
        }
        this.instance.emit(key, p, ...arg);
      };
    });
  }

  removeAllListeners = () => {
    this.instance?.removeAllListeners();
  }
}

const socket: DrawSocket & Partial<Record<DRAW_EVENT, Emit>> & Partial<Record<DRAW_LISTEN, Listen>> = new DrawSocket();

export default socket;
