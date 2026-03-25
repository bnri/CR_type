// src/book/child-reading-progress.type.ts
// 읽기 진행 데이터 v2 — MongoDB 2컬렉션 + Redis 실시간 + WS/REST 타입
//
// MongoDB: reading_sessions (세션당 1개) + book_progress (책별 1개)
// Redis: reading:live:{testeeIdx} (실시간 부모 모니터링)

// ═══════════════════════════════════════════════════════════════
// 기본 단위
// ═══════════════════════════════════════════════════════════════

/** 읽은 구간 (globalIndex 범위, inclusive) */
export interface ReadRange {
  from: number;
  to: number;
}

/** 퀴즈 시도 결과 (개별 퀴즈, 서버 저장용) */
export interface QuizAttemptResult {
  quizId: string;
  /** 획득 점수 */
  score: number;
  /** 만점 */
  maxScore: number;
  isCorrect: boolean;
  /** 소요 시간 (ms) */
  timeMs: number;
  /** 타임아웃 여부 */
  timedOut: boolean;
  attemptedAt: string;
}

/** 문항별 퀴즈 결과 (뷰어 콜백용, 선택지 포함) */
export interface QuizQuestionResult {
  qid: string;
  index: number;
  question?: string;
  score: number;
  isCorrect: boolean;
  selected: number[];
  correctIdxes: number[];
  /** 소요 시간 (ms) */
  ms: number;
  timedOut: boolean;
}

/** 섹션 퀴즈 전체 결과 (뷰어 onQuizComplete 콜백) */
export interface QuizResult {
  sectionId: string;
  /** 총 문항 수 */
  total: number;
  /** 정답 수 */
  correct: number;
  /** 정답률 (0~1) */
  rate: number;
  /** 배점 합계 */
  totalScore: number;
  /** 획득 점수 합계 */
  gainedScore: number;
  /** 총 소요 시간 (ms) */
  timeMsTotal: number;
  perQuestion: QuizQuestionResult[];
}

/** 찾아본 단어 기록 */
export interface LookedUpWord {
  /** 원문 텍스트 */
  text: string;
  /** 시작 GI */
  startGI: number;
  /** 끝 GI */
  endGI: number;
  /** 번역 결과 (있으면) */
  translatedText?: string;
  lookedUpAt: string;
}

/** 읽기 상태 비율 (세션 전체) */
export interface ReadingStateRatios {
  reading: number;    // 0~1
  scanning: number;
  blink: number;
  away: number;
  lost: number;
  etc: number;
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
  exposedFrom: number;
  /** 이 구간에서 뷰포트에 표시된 GI 범위의 최대값 */
  exposedTo: number;

  /**
   * GI별 시선 dwell time (ms)
   * - 키: globalIndex (string), 값: 해당 5초 윈도우 내 누적 dwell ms
   * - 시선 추적 기기 없으면 빈 객체 {}
   */
  gazeDwellMap: Record<string, number>;

  /** 이 구간 내 눈 깜빡임 횟수 */
  blinkCount: number;

  /** 이 구간에서 시선이 텍스트([data-g]) 위에 있었던 시간 (ms) */
  gazeOnTextMs: number;

  /** 오디오 재생 중 시선이 현재 하이라이트 GI 근처에 있었던 시간 (ms) */
  gazeAlignedMs: number | null;
  /** 오디오 재생 중 시선추적이 활성이었던 총 시간 (ms) */
  audioGazeActiveMs: number | null;

  /** 이 구간에서 찾아본 단어 */
  lookedUpWords: LookedUpWord[];

  /** 이 구간에서 완료한 퀴즈 */
  quizResults: QuizAttemptResult[];

  /** 소요 시간 ms */
  durationMs: number;

  /** 실시간 세션 상태 — 서버 Redis 저장용 (5초마다 갱신) */
  liveState?: LiveReadingState;
}

// ═══════════════════════════════════════════════════════════════
// 세그먼트 스냅샷 (ReadingSessionRecord 내 embedded, SEG당)
// ═══════════════════════════════════════════════════════════════

/** 읽기세션 내 1개 섹션 읽기 구간 스냅샷 */
export interface SegmentSnapshot {
  sectionId: string;
  sectionGIMax: number;
  sectionWordCount: number;
  startedAt: string;
  endedAt: string;
  durationMs: number;

  // 진도 (SEG당 — 중복비허용)
  exposedRanges: ReadRange[];
  exposedCoverage: number; // 0~1
  validReadGIs: number;    // 속도필터 통과

  // 읽은량 (중복허용)
  rawReadGIs: number;

  // 기타 SEG 메트릭
  totalBlinks: number;
  estimatedWpm: number | null;
}

// ═══════════════════════════════════════════════════════════════
// 컬렉션 1: reading_sessions
// key: { testeeIdx, readingSessionId } unique
// 역할: 읽기세션당 전체 기록 (세션 종료 시 생성)
// ═══════════════════════════════════════════════════════════════

/** 읽기세션 전체 기록 */
export interface ReadingSessionRecord {
  testeeIdx: number;
  readingSessionId: string;
  bookIdx: number;
  bookTitle?: string;
  startedAt: string;
  endedAt: string;
  totalDurationMs: number;

  // ── 세그먼트별 진도 (SEG당 보관) ──
  segments: SegmentSnapshot[];

