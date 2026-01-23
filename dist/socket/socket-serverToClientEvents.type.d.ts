import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
import { ReadingSessionInfo, SocketViewerEvent, ViewerSnapshot } from "./reading-section.types";
import { ConnectedUser, ConnectedUsersGrouped } from "./connected-user.types";
import { MonitorStartedPayload, MonitorChunkPayload, MonitorSessionChangedPayload, MonitorStoppedPayload, MonitorErrorPayload } from "./monitor.types";
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
        events: SocketViewerEvent[];
    }) => void;
    'reading-section:error': (payload: {
        message: string;
    }) => void;
}
/** 연결된 사용자 모니터링 이벤트 (Admin에게 전송) */
export interface UserServerToClientEvents {
    'user:list': (payload: {
        users: ConnectedUsersGrouped;
    }) => void;
    'user:connected': (payload: {
        user: ConnectedUser;
    }) => void;
    'user:disconnected': (payload: {
        socketId: string;
        userId: number;
        userType: 'parent' | 'child';
    }) => void;
    'user:reading-status': (payload: {
        socketId: string;
        userId: number;
        userType: 'parent' | 'child';
        readingSessionId: string | null;
    }) => void;
}
/** 실시간 모니터링 이벤트 (Admin에게 전송) */
export interface MonitorServerToClientEvents {
    'monitor:started': (payload: MonitorStartedPayload) => void;
    'monitor:chunk': (payload: MonitorChunkPayload) => void;
    'monitor:session-changed': (payload: MonitorSessionChangedPayload) => void;
    'monitor:stopped': (payload: MonitorStoppedPayload) => void;
    'monitor:error': (payload: MonitorErrorPayload) => void;
}
export interface AdminServerToClientEvents extends ServerToClientEvents, NoticeToClientEvents, ReadingServerToClientEvents, UserServerToClientEvents, MonitorServerToClientEvents {
}
