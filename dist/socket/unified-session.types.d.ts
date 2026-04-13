import type { ViewerSnapshot, SessionMeta, SessionStats } from './reading-section.types';
import type { ViewerEvent } from './viewer-events.types';
import type { ReadingSessionRecord, ReadingStateRatios } from '../book/child-reading-progress.type';
/** 청크 참조 정보 (meta.json 내) */
export interface ChunkRef {
    start: number;
    end: number;
    key: string;
    eventCount: number;
}
/** 통합 세션 상태 */
export type UnifiedSessionStatus = 'active' | 'ended';
/** 통합 세그먼트 상태 */
export type UnifiedSegmentStatus = 'active' | 'ended';
/**
 * 시선 데이터 배치 (청크 내 포함)
 * - ~30FPS의 x,y,t 데이터를 flat number[]로 압축
 * - 30FPS × 10초 = 900샘플 = 2700숫자 (객체 대비 ~60% JSON 크기 절감)
 */
export interface GazeBatch {
    /** 배치 시작 timestamp (ms) */
    startTs: number;
    /** 배치 종료 timestamp (ms) */
    endTs: number;
    /** 압축된 시선 샘플 [x0, y0, t0, x1, y1, t1, ...] (x,y: 0~1 정규화) */
    samples: number[];
}
/**
 * 통합 청크 파일 (S3: segments/{n}/chunks/{startTs}-{endTs}.json)
 * - 10초 단위 이벤트 + 시선 데이터 묶음
 * - snapshot: 청크 시작 시점의 뷰어 상태 (Seek 시 초기화용)
 * - gazeData: 시선 추적 배치 데이터 (활성 시에만)
 */
/** 5초 chunk 종료 시점의 읽기 분석 요약 */
export interface ChunkReadingScanSummary {
    readRatio: number;
    validReadGIs: number;
    totalReadMs: number;
    totalAwayMs: number;
    avgFixationMs: number;
    metrics?: Record<string, number>;
    /** 이 chunk 구간만의 읽기 상태 비율 (전체 누적 아님) */
    chunkStateRatios?: ReadingStateRatios;
    /** 이 chunk 구간의 경과 시간 (ms) */
    chunkDurationMs?: number;
}
export interface UnifiedChunkFile {
    startTimestamp: number;
    endTimestamp: number;
    events: ViewerEvent[];
    /** 청크 시작 시점의 뷰어 상태 (Seek 시 이 상태로 초기화 후 이벤트 재생) */
    snapshot?: ViewerSnapshot;
    /** 시선 추적 데이터 배치 (~30FPS, 활성 시에만 포함) */
    gazeData?: GazeBatch[];
    /** chunk 시점 읽기 분석 요약 (Phase 4) */
    readingScanSummary?: ChunkReadingScanSummary;
}
/**
 * 통합 세그먼트 메타데이터
 * - 하나의 섹션을 읽는 구간 (섹션 변경 시 새 세그먼트)
 * - 세션 내에서 0, 1, 2... 순차 인덱스
 */
export interface UnifiedSegmentMeta {
    /** 세그먼트 인덱스 (0부터) */
    segmentIndex: number;
    /** 상태 */
    status: UnifiedSegmentStatus;
    bookIdx: number;
    bookTitle?: string;
    sectionId: string;
    sectionTitle?: string;
    /** 세그먼트 시작 시간 (ms) */
    startedAt: number;
    /** 세그먼트 종료 시간 (ms), null이면 진행중 */
    endedAt: number | null;
    /** 마지막 업데이트 */
    updatedAt: number;
    chunks: ChunkRef[];
    totalEvents: number;
    totalGazeSamples?: number;
    durationMs: number;
}
/**
 * 세그먼트 요약 정보 (manifest 내)
 * - Seek 시 어떤 segment를 봐야 할지 판단
 * - 전체 정보는 segments/{n}/meta.json 참조
 */
export interface UnifiedSegmentSummary {
    /** 세그먼트 인덱스 (0부터, 시간순) */
    segmentIndex: number;
    /** 상태 */
    status: UnifiedSegmentStatus;
    bookIdx: number;
    bookTitle?: string;
    sectionId: string;
    sectionTitle?: string;
    /** 세그먼트 시작 timestamp (ms) */
    startedAt: number;
    /** 세그먼트 종료 timestamp (ms) - null이면 진행중 (Live) */
    endedAt: number | null;
    /** 세그먼트 길이 (ms) */
    durationMs: number;
    chunkCount: number;
    eventCount: number;
    /** meta.json S3 key */
    metaKey: string;
}
/**
 * 통합 세션 매니페스트
 * - 뷰어 열림 → 닫힘까지가 하나의 세션
 * - 섹션 변경은 세그먼트로 기록
 * - 기존 ReadingSessionRecord + RecordingManifest 대체
 */
