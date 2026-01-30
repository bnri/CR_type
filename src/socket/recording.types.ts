// src/socket/recording.types.ts
// P2.2: S3 녹화 시스템 타입 정의
//
// 구조:
// - Recording (Request 단위): Admin/Parent가 모니터링 요청 ~ 종료
// - Segment (뷰어 열림 단위): 뷰어 열기 ~ 닫기 (섹션 변경 포함)
//
// S3 경로:
// live-recordings/{familyId}/{viewerUserId}/{recordingId}/
//   ├── manifest.json              (RecordingManifest)
//   └── segments/
//       ├── 0/
//       │   ├── meta.json          (SegmentMeta)
//       │   ├── snapshots/{ts}.json
//       │   └── chunks/{startTs}-{endTs}.json
//       └── 1/
//           └── ...

import type { ViewerSnapshot } from './reading-section.types';
import type { ViewerEvent } from './viewer-events.types';

// ═══════════════════════════════════════════════════════════════════════════
// 기본 타입
// ═══════════════════════════════════════════════════════════════════════════

/** 녹화 요청자 타입 */
export type RecordingRequesterType = 'admin' | 'parent';

/** 뷰어 사용자 타입 (실제로 책 읽는 사람) */
export type ViewerUserType = 'parent' | 'child';

/** 녹화 상태 */
export type RecordingStatus = 'recording' | 'ended';

/** 세그먼트 상태 */
export type SegmentStatus = 'active' | 'ended';

// ═══════════════════════════════════════════════════════════════════════════
// Chunk & Snapshot 파일 타입
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 청크 파일 (S3: segments/{n}/chunks/{startTs}-{endTs}.json)
 * - 10초 단위 이벤트 묶음
 * - snapshot: 청크 시작 시점의 뷰어 상태 (Seek 시 초기화용)
 */
export interface ChunkFile {
  startTimestamp: number;
  endTimestamp: number;
  events: ViewerEvent[];
  /** 청크 시작 시점의 뷰어 상태 (Seek 시 이 상태로 초기화 후 이벤트 재생) */
  snapshot?: ViewerSnapshot;
}

/**
 * 스냅샷 파일 (S3: segments/{n}/snapshots/{ts}.json)
 * - 30초 단위 뷰어 전체 상태
 * - Seek 시 이 시점부터 재생 가능
 */
export interface SnapshotFile {
  timestamp: number;
  viewerState: ViewerSnapshot;
}

/** 청크 참조 정보 (meta.json 내) */
export interface ChunkRef {
  start: number;
  end: number;
  key: string;
  eventCount: number;
}

/** 스냅샷 참조 정보 (meta.json 내) */
export interface SnapshotRef {
  timestamp: number;
  key: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// SegmentMeta - 뷰어 열림 단위 (segments/{n}/meta.json)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 세그먼트 메타데이터
 * - 뷰어가 열린 하나의 구간
 * - 뷰어 열기 → 닫기 (또는 섹션 변경)
 */
export interface SegmentMeta {
  /** 세그먼트 인덱스 (0부터) */
  segmentIndex: number;
  /** 상태 */
  status: SegmentStatus;

  // ─── 소켓 정보 ───
  /** 뷰어 소켓 세션 ID */
  socketSessionId: string;

  // ─── 책/섹션 정보 ───
  bookIdx: number;
  bookTitle?: string;
  sectionId: string;
  sectionTitle?: string;

  // ─── 시간 정보 ───
  /** 뷰어 열린 시간 (ms) */
  startedAt: number;
  /** 뷰어 닫힌 시간 (ms), null이면 진행중 */
  endedAt: number | null;
  /** 마지막 업데이트 */
  updatedAt: number;

  // ─── 청크/스냅샷 참조 ───
  chunks: ChunkRef[];
  snapshots: SnapshotRef[];

  // ─── 통계 ───
  totalEvents: number;
  durationMs: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// RecordingManifest - 요청 단위 (manifest.json)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 세그먼트 요약 정보 (manifest 내)
 * - Seek 시 이 정보로 어떤 segment를 봐야 할지 판단
 * - 전체 정보는 segments/{n}/meta.json 참조
 */
export interface SegmentSummary {
  /** 세그먼트 인덱스 (0부터, 시간순) */
  segmentIndex: number;
  /** 상태 */
  status: SegmentStatus;

  // ─── 책/섹션 정보 ───
  bookIdx: number;
  bookTitle?: string;
  sectionId: string;
  sectionTitle?: string;

