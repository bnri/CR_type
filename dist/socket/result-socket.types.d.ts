import type { ViewerSnapshot } from './reading-section.types';
import type { ChunkRef, ChunkReadingScanSummary, UnifiedSessionManifest, UnifiedSegmentMeta, UnifiedChunkFile } from './unified-session.types';
/** /result 토큰 인증 세션 데이터 */
export interface ResultSessionData {
    tokenType: 'live' | 'replay';
    sessionId: string;
    permissions: {
        showGaze: boolean;
        showChildName: boolean;
    };
    expiresAt: number;
}
/** CR_result → CR_ws */
export interface ResultToServerEvents {
    /** 세션 구독 (Room 입장) */
    'session:subscribe': (data: {
        sessionToken: string;
    }) => void;
    /** 세션 구독 해제 */
    'session:unsubscribe': () => void;
    /** 과거 세션 manifest 조회 */
    'history:get-manifest': (data: {
        shareToken: string;
    }) => void;
    /** 과거 세션 segment meta 조회 */
    'history:get-segment-meta': (data: {
        shareToken: string;
        segIdx: number;
    }) => void;
    /** 과거 세션 chunk 조회 */
    'history:get-chunks': (data: {
        shareToken: string;
        segIdx: number;
        from: number;
        to: number;
    }) => void;
}
/** CR_ws → CR_result */
export interface ResultServerToClientEvents {
    /** 구독 확인 + 초기 상태 */
    'session:subscribed': (data: {
        sessionId: string;
        snapshot: ViewerSnapshot | null;
        segmentRanges: Array<{
            start: number;
            end: number;
        }>;
        chunkRefs: ChunkRef[];
        readingScan?: ChunkReadingScanSummary;
    }) => void;
    /** 새 chunk 알림 (데이터는 S3에서 직접 fetch) */
    'chunk:notify': (data: {
        segmentIndex: number;
        chunkKey: string;
        startTs: number;
        endTs: number;
        readingScan?: ChunkReadingScanSummary;
    }) => void;
    /** 세션 종료 알림 */
    'session:ended': (data: {
        durationMs: number;
    }) => void;
    /** 에러 */
    'session:error': (data: {
        message: string;
    }) => void;
    /** 과거 세션 응답 */
    'history:manifest': (data: UnifiedSessionManifest) => void;
    'history:segment-meta': (data: UnifiedSegmentMeta) => void;
    'history:chunks': (data: UnifiedChunkFile[]) => void;
    /** 시청자 수 */
    'viewer:count': (data: {
        count: number;
    }) => void;
}
