export enum DRAW_EVENT {
  ACTION = 'penAction',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  REQUEST_IMG = 'requestImg',
  EMIT_IMG = 'emitImg',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  ROOMS = 'rooms',
}

export enum DRAW_LISTEN {
  LISTEN_ACTION = 'listenAction',
  LISTEN_CONNECT = 'listenConnect',
  LISTEN_DISCONNECT = 'listenDisconnect',
  LISTEN_REQUEST_IMG = 'listenRequestImg',
  LISTEN_EMIT_IMG = 'listenEmitImg',
  LISTEN_JOIN_ROOM = 'listenJoinRoom',
  LISTEN_LEAVE_ROOM = 'listenLeaveRoom',
  LISTEN_ROOMS = 'listenRooms',
}

export const DRAW_LISTEN_MAP = {
  [DRAW_EVENT.ACTION]: DRAW_LISTEN.LISTEN_ACTION,
  [DRAW_EVENT.CONNECT]: DRAW_LISTEN.LISTEN_CONNECT,
  [DRAW_EVENT.DISCONNECT]: DRAW_LISTEN.LISTEN_DISCONNECT,
  [DRAW_EVENT.REQUEST_IMG]: DRAW_LISTEN.LISTEN_REQUEST_IMG,
  [DRAW_EVENT.JOIN_ROOM]: DRAW_LISTEN.LISTEN_JOIN_ROOM,
  [DRAW_EVENT.LEAVE_ROOM]: DRAW_LISTEN.LISTEN_LEAVE_ROOM,
  [DRAW_EVENT.EMIT_IMG]: DRAW_LISTEN.LISTEN_EMIT_IMG,
  [DRAW_EVENT.ROOMS]: DRAW_LISTEN.LISTEN_ROOMS,
};
