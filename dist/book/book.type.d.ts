export declare enum BookLanguageCode {
    KO = "ko",
    EN = "en"
}
export declare const BOOK_LEVEL_MIN = 5;
export declare const BOOK_LEVEL_MAX = 19;
export declare enum BookAgeGrade {
    ALL = "all",// 전체이용가
    AGE_7 = "7+",// 7세 이상
    AGE_12 = "12+",// 12세 이상
    AGE_15 = "15+",// 15세 이상
    AGE_19 = "19+"
}
export declare enum BookLength {
    SHORT = "short",// 단편
    MEDIUM = "medium",// 중편
    LONG = "long"
}
export declare enum BookGenre {
    FICTION = "fiction",// 소설
    NON_FICTION = "non-fiction",// 비소설
    FAIRY_TALE = "fairy-tale",// 동화
    EDUCATIONAL = "educational",// 교육
    SCIENCE = "science",// 과학
    HISTORY = "history",// 역사
    BIOGRAPHY = "biography",// 전기
    POETRY = "poetry",// 시
    OTHER = "other"
}
/** 책 기본 정보 (리스트용) */
export interface BookShort {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    rating: number;
    lengthText: string;
    language: BookLanguageCode;
    level: number;
    genre: string;
}
/** 책 상세 정보 */
export interface BookDetail extends BookShort {
    description?: string;
    tags?: string[];
    publishedAtText?: string;
    priceText?: string;
    toc?: string[];
    ageGrade?: BookAgeGrade;
    wordCount?: number;
    isbn?: string;
    originalPublisher?: string;
    originalPublishDate?: string;
    edition?: string;
    quizRetryAllowed?: boolean;
}
