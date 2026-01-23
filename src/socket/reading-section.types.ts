// src/socket/reading-section.types.ts
// 읽기 섹션 모니터링용 데이터 타입 정의
// 이벤트 인터페이스는 socket-clientToServerEvents.type.ts, socket-serverToClientEvents.type.ts 참조

// ===================== 기본 타입 =====================

/** 재생에 필요한 뷰어 설정 상태 (CRViewerState의 핵심 필드) */
export interface ViewerStateSnapshot {
  mode: 'scroll' | 'page';
  theme: 'light' | 'dark' | 'sepia' | 'green';
  fontFamily: string;
  fontSizePx: number;
  lineHeight: number;
  marginX: number;
  marginY: number;
  pointerStyle: 'highlight' | 'underline';
  pointerColor: string;
  breakMarks: { slash: boolean };
  breakGapPx: number;
  showPointer: boolean;
  showSplit: boolean;
}

/** 뷰어 스냅샷 (현재 상태) */
export interface ViewerSnapshot {
  viewMode: 'scroll' | 'page';
  globalRunIndex: number;
  pageIndex?: number;
  scrollPosition?: number;
  totalItems: number;
  /** 뷰어 너비 (재생 시 동일 크기로 렌더링) */
  viewportWidth?: number;
  /** 뷰어 높이 (재생 시 동일 크기로 렌더링) */
  viewportHeight?: number;
  /** 뷰어 설정 상태 (재생 시 동일하게 적용) */
  viewerState?: ViewerStateSnapshot;
}

/** 뷰어 이벤트 */
export interface ViewerEvent {
  type:
    | 'page_change'
    | 'scroll'
    | 'overlay_toggle'
    | 'range_select'
    | 'quiz_answer'
    | 'gi_change'
    | 'global_index_change'
    | 'section_change'
    | 'mode_change'
    | 'settings_change'
    | 'viewer_state_snapshot'
    | 'recording_start'
    | 'recording_stop'
    | 'audio_control';
  timestamp: number;
  data: Record<string, unknown>;
}

/** 뷰어 초기 설정 */
export interface ViewerConfig {
  fontSize?: number;
  lineHeight?: number;
  theme?: 'light' | 'dark' | 'sepia';
  viewMode?: 'scroll' | 'page';
}

/** 읽기 진행 상황 */
export interface ReadingProgress {
  currentPage?: number;
  totalPages?: number;
  percentage?: number;
}

/** 책/섹션 메타데이터 */
export interface SessionMeta {
  bookTitle?: string;
  sectionTitle?: string;
  sectionOrder?: number;
  totalSections?: number;
}

/** 세션 통계 */
export interface SessionStats {
  pagesRead?: number;
  scrollDistance?: number;
  interactionCount?: number;
}

// ===================== Client → Server 페이로드 =====================

/** 섹션 읽기 시작 페이로드 */
export interface SessionStartPayload {
  bookIdx: number;
  sectionId: string;
  snapshot: ViewerSnapshot;
  viewerConfig?: ViewerConfig;
  meta?: SessionMeta;
}

/** 섹션 읽기 종료 페이로드 */
export interface SessionEndPayload {
  durationMs?: number;
  finalSnapshot?: ViewerSnapshot;
  stats?: SessionStats;
}

/** 진행 상황 업데이트 페이로드 */
export interface SessionProgressPayload {
  snapshot: ViewerSnapshot;
  progress?: ReadingProgress;
}

/** 이벤트 배치 전송 페이로드 */
export interface SessionEventPayload {
  events: ViewerEvent[];
}

/** 세션 구독 페이로드 (Admin용) */
export interface SessionSubscribePayload {
  sessionId: string;
}

// ===================== Server → Client 응답 =====================

/** 읽기 세션 정보 (서버 응답) */
export interface ReadingSessionInfo {
  sessionId: string;
  userId: number;
  userType: 'parent' | 'child';
  userName?: string;
  bookIdx: number;
  bookTitle?: string;
  sectionId: string;
  sectionTitle?: string;
  sectionOrder?: number;
  totalSections?: number;
  startedAt: string;
  snapshot: ViewerSnapshot;
  viewerConfig?: ViewerConfig;
  lastEventAt?: string;
}

/** 세션 시작 응답 */
export interface SessionStartedResponse {
  session: ReadingSessionInfo;
}

/** 세션 종료 응답 */
export interface SessionEndedResponse {
  sessionId: string;
  durationMs?: number;
  stats?: SessionStats;
}

/** 세션 진행 상황 응답 */
export interface SessionProgressResponse {
  sessionId: string;
  snapshot: ViewerSnapshot;
  progress?: ReadingProgress;
}

/** 세션 이벤트 응답 */
export interface SessionEventsResponse {
  sessionId: string;
  events: ViewerEvent[];
}

/** 세션 목록 응답 */
export interface SessionListResponse {
  sessions: ReadingSessionInfo[];
}

/** 세션 구독 성공 응답 */
export interface SessionSubscribedResponse {
  sessionId: string;
  snapshot: ViewerSnapshot;
}