export interface UnifiedSessionManifest {
    /** 읽기 세션 ID (UUID) */
    readingSessionId: string;
    /** 상태 */
    status: UnifiedSessionStatus;
    /** 스키마 버전 (구 포맷과 구분용, 항상 2) */
    version: 2;
    childIdx: number;
    childName: string;
    familyId: number;
    /** 세션 시작 시간 (뷰어 열림, ms) */
    startedAt: number;
    /** 세션 종료 시간 (뷰어 닫힘, ms), null이면 진행중 */
    endedAt: number | null;
    /** 마지막 업데이트 */
    updatedAt: number;
    segments: UnifiedSegmentSummary[];
    totalSegments: number;
    totalChunks: number;
    totalEvents: number;
    /** 실제 활동 시간 합계 (ms, 세그먼트 간 갭 제외) */
    totalDurationMs: number;
    /** 구 포맷에서 변환된 경우 true */
    migrated?: boolean;
}
/**
 * 뷰어 열림 페이로드 (세션 시작 또는 세그먼트 추가)
 * - isSectionChange=false: 새 세션 시작 (뷰어 최초 열림)
 * - isSectionChange=true: 기존 세션 내 세그먼트 추가 (섹션 이동)
 */
export interface ViewerOpenPayload {
    bookIdx: number;
    sectionId: string;
    snapshot: ViewerSnapshot;
    meta?: SessionMeta;
    /** true면 기존 세션 내에서 섹션 변경 (새 세그먼트 추가) */
    isSectionChange?: boolean;
}
/** 뷰어 닫힘 페이로드 (세션 종료) */
export interface ViewerClosePayload {
    durationMs?: number;
    finalSnapshot?: ViewerSnapshot;
    stats?: SessionStats;
    /** 클라이언트가 구축한 세션 전체 기록 — 서버 MongoDB 저장용 */
    sessionRecord?: ReadingSessionRecord;
}
/**
 * 시선 데이터 전송 페이로드
 * - CR_app에서 1초 간격으로 버퍼링 후 전송
 */
export interface GazeDataPayload {
    /** 압축된 시선 샘플 [x, y, t, x, y, t, ...] */
    samples: number[];
    /** 배치 시작 timestamp (ms) */
    startTs: number;
    /** 배치 종료 timestamp (ms) */
    endTs: number;
}
/**
 * 통합 세션 정보 (실시간 활성 세션)
 * - ReadingSessionInfo 대체
 * - 현재 세그먼트 정보 포함
 */
export interface UnifiedSessionInfo {
    readingSessionId: string;
    childIdx: number;
    childName?: string;
    familyId: number;
    startedAt: string;
    snapshot: ViewerSnapshot;
    lastEventAt?: string;
    /** 현재 활성 세그먼트 정보 */
    currentSegment: {
        segmentIndex: number;
        bookIdx: number;
        bookTitle?: string;
        sectionId: string;
        sectionTitle?: string;
        startedAt: number;
    };
    /** 세션 내 모든 세그먼트 요약 */
    segments: UnifiedSegmentSummary[];
}
/** 세그먼트 변경 알림 (섹션 변경 시) */
export interface SessionSegmentChangedPayload {
    readingSessionId: string;
    /** 종료된 세그먼트 인덱스 */
    oldSegmentIndex: number;
    /** 새로 시작된 세그먼트 */
    newSegment: {
        segmentIndex: number;
        bookIdx: number;
        bookTitle?: string;
        sectionId: string;
        sectionTitle?: string;
        startedAt: number;
    };
}
/** 세션 이력 목록 조회 요청 */
export interface SessionHistoryListPayload {
    familyId?: number;
    childIdx?: number;
    date?: string;
    limit?: number;
    offset?: number;
}
/** 세션 이력 상세 조회 요청 */
export interface SessionHistoryGetPayload {
    readingSessionId: string;
    s3Key?: string;
}
/** 세션 이력 삭제 요청 */
export interface SessionHistoryDeletePayload {
    readingSessionId: string;
    s3Key?: string;
}
/** 통합 청크 조회 요청 (seek/재생용) */
export interface UnifiedChunksGetPayload {
    readingSessionId: string;
    segmentIndex: number;
    /** 시작 timestamp (이 시점부터 청크 조회) */
    fromTimestamp?: number;
    /** 종료 timestamp (이 시점까지 청크 조회) */
    toTimestamp?: number;
}
/** 통합 세그먼트 상세 조회 요청 */
export interface UnifiedSegmentGetPayload {
    readingSessionId: string;
    segmentIndex: number;
}
/** 세션 이력 목록 결과 */
export interface SessionHistoryListResult {
    sessions: UnifiedSessionManifest[];
    total: number;
    hasMore: boolean;
}
/** 세션 이력 상세 결과 (재생용 — 전체 청크 포함) */
export interface SessionHistoryGetResult {
    manifest: UnifiedSessionManifest;
    /** 세그먼트별 전체 청크 (재생용) */
    chunks?: UnifiedChunkFile[];
    /** 청크에서 추출한 전체 이벤트 (편의용) */
    events?: ViewerEvent[];
}
/** 청크 조회 결과 */
export interface UnifiedChunksResult {
    readingSessionId: string;
    segmentIndex: number;
    chunks: UnifiedChunkFile[];
    /** Seek 시 가장 가까운 스냅샷 (초기 상태 복원용) */
    nearestSnapshot: ViewerSnapshot | null;
}
/** 세그먼트 상세 결과 */
export interface UnifiedSegmentResult {
    readingSessionId: string;
    segment: UnifiedSegmentMeta;
}
/** 세션 삭제 결과 */
export interface SessionHistoryDeleteResult {
    readingSessionId: string;
    success: boolean;
}
/**
 * 활성 통합 세션 (서버 메모리)
 * - 기존 ActiveRecording + SessionChunkState 대체
 */
