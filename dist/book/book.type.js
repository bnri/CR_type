"use strict";
// ========== 리터럴 유니온 타입 ==========
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgeOptions = exports.getAgeRatingOptions = exports.getEnLevelOptions = exports.getGenreOptions = exports.getLengthOptions = exports.getLanguageOptions = exports.calcSoundMinutes = exports.getLexileDescription = exports.getARDescription = exports.LEXILE_INDEX_RANGES = exports.AR_INDEX_RANGES = exports.DEFAULT_BOOK_META = exports.BOOK_AGE_MAX = exports.BOOK_AGE_MIN = exports.PublishAgeRatingLabel = exports.BookEnLevelLabel = exports.BookGenreLabel = exports.BookLengthLabel = exports.BookLanguageLabel = void 0;
// ========== 라벨 (UI 표시용) ==========
exports.BookLanguageLabel = {
    ko: "한국어",
    en: "English",
};
exports.BookLengthLabel = {
    short: "단편",
    medium: "중편",
    long: "장편",
};
exports.BookGenreLabel = {
    fiction: "문학",
    "non-fiction": "비문학",
    other: "기타",
};
exports.BookEnLevelLabel = {
    story: "스토리",
    readers: "리더스",
    "early-chapter": "얼리챕터",
    "middle-chapter": "미들챕터",
    chapter: "챕터",
    novel: "노블",
};
exports.PublishAgeRatingLabel = {
    all: "전체이용가",
    "12": "12세 이용가",
    "15": "15세 이용가",
    "19": "19세 이용가",
};
// ========== 상수 ==========
/** 권장 연령 범위 (5~19세) */
exports.BOOK_AGE_MIN = 5;
exports.BOOK_AGE_MAX = 19;
/** 새 책 생성 시 기본값 */
exports.DEFAULT_BOOK_META = {
    book_title: "나의 책",
    book_language: "en",
    book_level: 5,
    length: "short",
    genre: "fiction",
    quiz_retry_allowed: true,
    ar_index: 3.0,
    lexile_index: 600,
};
// ========== AR / Lexile 지수 ==========
/** AR 지수 범위별 설명 (소수점 1자리 기준) */
exports.AR_INDEX_RANGES = [
    {
        min: 0.0,
        max: 1.9,
        level: "유아 ~ 초1",
        description: "그림책, 아주 짧은 문장",
    },
    { min: 2.0, max: 2.9, level: "초2", description: "기초 리더북" },
    { min: 3.0, max: 3.9, level: "초3", description: "챕터북 시작" },
    { min: 4.0, max: 4.9, level: "초4", description: "본격적인 이야기 구조" },
    { min: 5.0, max: 5.9, level: "초5", description: "어휘·문장 길이 증가" },
    { min: 6.0, max: 6.9, level: "초6", description: "논픽션 비중 증가" },
    { min: 7.0, max: 8.9, level: "중학생", description: "복합 문장, 추론 필요" },
    {
        min: 9.0,
        max: 10.9,
        level: "고등학생",
        description: "문학 작품, 추상 개념",
    },
    { min: 11.0, max: 12.0, level: "고급", description: "성인 소설·고전" },
];
/** Lexile 지수 범위별 설명 */
exports.LEXILE_INDEX_RANGES = [
    { min: 0, max: 200, level: "유아", description: "알파벳·기초 단어" },
    { min: 200, max: 400, level: "초1", description: "아주 쉬운 문장" },
    { min: 400, max: 600, level: "초2", description: "간단한 스토리" },
    { min: 600, max: 800, level: "초3", description: "챕터북" },
    { min: 800, max: 1000, level: "초4", description: "정보량 증가" },
    { min: 1000, max: 1200, level: "초5~6", description: "교과서 수준" },
    { min: 1200, max: 1400, level: "중학생", description: "추론·비판적 읽기" },
    { min: 1400, max: 1600, level: "고등학생", description: "문학·비문학 혼합" },
    { min: 1600, max: 2000, level: "성인", description: "학술·고전 문학" },
];
/** AR 지수로 해당 범위 설명 조회 */
const getARDescription = (ar) => exports.AR_INDEX_RANGES.find((r) => ar >= r.min && ar <= r.max);
exports.getARDescription = getARDescription;
/** Lexile 지수로 해당 범위 설명 조회 */
const getLexileDescription = (lexile) => exports.LEXILE_INDEX_RANGES.find((r) => lexile >= r.min && lexile <= r.max);
exports.getLexileDescription = getLexileDescription;
// ========== 헬퍼 함수 ==========
/** 어절 수 → 재생 분수 계산 (200 WPM 기준) */
const calcSoundMinutes = (wordCount) => Math.ceil(wordCount / 200);
exports.calcSoundMinutes = calcSoundMinutes;
/** 언어 옵션 (UI Select용) */
const getLanguageOptions = () => Object.entries(exports.BookLanguageLabel).map(([value, label]) => ({
    value: value,
    label,
}));
exports.getLanguageOptions = getLanguageOptions;
/** 길이 옵션 (UI Select용) */
const getLengthOptions = () => Object.entries(exports.BookLengthLabel).map(([value, label]) => ({
    value: value,
    label,
}));
exports.getLengthOptions = getLengthOptions;
/** 장르 옵션 (UI Select용) */
const getGenreOptions = () => Object.entries(exports.BookGenreLabel).map(([value, label]) => ({
    value: value,
    label,
}));
exports.getGenreOptions = getGenreOptions;
/** 영어레벨 옵션 (UI Select용) */
const getEnLevelOptions = () => Object.entries(exports.BookEnLevelLabel).map(([value, label]) => ({
    value: value,
    label,
}));
exports.getEnLevelOptions = getEnLevelOptions;
/** 출판 연령등급 옵션 (UI Select용) */
const getAgeRatingOptions = () => Object.entries(exports.PublishAgeRatingLabel).map(([value, label]) => ({
    value: value,
    label,
}));
exports.getAgeRatingOptions = getAgeRatingOptions;
/** 권장 연령 옵션 (5~19세) */
const getAgeOptions = () => Array.from({ length: exports.BOOK_AGE_MAX - exports.BOOK_AGE_MIN + 1 }, (_, i) => ({
    value: exports.BOOK_AGE_MIN + i,
    label: `만 ${exports.BOOK_AGE_MIN + i}세`,
}));
exports.getAgeOptions = getAgeOptions;
