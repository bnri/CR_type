// 📁 src/types/socket/socket-message.types.ts

import { OauthUserType } from "../session";
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


// 서버 → 클라이언트
// 실시간 수신용
export interface MessageResponse {
  msg: string;
  sender_type: OauthUserType;
  sender_idx: number;
  receiver_type: OauthUserType; //admin도 받을수 있게..
  receiver_idx: number;
  createdAt: string;
  room_key: string; // ✅ 필수 추가
  is_read: boolean; // ✅ 읽음 여부 추가
  _id: string;     // MongoDB ID (DB용 식별자)
  // 👇 아래 1개는 선택적
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




export interface ChatMessageReadRequest {
  room_key: string;
  last_read_at: string; 
  // receiver_type: OauthUserType; //admin도 받을수 있게..
  // receiver_idx: number;
  //보낼필요없음 내기준만 읽었다고 할거라서
}


export interface MessageReadResponse {
  room_key: string;
  receiver_type: OauthUserType; //admin도 받을수 있게..
  receiver_idx: number;
  message_ids: string[]; // optional, 특정 메시지를 지정했을 경우
}





//이것은 CR_ws 에서만 필요한 타입임
//몽고에 직접적인 엑세스를 하는곳이니
export interface MessageLogDocument extends MessageResponse {
  // _id: string; // MongoDB 기본 ID
  createdAt: string;
  updatedAt?: string;
}
