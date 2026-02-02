// ========== 기본 타입 ==========

/** 언어 */
export type BookLanguage = "ko" | "en";
export const BookLanguageLabel = {
  ko: "한국어",
  en: "English",
} as const;

/** @deprecated BookLanguage 사용 권장 */
export enum BookLanguageCode {
  KO = "ko",
  EN = "en",
}

/** 권장 연령 범위 (5~19세) */
export const BOOK_AGE_MIN = 5;
export const BOOK_AGE_MAX = 19;

/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
export const BOOK_LEVEL_MIN = 5;
/** @deprecated BOOK_AGE_MIN/MAX 사용 권장 */
export const BOOK_LEVEL_MAX = 19;

/** 길이 */
export type BookLength = "short" | "medium" | "long";
export const BookLengthLabel = {
  short: "단편",
  medium: "중편",
  long: "장편",
} as const;

/** 종류 (단순화) */
export type BookGenre = "fiction" | "non-fiction" | "other";
export const BookGenreLabel = {
  fiction: "문학",
  "non-fiction": "비문학",
  other: "기타",
} as const;

/** @deprecated BookGenre type 사용 권장 */
export enum BookGenreEnum {
  FICTION = "fiction",
  NON_FICTION = "non-fiction",
  FAIRY_TALE = "fairy-tale",
  EDUCATIONAL = "educational",
  SCIENCE = "science",
  HISTORY = "history",
  BIOGRAPHY = "biography",
  POETRY = "poetry",
  OTHER = "other",
}

/** 영어레벨 (영어책 전용) */
export type BookEnLevel =
  | "story"
  | "readers"
  | "early-chapter"
  | "middle-chapter"
  | "chapter"
  | "novel";
export const BookEnLevelLabel = {
  story: "스토리",
  readers: "리더스",
  "early-chapter": "얼리챕터",
  "middle-chapter": "미들챕터",
  chapter: "챕터",
  novel: "노블",
} as const;

/** 출판 연령등급 (플랫폼 정책용) */
export type PublishAgeRating = "all" | "12" | "15" | "19";
export const PublishAgeRatingLabel = {
  all: "전체이용가",
  "12": "12세 이용가",
  "15": "15세 이용가",
  "19": "19세 이용가",
} as const;

/** @deprecated PublishAgeRating 사용 권장 */
export enum BookAgeGrade {
  ALL = "all",
  AGE_7 = "7+",
  AGE_12 = "12+",
  AGE_15 = "15+",
  AGE_19 = "19+",
}

// ========== 기본값 ==========

/** 새 책 생성 시 기본값 */
export const DEFAULT_BOOK_META = {
  title: "나의 책",
  language: "en" as BookLanguage,
  age: 5,
  length: "short" as BookLength,
  genre: "fiction" as BookGenre,
  quiz_retry_allowed: true,
  ar_index: 3.0,
  lexile_index: 600,
} as const;

// ========== AR / Lexile 지수 ==========

/** AR / Lexile 범위 매칭 규칙: min <= value <= max */

/** AR 지수 범위별 설명 (소수점 1자리 기준) */
export const AR_INDEX_RANGES = [
  { min: 0.0, max: 1.9, level: "유아 ~ 초1", description: "그림책, 아주 짧은 문장" },
  { min: 2.0, max: 2.9, level: "초2", description: "기초 리더북" },
  { min: 3.0, max: 3.9, level: "초3", description: "챕터북 시작" },
  { min: 4.0, max: 4.9, level: "초4", description: "본격적인 이야기 구조" },
  { min: 5.0, max: 5.9, level: "초5", description: "어휘·문장 길이 증가" },
  { min: 6.0, max: 6.9, level: "초6", description: "논픽션 비중 증가" },
  { min: 7.0, max: 8.9, level: "중학생", description: "복합 문장, 추론 필요" },
  { min: 9.0, max: 10.9, level: "고등학생", description: "문학 작품, 추상 개념" },
  { min: 11.0, max: 12.0, level: "고급", description: "성인 소설·고전" },
] as const;

