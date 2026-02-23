import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
import { ViewerSnapshot } from "./reading-section.types";
import { ViewerEvent } from "./viewer-events.types";
import { ConnectedUser, ConnectedUsersGrouped } from "./connected-user.types";
import { UnifiedSessionInfo, SessionSegmentChangedPayload, UnifiedChunkFile, SessionHistoryListResult, SessionHistoryGetResult, UnifiedChunksResult, UnifiedSegmentResult, SessionHistoryDeleteResult } from "./unified-session.types";
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
    /** 세션 시작됨 (서버 확인) */
    'session:started': (payload: {
        session: UnifiedSessionInfo;
    }) => void;
    /** 세션 종료됨 (서버 확인) */
    'session:ended': (payload: {
        sessionId: string;
        durationMs?: number;
    }) => void;
    /** 구독 성공 (Parent가 자녀 세션 구독 시) */
    'session:subscribed': (payload: {
        sessionId: string;
        snapshot: ViewerSnapshot | null;
    }) => void;
    /** 구독 중인 세션의 진행 상황 */
    'session:progress': (payload: {
        sessionId: string;
        snapshot: ViewerSnapshot;
    }) => void;
    /** 구독 중인 세션의 이벤트 */
    'session:events': (payload: {
        sessionId: string;
        events: ViewerEvent[];
    }) => void;
    /** 구독 중인 세션의 세그먼트 변경 (섹션 변경) */
    'session:segment-changed': (payload: SessionSegmentChangedPayload) => void;
    /** 구독 중인 세션의 청크 (10초 간격) */
    'session:chunk': (payload: {
        sessionId: string;
        segmentIndex: number;
        chunk: UnifiedChunkFile;
    }) => void;
    /** 세션 에러 */
    'session:error': (payload: {
        message: string;
    }) => void;
}
export interface NoticeToClientEvents {
    'notice-message:result': (payload: NoticeMessageResult) => void;
}
/** 통합 세션 모니터링 이벤트 (Admin/Parent에게 전송) */
export interface SessionServerToClientEvents {
    /** 활성 세션 목록 */
    'session:list': (payload: {
        sessions: UnifiedSessionInfo[];
    }) => void;
    /** 새 세션 시작됨 */
    'session:started': (payload: {
        session: UnifiedSessionInfo;
    }) => void;
    /** 세션 종료됨 */
    'session:ended': (payload: {
        sessionId: string;
        durationMs?: number;
    }) => void;
    /** 구독 성공 */
    'session:subscribed': (payload: {
        sessionId: string;
        snapshot: ViewerSnapshot | null;
    }) => void;
    /** 구독 중인 세션 진행 상황 */
    'session:progress': (payload: {
        sessionId: string;
        snapshot: ViewerSnapshot;
    }) => void;
    /** 구독 중인 세션 이벤트 */
    'session:events': (payload: {
        sessionId: string;
        events: ViewerEvent[];
    }) => void;
    /** 세그먼트 변경 (섹션 변경) */
    'session:segment-changed': (payload: SessionSegmentChangedPayload) => void;
    /** 실시간 청크 (10초 간격, 구독자에게) */
    'session:chunk': (payload: {
        sessionId: string;
        segmentIndex: number;
        chunk: UnifiedChunkFile;
    }) => void;
    /** 에러 */
    'session:error': (payload: {
        message: string;
    }) => void;
    'session:list-history-result': (payload: SessionHistoryListResult) => void;
    'session:get-history-result': (payload: SessionHistoryGetResult) => void;
    'session:get-chunks-result': (payload: UnifiedChunksResult) => void;
    'session:get-segment-result': (payload: UnifiedSegmentResult) => void;
    'session:delete-history-result': (payload: SessionHistoryDeleteResult) => void;
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
export interface AdminServerToClientEvents extends ServerToClientEvents, NoticeToClientEvents, SessionServerToClientEvents, UserServerToClientEvents {
}
