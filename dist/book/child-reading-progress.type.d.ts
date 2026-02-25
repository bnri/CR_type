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
export interface ChildSectionProgress {
    childIdx: number;
    bookIdx: number;
    sectionId: string;
    sectionGIMax: number;
    scrolledRanges: ReadRange[];
    scrolledCount: number;
    scrolledCoverage: number;
    gazeReadRanges: ReadRange[];
    gazeReadCount: number;
    gazeReadCoverage: number;
    totalReadMs: number;
    lastGlobalIndex: number;
    lastReadAt: string;
    totalBlinks: number;
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
    totalScrolledCount: number;
    totalScrolledCoverage: number;
    totalGazeReadCount: number;
    totalGazeReadCoverage: number;
    createdAt: string;
    updatedAt: string;
}
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
export interface SegmentReadingSummary {
    sectionId: string;
    bookIdx: number;
    sectionGIMax: number;
    startedAt: string;
    endedAt: string;
    durationMs: number;
    scrolledFrom: number;
    scrolledTo: number;
    scrolledGICount: number;
    gazeReadGICount: number;
    /** gazeReadGICount / scrolledGICount (시선 없으면 null) */
    focusRatio: number | null;
    /** 평균 읽기 속도 (GI per minute) */
    readingSpeedGPM: number;
    /** 평균 dwell time (ms per GI) */
    avgDwellMs: number | null;
    totalBlinks: number;
    /** 분당 깜빡임 횟수 */
    blinksPerMinute: number;
    calibrations: CalibrationPeriod[];
}
export interface ChildReadingSessionSummary {
    childIdx: number;
    sessionId: string;
    startedAt: string;
    endedAt: string;
    totalDurationMs: number;
    segments: SegmentReadingSummary[];
    totalScrolledGICount: number;
    totalGazeReadGICount: number;
    overallFocusRatio: number | null;
    avgReadingSpeedGPM: number;
    totalBlinks: number;
    avgBlinksPerMinute: number;
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
}
/** GET /api/reading-progress/daily-stats */
export interface DailyReadingStatsResponse {
    childIdx: number;
    from: string;
    to: string;
    stats: DailyReadingStat[];
}
