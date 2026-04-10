import { OauthUserType } from "../session/session.type";
export interface NoticeMessage {
    notice_idx: number;
    notice_imgurl?: string | null;
    notice_title?: string | null;
    notice_msg: string;
    notice_created_at: string;
    notice_btn_name?: string | null;
    notice_to_who: string;
    notice_category: string;
    notice_link?: string | null;
}
export interface MessageRequest {
    room_key: string;
    receiver_type: OauthUserType;
    receiver_idx: number;
    msg: string;
    temp_id?: string;
    type: "text" | "image" | "notice";
    notice_payload?: NoticeMessage;
}
export interface NoticeMessageResult {
    success: boolean;
    payload?: MessageRequest;
    error?: string;
}
export interface MessageResponse {
    msg: string;
    sender_type: OauthUserType;
    sender_idx: number;
    receiver_type: OauthUserType;
    receiver_idx: number;
    createdAt: string;
    room_key: string;
    _id: string;
    temp_id?: string;
    type: "text" | "image" | "notice";
    notice_payload?: NoticeMessage;
}
export interface ChatMessageRefreshRequest {
    roomKey: string;
    start?: string;
    end?: string;
    count?: number;
}
/** 메시지 새로고침 응답 — read pointer 포함 */
export interface ChatMessageRefreshedResponse {
    roomKey: string;
    msgArr: MessageResponse[];
    myLastReadAt: string | null;
    peerLastReadAt: string | null;
    adminReadStates?: AdminReadState[];
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
    last_read_at: string;
    updated_at: string;
}
export interface MessageLogDocument extends MessageResponse {
    createdAt: string;
    updatedAt?: string;
}