  // ─── 시간 범위 (Seek 판단용) ───
  /** 세그먼트 시작 timestamp (ms) - 이 시간 이후 이벤트는 이 segment에 */
  startedAt: number;
  /** 세그먼트 종료 timestamp (ms) - null이면 진행중 (Live) */
  endedAt: number | null;
  /** 세그먼트 길이 (ms) - endedAt이 null이면 현재까지 길이 */
  durationMs: number;

  // ─── 통계 ───
  chunkCount: number;
  eventCount: number;

  // ─── S3 참조 ───
  /** meta.json S3 key */
  metaKey: string;
}

/**
 * 녹화 Manifest (전체 요청 단위)
 * - Admin/Parent가 모니터링 시작 → 종료까지
 * - S3: manifest.json
 */
export interface RecordingManifest {
  /** 녹화 ID */
  recordingId: string;
  /** 상태 */
  status: RecordingStatus;

  // ─── 요청자 정보 (녹화 시작한 사람) ───
  requestedBy: RecordingRequesterType;
  requesterSocketId: string;
  requesterId?: number;
  requesterName?: string;

  // ─── 뷰어 정보 (감시 대상) ───
  viewerUserId: number;
  viewerUserType: ViewerUserType;
  viewerUserName: string;
  familyId: number;

  // ─── 시간 정보 ───
  /** 요청 시작 시간 (불변, Admin/Parent가 모니터링 시작한 시점) */
  requestedAt: number;
  /** 요청 종료 시간 (Admin/Parent가 모니터링 종료한 시점) */
  endedAt: number | null;
  /** 마지막 업데이트 */
  updatedAt: number;

  // ─── 실제 녹화 시간 범위 (Seek 범위 계산용) ───
  /** 첫 번째 세그먼트 시작 시간 (실제 녹화 시작) */
  firstSegmentStartedAt: number | null;
  /** 마지막 세그먼트 종료 시간 (실제 녹화 끝, null이면 Live) */
  lastSegmentEndedAt: number | null;

  // ─── 세그먼트 목록 (시간순 정렬) ───
  /** segments[0].startedAt < segments[1].startedAt < ... */
  segments: SegmentSummary[];

