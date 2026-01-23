// src/socket/reading-section.types.ts
// 읽기 섹션 모니터링용 데이터 타입 정의
// 뷰어 이벤트 타입은 viewer/viewerEvent.types.ts에서 가져옴

import type {
  CRViewerState,
  ViewerEventType,
  RecordingViewerState,
} from '../viewer/viewerEvent.types';

// ===================== 기본 타입 =====================

/** 뷰어 설정 상태 (CRViewerState에서 재사용) */
export type ViewerStateSnapshot = RecordingViewerState;

/** 뷰어 스냅샷 (소켓 통신용 - 현재 읽기 상태) */
export interface ViewerSnapshot {
  viewMode: 'scroll' | 'page';
  globalRunIndex: number;
  pageIndex?: number;
  scrollPosition?: number;
  totalItems: number;
  viewportWidth?: number;
  viewportHeight?: number;
  viewerState?: ViewerStateSnapshot;
}

/** 소켓 전송용 뷰어 이벤트 (간소화된 형태) */
export interface SocketViewerEvent {
  type: ViewerEventType | 'overlay_toggle' | 'range_select' | 'quiz_answer' | 'gi_change';
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
  events: SocketViewerEvent[];
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
  events: SocketViewerEvent[];
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
