export type SectionId = string;
export type InlineRun = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    split?: boolean;
    splitIndex?: number;
    audioChunkIndex?: number;
    audioTimeMs?: number;
    audioStart?: number;
    audioEnd?: number;
    audioValue?: string;
};
export type ListMeta = {
    kind: 'ordered' | 'bullet';
    level: number;
    numId?: number;
    format?: string;
    glyph?: string;
};
export type ParagraphBlock = {
    id: string;
    type: 'paragraph';
    runs: InlineRun[];
    list?: ListMeta;
    textAlign?: 'left' | 'right' | 'center' | 'justify';
};
export type ImageBlock = {
    id: string;
    type: 'image';
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    assetKey?: string;
    cdnUrl?: string;
};
export type Block = ParagraphBlock | ImageBlock;
export interface AudioMark {
    time: number;
    start: number;
    end: number;
    value: string;
}
export interface AudioClipMeta {
    provider: string;
    TTS_engine: string;
    language: string;
    speaker: string;
    durationMs: number;
    wordCount: number;
    wpm: number;
}
type SectionAudioBase = {
    chunkIndex: number;
    marks?: AudioMark[];
    contentType: string;
    sizeBytes?: number;
    meta: AudioClipMeta;
};
export type SavedSectionAudio = SectionAudioBase & {
    kind: 'saved';
    cdnUrl: string;
};
export type TempSectionAudio = SectionAudioBase & {
    kind: 'temp';
    blobUrl: string;
};
export type SectionAudio = SavedSectionAudio | TempSectionAudio;
export type SectionImage = {
    kind: 'saved';
    index: number;
    cdnUrl: string;
    alt?: string;
    width?: number;
    height?: number;
    assetKey?: string;
} | {
    kind: 'temp';
    index: number;
    blobUrl: string;
    alt?: string;
    width?: number;
    height?: number;
    assetKey?: string;
};
export type SectionQuiz = {
    qid: string;
    kind: 'saved';
    index: number;
    cdnUrl: string;
    question: string;
    options: string[];
    answers: string[];
    score: number;
    limit_sec: number;
} | {
    qid: string;
    kind: 'temp';
    index: number;
    blobUrl: string;
    question: string;
    options: string[];
    answers: string[];
    score: number;
    limit_sec: number;
};
export type SectionAST = {
    title: string;
    blocks: Block[];
    isAddedSplit?: boolean;
    isAddedAudio?: boolean;
};
export type SectionData = {
    section_id: SectionId;
    ast: SectionAST;
    images?: SectionImage[];
    audios?: SectionAudio[];
    quiz?: SectionQuiz[];
};
/** 드래프트 책 메타 정보 (cr.erd.json CR.draft_book 테이블 기준)
 * - user_idx는 백엔드 세션에서 확인하므로 프론트에서 전송하지 않음
 * - isdeleted는 백엔드 내부용이므로 프론트에 노출하지 않음
 */
export interface DraftMeta {
    /** PK */
    draft_book_idx: number;
    /** 책 제목 (default: 'untitled') */
    draft_book_title: string;
    /** 언어 코드 */
    draft_book_language: 'ko' | 'en';
    /** 난이도 레벨 (권장 연령, default: 5) */
    draft_book_level: number;
    /** 표지 이미지 URL (nullable) */
    draft_book_cover_url: string | null;
    /** 책 길이 (short/medium/long) */
    draft_book_length: string | null;
    /** 책 종류/장르 (fiction/non-fiction/other) */
    draft_book_genre: string | null;
    /** 영어레벨 (영어책 전용) */
    draft_book_en_level: string | null;
    /** 시리즈명 */
    draft_book_series: string | null;
    /** 원작자 */
    draft_book_author: string | null;
    /** 태그 배열 */
    draft_book_tags: string[] | null;
    /** 설명 */
    draft_book_description: string | null;
    /** 원출판일 (YYYY-MM-DD) */
    draft_book_original_publish_date: string | null;
    /** 원출판사 */
    draft_book_original_publisher: string | null;
    /** ISBN */
    draft_book_isbn: string | null;
    /** 총 어절 수 (자동 계산) */
    draft_book_word_count: number | null;
    /** QUIZ 다시풀기 허용 여부 */
    draft_book_quiz_retry_allowed: boolean;
    /** 생성일 (ISO) */
    draft_book_create_date: string;
    /** 수정일 (ISO) */
    draft_book_update_date: string;
    /** 출판 상태 */
    draft_book_publish_status?: 'draft' | 'pending' | 'rejected';
}
import { SectionSummary } from '../book/book.type';
export type DraftSummary = {
    sectionOrder: SectionId[];
    sections?: SectionSummary[];
};
export type BookDraftDTO = {
    meta: DraftMeta;
    summary: DraftSummary;
    content: SectionData[];
};
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
export type DraftSaveState = {
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
    meta: DraftMeta | null;
    /** 정규화된 섹션 맵 */
    sectionsById: SectionMap;
    /** 섹션 순서(목차) */
    sectionOrder: SectionId[];
    /** 리스트 캐시(선택) */
    sectionSummaries?: SectionSummary[];
    /** 런타임 전용(blobUrl 등) */
    temp: RuntimeTemp;
    /** 저장 상태 (클라이언트 전용) */
    saveState: DraftSaveState;
}
export {};
