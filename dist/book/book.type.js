"use strict";
// ========== 기본 타입 ==========
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgeOptions = exports.getAgeRatingOptions = exports.getEnLevelOptions = exports.getGenreOptions = exports.getLengthOptions = exports.getLanguageOptions = exports.calcSoundMinutes = exports.DEFAULT_BOOK_META = exports.BookAgeGrade = exports.PublishAgeRatingLabel = exports.BookEnLevelLabel = exports.BookGenreEnum = exports.BookGenreLabel = exports.BookLengthLabel = exports.BOOK_LEVEL_MAX = exports.BOOK_LEVEL_MIN = exports.BOOK_AGE_MAX = exports.BOOK_AGE_MIN = exports.BookLanguageCode = exports.BookLanguageLabel = void 0;
exports.BookLanguageLabel = {
    ko: '한국어',
    en: 'English',
};
/** @deprecated BookLanguage 사용 권장 */
var BookLanguageCode;
(function (BookLanguageCode) {
    BookLanguageCode["KO"] = "ko";
    BookLanguageCode["EN"] = "en";
})(BookLanguageCode || (exports.BookLanguageCode = BookLanguageCode = {}));
/** 권장 연령 범위 (5~19세) */
exports.BOOK_AGE_MIN = 5;
exports.BOOK_AGE_MAX = 19;
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
exports.BOOK_LEVEL_MIN = 5;
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
exports.BOOK_LEVEL_MAX = 19;
exports.BookLengthLabel = {
    short: '단편',
    medium: '중편',
    long: '장편',
};
exports.BookGenreLabel = {
    fiction: '문학',
    'non-fiction': '비문학',
    other: '기타',
};
/** @deprecated BookGenre type 사용 권장 */
var BookGenreEnum;
(function (BookGenreEnum) {
    BookGenreEnum["FICTION"] = "fiction";
    BookGenreEnum["NON_FICTION"] = "non-fiction";
    BookGenreEnum["FAIRY_TALE"] = "fairy-tale";
    BookGenreEnum["EDUCATIONAL"] = "educational";
    BookGenreEnum["SCIENCE"] = "science";
    BookGenreEnum["HISTORY"] = "history";
    BookGenreEnum["BIOGRAPHY"] = "biography";
    BookGenreEnum["POETRY"] = "poetry";
    BookGenreEnum["OTHER"] = "other";
})(BookGenreEnum || (exports.BookGenreEnum = BookGenreEnum = {}));
exports.BookEnLevelLabel = {
    story: '스토리',
    readers: '리더스',
    'early-chapter': '얼리챕터',
    chapter: '챕터',
    novel: '노블',
};
exports.PublishAgeRatingLabel = {
    all: '전체이용가',
    '12': '12세 이용가',
    '15': '15세 이용가',
    '19': '19세 이용가',
};
/** @deprecated PublishAgeRating 사용 권장 */
var BookAgeGrade;
(function (BookAgeGrade) {
    BookAgeGrade["ALL"] = "all";
    BookAgeGrade["AGE_7"] = "7+";
    BookAgeGrade["AGE_12"] = "12+";
    BookAgeGrade["AGE_15"] = "15+";
    BookAgeGrade["AGE_19"] = "19+";
})(BookAgeGrade || (exports.BookAgeGrade = BookAgeGrade = {}));
// ========== 기본값 ==========
/** 새 책 생성 시 기본값 */
exports.DEFAULT_BOOK_META = {
    title: '나의 책',
    language: 'en',
    age: 5,
    length: 'short',
    genre: 'fiction',
    quiz_retry_allowed: true,
};
// ========== 헬퍼 함수 ==========
/** 어절 수 → 재생 분수 계산 (200 WPM 기준) */
const calcSoundMinutes = (wordCount) => Math.ceil(wordCount / 200);
exports.calcSoundMinutes = calcSoundMinutes;
/** 언어 옵션 (UI Select용) */
const getLanguageOptions = () => Object.entries(exports.BookLanguageLabel).map(([value, label]) => ({ value: value, label }));
exports.getLanguageOptions = getLanguageOptions;
/** 길이 옵션 (UI Select용) */
const getLengthOptions = () => Object.entries(exports.BookLengthLabel).map(([value, label]) => ({ value: value, label }));
exports.getLengthOptions = getLengthOptions;
/** 장르 옵션 (UI Select용) */
const getGenreOptions = () => Object.entries(exports.BookGenreLabel).map(([value, label]) => ({ value: value, label }));
exports.getGenreOptions = getGenreOptions;
/** 영어레벨 옵션 (UI Select용) */
const getEnLevelOptions = () => Object.entries(exports.BookEnLevelLabel).map(([value, label]) => ({ value: value, label }));
exports.getEnLevelOptions = getEnLevelOptions;
/** 출판 연령등급 옵션 (UI Select용) */
const getAgeRatingOptions = () => Object.entries(exports.PublishAgeRatingLabel).map(([value, label]) => ({ value: value, label }));
exports.getAgeRatingOptions = getAgeRatingOptions;
/** 권장 연령 옵션 (5~19세) */
const getAgeOptions = () => Array.from({ length: exports.BOOK_AGE_MAX - exports.BOOK_AGE_MIN + 1 }, (_, i) => ({
    value: exports.BOOK_AGE_MIN + i,
    label: `만 ${exports.BOOK_AGE_MIN + i}세`,
}));
exports.getAgeOptions = getAgeOptions;
