import { ChatMessageReadRequest, ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
export interface ClientToServerEvents {
    'chat-message:send': (msg: MessageRequest) => void;
    'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
    'chat-message:read': (payload: ChatMessageReadRequest) => void;
}
export interface NoticeToServerEvents {
    'notice-message:send': (msg: MessageRequest) => void;
}
export interface AdminClientToServerEvents extends ClientToServerEvents, NoticeToServerEvents {
}
