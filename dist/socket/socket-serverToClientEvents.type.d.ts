import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
import { ReadingSessionInfo, ViewerEvent, ViewerSnapshot } from "./reading-session.types";
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
}
export interface NoticeToClientEvents {
    'notice-message:result': (payload: NoticeMessageResult) => void;
}
/** 읽기 세션 모니터링 이벤트 (Admin에게 전송) */
export interface ReadingServerToClientEvents {
    'reading:session:list': (payload: {
        sessions: ReadingSessionInfo[];
    }) => void;
    'reading:session:started': (payload: {
        session: ReadingSessionInfo;
    }) => void;
    'reading:session:ended': (payload: {
        sessionId: string;
    }) => void;
    'reading:session:subscribed': (payload: {
        sessionId: string;
        snapshot: ViewerSnapshot | null;
    }) => void;
    'reading:session:events': (payload: {
        sessionId: string;
        events: ViewerEvent[];
    }) => void;
    'reading:session:error': (payload: {
        message: string;
    }) => void;
}
export interface AdminServerToClientEvents extends ServerToClientEvents, NoticeToClientEvents, ReadingServerToClientEvents {
}
