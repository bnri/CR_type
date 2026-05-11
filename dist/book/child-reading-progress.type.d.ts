import type { Book } from "./book.type";
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
    reading: number;
    scanning: number;
    blink: number;
    lost: number;
    etc: number;
}
export interface ReadingProgressReport {
    bookIdx: number;
    sectionId: string;
    /** 섹션 전체 GI 수 (ViewerSnapshot.totalItems) */
    sectionGIMax: number;
    /** @deprecated — exposedRanges 사용 */
    exposedFrom: number;
    /** @deprecated — exposedRanges 사용 */
    exposedTo: number;
    /** 이 구간에서 속도필터 통과한 읽기 GI 범위들 (빈 구간 보존) */
    exposedRanges?: ReadRange[];
    /**
     * 윈도우 종료 시점의 현재 GI 위치 (rpState.lastGI).
     * exposedTo와 달리 속도필터/방향과 무관하게 마지막으로 본 GI 위치를 반영.
     * book_progress.lastGlobalIndex (이어보기 위치) 갱신용.
     * -1 = 아직 GI 미확정 (초기 상태)
     */
    currentGI: number;
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
/** 읽기세션 내 1개 섹션 읽기 구간 스냅샷 */
export interface SegmentSnapshot {
    sectionId: string;
    sectionGIMax: number;
    sectionWordCount: number;
    startedAt: string;
    endedAt: string;
    durationMs: number;
    exposedRanges: ReadRange[];
    exposedCoverage: number;
    validReadGIs: number;
    rawReadGIs: number;
    totalBlinks: number;
    estimatedWpm: number | null;
}
/** 읽기세션 전체 기록 */
export interface ReadingSessionRecord {
    testeeIdx: number;
    readingSessionId: string;
    bookIdx: number;
    bookTitle?: string;
    /** 책 표지 URL (API JOIN 시점에 채워짐, 저장 시 미존재) */
    bookCoverUrl?: string;
    /** 책 원작자 (API JOIN 시점에 채워짐, 저장 시 미존재) */
    bookAuthor?: string;
    startedAt: string;
    endedAt: string;
    totalDurationMs: number;
    segments: SegmentSnapshot[];
    totalValidReadGIs: number;
    /** 중복허용 읽은량 합산 */
    totalRawReadGIs: number;
    totalValidReadMs: number;
    estimatedWpm: number | null;
    totalBlinks: number;
    blkPerMinute: number | null;
    totalWordLookups: number;
    lookedUpWords: LookedUpWord[];
    quizResults: QuizAttemptResult[];
    totalQuizScore: number;
    totalQuizMaxScore: number;
    readingStateRatios: ReadingStateRatios | null;
    totalAudioPlayMs: number;
    focusListeningScore: number | null;
    readingScore: number;
}
/** 섹션별 머지된 진도 (전 세션 합산) */
export interface SectionMergedProgress {
    sectionId: string;
    sectionGIMax: number;
    /** 전 세션 머지된 읽은 구간 [0~180, 190~200] */
    mergedRanges: ReadRange[];
    /** mergedRanges unique GI 수 / sectionGIMax */
    coverage: number;
    /** 이 섹션에서 마지막으로 읽은 GI 위치 */
    lastGlobalIndex: number;
}
/** 책별 누적 진도 */
export interface BookProgress {
    testeeIdx: number;
    bookIdx: number;
    sectionProgress: SectionMergedProgress[];
    lastSectionId: string;
    lastGlobalIndex: number;
    totalReadMs: number;
    avgWpm: number | null;
    totalReadingSessions: number;
    createdAt: string;
    updatedAt: string;
}
/** ReadingState별 frame 수 — window/chunk 단위 SSOT (count → ratio derive) */
export interface ReadingStateFrameCounts {
    reading: number;
    scanning: number;
    blink: number;
    lost: number;
    etc: number;
}
/** Redis 실시간 읽기 상태 */
export interface LiveReadingState {
    testeeIdx: number;
    readingSessionId: string;
    bookIdx: number;
    bookTitle: string;
    sectionId: string;
    sectionTitle: string;
    startedAt: string;
    elapsedMs: number;
    wpm: number | null;
    totalBlinks: number;
    blkPerMinute: number | null;
    /** 중복허용 읽은량 */
    rawReadGIs: number;
    totalWordLookups: number;
    readingStateRatios: ReadingStateRatios | null;
    /**
     * 세션 시작 이후 누적된 state별 frame 수.
     * - 자녀 분석기(ReadingStatsAccumulator)의 누적값 그대로 동봉
     * - chunk flush 시 그대로 ChunkReadingScanSummary.cumulativeStateFrameCounts 에 박아 저장
     * - 더 작은 구간 ratio 는 chunk[i].counts - chunk[i-1].counts 로 derive
     */
    cumulativeStateFrameCounts?: ReadingStateFrameCounts;
    /** cumulativeStateFrameCounts 의 분모로 쓸 누적 총 frame 수 */
    cumulativeTotalFrames?: number;
    isAudioPlaying: boolean;
    focusListeningScore: number | null;
    focusListeningDurationMs: number;
    currentSectionCoverage: number;
    currentSectionGIMax: number;
}
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
    exposedRanges: ReadRange[];
    exposedCoverage: number;
    totalRawExposedGIs: number;
    totalReadMs: number;
    lastGlobalIndex: number;
    totalGazeOnTextMs: number;
    totalGazeAlignedMs: number;
    totalAudioGazeActiveMs: number;
    concentrationPercent: number | null;
    gazeAlignmentScore: number | null;
    totalBlinks: number;
    lookedUpWords: LookedUpWord[];
    quizResults: QuizAttemptResult[];
    quizScore: number;
    quizMaxScore: number;
    /** 속도 필터 통과한 GI 수 (WPM 계산용) */
    validReadGIs: number;
    /** 유효 읽기 시간 ms (유효 GI가 있는 window만 포함) */
    validReadMs: number;
    /** 추정 WPM (800 초과 시 null) */
    estimatedWpm: number | null;
    estimatedReadingScore: number;
}
/** GET /api/reading-progress/:bookIdx */
export interface BookProgressResponse {
    progress: BookProgress | null;
}
/** 책장 status 필터 — 가중평균 coverage 0.9 임계 */
export type ChildBooksStatus = "reading" | "read" | "all";
/** 자녀 책장용 책 메타 (Book − 내부 필드 + creator/sound JOIN 결과) */
export type BookProgressBookItem = Omit<Book, "status" | "creator_idx" | "isdeleted" | "created_at" | "updated_at" | "total_sound_seconds"> & {
    /** creator JOIN 결과 */
    creator_name: string | null;
    /** FLOOR(total_sound_seconds / 60) */
    sound_minutes: number | null;
};
/** 자녀 책장 응답 아이템 = 책 메타 + 책별 진행률 */
export type ChildBookProgressItem = BookProgressBookItem & {
    progress: BookProgress;
    /**
     * 책 전체 진도 (0~1) — 가중평균 coverage.
     * 분모 = Σ book_sections.sections[i].gi_count (책 전체)
     * 분자 = Σ book_progress.sectionProgress[i].coverage × sectionGIMax (자녀가 읽은 부분)
     * → 자녀가 한 번도 안 들어간 섹션도 분모에 포함되므로, 일부 섹션만 100% 읽어도 책 전체 % 는 낮게 나옴.
     */
    overallCoverage: number;
};
