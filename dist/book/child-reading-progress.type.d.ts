import type { EyeTrackerType } from '../gaze/eye-tracker.types';
/** 읽은 구간 (globalIndex 범위, inclusive) */
export interface ReadRange {
    from: number;
    to: number;
}
/** 캘리브레이션 종류 */
export type CalibrationType = "quick" | "full";
/** 섹션 읽기 중 발생한 캘리브레이션 기간 */
export interface CalibrationPeriod {
    type: CalibrationType;
    /** 사용한 시선추적 트래커 */
    trackerType: EyeTrackerType;
    /** 사용한 포인트 수 (quick: 3, full: 5) */
    points: number;
    startedAt: string;
    endedAt: string;
    durationMs: number;
    /** 캘리브레이션 결과 품질 (0~1, 기기 제공) */
    quality?: number;
    /** 화면 가로 해상도 (px) */
    screenWidth?: number;
    /** 화면 세로 해상도 (px) */
    screenHeight?: number;
    /** 평균 오차 (px) */
    accuracyPx?: number;
    /** 평균 오차 (degree) */
    accuracyDeg?: number;
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
     * - 임계값 필터링 없이 전체 포함 (서버에서 threshold 적용)
     * - 시선 추적 기기 없으면 빈 객체 {}
     *
     * 예: { "101": 300, "102": 450, "103": 67 }
     */
    gazeDwellMap: Record<string, number>;
    /** 이 구간 내 눈 깜빡임 횟수 (valid 전환 감지) */
    blinkCount: number;
    /**
     * 이 구간에서 시선이 텍스트([data-g]) 위에 있었던 시간 (ms)
     * → 집중도(concentration) 계산용: gazeOnTextMs / durationMs * 100
     * → 시선 추적 없으면 0
     */
    gazeOnTextMs: number;
    /**
     * 오디오 재생 중 시선이 현재 하이라이트 GI 근처에 있었던 시간 (ms)
     * → 시선일치도(gazeAlignment) 계산용
     * → 오디오 미재생 또는 시선추적 없으면 null
     */
    gazeAlignedMs: number | null;
    /** 오디오 재생 중 시선추적이 활성이었던 총 시간 (ms) */
    audioGazeActiveMs: number | null;
    /** 이 구간에서 찾아본 단어 */
    lookedUpWords: LookedUpWord[];
    /** 이 구간에서 완료한 퀴즈 */
    quizResults: QuizAttemptResult[];
    /** 소요 시간 ms */
    durationMs: number;
}
export interface ChildSectionProgress {
    childIdx: number;
    bookIdx: number;
    sectionId: string;
    sectionGIMax: number;
    /** 섹션 단어 수 (SectionSummary.word_count, WPM 계산용) */
    sectionWordCount: number;
    exposedRanges: ReadRange[];
    /** unique GI 수 (mergeReadRanges 후) */
    exposedCount: number;
    /** exposedCount / sectionGIMax */
    exposedCoverage: number;
    eyeReadRanges: ReadRange[];
    eyeReadCount: number;
    eyeReadCoverage: number;
    /** 모든 flush의 (exposedTo - exposedFrom + 1) 합산 */
    totalRawExposedGIs: number;
    /** 모든 flush의 gaze dwell ≥ threshold GI 수 합산 */
    totalRawEyeReadGIs: number;
    totalReadMs: number;
    lastGlobalIndex: number;
    lastReadAt: string;
    /** 검증된 읽기속도: eyeReadCount / (totalReadMs / 60000) — WPM 근사 (GI ≈ word) */
    readingSpeedWPM: number | null;
    /** 미검증 읽기속도: exposedCount / (totalReadMs / 60000) */
    unverifiedReadingSpeedWPM: number | null;
    /** 누적: 시선이 텍스트 위에 있었던 시간 (ms) */
    totalGazeOnTextMs: number;
    /** 집중도: totalGazeOnTextMs / totalReadMs * 100 (%, 시선추적 없으면 null) */
    concentrationPercent: number | null;
    /** 누적: 오디오 재생 중 시선이 하이라이트 GI 근처에 있었던 시간 */
    totalGazeAlignedMs: number;
    /** 누적: 오디오 재생 중 시선추적이 활성이었던 시간 */
    totalAudioGazeActiveMs: number;
    /** 시선일치도: totalGazeAlignedMs / totalAudioGazeActiveMs (0~1, 데이터 없으면 null) */
    gazeAlignmentScore: number | null;
    totalBlinks: number;
    /** 찾아본 단어 목록 (unique text 기준) */
    lookedUpWords: LookedUpWord[];
    /** 개별 퀴즈 결과 (quizId 기준 최신 1건만 유지, 재시도 시 덮어쓰기) */
    quizResults: QuizAttemptResult[];
    quizScore: number;
    quizMaxScore: number;
    quizCorrectCount: number;
    quizTotalCount: number;
    /** quizCorrectCount / quizTotalCount (0~1, 퀴즈 없으면 null) */
    quizAccuracy: number | null;
    /** 누적 읽기 점수 (알고리즘 산출, 읽기마다 추가) */
    readingScore: number;
    calibrations: CalibrationPeriod[];
    createdAt: string;
    updatedAt: string;
}
export interface ChildBookBookmark {
    childIdx: number;
    bookIdx: number;
    lastReadSectionId: string;
    lastGlobalIndex: number;
    totalGIMax: number;
    totalExposedCount: number;
    totalExposedCoverage: number;
    totalEyeReadCount: number;
    totalEyeReadCoverage: number;
    totalReadingScore: number;
    /** 책 전체 평균 WPM (검증된 속도) */
    avgReadingSpeedWPM: number | null;
    /** 책 전체 집중도 (%) */
    avgConcentrationPercent: number | null;
    /** 책 전체 퀴즈 정답률 */
    totalQuizAccuracy: number | null;
    createdAt: string;
    updatedAt: string;
}
export interface ChildReadingLog {
    childIdx: number;
    bookIdx: number;
    sectionId: string;
    exposedFrom: number;
    exposedTo: number;
    /** 전체 dwell map 그대로 보존 */
    gazeDwellMap: Record<string, number>;
    blinkCount: number;
    /** 시선이 텍스트 위에 있었던 시간 */
    gazeOnTextMs: number;
    /** 오디오 재생 중 시선 일치 시간 */
    gazeAlignedMs: number | null;
    audioGazeActiveMs: number | null;
    /** 찾아본 단어 */
    lookedUpWords: LookedUpWord[];
    /** 퀴즈 결과 */
    quizResults: QuizAttemptResult[];
    durationMs: number;
    createdAt: string;
}
export interface ChildCalibrationLog {
    childIdx: number;
    /** 읽기 세션 중 발생 시 읽기 세션 ID */
    readingSessionId?: string;
    /** 읽기 중이었던 섹션 */
    sectionId?: string;
    type: CalibrationType;
    /** 사용한 시선추적 트래커 */
    trackerType: EyeTrackerType;
    /** 사용한 포인트 수 */
    points: number;
    startedAt: string;
    endedAt: string;
    durationMs: number;
    quality?: number;
    /** 화면 가로 해상도 (px) */
    screenWidth?: number;
    /** 화면 세로 해상도 (px) */
    screenHeight?: number;
    /** 평균 오차 (px) */
    accuracyPx?: number;
    /** 평균 오차 (degree) */
    accuracyDeg?: number;
    createdAt: string;
}
export interface SegmentReadingSummary {
    sectionId: string;
    bookIdx: number;
    sectionGIMax: number;
    sectionWordCount: number;
    startedAt: string;
    endedAt: string;
    durationMs: number;
    exposedFrom: number;
    exposedTo: number;
    exposedGICount: number;
    eyeReadGICount: number;
    rawExposedGICount: number;
    rawEyeReadGICount: number;
    /** eyeReadGICount / (durationMs / 60000) — WPM 근사 */
    readingSpeedWPM: number | null;
    /** exposedGICount / (durationMs / 60000) */
    unverifiedReadingSpeedWPM: number;
    /** eyeReadGICount / exposedGICount (시선 없으면 null) */
    focusRatio: number | null;
    /** 평균 dwell time (ms per GI) */
    avgDwellMs: number | null;
    /** 집중도: gazeOnTextMs / durationMs * 100 */
    concentrationPercent: number | null;
    /** 시선일치도 (0~1, 오디오+시선추적 시에만) */
    gazeAlignmentScore: number | null;
    totalBlinks: number;
    /** 분당 깜빡임 횟수 */
    blinksPerMinute: number;
    lookedUpWordCount: number;
    quizScore: number;
    quizMaxScore: number;
    quizAccuracy: number | null;
    calibrations: CalibrationPeriod[];
}
export interface ChildReadingSessionSummary {
    childIdx: number;
    readingSessionId: string;
    startedAt: string;
    endedAt: string;
    totalDurationMs: number;
    segments: SegmentReadingSummary[];
    totalExposedGICount: number;
    totalEyeReadGICount: number;
    overallFocusRatio: number | null;
    avgReadingSpeedWPM: number | null;
    avgUnverifiedReadingSpeedWPM: number;
    overallConcentrationPercent: number | null;
    overallGazeAlignmentScore: number | null;
    totalBlinks: number;
    avgBlinksPerMinute: number;
    totalLookedUpWords: number;
    totalQuizScore: number;
    totalQuizMaxScore: number;
    overallQuizAccuracy: number | null;
    /** 이 세션에서 획득한 읽기 점수 */
    sessionReadingScore: number;
}
/**
 * 읽기 점수 산출 입력값
 * - 각 메트릭 가중치를 적용하여 종합 점수 산출
 * - 점수는 누적 (읽을수록 올라감)
 */
