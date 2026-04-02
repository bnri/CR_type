import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
import { ConnectedUser, ConnectedUsersGrouped } from "./connected-user.types";
import { UnifiedSessionInfo, SessionSegmentChangedPayload, SessionHistoryListResult, SessionHistoryGetResult, UnifiedChunksResult, UnifiedSegmentResult, SessionHistoryDeleteResult } from "./unified-session.types";
import { LiveReadingState } from "../book/child-reading-progress.type";
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
        readingSessionId: string;
        durationMs?: number;
    }) => void;
    /** 세션 에러 */
    'session:error': (payload: {
        message: string;
    }) => void;
    /** 새 chunk 저장 알림 (5초마다) — 데이터는 기존 API로 fetch */
    'live:chunk-notify': (payload: {
        readingSessionId: string;
        segmentIndex: number;
        chunkKey: string;
        startTs: number;
        endTs: number;
    }) => void;
    /** live 구독 중인 세션 종료 */
    'live:session-ended': (payload: {
        readingSessionId: string;
        durationMs: number;
    }) => void;
    /** 자녀 읽기 실시간 상태 (5초 주기) */
    'reading:child-live': (payload: LiveReadingState) => void;
    /** 자녀 읽기 종료 (세션 종료 또는 TTL 만료) */
    'reading:child-offline': (payload: {
        testeeIdx: number;
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
        readingSessionId: string;
        durationMs?: number;
    }) => void;
    /** 세그먼트 변경 (섹션 변경) */
    'session:segment-changed': (payload: SessionSegmentChangedPayload) => void;
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
