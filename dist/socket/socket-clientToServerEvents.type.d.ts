import { ChatMessageReadRequest, ChatMessageRefreshRequest, ImageMessageRequest, MessageRequest } from "./socket-message.types";
export interface ClientToServerEvents {
    'chat-message:send': (msg: MessageRequest) => void;
    'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
    'chat-message:read': (payload: ChatMessageReadRequest) => void;
    'chat-image:send': (payload: ImageMessageRequest) => void;
}
