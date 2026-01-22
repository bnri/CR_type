// import type { MessageResponse } from '@/types/socket/socket-message.types';

import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
import { ReadingSessionInfo, ViewerEvent, ViewerSnapshot } from "./reading-session.types";

export interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  connect_error: (err: Error) => void;

  //내가 보낸 메시지에 대한 콜백
  'chat-message:append-self': (msg: MessageResponse) => void;

  //상대방이 보낸 메시지에 대한 콜백
  'chat-message:append-peer': (msg: MessageResponse) => void;

  // 내가 요청한 특정채팅방에 대한 갱신 콜백
  // 채팅방 일정기간의 채팅로그들을 줘야함

  'chat-message:refreshed': (payload: { roomKey: string; msgArr: MessageResponse[] }) => void;
  'chat-message:read-peer':(payload:MessageReadResponse)=>void;
  'chat-message:read-self':(payload:MessageReadResponse)=>void;
}

export interface NoticeToClientEvents {
  'notice-message:result': (payload: NoticeMessageResult) => void;
}

/** 읽기 세션 모니터링 이벤트 (Admin에게 전송) */
export interface ReadingServerToClientEvents {
  'reading:session:list': (payload: { sessions: ReadingSessionInfo[] }) => void;
  'reading:session:started': (payload: { session: ReadingSessionInfo }) => void;
  'reading:session:ended': (payload: { sessionId: string }) => void;
  'reading:session:subscribed': (payload: { sessionId: string; snapshot: ViewerSnapshot | null }) => void;
  'reading:session:events': (payload: { sessionId: string; events: ViewerEvent[] }) => void;
  'reading:session:error': (payload: { message: string }) => void;
}

export interface AdminServerToClientEvents
  extends ServerToClientEvents,
          NoticeToClientEvents,
          ReadingServerToClientEvents {}
          