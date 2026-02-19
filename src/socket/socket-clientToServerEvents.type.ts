import { ChatMessageReadRequest, ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
import { SessionStartPayload, SessionEndPayload, SessionProgressPayload, SessionEventPayload, SessionSubscribePayload, ReadingSessionsListPayload, ReadingSessionGetPayload } from "./reading-section.types";
import { RecordingStartPayload, RecordingStopPayload, RecordingListPayload, RecordingGetPayload, SegmentGetPayload, ChunksGetPayload } from "./recording.types";


export interface ClientToServerEvents {
  'chat-message:send': (msg: MessageRequest) => void;
  // 필요에 따라 확장
  'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;

  'chat-message:read' : (payload:ChatMessageReadRequest) => void;

  // 읽기 섹션 이벤트 (Client용 - 섹션 읽기 시작/종료/진행/이벤트 전송)
  'reading-section:start': (payload: SessionStartPayload) => void;
  'reading-section:end': (payload: SessionEndPayload) => void;
  'reading-section:progress': (payload: SessionProgressPayload) => void;
  'reading-section:event': (payload: SessionEventPayload) => void;
}


export interface NoticeToServerEvents {
  'notice-message:send': (msg: MessageRequest) => void;
}

/** 사용자 관리 이벤트 (Admin용 - 연결된 사용자 목록 조회) */
export interface UserAdminToServerEvents {
  'user:list': () => void;
}

/** 읽기 섹션 관리 이벤트 (Admin용 - 활성 세션 목록 조회/구독) */
export interface ReadingAdminToServerEvents {
  'reading-section:list': () => void;
  'reading-section:subscribe': (payload: SessionSubscribePayload) => void;
  'reading-section:unsubscribe': (payload: SessionSubscribePayload) => void;
  /** S3 읽기 세션 기록 목록 조회 */
  'reading-sessions:list': (payload: ReadingSessionsListPayload) => void;
  /** S3 읽기 세션 기록 상세 조회 (이벤트 포함) */
  'reading-sessions:get': (payload: ReadingSessionGetPayload) => void;
}

/** 녹화 이벤트 (Admin/Parent → Server) - P2.2 Recording System */
export interface RecordingAdminToServerEvents {
  // 실시간 녹화 제어
  'recording:start': (payload: RecordingStartPayload) => void;
  'recording:stop': (payload: RecordingStopPayload) => void;
  // 녹화 조회 (재생용)
  'recording:list': (payload: RecordingListPayload) => void;
  'recording:get': (payload: RecordingGetPayload) => void;
  'recording:get-segment': (payload: SegmentGetPayload) => void;
  'recording:get-chunks': (payload: ChunksGetPayload) => void;
}

export interface AdminClientToServerEvents
  extends ClientToServerEvents,
          NoticeToServerEvents,
          UserAdminToServerEvents,
          ReadingAdminToServerEvents,
          RecordingAdminToServerEvents {}
          