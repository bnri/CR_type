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
    'session:subscribe': (data: {
        sessionToken: string;
    }) => void;
    'session:unsubscribe': () => void;
    'history:get-manifest': (data: {
        shareToken: string;
    }) => void;
    'history:get-segment-meta': (data: {
        shareToken: string;
        segIdx: number;
    }) => void;
    'history:get-chunks': (data: {
        shareToken: string;
        segIdx: number;
        from: number;
        to: number;
    }) => void;
}
/** CR_ws → CR_result */
export interface ResultServerToClientEvents {
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
    'chunk:notify': (data: {
        segmentIndex: number;
        chunkKey: string;
        startTs: number;
        endTs: number;
        readingScan?: ChunkReadingScanSummary;
    }) => void;
    'session:ended': (data: {
        durationMs: number;
    }) => void;
    'session:error': (data: {
        message: string;
    }) => void;
    'history:manifest': (data: UnifiedSessionManifest) => void;
    'history:segment-meta': (data: UnifiedSegmentMeta) => void;
    'history:chunks': (data: UnifiedChunkFile[]) => void;
    'viewer:count': (data: {
        count: number;
    }) => void;
}
