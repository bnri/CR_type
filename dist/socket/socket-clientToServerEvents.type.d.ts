import { ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
export interface ClientToServerEvents {
    'chat-message:send': (msg: MessageRequest) => void;
    'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
}
