import { ChatMessageReadRequest, ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
import { SessionProgressPayload, SessionEventPayload, SessionSubscribePayload } from "./reading-section.types";
import { ViewerOpenPayload, ViewerClosePayload, GazeDataPayload, SessionHistoryListPayload, SessionHistoryGetPayload, SessionHistoryDeletePayload, UnifiedChunksGetPayload, UnifiedSegmentGetPayload } from "./unified-session.types";
export interface ClientToServerEvents {
    'chat-message:send': (msg: MessageRequest) => void;
    'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
    'chat-message:read': (payload: ChatMessageReadRequest) => void;
    /** 뷰어 열림 (세션 시작 또는 섹션 변경) */
    'session:open': (payload: ViewerOpenPayload) => void;
    /** 뷰어 닫힘 (세션 종료) */
    'session:close': (payload: ViewerClosePayload) => void;
    /** 진행 상황 (스냅샷 업데이트) */
    'session:progress': (payload: SessionProgressPayload) => void;
    /** 이벤트 배치 전송 */
    'session:event': (payload: SessionEventPayload) => void;
    /** 시선 데이터 전송 (~1초 간격) */
    'session:gaze': (payload: GazeDataPayload) => void;
    /** 세션 구독 (Parent가 자녀 세션 모니터링) */
    'session:subscribe': (payload: SessionSubscribePayload) => void;
    /** 세션 구독 해제 */
    'session:unsubscribe': (payload: SessionSubscribePayload) => void;
}
export interface NoticeToServerEvents {
    'notice-message:send': (msg: MessageRequest) => void;
}
/** 사용자 관리 이벤트 (Admin용 - 연결된 사용자 목록 조회) */
export interface UserAdminToServerEvents {
    'user:list': () => void;
}
/** 통합 세션 관리 이벤트 (Admin/Parent용) */
export interface SessionAdminToServerEvents {
    /** 활성 세션 목록 조회 */
    'session:list': () => void;
    /** 세션 구독 (실시간 모니터링) */
    'session:subscribe': (payload: SessionSubscribePayload) => void;
    /** 세션 구독 해제 */
    'session:unsubscribe': (payload: SessionSubscribePayload) => void;
    /** 세션 이력 목록 조회 (S3) */
    'session:list-history': (payload: SessionHistoryListPayload) => void;
    /** 세션 이력 상세 조회 (S3) */
    'session:get-history': (payload: SessionHistoryGetPayload) => void;
    /** 세션 이력 삭제 (S3) */
    'session:delete-history': (payload: SessionHistoryDeletePayload) => void;
    /** 청크 조회 (seek/재생용) */
    'session:get-chunks': (payload: UnifiedChunksGetPayload) => void;
    /** 세그먼트 상세 조회 */
    'session:get-segment': (payload: UnifiedSegmentGetPayload) => void;
}
export interface AdminClientToServerEvents extends ClientToServerEvents, NoticeToServerEvents, UserAdminToServerEvents, SessionAdminToServerEvents {
}
