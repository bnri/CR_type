import { ChatMessageReadRequest, ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
import { SessionStartPayload, SessionEventPayload, SessionSubscribePayload } from "./reading-session.types";
export interface ClientToServerEvents {
    'chat-message:send': (msg: MessageRequest) => void;
    'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
    'chat-message:read': (payload: ChatMessageReadRequest) => void;
    'reading:session:start': (payload: SessionStartPayload) => void;
    'reading:session:end': () => void;
    'reading:session:event': (payload: SessionEventPayload) => void;
}
export interface NoticeToServerEvents {
    'notice-message:send': (msg: MessageRequest) => void;
}
/** 읽기 세션 관리 이벤트 (Admin용 - 세션 목록 조회/구독) */
export interface ReadingAdminToServerEvents {
    'reading:session:list': () => void;
    'reading:session:subscribe': (payload: SessionSubscribePayload) => void;
    'reading:session:unsubscribe': (payload: SessionSubscribePayload) => void;
}
export interface AdminClientToServerEvents extends ClientToServerEvents, NoticeToServerEvents, ReadingAdminToServerEvents {
}
