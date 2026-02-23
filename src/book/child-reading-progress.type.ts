// src/book/child-reading-progress.type.ts
// 자녀 읽기 진행 데이터 — MongoDB 5컬렉션 + WS/REST 타입

// ═══════════════════════════════════════════════════════════════
// 기본 단위
// ═══════════════════════════════════════════════════════════════

/** 읽은 구간 (globalIndex 범위, inclusive) */
export interface ReadRange {
  from: number;
  to: number;
}

/** 캘리브레이션 종류 */
export type CalibrationType = 'quick' | 'full';

/** 섹션 읽기 중 발생한 캘리브레이션 기간 */
export interface CalibrationPeriod {
  type: CalibrationType;
  /** 사용한 포인트 수 (quick: 1~2, full: 5) */
  points: number;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  /** 캘리브레이션 결과 품질 (0~1, 기기 제공) */
  quality?: number;
}

// ═══════════════════════════════════════════════════════════════
// WS 전송: ReadingProgressReport
// 5초마다 + visibilitychange + pagehide
// ═══════════════════════════════════════════════════════════════

export interface ReadingProgressReport {
  bookIdx: number;
  sectionId: string;
  /** 섹션 전체 GI 수 (ViewerSnapshot.totalItems) */
  sectionGIMax: number;

  /** 이 구간에서 뷰포트에 표시된 GI 범위의 최소값 */
  scrolledFrom: number;
  /** 이 구간에서 뷰포트에 표시된 GI 범위의 최대값 */
  scrolledTo: number;

  /**
   * GI별 시선 dwell time (ms)
   * - 키: globalIndex (string), 값: 해당 5초 윈도우 내 누적 dwell ms
   * - 임계값 필터링 없이 전체 포함 (서버에서 threshold 적용)
   * - 시선 추적 기기 없으면 빈 객체 {}
   *
   * 예: { "101": 300, "102": 450, "103": 67 }
   */
  gazeDwellMap: Record<string, number>;

  /** 이 구간 내 눈 깜빡임 횟수 (Tobii valid 전환 감지) */
  blinkCount: number;

  /** 소요 시간 ms */
  durationMs: number;
}

// ═══════════════════════════════════════════════════════════════
// 컬렉션 1: child_section_progress
// key: { childIdx, bookIdx, sectionId } unique
// 역할: 섹션별 누적 진행 (ranges, coverage, calibration 이력)
// ═══════════════════════════════════════════════════════════════

export interface ChildSectionProgress {
  childIdx: number;
  bookIdx: number;
  sectionId: string;
  sectionGIMax: number;

  // ─── 스크롤 구간 (관대) ───
  scrolledRanges: ReadRange[];
  scrolledCount: number;
  scrolledCoverage: number; // 0~1

  // ─── 시선 확인 구간 (엄격, dwell ≥ threshold) ───
  gazeReadRanges: ReadRange[];
  gazeReadCount: number;
  gazeReadCoverage: number; // 0~1

  // ─── 시간 + 위치 ───
  totalReadMs: number;
  lastGlobalIndex: number;
  lastReadAt: string;

  // ─── 눈 깜빡임 ───
  totalBlinks: number;

  // ─── 이 섹션 읽기 중 발생한 캘리브레이션 ───
  calibrations: CalibrationPeriod[];

  createdAt: string;
  updatedAt: string;
}

// ═══════════════════════════════════════════════════════════════
// 컬렉션 2: child_book_bookmark
// key: { childIdx, bookIdx } unique
// 역할: 이어보기 + 책 전체 통계 캐시
// ═══════════════════════════════════════════════════════════════

export interface ChildBookBookmark {
  childIdx: number;
  bookIdx: number;

  lastReadSectionId: string;
  lastGlobalIndex: number;

  // ─── 캐시 (세션 종료 시 갱신) ───
  totalGIMax: number;
  totalScrolledCount: number;
  totalScrolledCoverage: number; // 0~1
  totalGazeReadCount: number;
  totalGazeReadCoverage: number; // 0~1

