"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOOK_LEVEL_MAX = exports.BOOK_LEVEL_MIN = exports.BookLanguageCode = void 0;
// 값 자체를 코드로 쓰는 용도 (DB 저장/전송)
var BookLanguageCode;
(function (BookLanguageCode) {
    BookLanguageCode["KO"] = "ko";
    BookLanguageCode["EN"] = "en";
})(BookLanguageCode || (exports.BookLanguageCode = BookLanguageCode = {}));
// 레벨 범위도 중앙집중 관리
exports.BOOK_LEVEL_MIN = 5;
exports.BOOK_LEVEL_MAX = 19;
