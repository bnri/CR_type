// src/socket/reading-section.types.ts
// 읽기 섹션 모니터링용 데이터 타입 정의
// 뷰어 이벤트 상세 타입은 viewer-events.types.ts에서 정의

import type { CRViewerState, ViewerEvent, AudioSnapshot } from './viewer-events.types';

// ===================== 기본 타입 =====================

/** 뷰어 스냅샷 (소켓 통신용 - 현재 읽기 상태) */
export interface ViewerSnapshot {
  viewMode: 'scroll' | 'page';
  globalRunIndex: number;
  pageIndex?: number;
  scrollPosition?: number;
  totalItems: number;
  viewportWidth?: number;
  viewportHeight?: number;
  viewerState?: Partial<CRViewerState>;
  anchorGI?: number;
  anchorOffsetRatio?: number;
  audio?: AudioSnapshot;
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