  // ── 세션 전체 요약 ──
  totalValidReadGIs: number;
  /** 중복허용 읽은량 합산 */
  totalRawReadGIs: number;
  totalValidReadMs: number;
  estimatedWpm: number | null;
  totalBlinks: number;
  blkPerMinute: number | null;

  // ── 어휘/퀴즈 ──
  totalWordLookups: number;
  lookedUpWords: LookedUpWord[];
  quizResults: QuizAttemptResult[];
  totalQuizScore: number;
  totalQuizMaxScore: number;

  // ── 읽기패턴 비율 (세션 전체) ──
  readingStateRatios: ReadingStateRatios | null;

  // ── 집중듣기 ──
  totalAudioPlayMs: number;
  focusListeningScore: number | null;

  // ── 종합 ──
  readingScore: number;
}

// ═══════════════════════════════════════════════════════════════
// 컬렉션 2: book_progress
// key: { testeeIdx, bookIdx } unique
// 역할: 책별 누적 진도 + 이어보기 (세션 종료 시 upsert)
// ═══════════════════════════════════════════════════════════════

/** 섹션별 머지된 진도 (전 세션 합산) */
export interface SectionMergedProgress {
  sectionId: string;
  sectionGIMax: number;
  /** 전 세션 머지된 읽은 구간 [0~180, 190~200] */
  mergedRanges: ReadRange[];
  /** mergedRanges unique GI 수 / sectionGIMax */
  coverage: number; // 0~1
  /** 이 섹션에서 마지막으로 읽은 GI 위치 */
  lastGlobalIndex: number;
}

/** 책별 누적 진도 */
export interface BookProgress {
  testeeIdx: number;
  bookIdx: number;

  // 섹션별 머지된 진도
  sectionProgress: SectionMergedProgress[];

  lastSectionId: string;
  lastGlobalIndex: number;

  // 책 전체 통계 (세션들 합산)
  totalReadMs: number;
  avgWpm: number | null;
  totalReadingSessions: number;

  createdAt: string;
  updatedAt: string;
}

// ═══════════════════════════════════════════════════════════════
// Redis 실시간: reading:live:{testeeIdx}
// TTL 30s, 5초마다 갱신
// 역할: 부모 모니터링용 실시간 읽기 상태
// ═══════════════════════════════════════════════════════════════

/** Redis 실시간 읽기 상태 */
export interface LiveReadingState {
  testeeIdx: number;
  readingSessionId: string;
  bookIdx: number;
  bookTitle: string;
  sectionId: string;
  sectionTitle: string;
  startedAt: string;

  // 실시간 메트릭
  elapsedMs: number;
  wpm: number | null;
  totalBlinks: number;
  blkPerMinute: number | null;
  /** 중복허용 읽은량 */
  rawReadGIs: number;
  totalWordLookups: number;

  // 읽기패턴 비율
  readingStateRatios: ReadingStateRatios | null;

  // 집중듣기 (재생 중일 때만)
  isAudioPlaying: boolean;
  focusListeningScore: number | null;
  focusListeningDurationMs: number;

  // 현재 섹션 진도
  currentSectionCoverage: number; // 0~1
  currentSectionGIMax: number;
}

// ═══════════════════════════════════════════════════════════════
// 클라이언트 측 실시간 누적 상태 (readingStore 내)
// ═══════════════════════════════════════════════════════════════

/**
 * 현재 섹션 읽기 중 클라이언트에서 실시간 누적하는 상태
 * - readingProgress.service.ts 모듈 스코프에서 관리
 * - 5초 flush마다 서버에 delta 전송 + 로컬 누적 갱신
 * - 섹션 변경/세션 종료 시 리셋
 */
export interface ReadingAccumulatedState {
  bookIdx: number;
  sectionId: string;
  sectionGIMax: number;
  sectionWordCount: number;

  // 진도 (중첩비허용, 로컬 머지)
  exposedRanges: ReadRange[];
  exposedCoverage: number;

  // 읽은 양 (중첩허용)
  totalRawExposedGIs: number;

  // 시간
  totalReadMs: number;
  lastGlobalIndex: number;

  // 시선 분석
  totalGazeOnTextMs: number;
  totalGazeAlignedMs: number;
  totalAudioGazeActiveMs: number;
  concentrationPercent: number | null;
  gazeAlignmentScore: number | null;

  // 눈 깜빡임
  totalBlinks: number;

  // 어휘
  lookedUpWords: LookedUpWord[];

  // 퀴즈
  quizResults: QuizAttemptResult[];
  quizScore: number;
  quizMaxScore: number;

  // ── 읽기 속도 (GI velocity 기반) ──
  /** 속도 필터 통과한 GI 수 (WPM 계산용) */
  validReadGIs: number;
  /** 유효 읽기 시간 ms (유효 GI가 있는 window만 포함) */
  validReadMs: number;
  /** 추정 WPM (800 초과 시 null) */
  estimatedWpm: number | null;

  // 종합 (실시간 추정)
  estimatedReadingScore: number;
}

// ═══════════════════════════════════════════════════════════════
// REST 응답
// ═══════════════════════════════════════════════════════════════

/** GET /api/reading-progress/:bookIdx */
export interface BookProgressResponse {
  progress: BookProgress | null;
}