export interface ReadingScoreInput {
    /** 진도 (중첩비허용 coverage, 0~1) */
    exposedCoverage: number;
    /** 검증된 진도 (eyeRead coverage, 0~1) */
    eyeReadCoverage: number;
    /** 집중도 (%, 0~100) */
    concentrationPercent: number | null;
    /** 시선일치도 (0~1) */
    gazeAlignmentScore: number | null;
    /** 퀴즈 정답률 (0~1) */
    quizAccuracy: number | null;
    /** 읽기 시간 (ms) */
    durationMs: number;
    /** 찾아본 단어 수 */
    lookedUpWordCount: number;
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
/**
 * 읽기 세션 전체를 아우르는 요약 — 세션 종료 시 localStorage 저장 + 추후 서버 전송
 * - 섹션 전환마다 accumulated 병합하여 누적
 * - accumulated는 섹션 단위 리셋, sessionSummary는 세션 동안 유지
 */
export interface ReadingSessionSummary {
    /** 세션 전체 GI progress (0~1, 전 섹션 합산) */
    totalExposedCoverage: number;
    /** 속도 필터 통과한 총 GI 수 */
    totalValidReadGIs: number;
    /** 유효 읽기 시간 (ms) */
    totalValidReadMs: number;
    /** 추정 WPM (800 초과 시 null) */
    estimatedWpm: number | null;
    totalBlinks: number;
    /** 분당 깜빡임 (totalValidReadMs 기준) */
    blkPerMinute: number | null;
    totalWordLookups: number;
    lookedUpWords: LookedUpWord[];
    totalQuizScore: number;
    totalQuizMaxScore: number;
    quizResults: QuizAttemptResult[];
    /** 집중듣기 점수: 오디오+시선 GI LINEBREAK 패턴 기반 (placeholder) */
    readingPlayFocusGrade: number | null;
}
export interface ChildDailySummary {
    childIdx: number;
    /** KST 기준 날짜 "YYYY-MM-DD" */
    date: string;
    totalReadMs: number;
    sessionCount: number;
    /** 오늘 읽은 bookIdx 목록 (unique) */
    booksRead: number[];
    /** 오늘 노출 GI 합 (세션별 누적) */
    totalExposedGICount: number;
    /** 오늘 시선 확인 GI 합 (세션별 누적) */
    totalEyeReadGICount: number;
    avgConcentrationPercent: number | null;
    avgFocusRatio: number | null;
    avgReadingSpeedWPM: number | null;
    totalQuizScore: number;
    totalQuizMaxScore: number;
    totalBlinks: number;
    totalLookedUpWords: number;
    /** 집중도 가중합 (concentrationPercent × durationMs 누적) */
    _weightedConcentrationMs: number;
    /** 집중도 분모 (concentration 데이터가 있는 세션의 durationMs 누적) */
    _concentrationDurationMs: number;
    /** 속도 가중합 (speedWPM × durationMs 누적) */
    _weightedSpeedMs: number;
    /** 속도 분모 (speed 데이터가 있는 세션의 durationMs 누적) */
    _speedDurationMs: number;
    /** focusRatio 가중합 */
    _weightedFocusRatioMs: number;
    /** focusRatio 분모 */
    _focusRatioDurationMs: number;
    lastReadingSessionId: string;
    createdAt: string;
    updatedAt: string;
}
/** GET /api/reading-progress/:bookIdx */
export interface ChildBookProgressResponse {
    bookmark: ChildBookBookmark | null;
    sections: ChildSectionProgress[];
}
/** 일별 읽기 통계 (aggregation 결과) */
export interface DailyReadingStat {
    date: string;
    totalMs: number;
    books: number[];
    /** 그 날 획득한 읽기 점수 */
    readingScore: number;
}
/** GET /api/reading-progress/daily-stats */
export interface DailyReadingStatsResponse {
    childIdx: number;
    from: string;
    to: string;
    stats: DailyReadingStat[];
}