/** Lexile 지수 범위별 설명 */
export const LEXILE_INDEX_RANGES = [
  { min: 0, max: 200, level: "유아", description: "알파벳·기초 단어" },
  { min: 200, max: 400, level: "초1", description: "아주 쉬운 문장" },
  { min: 400, max: 600, level: "초2", description: "간단한 스토리" },
  { min: 600, max: 800, level: "초3", description: "챕터북" },
  { min: 800, max: 1000, level: "초4", description: "정보량 증가" },
  { min: 1000, max: 1200, level: "초5~6", description: "교과서 수준" },
  { min: 1200, max: 1400, level: "중학생", description: "추론·비판적 읽기" },
  { min: 1400, max: 1600, level: "고등학생", description: "문학·비문학 혼합" },
  { min: 1600, max: 2000, level: "성인", description: "학술·고전 문학" },
] as const;

/** AR 지수로 해당 범위 설명 조회 (min <= value <= max) */
export const getARDescription = (ar: number) =>
  AR_INDEX_RANGES.find(r => ar >= r.min && ar <= r.max);

/** Lexile 지수로 해당 범위 설명 조회 (min <= value <= max) */
export const getLexileDescription = (lexile: number) =>
  LEXILE_INDEX_RANGES.find(r => lexile >= r.min && lexile <= r.max);

// ========== 헬퍼 함수 ==========

/** 어절 수 → 재생 분수 계산 (200 WPM 기준) */
export const calcSoundMinutes = (wordCount: number): number =>
  Math.ceil(wordCount / 200);

/** 언어 옵션 (UI Select용) */
export const getLanguageOptions = () =>
  Object.entries(BookLanguageLabel).map(([value, label]) => ({
    value: value as BookLanguage,
    label,
  }));

/** 길이 옵션 (UI Select용) */
export const getLengthOptions = () =>
  Object.entries(BookLengthLabel).map(([value, label]) => ({
    value: value as BookLength,
    label,
  }));

/** 장르 옵션 (UI Select용) */
export const getGenreOptions = () =>
  Object.entries(BookGenreLabel).map(([value, label]) => ({
    value: value as BookGenre,
    label,
  }));

/** 영어레벨 옵션 (UI Select용) */
export const getEnLevelOptions = () =>
  Object.entries(BookEnLevelLabel).map(([value, label]) => ({
    value: value as BookEnLevel,
    label,
  }));

/** 출판 연령등급 옵션 (UI Select용) */
export const getAgeRatingOptions = () =>
  Object.entries(PublishAgeRatingLabel).map(([value, label]) => ({
    value: value as PublishAgeRating,
    label,
  }));

/** 권장 연령 옵션 (5~19세) */
export const getAgeOptions = () =>
  Array.from({ length: BOOK_AGE_MAX - BOOK_AGE_MIN + 1 }, (_, i) => ({
    value: BOOK_AGE_MIN + i,
    label: `만 ${BOOK_AGE_MIN + i}세`,
  }));

// ========== 메타데이터 Interface ==========

/** Draft 책 메타 (MongoDB) */
export interface DraftBookMeta {
  // 식별
  draft_book_idx: number;

  // 필수 (기본값 있음)
  title: string;
  language: BookLanguage;
  age: number; // 5~19
  length: BookLength;

  // 선택 (기본값 있음)
  genre?: BookGenre;
  quiz_retry_allowed?: boolean;

  // 난이도 지수
  ar_index?: number; // 0.0 ~ 12.0 (소수점 1자리)
  lexile_index?: number; // 0 ~ 2000 (정수)

  // 선택 (기본값 없음)
  series?: string;
  cover_url?: string;
  en_level?: BookEnLevel;
  tags?: string[];
  description?: string;
  original_author?: string;
  original_publish_date?: string;
  original_publisher?: string;
  isbn?: string;

  // 자동
  updated_at: string;
}

/** 출판된 책 메타 (MongoDB) */
export interface BookMeta extends DraftBookMeta {
  book_idx: number;
  source_draft_book_idx: number;
  creator_idx: number;
  creator_name?: string;

  // 출판 정보
  price_point: number;
  age_rating: PublishAgeRating;
  free_section_arr?: number[];

  // 통계
  word_count?: number;
  sound_minutes?: number;
  section_count?: number;

  published_at: string;
}

// ========== 공통 타입 (camelCase) - Legacy ==========

/** 오디오 메타 정보 (TTS 설정) */
export type AudioMeta = {
  provider: "AWS" | "GCP";
  language?: "en-US" | "ko-KR";
  engine?: "neural" | "standard" | "long-form";
  voiceName?: string;
  voiceGender?: "Male" | "Female";
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
  draft_book_ar_index?: number | null;
  draft_book_lexile_index?: number | null;
  draft_book_sections?: SectionSummaryResponse[];
  draft_book_section_order?: string[];
}
