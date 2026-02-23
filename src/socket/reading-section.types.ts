// src/socket/reading-section.types.ts
// 읽기 세션 기본 타입 정의
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

// ===================== 공용 페이로드 =====================

/** 진행 상황 업데이트 페이로드 */
export interface SessionProgressPayload {
  snapshot: ViewerSnapshot;
}

/** 이벤트 배치 전송 페이로드 */
export interface SessionEventPayload {
  events: ViewerEvent[];
}

/** 세션 구독 페이로드 */
export interface SessionSubscribePayload {
  sessionId: string;
}
