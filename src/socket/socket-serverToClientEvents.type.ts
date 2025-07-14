// import type { MessageResponse } from '@/types/socket/socket-message.types';

import { MessageReadResponse, MessageResponse } from "./socket-message.types";

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

  
}
