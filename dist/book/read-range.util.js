"use strict";
// src/book/read-range.util.ts
// ReadRange 유틸리티 함수 (서버/클라이언트 공용)
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeReadRange = mergeReadRange;
exports.mergeReadRanges = mergeReadRanges;
exports.sumReadRanges = sumReadRanges;
exports.gisToRanges = gisToRanges;
exports.filterDwellToRanges = filterDwellToRanges;
/** 정렬된 ranges 배열에 newRange를 머지 (겹침/인접 합산) */
function mergeReadRange(ranges, newRange) {
    if (ranges.length === 0)
        return [newRange];
    const result = [];
    let merged = { ...newRange };
    let inserted = false;
    for (const r of ranges) {
        if (inserted) {
            result.push(r);
            continue;
        }
        if (r.to + 1 < merged.from) {
            result.push(r);
        }
        else if (r.from > merged.to + 1) {
            result.push(merged);
            result.push(r);
            inserted = true;
        }
        else {
            merged = { from: Math.min(merged.from, r.from), to: Math.max(merged.to, r.to) };
        }
    }
    if (!inserted)
        result.push(merged);
    return result;
}
/** 여러 newRanges를 기존 ranges에 순차 머지 */
function mergeReadRanges(existing, newRanges) {
    let result = existing;
    for (const nr of newRanges)
        result = mergeReadRange(result, nr);
    return result;
}
/** ranges 내 고유 GI 총 개수 (각 구간 길이 합) */
function sumReadRanges(ranges) {
    let sum = 0;
    for (const r of ranges)
        sum += r.to - r.from + 1;
    return sum;
}
/** 개별 GI 배열 → 정렬된 ReadRange[] 변환 */
function gisToRanges(gis) {
    if (gis.length === 0)
        return [];
    const sorted = [...new Set(gis)].sort((a, b) => a - b);
    const ranges = [];
    let from = sorted[0], to = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === to + 1)
            to = sorted[i];
        else {
            ranges.push({ from, to });
            from = sorted[i];
            to = sorted[i];
        }
    }
    ranges.push({ from, to });
    return ranges;
}
/** gazeDwellMap에서 threshold 이상인 GI만 추출하여 ReadRange[] 변환 */
function filterDwellToRanges(gazeDwellMap, thresholdMs) {
    const passedGIs = [];
    for (const [gi, ms] of Object.entries(gazeDwellMap)) {
        if (ms >= thresholdMs)
            passedGIs.push(Number(gi));
    }
    return gisToRanges(passedGIs);
}
