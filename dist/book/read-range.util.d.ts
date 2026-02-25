import type { ReadRange } from './child-reading-progress.type';
/** 정렬된 ranges 배열에 newRange를 머지 (겹침/인접 합산) */
export declare function mergeReadRange(ranges: ReadRange[], newRange: ReadRange): ReadRange[];
/** 여러 newRanges를 기존 ranges에 순차 머지 */
export declare function mergeReadRanges(existing: ReadRange[], newRanges: ReadRange[]): ReadRange[];
/** ranges 내 고유 GI 총 개수 (각 구간 길이 합) */
export declare function sumReadRanges(ranges: ReadRange[]): number;
/** 개별 GI 배열 → 정렬된 ReadRange[] 변환 */
export declare function gisToRanges(gis: number[]): ReadRange[];
/** gazeDwellMap에서 threshold 이상인 GI만 추출하여 ReadRange[] 변환 */
export declare function filterDwellToRanges(gazeDwellMap: Record<string, number>, thresholdMs: number): ReadRange[];
