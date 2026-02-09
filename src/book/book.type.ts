// ========== 리터럴 유니온 타입 ==========

import { SectionData } from "../ast";
import { SectionSummary } from "./book-sections.type";

/** 언어 */
export type BookLanguage = "ko" | "en";

/** 길이 */
export type BookLength = "short" | "medium" | "long";

/** 종류 */
export type BookGenre = "fiction" | "non-fiction" | "other";

/** 영어레벨 (영어책 전용) */
export type BookEnLevel =
  | "story"
  | "readers"
  | "early-chapter"
  | "middle-chapter"
  | "chapter"
  | "novel";

/** 책 상태 (라이프사이클) */
export type BookStatus = "draft" | "pending" | "published" | "suspended";

// ========== MySQL book 테이블 1:1 ==========

/** MySQL book 테이블 매핑 (단일 테이블) */
export interface Book {
  book_idx: number;
  creator_idx: number;
  status: BookStatus;

  // 기본 정보
  book_title: string;
  book_language: BookLanguage;
  book_level: number;
  book_cover_url: string | null;

  // 분류
  genre: BookGenre | null;
  length: BookLength | null;
  en_level: BookEnLevel | null;

  // 난이도 지수
  ar_index: number | null;
  lexile_index: number | null;

  // 저작 정보
  series: string | null;
  original_author: string | null;
  description: string | null;
  original_publish_date: string | null;
  original_publisher: string | null;
  isbn: string | null;

  // 출판/심사 조건
  price_point: number | null;
  quiz_retry_allowed: boolean;

  // 태그 (book_tag 조인 결과)
  tags: string[] | null;

  // 소프트 삭제
  isdeleted: boolean;

  // 타임스탬프
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// ========== API 응답 DTO ==========

/** 책 상세 조회 API 응답 (meta + summary + content) */
export interface BookDTO {
  meta: Book;
  summary: {
    sectionOrder: string[];
    sections: SectionSummary[];
    free_section_ids: string[] | null;
  };
  content: SectionData[];
}

// ========== 라벨 (UI 표시용) ==========

export const BookLanguageLabel = {
  ko: "한국어",
  en: "English",
} as const;

export const BookLengthLabel = {
  short: "단편",
  medium: "중편",
  long: "장편",
} as const;

export const BookGenreLabel = {
  fiction: "문학",
  "non-fiction": "비문학",
  other: "기타",
} as const;

export const BookEnLevelLabel = {
  story: "스토리",
  readers: "리더스",
  "early-chapter": "얼리챕터",
  "middle-chapter": "미들챕터",
  chapter: "챕터",
  novel: "노블",
} as const;

// ========== 상수 ==========

/** 권장 연령 범위 (5~19세) */
export const BOOK_AGE_MIN = 5;
export const BOOK_AGE_MAX = 19;

/** 새 책 생성 시 기본값 */
export const DEFAULT_BOOK_META = {
  book_title: "나의 책",
  book_language: "en" as BookLanguage,
  book_level: 5,
  length: "short" as BookLength,
  genre: "fiction" as BookGenre,
  quiz_retry_allowed: true,
  ar_index: 3.0,
  lexile_index: 600,
} as const;

// ========== AR / Lexile 지수 ==========

/** AR 지수 범위별 설명 (소수점 1자리 기준) */
export const AR_INDEX_RANGES = [
  {
    min: 0.0,
    max: 1.9,
    level: "유아 ~ 초1",
    description: "그림책, 아주 짧은 문장",
  },
  { min: 2.0, max: 2.9, level: "초2", description: "기초 리더북" },
  { min: 3.0, max: 3.9, level: "초3", description: "챕터북 시작" },
  { min: 4.0, max: 4.9, level: "초4", description: "본격적인 이야기 구조" },
  { min: 5.0, max: 5.9, level: "초5", description: "어휘·문장 길이 증가" },
  { min: 6.0, max: 6.9, level: "초6", description: "논픽션 비중 증가" },
  { min: 7.0, max: 8.9, level: "중학생", description: "복합 문장, 추론 필요" },
  {
    min: 9.0,
    max: 10.9,
    level: "고등학생",
    description: "문학 작품, 추상 개념",
  },
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

/** AR 지수로 해당 범위 설명 조회 */
export const getARDescription = (ar: number) =>
  AR_INDEX_RANGES.find((r) => ar >= r.min && ar <= r.max);

/** Lexile 지수로 해당 범위 설명 조회 */
export const getLexileDescription = (lexile: number) =>
  LEXILE_INDEX_RANGES.find((r) => lexile >= r.min && lexile <= r.max);

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



/** 권장 연령 옵션 (5~19세) */
export const getAgeOptions = () =>
  Array.from({ length: BOOK_AGE_MAX - BOOK_AGE_MIN + 1 }, (_, i) => ({
    value: BOOK_AGE_MIN + i,
    label: `만 ${BOOK_AGE_MIN + i}세`,
  }));
