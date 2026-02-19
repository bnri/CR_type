// import type { MessageResponse } from '@/types/socket/socket-message.types';

import { MessageReadResponse, MessageResponse, NoticeMessageResult } from "./socket-message.types";
import { ReadingSessionInfo, ViewerSnapshot, ReadingSessionsListResultPayload, ReadingSessionGetResultPayload, ReadingSessionDeleteResultPayload } from "./reading-section.types";
import { ViewerEvent } from "./viewer-events.types";
import { ConnectedUser, ConnectedUsersGrouped } from "./connected-user.types";
import { RecordingStartedPayload, RecordingStoppedPayload, RecordingChunkPayload, RecordingLiveEventsPayload, SegmentStartedPayload, SegmentEndedPayload, RecordingListResultPayload, RecordingManifestPayload, SegmentMetaPayload, ChunksResultPayload } from "./recording.types";

export interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  connect_error: (err: Error) => void;

  //내가 보낸 메시지에 대한 콜백
  'chat-message:append-self': (msg: MessageResponse) => void;

  //상대방이 보낸 메시지에 대한 콜백
  'chat-message:append-peer': (msg: MessageResponse) => void;

  // 내가 요청한 특정채팅방에 대한 갱신 콜백
  // 채팅방 일정기간의 채팅로그들을 줘야함

  'chat-message:refreshed': (payload: { roomKey: string; msgArr: MessageResponse[] }) => void;
  'chat-message:read-peer':(payload:MessageReadResponse)=>void;
  'chat-message:read-self':(payload:MessageReadResponse)=>void;

  // 읽기 섹션 응답 (Client용)
  'reading-section:started': (payload: { session: ReadingSessionInfo }) => void;
  'reading-section:ended': (payload: { sessionId: string }) => void;
}

export interface NoticeToClientEvents {
  'notice-message:result': (payload: NoticeMessageResult) => void;
}

/** 읽기 섹션 모니터링 이벤트 (Admin에게 전송) */
export interface ReadingServerToClientEvents {
  'reading-section:list': (payload: { sessions: ReadingSessionInfo[] }) => void;
  'reading-section:subscribed': (payload: { sessionId: string; snapshot: ViewerSnapshot | null }) => void;
  'reading-section:progress': (payload: { sessionId: string; snapshot: ViewerSnapshot }) => void;
  'reading-section:events': (payload: { sessionId: string; events: ViewerEvent[] }) => void;
  'reading-section:error': (payload: { message: string }) => void;
  /** S3 읽기 세션 기록 목록 */
  'reading-sessions:list-result': (payload: ReadingSessionsListResultPayload) => void;
  /** S3 읽기 세션 기록 상세 (이벤트 포함) */
  'reading-sessions:get-result': (payload: ReadingSessionGetResultPayload) => void;
  /** S3 읽기 세션 기록 삭제 결과 */
  'reading-sessions:delete-result': (payload: ReadingSessionDeleteResultPayload) => void;
}

/** 연결된 사용자 모니터링 이벤트 (Admin에게 전송) */
export interface UserServerToClientEvents {
  'user:list': (payload: { users: ConnectedUsersGrouped }) => void;
  'user:connected': (payload: { user: ConnectedUser }) => void;
  'user:disconnected': (payload: { socketId: string; userId: number; userType: 'parent' | 'child' }) => void;
  'user:reading-status': (payload: { socketId: string; userId: number; userType: 'parent' | 'child'; readingSessionId: string | null }) => void;
}

/** 녹화 이벤트 (Admin/Parent에게 전송) - P2.2 Recording System */
export interface RecordingServerToClientEvents {
  // 실시간 녹화 알림
  'recording:started': (payload: RecordingStartedPayload) => void;
  'recording:stopped': (payload: RecordingStoppedPayload) => void;
  'recording:chunk': (payload: RecordingChunkPayload) => void;
  'recording:live-events': (payload: RecordingLiveEventsPayload) => void;
  'recording:segment-started': (payload: SegmentStartedPayload) => void;
  'recording:segment-ended': (payload: SegmentEndedPayload) => void;
  'recording:error': (payload: { message: string }) => void;
  // 녹화 조회 결과 (재생용)
  'recording:list-result': (payload: RecordingListResultPayload) => void;
  'recording:manifest': (payload: RecordingManifestPayload) => void;
  'recording:segment': (payload: SegmentMetaPayload) => void;
  'recording:chunks': (payload: ChunksResultPayload) => void;
}

export interface AdminServerToClientEvents
  extends ServerToClientEvents,
          NoticeToClientEvents,
          ReadingServerToClientEvents,
          UserServerToClientEvents,
          RecordingServerToClientEvents {}
          