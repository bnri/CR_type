import { SectionData } from "../ast";
import { SectionSummary } from "./book-sections.type";
/** 언어 */
export type BookLanguage = "ko" | "en";
/** 길이 */
export type BookLength = "short" | "medium" | "long";
/** 종류 */
export type BookGenre = "fiction" | "non-fiction" | "other";
/** 영어레벨 (영어책 전용) */
export type BookEnLevel = "story" | "readers" | "early-chapter" | "middle-chapter" | "chapter" | "novel";
/** 책 상태 (라이프사이클) */
export type BookStatus = "draft" | "pending" | "published" | "suspended";
/** MySQL book 테이블 매핑 (단일 테이블) */
export interface Book {
    book_idx: number;
    creator_idx: number;
    status: BookStatus;
    book_title: string;
    book_language: BookLanguage;
    book_level: number;
    book_cover_url: string | null;
    genre: BookGenre | null;
    length: BookLength | null;
    en_level: BookEnLevel | null;
    ar_index: number | null;
    lexile_index: number | null;
    series: string | null;
    original_author: string | null;
    description: string | null;
    original_publish_date: string | null;
    original_publisher: string | null;
    isbn: string | null;
    price_point: number | null;
    quiz_retry_allowed: boolean;
    tags: string[] | null;
    isdeleted: boolean;
    created_at: string;
    updated_at: string;
    published_at: string | null;
}
/** 책 상세 조회 API 응답 (meta + summary + content) */
export interface BookDTO {
    meta: Book;
    summary: {
        sectionOrder: string[];
        sections?: SectionSummary[];
    };
    content: SectionData[];
}
export declare const BookLanguageLabel: {
    readonly ko: "한국어";
    readonly en: "English";
};
export declare const BookLengthLabel: {
    readonly short: "단편";
    readonly medium: "중편";
    readonly long: "장편";
};
export declare const BookGenreLabel: {
    readonly fiction: "문학";
    readonly "non-fiction": "비문학";
    readonly other: "기타";
};
export declare const BookEnLevelLabel: {
    readonly story: "스토리";
    readonly readers: "리더스";
    readonly "early-chapter": "얼리챕터";
    readonly "middle-chapter": "미들챕터";
    readonly chapter: "챕터";
    readonly novel: "노블";
};
/** 권장 연령 범위 (5~19세) */
export declare const BOOK_AGE_MIN = 5;
export declare const BOOK_AGE_MAX = 19;
/** 새 책 생성 시 기본값 */
export declare const DEFAULT_BOOK_META: {
    readonly book_title: "나의 책";
    readonly book_language: BookLanguage;
    readonly book_level: 5;
    readonly length: BookLength;
    readonly genre: BookGenre;
    readonly quiz_retry_allowed: true;
    readonly ar_index: 3;
    readonly lexile_index: 600;
};
/** AR 지수 범위별 설명 (소수점 1자리 기준) */
export declare const AR_INDEX_RANGES: readonly [{
    readonly min: 0;
    readonly max: 1.9;
    readonly level: "유아 ~ 초1";
    readonly description: "그림책, 아주 짧은 문장";
}, {
    readonly min: 2;
    readonly max: 2.9;
    readonly level: "초2";
    readonly description: "기초 리더북";
}, {
    readonly min: 3;
    readonly max: 3.9;
    readonly level: "초3";
    readonly description: "챕터북 시작";
}, {
    readonly min: 4;
    readonly max: 4.9;
    readonly level: "초4";
    readonly description: "본격적인 이야기 구조";
}, {
    readonly min: 5;
    readonly max: 5.9;
    readonly level: "초5";
    readonly description: "어휘·문장 길이 증가";
}, {
    readonly min: 6;
    readonly max: 6.9;
    readonly level: "초6";
    readonly description: "논픽션 비중 증가";
}, {
    readonly min: 7;
    readonly max: 8.9;
    readonly level: "중학생";
    readonly description: "복합 문장, 추론 필요";
}, {
    readonly min: 9;
    readonly max: 10.9;
    readonly level: "고등학생";
    readonly description: "문학 작품, 추상 개념";
}, {
    readonly min: 11;
    readonly max: 12;
    readonly level: "고급";
    readonly description: "성인 소설·고전";
}];
/** Lexile 지수 범위별 설명 */
export declare const LEXILE_INDEX_RANGES: readonly [{
    readonly min: 0;
    readonly max: 200;
    readonly level: "유아";
    readonly description: "알파벳·기초 단어";
}, {
    readonly min: 200;
    readonly max: 400;
    readonly level: "초1";
    readonly description: "아주 쉬운 문장";
}, {
    readonly min: 400;
    readonly max: 600;
    readonly level: "초2";
    readonly description: "간단한 스토리";
}, {
    readonly min: 600;
    readonly max: 800;
    readonly level: "초3";
    readonly description: "챕터북";
}, {
    readonly min: 800;
    readonly max: 1000;
    readonly level: "초4";
    readonly description: "정보량 증가";
}, {
    readonly min: 1000;
    readonly max: 1200;
    readonly level: "초5~6";
    readonly description: "교과서 수준";
}, {
    readonly min: 1200;
    readonly max: 1400;
    readonly level: "중학생";
    readonly description: "추론·비판적 읽기";
}, {
    readonly min: 1400;
    readonly max: 1600;
    readonly level: "고등학생";
    readonly description: "문학·비문학 혼합";
}, {
    readonly min: 1600;
    readonly max: 2000;
    readonly level: "성인";
    readonly description: "학술·고전 문학";
}];
/** AR 지수로 해당 범위 설명 조회 */
export declare const getARDescription: (ar: number) => {
    readonly min: 0;
    readonly max: 1.9;
    readonly level: "유아 ~ 초1";
    readonly description: "그림책, 아주 짧은 문장";
} | {
    readonly min: 2;
    readonly max: 2.9;
    readonly level: "초2";
    readonly description: "기초 리더북";
} | {
    readonly min: 3;
    readonly max: 3.9;
    readonly level: "초3";
    readonly description: "챕터북 시작";
} | {
    readonly min: 4;
    readonly max: 4.9;
    readonly level: "초4";
    readonly description: "본격적인 이야기 구조";
} | {
    readonly min: 5;
    readonly max: 5.9;
    readonly level: "초5";
    readonly description: "어휘·문장 길이 증가";
} | {
    readonly min: 6;
    readonly max: 6.9;
    readonly level: "초6";
    readonly description: "논픽션 비중 증가";
} | {
    readonly min: 7;
    readonly max: 8.9;
    readonly level: "중학생";
    readonly description: "복합 문장, 추론 필요";
} | {
    readonly min: 9;
    readonly max: 10.9;
    readonly level: "고등학생";
    readonly description: "문학 작품, 추상 개념";
} | {
    readonly min: 11;
    readonly max: 12;
    readonly level: "고급";
    readonly description: "성인 소설·고전";
} | undefined;
/** Lexile 지수로 해당 범위 설명 조회 */
export declare const getLexileDescription: (lexile: number) => {
    readonly min: 0;
    readonly max: 200;
    readonly level: "유아";
    readonly description: "알파벳·기초 단어";
} | {
    readonly min: 200;
    readonly max: 400;
    readonly level: "초1";
    readonly description: "아주 쉬운 문장";
} | {
    readonly min: 400;
    readonly max: 600;
    readonly level: "초2";
    readonly description: "간단한 스토리";
} | {
    readonly min: 600;
    readonly max: 800;
    readonly level: "초3";
    readonly description: "챕터북";
} | {
    readonly min: 800;
    readonly max: 1000;
    readonly level: "초4";
    readonly description: "정보량 증가";
} | {
    readonly min: 1000;
    readonly max: 1200;
    readonly level: "초5~6";
    readonly description: "교과서 수준";
} | {
    readonly min: 1200;
    readonly max: 1400;
    readonly level: "중학생";
    readonly description: "추론·비판적 읽기";
} | {
    readonly min: 1400;
    readonly max: 1600;
    readonly level: "고등학생";
    readonly description: "문학·비문학 혼합";
} | {
    readonly min: 1600;
    readonly max: 2000;
    readonly level: "성인";
    readonly description: "학술·고전 문학";
} | undefined;
/** 어절 수 → 재생 분수 계산 (200 WPM 기준) */
export declare const calcSoundMinutes: (wordCount: number) => number;
/** 언어 옵션 (UI Select용) */
export declare const getLanguageOptions: () => {
    value: BookLanguage;
    label: "한국어" | "English";
}[];
/** 길이 옵션 (UI Select용) */
export declare const getLengthOptions: () => {
    value: BookLength;
    label: "단편" | "중편" | "장편";
}[];
/** 장르 옵션 (UI Select용) */
export declare const getGenreOptions: () => {
    value: BookGenre;
    label: "문학" | "비문학" | "기타";
}[];
/** 영어레벨 옵션 (UI Select용) */
export declare const getEnLevelOptions: () => {
    value: BookEnLevel;
    label: "스토리" | "리더스" | "얼리챕터" | "미들챕터" | "챕터" | "노블";
}[];
/** 권장 연령 옵션 (5~19세) */
export declare const getAgeOptions: () => {
    value: number;
    label: string;
}[];
