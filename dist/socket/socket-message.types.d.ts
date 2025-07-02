import { OauthUserType } from "../session";
export interface MessageRequest {
    room_key: string;
    receiver_type: OauthUserType;
    receiver_idx: number;
    msg: string;
    temp_id?: string;
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
}
export interface ChatMessageRefreshRequest {
    roomKey: string;
    start?: string;
    end?: string;
    count?: number;
}
export interface MessageLogDocument extends MessageResponse {
    createdAt: string;
    updatedAt?: string;
}
