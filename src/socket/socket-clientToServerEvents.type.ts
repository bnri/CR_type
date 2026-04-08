import { ChatMessageReadRequest, ChatMessageRefreshRequest, MessageRequest } from "./socket-message.types";
import { SessionDataPayload } from "./reading-section.types";
import { ViewerOpenPayload, ViewerClosePayload, SessionHistoryListPayload, SessionHistoryGetPayload, SessionHistoryDeletePayload, UnifiedChunksGetPayload, UnifiedSegmentGetPayload, LiveBatchPayload } from "./unified-session.types";
import { ReadingProgressReport } from "../book/child-reading-progress.type";


export interface ClientToServerEvents {
  'chat-message:send': (msg: MessageRequest) => void;
  'chat-message:refresh': (msg: ChatMessageRefreshRequest) => void;
  'chat-message:read': (payload: ChatMessageReadRequest) => void;

  // === 통합 세션 이벤트 ===
  /** 뷰어 열림 (세션 시작 또는 섹션 변경) */
  'session:open': (payload: ViewerOpenPayload) => void;
  /** 뷰어 닫힘 (세션 종료) */
  'session:close': (payload: ViewerClosePayload) => void;
  /** 10초 통합 데이터 (events + gaze + snapshot) */
  'session:data': (payload: SessionDataPayload) => void;
  // === Live 시청 (chunk 기반) ===
  /** 자녀 세션 live 구독 (부모) */
  'live:subscribe': (payload: { readingSessionId: string }) => void;
  /** 자녀 세션 live 구독 해제 */
  'live:unsubscribe': (payload: { readingSessionId: string }) => void;
  /** 라이브 batch 전송 (CR_app → server, 100ms 주기) */
  'live:batch': (payload: LiveBatchPayload) => void;
  /** 라이브 mid-join 초기 상태 요청 (watcher → server) */
  'live:request-initial': (payload: { readingSessionId: string }) => void;

  // === 읽기 진행 ===
  /** 읽기 진행 보고 (5초 주기 자동저장) */
  'progress:reading-save': (payload: ReadingProgressReport) => void;

  // === 실시간 읽기 모니터링 구독 (부모 앱) ===
  /** 자녀 읽기 상태 구독 시작 */
  'reading:watch-children': (childIdxList: number[]) => void;
  /** 자녀 읽기 상태 구독 해제 */
  'reading:unwatch-children': () => void;

  // === WebRTC 시그널링 ===
  /**
   * 부모→자녀 offer.
   * targetChildSocketId: 같은 자녀 계정으로 여러 단말 접속 시 부모가 선택한 단말의 socketId.
   * (디바이스 선택 모달 → ConnectedUser.socketId)
   */
  'webrtc:offer': (payload: {
    targetChildIdx: number;
    targetChildSocketId: string;
    sdp: string;
  }) => void;
  /**
   * 자녀→부모 answer.
   * targetParentSocketId: 부모 계정 단말 단위로 1:1 라우팅하기 위해 사용.
   * 같은 parent_idx의 다른 단말로는 전송되지 않는다.
   */
  'webrtc:answer': (payload: {
    targetParentSocketId: string;
    sdp: string;
  }) => void;
  /**
   * ICE candidate 교환 (양방향).
   * targetSocketId: 발신자가 부모면 자녀 socket, 자녀면 부모 socket을 지정.
   */
  'webrtc:ice-candidate': (payload: {
    targetSocketId: string;
    candidate: string;
  }) => void;
  /**
   * 연결 종료 (양방향).
   * targetSocketId: 1:1 hangup 대상 socket.
   */
  'webrtc:hangup': (payload: { targetSocketId: string }) => void;
  /**
   * 자녀→부모 peer 오류 통지.
   * 자녀 단말에 카메라가 없거나, answer 생성 실패 등으로 offer를 처리할 수 없을 때 발신.
   * 부모는 watchdog timeout 대신 즉시 명확한 에러 메시지를 받는다.
   */
  'webrtc:peer-error': (payload: {
    targetParentSocketId: string;
    reason: 'camera-unavailable' | 'no-video-track' | 'offer-failed';
    message?: string;
  }) => void;
  /**
   * WebRTC 진단 정보 (부모→서버, 단방향)
   * - iceCandidateType: 부모 측 selected candidate pair의 local candidate type
   * - endReason: 비정상 종료 시에만 동봉 (정상 종료는 'webrtc:hangup' 사용)
   */
  'webrtc:diag': (payload: {
    targetChildIdx: number;
    iceCandidateType: 'host' | 'srflx' | 'relay' | null;
    endReason?: 'ice-failed' | 'connection-failed';
  }) => void;
}


export interface NoticeToServerEvents {
  'notice-message:send': (msg: MessageRequest) => void;
}

/** 사용자 관리 이벤트 (Admin용 - 연결된 사용자 목록 조회) */
export interface UserAdminToServerEvents {
  'user:list': () => void;
}

/** 실시간 읽기 모니터링 구독 (Admin용) */
export interface ReadingWatchAdminToServerEvents {
  /** 자녀 읽기 상태 구독 시작 */
  'reading:watch-children': (childIdxList: number[]) => void;
  /** 자녀 읽기 상태 구독 해제 */
  'reading:unwatch-children': () => void;
}

/** 통합 세션 관리 이벤트 (Admin/Parent용) */
export interface SessionAdminToServerEvents {
  /** 활성 세션 목록 조회 */
  'session:list': () => void;
  /** 세션 이력 목록 조회 (S3) */
  'session:list-history': (payload: SessionHistoryListPayload) => void;
  /** 세션 이력 상세 조회 (S3) */
  'session:get-history': (payload: SessionHistoryGetPayload) => void;
  /** 세션 이력 삭제 (S3) */
  'session:delete-history': (payload: SessionHistoryDeletePayload) => void;
  /** 청크 조회 (seek/재생용) */
  'session:get-chunks': (payload: UnifiedChunksGetPayload) => void;
  /** 세그먼트 상세 조회 */
  'session:get-segment': (payload: UnifiedSegmentGetPayload) => void;
}

export interface AdminClientToServerEvents
  extends ClientToServerEvents,
          NoticeToServerEvents,
          UserAdminToServerEvents,
          SessionAdminToServerEvents,
          ReadingWatchAdminToServerEvents {}
