import { BookGenre, BookLength } from '../book/book.type';
/** 퀴즈 재풀기 옵션 */
export type ChildPreferenceQuizRetake = 'allowed' | 'not-allowed';
/**
 * 자녀 선호 정보 (책 추천 알고리즘 입력)
 * MySQL 매핑:
 *   - preferred_book_types  → child_extended.preferred_book_types JSON
 *   - preferred_book_lengths → child_extended.preferred_book_lengths JSON
 *   - quiz_retake_options    → child_extended.quiz_retake_options JSON
 *   - preferred_tag_idxs     → child_tag (M:N) → tag.tag_idx
 *
 * 모두 다중선택 (배열). 빈 배열 = "선호 없음".
 * 언어 선호(child_kr/child_en) 는 child 본 테이블에 boolean 으로 잔존 (UI 만 다중 체크).
 */
export interface ChildPreference {
    preferred_book_types: BookGenre[];
    preferred_book_lengths: BookLength[];
    quiz_retake_options: ChildPreferenceQuizRetake[];
    preferred_tag_idxs: number[];
}
