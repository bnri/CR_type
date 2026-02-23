// src/socket/unified-session.types.ts
// 통합 읽기 세션 시스템 타입 정의 (v2)
//
// 기존 ReadingSessionService + RecordingService를 하나로 통합
//
// 핵심 변경:
// - 세션 = 뷰어 열림~닫힘 (섹션 변경은 세그먼트)
// - 자동 녹화 (Admin recording:start 제거)
// - 시선 데이터(~30FPS) 청크에 배치 저장
// - Parent + Admin 동일한 subscribe 체계
//
// S3 경로:
// reading-sessions/{familyId}/{userId}/{YYYY-MM-DD}/{sessionId}/
//   ├── manifest.json                    (UnifiedSessionManifest)
//   └── segments/
//       ├── 0/
//       │   ├── meta.json                (UnifiedSegmentMeta)
//       │   └── chunks/{startTs}-{endTs}.json  (UnifiedChunkFile)
//       └── 1/
//           └── ...

import type { ViewerSnapshot, SessionMeta, SessionStats } from './reading-section.types';
import type { ViewerEvent } from './viewer-events.types';

// ═══════════════════════════════════════════════════════════════════════════
// 기본 참조 타입
// ═══════════════════════════════════════════════════════════════════════════

/** 청크 참조 정보 (meta.json 내) */
export interface ChunkRef {
  start: number;
  end: number;
  key: string;
  eventCount: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// 기본 상태 타입
// ═══════════════════════════════════════════════════════════════════════════

/** 통합 세션 상태 */
export type UnifiedSessionStatus = 'active' | 'ended';

/** 통합 세그먼트 상태 */
export type UnifiedSegmentStatus = 'active' | 'ended';

// ═══════════════════════════════════════════════════════════════════════════
// 시선 데이터 (Gaze Tracking)
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// UnifiedChunkFile — 통합 청크 파일
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 통합 청크 파일 (S3: segments/{n}/chunks/{startTs}-{endTs}.json)
 * - 10초 단위 이벤트 + 시선 데이터 묶음
 * - snapshot: 청크 시작 시점의 뷰어 상태 (Seek 시 초기화용)
 * - gazeData: 시선 추적 배치 데이터 (활성 시에만)
 */
export interface UnifiedChunkFile {
  startTimestamp: number;
  endTimestamp: number;
  events: ViewerEvent[];
  /** 청크 시작 시점의 뷰어 상태 (Seek 시 이 상태로 초기화 후 이벤트 재생) */
  snapshot?: ViewerSnapshot;
  /** 시선 추적 데이터 배치 (~30FPS, 활성 시에만 포함) */
  gazeData?: GazeBatch[];
}

// ═══════════════════════════════════════════════════════════════════════════
// UnifiedSegmentMeta — 세그먼트 메타 (segments/{n}/meta.json)
// ═══════════════════════════════════════════════════════════════════════════

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

  // ─── 책/섹션 정보 ───
  bookIdx: number;
  bookTitle?: string;
  sectionId: string;
  sectionTitle?: string;

  // ─── 시간 정보 ───
  /** 세그먼트 시작 시간 (ms) */
  startedAt: number;
  /** 세그먼트 종료 시간 (ms), null이면 진행중 */
  endedAt: number | null;
  /** 마지막 업데이트 */
  updatedAt: number;

  // ─── 청크 참조 ───
  chunks: ChunkRef[];

  // ─── 통계 ───
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

  // ─── 책/섹션 정보 ───
  bookIdx: number;
  bookTitle?: string;
  sectionId: string;
  sectionTitle?: string;

  // ─── 시간 범위 (Seek 판단용) ───
  /** 세그먼트 시작 timestamp (ms) */
  startedAt: number;
  /** 세그먼트 종료 timestamp (ms) - null이면 진행중 (Live) */
  endedAt: number | null;
  /** 세그먼트 길이 (ms) */
  durationMs: number;

  // ─── 통계 ───
  chunkCount: number;
  eventCount: number;

  // ─── S3 참조 ───
  /** meta.json S3 key */
  metaKey: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// UnifiedSessionManifest — 통합 세션 매니페스트 (manifest.json)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 통합 세션 매니페스트
 * - 뷰어 열림 → 닫힘까지가 하나의 세션
 * - 섹션 변경은 세그먼트로 기록
 * - 기존 ReadingSessionRecord + RecordingManifest 대체
 */
export interface UnifiedSessionManifest {
  /** 세션 ID (UUID) */
  sessionId: string;
  /** 상태 */
  status: UnifiedSessionStatus;
  /** 스키마 버전 (구 포맷과 구분용, 항상 2) */
  version: 2;

