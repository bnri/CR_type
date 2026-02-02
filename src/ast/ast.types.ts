import type { AudioMeta } from '../book/book-sections.type';

// === 콘텐츠 타입 (순수 AST + 미디어) ===
export type SectionId = string;

export type InlineRun = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  split?: boolean;
  splitIndex?: number;

  //오디오 마킹후에
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

/** 개별 오디오 클립 메타 (AudioMeta 확장 + 결과 데이터) */
export type AudioClipMeta = AudioMeta & {
  durationMs: number;
  wordCount: number;
};

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

export type SectionImage =
  | {
      kind: 'saved';
      index: number;
      cdnUrl: string;
      alt?: string;
      width?: number;
      height?: number;
      assetKey?: string;
    }
  | {
      kind: 'temp';
      index: number;
      blobUrl: string;
      alt?: string;
      width?: number;
      height?: number;
      assetKey?: string;
    };

export type SectionQuiz =
  | {
      qid: string;
      kind: 'saved';
      index: number;
      image_cdn_url: string;
      question: string;
      options: string[];
      answers: string[];
      score: number;
      limit_sec: number;
    }
  | {
      qid: string;
      kind: 'temp';
      index: number;
      image_blob_url: string;
      question: string;
      options: string[];
      answers: string[];
      score: number;
      limit_sec: number;
    };

export type SectionAST = {
  title: string;
  blocks: Block[];
};

export type SectionData = {
  section_id: SectionId;
  ast: SectionAST;
  images?: SectionImage[];
  audios?: SectionAudio[];
  quizzes?: SectionQuiz[];
};
