/** MySQL tag 테이블 1:1 */
export interface Tag {
    tag_idx: number;
    tag_name: string;
}
/** MySQL book_tag 테이블 1:1 */
export interface BookTag {
    book_idx: number;
    tag_idx: number;
}