  // ─── 사용자 정보 ───
  userId: number;
  userType: 'parent' | 'child';
  userName: string;
  familyId: number;

  // ─── 시간 정보 ───
  /** 세션 시작 시간 (뷰어 열림, ms) */
  startedAt: number;
  /** 세션 종료 시간 (뷰어 닫힘, ms), null이면 진행중 */
  endedAt: number | null;
  /** 마지막 업데이트 */
  updatedAt: number;

  // ─── 세그먼트 목록 (시간순) ───
  segments: UnifiedSegmentSummary[];

  // ─── 통계 ───
  totalSegments: number;
  totalChunks: number;
  totalEvents: number;
  /** 실제 활동 시간 합계 (ms, 세그먼트 간 갭 제외) */
  totalDurationMs: number;

  // ─── 스냅샷 ───
  /** 세션 최초 스냅샷 */
  initialSnapshot?: ViewerSnapshot;
  /** 세션 최종 스냅샷 */
  finalSnapshot?: ViewerSnapshot;

  /** 구 포맷에서 변환된 경우 true */
  migrated?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// Client → Server 페이로드
// ═══════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════
// Server → Client 응답 (Admin/Parent에게)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 통합 세션 정보 (실시간 활성 세션)
 * - ReadingSessionInfo 대체
 * - 현재 세그먼트 정보 포함
 */
export interface UnifiedSessionInfo {
  sessionId: string;
  userId: number;
  userType: 'parent' | 'child';
  userName?: string;
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
  sessionId: string;
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

// ═══════════════════════════════════════════════════════════════════════════
// Admin/Parent → Server 조회 페이로드
// ═══════════════════════════════════════════════════════════════════════════

/** 세션 이력 목록 조회 요청 */
export interface SessionHistoryListPayload {
  familyId?: number;
  userId?: number;
  date?: string;
  limit?: number;
  offset?: number;
}

/** 세션 이력 상세 조회 요청 */
export interface SessionHistoryGetPayload {
  sessionId: string;
  s3Key?: string;
}

/** 세션 이력 삭제 요청 */
export interface SessionHistoryDeletePayload {
  sessionId: string;
  s3Key?: string;
}

/** 통합 청크 조회 요청 (seek/재생용) */
export interface UnifiedChunksGetPayload {
  sessionId: string;
  segmentIndex: number;
  /** 시작 timestamp (이 시점부터 청크 조회) */
  fromTimestamp?: number;
  /** 종료 timestamp (이 시점까지 청크 조회) */
  toTimestamp?: number;
}

/** 통합 세그먼트 상세 조회 요청 */
export interface UnifiedSegmentGetPayload {
  sessionId: string;
  segmentIndex: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// Server → Admin/Parent 조회 응답
// ═══════════════════════════════════════════════════════════════════════════

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
  sessionId: string;
  segmentIndex: number;
  chunks: UnifiedChunkFile[];
  /** Seek 시 가장 가까운 스냅샷 (초기 상태 복원용) */
  nearestSnapshot: ViewerSnapshot | null;
}

/** 세그먼트 상세 결과 */
export interface UnifiedSegmentResult {
  sessionId: string;
  segment: UnifiedSegmentMeta;
}

/** 세션 삭제 결과 */
export interface SessionHistoryDeleteResult {
  sessionId: string;
  success: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════
// 서버 메모리 상태 (CR_ws 내부용)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 활성 통합 세션 (서버 메모리)
 * - 기존 ActiveRecording + SessionChunkState 대체
 */
export interface ActiveUnifiedSession {
  sessionId: string;
  s3Prefix: string;

  // 사용자 정보
  userId: number;
  userType: 'parent' | 'child';
  userName: string;
  familyId: number;
  viewerSocketId: string;

  // 시간
  startedAt: number;

  // 세그먼트
  currentSegment: ActiveUnifiedSegment | null;
  completedSegments: UnifiedSegmentSummary[];

  // 통계
  totalEvents: number;

  // 구독자 (admin + parent socketId)
  subscribers: Set<string>;

  // 인터벌
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

  // 이벤트 버퍼
  eventBuffer: ViewerEvent[];
  // 시선 데이터 버퍼
  gazeBuffer: GazeBatch[];

  // 청크 관련
  chunkStartTimestamp: number;
  /** 현재 청크 시작 시점의 스냅샷 (청크에 포함됨) */
  chunkStartSnapshot: ViewerSnapshot | null;
  /** 가장 최근 스냅샷 (다음 청크의 시작 스냅샷으로 사용) */
  lastSnapshot: ViewerSnapshot | null;

  // 완료된 청크
  chunks: ChunkRef[];

  // 통계
  totalEvents: number;
  totalGazeSamples: number;
}
