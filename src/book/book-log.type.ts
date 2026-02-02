/** book_log.action ENUM */
export type BookLogAction = 'request' | 'approve' | 'reject' | 'cancel' | 'suspend' | 'unsuspend';

/** book_log.acted_by_type ENUM */
export type BookLogActorType = 'admin' | 'creator';

/** MySQL book_log 테이블 1:1 */
export interface BookLog {
  book_log_idx: number;
  book_idx: number;
  action: BookLogAction;
  acted_by_type: BookLogActorType;
  acted_by_idx: number;
  reason: string | null;
  created_at: string;
}
