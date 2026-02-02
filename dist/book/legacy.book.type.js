"use strict";
/**
 * @deprecated Legacy 타입 — 신규 코드에서 사용 금지
 * Book 통합 리팩토링 전 타입 백업 (2026-02-02)
 * 신규: Book (book.type.ts), BookDTO (book-api.type.ts), MakeBookState (store.types.ts)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOK_LEVEL_MAX = exports.BOOK_LEVEL_MIN = exports.BookAgeGrade = exports.BookGenreEnum = exports.BookLanguageCode = void 0;
// ========== deprecated enums ==========
/** @deprecated BookLanguage 사용 권장 */
var BookLanguageCode;
(function (BookLanguageCode) {
    BookLanguageCode["KO"] = "ko";
    BookLanguageCode["EN"] = "en";
})(BookLanguageCode || (exports.BookLanguageCode = BookLanguageCode = {}));
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
/** @deprecated PublishAgeRating 사용 권장 */
var BookAgeGrade;
(function (BookAgeGrade) {
    BookAgeGrade["ALL"] = "all";
    BookAgeGrade["AGE_7"] = "7+";
    BookAgeGrade["AGE_12"] = "12+";
    BookAgeGrade["AGE_15"] = "15+";
    BookAgeGrade["AGE_19"] = "19+";
})(BookAgeGrade || (exports.BookAgeGrade = BookAgeGrade = {}));
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
exports.BOOK_LEVEL_MIN = 5;
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
exports.BOOK_LEVEL_MAX = 19;
