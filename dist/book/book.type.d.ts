/** 언어 */
export type BookLanguage = 'ko' | 'en';
export declare const BookLanguageLabel: {
    readonly ko: "한국어";
    readonly en: "English";
};
/** @deprecated BookLanguage 사용 권장 */
export declare enum BookLanguageCode {
    KO = "ko",
    EN = "en"
}
/** 권장 연령 범위 (5~19세) */
export declare const BOOK_AGE_MIN = 5;
export declare const BOOK_AGE_MAX = 19;
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
export declare const BOOK_LEVEL_MIN = 5;
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
export declare const BOOK_LEVEL_MAX = 19;
/** 길이 */
export type BookLength = 'short' | 'medium' | 'long';
export declare const BookLengthLabel: {
    readonly short: "단편";
    readonly medium: "중편";
    readonly long: "장편";
};
/** 종류 (단순화) */
export type BookGenre = 'fiction' | 'non-fiction' | 'other';
export declare const BookGenreLabel: {
    readonly fiction: "문학";
    readonly 'non-fiction': "비문학";
    readonly other: "기타";
};
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
/** 영어레벨 (영어책 전용) */
export type BookEnLevel = 'story' | 'readers' | 'early-chapter' | 'chapter' | 'novel';
export declare const BookEnLevelLabel: {
    readonly story: "스토리";
    readonly readers: "리더스";
    readonly 'early-chapter': "얼리챕터";
    readonly chapter: "챕터";
    readonly novel: "노블";
};
/** 출판 연령등급 (플랫폼 정책용) */
export type PublishAgeRating = 'all' | '12' | '15' | '19';
export declare const PublishAgeRatingLabel: {
    readonly all: "전체이용가";
    readonly '12': "12세 이용가";
    readonly '15': "15세 이용가";
    readonly '19': "19세 이용가";
};
/** @deprecated PublishAgeRating 사용 권장 */
export declare enum BookAgeGrade {
    ALL = "all",
    AGE_7 = "7+",
    AGE_12 = "12+",
    AGE_15 = "15+",
    AGE_19 = "19+"
}
/** 새 책 생성 시 기본값 */
export declare const DEFAULT_BOOK_META: {
    readonly title: "나의 책";
    readonly language: BookLanguage;
    readonly age: 5;
    readonly length: BookLength;
    readonly genre: BookGenre;
    readonly quiz_retry_allowed: true;
};
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
    label: "스토리" | "리더스" | "얼리챕터" | "챕터" | "노블";
}[];
/** 출판 연령등급 옵션 (UI Select용) */
export declare const getAgeRatingOptions: () => {
    value: PublishAgeRating;
    label: "전체이용가" | "12세 이용가" | "15세 이용가" | "19세 이용가";
}[];
/** 권장 연령 옵션 (5~19세) */
export declare const getAgeOptions: () => {
    value: number;
    label: string;
}[];
/** Draft 책 메타 (MongoDB) */
export interface DraftBookMeta {
    draft_book_idx: number;
    title: string;
    language: BookLanguage;
    age: number;
    length: BookLength;
    genre?: BookGenre;
    quiz_retry_allowed?: boolean;
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
/** 출판된 책 메타 (MongoDB) */
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
/** 오디오 메타 정보 (TTS 설정) */
export type AudioMeta = {
    provider: 'AWS' | 'GCP';
    language?: 'en-US' | 'ko-KR';
    engine?: 'neural' | 'standard' | 'long-form';
    voiceName?: string;
    voiceGender?: 'Male' | 'Female';
};
/** 섹션 요약 정보 */
export interface SectionSummary {
    sectionId: string;
    title: string;
    order: number;
    audioCount: number;
    imageCount: number;
    quizCount: number;
    wordCount: number;
    soundMinutes?: number;
    isAddedSplit?: boolean;
    isAddedAudio?: boolean;
    isAddedQuiz?: boolean;
    updatedAt?: string;
    audioMeta?: AudioMeta;
}
/** 책 기본 정보 (리스트용) - Legacy */
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
/** 책 상세 정보 - Legacy */
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
/** 섹션 요약 - API 응답용 */
export interface SectionSummaryResponse {
    section_id: string;
    title: string;
    order: number;
    audio_count: number;
    image_count: number;
    quiz_count: number;
    word_count: number;
    sound_minutes?: number;
    is_added_split?: boolean;
    is_added_audio?: boolean;
    is_added_quiz?: boolean;
    updated_at?: string;
}
/** Draft 책 정보 - API 응답용 (Legacy) */
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
    draft_book_sections?: SectionSummaryResponse[];
    draft_book_section_order?: string[];
}