  // ─── 통계 ───
  totalSegments: number;
  totalChunks: number;
  totalEvents: number;
  /** 실제 녹화 시간 합계 (Gap 제외) */
  totalDurationMs: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// WebSocket 이벤트 페이로드
// ═══════════════════════════════════════════════════════════════════════════

// ─── Admin/Parent → Server ───

/** 녹화 시작 요청 */
export interface RecordingStartPayload {
  targetSocketId: string;
}

/** 녹화 중지 요청 */
export interface RecordingStopPayload {
  targetSocketId: string;
}

// ─── Server → Admin/Parent ───

/** 녹화 시작됨 */
export interface RecordingStartedPayload {
  recordingId: string;
  requestedAt: number;
  viewerInfo: {
    userId: number;
    userType: ViewerUserType;
    userName: string;
    familyId: number;
  };
  /** 현재 활성 세그먼트 (뷰어가 열려있으면, 여기에 책/섹션 정보 포함) */
  currentSegment: SegmentMeta | null;
}

/** 녹화 종료됨 */
export interface RecordingStoppedPayload {
  recordingId: string;
  endedAt: number;
  stats: {
    totalSegments: number;
    totalChunks: number;
    totalEvents: number;
    totalDurationMs: number;
  };
}

/** 실시간 청크 전송 */
export interface RecordingChunkPayload {
  recordingId: string;
  segmentIndex: number;
  chunk: ChunkFile;
  snapshot?: ViewerSnapshot;
}

/** 실시간 이벤트 relay (라이브 모니터링용, 청크 대기 없이 즉시 전송) */
export interface RecordingLiveEventsPayload {
  recordingId: string;
  segmentIndex: number;
  events: ViewerEvent[];
}

/** 세그먼트 시작됨 (뷰어 열림) */
export interface SegmentStartedPayload {
  recordingId: string;
  segment: SegmentMeta;
}

/** 세그먼트 종료됨 (뷰어 닫힘) */
export interface SegmentEndedPayload {
  recordingId: string;
  segmentIndex: number;
  endedAt: number;
}

// ─── 녹화 조회 (재생용) Admin/Parent → Server ───

/** 녹화 목록 조회 요청 */
export interface RecordingListPayload {
  /** 조회할 가족 ID (Admin은 모든 가족, Parent는 자신의 가족만) */
  familyId?: number;
  /** 조회할 뷰어 사용자 ID */
  viewerUserId?: number;
  /** 상태 필터 */
  status?: RecordingStatus;
  /** 페이지네이션 */
  limit?: number;
  offset?: number;
}

/** 녹화 상세 조회 요청 */
export interface RecordingGetPayload {
  recordingId: string;
}

/** 세그먼트 상세 조회 요청 */
export interface SegmentGetPayload {
  recordingId: string;
  segmentIndex: number;
}

/** 청크 조회 요청 (재생용) */
export interface ChunksGetPayload {
  recordingId: string;
  segmentIndex: number;
  /** 시작 timestamp (이 시점부터 청크 조회) */
  fromTimestamp?: number;
  /** 종료 timestamp (이 시점까지 청크 조회) */
  toTimestamp?: number;
}

// ─── 녹화 조회 응답 Server → Admin/Parent ───

/** 녹화 목록 조회 결과 */
export interface RecordingListResultPayload {
  recordings: RecordingManifest[];
  total: number;
  hasMore: boolean;
}

/** 녹화 상세 조회 결과 */
export interface RecordingManifestPayload {
  manifest: RecordingManifest;
}

/** 세그먼트 상세 조회 결과 */
export interface SegmentMetaPayload {
  recordingId: string;
  segment: SegmentMeta;
}

/** 청크 조회 결과 */
export interface ChunksResultPayload {
  recordingId: string;
  segmentIndex: number;
  chunks: ChunkFile[];
  /** 요청 시점에 가장 가까운 스냅샷 (Seek 시 초기 상태 복원용) */
  nearestSnapshot: SnapshotFile | null;
}

// ═══════════════════════════════════════════════════════════════════════════
// REST API 타입
// ═══════════════════════════════════════════════════════════════════════════

/** 녹화 목록 조회 응답 */
export interface RecordingListResponse {
  recordings: RecordingManifest[];
}

/** 녹화 상세 조회 응답 */
export interface RecordingDetailResponse {
  manifest: RecordingManifest;
}

/** 세그먼트 상세 조회 응답 */
export interface SegmentDetailResponse {
  segment: SegmentMeta;
}

/** 청크 조회 파라미터 */
export interface ChunksQueryParams {
  segmentIndex: number;
  from?: number;
  to?: number;
}

/** 청크 조회 응답 */
export interface ChunksResponse {
  chunks: ChunkFile[];
  nearestSnapshot?: SnapshotFile;
}

// ═══════════════════════════════════════════════════════════════════════════
// 서버 메모리 상태 (CR_ws 내부용)
// ═══════════════════════════════════════════════════════════════════════════

/** 활성 녹화 (서버 메모리) */
export interface ActiveRecording {
  recordingId: string;
  s3Prefix: string;

  // 요청자
  requestedBy: RecordingRequesterType;
  requesterSocketId: string;
  requesterId?: number;
  requesterName?: string;

  // 뷰어
  viewerUserId: number;
  viewerUserType: ViewerUserType;
  viewerUserName: string;
  familyId: number;
  viewerSocketId: string;

  // 시간
  requestedAt: number;

  // 세그먼트
  currentSegment: ActiveSegment | null;
  completedSegments: SegmentSummary[];

  // 통계
  totalEvents: number;

  // 인터벌
  chunkIntervalHandle: ReturnType<typeof setInterval> | null;
  snapshotIntervalHandle: ReturnType<typeof setInterval> | null;
}

/** 활성 세그먼트 (서버 메모리) */
export interface ActiveSegment {
  segmentIndex: number;
  socketSessionId: string;
  bookIdx: number;
  bookTitle?: string;
  sectionId: string;
  sectionTitle?: string;
  startedAt: number;

  // 버퍼
  eventBuffer: ViewerEvent[];
  chunkStartTimestamp: number;
  /** 현재 청크 시작 시점의 스냅샷 (청크에 포함됨) */
  chunkStartSnapshot: ViewerSnapshot | null;
  /** 가장 최근 스냅샷 (30초 인터벌 저장용) */
  lastSnapshot: ViewerSnapshot | null;

  // 완료된 청크/스냅샷
  chunks: ChunkRef[];
  snapshots: SnapshotRef[];

  // 통계
  totalEvents: number;
}
