import { ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";


export interface ClientToServerEvents {
  'chat-message:send': (msg: MessageRequest) => void;
  // 필요에 따라 확장
  'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
  
}
