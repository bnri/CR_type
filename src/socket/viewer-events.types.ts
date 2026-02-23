// src/socket/viewer-events.types.ts
// 뷰어 이벤트 타입 정의 (source of truth)
// CR_viewer의 viewerEvent.types.ts에서 이관

// ===================== 뷰어 상태 타입 =====================

export type ViewerMode = 'scroll' | 'page';
export type ViewerTheme = 'light' | 'dark' | 'sepia' | 'green';
export type PointerStyle = 'highlight' | 'underline';

/** 뷰어 전체 상태 (CR_viewer store 상태) */
export type CRViewerState = {
  mode: ViewerMode;
  theme: ViewerTheme;
  fontFamily: string;
  fontSizePx: number;
  lineHeight: number;
  marginX: number;
  marginY: number;
  showOverlays: boolean;
  /** 컴팩트 오버레이 모드 (topbar 숨김 + bottombar 축소) */
  overlayCompactMode: boolean;
  isSettingsOpen: boolean;
  pointerStyle: PointerStyle;
  pointerColor: string;
  breakMarks: { slash: boolean };
  breakGapPx: number;
  muteAudio: boolean;
  /** 오디오 재생 속도 (1.0 = 기본, 0.05 단위 증감, 범위: 0.3~2.0) */
  audioSpeed: number;
  showPointer: boolean;
  showSplit: boolean;
  viewportWidth: number;
  viewportHeight: number;
};

// ===================== 이벤트 타입 =====================

/** 뷰어 이벤트 타입 */
export type ViewerEventType =
  | 'global_index_change'
  | 'scroll'
  | 'page_change'
  | 'section_change'
  | 'mode_change'
  | 'settings_change'
  | 'render_start'
  | 'loading_start'
  | 'loading_end'
  | 'viewport_resize'
  | 'audio_control'
  | 'range_select'
  | 'range_change'
  | 'range_clear'
  | 'translate_request'
  | 'translate_loading_start'
  | 'translate_loading_end'
  | 'translate_modal_close';

/** 오디오 상태 스냅샷 */
export type AudioSnapshot = {
  status: 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';
  currentClip: number;
  currentTimeMs: number;
};

/** 텍스트 선택 상태 스냅샷 */
export type RangeSnapshot = {
  startGI: number;
  endGI: number;
  text: string;
};

/** 번역 모달 상태 스냅샷 */
export type TranslateSnapshot = {
  isOpen: boolean;
  isLoading: boolean;
  text?: string;
  translatedText?: string;
  startGI?: number;
  endGI?: number;
};

/** 오디오 제어 액션 타입 */
export type AudioControlAction = 'play' | 'pause' | 'stop';

/** 기본 이벤트 (뷰어에서 emit) */
export type ViewerEventBase<T extends ViewerEventType, P = Record<string, unknown>> = {
  type: T;
  timestamp: number;
  payload: P;
};

/** 저장용 이벤트 (외부에서 relTime 추가) */
export type StoredViewerEvent<
  T extends ViewerEventType,
  P = Record<string, unknown>,
> = ViewerEventBase<T, P> & {
  relTime: number;
};

// ===================== 개별 이벤트 타입 =====================

export type GlobalIndexChangeEvent = ViewerEventBase<
  'global_index_change',
  { globalIndex: number }
>;
export type ScrollEvent = ViewerEventBase<
  'scroll',
  {
    scrollTop: number;
    scrollRatio: number;
    anchorGI: number;
    anchorOffsetRatio: number;
  }
>;
export type PageChangeEvent = ViewerEventBase<'page_change', { page: number; pageIndex?: number }>;
export type SectionChangeEvent = ViewerEventBase<'section_change', { sectionId: string }>;
export type ModeChangeEvent = ViewerEventBase<'mode_change', { mode: ViewerMode }>;
export type SettingsChangeEvent = ViewerEventBase<
  'settings_change',
  { key: keyof CRViewerState; value: unknown }
>;
export type RenderStartEvent = ViewerEventBase<'render_start', { sectionId: string }>;
export type LoadingStartEvent = ViewerEventBase<'loading_start', Record<string, never>>;
export type LoadingEndEvent = ViewerEventBase<'loading_end', { duration: number }>;
export type ViewportResizeEvent = ViewerEventBase<
  'viewport_resize',
  { width: number; height: number }
>;
export type AudioControlEvent = ViewerEventBase<'audio_control', { action: AudioControlAction }>;

// ── Range (텍스트 선택) 이벤트 ──
export type RangeSelectEvent = ViewerEventBase<
  'range_select',
  { startGI: number; endGI: number; text: string }
>;
export type RangeChangeEvent = ViewerEventBase<
  'range_change',
  { startGI: number; endGI: number; text: string }
>;
export type RangeClearEvent = ViewerEventBase<'range_clear', Record<string, never>>;

// ── 번역 이벤트 ──
export type TranslateRequestEvent = ViewerEventBase<
  'translate_request',
  { text: string; startGI: number; endGI: number }
>;
export type TranslateLoadingStartEvent = ViewerEventBase<
  'translate_loading_start',
  { text: string }
>;
export type TranslateLoadingEndEvent = ViewerEventBase<
  'translate_loading_end',
  { originalText: string; translatedText: string }
>;
export type TranslateModalCloseEvent = ViewerEventBase<'translate_modal_close', Record<string, never>>;

/** 모든 뷰어 이벤트 타입 (Union) */
export type ViewerEvent =
  | GlobalIndexChangeEvent
  | ScrollEvent
  | PageChangeEvent
  | SectionChangeEvent
  | ModeChangeEvent
  | SettingsChangeEvent
  | RenderStartEvent
  | LoadingStartEvent
  | LoadingEndEvent
  | ViewportResizeEvent
  | AudioControlEvent
  | RangeSelectEvent
  | RangeChangeEvent
  | RangeClearEvent
  | TranslateRequestEvent
  | TranslateLoadingStartEvent
  | TranslateLoadingEndEvent
  | TranslateModalCloseEvent;

export type ViewerEventCallback = (event: ViewerEvent) => void;

/** 저장용 이벤트 (any type) */
export type StoredEvent = StoredViewerEvent<ViewerEventType, unknown>;

// ===================== 녹화 스냅샷 타입 =====================

/** 녹화용 뷰어 상태 (Partial - 모든 필드가 필수는 아님) */
export type RecordingViewerState = Partial<CRViewerState>;

/** 녹화/재생용 뷰어 스냅샷 (정확한 구조) */
export type RecordingSnapshot = {
  viewerState: RecordingViewerState;
  globalIndex: number;
  scrollY?: number;
  scrollRatio?: number;
  anchorGI?: number;
  anchorOffsetRatio?: number;
  currentPage?: number;
  totalPages?: number;
  sectionId: string;
  viewportWidth: number;
  viewportHeight: number;
  audio?: AudioSnapshot;
  range?: RangeSnapshot | null;
  translate?: TranslateSnapshot | null;
};

/** 녹화 청크 */
export type RecordingChunk = {
  index: number;
  startTime: number;
  endTime: number;
  snapshot: RecordingSnapshot;
  events: StoredEvent[];
};

/** 녹화 메타데이터 */
export type RecordingMeta = {
  id: string;
  startedAt: number;
  totalDuration: number;
  chunkDuration: number;
  chunkCount: number;
  sectionId: string;
};
