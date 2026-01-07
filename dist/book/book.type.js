"use strict";
// ========== Enums ==========
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcSoundMinutes = exports.BookGenre = exports.BookAgeGrade = exports.BOOK_LEVEL_MAX = exports.BOOK_LEVEL_MIN = exports.BookLanguageCode = void 0;
/** 언어 코드 */
var BookLanguageCode;
(function (BookLanguageCode) {
    BookLanguageCode["KO"] = "ko";
    BookLanguageCode["EN"] = "en";
})(BookLanguageCode || (exports.BookLanguageCode = BookLanguageCode = {}));
/** 레벨 범위 */
exports.BOOK_LEVEL_MIN = 5;
exports.BOOK_LEVEL_MAX = 19;
/** 연령 등급 */
var BookAgeGrade;
(function (BookAgeGrade) {
    BookAgeGrade["ALL"] = "all";
    BookAgeGrade["AGE_7"] = "7+";
    BookAgeGrade["AGE_12"] = "12+";
    BookAgeGrade["AGE_15"] = "15+";
    BookAgeGrade["AGE_19"] = "19+";
})(BookAgeGrade || (exports.BookAgeGrade = BookAgeGrade = {}));
/** 책 종류/장르 */
var BookGenre;
(function (BookGenre) {
    BookGenre["FICTION"] = "fiction";
    BookGenre["NON_FICTION"] = "non-fiction";
    BookGenre["FAIRY_TALE"] = "fairy-tale";
    BookGenre["EDUCATIONAL"] = "educational";
    BookGenre["SCIENCE"] = "science";
    BookGenre["HISTORY"] = "history";
    BookGenre["BIOGRAPHY"] = "biography";
    BookGenre["POETRY"] = "poetry";
    BookGenre["OTHER"] = "other";
})(BookGenre || (exports.BookGenre = BookGenre = {}));
// ========== 헬퍼 함수 ==========
/** 어절 수 → 재생 분수 계산 (200 WPM 기준) */
const calcSoundMinutes = (wordCount) => Math.ceil(wordCount / 200);
exports.calcSoundMinutes = calcSoundMinutes;
