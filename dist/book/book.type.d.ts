/** 언어 코드 */
export declare enum BookLanguageCode {
    KO = "ko",
    EN = "en"
}
/** 레벨 범위 */
export declare const BOOK_LEVEL_MIN = 5;
export declare const BOOK_LEVEL_MAX = 19;
/** 연령 등급 */
export declare enum BookAgeGrade {
    ALL = "all",// 전체이용가
    AGE_7 = "7+",// 7세 이상
    AGE_12 = "12+",// 12세 이상
    AGE_15 = "15+",// 15세 이상
    AGE_19 = "19+"
}
/** 책 종류/장르 */
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
/** 어절 수 → 재생 분수 계산 (200 WPM 기준) */
export declare const calcSoundMinutes: (wordCount: number) => number;
/** 책 기본 정보 (리스트용) */
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
/** 책 상세 정보 */
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
/** Draft 책 정보 - API 응답용 */
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
