// 값 자체를 코드로 쓰는 용도 (DB 저장/전송)
export enum BookLanguageCode {
  KO = 'ko',
  EN = 'en',
}

// 레벨 범위도 중앙집중 관리
export const BOOK_LEVEL_MIN = 5;
export const BOOK_LEVEL_MAX = 19;

// 연령 등급
export enum BookAgeGrade {
  ALL = 'all', // 전체이용가
  AGE_7 = '7+', // 7세 이상
  AGE_12 = '12+', // 12세 이상
  AGE_15 = '15+', // 15세 이상
  AGE_19 = '19+', // 19세 이상
}

// 책 길이
export enum BookLength {
  SHORT = 'short', // 단편
  MEDIUM = 'medium', // 중편
  LONG = 'long', // 장편
}

// 책 종류/장르
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

