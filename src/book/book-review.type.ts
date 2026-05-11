// ========== MySQL book_review 테이블 1:1 ==========

/**
 * MySQL book_review 테이블 매핑.
 * 자녀가 작성한 책 후기 (child당 책 1개, upsert).
 * book.rating_sum / review_count 집계는 INSERT/UPDATE/DELETE 트랜잭션에서 동기 갱신.
 */
export interface BookReview {
  review_idx: number;
  child_idx: number;
  book_idx: number;
  /** 1~5 */
  rating: number;
  content: string;
  /** ISO datetime */
  created_at: string;
  /** ISO datetime, 최초 작성 시 null */
  updated_at: string | null;
}

/**
 * 목록 조회 응답 — book_review JOIN child 로 작성자(child) 표시 컬럼 포함.
 * isdeleted 는 응답에서 제외 (필터링된 결과만 노출).
 */
export interface BookReviewWithChild extends BookReview {
  /** child.child_name */
  child_name: string;
  /** child.child_image_url */
  child_image_url: string | null;
  /** child.child_birthday — 나이 계산용. 미등록 자녀는 null */
  child_birthday: string | null;
  /**
   * child.bg_color — avatar fallback 색 토큰 키
   * (navy|forest|brick|mustard|violet|wine|slate|walnut).
   */
  child_bg_color: string | null;
}

/** POST/PATCH body */
export type BookReviewUpsertBody = Pick<BookReview, 'rating' | 'content'>;
