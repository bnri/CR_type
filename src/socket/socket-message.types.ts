// 📁 src/types/socket/socket-message.types.ts

import { OauthUserType } from "../session/session.type";

export interface NoticeMessage{
  notice_idx: number;
  notice_imgurl?: string | null;
  notice_title?: string | null;
  notice_msg: string;
  notice_created_at: string; // ISO string or Date
  notice_btn_name?: string | null;
  notice_to_who: string; //parent or child (모든 타입들에게 보냄)
  notice_category: string; //별의미 없는데 나중에 쿼리할때 쓸수도?
  notice_link?: string | null; //클릭시 가는링크
}
// 클라이언트 → 서버
export interface MessageRequest {
  room_key: string; // ✅ 필수 추가
  receiver_type: OauthUserType;
  receiver_idx: number; // user_idx or child_idx
  msg: string;
  temp_id?: string; // 👈 프론트가 관리용으로 보내는 값 (optional)
  type:"text"|"image"|"notice";
  notice_payload?:NoticeMessage;
}
export interface NoticeMessageResult {
  success: boolean;
  payload?: MessageRequest;
  error?: string;
}


// 서버 → 클라이언트
// 실시간 수신용
export interface MessageResponse {
  msg: string;
  sender_type: OauthUserType;
  sender_idx: number;
  receiver_type: OauthUserType; //admin도 받을수 있게..
  receiver_idx: number;
  createdAt: string;
  room_key: string;
  _id: string;     // MongoDB ID (DB용 식별자)
  temp_id?: string; // Front 전용, 본인에게만 echo
  type:"text"|"image"|"notice";
  notice_payload?:NoticeMessage;
}



export interface ChatMessageRefreshRequest {
  roomKey: string;
  start?: string; //시간 기준?
  end?: string; // 시간기준?
  count?: number; // 그 시간대 사이의 최대 갯수도 받는게 맞을듯.. 없을경우에는 전체
}

/** 메시지 새로고침 응답 — read pointer 포함 */
export interface ChatMessageRefreshedResponse {
  roomKey: string;
  msgArr: MessageResponse[];
  myLastReadAt: string | null;
  peerLastReadAt: string | null;          // 1:1 한정
  adminReadStates?: AdminReadState[];     // help room용: admin별 읽음 상태
}

/** admin별 읽음 상태 (help room) */
export interface AdminReadState {
  admin_idx: number;
  last_read_at: string;
}

export interface ChatMessageReadRequest {
  room_key: string;
  last_read_at: string;
}

/** read-peer / read-self 응답: read pointer 기반 */
export interface MessageReadResponse {
  room_key: string;
  reader_type: OauthUserType;
  reader_idx: number;
  last_read_at: string;
}

/** chat_room_read_state 컬렉션 문서 타입 */
export interface ChatRoomReadStateDoc {
  _id: string;
  room_key: string;
  user_type: OauthUserType;
  user_idx: number;
  last_read_at: string;    // ISO date string
  updated_at: string;
}


//이것은 CR_ws 에서만 필요한 타입임
//몽고에 직접적인 엑세스를 하는곳이니
export interface MessageLogDocument extends MessageResponse {
  createdAt: string;
  updatedAt?: string;
}
