// 📁 src/types/socket/socket-message.types.ts

// 클라이언트 → 서버
export interface MessageRequest {
  receiver_type: 'parent' | 'child';
  receiver_idx: number; // user_idx or child_idx
  msg: string;
}

// 서버 → 클라이언트
// 실시간 수신용
export interface MessageResponse {
  msg: string;
  sender_type: 'parent' | 'child';
  sender_idx: number;
  receiver_type: 'parent' | 'child';
  receiver_idx: number;
  createdAt: string;
  room_key: string; // ✅ 필수 추가
  is_read: boolean; // ✅ 읽음 여부 추가
}

export interface ChatMessageRefreshRequest {
  roomKey: string;
  start?: string;
  end?: string;
}

//이것은 CR_ws 에서만 필요한 타입임
//몽고에 직접적인 엑세스를 하는곳이니
export interface MessageLogDocument extends MessageResponse {
  _id?: string; // MongoDB 기본 ID
  createdAt: string;
  updatedAt?: string;
}
