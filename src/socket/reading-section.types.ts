// src/socket/reading-section.types.ts
// 읽기 세션 기본 타입 정의
// 뷰어 이벤트 상세 타입은 viewer-events.types.ts에서 정의

import type {
  CRViewerState,
  ViewerEvent,
  AudioSnapshot,
  RangeSnapshot,
  TranslateSnapshot,
} from './viewer-events.types';

// ===================== 기본 타입 =====================

/**
 * 뷰어 영역의 window 기준 정규화 사각형 (0~1).
 * gaze 좌표(window 기준 0~1)를 뷰어 기준으로 변환:
 *   vx = (gazeX - left) / width
 *   vy = (gazeY - top) / height
 */
export interface ViewerRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** 뷰어 영역의 pixel 기준 사각형 — 재생 뷰어 배치용 */
export interface ViewerRectPx {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** 뷰어 스냅샷 (소켓 통신용 - 현재 읽기 상태) */
export interface ViewerSnapshot {
  viewMode: 'scroll' | 'page';
  globalRunIndex: number;
  pageIndex?: number;
  totalPages?: number;
  scrollPosition?: number;
  scrollRatio?: number;
  totalItems: number;
  viewportWidth?: number;
  viewportHeight?: number;
  /** @deprecated viewerRectPx 사용 */
  viewerRect?: ViewerRect;
  viewerState?: Partial<CRViewerState>;
  anchorGI?: number;
  anchorOffsetRatio?: number;
  audio?: AudioSnapshot;
  range?: RangeSnapshot | null;
  translate?: TranslateSnapshot | null;
  /** 녹화 당시 전체 화면 크기 (window.innerWidth) */
  screenWidth?: number;
  /** 녹화 당시 전체 화면 크기 (window.innerHeight) */
  screenHeight?: number;
  /** 뷰어 영역의 pixel 기준 사각형 — 재생 뷰어 배치용 */
  viewerRectPx?: ViewerRectPx;
  /** 스냅샷 시점 상태 오버레이 (캘리브레이션, 퀴즈 등 진행 중 메시지) */
  statusOverlay?: string | null;
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

/** 5초 통합 데이터 페이로드 (session:data) — events + gaze + snapshot 한번에 전송 */
export interface SessionDataPayload {
  events: ViewerEvent[];
  gaze?: {
    samples: number[];
    startTs: number;
    endTs: number;
  };
  snapshot: ViewerSnapshot;
}