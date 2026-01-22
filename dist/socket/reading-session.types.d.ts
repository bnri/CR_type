/** 뷰어 스냅샷 (초기 상태) */
export interface ViewerSnapshot {
    viewMode: 'scroll' | 'page';
    globalRunIndex: number;
    pageIndex?: number;
    scrollPosition?: number;
    totalItems: number;
}
/** 뷰어 이벤트 */
export interface ViewerEvent {
    type: 'page_change' | 'scroll' | 'overlay_toggle' | 'range_select' | 'quiz_answer' | 'gi_change';
    timestamp: number;
    data: Record<string, unknown>;
}
/** 읽기 세션 정보 */
export interface ReadingSessionInfo {
    sessionId: string;
    userId: number;
    userType: 'parent' | 'child';
    userName?: string;
    bookIdx: number;
    bookTitle?: string;
    sectionId: string;
    sectionTitle?: string;
    startedAt: string;
    snapshot: ViewerSnapshot;
    lastEventAt?: string;
}
/** 세션 시작 페이로드 */
export interface SessionStartPayload {
    bookIdx: number;
    sectionId: string;
    snapshot: ViewerSnapshot;
}
/** 이벤트 배치 전송 페이로드 */
export interface SessionEventPayload {
    events: ViewerEvent[];
}
/** 세션 구독 페이로드 */
export interface SessionSubscribePayload {
    sessionId: string;
}
/** Client → Server: 읽기 세션 이벤트 (Client용 - 세션 생성/종료/이벤트 전송) */
export interface ReadingClientToServerEvents {
    'reading:session:start': (payload: SessionStartPayload) => void;
    'reading:session:end': () => void;
    'reading:session:event': (payload: SessionEventPayload) => void;
}
/** Admin → Server: 읽기 세션 이벤트 (Admin용 - 세션 목록 조회/구독) */
export interface ReadingAdminToServerEvents {
    'reading:session:list': () => void;
    'reading:session:subscribe': (payload: SessionSubscribePayload) => void;
    'reading:session:unsubscribe': (payload: SessionSubscribePayload) => void;
}
/** Server → Admin: 읽기 세션 이벤트 */
export interface ReadingServerToAdminEvents {
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