export interface ActiveUnifiedSession {
    readingSessionId: string;
    s3Prefix: string;
    childIdx: number;
    childName: string;
    familyId: number;
    viewerSocketId: string;
    startedAt: number;
    currentSegment: ActiveUnifiedSegment | null;
    completedSegments: UnifiedSegmentSummary[];
    totalEvents: number;
    chunkIntervalHandle: ReturnType<typeof setInterval> | null;
}
/**
 * 활성 세그먼트 (서버 메모리)
 * - 하나의 섹션을 읽는 동안의 버퍼 상태
 */
export interface ActiveUnifiedSegment {
    segmentIndex: number;
    bookIdx: number;
    bookTitle?: string;
    sectionId: string;
    sectionTitle?: string;
    startedAt: number;
    eventBuffer: ViewerEvent[];
    gazeBuffer: GazeBatch[];
    chunkStartTimestamp: number;
    /** 현재 청크 시작 시점의 스냅샷 (청크에 포함됨) */
    chunkStartSnapshot: ViewerSnapshot | null;
    /** 가장 최근 스냅샷 (다음 청크의 시작 스냅샷으로 사용) */
    lastSnapshot: ViewerSnapshot | null;
    chunks: ChunkRef[];
    totalEvents: number;
    totalGazeSamples: number;
}
/**
 * 라이브 batch 페이로드 (CR_app → server → watchers).
 * - events 있으면 reliable emit, gaze만이면 volatile emit
 * - gazeSamples: flat [x, y, t, x, y, t, ...] (저장과 동일 포맷)
 */
export interface LiveBatchPayload {
    readingSessionId: string;
    /** flat [x, y, t, ...]. 100ms 동안 누적된 gaze samples */
    gazeSamples?: number[];
    /** 100ms 동안 발생한 viewer events */
    events?: ViewerEvent[];
    /** publisher 측 batch 종료 timestamp */
    clientTs: number;
}
/**
 * Watcher mid-join 응답 (server → 단일 watcher).
 * chunkStartSnapshot은 anchor, bufferedEvents/bufferedGaze는 chunk 시작~now 누적.
 */
export interface LiveInitialPayload {
    readingSessionId: string;
    segmentIndex: number;
    chunkStartTs: number;
    chunkStartSnapshot: ViewerSnapshot;
    /** chunk 시작 ~ 현재 누적 events */
    bufferedEvents: ViewerEvent[];
    /** chunk 시작 ~ 현재 누적 gaze */
    bufferedGaze: GazeBatch[];
    /** 서버 응답 시각 (clock sync용) */
    serverTs: number;
}
/**
 * Chunk 경계에서 새 anchor 통지 (server → watchers).
 * watcher는 이 신호로 currentChunkStartTs 갱신 + snapshot 재적용.
 */
export interface LiveChunkRolledPayload {
    readingSessionId: string;
    segmentIndex: number;
    newChunkStartTs: number;
    newChunkStartSnapshot: ViewerSnapshot;
}
/**
 * Publisher → emit on/off 신호 (시청자 0명 최적화, Phase 7).
 */
export interface LiveEmitToggle {
    readingSessionId: string;
}
/** 1초마다 live 시청자에게 emit — 실시간 읽기 상태 비율 */
export interface LiveReadingRatiosPayload {
    readingSessionId: string;
    /** 최근 구간의 읽기 상태 비율 */
    ratios: ReadingStateRatios;
    /** 세션 시작 이후 경과 시간 (ms) */
    elapsedMs: number;
    /** 타임스탬프 */
    timestamp: number;
}
