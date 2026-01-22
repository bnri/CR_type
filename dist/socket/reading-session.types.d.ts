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
