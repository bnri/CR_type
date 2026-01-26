import { ChatMessageReadRequest, ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
import { SessionStartPayload, SessionEndPayload, SessionProgressPayload, SessionEventPayload, SessionSubscribePayload } from "./reading-section.types";
import { MonitorStartPayload, MonitorStopPayload } from "./monitor.types";
import { RecordingStartPayload, RecordingStopPayload } from "./recording.types";
export interface ClientToServerEvents {
    'chat-message:send': (msg: MessageRequest) => void;
    'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
    'chat-message:read': (payload: ChatMessageReadRequest) => void;
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
/** 실시간 모니터링 이벤트 (Admin용 - 모니터링 시작/중지) */
export interface MonitorAdminToServerEvents {
    'monitor:start': (payload: MonitorStartPayload) => void;
    'monitor:stop': (payload: MonitorStopPayload) => void;
}
/** 녹화 이벤트 (Admin/Parent → Server) - P2.2 Recording System */
export interface RecordingAdminToServerEvents {
    'recording:start': (payload: RecordingStartPayload) => void;
    'recording:stop': (payload: RecordingStopPayload) => void;
}
export interface AdminClientToServerEvents extends ClientToServerEvents, NoticeToServerEvents, ReadingAdminToServerEvents, MonitorAdminToServerEvents, RecordingAdminToServerEvents {
}