  createdAt: string;
  updatedAt: string;
}

// ═══════════════════════════════════════════════════════════════
// 컬렉션 3: child_reading_logs
// key: _id (append-only)
// 역할: raw report 보존 (시간축 분석: 일별/월별/학생비교)
// index: { childIdx: 1, createdAt: -1 }
// ═══════════════════════════════════════════════════════════════

export interface ChildReadingLog {
  childIdx: number;
  bookIdx: number;
  sectionId: string;
  scrolledFrom: number;
  scrolledTo: number;
  /** 전체 dwell map 그대로 보존 */
  gazeDwellMap: Record<string, number>;
  blinkCount: number;
  durationMs: number;
  createdAt: string;
}

// ═══════════════════════════════════════════════════════════════
// 컬렉션 4: child_calibration_logs
// key: _id (append-only)
// 역할: 캘리브레이션 이력 (독립 컬렉션, 세션/섹션 무관하게 조회 가능)
// index: { childIdx: 1, createdAt: -1 }
// ═══════════════════════════════════════════════════════════════

export interface ChildCalibrationLog {
  childIdx: number;
  /** 읽기 세션 중 발생 시 세션 ID */
  sessionId?: string;
  /** 읽기 중이었던 섹션 */
  sectionId?: string;
  type: CalibrationType;
  /** 사용한 포인트 수 */
  points: number;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  quality?: number;
  createdAt: string;
}

// ═══════════════════════════════════════════════════════════════
// 세그먼트 요약 (ChildReadingSessionSummary 내 embedded)
// 세그먼트 = 세션 내 1개 섹션 읽기 구간
// ═══════════════════════════════════════════════════════════════

export interface SegmentReadingSummary {
  sectionId: string;
  bookIdx: number;
  sectionGIMax: number;
  startedAt: string;
  endedAt: string;
  durationMs: number;

  // 커버리지
  scrolledFrom: number;
  scrolledTo: number;
  scrolledGICount: number;
  gazeReadGICount: number;

  // 집중도/속도
  /** gazeReadGICount / scrolledGICount (시선 없으면 null) */
  focusRatio: number | null;
  /** 평균 읽기 속도 (GI per minute) */
  readingSpeedGPM: number;
  /** 평균 dwell time (ms per GI) */
  avgDwellMs: number | null;

  // 깜빡임
  totalBlinks: number;
  /** 분당 깜빡임 횟수 */
  blinksPerMinute: number;

  // 이 세그먼트 중 발생한 캘리브레이션
  calibrations: CalibrationPeriod[];
}

// ═══════════════════════════════════════════════════════════════
// 컬렉션 5: child_reading_sessions
// key: { childIdx, sessionId } unique
// 역할: 세션 전체 요약 (세션 종료 시 생성)
// ═══════════════════════════════════════════════════════════════

export interface ChildReadingSessionSummary {
  childIdx: number;
  sessionId: string;
  startedAt: string;
  endedAt: string;
  totalDurationMs: number;

  segments: SegmentReadingSummary[];

  // 세션 전체 통계
  totalScrolledGICount: number;
  totalGazeReadGICount: number;
  overallFocusRatio: number | null;
  avgReadingSpeedGPM: number;
  totalBlinks: number;
  avgBlinksPerMinute: number;
}

// ═══════════════════════════════════════════════════════════════
// REST 응답
// ═══════════════════════════════════════════════════════════════

/** GET /api/reading-progress/:bookIdx */
export interface ChildBookProgressResponse {
  bookmark: ChildBookBookmark | null;
  sections: ChildSectionProgress[];
}

/** 일별 읽기 통계 (aggregation 결과) */
export interface DailyReadingStat {
  date: string; // YYYY-MM-DD
  totalMs: number;
  books: number[];
}

/** GET /api/reading-progress/daily-stats */
export interface DailyReadingStatsResponse {
  childIdx: number;
  from: string;
  to: string;
  stats: DailyReadingStat[];
}
