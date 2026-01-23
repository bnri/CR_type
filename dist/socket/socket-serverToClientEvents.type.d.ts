import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
import { ReadingSessionInfo, ViewerEvent, ViewerSnapshot } from "./reading-section.types";
export interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
    connect_error: (err: Error) => void;
    'chat-message:append-self': (msg: MessageResponse) => void;
    'chat-message:append-peer': (msg: MessageResponse) => void;
    'chat-message:refreshed': (payload: {
        roomKey: string;
        msgArr: MessageResponse[];
    }) => void;
    'chat-message:read-peer': (payload: MessageReadResponse) => void;
    'chat-message:read-self': (payload: MessageReadResponse) => void;
    'reading-section:started': (payload: {
        session: ReadingSessionInfo;
    }) => void;
    'reading-section:ended': (payload: {
        sessionId: string;
    }) => void;
}
export interface NoticeToClientEvents {
    'notice-message:result': (payload: NoticeMessageResult) => void;
}
/** 읽기 섹션 모니터링 이벤트 (Admin에게 전송) */
export interface ReadingServerToClientEvents {
    'reading-section:list': (payload: {
        sessions: ReadingSessionInfo[];
    }) => void;
    'reading-section:subscribed': (payload: {
        sessionId: string;
        snapshot: ViewerSnapshot | null;
    }) => void;
    'reading-section:events': (payload: {
        sessionId: string;
        events: ViewerEvent[];
    }) => void;
    'reading-section:error': (payload: {
        message: string;
    }) => void;
}
export interface AdminServerToClientEvents extends ServerToClientEvents, NoticeToClientEvents, ReadingServerToClientEvents {
}
