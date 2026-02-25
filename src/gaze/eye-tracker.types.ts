/** 지원하는 시선추적 프로바이더 타입 */
export type EyeTrackerType = 'eyedid' | 'seeso' | 'custom' | 'fake';

/** 단일 시선 샘플 (0~1 정규화 좌표) */
export interface GazeData {
  /** 정규화된 X 좌표 (0~1, 좌→우) */
  x: number;
  /** 정규화된 Y 좌표 (0~1, 상→하) */
  y: number;
  /** 타임스탬프 (ms, Date.now()) */
  timestamp: number;
}
