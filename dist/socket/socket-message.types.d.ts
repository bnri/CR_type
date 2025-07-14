import { OauthUserType } from "../session";
export interface MessageRequest {
    room_key: string;
    receiver_type: OauthUserType;
    receiver_idx: number;
    msg: string;
    temp_id?: string;
    type: "text" | "image";
}
export interface MessageResponse {
    msg: string;
    sender_type: OauthUserType;
    sender_idx: number;
    receiver_type: OauthUserType;
    receiver_idx: number;
    createdAt: string;
    room_key: string;
    is_read: boolean;
    _id: string;
    temp_id?: string;
    type: "text" | "image";
}
export interface ChatMessageRefreshRequest {
    roomKey: string;
    start?: string;
    end?: string;
    count?: number;
}
export interface ChatMessageReadRequest {
    room_key: string;
    last_read_at: string;
}
export interface MessageReadResponse {
    room_key: string;
    receiver_type: OauthUserType;
    receiver_idx: number;
    message_ids: string[];
}
export interface MessageLogDocument extends MessageResponse {
    createdAt: string;
    updatedAt?: string;
}
