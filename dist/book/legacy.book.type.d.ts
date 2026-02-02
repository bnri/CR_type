/**
 * @deprecated Legacy 타입 — 신규 코드에서 사용 금지
 * Book 통합 리팩토링 전 타입 백업 (2026-02-02)
 * 신규: Book (book.type.ts), BookDTO (book-api.type.ts), MakeBookState (store.types.ts)
 */
import type { BookLanguage, BookLength, BookGenre, BookEnLevel, PublishAgeRating, SectionSummary, SectionSummaryResponse } from './book.type';
import type { SectionData, SectionId } from '../ast/ast.types';
/** @deprecated BookLanguage 사용 권장 */
export declare enum BookLanguageCode {
    KO = "ko",
    EN = "en"
}
/** @deprecated BookGenre type 사용 권장 */
export declare enum BookGenreEnum {
    FICTION = "fiction",
    NON_FICTION = "non-fiction",
    FAIRY_TALE = "fairy-tale",
    EDUCATIONAL = "educational",
    SCIENCE = "science",
    HISTORY = "history",
    BIOGRAPHY = "biography",
    POETRY = "poetry",
    OTHER = "other"
}
/** @deprecated PublishAgeRating 사용 권장 */
export declare enum BookAgeGrade {
    ALL = "all",
    AGE_7 = "7+",
    AGE_12 = "12+",
    AGE_15 = "15+",
    AGE_19 = "19+"
}
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
export declare const BOOK_LEVEL_MIN = 5;
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
export declare const BOOK_LEVEL_MAX = 19;
/** @deprecated Book 인터페이스 사용 권장 */
export interface DraftBookMeta {
    draft_book_idx: number;
    title: string;
    language: BookLanguage;
    age: number;
    length: BookLength;
    genre?: BookGenre;
    quiz_retry_allowed?: boolean;
    ar_index?: number;
    lexile_index?: number;
    series?: string;
    cover_url?: string;
    en_level?: BookEnLevel;
    tags?: string[];
    description?: string;
    original_author?: string;
    original_publish_date?: string;
    original_publisher?: string;
    isbn?: string;
    updated_at: string;
}
/** @deprecated Book 인터페이스 사용 권장 */
export interface BookMeta extends DraftBookMeta {
    book_idx: number;
    source_draft_book_idx: number;
    creator_idx: number;
    creator_name?: string;
    price_point: number;
    age_rating: PublishAgeRating;
    free_section_arr?: number[];
    word_count?: number;
    sound_minutes?: number;
    section_count?: number;
    published_at: string;
}
/** @deprecated BookListItem 사용 권장 */
export interface BookShort {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    language: BookLanguageCode;
    level: number;
    genre: string;
    wordCount?: number;
    soundMinutes?: number;
    rating?: number;
}
/** @deprecated BookDTO 사용 권장 */
export interface BookDetail extends BookShort {
    description?: string;
    tags?: string[];
    ageGrade?: BookAgeGrade;
    isbn?: string;
    originalPublisher?: string;
    originalPublishDate?: string;
    edition?: string;
    quizRetryAllowed?: boolean;
    toc?: string[];
    rating?: number;
    publishedAtText?: string;
    priceText?: string;
    sections?: SectionSummary[];
    sectionOrder?: string[];
}
/** @deprecated Book 인터페이스 사용 권장 (draft_book_ prefix 제거됨) */
export interface DraftBookResponse {
    draft_book_idx: number;
    draft_book_title: string;
    draft_book_language: BookLanguageCode;
    draft_book_level: number;
    draft_book_cover_url: string | null;
    draft_book_create_date?: string;
    draft_book_update_date: string;
    draft_book_author?: string | null;
    draft_book_age_grade?: BookAgeGrade | null;
    draft_book_genre?: string | null;
    draft_book_tags?: string[] | null;
    draft_book_description?: string | null;
    draft_book_original_publish_date?: string | null;
    draft_book_original_publisher?: string | null;
    draft_book_edition?: string | null;
    draft_book_isbn?: string | null;
    draft_book_word_count?: number | null;
    draft_book_sound_minutes?: number | null;
    draft_book_quiz_retry_allowed?: boolean;
    draft_book_ar_index?: number | null;
    draft_book_lexile_index?: number | null;
    draft_book_sections?: SectionSummaryResponse[];
    draft_book_section_order?: string[];
}
/** @deprecated Book 인터페이스 사용 권장 */
export interface DraftMeta {
    draft_book_idx: number;
    draft_book_title: string;
    draft_book_language: 'ko' | 'en';
    draft_book_level: number;
    draft_book_cover_url: string | null;
    draft_book_length: string | null;
    draft_book_genre: string | null;
    draft_book_en_level: string | null;
    draft_book_series: string | null;
    draft_book_author: string | null;
    draft_book_tags: string[] | null;
    draft_book_description: string | null;
    draft_book_original_publish_date: string | null;
    draft_book_original_publisher: string | null;
    draft_book_isbn: string | null;
    draft_book_word_count: number | null;
    draft_book_ar_index: number | null;
    draft_book_lexile_index: number | null;
    draft_book_quiz_retry_allowed: boolean;
    draft_book_create_date: string;
    draft_book_update_date: string;
    draft_book_publish_status?: 'draft' | 'pending' | 'rejected';
}
/** @deprecated BookDTO 사용 권장 */
export type DraftSummary = {
    sectionOrder: SectionId[];
    sections?: SectionSummary[];
};
/** @deprecated BookDTO 사용 권장 */
export type BookDraftDTO = {
    meta: DraftMeta;
    summary: DraftSummary;
    content: SectionData[];
};
