import { ChatMessageReadRequest, ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
import { SessionStartPayload, SessionEndPayload, SessionProgressPayload, SessionEventPayload, SessionSubscribePayload } from "./reading-section.types";


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

/** 읽기 섹션 관리 이벤트 (Admin용 - 활성 세션 목록 조회/구독) */
export interface ReadingAdminToServerEvents {
  'reading-section:list': () => void;
  'reading-section:subscribe': (payload: SessionSubscribePayload) => void;
  'reading-section:unsubscribe': (payload: SessionSubscribePayload) => void;
}

export interface AdminClientToServerEvents
  extends ClientToServerEvents,
          NoticeToServerEvents,
          ReadingAdminToServerEvents {}
          