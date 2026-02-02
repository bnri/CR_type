import type { SectionId, SectionData } from '../ast/ast.types';
import type { Book, SectionSummary } from '../book/book.type';
export type SectionMap = Record<SectionId, SectionData>;
export type RuntimeTemp = {
    /** 오디오 blobUrl (런타임 전용): sectionId -> clipIndex -> blobUrl */
    audioBlobUrlBySection: Record<SectionId, Record<number, string>>;
    /** 이미지 blobUrl (런타임 전용): sectionId -> imageIndex -> blobUrl */
    imageBlobUrlBySection: Record<SectionId, Record<number, string>>;
};
export type SaveStatus = 'unsaved' | 'saving' | 'saved' | 'error';
export type SectionSaveState = {
    status: SaveStatus;
    savedAt?: string;
    errorMessage?: string;
};
export type BookSaveState = {
    /** 메타 저장 상태 */
    meta: SaveStatus;
    /** 섹션 순서 저장 상태 */
    order: SaveStatus;
    /** 섹션별 저장 상태 */
    sections: Record<SectionId, SectionSaveState>;
    /** 저장 진행률 */
    progress?: {
        current: number;
        total: number;
        jobId?: string;
    };
};
export interface MakeBookState {
    meta: Book | null;
    /** 정규화된 섹션 맵 */
    sectionsById: SectionMap;
    /** 섹션 순서(목차) */
    sectionOrder: SectionId[];
    /** 리스트 캐시(선택) */
    sectionSummaries?: SectionSummary[];
    /** 런타임 전용(blobUrl 등) */
    temp: RuntimeTemp;
    /** 저장 상태 (클라이언트 전용) */
    saveState: BookSaveState;
}
