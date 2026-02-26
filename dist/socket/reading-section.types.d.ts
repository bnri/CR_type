import type { CRViewerState, ViewerEvent, AudioSnapshot, RangeSnapshot, TranslateSnapshot } from './viewer-events.types';
/**
 * 뷰어 영역의 window 기준 정규화 사각형 (0~1).
 * gaze 좌표(window 기준 0~1)를 뷰어 기준으로 변환:
 *   vx = (gazeX - left) / width
 *   vy = (gazeY - top) / height
 */
export interface ViewerRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
/** 뷰어 스냅샷 (소켓 통신용 - 현재 읽기 상태) */
export interface ViewerSnapshot {
    viewMode: 'scroll' | 'page';
    globalRunIndex: number;
    pageIndex?: number;
    totalPages?: number;
    scrollPosition?: number;
    scrollRatio?: number;
    totalItems: number;
    viewportWidth?: number;
    viewportHeight?: number;
    /** 뷰어 영역의 window 기준 정규화 사각형 (gaze → viewer 좌표 변환용) */
    viewerRect?: ViewerRect;
    viewerState?: Partial<CRViewerState>;
    anchorGI?: number;
    anchorOffsetRatio?: number;
    audio?: AudioSnapshot;
    range?: RangeSnapshot | null;
    translate?: TranslateSnapshot | null;
}
/** 책/섹션 메타데이터 */
export interface SessionMeta {
    bookTitle?: string;
    sectionTitle?: string;
    sectionOrder?: number;
    totalSections?: number;
}
/** 세션 통계 */
export interface SessionStats {
    pagesRead?: number;
    scrollDistance?: number;
    interactionCount?: number;
}
/** 진행 상황 업데이트 페이로드 */
export interface SessionProgressPayload {
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
