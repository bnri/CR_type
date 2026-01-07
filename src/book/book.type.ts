// ========== Enums ==========

/** 언어 코드 */
export enum BookLanguageCode {
  KO = 'ko',
  EN = 'en',
}

/** 레벨 범위 */
export const BOOK_LEVEL_MIN = 5;
export const BOOK_LEVEL_MAX = 19;

/** 연령 등급 */
export enum BookAgeGrade {
  ALL = 'all', // 전체이용가
  AGE_7 = '7+', // 7세 이상
  AGE_12 = '12+', // 12세 이상
  AGE_15 = '15+', // 15세 이상
  AGE_19 = '19+', // 19세 이상
}

/** 책 종류/장르 */
export enum BookGenre {
  FICTION = 'fiction', // 소설
  NON_FICTION = 'non-fiction', // 비소설
  FAIRY_TALE = 'fairy-tale', // 동화
  EDUCATIONAL = 'educational', // 교육
  SCIENCE = 'science', // 과학
  HISTORY = 'history', // 역사
  BIOGRAPHY = 'biography', // 전기
  POETRY = 'poetry', // 시
  OTHER = 'other', // 기타
}

// ========== 헬퍼 함수 ==========

/** 어절 수 → 재생 분수 계산 (200 WPM 기준) */
export const calcSoundMinutes = (wordCount: number): number => Math.ceil(wordCount / 200);

// ========== 공통 타입 (camelCase) ==========

/** 책 기본 정보 (리스트용) */
export interface BookShort {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  language: BookLanguageCode;
  level: number;
  genre: string;
  wordCount?: number; // 전체 어절 수
  soundMinutes?: number; // 재생 분수 (wordCount / 200)
  rating?: number; // 평균 평점 (Published 책에서만, 없으면 undefined)
}

/** 책 상세 정보 */
export interface BookDetail extends BookShort {
  // 공통
  description?: string;
  tags?: string[];
  ageGrade?: BookAgeGrade;
  isbn?: string;
  originalPublisher?: string;
  originalPublishDate?: string;
  edition?: string;
  quizRetryAllowed?: boolean;
  toc?: string[];

  // 출판 전용 (optional)
  rating?: number;
  publishedAtText?: string;
  priceText?: string;

  // Draft 전용 (optional)
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
  soundMinutes?: number; // 섹션 재생 분수
  isAddedSplit?: boolean;
  isAddedAudio?: boolean;
  isAddedQuiz?: boolean;
  updatedAt?: string;
  audioMeta?: AudioMeta; // TTS 설정 정보
}

// ========== API 응답용 타입 (snake_case) ==========

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
  // 확장 메타 정보
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
  // 섹션 정보
  draft_book_sections?: SectionSummaryResponse[];
  draft_book_section_order?: string[];
}
