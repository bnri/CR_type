"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookGenre = exports.BookLength = exports.BookAgeGrade = exports.BOOK_LEVEL_MAX = exports.BOOK_LEVEL_MIN = exports.BookLanguageCode = void 0;
// 값 자체를 코드로 쓰는 용도 (DB 저장/전송)
var BookLanguageCode;
(function (BookLanguageCode) {
    BookLanguageCode["KO"] = "ko";
    BookLanguageCode["EN"] = "en";
})(BookLanguageCode || (exports.BookLanguageCode = BookLanguageCode = {}));
// 레벨 범위도 중앙집중 관리
exports.BOOK_LEVEL_MIN = 5;
exports.BOOK_LEVEL_MAX = 19;
// 연령 등급
var BookAgeGrade;
(function (BookAgeGrade) {
    BookAgeGrade["ALL"] = "all";
    BookAgeGrade["AGE_7"] = "7+";
    BookAgeGrade["AGE_12"] = "12+";
    BookAgeGrade["AGE_15"] = "15+";
    BookAgeGrade["AGE_19"] = "19+";
})(BookAgeGrade || (exports.BookAgeGrade = BookAgeGrade = {}));
// 책 길이
var BookLength;
(function (BookLength) {
    BookLength["SHORT"] = "short";
    BookLength["MEDIUM"] = "medium";
    BookLength["LONG"] = "long";
})(BookLength || (exports.BookLength = BookLength = {}));
// 책 종류/장르
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
