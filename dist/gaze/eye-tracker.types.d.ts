/** 지원하는 시선추적 프로바이더 타입 */
export type EyeTrackerType = 'eyedid' | 'seeso' | 'custom' | 'fake' | 'webgazer' | 'android_seeso' | 'android_eyedid';
/** 트래킹 상태 (CRGaze 전용) */
export declare enum GazeTrackingState {
    TRACKING = 0,
    BLINK = 1,
    LOST = 2
}
/** 단일 시선 샘플 (0~1 정규화 좌표) */
export interface GazeData {
    /** 정규화된 X 좌표 (0~1, 좌→우) */
    x: number;
    /** 정규화된 Y 좌표 (0~1, 상→하) */
    y: number;
    /** 타임스탬프 (ms, Date.now()) */
    t: number;
    /** 모델 신뢰도 (0~1) */
    conf?: number;
    /** fixation 상태 (프레임 단위) */
    isFix?: boolean;
    /** 트래킹 상태: TRACKING(0) / BLINK(1) / LOST(2) */
    state?: GazeTrackingState;
    /** One Euro filtered velocity (norm/sec) */
    speed?: number;
    /** sliding window dispersion */
    disp?: number;
}
