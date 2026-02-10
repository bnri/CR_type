import type { BookStatus } from "./book.type";
/** 요청 처리 결과 */
export type RequestResult = "pending" | "approved" | "rejected" | "admin";
/** MySQL book_status_request 테이블 1:1 */
export interface BookStatusRequest {
    request_idx: number;
    book_idx: number;
    from_status: BookStatus;
    to_status: BookStatus;
    requested_by: number;
    request_reason: string;
    result: RequestResult;
    reviewed_by: number | null;
    review_reason: string | null;
    created_at: string;
    reviewed_at: string | null;
}
