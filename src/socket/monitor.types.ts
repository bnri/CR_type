// src/socket/monitor.types.ts
// Admin 실시간 모니터링용 타입 정의

import { SocketViewerEvent, ViewerSnapshot, ReadingSessionInfo } from './reading-section.types';

// ===================== S3 저장 구조 =====================

/** 모니터링 메타 정보 (S3 meta.json) */
export interface MonitorMeta {
  targetSocketId: string;
  userType: 'parent' | 'child';
  userId: number;
  userName: string;
  parentIdx?: number;
  startedAt: number;
  endedAt: number | null;
  adminSocketId: string;
  chunkCount: number;
}

/** 모니터링 청크 (S3 chunks/N.json) */
export interface MonitorChunk {
  chunkIndex: number;
  chunkTimestamp: number;
  readingSessionId: string | null;
  sectionId: string | null;
  bookIdx: number | null;
  events: SocketViewerEvent[];
  snapshot: ViewerSnapshot | null;
  /** 청크 생성 주기 (ms) */
  delayMs: number;
}

// ===================== Admin → Server 페이로드 =====================

/** 모니터링 시작 요청 */
export interface MonitorStartPayload {
  targetSocketId: string;
}

/** 모니터링 중지 요청 */
export interface MonitorStopPayload {
  targetSocketId: string;
}

// ===================== Server → Admin 응답 =====================

/** 모니터링 시작 응답 */
export interface MonitorStartedPayload {
  targetSocketId: string;
  startedAt: number;
  userInfo: {
    userType: 'parent' | 'child';
    userId: number;
    userName: string;
    parentIdx?: number;
  };
  currentSession: ReadingSessionInfo | null;
}

/** 모니터링 청크 전송 */
export interface MonitorChunkPayload {
  targetSocketId: string;
  chunk: MonitorChunk;
}

/** 모니터링 대상 세션 변경 알림 */
export interface MonitorSessionChangedPayload {
  targetSocketId: string;
  session: ReadingSessionInfo | null;
}

/** 모니터링 중지 알림 (대상 연결 해제 등) */
export interface MonitorStoppedPayload {
  targetSocketId: string;
  reason?: string;
}

/** 모니터링 에러 */
export interface MonitorErrorPayload {
  message: string;
}
